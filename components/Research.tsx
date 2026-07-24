const interests = ['Controlled failure experiments', 'Missing-data simulation', 'Data-quality visualisation', 'Software validation'];
const currentWork = ['How does missingness change an output?', 'Which failures stay hidden by aggregate metrics?', 'How should research tools expose uncertainty?', 'What makes participant data trustworthy?'];

export default function Research() {
  return (
    <section className="research" id="research">
      <div className="research-inner">
        <div className="section-header">
          <span className="section-label">/ research</span>
          <h2 className="section-title">questions first.<br /><em>systems second.</em></h2>
        </div>
        <div className="research-brief">
          <div>
            <p className="research-year">Current focus · 2026</p>
            <p className="research-copy">
              My work sits between experimental design and software engineering: translating study
              requirements into reliable data flows, then testing what those systems do when their
              assumptions no longer hold.
            </p>
          </div>
          <div className="research-lists">
            <div>
              <p className="research-list-label">Methods I use</p>
              <ul>{interests.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
            <div>
              <p className="research-list-label">Questions I am asking</p>
              <ul>{currentWork.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
