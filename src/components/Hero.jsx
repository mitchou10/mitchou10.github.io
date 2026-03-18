export default function Hero() {
  const handleContact = (e) => {
    e.preventDefault();
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleProjects = (e) => {
    e.preventDefault();
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative mb-12 flex min-h-[75vh] flex-col items-center justify-center overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 px-6 py-20 text-center"
    >
      <div className="absolute inset-0 -z-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.18),transparent_55%)]" aria-hidden="true" />
      <div className="relative z-10 max-w-3xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">Hi, I&apos;m</p>
        <h1 className="bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-5xl font-extrabold leading-tight text-transparent sm:text-6xl lg:text-7xl">
          mitchou10
        </h1>
        <h2 className="mt-3 text-xl font-medium text-slate-300 sm:text-2xl">Senior Data Scientist</h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
          I build things for company. Valuable insights using AI.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#projects"
            className="inline-flex items-center rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            onClick={handleProjects}
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="inline-flex items-center rounded-lg border border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-100 transition hover:border-cyan-400 hover:text-cyan-300"
            onClick={handleContact}
          >
            Get in Touch
          </a>
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
        <div className="h-4 w-4 rotate-45 border-b-2 border-r-2 border-slate-400" />
      </div>
    </section>
  );
}
