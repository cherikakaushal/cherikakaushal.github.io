import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Button, TextLink } from '../components/ui';
import { SiteNav } from '../components/home/SiteNav';

const projects = [
  {
    title: "Women's Health Platform",
    summary: 'A longitudinal study platform for symptom tracking, menstrual-health logs, questionnaires, researcher review, and dataset export.',
    technology: 'React · TypeScript · Node.js · MongoDB',
    href: 'https://github.com/cherikakaushal/women_health_research_platform',
  },
  {
    title: 'Signal vs Noise',
    summary: 'Controlled experiments showing how missing values and noise change system outputs and data-quality trade-offs.',
    technology: 'Python · Pandas · NumPy · Matplotlib',
    href: 'https://github.com/cherikakaushal/signal-vs-noise',
  },
  {
    title: 'When Systems Break',
    summary: 'A simulation framework for studying software resilience through explicit, reproducible failure conditions.',
    technology: 'Python · Systems research · Visualisation',
    href: 'https://github.com/cherikakaushal/when-systems-break',
  },
  {
    title: 'ARPIS',
    summary: 'A modular interface for AI-assisted research-paper discovery, exploration, and organisation.',
    technology: 'React · AI tooling · Research workflows',
    href: 'https://github.com/cherikakaushal/arpis-AI-Research-Paper-Intelligence-System',
  },
  {
    title: 'CargoX',
    summary: 'Product and interface work shaped around operational workflows and real implementation constraints.',
    technology: 'Product engineering · UI/UX · Systems',
    href: '',
  },
];

const experience = [
  ['2026', 'Summer Research Intern', 'Indian Institute of Technology Ropar', 'Designed and developed digital healthcare and research software platforms.'],
  ['2026', 'Software Development Intern', 'BuildVR', 'Built software features for immersive applications and improved product workflows.'],
  ['2026', 'TechSprint Winner', 'Google Developer Groups', 'Developed an award-winning technical solution in a team environment.'],
];

const repositories = [
  ['Women’s Health Platform', 'Full-stack research software', 'TypeScript', 'https://github.com/cherikakaushal/women_health_research_platform'],
  ['When Systems Break', 'Controlled failure experiments', 'Python', 'https://github.com/cherikakaushal/when-systems-break'],
  ['Signal vs Noise', 'Data-quality simulations', 'Python', 'https://github.com/cherikakaushal/signal-vs-noise'],
];

const technologies = [
  ['Languages', ['Python', 'C++', 'JavaScript', 'TypeScript']],
  ['Frameworks', ['React', 'Node.js', 'Next.js', 'FastAPI']],
  ['Data & tools', ['MongoDB', 'PostgreSQL', 'Git', 'Docker']],
];

export default function Home() {
  const [dark, setDark] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setDark(localStorage.getItem('ck-theme') === 'dark');
  }, []);

  const changeTheme = () => {
    setDark((value) => {
      localStorage.setItem('ck-theme', value ? 'light' : 'dark');
      return !value;
    });
  };

  const reveal = {
    initial: reduceMotion ? false : { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.12 },
    transition: { duration: reduceMotion ? 0 : 0.28, ease: 'easeOut' as const },
  };

  return (
    <>
      <Head>
        <title>Cherika Kaushal</title>
        <meta name="description" content="Software engineer building reliable full-stack systems, research platforms, and open-source projects." />
        <meta property="og:title" content="Cherika Kaushal" />
        <meta property="og:description" content="Building software systems that solve real-world problems." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://cherikakaushal.github.io/" />
      </Head>

      <div className={`site ds-shell${dark ? ' ds-theme-dark' : ''}`}>
        <a className="skip-link" href="#main">Skip to content</a>
        <SiteNav dark={dark} onThemeChange={changeTheme} />

        <main className="home-main" id="main">
          <motion.section className="home-hero" id="top" initial={reduceMotion ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.28 }}>
            <div className="hero-block" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div className="hero-meta"><span>Cherika Kaushal</span><span>Software Engineer</span></div>
            <div className="hero-intro">
              <h1 className="hero-title">Building software systems<br />that solve <em>real-world</em> problems.</h1>
              <figure className="hero-portrait-demo">
                <div>
                  <Image
                    src="/cherika-kaushal.jpeg"
                    alt="Cherika Kaushal"
                    width={960}
                    height={1280}
                    sizes="(max-width: 672px) 56vw, (max-width: 992px) 160px, 232px"
                    priority
                    fetchPriority="high"
                  />
                </div>
                <figcaption><span>Cherika Kaushal</span><span>2026</span></figcaption>
              </figure>
            </div>
            <div className="hero-bottom">
              <p className="hero-statement">I design and develop full-stack software, backend systems, research platforms, and open-source projects with a focus on reliability, performance, and thoughtful engineering.</p>
              <div className="hero-actions">
                <Button href="#projects">View work</Button>
                <Button href="/Cherika_Kaushal_CV.pdf" variant="secondary">Resume</Button>
                <Button href="https://github.com/cherikakaushal" variant="quiet">GitHub ↗</Button>
                <Button href="https://www.linkedin.com/in/cherika-kaushal-4b9b8b30b" variant="quiet">LinkedIn ↗</Button>
              </div>
            </div>
          </motion.section>

          <motion.section className="home-section" id="projects" {...reveal}>
            <SectionHead number="01" label="Selected work" title={<>Systems built for <em>use</em>, not display.</>} />
            <div className="project-ledger">
              {projects.map((project, index) => <article className="project-row" key={project.title}>
                <span className="project-index">{String(index + 1).padStart(2, '0')}</span>
                <div className="project-copy"><h3>{project.title}</h3><p>{project.summary}</p></div>
                <div className="project-meta"><span>{project.technology}</span>
                  {project.href ? <div><TextLink href={project.href} target="_blank" rel="noreferrer">GitHub</TextLink><TextLink href={project.href} target="_blank" rel="noreferrer">Case study</TextLink></div> : <small>Private product work</small>}
                </div>
              </article>)}
            </div>
          </motion.section>

          <motion.section className="home-section" id="experience" {...reveal}>
            <SectionHead number="02" label="Experience" title={<>A concise record of <em>work</em>.</>} />
            <div className="editorial-timeline">
              {experience.map(([year, role, org, copy]) => <article key={`${year}${role}`}>
                <time>{year}</time><div><p>{org}</p><h3>{role}</h3></div><p className="timeline-copy">{copy}</p><TextLink href="/Cherika_Kaushal_CV.pdf" target="_blank">Read</TextLink>
              </article>)}
            </div>
          </motion.section>

          <motion.section className="home-section" id="open-source" {...reveal}>
            <SectionHead number="03" label="Open source" title={<>Public work, <em>inspectable</em>.</>} />
            <div className="opensource-layout">
              <div className="contribution-panel">
                <div><span>GitHub contributions</span><TextLink href="https://github.com/cherikakaushal" target="_blank" rel="noreferrer">Open profile</TextLink></div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://ghchart.rshah.org/111111/cherikakaushal" alt="Cherika Kaushal's GitHub contribution graph" loading="lazy" />
                <p>Repository history, recent pull requests, and contribution activity remain available on GitHub.</p>
              </div>
              <div className="repo-list">
                {repositories.map(([name, copy, language, href]) => <a className="repo-item" href={href} target="_blank" rel="noreferrer" key={name}><div><strong>{name}</strong><p>{copy}</p></div><span>{language} ↗</span></a>)}
              </div>
            </div>
          </motion.section>

          <motion.section className="home-section" id="technologies" {...reveal}>
            <SectionHead number="04" label="Technologies" title={<>A focused working <em>stack</em>.</>} />
            <div className="technology-groups">
              {technologies.map(([group, items]) => <div key={group as string}><p>{group}</p><div>{(items as string[]).map((item) => <span key={item}>{item}</span>)}</div></div>)}
            </div>
          </motion.section>

          <motion.section className="home-section resume-block" id="resume" {...reveal}>
            <div><span className="section-kicker">Résumé · PDF</span><h2>The complete record.</h2><p>Experience, projects, education, achievements, and technical work.</p></div>
            <Button href="/Cherika_Kaushal_CV.pdf" target="_blank">Download résumé</Button>
          </motion.section>

          <motion.section className="home-section contact-block" id="contact" {...reveal}>
            <div><span className="section-kicker">Contact</span><h2>Let’s discuss <em>thoughtful</em> software.</h2></div>
            <div className="contact-links">
              <TextLink href="mailto:cherikakaushal@gmail.com">Email</TextLink>
              <TextLink href="https://github.com/cherikakaushal" target="_blank" rel="noreferrer">GitHub</TextLink>
              <TextLink href="https://www.linkedin.com/in/cherika-kaushal-4b9b8b30b" target="_blank" rel="noreferrer">LinkedIn</TextLink>
              <TextLink href="https://cherikakaushal.github.io/">Portfolio</TextLink>
            </div>
          </motion.section>
        </main>

        <footer className="home-main site-footer"><div><strong>Cherika Kaushal</strong><span>Software Engineer</span></div><div><a href="https://github.com/cherikakaushal">GitHub</a><a href="https://www.linkedin.com/in/cherika-kaushal-4b9b8b30b">LinkedIn</a><span>© 2026</span></div></footer>
      </div>
    </>
  );
}

function SectionHead({ number, label, title }: { number: string; label: string; title: React.ReactNode }) {
  return <header className="home-section-head"><div><span>{number}</span><p>{label}</p></div><h2>{title}</h2></header>;
}
