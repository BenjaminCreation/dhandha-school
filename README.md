# Dhandha School

Landing page for Dhandha School — built with React 19 + Vite, with GSAP, Motion, and Lenis for animations and smooth scrolling.

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer (includes `npm`)

Check your version:

```bash
node -v
npm -v
```

## Getting started

Clone the repo, install dependencies, and start the dev server:

```bash
git clone <repo-url>
cd dhandha-school
npm install
npm run dev
```

Then open the URL Vite prints (default: http://localhost:5173).

## Available scripts

| Command           | What it does                                  |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Start the Vite dev server with hot reload     |
| `npm run build`   | Build the production bundle into `dist/`      |
| `npm run preview` | Preview the production build locally          |
| `npm run lint`    | Run Oxlint over the source                    |

## Project structure

```
dhandha-school/
├── public/            # Static assets (images, fonts, icons)
├── src/
│   ├── components/    # Hero, InstructorSection, Loader, RotatingText
│   ├── assets/        # Imported images/SVGs
│   ├── App.jsx        # Root component
│   └── main.jsx       # App entry point
├── index.html
├── vite.config.js
└── package.json
```

## Notes

- `node_modules/` and `dist/` are intentionally not committed. Run `npm install` after cloning to fetch dependencies.
