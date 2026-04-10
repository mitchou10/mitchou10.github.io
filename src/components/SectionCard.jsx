import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronRight, X } from 'lucide-react';

/**
 * SectionCard — renders a compact clickable card in the page.
 * Clicking the header opens a portal modal with the full content (children).
 */
export default function SectionCard({ id, title, description, children }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <section id={id} className="scroll-mt-24">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group flex w-full items-center gap-4 rounded-3xl border border-slate-800 bg-slate-900/40 px-6 py-6 text-left transition hover:border-cyan-500/50 hover:bg-slate-800/40"
        >
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold text-slate-100 transition-colors group-hover:text-cyan-300">
              {title}
            </h2>
            {description && (
              <p className="mt-1 text-sm text-slate-400">{description}</p>
            )}
          </div>
          <ChevronRight className="h-5 w-5 shrink-0 text-slate-500 transition group-hover:translate-x-0.5 group-hover:text-cyan-400" />
        </button>
      </section>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${id}-modal-title`}
          >
            {/* Backdrop */}
            <button
              type="button"
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
              aria-label="Close"
              onClick={() => setOpen(false)}
            />

            {/* Panel */}
            <div className="relative z-10 flex max-h-[90vh] w-full max-w-5xl flex-col rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl shadow-slate-950/50">
              {/* Sticky header */}
              <div className="flex shrink-0 items-center justify-between border-b border-slate-800 px-6 py-4">
                <h2
                  id={`${id}-modal-title`}
                  className="text-xl font-bold text-slate-100"
                >
                  {title}
                </h2>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 text-slate-400 transition hover:border-cyan-400 hover:text-cyan-300"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Scrollable body */}
              <div className="overflow-y-auto px-6 py-8">
                {children}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
