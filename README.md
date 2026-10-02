# cherika kaushal — personal website

> trying to make sense of systems (they disagree)

## tech stack

- **Next.js 14** — framework
- **React Three Fiber** — 3D particle background
- **W3.CSS** — utility layer
- **Framer Motion** — scroll animations
- **Playfair Display + DM Mono + Cormorant Garamond** — type system

## getting started

```bash
# install dependencies
npm install

# run dev server
npm run dev

# build for production
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000)

## structure

```
cherika-site/
├── pages/
│   ├── _app.js          # global styles + providers
│   ├── _document.js     # HTML shell, fonts, W3.CSS
│   └── index.js         # main page (composes all sections)
├── components/
│   ├── ThreeBackground.js  # React Three Fiber 3D particles
│   ├── Nav.js              # sticky nav + dark/light toggle
│   ├── Hero.js             # hero section
│   ├── Intro.js            # intro paragraph
│   ├── Work.js             # projects grid
│   ├── Writing.js          # blog posts + quotes
│   ├── Ideas.js            # ideas/marketing + interests
│   └── AboutFooter.js      # about section + footer
├── styles/
│   └── globals.css         # CSS variables, typography, base
└── next.config.js
```

## theme

Toggle between dark (#0b0b0f) and light (#f8f5f2) via the pill in the nav.
Preference saved to localStorage.

## customization

- **Projects**: edit the `projects` array in `components/Work.js`
- **Writing**: run `python scripts/sync-writing.py` to refresh the writing archive
- **Colors**: change CSS variables in `styles/globals.css`
- **3D**: adjust particle count/size in `components/ThreeBackground.js`
# Substack writing section

The homepage links to `/writing`, the HOW WE SEE IT YAAR journal, with All,
Articles, and Notes filters. Run
`python scripts/sync-writing.py` before a local build to refresh `data/writing.json`.
The importer uses only Python's standard library. It paginates the public article
archive and the author's public Notes feed, sorts by publication date, and includes
photo attachments. It excludes other authors' restacks and replies. Articles and
Notes refresh independently and retain their saved data on a temporary failure.
The Notes endpoint is an undocumented public Substack endpoint; if its response
changes, the importer may need updating. No login or private account data is used.

The existing GitHub Pages deployment refreshes the feed on pushes, manual runs,
and hourly at minute 23. This becomes active when the changes reach the default
branch and GitHub Actions/Pages is enabled. Scheduled runs can be delayed;
GitHub disables schedules in public repositories after 60 days without repository
activity, so re-enable the workflow if that happens. No browser-side feed proxy
or subscription credentials are required.

Run importer checks with `python -m unittest discover -s scripts -p "test_*.py"`.
