import './About.css';

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <h2 className="section__title">About Me</h2>
        <div className="about__grid">
          <div className="about__avatar">
            <div className="about__avatar-placeholder">
              <span>M</span>
            </div>
          </div>
          <div className="about__text">
            <p>
              Welcome! I&apos;m <strong>mitchou10</strong>, a developer who loves
              building things with code. I enjoy working on projects that challenge
              me and help me grow.
            </p>
            <p>
              When I&apos;m not coding, I&apos;m exploring new technologies,
              contributing to open-source projects, and continuously improving my
              craft.
            </p>
            <p>
              This portfolio is a work in progress — more details and projects
              are coming soon!
            </p>
            <div className="about__links">
              <a
                href="https://github.com/mitchou10"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--outline btn--sm"
              >
                GitHub Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
