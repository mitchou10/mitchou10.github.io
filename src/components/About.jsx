import { useEffect, useRef, useState } from 'react';
import AboutVisuals from './AboutVisuals';

export default function About() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      setVisible(true);
    }, 300);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      clearTimeout(fallbackTimer);
      observer.disconnect();
    };
  }, []);

  const revealBase =
    'transform transition-all duration-700 ease-out will-change-transform';
  const hiddenState = 'translate-y-5 opacity-0';
  const shownState = 'translate-y-0 opacity-100';

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative mb-10 flex min-h-[calc(100vh-6rem)] scroll-mt-24 items-center overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/40 px-6 py-12"
    >
      <div className="relative z-10 mx-auto max-w-5xl">
        <h2
          className={`text-center text-3xl font-bold text-slate-100 sm:text-4xl ${revealBase} ${
            visible ? shownState : hiddenState
          }`}
        >
          About Me
        </h2>
        <div className="mt-10 grid items-start gap-8 md:grid-cols-[auto_1fr]">
          <div
            className={`flex justify-center ${revealBase} ${
              visible ? shownState : hiddenState
            }`}
            style={{ transitionDelay: '120ms' }}
          >
            <div className="animate-float-soft animate-pulse-glow flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 text-4xl font-extrabold text-slate-950 shadow-lg shadow-cyan-500/20 sm:h-36 sm:w-36">
              <span>M</span>
            </div>
          </div>
          <div className="space-y-4 text-slate-300">
            <p
              className={`leading-relaxed ${revealBase} ${visible ? shownState : hiddenState}`}
              style={{ transitionDelay: '220ms' }}
            >
              I&apos;m <strong>mitchou10</strong>, a data scientist who enjoys turning messy data into
              clear decisions. I like projects where experimentation, model quality,
              and product impact all matter at the same time.
            </p>
            <p
              className={`leading-relaxed ${revealBase} ${visible ? shownState : hiddenState}`}
              style={{ transitionDelay: '320ms' }}
            >
              My workflow mixes classic ML thinking with modern LLM patterns: from
              hypothesis framing and feature design to retrieval strategies,
              evaluation loops, and production monitoring.
            </p>
            <p
              className={`leading-relaxed ${revealBase} ${visible ? shownState : hiddenState}`}
              style={{ transitionDelay: '420ms' }}
            >
              This portfolio is my lab notebook in public: practical experiments,
              shipped prototypes, and lessons learned from building data products.
            </p>
            <div
              className={`pt-2 ${revealBase} ${visible ? shownState : hiddenState}`}
              style={{ transitionDelay: '520ms' }}
            >
              <a
                href="https://github.com/mitchou10"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-cyan-400 hover:text-cyan-300"
              >
                GitHub Profile
              </a>
            </div>

            <AboutVisuals
              visible={visible}
              revealBase={revealBase}
              shownState={shownState}
              hiddenState={hiddenState}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
