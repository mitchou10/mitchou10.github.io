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
