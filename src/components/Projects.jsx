import ProjectsVisuals from './ProjectsVisuals';
import SectionCard from './SectionCard';

const PROJECTS = [
  {
    title: 'Portfolio Site',
    description:
      'This very portfolio — built with React and Vite. Clean, responsive, and deployed on GitHub Pages.',
    tags: ['React', 'Vite', 'Tailwind'],
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
    <article className="flex h-full flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition hover:-translate-y-1 hover:border-cyan-500/70">
      <div>
        <h3 className="text-xl font-semibold text-slate-100">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">{description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span key={t} className="rounded-full border border-slate-700 px-3 py-1 text-xs font-medium text-slate-300">
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-cyan-400 hover:text-cyan-300"
          >
            GitHub
          </a>
        )}
        {demo && (
          <a
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Live Demo
          </a>
        )}
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <SectionCard id="projects" title="Projects" description="Selected work and ongoing builds">
      <ProjectsVisuals />
      <div className="mt-7 grid gap-4 md:grid-cols-2">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.title} {...p} />
        ))}
      </div>
    </SectionCard>
  );
}
