import { useEffect, useState } from 'react';

// Ajoute/modifie les evenements ici avec une vraie date ISO (YYYY-MM-DD).
const TIMELINE_EVENTS = [
  {
    date: '2002-05-12',
    title: 'Naissance',
    description: 'Le point de depart de mon parcours.',
    lane: 'top',
    details: [
      { date: '2002-05-12', label: 'Jour de naissance', note: 'Debut de l histoire.' },
      { date: '2002-06-01', label: 'Premiers moments', note: 'Nouveau rythme de vie familial.' },
    ],
  },
  {
    date: '2010-09-01',
    title: 'Curiosite numerique',
    description: 'Premieres explorations du web et des outils digitaux.',
    lane: 'bottom',
    details: [
      { date: '2010-09-01', label: 'Premiere decouverte web', note: 'Curiosite pour les sites et les outils.' },
      { date: '2011-03-14', label: 'Experimentation', note: 'Essais autour de petits outils en ligne.' },
    ],
  },
  {
    date: '2016-06-15',
    title: 'Premiers projets perso',
    description: 'Mise en pratique avec des mini-projets et experimentation.',
    lane: 'top',
    details: [
      { date: '2016-06-15', label: 'Premier mini-projet', note: 'Premier projet termine de bout en bout.' },
      { date: '2017-01-10', label: 'Iteration', note: 'Ameliorations successives et apprentissage rapide.' },
    ],
  },
  {
    date: '2020-10-01',
    title: 'Etudes et progression',
    description: 'Approfondissement des bases techniques et methodologie projet.',
    lane: 'bottom',
    details: [
      { date: '2020-10-01', label: 'Etape etudes', note: 'Structuration de la methode de travail.' },
      { date: '2022-04-22', label: 'Projets plus ambitieux', note: 'Travail sur des projets plus complets.' },
    ],
  },
  {
    date: '2024-03-01',
    title: 'Portfolio et production',
    description: 'Creation et publication de projets concrets en continu.',
    lane: 'top',
    details: [
      { date: '2024-03-01', label: 'Lancement portfolio', note: 'Mise en ligne de la vitrine personnelle.' },
      { date: '2025-01-18', label: 'Nouvelles versions', note: 'Ameliorations UX et nouveaux projets.' },
    ],
  },
  {
    date: '2026-03-17',
    title: "Aujourd'hui",
    description: 'Iteration constante: build, learn, repeat.',
    lane: 'bottom',
    details: [
      { date: '2026-03-17', label: 'Etat actuel', note: 'Focus sur la progression continue.' },
      { date: '2026-03-17', label: 'Prochaine etape', note: 'Nouveaux objectifs techniques et produit.' },
    ],
  },
];

function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function groupDetailsByYear(details = []) {
  const buckets = details.reduce((acc, detail) => {
    const year = new Date(detail.date).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(detail);
    return acc;
  }, {});

  return Object.entries(buckets)
    .sort((a, b) => Number(a[0]) - Number(b[0]))
    .map(([year, entries]) => ({
      year,
      entries: [...entries].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
    }));
}

export default function Skills() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = [...TIMELINE_EVENTS].sort((a, b) =>
    new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  const now = new Date();
  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
  const previousEvents = events.filter((event) => new Date(event.date).getTime() < sixMonthsAgo.getTime());
  const recentEvents = events.filter((event) => new Date(event.date).getTime() >= sixMonthsAgo.getTime());

  const groupedPreviousEvent = previousEvents.length
    ? {
        date: previousEvents[0].date,
        title: 'Avant les 6 derniers mois',
        description: `${previousEvents.length} etapes plus anciennes`,
        lane: 'top',
        isGrouped: true,
        details: previousEvents.flatMap((event) => event.details || []),
      }
    : null;

  const displayedEvents = [
    ...(groupedPreviousEvent ? [groupedPreviousEvent] : []),
    ...recentEvents,
  ];

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedEvent(null);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const groupedModalDetails = selectedEvent?.isGrouped
    ? groupDetailsByYear(selectedEvent.details)
    : [];

  return (
    <section id="timeline" className="mb-12 rounded-3xl border border-slate-800 bg-slate-900/40 px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-3xl font-bold text-slate-100 sm:text-4xl">Timeline</h2>
        <p className="mt-2 text-center text-slate-400">
          Les 6 derniers mois sont accessibles directement, le reste est regroupe
        </p>

        <div className="relative mt-10">
          <div className="absolute left-4 top-0 h-full w-px bg-slate-700/80 md:left-1/2" aria-hidden="true" />

          <div className="space-y-4">
            {displayedEvents.map((event, index) => {
              const lane = event.lane || (index % 2 === 0 ? 'top' : 'bottom');
              const alignClass = lane === 'top' ? 'md:mr-[50%] md:pr-8 md:text-right' : 'md:ml-[50%] md:pl-8';

              return (
                <article key={`${event.date}-${event.title}-${index}`} className={`relative pl-11 md:pl-0 ${alignClass}`}>
                  <span className="absolute left-2 top-6 h-4 w-4 rounded-full border-4 border-slate-950 bg-cyan-400 md:left-1/2 md:-ml-2" aria-hidden="true" />
                  <button
                    type="button"
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/80 p-4 text-left transition hover:border-cyan-500/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                    onClick={() => setSelectedEvent(event)}
                    aria-haspopup="dialog"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">{formatDate(event.date)}</p>
                    <h3 className="mt-1 text-lg font-semibold text-slate-100">{event.title}</h3>
                    <p className="mt-1 text-sm text-slate-400">{event.description}</p>
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      {selectedEvent && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4" role="dialog" aria-modal="true" aria-labelledby="timeline-modal-title">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/80"
            onClick={() => setSelectedEvent(null)}
            aria-label="Fermer la fenetre"
          />

          <div className="relative z-10 max-h-[88vh] w-full max-w-2xl overflow-auto rounded-2xl border border-slate-700 bg-slate-900 p-5 sm:p-6">
            <button
              type="button"
              className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300"
              onClick={() => setSelectedEvent(null)}
              aria-label="Fermer"
            >
              x
            </button>

            <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">{formatDate(selectedEvent.date)}</p>
            <h3 id="timeline-modal-title" className="mt-2 text-2xl font-bold text-slate-100">
              {selectedEvent.title}
            </h3>
            <p className="mt-2 text-slate-400">{selectedEvent.description}</p>

            {selectedEvent.isGrouped ? (
              <div className="mt-5 space-y-5">
                {groupedModalDetails.map((yearGroup) => (
                  <section key={yearGroup.year} className="border-t border-slate-800 pt-4">
                    <h4 className="text-sm font-semibold text-cyan-400">{yearGroup.year}</h4>
                    <div className="mt-3 space-y-3">
                      {yearGroup.entries.map((detail, detailIndex) => (
                        <article
                          key={`${yearGroup.year}-${detail.date}-${detail.label}-${detailIndex}`}
                          className="rounded-lg border border-slate-800 bg-slate-950/70 p-3"
                        >
                          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-400">{formatDate(detail.date)}</p>
                          <h5 className="mt-1 text-base font-semibold text-slate-100">{detail.label}</h5>
                          <p className="mt-1 text-sm text-slate-400">{detail.note}</p>
                        </article>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            ) : (
              <div className="mt-5 space-y-3">
                {selectedEvent.details?.map((detail, detailIndex) => (
                  <article key={`${detail.date}-${detail.label}-${detailIndex}`} className="rounded-lg border border-slate-800 bg-slate-950/70 p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-cyan-400">{formatDate(detail.date)}</p>
                    <h4 className="mt-1 text-base font-semibold text-slate-100">{detail.label}</h4>
                    <p className="mt-1 text-sm text-slate-400">{detail.note}</p>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
