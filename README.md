# DevAtlas

> An interactive developer knowledge graph — explore skills, learning paths, projects, roles and companies visually.

[![CI](https://github.com/your-username/dev-atlas/actions/workflows/ci.yml/badge.svg)](https://github.com/your-username/dev-atlas/actions/workflows/ci.yml)

---

## Overview

DevAtlas visualises developer knowledge as an interactive graph instead of traditional cards or dashboards. Users can explore:

- **Skill prerequisites** — what you need to know first
- **Learning paths** — where a skill leads
- **Projects** — real-world applications of the skill
- **Learning resources** — curated links and courses
- **Career roles** — jobs that require the skill
- **Hiring companies** — who is looking for this skill

---

## Architecture

```
Browser
  │
  ├── Vercel (Frontend — React + Vite)
  │     └── /skill/:name  →  React Router (client-side)
  │
  └── Railway (Backend — Node.js + Express)
        └── /api/*  →  Neo4j Aura (Graph Database)
```

```
GitHub
  └── push to main
        ├── GitHub Actions CI  (lint + build)
        ├── Vercel             (auto-deploy frontend)
        └── Railway            (auto-deploy backend)
```

---

## Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | React 19, Vite 8                  |
| UI        | Ant Design 6, CSS Modules         |
| Graph     | React Flow (@xyflow/react)        |
| Data      | React Query (@tanstack/react-query)|
| HTTP      | Axios                             |
| Backend   | Node.js, Express 5                |
| Database  | Neo4j Aura (graph database)       |
| CI/CD     | GitHub Actions                    |
| Hosting   | Vercel (frontend), Railway (backend)|

---

## Folder Structure

```
dev-atlas/
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions CI pipeline
│
├── frontend/
│   ├── public/
│   │   ├── favicon.svg
│   │   └── manifest.json       # PWA manifest
│   ├── src/
│   │   ├── api/                # Axios client
│   │   ├── components/
│   │   │   ├── cards/          # SkillCard, SectionCard, etc.
│   │   │   ├── common/         # Header, SearchBar, SkillFilters
│   │   │   └── graph/          # GraphCanvas, custom nodes
│   │   ├── hooks/              # React Query hooks
│   │   ├── layouts/            # MainLayout
│   │   ├── pages/              # Home, Skill, NotFound
│   │   ├── routes/             # AppRoutes
│   │   └── styles/             # Design tokens, global CSS
│   ├── index.html
│   ├── vercel.json             # SPA rewrite rules
│   └── vite.config.js
│
└── backend/
    ├── app.js                  # Express app (CORS, routes, error handling)
    ├── server.js               # Entry point (port binding)
    ├── routes.js               # Route registration
    ├── controller.js           # Request/response handlers
    ├── services.js             # Business logic
    ├── queries.js              # Neo4j Cypher queries
    ├── db.js                   # Neo4j driver
    └── seed.js                 # Database seed script
```

---

## Theme Engine

DevAtlas uses a scalable, Design Token based Theme Engine allowing for instant swapping between multiple custom themes.

### Design Token Architecture

- **Single Source of Truth**: All themes are defined purely in CSS variables inside `frontend/src/styles/themes.css`.
- **Zero Component Coupling**: React components and graphs consume semantic variables (e.g., `var(--bg-card)`, `var(--text-primary)`) and are completely unaware of the active theme.
- **Dynamic Configuration**: The Theme Selector dropdown renders options dynamically from `frontend/src/theme/themeConfig.js`.

### Supported Themes

- 🌙 **Dark**: GitHub-inspired dark mode.
- ☀️ **Light**: Notion-inspired light mode.
- 🟣 **Dracula**: Purple/Pink coding theme.
- 🌲 **Forest**: Dark green environment.
- 🌊 **Ocean**: Blue/Teal oceanic theme.
- 🌅 **Sunset**: Warm orange aesthetics.

### How to Add a New Theme

Adding a new theme is simple and requires zero changes to React components:

1. Add a new CSS attribute selector block (`[data-theme="new-theme-id"]`) in `frontend/src/styles/themes.css` and define the required design tokens.
2. Register the theme in `frontend/src/theme/themeConfig.js` by adding an entry to the `themes` array.

---

## Installation

### Prerequisites

- Node.js 20+
- A [Neo4j Aura](https://neo4j.com/cloud/aura/) free instance (or local Neo4j)

### Clone

```bash
git clone https://github.com/your-username/dev-atlas.git
cd dev-atlas
```

### Backend

```bash
cd backend
cp .env.example .env
# Fill in your Neo4j credentials in .env
npm install
npm run seed   # populate the database
npm run dev
```

### Frontend

```bash
cd frontend
# .env.development is already configured for localhost
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Environment Variables

### Backend (`backend/.env`)

| Variable       | Description                                      | Example                                      |
|----------------|--------------------------------------------------|----------------------------------------------|
| `PORT`         | Server port                                      | `3001`                                       |
| `NODE_ENV`     | Environment (`development` / `production`)       | `production`                                 |
| `NEO4J_URI`    | Neo4j Aura connection URI                        | `neo4j+s://xxxxxxxx.databases.neo4j.io`      |
| `NEO4J_USERNAME` | Neo4j username                                 | `neo4j`                                      |
| `NEO4J_PASSWORD` | Neo4j password                                 | `your-secure-password`                       |
| `FRONTEND_URL` | Deployed frontend URL (for CORS)                 | `https://dev-atlas.vercel.app`               |

### Frontend (Vercel Environment Variables)

| Variable            | Description                  | Example                                         |
|---------------------|------------------------------|-------------------------------------------------|
| `VITE_API_BASE_URL` | Backend API base URL         | `https://dev-atlas-api.up.railway.app/api`      |

---

## Deployment Guide

### 1. Neo4j Aura (Database)

1. Go to [console.neo4j.io](https://console.neo4j.io) and create a **free** AuraDB instance.
2. Note the **Connection URI**, **Username**, and **Password**.
3. Run the seed script locally pointing at your Aura instance:
   ```bash
   cd backend
   # Set NEO4J_* vars in .env, then:
   npm run seed
   ```

### 2. Railway (Backend)

1. Go to [railway.app](https://railway.app) and create a new project.
2. Connect your **GitHub repository**.
3. Set the **Root Directory** to `backend`.
4. Add the following **Environment Variables** in Railway:
   - `NEO4J_URI`
   - `NEO4J_USERNAME`
   - `NEO4J_PASSWORD`
   - `NODE_ENV=production`
   - `FRONTEND_URL=https://your-app.vercel.app`  ← set this after Vercel deploy
5. Railway will use `npm start` automatically.

### 3. Vercel (Frontend)

1. Go to [vercel.com](https://vercel.com) and import your GitHub repository.
2. Set the **Root Directory** to `frontend`.
3. Add the following **Environment Variable**:
   - `VITE_API_BASE_URL=https://your-backend.up.railway.app/api`
4. Deploy. Vercel reads `vercel.json` automatically for SPA routing.

### 4. Final Step

After both services are deployed:
1. Copy the Vercel URL (e.g. `https://dev-atlas.vercel.app`).
2. Set `FRONTEND_URL` in Railway to this URL.
3. Redeploy the Railway service.

---

## Running Locally

```bash
# Terminal 1 — Backend
cd backend && npm run dev

# Terminal 2 — Frontend
cd frontend && npm run dev
```

Visit `http://localhost:5173`.

---

## CI/CD

Every push to `main` triggers the GitHub Actions pipeline (`.github/workflows/ci.yml`):

1. **Frontend job**: installs dependencies → ESLint → Vite production build
2. **Backend job**: installs dependencies → lint → server boot verification

If either job fails, the workflow fails and Vercel/Railway deployments are blocked (configure branch protection rules on GitHub to enforce this).

---

## Future Improvements

- [ ] Authentication (save bookmarks, learning paths)
- [ ] AI Skill Recommendations
- [ ] Resume Skill Analyser
- [ ] Interview Preparation Graph
- [ ] Personalised Roadmaps
- [ ] Company Logos
- [ ] Animated Graph Edges
- [ ] Skill Search Highlighting in Graph
- [ ] Expand / Collapse Nodes
- [ ] Career Path Visualisation

---

## License

[MIT](LICENSE)