import { useState, useEffect } from 'react';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition ${
        scrolled ? 'border-b border-slate-800 bg-slate-950/90 backdrop-blur' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a
          className="text-lg font-bold tracking-tight text-cyan-400 transition hover:text-cyan-300"
          href="#hero"
          onClick={(e) => handleNav(e, '#hero')}
        >
          mitchou10
        </a>

        <button
          className="inline-flex items-center justify-center rounded-md border border-slate-700 p-2 text-slate-200 md:hidden"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <div className="flex flex-col gap-1.5">
            <span className={`block h-0.5 w-5 bg-current transition ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block h-0.5 w-5 bg-current transition ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`block h-0.5 w-5 bg-current transition ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
          </div>
        </button>

        <ul className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                className="text-sm font-medium text-slate-300 transition hover:text-cyan-300"
                href={href}
                onClick={(e) => handleNav(e, href)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {menuOpen && (
        <ul className="mx-4 mb-4 space-y-2 rounded-xl border border-slate-800 bg-slate-900/95 p-4 md:hidden">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                className="block rounded-md px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
                href={href}
                onClick={(e) => handleNav(e, href)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
