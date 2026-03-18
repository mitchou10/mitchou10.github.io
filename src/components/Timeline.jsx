import { useEffect, useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import experiencesData from '@/data/experiences.json';

import TimelineVisuals from './TimelineVisuals';

const ITEMS_PER_PAGE = 5;

function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
  });
}

function getExperienceTags(event) {
  const tools = Array.isArray(event.tools) ? event.tools : [];
  const skills = Array.isArray(event.skills) ? event.skills : [];
  return [...tools, ...skills].filter(Boolean);
}

export default function Timeline() {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [olderPage, setOlderPage] = useState(1);

  const sortedEvents = useMemo(
    () => [...experiencesData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [],
  );

  const sixMonthsAgo = useMemo(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
  }, []);

  const recentEvents = sortedEvents.filter((event) => new Date(event.date).getTime() >= sixMonthsAgo.getTime());
  const olderEvents = sortedEvents.filter((event) => new Date(event.date).getTime() < sixMonthsAgo.getTime());

  const olderTotalPages = Math.max(1, Math.ceil(olderEvents.length / ITEMS_PER_PAGE));
  const safeOlderPage = Math.min(olderPage, olderTotalPages);
  const paginatedOlderEvents = useMemo(() => {
    const start = (safeOlderPage - 1) * ITEMS_PER_PAGE;
    return olderEvents.slice(start, start + ITEMS_PER_PAGE);
  }, [olderEvents, safeOlderPage]);

  useEffect(() => {
    if (!isHistoryOpen) {
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsHistoryOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isHistoryOpen]);

  return (
    <section id="experiences" className="mb-10 flex min-h-[calc(100vh-6rem)] scroll-mt-24 items-center rounded-3xl border border-slate-800 bg-slate-900/35 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">Experiences</p>
        <h2 className="mt-2 text-center text-3xl font-bold text-slate-100 sm:text-4xl">Experience That Shaped Me</h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-slate-400">
          Affichage des 6 derniers mois ci-dessous, avec l&apos;historique plus ancien disponible dans une modal.
        </p>

        <TimelineVisuals />

        {olderEvents.length > 0 && (
          <div className="mt-6 flex justify-center">
            <Button variant="outline" onClick={() => setIsHistoryOpen(true)}>
              Voir l&apos;historique ({olderEvents.length} evenements)
            </Button>
          </div>
        )}

        <div className="relative mt-8">
          <div
            className="absolute left-3 top-0 h-full w-px bg-slate-700 md:left-1/2 md:-translate-x-1/2"
            aria-hidden="true"
          />

          <div className="space-y-6">
            {recentEvents.map((item, index) => {
              const isLeft = index % 2 === 0;

              return (
                <article key={`${item.date}-${item.title}`} className="relative pl-10 md:pl-0">
                  <div
                    className="absolute left-0 top-6 h-6 w-6 rounded-full border-4 border-slate-950 bg-cyan-400 md:left-1/2 md:-translate-x-1/2"
                    aria-hidden="true"
                  />

                  <div className={isLeft ? 'md:mr-[52%] md:pr-8' : 'md:ml-[52%] md:pl-8'}>
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5 shadow-sm shadow-cyan-900/10 transition hover:border-cyan-500/60">
                      <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">{formatDate(item.date)}</p>
                      <h3 className="mt-2 text-xl font-semibold text-slate-100">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.description}</p>
                      {getExperienceTags(item).length > 0 && (
                        <div className="mt-3">
                          <p className="text-[11px] uppercase tracking-wide text-slate-500">Skills & Tools</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {getExperienceTags(item).map((tag) => (
                              <span
                                key={`${item.date}-${item.title}-${tag}`}
                                className="rounded-full border border-slate-700 bg-slate-900/80 px-2.5 py-1 text-[11px] font-medium text-slate-300"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}

            {recentEvents.length === 0 && (
              <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-5 text-center text-slate-400">
                Aucun evenement sur les 6 derniers mois pour le moment.
              </div>
            )}
          </div>
        </div>
      </div>

      {isHistoryOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4" role="dialog" aria-modal="true" aria-labelledby="timeline-history-title">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/80"
            aria-label="Fermer la modal"
            onClick={() => setIsHistoryOpen(false)}
          />

          <div className="relative z-10 w-full max-w-3xl max-h-[85vh] overflow-auto rounded-2xl border border-slate-700 bg-slate-900 p-6">
            <button
              type="button"
              className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300"
              aria-label="Fermer"
              onClick={() => {
                setIsHistoryOpen(false);
                setOlderPage(1);
              }}
            >
              x
            </button>

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">Archive</p>
            <h3 id="timeline-history-title" className="mt-2 text-2xl font-bold text-slate-100">
              Evenements anterieurs a 6 mois
            </h3>

            <div className="mt-6 space-y-3">
              {paginatedOlderEvents.map((event) => (
                <article key={`${event.date}-${event.title}`} className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-cyan-400">{formatDate(event.date)}</p>
                  <h5 className="mt-1 text-lg font-semibold text-slate-100">{event.title}</h5>
                  <p className="mt-1 text-sm text-slate-400">{event.description}</p>
                  {getExperienceTags(event).length > 0 && (
                    <div className="mt-3">
                      <p className="text-[11px] uppercase tracking-wide text-slate-500">Skills & Tools</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {getExperienceTags(event).map((tag) => (
                          <span
                            key={`${event.date}-${event.title}-${tag}`}
                            className="rounded-full border border-slate-700 bg-slate-900/80 px-2.5 py-1 text-[11px] font-medium text-slate-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </article>
              ))}

              {olderTotalPages > 1 && (
                <div className="mt-4 flex items-center justify-between gap-3 rounded-lg border border-slate-800 bg-slate-950/70 p-3">
                  <Button
                    variant="outline"
                    onClick={() => setOlderPage((page) => Math.max(1, page - 1))}
                    disabled={safeOlderPage === 1}
                  >
                    Precedent
                  </Button>
                  <p className="text-sm text-slate-300">
                    Page {safeOlderPage} / {olderTotalPages}
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setOlderPage((page) => Math.min(olderTotalPages, page + 1))}
                    disabled={safeOlderPage === olderTotalPages}
                  >
                    Suivant
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
