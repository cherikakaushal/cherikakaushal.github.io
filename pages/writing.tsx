import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowUpRight, Moon, Sun } from 'lucide-react';
import writing from '../data/writing.json';
import styles from '../styles/writing.module.css';

type Entry = { kind: 'Articles' | 'Notes'; url: string; date: string; title: string; text: string; images: string[] };
const entries: Entry[] = [
  ...writing.posts.map(post => ({ kind: 'Articles' as const, url: post.url, date: post.date, title: post.title, text: post.excerpt, images: post.image ? [post.image] : [] })),
  ...writing.notes.map(note => ({ kind: 'Notes' as const, url: note.url, date: note.date, title: '', text: note.body, images: note.images })),
].sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

export default function Writing() {
  const [filter, setFilter] = useState<'All' | 'Articles' | 'Notes'>('All');
  const [dark, setDark] = useState(false);
  const visible = entries.filter(entry => filter === 'All' || entry.kind === filter);
  return <div className={`${styles.page} ${dark ? styles.dark : ''}`}>
    <Head><title>HOW WE SEE IT YAAR — Cherika Kaushal</title><meta name="description" content="Personal essays, notes, and little moments in between. HOW WE SEE IT YAAR, by Cherika Kaushal."/></Head>
    <nav className={styles.nav} aria-label="Writing navigation">
      <Link href="/#writing"><ArrowLeft size={16}/> Back to portfolio</Link>
      <span>CHERIKA KAUSHAL / THE JOURNAL</span>
      <button onClick={() => setDark(!dark)} aria-label={`Switch to ${dark ? 'light' : 'dark'} mode`}>{dark ? <Sun size={18}/> : <Moon size={18}/>}</button>
    </nav>
    <main>
      <header className={styles.hero}>
        <div className={styles.heroCopy}>
        <span className={styles.eyebrow}>WORDS, MOMENTS & EVERYTHING IN BETWEEN</span>
        <h1>HOW WE<br/><em>SEE IT</em> YAAR<span>.</span></h1>
        <div className={styles.deck}><p>Notes on being alive, becoming,<br/>and everything in between.</p><a href={writing.publication} target="_blank" rel="noopener noreferrer">Find me on Substack <ArrowUpRight size={17}/></a></div>
        </div>
        <figure className={styles.heroArt}><Image src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/journal-illustration.jpg`} alt="Vintage illustration of a seated girl in a full skirt, framed by a decorative black border" width={736} height={736} priority sizes="(max-width: 760px) 85vw, 32vw"/></figure>
      </header>
      <section className={styles.journal} aria-label="Articles and notes">
        <div className={styles.toolbar}>
          <div className={styles.filters} aria-label="Filter writing">{(['All', 'Articles', 'Notes'] as const).map(kind => <button key={kind} aria-pressed={filter === kind} onClick={() => setFilter(kind)}>{kind}<span>{kind === 'All' ? entries.length : entries.filter(entry => entry.kind === kind).length}</span></button>)}</div>
          <span className={styles.sort}>NEWEST FIRST</span>
        </div>
        <p className={styles.srOnly} role="status">Showing {visible.length} {filter === 'All' ? 'articles and notes' : filter.toLowerCase()}</p>
        <div className={styles.grid}>
          {visible.map(entry => <article className={`${styles.card} ${entry.kind === 'Notes' ? styles.note : styles.essay}`} key={entry.url}>
            <div className={styles.meta}><span>{entry.kind === 'Articles' ? 'ESSAY' : 'NOTE'}</span><time dateTime={entry.date}>{new Date(entry.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })}</time></div>
            {entry.title && <h2><a href={entry.url} target="_blank" rel="noopener noreferrer">{entry.title}</a></h2>}
            {entry.text && <p className={styles.body}>{entry.text}</p>}
            {entry.images.length > 0 && <div className={styles.photos}>{entry.images.map((src, index) => <a key={`${src}-${index}`} href={entry.url} target="_blank" rel="noopener noreferrer" aria-label={`View ${entry.kind === 'Notes' ? 'note' : entry.title} photo ${index + 1} on Substack`}><Image src={src} alt={entry.kind === 'Notes' ? `Photo ${index + 1} from Cherika's note` : entry.title} width={800} height={650} unoptimized/></a>)}</div>}
            <a className={styles.read} href={entry.url} target="_blank" rel="noopener noreferrer">{entry.kind === 'Articles' ? 'Read essay' : 'View note'} on Substack <ArrowUpRight size={17}/></a>
          </article>)}
        </div>
        {!visible.length && <p className={styles.empty}>No {filter.toLowerCase()} to show here yet. <a href={writing.profile} target="_blank" rel="noopener noreferrer">Visit my Substack profile ↗</a></p>}
      </section>
    </main>
    <footer className={styles.footer}><span>HOW WE SEE IT YAAR</span><Link href="/">Back to the things I build <ArrowUpRight size={16}/></Link></footer>
  </div>;
}
