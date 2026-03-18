import { useMemo } from 'react';

import experienceSkills from '@/data/experience-skills.json';

export default function TimelineVisuals() {
  const normalizedSkills = useMemo(
    () =>
      experienceSkills
        .map((item) => {
          if (typeof item === 'string') {
            return { label: item, usage: '' };
          }
          return {
            label: item?.label || item?.name || '',
            usage: item?.usage || item?.description || '',
          };
        })
        .filter((item) => item.label),
    [],
  );

  return (
    <div className="mt-6 space-y-3">
      <article className="rounded-2xl border border-cyan-500/25 bg-gradient-to-r from-cyan-500/8 via-slate-900/70 to-slate-900/70 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-300">Skills</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {normalizedSkills.map((skill) => (
            <div key={skill.label} className="group relative">
              <button
                type="button"
                title={skill.usage || skill.label}
                className="rounded-full border border-slate-700 bg-slate-900/75 px-3 py-1 text-xs font-medium text-slate-200 transition hover:border-cyan-400 focus-visible:border-cyan-400 focus-visible:outline-none"
              >
                {skill.label}
              </button>

              {skill.usage && (
                <div className="pointer-events-none invisible absolute left-1/2 top-[calc(100%+8px)] z-20 w-64 -translate-x-1/2 rounded-lg border border-slate-700 bg-slate-950/95 px-3 py-2 text-left text-xs text-slate-300 opacity-0 shadow-lg transition duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  {skill.usage}
                </div>
              )}
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}
