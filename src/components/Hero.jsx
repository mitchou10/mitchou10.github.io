import { Button } from '@/components/ui/button';

const LLM_STACK = ['Transformers', 'RAG', 'Embeddings', 'Evaluation'];

const HERO_HIGHLIGHTS = [
  {
    title: 'From Data to Decision',
    description: 'I design pipelines that turn raw signals into reliable actions.',
  },
  {
    title: 'LLM + Product Thinking',
    description: 'I build AI features with clear UX goals and measurable outcomes.',
  },
  {
    title: 'Fast Iteration Loop',
    description: 'Experiment, evaluate, and ship with short feedback cycles.',
  },
];

export default function Hero() {
  const handleContact = (e) => {
    e.preventDefault();
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleProjects = (e) => {
    e.preventDefault();
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section
      id="hero"
      className="relative mb-10 flex min-h-[calc(100vh-6rem)] scroll-mt-24 items-center overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/95 via-slate-950 to-slate-950 px-5 py-12 sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.16),transparent_62%)]" aria-hidden="true" />
      <div
        className="absolute inset-0 z-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:32px_32px]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="text-center lg:text-left">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">Data Science Portfolio</p>
          <h1 className="bg-gradient-to-r from-white via-cyan-100 to-cyan-300 bg-clip-text text-4xl font-extrabold leading-tight text-transparent sm:text-5xl lg:text-6xl">
            Turning Data and LLMs into
            <span className="block">Decision Systems</span>
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base lg:mx-0">
            I am mitchou10, Senior Data Scientist. I build end-to-end pipelines,
            evaluate model behavior, and deliver production features with strong
            statistical grounding and measurable business impact.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
            {LLM_STACK.map((item) => (
              <span
                key={item}
                className="rounded-md border border-slate-700 bg-slate-900/85 px-3 py-1 text-xs font-medium text-slate-300"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <Button onClick={handleProjects} size="lg">
              Explore Projects
            </Button>
            <Button onClick={handleContact} variant="outline" size="lg">
              Discuss a Dataset
            </Button>
          </div>

          <div className="mt-7 grid grid-cols-3 gap-2 sm:max-w-sm">
            <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-2 text-center">
              <p className="font-mono text-sm font-semibold text-cyan-300">0.93</p>
              <p className="text-[10px] uppercase tracking-wide text-slate-400">Precision</p>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-2 text-center">
              <p className="font-mono text-sm font-semibold text-cyan-300">0.89</p>
              <p className="text-[10px] uppercase tracking-wide text-slate-400">Recall</p>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-2 text-center">
              <p className="font-mono text-sm font-semibold text-cyan-300">0.91</p>
              <p className="text-[10px] uppercase tracking-wide text-slate-400">F1</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {HERO_HIGHLIGHTS.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-sm shadow-cyan-900/10 backdrop-blur-sm"
            >
              <p className="text-sm font-semibold text-cyan-200">{item.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-400">{item.description}</p>
            </article>
          ))}

          <article className="rounded-2xl border border-cyan-500/25 bg-gradient-to-r from-cyan-500/10 via-slate-900/80 to-slate-900/80 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-cyan-300">Execution Flow</p>
            <p className="mt-2 font-mono text-xs text-slate-300">observe -&gt; model -&gt; evaluate -&gt; deploy</p>
          </article>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/80 to-transparent" aria-hidden="true" />
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
        <div className="h-4 w-4 rotate-45 border-b-2 border-r-2 border-slate-400" />
      </div>
    </section>
  );
}
