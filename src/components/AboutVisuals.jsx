const METRICS = [
  { label: 'Experiments', value: '40+' },
  { label: 'Cycle Time', value: '5 days' },
];

const FOCUS_AREAS = [
  'LLM Evaluation',
  'RAG Pipelines',
  'Feature Engineering',
  'MLOps Monitoring',
];

export default function AboutVisuals({ visible, revealBase, shownState, hiddenState }) {
  return (
    <div className="grid gap-3 pt-3 sm:grid-cols-2">
      {METRICS.map((metric, index) => (
        <article
          key={metric.label}
          className={`${revealBase} rounded-2xl border border-slate-700/70 bg-slate-950/45 p-3.5 ${
            visible ? shownState : hiddenState
          }`}
          style={{ transitionDelay: `${620 + index * 90}ms` }}
        >
          <p className="text-xs uppercase tracking-wide text-slate-400">{metric.label}</p>
          <p className="mt-2 text-xl font-bold text-cyan-200">{metric.value}</p>
        </article>
      ))}

      <article
        className={`${revealBase} rounded-2xl border border-cyan-500/25 bg-gradient-to-br from-cyan-500/8 via-slate-900/60 to-slate-950/80 p-3.5 sm:col-span-2 ${
          visible ? shownState : hiddenState
        }`}
        style={{ transitionDelay: '820ms' }}
      >
        <p className="text-xs uppercase tracking-wide text-cyan-300">Current Focus</p>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {FOCUS_AREAS.map((focus, index) => (
            <span
              key={focus}
              className="rounded-full border border-slate-600/80 bg-slate-900/80 px-3 py-1 text-xs font-medium text-slate-200 transition hover:border-cyan-400/70 hover:text-cyan-200"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {focus}
            </span>
          ))}
        </div>
      </article>
    </div>
  );
}
