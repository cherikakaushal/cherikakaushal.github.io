import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import styles from './WritingSection.module.css';

export default function WritingSection() {
  return (
    <Link href="/writing" id="writing" className={styles.journal} aria-labelledby="writing-title">
      <div className={styles.label}><span>MY LITTLE CORNER OF THE INTERNET</span><span>ESSAYS / NOTES / EVERYDAY LIFE</span></div>
      <div className={styles.body}>
        <h3 id="writing-title">HOW WE<br/><em>SEE IT</em> YAAR.</h3>
        <div className={styles.copy}><p>Some things become paintings.<br/>Some become words.</p><span>Personal essays, passing thoughts, and the little moments I want to keep.</span><span className={styles.cta}>Step into my journal <ArrowUpRight size={20}/></span></div>
      </div>
    </Link>
  );
}
