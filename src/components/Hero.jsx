import { Button } from '@/components/ui/button';
import { BlockMath } from 'react-katex';

const FORMULA_CARDS = [
  {
    name: 'Bayes Update',
    equation: String.raw`P(y\mid x)=\frac{P(x\mid y)P(y)}{P(x)}`,
    description: 'Updates confidence as new observations arrive.',
  },
  {
    name: 'Cross-Entropy Loss',
    equation: String.raw`H(p,q)=-\sum_{x} p(x)\log q(x)`,
    description: 'Measures distance between predicted and true distributions.',
  },
  {
    name: 'Attention Mechanism',
    equation: String.raw`\mathrm{softmax}\!\left(\frac{QK^{T}}{\sqrt{d_k}}\right)V`,
    description: 'Core transformer operator for context-aware token weighting.',
  },
];

const LLM_STACK = ['Transformers', 'RAG', 'Embeddings', 'Fine-tuning', 'Prompt Engineering'];

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
      className="relative mb-10 flex min-h-[calc(100vh-6rem)] scroll-mt-24 items-center overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 px-5 py-12 sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.22),transparent_58%)]" aria-hidden="true" />
      <div
        className="absolute inset-0 z-0 bg-[linear-gradient(rgba(148,163,184,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.14)_1px,transparent_1px)] bg-[size:28px_28px]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-7 lg:grid-cols-[1.05fr_0.95fr]">
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

          <div className="mt-6 grid grid-cols-3 gap-2 sm:max-w-sm">
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

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-lg shadow-cyan-900/15 backdrop-blur-sm sm:p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-400">Core Formulas</p>

          <div className="mt-4 space-y-3">
            {FORMULA_CARDS.map((item) => (
              <article key={item.name} className="rounded-xl border border-slate-800 bg-slate-950/80 p-3 sm:p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">{item.name}</p>
                <div className="mt-1 overflow-x-auto rounded-md border border-cyan-500/20 bg-slate-900/80 px-2 py-1 text-cyan-200 [scrollbar-width:none]">
                  <BlockMath math={item.equation} />
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-400 sm:text-sm">{item.description}</p>
              </article>
            ))}
          </div>

          <div className="mt-3 rounded-lg border border-slate-800 bg-slate-950/80 p-3">
            <p className="text-xs uppercase tracking-wide text-slate-500">LLM Ops</p>
            <p className="mt-1 font-mono text-xs text-slate-400">retrieval -&gt; rank -&gt; generate -&gt; evaluate</p>
            <p className="mt-1 font-mono text-xs text-slate-400">latency p95 &lt; 900ms | grounded answers &gt; 92%</p>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/80 to-transparent" aria-hidden="true" />
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
        <div className="h-4 w-4 rotate-45 border-b-2 border-r-2 border-slate-400" />
      </div>
    </section>
  );
}
