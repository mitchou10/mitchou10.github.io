import { useEffect, useState } from 'react';
import './Skills.css';

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
    <section id="timeline" className="section timeline">
      <div className="container">
        <h2 className="section__title">Timeline</h2>
        <p className="section__subtitle">Les 6 derniers mois sont accessibles directement, le reste est regroupe</p>

        <div className="timeline__board">
          <div className="timeline__axisWrap" style={{ '--event-count': displayedEvents.length }}>
            <div className="timeline__axis" aria-hidden="true" />

            {displayedEvents.map((event, index) => {
              const lane = event.lane || (index % 2 === 0 ? 'top' : 'bottom');

              return (
                <article
                  key={`${event.date}-${event.title}-${index}`}
                  className={`timeline__item timeline__item--${lane}`}
                >
                  <button
                    type="button"
                    className="timeline__card timeline__cardBtn"
                    onClick={() => setSelectedEvent(event)}
                    aria-haspopup="dialog"
                  >
                    <p className="timeline__year">{formatDate(event.date)}</p>
                    <h3 className="timeline__title">{event.title}</h3>
                    <p className="timeline__description">{event.description}</p>
                  </button>
                  <span className="timeline__dot" aria-hidden="true" />
                </article>
              );
            })}

            <div className="timeline__bounds" aria-hidden="true">
              {displayedEvents.map((event, index) => (
                <span key={`${event.date}-${index}`}>{new Date(event.date).getFullYear()}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedEvent && (
        <div className="timelineModal" role="dialog" aria-modal="true" aria-labelledby="timeline-modal-title">
          <button
            type="button"
            className="timelineModal__backdrop"
            onClick={() => setSelectedEvent(null)}
            aria-label="Fermer la fenetre"
          />

          <div className="timelineModal__panel">
            <button
              type="button"
              className="timelineModal__close"
              onClick={() => setSelectedEvent(null)}
              aria-label="Fermer"
            >
              ×
            </button>

            <p className="timelineModal__date">{formatDate(selectedEvent.date)}</p>
            <h3 id="timeline-modal-title" className="timelineModal__title">
              {selectedEvent.title}
            </h3>
            <p className="timelineModal__description">{selectedEvent.description}</p>

            {selectedEvent.isGrouped ? (
              <div className="timelineModal__yearGroups">
                {groupedModalDetails.map((yearGroup) => (
                  <section key={yearGroup.year} className="timelineModal__yearGroup">
                    <h4 className="timelineModal__yearHeading">{yearGroup.year}</h4>
                    <div className="timelineModal__details">
                      {yearGroup.entries.map((detail, detailIndex) => (
                        <article
                          key={`${yearGroup.year}-${detail.date}-${detail.label}-${detailIndex}`}
                          className="timelineModal__detailItem"
                        >
                          <span className="timelineModal__detailDot" aria-hidden="true" />
                          <div className="timelineModal__detailContent">
                            <p className="timelineModal__detailDate">{formatDate(detail.date)}</p>
                            <h5 className="timelineModal__detailLabel">{detail.label}</h5>
                            <p className="timelineModal__detailNote">{detail.note}</p>
                          </div>
                        </article>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            ) : (
              <div className="timelineModal__details">
                {selectedEvent.details?.map((detail, detailIndex) => (
                  <article key={`${detail.date}-${detail.label}-${detailIndex}`} className="timelineModal__detailItem">
                    <span className="timelineModal__detailDot" aria-hidden="true" />
                    <div className="timelineModal__detailContent">
                      <p className="timelineModal__detailDate">{formatDate(detail.date)}</p>
                      <h4 className="timelineModal__detailLabel">{detail.label}</h4>
                      <p className="timelineModal__detailNote">{detail.note}</p>
                    </div>
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
