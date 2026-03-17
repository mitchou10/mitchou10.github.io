import './Projects.css';

const PROJECTS = [
  {
    title: 'Portfolio Site',
    description:
      'This very portfolio — built with React and Vite. Clean, responsive, and deployed on GitHub Pages.',
    tags: ['React', 'Vite', 'CSS'],
    github: 'https://github.com/mitchou10/mitchou10.github.io',
    demo: 'https://mitchou10.github.io',
  },
  {
    title: 'Coming Soon',
    description:
      'More projects are on the way! Check back soon or visit my GitHub to see what I\'ve been working on.',
    tags: ['...'],
    github: 'https://github.com/mitchou10',
  },
];

function ProjectCard({ title, description, tags, github, demo }) {
  return (
    <div className="project-card">
      <div className="project-card__body">
        <h3 className="project-card__title">{title}</h3>
        <p className="project-card__desc">{description}</p>
        <div className="project-card__tags">
          {tags.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="project-card__links">
        {github && (
          <a href={github} target="_blank" rel="noopener noreferrer" className="btn btn--outline btn--sm">
            GitHub
          </a>
        )}
        {demo && (
          <a href={demo} target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--sm">
            Live Demo
          </a>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section projects">
      <div className="container">
        <h2 className="section__title">Projects</h2>
        <p className="section__subtitle">Things I&apos;ve built</p>
        <div className="projects__grid">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.title} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}
