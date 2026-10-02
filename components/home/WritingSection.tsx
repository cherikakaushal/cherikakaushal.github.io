import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import styles from './WritingSection.module.css';

export default function WritingSection() {
  return (
    <section id="writing" className={styles.section} aria-labelledby="writing-title">
      <header className={styles.header}>
        <div>
          <span className={styles.eyebrow}>07 / WRITING & IDEAS</span>
          <h2 id="writing-title">A little outside<br/><em>the code.</em></h2>
        </div>
        <div className={styles.intro}>
          <p>Personal essays, passing thoughts, and little moments in between.</p>
          <p>HOW WE SEE IT YAAR</p>
          <Link href="/writing">Explore my articles & notes <ArrowUpRight size={18}/></Link>
        </div>
      </header>
    </section>
  );
}
