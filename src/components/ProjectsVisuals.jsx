import { Boxes, Gauge, Sparkles } from 'lucide-react';

const PROJECT_KPIS = [
  {
    label: 'Shipped Projects',
    value: '8+',
    detail: 'From prototypes to production-ready iterations.',
    icon: Boxes,
  },
  {
    label: 'Perf Mindset',
    value: 'Fast UX',
    detail: 'Optimized rendering and lightweight delivery.',
    icon: Gauge,
  },
];

const STACK_SPOTLIGHT = ['React', 'Vite', 'Tailwind', 'Docker'];

export default function ProjectsVisuals() {
  return (
    <div className="mt-6 space-y-3">
      <div className="grid gap-3 md:grid-cols-2">
        {PROJECT_KPIS.map((item) => {
          const Icon = item.icon;
          return (
            <article
              key={item.label}
              className="rounded-2xl border border-slate-700/70 bg-slate-950/45 p-4 transition hover:border-cyan-500/60"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">{item.label}</p>
                <Icon className="h-4 w-4 text-cyan-300" aria-hidden="true" />
              </div>
              <p className="mt-2 text-xl font-bold text-cyan-200">{item.value}</p>
              <p className="mt-2 text-sm text-slate-400">{item.detail}</p>
            </article>
          );
        })}

        <article className="rounded-2xl border border-cyan-500/25 bg-gradient-to-r from-cyan-500/8 via-slate-900/70 to-slate-900/70 p-4 md:col-span-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-300">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Stack Spotlight
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {STACK_SPOTLIGHT.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-slate-600/80 bg-slate-900/75 px-3 py-1 text-xs font-medium text-slate-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}
