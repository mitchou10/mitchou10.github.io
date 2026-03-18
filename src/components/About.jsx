export default function About() {
  return (
    <section id="about" className="mb-12 rounded-3xl border border-slate-800 bg-slate-900/40 px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-3xl font-bold text-slate-100 sm:text-4xl">About Me</h2>
        <div className="mt-10 grid items-start gap-8 md:grid-cols-[auto_1fr]">
          <div className="flex justify-center">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 text-4xl font-extrabold text-slate-950 shadow-lg shadow-cyan-500/20 sm:h-36 sm:w-36">
              <span>M</span>
            </div>
          </div>
          <div className="space-y-4 text-slate-300">
            <p className="leading-relaxed">
              Welcome! I&apos;m <strong>mitchou10</strong>, a developer who loves
              building things with code. I enjoy working on projects that challenge
              me and help me grow.
            </p>
            <p className="leading-relaxed">
              When I&apos;m not coding, I&apos;m exploring new technologies,
              contributing to open-source projects, and continuously improving my
              craft.
            </p>
            <p className="leading-relaxed">
              This portfolio is a work in progress — more details and projects
              are coming soon!
            </p>
            <div className="pt-2">
              <a
                href="https://github.com/mitchou10"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-cyan-400 hover:text-cyan-300"
              >
                GitHub Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
