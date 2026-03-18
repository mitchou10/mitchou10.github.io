# mitchou10.github.io

Personal Data/AI portfolio built with React + Vite, deployed on GitHub Pages.

## Live

- Site: https://mitchou10.github.io

## Stack

- React 19
- Vite 8
- Tailwind CSS
- shadcn-style utilities (cva, clsx, tailwind-merge)
- KaTeX (formula rendering)
- Lucide React (icons)

## Features

- One-page portfolio: Hero, About, Experiences, Projects, Contact
- Smooth centered section navigation
- Built-in search (Ctrl+K / Cmd+K)
- Local search + remote Markdown docs search (raw GitHub)
- JSON-driven content for easy updates
- App version displayed in the header (ex: v0.0.0)

## Editable Data

Main content can be edited without touching JSX:

- Experiences: src/data/experiences.json
- Skills Experiences: src/data/experience-skills.json
- Historical skills panel data (if used): src/data/current-allocation.json
- Remote docs sources: src/config/searchDocs.js

Experience example:

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

App runs on http://localhost:5173.

## Version Front

The version shown in the header comes from package.json:

- source: package.json -> version
- build injection: vite.config.js via import.meta.env.VITE_APP_VERSION

To update the visible version in the frontend:

1. Update package.json
2. Restart npm run dev (or rebuild Docker)

## Structure Projet
## Project Structure

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

Deployment is handled by GitHub Actions on the main branch.

Quick checklist:

1. Settings -> Pages -> Source = GitHub Actions
2. Deploy workflow is green after push
3. Hard-refresh your browser after release
