import { useEffect, useMemo, useState } from 'react';

import { ExternalLink, Search, X } from 'lucide-react';

import { REMOTE_DOC_SOURCES } from '@/config/searchDocs';

const LOCAL_SEARCH_ITEMS = [
  {
    id: 'hero',
    title: 'Hero - Data and LLM intro',
    snippet: 'Turning data and LLMs into decision systems.',
    href: '#hero',
    source: 'local',
  },
  {
    id: 'about',
    title: 'About - Profile',
    snippet: 'Background, workflow, and data science direction.',
    href: '#about',
    source: 'local',
  },
  {
    id: 'timeline',
    title: 'Timeline - Journey',
    snippet: 'Recent milestones and archive of older events.',
    href: '#timeline',
    source: 'local',
  },
  {
    id: 'projects',
    title: 'Projects - Selected work',
    snippet: 'Project cards with links to GitHub and demos.',
    href: '#projects',
    source: 'local',
  },
  {
    id: 'contact',
    title: 'Contact - Social links',
    snippet: 'LinkedIn and GitHub contact channels.',
    href: '#contact',
    source: 'local',
  },
];

function stripMarkdown(markdownText) {
  return markdownText
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/^#+\s+/gm, '')
    .replace(/[>*_~-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export default function SearchDialog({ open, onClose }) {
  const [query, setQuery] = useState('');
  const [remoteDocs, setRemoteDocs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) {
      return;
    }

    let cancelled = false;

    const fetchDocs = async () => {
      setLoading(true);
      setError('');

      try {
        const docs = await Promise.all(
          REMOTE_DOC_SOURCES.map(async (doc) => {
            const response = await fetch(doc.rawUrl);
            if (!response.ok) {
              throw new Error(`Unable to load ${doc.label}`);
            }

            const markdown = await response.text();
            return {
              id: doc.id,
              title: doc.label,
              snippet: stripMarkdown(markdown).slice(0, 220),
              fullText: stripMarkdown(markdown),
              href: doc.pageUrl,
              source: 'remote-doc',
            };
          }),
        );

        if (!cancelled) {
          setRemoteDocs(docs);
        }
      } catch {
        if (!cancelled) {
          setError('Some remote docs could not be loaded.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchDocs();

    return () => {
      cancelled = true;
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  const results = useMemo(() => {
    const allItems = [...LOCAL_SEARCH_ITEMS, ...remoteDocs];
    const trimmed = query.trim().toLowerCase();

    if (!trimmed) {
      return allItems;
    }

    return allItems.filter((item) => {
      const haystack = `${item.title} ${item.snippet} ${item.fullText || ''}`.toLowerCase();
      return haystack.includes(trimmed);
    });
  }, [query, remoteDocs]);

  const handleLocalNavigation = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    onClose();
  };

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[70] grid place-items-start p-4 pt-24 sm:p-6 sm:pt-28" role="dialog" aria-modal="true" aria-label="Search">
      <button
        type="button"
        className="absolute inset-0 bg-slate-950/80"
        aria-label="Close search"
        onClick={onClose}
      />

      <div className="relative z-10 mx-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/95 shadow-xl shadow-cyan-950/20">
        <div className="flex items-center gap-2 border-b border-slate-800 px-4 py-3">
          <Search className="h-4 w-4 text-slate-400" aria-hidden="true" />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search pages and remote markdown docs"
            className="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
          />
          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-700 text-slate-300 transition hover:border-cyan-400 hover:text-cyan-200"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-auto p-3">
          {loading && <p className="px-2 py-2 text-xs text-slate-400">Loading remote docs...</p>}
          {error && <p className="px-2 py-2 text-xs text-amber-300">{error}</p>}

          {results.length === 0 ? (
            <p className="px-2 py-4 text-sm text-slate-400">No result for this query.</p>
          ) : (
            <ul className="space-y-2">
              {results.map((item) => (
                <li key={`${item.source}-${item.id}`}>
                  {item.source === 'local' ? (
                    <button
                      type="button"
                      onClick={() => handleLocalNavigation(item.href)}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-3 text-left transition hover:border-cyan-500/60"
                    >
                      <p className="text-sm font-semibold text-slate-100">{item.title}</p>
                      <p className="mt-1 text-xs text-slate-400">{item.snippet}</p>
                    </button>
                  ) : (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-3 transition hover:border-cyan-500/60"
                    >
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-slate-100">{item.title}</p>
                        <ExternalLink className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                      </div>
                      <p className="mt-1 text-xs text-slate-400">{item.snippet}</p>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
