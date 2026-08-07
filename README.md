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

## 🎬 Demo

<p align="center">
    <img src="./docs/demo.gif" alt="DevAtlas Demo" width="100%">
</p>

---

## 📖 About

**DevAtlas** visualizes developer knowledge as an interactive graph instead of traditional cards or dashboards.

**The Problem:** Traditional learning roadmaps and skill directories are linear, overwhelming, and lack context. They tell you *what* to learn, but rarely *how* skills connect to real-world applications, roles, and hiring companies.

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
- **🎨 Theme Support:** Instantly switch between multiple beautifully crafted themes (Dark, Light, Dracula, Forest, Ocean, Sunset) using a robust Design Token system.
- **📱 Responsive Design:** A flawless experience across desktop, tablet, and mobile devices.

---

## 📸 Screenshots

### Home

```
(Add Screenshot)
```

### Skill Page

```
(Add Screenshot)
```

### Knowledge Graph

```
(Add Screenshot)
```

---

## 🛠️ Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| **Frontend**  | React, TypeScript, Vite           |
| **UI**        | Ant Design, CSS Variables         |
| **Graph**     | React Flow (@xyflow/react)        |
| **State/Data**| React Query, Zustand              |
| **Routing**   | React Router                      |
| **Backend**   | Node.js, Express                  |
| **Database**  | Neo4j Aura (Graph Database)       |
| **Hosting**   | Vercel (Frontend), Railway (Backend)|

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
*Fill in your Neo4j credentials in the `.env` file.*

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

1. **Open the website** and you'll be greeted by the DevAtlas home page.
2. **Search for a technology** (e.g., React, Node.js) using the Smart Skill Search in the top navigation.
3. **Select a result** from the auto-complete dropdown.
4. **Explore the knowledge graph** on the left panel to see how the skill connects to other domains.
5. **View prerequisites** to know what you should learn before diving in.
6. **View next skills** to plan your future learning roadmap.
7. **Explore career opportunities** to see what roles this skill unlocks.
8. **Open learning resources** to access curated tutorials, documentation, and courses.
9. **Visit company websites** to explore real employers looking for these skills.

---

## 🔮 Future Improvements

- [ ] Backend integration
- [ ] Authentication
- [ ] User Profiles
- [ ] Bookmark Skills
- [ ] Learning Progress Tracking
- [ ] AI Recommendations
- [ ] Community Contributions
- [ ] More Technologies
- [ ] Search Improvements
- [ ] Filters

---

## 🤝 Contributing

We welcome contributions! To contribute to DevAtlas:

1. **Fork** the repository.
2. **Create a branch**: `git checkout -b feature/your-feature-name`
3. **Commit your changes**: `git commit -m 'Add some feature'`
4. **Push to the branch**: `git push origin feature/your-feature-name`
5. **Open a Pull Request** and describe your changes clearly.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🧑‍💻 Author

- **Name:** [Your Name]
- **GitHub:** [@your-username](https://github.com/your-username)
- **LinkedIn:** [Your Name](https://linkedin.com/in/your-profile)