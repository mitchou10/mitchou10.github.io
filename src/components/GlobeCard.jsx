import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import allocation from '@/data/current-allocation.json';
import skills from '@/data/experience-skills.json';

const MODAL_W = 480;
const MODAL_H = 420;
const MAX_BARS = 5;
const MAX_SKILLS = 8;

function GlobeModal({ onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    let globeInstance = null;
    let mounted = true;

    import('globe.gl').then((mod) => {
      if (!mounted || !ref.current) return;
      const Globe = mod.default || mod;
      globeInstance = Globe()(ref.current)
        .width(MODAL_W)
        .height(MODAL_H)
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
        .atmosphereColor('rgba(34,211,238,0.4)')
        .backgroundColor('#00000000')
        .enablePointerInteraction(true)
        .autoRotate(true)
        .autoRotateSpeed(0.6);
    }).catch(() => {});

    return () => {
      mounted = false;
      try { if (globeInstance?.renderer) globeInstance.renderer().dispose(); } catch (_) {}
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Globe interactif"
    >
      <div
        className="relative rounded-3xl border border-slate-700 bg-slate-950 shadow-2xl shadow-cyan-900/30 overflow-hidden"
        style={{ width: MODAL_W }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 pt-4 pb-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400">Globe interactif</p>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Fermer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div ref={ref} style={{ width: MODAL_W, height: MODAL_H }} />
      </div>
    </div>,
    document.body,
  );
}

export default function GlobeCard() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <article className="rounded-2xl border border-slate-700 bg-slate-900/60 p-5 shadow-sm shadow-cyan-900/10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400">Data Visualisation</p>
            <p className="mt-0.5 text-xs text-slate-500">Compétences &amp; allocations actuelles</p>
          </div>
          <button
            onClick={() => setOpen(true)}
            title="Ouvrir le globe interactif"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-cyan-400 hover:border-cyan-500/60 hover:bg-slate-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
          </button>
        </div>

        {/* Bar chart — allocation */}
        <div className="space-y-2 mb-5">
          {allocation.slice(0, MAX_BARS).map((item) => (
            <div key={item.label}>
              <div className="flex justify-between mb-0.5">
                <span className="text-[11px] text-slate-400">{item.label}</span>
                <span className="text-[11px] font-mono text-cyan-300">{item.percent}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-800">
                <div
                  className="h-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-300 transition-all duration-700"
                  style={{ width: `${item.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Skills tags */}
        <div className="border-t border-slate-800 pt-4">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500">Stack</p>
          <div className="flex flex-wrap gap-1.5">
            {skills.slice(0, MAX_SKILLS).map((s) => (
              <span
                key={s.label}
                className="rounded-full border border-slate-700 bg-slate-900 px-2.5 py-0.5 text-[11px] font-medium text-slate-300"
              >
                {s.label}
              </span>
            ))}
            {skills.length > MAX_SKILLS && (
              <span className="rounded-full border border-slate-700 bg-slate-900 px-2.5 py-0.5 text-[11px] text-slate-500">
                +{skills.length - MAX_SKILLS}
              </span>
            )}
          </div>
        </div>
      </article>
      {open && <GlobeModal onClose={() => setOpen(false)} />}
    </>
  );
}
