<div align="center">
  <h1>DevAtlas</h1>
  <p>An interactive developer knowledge graph — explore skills, learning paths, projects, roles, and companies visually.</p>

  <p>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
    <img src="https://img.shields.io/badge/Ant_Design-0170FE?style=for-the-badge&logo=antdesign&logoColor=white" alt="Ant Design" />
    <img src="https://img.shields.io/badge/React_Flow-FF0072?style=for-the-badge&logo=react&logoColor=white" alt="React Flow" />
    <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
    <img src="https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge" alt="MIT License" />
  </p>
</div>

---

## 🚀 Live Demo

**Frontend:** [https://dev-atlas-theta.vercel.app/](https://dev-atlas-theta.vercel.app/)

---

## 📖 About

**DevAtlas** visualizes developer knowledge as an interactive graph instead of traditional cards or dashboards.

**The Problem:** Traditional learning roadmaps and skill directories are linear, overwhelming, and lack context. They tell you _what_ to learn, but rarely _how_ skills connect to real-world applications, roles, and hiring companies.

**The Solution:** Visual learning. By leveraging an interactive knowledge graph, DevAtlas allows developers to see the big picture. You can instantly understand prerequisites, discover related technologies, and navigate a web of knowledge intuitively.

**Who is it for?**

- **Self-taught developers** looking for a clear path forward.
- **Experienced engineers** exploring new tech stacks.
- **Educators and mentors** guiding students through complex ecosystems.

---

## ✨ Features

- **🔍 Smart Skill Search:** Quickly find technologies, frameworks, and tools using an auto-complete search with highlighted matching.
- **🕸️ Interactive Knowledge Graph:** Explore visually. Zoom, pan, and click on nodes to uncover relationships between different skills and roles.
- **🗺️ Learning Roadmap:** See exactly what you need to know first (Prerequisites) and where a skill leads (Next Skills).
- **💼 Career Opportunities:** Discover which roles demand a specific skill and which top companies are hiring for those roles.
- **🔗 Related Skills:** Expand your horizon by discovering complementary tools and technologies.
- **📚 Learning Resources:** Get curated links to courses, documentation, and external guides.
- **🏗️ Projects:** View real-world applications and projects that you can build to master a skill.
- **🏢 Companies:** See a list of companies utilizing the tech stack.
- **📱 Responsive Design:** A flawless experience across desktop, tablet, and mobile devices.

---

## 🛠️ Tech Stack

| Layer          | Technology                           |
| -------------- | ------------------------------------ |
| **Frontend**   | React, TypeScript, Vite              |
| **UI**         | Ant Design, CSS Variables            |
| **Graph**      | React Flow (@xyflow/react)           |
| **State/Data** | React Query, Zustand                 |
| **Routing**    | React Router                         |
| **Backend**    | Node.js, Express                     |
| **Database**   | Neo4j Aura (Graph Database)          |
| **Hosting**    | Vercel (Frontend), Railway (Backend) |

---

## 📂 Project Structure

```text
dev-atlas/
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI elements (Cards, Layouts, Common)
│   │   ├── graph/           # React Flow canvas, custom nodes, and graph logic
│   │   ├── hooks/           # Custom React hooks (React Query, debouncing)
│   │   ├── pages/           # Route components (Home, Skill, NotFound)
│   │   ├── styles/          # Design tokens (themes.css), Ant Design theme config
│   │   ├── types/           # TypeScript definitions
│   │   ├── data/            # Static data or fallback datasets
│   │   └── utils/           # Helper functions and formatting utilities
│   └── vite.config.js       # Vite configuration
│
└── backend/
    ├── app.js               # Express application setup
    ├── server.js            # Entry point for the server
    ├── routes.js            # API route definitions
    ├── controller.js        # Request and response handlers
    ├── services.js          # Core business logic
    ├── queries.js           # Neo4j Cypher queries
    └── db.js                # Database connection and driver
```

---

## ⚙️ Installation

### Prerequisites

- **Node.js** 20+
- A [Neo4j Aura](https://neo4j.com/cloud/aura/) free instance (or local Neo4j)

### Clone the Repository

```bash
git clone https://github.com/your-username/dev-atlas.git
cd dev-atlas
```

### Backend Setup

```bash
cd backend
cp .env.example .env
```

_Fill in your Neo4j credentials in the `.env` file._

```bash
npm install
npm run seed   # populate the database
npm run dev
```

### Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

The application will be running locally at `http://localhost:5173`.

---

## 🏗️ Build

To create a production-ready build for the frontend:

```bash
cd frontend
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## ☁️ Deployment

DevAtlas is designed for automated deployments.

- **Frontend:** Hosted on [Vercel](https://vercel.com).
- **Backend:** Hosted on [Railway](https://railway.app).

Every push to the `main` branch automatically triggers the GitHub Actions CI pipeline, which runs linting and build checks. Upon passing, Vercel and Railway will automatically deploy the latest production updates.

### Environment Variables

**Backend (`backend/.env`)**

- `PORT` (e.g. `3001`)
- `NODE_ENV` (e.g. `production`)
- `NEO4J_URI`, `NEO4J_USERNAME`, `NEO4J_PASSWORD`
- `FRONTEND_URL` (e.g. `https://dev-atlas-theta.vercel.app`)

**Frontend (Vercel Variables)**

- `VITE_API_BASE_URL` (e.g. `https://your-backend.up.railway.app/api`)

---

## 🎯 How to Use

### Step 1 — Search a Skill

You can discover a technology in multiple ways. Search using the search bar by typing a skill name (React, Node.js, Docker, etc.). Matching skills appear instantly in the dropdown. Simply click a search result to open the Skill Details page.

<video src="https://github.com/user-attachments/assets/3931a269-50f7-478a-bb28-2896f35c7292" controls="controls" style="max-width: 100%;">
  Your browser does not support the video tag.
</video>

### Step 2 — Browse Using Tags

You don't need to type to start exploring. You can simply click one of the quick tags on the home page (like React, TypeScript, Docker, SQL, or Python). After clicking a tag, the search box is populated automatically, and you simply press Search (or Enter) to navigate to that skill.

<video src="https://github.com/user-attachments/assets/3c03ce1c-5403-4279-8829-73daceb95594" controls="controls" style="max-width: 100%;">
  Your browser does not support the video tag.
</video>

### Step 3 — Filter Skills

Filters work together with search to narrow down results.

- **Category Filter:** Filter by domains such as Frontend, Backend, DevOps, or Database.
- **Difficulty Filter:** Filter by skill levels such as Beginner, Intermediate, or Advanced.

<video src="https://github.com/user-attachments/assets/8a168b74-2191-4e7d-bf25-c366b642b65c" controls="controls" style="max-width: 100%;">
  Your browser does not support the video tag.
</video>

### Step 4 — Explore the Skill Page

After opening a skill, you'll be greeted with a comprehensive dashboard. Here you can view the skill overview, its difficulty level, the estimated learning time, its category, and various quick actions.

### Step 5 — Explore the Interactive Knowledge Graph

The knowledge graph is a visual representation of how everything connects. Every node represents something related to the selected skill (e.g., prerequisite technologies, next technologies, projects, learning resources, companies, job roles).

You can interact with the graph intuitively:

- Drag nodes to organize them.
- Zoom in and out to see the big picture.
- Pan across the canvas.
- Click nodes to inspect relationships or navigate to them.

Every edge represents a relationship between skills (e.g., _Requires_, _Leads To_, _Used In_, _Learn From_).

<video src="https://github.com/user-attachments/assets/68200965-5308-440f-91da-7c374bac4293" controls="controls" style="max-width: 100%;">
  Your browser does not support the video tag.
</video>

### Step 6 — Learn Through Related Sections

Below the graph, you will find additional structured information related to the selected technology. These sections include:

- Learning Roadmap (Prerequisites & Next Skills)
- Career Opportunities (Roles & Companies)
- Projects
- Learning Resources

<video src="https://github.com/user-attachments/assets/27653247-12cc-4a0e-8b2c-7b6f92d61a00" controls="controls" style="max-width: 100%;">
  Your browser does not support the video tag.
</video>

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🧑‍💻 Author

- **Name:** M.Goutham
- **GitHub:** [@gouthammanigonda](https://github.com/gouthammanigonda)
- **LinkedIn:** [Goutham Manigonda](https://www.linkedin.com/in/goutham-manigonda-737224g/)
