import { useState, useEffect } from 'react';

import { Search } from 'lucide-react';

import SearchDialog from './SearchDialog';

const APP_VERSION = import.meta.env.VITE_APP_VERSION || 'dev';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Experiences', href: '#experiences' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setSearchOpen(true);
      }
    };

    const onOpenSearch = () => setSearchOpen(true);

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('open-site-search', onOpenSearch);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('open-site-search', onOpenSearch);
    };
  }, []);

  const handleNav = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <>
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
            <span className="flex items-center gap-2">
              <span>mitchou10</span>
              <span className="rounded border border-slate-700 px-1.5 py-0.5 text-[10px] font-medium text-slate-400">
                v{APP_VERSION}
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-3 md:flex">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-cyan-400 hover:text-cyan-200"
            >
              <Search className="h-3.5 w-3.5" aria-hidden="true" />
              Search
              <span className="rounded border border-slate-700 px-1.5 py-0.5 text-[10px] text-slate-400">Ctrl K</span>
            </button>

            <ul className="flex items-center gap-7">
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

          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="inline-flex items-center justify-center rounded-md border border-slate-700 p-2 text-slate-200"
              aria-label="Open search"
            >
              <Search className="h-4 w-4" aria-hidden="true" />
            </button>

            <button
              className="inline-flex items-center justify-center rounded-md border border-slate-700 p-2 text-slate-200"
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <div className="flex flex-col gap-1.5">
                <span className={`block h-0.5 w-5 bg-current transition ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
                <span className={`block h-0.5 w-5 bg-current transition ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`block h-0.5 w-5 bg-current transition ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
              </div>
            </button>
          </div>
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

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
