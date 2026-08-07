# CONTRIBUTING.md

# DevAtlas Contribution Guide

This document defines the engineering standards for the DevAtlas project.

Every contribution should follow these conventions to keep the codebase consistent, scalable, and maintainable.

---

# Core Principles

- Build reusable components.
- Prefer readability over clever code.
- Follow existing architecture.
- Do not rewrite working code unless necessary.
- Keep components focused on a single responsibility.
- Production-quality code only.

---

# Tech Stack

Frontend

- React (Vite)
- JavaScript (.jsx)
- Ant Design
- React Query
- Axios
- React Flow
- CSS Modules

Backend

- Node.js
- Express
- Neo4j

---

# Folder Structure

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
│
│   ├── common
│   ├── cards
│   ├── graph
│   └── index.jsx
```

Follow this structure.

Avoid creating new top-level folders unless absolutely required.

---

# Component Rules

Every component must have its own folder.

Example

```
SkillCard/

SkillCard.jsx

SkillCard.module.css

index.jsx
```

Always export through index.jsx.

Example

```jsx
export { default } from "./SkillCard";
```

Avoid importing deep paths when index.jsx exists.

Good

```jsx
import { SkillCard } from "../components";
```

Avoid

```jsx
import SkillCard from "../components/cards/SkillCard/SkillCard";
```

---

# Styling Rules

Use CSS Modules.

Example

```
SkillCard.module.css
```

Do NOT use

- styled-components
- emotion
- Tailwind

unless discussed first.

Keep CSS scoped.

Avoid global styles.

---

# Theme Rules

Never hardcode colors.

Never write

```css
background: #0f1117;
```

Instead use Ant Design theme tokens or centralized theme variables.

Future theme switching should work without modifying components.

---

# Ant Design

Prefer Ant Design components whenever possible.

Use

- Card
- Flex
- Space
- Typography
- Tag
- Badge
- Divider
- Avatar
- Tooltip
- Empty
- Skeleton

Avoid building custom UI if Ant Design already provides it.

---

# Icons

Use

```
@ant-design/icons
```

Do not introduce another icon library unless required.

---

# API Layer

All HTTP requests belong in

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

# React Query

Every endpoint must have a hook.

Example

```jsx
export const useSkillGraph = (skill) =>
    useQuery({
        queryKey: ["graph", skill],
        queryFn: ...
    });
```

Components should consume hooks only.

---

# Component Responsibilities

Pages

Responsible for layout and composition.

Hooks

Responsible for server communication.

API

Responsible for HTTP requests.

Graph Utils

Responsible for converting backend data into graph nodes.

React components should not perform data transformation.

---

# Imports

Prefer barrel exports.

Example

```
components/index.jsx
```

```jsx
export * from "./cards";
export * from "./common";
export * from "./graph";
```

Avoid unnecessary deep imports.

---

# Naming

Components

PascalCase

```
SkillCard.jsx
```

Hooks

camelCase

```
useSkillGraph.js
```

CSS Modules

```
SkillCard.module.css
```

Variables

camelCase

Constants

UPPER_CASE only when appropriate.

---

# Graph Rules

Graph visualization is the primary feature of DevAtlas.

Use React Flow.

Node rendering belongs inside

```
components/graph
```

Graph transformation belongs in

```
graphUtils.js
```

Never mix transformation logic into components.

---

# React Flow

Each node type gets its own component.

Example

```
SkillNode

ProjectNode

ResourceNode

RoleNode

CompanyNode
```

Avoid one generic node component.

Different node types will evolve independently.

---

# Performance

Use

- React.memo
- useMemo
- useCallback

only where beneficial.

Avoid premature optimization.

---

# Accessibility

Interactive elements must be keyboard accessible.

Buttons should be actual buttons.

Provide meaningful labels where appropriate.

---

# Error Handling

Handle

Loading

Error

Empty

states.

Never leave users with a blank screen.

Use Ant Design

- Skeleton
- Empty
- Alert

---

# Responsive Design

Desktop first.

Tablet supported.

Mobile supported.

Do not hardcode widths.

Prefer Flex/Grid.

---

# Code Quality

Prefer

Small components.

Reusable logic.

Descriptive variable names.

Avoid

Nested ternaries.

Magic numbers.

Duplicate code.

Large files.

---

# Backend Rules

Neo4j is the source of truth.

Seed scripts should be idempotent where possible.

Business logic belongs inside services.

Controllers should remain thin.

Routes should only register endpoints.

---

# Pull Request Checklist

Before considering a task complete:

- Code builds successfully.
- No console errors.
- No lint errors.
- Uses existing architecture.
- Uses CSS Modules.
- Uses React Query.
- Uses Ant Design.
- No duplicated code.
- No hardcoded colors.
- Responsive layout verified.

---

# Design Philosophy

The application should feel like a premium developer product.

Inspiration

- CognoDB
- Linear
- Vercel
- GitHub

Avoid dashboard-like interfaces.

Prioritize:

- Simplicity
- Clarity
- Smooth interactions
- Clean typography
- Subtle animations
- Consistent spacing

Every new feature should enhance the experience without increasing unnecessary complexity.
