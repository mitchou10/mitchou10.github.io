import './Hero.css';

export default function Hero() {
  const handleContact = (e) => {
    e.preventDefault();
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleProjects = (e) => {
    e.preventDefault();
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero">
      <div className="hero__content">
        <p className="hero__greeting">Hi, I&apos;m</p>
        <h1 className="hero__name">mitchou10</h1>
        <h2 className="hero__title">Senior Data Scientist</h2>
        <p className="hero__description">
          I build things for company. Valuable insights using AI.
        </p>
        <div className="hero__cta">
          <a href="#projects" className="btn btn--primary" onClick={handleProjects}>
            View Projects
          </a>
          <a href="#contact" className="btn btn--outline" onClick={handleContact}>
            Get in Touch
          </a>
        </div>
      </div>
      <div className="hero__scroll-hint" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}
