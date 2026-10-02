"""Refresh the static writing section from the publication's public RSS feed."""
import json
import sys
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime
from html.parser import HTMLParser
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.parse import urlencode, quote, urlparse
import xml.etree.ElementTree as ET

PUBLICATION = "https://howwecityaar.substack.com"
OUTPUT = Path(__file__).resolve().parents[1] / "data" / "writing.json"
AUTHOR_ID = 397137579
PROFILE = "https://substack.com/@howwecityaar"


class PlainText(HTMLParser):
    def __init__(self):
        super().__init__()
        self.parts = []

    def handle_data(self, data):
        self.parts.append(data)


def parse_feed(xml):
    root = ET.fromstring(xml)
    posts = {}
    for item in root.findall("./channel/item"):
        title = (item.findtext("title") or "").strip()
        url = (item.findtext("link") or "").strip()
        if not title or not url.startswith(PUBLICATION + "/p/"):
            continue
        try:
            date = parsedate_to_datetime(item.findtext("pubDate") or "").astimezone(timezone.utc)
        except (ValueError, TypeError):
            continue
        parser = PlainText()
        parser.feed(item.findtext("description") or "")
        excerpt = " ".join(" ".join(parser.parts).split())
        if len(excerpt) > 200:
            excerpt = excerpt[:197].rsplit(" ", 1)[0] + "..."
        posts[url] = {"title": title, "url": url, "date": date.isoformat(), "excerpt": excerpt}
    return sorted(posts.values(), key=lambda post: post["date"], reverse=True)


def get_json(url):
    request = Request(url, headers={"User-Agent": "Mozilla/5.0", "Accept": "application/json"})
    with urlopen(request, timeout=30) as response:
        return json.load(response)


def normalized_date(value):
    return datetime.fromisoformat(value.replace("Z", "+00:00")).astimezone(timezone.utc).isoformat()


def image_url(value):
    if not value:
        return ""
    parsed = urlparse(value)
    if parsed.scheme != "https" or parsed.hostname not in ("substack-post-media.s3.amazonaws.com", "substackcdn.com"):
        return ""
    return "https://substackcdn.com/image/fetch/f_jpg,w_1000,c_limit/" + quote(value, safe="")


def parse_notes(items):
    notes = {}
    for item in items:
        note = item.get("comment") or {}
        if item.get("type") != "comment" or note.get("user_id") != AUTHOR_ID:
            continue
        if note.get("type") != "feed" or note.get("ancestor_path") or note.get("post_id"):
            continue
        note_id = note.get("id")
        if not isinstance(note_id, int):
            continue
        try:
            date = normalized_date(note.get("date", ""))
        except (ValueError, AttributeError):
            continue
        images = [image_url(a.get("imageUrl")) for a in note.get("attachments", []) if a.get("type") == "image"]
        images = [url for url in images if url]
        body = (note.get("body") or "").strip()
        if not body and not images:
            continue
        notes[note_id] = {"url": f"{PROFILE}/note/c-{note_id}", "date": date, "body": body, "images": images}
    return sorted(notes.values(), key=lambda note: note["date"], reverse=True)


def fetch_notes():
    items, seen = [], set()
    cursor = None
    for _ in range(100):
        url = f"https://substack.com/api/v1/reader/feed/profile/{AUTHOR_ID}"
        if cursor:
            url += "?" + urlencode({"cursor": cursor})
        page = get_json(url)
        if not isinstance(page.get("items"), list):
            raise ValueError("Unexpected Notes response")
        items.extend(page["items"])
        cursor = page.get("nextCursor")
        if not cursor:
            return parse_notes(items)
        if cursor in seen:
            raise ValueError("Notes pagination repeated")
        seen.add(cursor)
    raise ValueError("Notes pagination limit reached")


def fetch_articles():
    posts = {}
    for offset in range(0, 5000, 50):
        page = get_json(PUBLICATION + "/api/v1/archive?" + urlencode({"sort": "new", "offset": offset, "limit": 50}))
        if not isinstance(page, list):
            raise ValueError("Unexpected archive response")
        for post in page:
            url = post.get("canonical_url", "")
            if not url.startswith(PUBLICATION + "/p/") or not post.get("title"):
                continue
            posts[url] = {"title": post["title"], "url": url, "date": normalized_date(post["post_date"]), "excerpt": post.get("subtitle") or post.get("description") or "", "image": image_url(post.get("cover_image"))}
        if len(page) < 50:
            return sorted(posts.values(), key=lambda post: post["date"], reverse=True)
    raise ValueError("Article pagination limit reached")


def main():
    saved = json.loads(OUTPUT.read_text(encoding="utf-8")) if OUTPUT.exists() else {}
    data = {"publication": PUBLICATION, "name": "HOW WE SEE IT YAAR", "profile": PROFILE, "posts": saved.get("posts", []), "notes": saved.get("notes", [])}
    try:
        if len(sys.argv) > 1:
            xml = Path(sys.argv[1]).read_bytes()
            posts = parse_feed(xml)
        else:
            posts = fetch_articles()
        if not posts:
            raise ValueError("Feed contained no valid articles")
        data["posts"] = posts
    except Exception as error:
        print(f"::warning::Article refresh failed; keeping saved articles. {error}")
    try:
        data["notes"] = fetch_notes()
    except Exception as error:
        print(f"::warning::Notes refresh failed; keeping saved Notes. {error}")
    if not data["posts"] and not data["notes"]:
        raise ValueError("No writing could be loaded")
    OUTPUT.parent.mkdir(exist_ok=True)
    OUTPUT.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Saved {len(data['posts'])} articles and {len(data['notes'])} Notes.")


if __name__ == "__main__":
    main()
