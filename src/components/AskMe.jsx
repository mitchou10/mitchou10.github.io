import { useEffect, useRef } from 'react';
import { Globe } from 'lucide-react';

import AskMeChat from './AskMeChat';

/* ─── Globe inline ────────────────────────────────────────── */

function GlobePanel() {
  const ref = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    let globe = null;
    let mounted = true;

    const init = () => {
      if (!mounted || !ref.current || !containerRef.current) return;
      const w = containerRef.current.offsetWidth;
      const h = containerRef.current.offsetHeight;
      if (!w || !h) return;

      import('globe.gl').then((mod) => {
        if (!mounted || !ref.current) return;
        const Globe = mod.default || mod;
        globe = Globe()(ref.current)
          .width(w)
          .height(h)
          .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
          .atmosphereColor('rgba(34,211,238,0.35)')
          .backgroundColor('#00000000')
          .enablePointerInteraction(true)
          .autoRotate(true)
          .autoRotateSpeed(0.6);
      }).catch(() => {});
    };

    // Small delay so the container has been painted and has real dimensions
    const t = setTimeout(init, 80);

    return () => {
      clearTimeout(t);
      mounted = false;
      try { if (globe?.renderer) globe.renderer().dispose(); } catch (_) {}
    };
  }, []);

  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-700/70 bg-slate-950/50 overflow-hidden">
      <div className="flex items-center gap-2 border-b border-slate-800 px-5 py-3">
        <Globe className="h-3.5 w-3.5 text-cyan-400" />
        <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400">Globe interactif</p>
      </div>
      <div ref={containerRef} className="flex-1" style={{ minHeight: 0 }}>
        <div ref={ref} className="w-full h-full" />
      </div>
    </div>
  );
}

/* ─── Section ─────────────────────────────────────────────── */

export default function AskMe() {
  return (
    <section
      id="ask-me"
      className="mb-10 scroll-mt-24 rounded-3xl border border-slate-800 bg-slate-900/35 px-6 py-10"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center lg:text-left">
          <h2 className="text-3xl font-bold text-slate-100 sm:text-4xl">Ask Me</h2>
          <p className="mt-2 text-slate-400">Explore mon profil ou interagis avec le globe</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2" style={{ height: 520 }}>
          <AskMeChat />
          <GlobePanel />
        </div>
      </div>
    </section>
  );
}
