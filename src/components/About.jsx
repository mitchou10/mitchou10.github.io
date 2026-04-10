import AboutVisuals from './AboutVisuals';
import SectionCard from './SectionCard';

export default function About() {
  return (
    <SectionCard
      id="about"
      title="About Me"
      description="Senior Data Scientist — ML, LLMs & data products"
    >
      <div className="grid items-start gap-8 md:grid-cols-[auto_1fr]">
        <div className="flex justify-center">
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 text-4xl font-extrabold text-slate-950 shadow-lg shadow-cyan-500/20 sm:h-36 sm:w-36">
            <span>M</span>
            </div>
        </div>
        <div className="space-y-4 text-slate-300">
          <p className="leading-relaxed">
            I&apos;m <strong>mitchou10</strong>, a data scientist who enjoys turning messy data into
            clear decisions. I like projects where experimentation, model quality,
            and product impact all matter at the same time.
          </p>
          <p className="leading-relaxed">
            My workflow mixes classic ML thinking with modern LLM patterns: from
            hypothesis framing and feature design to retrieval strategies,
            evaluation loops, and production monitoring.
          </p>
          <p className="leading-relaxed">
            This portfolio is my lab notebook in public: practical experiments,
            shipped prototypes, and lessons learned from building data products.
          </p>
          <div className="pt-2">
            <a
              href="https://github.com/mitchou10"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-cyan-400 hover:text-cyan-300"
            >
              GitHub Profile
            </a>
          </div>

          <AboutVisuals visible={true} revealBase="" shownState="" hiddenState="" />
        </div>
      </div>
    </SectionCard>
  );
}
