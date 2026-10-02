import importlib.util
from pathlib import Path
import unittest
from unittest.mock import patch
from tempfile import TemporaryDirectory
import json

spec = importlib.util.spec_from_file_location("sync_writing", Path(__file__).with_name("sync-writing.py"))
sync = importlib.util.module_from_spec(spec)
spec.loader.exec_module(sync)


class FeedTests(unittest.TestCase):
    def test_newest_first_deduplicated_without_truncating_archive(self):
        items = []
        for day in [1, 3, 2, 4, 4]:
            items.append(f'<item><title>Essay {day}</title><link>{sync.PUBLICATION}/p/{day}</link><pubDate>Tue, {day:02} Sep 2026 12:00:00 GMT</pubDate><description>&lt;b&gt;Hello&lt;/b&gt; &amp;amp; world</description></item>')
        posts = sync.parse_feed('<rss><channel>' + ''.join(items) + '</channel></rss>')
        self.assertEqual([p['title'] for p in posts], ['Essay 4', 'Essay 3', 'Essay 2', 'Essay 1'])
        self.assertEqual(posts[0]['excerpt'], 'Hello & world')

    def test_invalid_dates_and_unsafe_links_are_ignored(self):
        xml = '<rss><channel><item><title>Invalid</title><link>javascript:alert(1)</link><pubDate>Tue, 01 Sep 2026 12:00:00 GMT</pubDate></item><item><title>No date</title><link>' + sync.PUBLICATION + '/p/example</link></item></channel></rss>'
        self.assertEqual(sync.parse_feed(xml), [])

    def note(self, identifier=1, **overrides):
        return {'type': 'comment', 'comment': {'id': identifier, 'user_id': sync.AUTHOR_ID, 'type': 'feed', 'date': '2026-09-20T12:00:00Z', 'body': 'A thought', **overrides}}

    def test_only_own_original_notes_and_photo_only_notes(self):
        image = 'https://substack-post-media.s3.amazonaws.com/public/images/photo.heic'
        notes = sync.parse_notes([self.note(), self.note(), self.note(2, user_id=123), self.note(3, ancestor_path='1'), self.note(4, body='', attachments=[{'type': 'image', 'imageUrl': image}])])
        self.assertEqual(len(notes), 2)
        self.assertTrue(notes[1]['images'][0].startswith('https://substackcdn.com/image/fetch/f_jpg'))
        self.assertEqual(sync.image_url('javascript:alert(1)'), '')

    def test_notes_pagination_collects_older_entries(self):
        with patch.object(sync, 'get_json', side_effect=[{'items': [self.note()], 'nextCursor': 'next'}, {'items': [self.note(2)], 'nextCursor': None}]) as fetch:
            self.assertEqual(len(sync.fetch_notes()), 2)
            self.assertIn('cursor=next', fetch.call_args.args[0])

    def test_failed_notes_refresh_keeps_saved_notes_and_updates_articles(self):
        with TemporaryDirectory() as directory:
            output = Path(directory) / 'writing.json'
            output.write_text(json.dumps({'posts': [], 'notes': [{'body': 'Saved note'}]}), encoding='utf-8')
            with patch.object(sync, 'OUTPUT', output), patch.object(sync.sys, 'argv', ['sync-writing.py']), patch.object(sync, 'fetch_articles', return_value=[{'title': 'New essay'}]), patch.object(sync, 'fetch_notes', side_effect=RuntimeError('Unavailable')):
                sync.main()
            saved = json.loads(output.read_text(encoding='utf-8'))
            self.assertEqual(saved['notes'][0]['body'], 'Saved note')
            self.assertEqual(saved['posts'][0]['title'], 'New essay')


if __name__ == '__main__':
    unittest.main()
