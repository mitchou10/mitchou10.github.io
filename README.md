# mitchou10.github.io

Personal portfolio site built with **React + Vite**, deployed on GitHub Pages.

## 🚀 Live Site

[https://mitchou10.github.io](https://mitchou10.github.io)

## 📦 Tech Stack

- [React 19](https://react.dev/) — UI library
- [Vite 8](https://vite.dev/) — build tool & dev server
- Plain CSS — no external CSS framework, keeping it lean
- GitHub Actions — automatic deployment on push to `main`

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start dev server (hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Docker / Docker Compose

```bash
# Build the image
make docker-build

# Start in Docker Compose (dev mode)
make docker-dev

# Start in Docker Compose watch mode (auto sync/rebuild)
make docker-watch

# Start in Docker Compose (debug logs for Vite)
make docker-debug

# Stop services
make docker-down
```

The app is exposed on `http://localhost:5173`.

`docker-watch` runs watch mode on the main `app` service with Docker Compose rules:
- source files are synced into the container automatically
- `package.json` / `package-lock.json` changes trigger a rebuild

## 📂 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx / .css   — Sticky navigation bar
│   ├── Hero.jsx / .css     — Landing hero section
│   ├── About.jsx / .css    — About me section
│   ├── Skills.jsx / .css   — Skills with progress bars
│   ├── Projects.jsx / .css — Project cards
│   ├── Contact.jsx / .css  — Contact form
│   └── Footer.jsx / .css   — Footer
├── App.jsx                 — Root component
└── index.css               — Global design tokens & utilities
```

## 🚢 Deployment

Pushes to `main` automatically build and deploy via the
`.github/workflows/deploy.yml` GitHub Actions workflow using
the built-in GitHub Pages action.

## Troubleshooting GitHub Pages

If you see errors like:
- `Expected a JavaScript-or-Wasm module script but ... MIME type of "text/jsx"`
- `GET /favicon.svg 404`

Then GitHub Pages is serving the repository source instead of the built `dist` output.

Checklist:
1. In GitHub repository settings, go to Pages.
2. Set Build and deployment Source to `GitHub Actions`.
3. Ensure the deploy workflow runs successfully after a push to `main`.
4. Open the website with a hard refresh (Ctrl+Shift+R).
