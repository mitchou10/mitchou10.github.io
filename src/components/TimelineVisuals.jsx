import { useMemo, useState } from 'react';
import { BarChart3, CalendarClock, Rocket } from 'lucide-react';

import { Button } from '@/components/ui/button';
import currentAllocation from '@/data/current-allocation.json';

const ITEMS_PER_PAGE = 5;

export default function TimelineVisuals() {
  const [allocationPage, setAllocationPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(currentAllocation.length / ITEMS_PER_PAGE));
  const safeAllocationPage = Math.min(allocationPage, totalPages);
  const paginatedAllocation = useMemo(() => {
    const start = (safeAllocationPage - 1) * ITEMS_PER_PAGE;
    return currentAllocation.slice(start, start + ITEMS_PER_PAGE);
  }, [safeAllocationPage]);

  return (
    <div className="mt-6 space-y-3">
      <article className="rounded-2xl border border-slate-700/70 bg-slate-950/45 p-4">
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 px-2.5 py-1">
            <Rocket className="h-3.5 w-3.5 text-cyan-300" aria-hidden="true" />
            +6 months momentum
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 px-2.5 py-1">
            <CalendarClock className="h-3.5 w-3.5 text-cyan-300" aria-hidden="true" />
            Bi-weekly cadence
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 px-2.5 py-1">
            <BarChart3 className="h-3.5 w-3.5 text-cyan-300" aria-hidden="true" />
            KPI tracked
          </span>
        </div>
      </article>

      <article className="rounded-2xl border border-cyan-500/25 bg-gradient-to-r from-cyan-500/8 via-slate-900/70 to-slate-900/70 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-300">Current Allocation</p>
        <div className="mt-3 space-y-3">
          {paginatedAllocation.map((item) => (
            <div key={item.label}>
              <div className="mb-1 flex items-center justify-between text-xs text-slate-300">
                <span>{item.label}</span>
                <span>{item.percent}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-800">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                  style={{ width: `${item.percent}%` }}
                />
              </div>
            </div>
          ))}

          {totalPages > 1 && (
            <div className="mt-2 flex items-center justify-between gap-3 rounded-lg border border-slate-800 bg-slate-950/60 p-3">
              <Button
                variant="outline"
                onClick={() => setAllocationPage((page) => Math.max(1, page - 1))}
                disabled={safeAllocationPage === 1}
              >
                Precedent
              </Button>
              <p className="text-sm text-slate-300">
                Page {safeAllocationPage} / {totalPages}
              </p>
              <Button
                variant="outline"
                onClick={() => setAllocationPage((page) => Math.min(totalPages, page + 1))}
                disabled={safeAllocationPage === totalPages}
              >
                Suivant
              </Button>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
