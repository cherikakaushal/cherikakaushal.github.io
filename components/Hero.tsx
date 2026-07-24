import { useEffect, useRef } from 'react';

export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    heroRef.current?.querySelectorAll<HTMLElement>('.hero-anim').forEach((element, index) => {
      element.style.animationDelay = `${0.15 + index * 0.12}s`;
      element.classList.add('fade-in');
    });
  }, []);

  return (
    <section className="hero" ref={heroRef} id="hero">
      <div className="hero-inner w3-container">
        <p className="hero-eyebrow hero-anim">Cherika Kaushal · Software &amp; research</p>
        <h1 className="hero-name hero-anim">
          building useful systems
          <br />
          around <em>complex data</em>
        </h1>
        <p className="hero-current hero-anim">
          I design and build full-stack software for healthcare studies, data-quality
          experiments, and interactive systems—from the first workflow to the final dataset.
        </p>
        <div className="hero-buttons hero-anim">
          <a href="#work" className="btn btn-primary">selected work</a>
          <a href="/Cherika_Kaushal_CV.pdf" target="_blank" className="btn btn-ghost">résumé</a>
          <a href="https://github.com/cherikakaushal" target="_blank" rel="noreferrer" className="btn btn-ghost">github</a>
          <a href="mailto:cherikakaushal@gmail.com" className="btn btn-ghost">email</a>
        </div>
      </div>
      <div className="hero-scroll"><span className="hero-scroll-text">scroll</span><div className="hero-scroll-line" /></div>
    </section>
  );
}
