# mitchou10.github.io

Portfolio personnel Data/AI construit avec React + Vite, deploye sur GitHub Pages.

## Live

- Site: https://mitchou10.github.io

## Stack

- React 19
- Vite 8
- Tailwind CSS
- shadcn-style utilities (cva, clsx, tailwind-merge)
- KaTeX (rendu formule)
- Lucide React (icones)

## Fonctionnalites

- One-page portfolio: Hero, About, Experiences, Projects, Contact
- Navigation fluide centree sur les sections
- Moteur de recherche integre (Ctrl+K / Cmd+K)
- Recherche locale + recherche docs Markdown distantes (raw GitHub)
- Donnees pilotees par JSON pour simplifier les mises a jour de contenu
- Version de l'app visible dans le header (ex: v0.0.0)

## Donnees Modifiables

Les contenus principaux sont editables sans toucher au JSX:

- Experiences: src/data/experiences.json
- Skills Experiences: src/data/experience-skills.json
- Skills panel data historique (si utilise): src/data/current-allocation.json
- Sources docs recherche distante: src/config/searchDocs.js

Exemple experience:

```json
{
	"date": "2024-12-01",
	"startDate": "2024-12-01",
	"endDate": null,
	"title": "French Ministry - DTNUM - Senior Data Scientist",
	"description": "Delivered GenAI document analysis systems...",
	"tools": ["Python", "FastAPI", "Kubernetes"]
}
```

## Lancer en Local

```bash
npm install
npm run dev
```

Build production:

```bash
npm run build
npm run preview
```

## Docker

```bash
make docker-build
make docker-dev
make docker-watch
make docker-debug
make docker-down
```

App disponible sur http://localhost:5173.

## Version Front

La version affichee dans le header vient de package.json:

- source: package.json -> version
- injection build: vite.config.js via import.meta.env.VITE_APP_VERSION

Pour changer la version visible dans le front:

1. Modifier package.json
2. Relancer npm run dev (ou rebuild Docker)

## Structure Projet

```text
src/
	components/
		Navbar.jsx
		Hero.jsx
		About.jsx
		Timeline.jsx
		TimelineVisuals.jsx
		Projects.jsx
		Contact.jsx
		SearchDialog.jsx
	config/
		searchDocs.js
	data/
		experiences.json
		experience-skills.json
		current-allocation.json
	App.jsx
	main.jsx
	index.css
```

## Deployment GitHub Pages

Le deploy est fait via GitHub Actions sur la branche main.

Checklist rapide:

1. Settings -> Pages -> Source = GitHub Actions
2. Workflow deploy vert apres push
3. Hard refresh du navigateur apres release
