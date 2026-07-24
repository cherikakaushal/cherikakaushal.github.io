import { useEffect, useRef, useState } from 'react';

const skills = ['python', 'typescript', 'react', 'next.js', 'node.js', 'express', 'mongodb', 'rest apis', 'jwt', 'pandas'];

const timeline = [
  {
    date: '2026.05 — 2026.07',
    title: 'Summer Research Intern',
    detail: 'IIT Ropar · Built two full-stack healthcare research platforms, secure APIs, researcher dashboards, and wearable-data workflows.',
  },
  {
    date: '2025.01 — present',
    title: 'Software Development Intern',
    detail: 'BuildVR · Immersive VR software, interactive 3D applications, testing, deployment, and feature implementation.',
  },
  {
    date: '2025.01 — present',
    title: 'Marketing Intern',
    detail: 'Grubox · Digital campaigns, content planning, brand outreach, and community engagement.',
  },
  {
    date: '2025',
    title: 'Open Source Contributor',
    detail: 'GirlScript Summer of Code · Contributions across distributed development teams.',
  },
  {
    date: '2023 — 2027',
    title: 'B.Tech Computer Science & Engineering',
    detail: 'Punjabi University, Patiala · CGPA 7.89/10.',
  },
  {
    date: 'Recognition',
    title: 'GDG TechSprint Hackathon Winner',
    detail: 'Also participated in Smart India Hackathon 2025, Flipkart GRiD, and GenAI Exchange Hackathon 2025.',
  },
];

export function About() {
  const ref = useRef<HTMLElement | null>(null);
  const [openItem, setOpenItem] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.querySelectorAll<HTMLElement>('.about-reveal').forEach((element, index) => {
        setTimeout(() => {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }, index * 100);
      });
    }), { threshold: 0.12 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="about" id="about" ref={ref}>
      <div className="about-inner">
        <div className="section-header">
          <span className="section-label">/ experience</span>
          <h2 className="section-title">research, software<br /><em>& shipped work</em></h2>
        </div>
        <div className="about-layout">
          <div>
            <div className="about-stat about-reveal"><span className="stat-number">02</span><span className="stat-label">research systems delivered</span></div>
            <div className="about-divider" />
            <p className="about-location about-reveal">Research software<br />immersive systems<br />technical communication</p>
          </div>
          <div className="about-text">
            <p className="about-para about-reveal">I can take a research requirement from conversation to architecture, implementation, validation, and a system people can use.</p>
            <p className="about-para light about-reveal">I am most useful where software quality affects the quality of the evidence collected.</p>
            <div className="about-skills about-reveal">{skills.map((skill) => <span key={skill} className="about-skill w3-tag">{skill}</span>)}</div>
          </div>
        </div>
        <div className="research-timeline about-reveal">
          <p className="timeline-label">experience trace</p>
          <div className="timeline-list">{timeline.map((item, index) => {
            const isOpen = openItem === index;
            return <article key={`${item.date}-${item.title}`} className={`timeline-item${isOpen ? ' open' : ''}`}>
              <button type="button" className="timeline-trigger" onClick={() => setOpenItem(isOpen ? -1 : index)} aria-expanded={isOpen}>
                <span className="timeline-year">{item.date}</span>
                <span className="timeline-title">{item.title}</span>
                <span className="timeline-toggle">{isOpen ? '−' : '+'}</span>
              </button>
              {isOpen && <p className="timeline-detail">{item.detail}</p>}
            </article>;
          })}</div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div><div className="footer-logo">ck<em>.</em></div><p className="footer-tagline">research software for real conditions</p></div>
        <div className="footer-links">
          <a href="/Cherika_Kaushal_CV.pdf" target="_blank" className="footer-link">résumé ↗</a>
          <a href="https://github.com/cherikakaushal" target="_blank" rel="noreferrer" className="footer-link">github ↗</a>
          <a href="https://www.linkedin.com/in/cherika-kaushal-4b9b8b30b" target="_blank" rel="noreferrer" className="footer-link">linkedin ↗</a>
          <a href="mailto:cherikakaushal@gmail.com" className="footer-link">cherikakaushal@gmail.com</a>
        </div>
      </div>
      <div className="footer-bottom"><span className="footer-copy">© 2026 Cherika Kaushal</span><span className="footer-made">Patiala, India</span></div>
    </footer>
  );
}
