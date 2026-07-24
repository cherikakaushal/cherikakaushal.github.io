import { CSSProperties, useEffect, useRef } from 'react';

const projects = [
  {
    index: '01',
    title: "Women's Health Research Platform",
    description: 'Designed and built the participant and researcher sides of a longitudinal health study: registration, symptom and menstrual-health logs, questionnaires, dashboards, and dataset export.',
    tags: ['react', 'typescript', 'node.js', 'mongodb', 'jwt'],
    link: 'https://github.com/cherikakaushal/women_health_research_platform',
  },
  {
    index: '02',
    title: 'Stress Management Research Platform',
    description: 'Built the study workflow linking stress assessments and managed sessions with wearable physiological data, secure access, and researcher review.',
    tags: ['research-software', 'wearables', 'rest-api', 'mongodb'],
    link: 'https://github.com/cherikakaushal/stress-research-platform',
  },
  {
    index: '03',
    title: 'Signal vs Noise',
    description: 'Simulates missing values and noise to measure how data degradation changes system outputs and where robustness begins to fail.',
    tags: ['python', 'pandas', 'numpy', 'matplotlib'],
    link: 'https://github.com/cherikakaushal/signal-vs-noise',
  },
  {
    index: '04',
    title: 'When Systems Break',
    description: 'A controlled failure framework for examining system resilience rather than reporting performance only under clean conditions.',
    tags: ['failure-analysis', 'simulation', 'ml', 'systems'],
    link: 'https://github.com/cherikakaushal/when-systems-break',
  },
  {
    index: '05',
    title: 'ARPIS',
    description: 'A modular interface for AI-assisted research-paper exploration and organisation.',
    tags: ['react', 'ai', 'research-tools'],
    link: 'https://github.com/cherikakaushal/arpis-AI-Research-Paper-Intelligence-System',
  },
  {
    index: '06',
    title: 'Symptom Scope',
    description: 'An exploratory health prediction system built around incomplete and ambiguous symptom inputs.',
    tags: ['health-tech', 'prediction', 'ml'],
    link: 'https://github.com/cherikakaushal/symptom-scope',
  },
];

export default function Work() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.querySelectorAll<HTMLElement>('.proj-card').forEach((element, index) => {
        setTimeout(() => {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }, index * 90);
      });
    }), { threshold: 0.08 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="work" id="work" ref={ref}>
      <div className="work-inner">
        <div className="section-header">
          <span className="section-label">/ selected work</span>
          <h2 className="section-title">selected systems<br /><em>& experiments</em></h2>
        </div>
        <div className="focus-card w3-card">
          <div>
            <p className="focus-kicker">Current focus</p>
            <h3 className="focus-title">From protocol to deployed research workflow</h3>
            <p className="focus-place">Two independent full-stack study systems</p>
          </div>
          <div className="focus-tags">
            {['Participant systems', 'Research dashboards', 'Wearable data', 'Secure APIs'].map((tag) => <span key={tag} className="focus-tag">{tag}</span>)}
          </div>
        </div>
        <div className="projects-grid">
          {projects.map((project) => {
            const style: CSSProperties = { cursor: 'pointer' };
            return <article key={project.index} className="proj-card w3-card" onClick={() => window.open(project.link, '_blank')} style={style}>
              <div className="proj-top"><span className="proj-num">{project.index}</span><span className="proj-arrow">view ↗</span></div>
              <h3 className="proj-title">{project.title}</h3>
              <p className="proj-desc">{project.description}</p>
              <div className="proj-tags">{project.tags.map((tag) => <span key={tag} className="proj-tag">{tag}</span>)}</div>
            </article>;
          })}
        </div>
      </div>
    </section>
  );
}
