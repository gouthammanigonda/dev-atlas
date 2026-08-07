# DevAtlas

## Overview

DevAtlas is an interactive developer knowledge graph inspired by tools like CognoDB.

Instead of showing information in traditional cards or dashboards, DevAtlas visualizes developer knowledge as an interactive graph.

Users can explore:

- Skill Prerequisites
- Learning Paths
- Projects
- Learning Resources
- Career Roles
- Hiring Companies

The objective is to build a premium-looking educational tool for developers.

---

# Tech Stack

## Frontend

- React (Vite)
- JavaScript (.jsx)
- Ant Design
- React Query
- Axios
- React Flow
- CSS Modules

## Backend

- Node.js
- Express
- Neo4j

---

# Project Philosophy

The application should feel like a premium product rather than a CRUD dashboard.

Every screen should focus on visualization and user experience.

Design inspiration:

- CognoDB
- Linear
- Vercel
- GitHub

Dark theme only (for now).

---

# Current Backend

Completed.

### APIs

GET /api/skills

Returns all skills.

---

GET /api/skills/search?q=react

Search skills.

---

GET /api/skills/:name

Returns skill information.

---

GET /api/graph/:name

Returns

```json
{
  "skill": {},
  "prerequisites": [],
  "nextSkills": [],
  "projects": [],
  "resources": [],
  "roles": [],
  "companies": []
}
```

Neo4j relationships

- LEADS_TO
- REQUIRES
- USED_IN
- LEARN_FROM
- REQUIRED_FOR
- HIRED_BY

Backend is considered stable.

Do not rewrite backend unless necessary.

---

# Frontend Architecture

```
src
│
├── api
├── hooks
├── layouts
├── pages
├── theme
├── styles
│
├── components
│   ├── common
│   ├── cards
│   ├── graph
│   └── index.jsx
```

---

# API Layer

All server communication lives inside

```
src/api
```

Example

```
client.js
skills.js
```

Never call axios directly inside components.

---

# Hooks

Every API has its own React Query hook.

Example

```jsx
export const useSkillGraph = (name) =>
    useQuery({
        queryKey:["graph",name],
        queryFn:...
    })
```

Components must never fetch data directly.

---

# Component Rules

Each component has its own folder.

Example

```
SkillCard

SkillCard.jsx

SkillCard.module.css

index.jsx
```

Every folder exports through index.jsx.

Never import deep paths when index.jsx exists.

---

# Styling Rules

Use CSS Modules.

No Tailwind.

No styled-components.

Keep CSS modular.

---

# Theme Rules

Never hardcode colors.

Always use centralized theme variables or Ant Design theme tokens.

Future theme switching should be possible without modifying components.

---

# Coding Style

Small reusable components.

Single Responsibility Principle.

Readable code.

Minimal abstraction.

Avoid duplicate code.

Prefer composition.

---

# Current UI

Completed

✔ Main Layout

✔ Header

✔ Search Bar

✔ Skill Card

✔ Section Cards

Search is fully working.

Graph API integration completed.

---

# Upcoming

React Flow integration.

The graph is the primary feature of DevAtlas.

Cards become supporting information.

---

# React Flow Architecture

```
components

graph

GraphView

nodes

SkillNode

ProjectNode

ResourceNode

RoleNode

CompanyNode
```

GraphView only renders React Flow.

Graph transformation logic belongs in graphUtils.js.

Custom node types must be used.

Avoid one generic node.

---

# Future Features

- Auto Layout (Dagre)
- Expand / Collapse
- Search Highlight
- Animated Edges
- MiniMap
- Controls
- Career Path View
- Company Logos
- Resource Icons
- Smooth Animations

---

# Quality Expectations

Production-quality code.

Reusable.

Scalable.

Readable.

Maintain existing architecture.

Avoid unnecessary rewrites.

When improving architecture, explain the reasoning before changing it.
