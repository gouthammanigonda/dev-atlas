export const skills = [
  {
    name: "HTML",
    difficulty: "Easy",
    estimatedTime: "7 Days",
    category: "Frontend",
    description: "Markup language for creating web pages"
  },
  {
    name: "CSS",
    difficulty: "Easy",
    estimatedTime: "10 Days",
    category: "Frontend",
    description: "Styling language for web pages"
  },
  {
    name: "JavaScript",
    difficulty: "Medium",
    estimatedTime: "30 Days",
    category: "Frontend",
    description: "Programming language for the web"
  },
  {
    name: "TypeScript",
    difficulty: "Medium",
    estimatedTime: "15 Days",
    category: "Frontend",
    description: "Typed superset of JavaScript"
  },
  {
    name: "React",
    difficulty: "Medium",
    estimatedTime: "30 Days",
    category: "Frontend",
    description: "UI Library"
  },
  {
    name: "Next.js",
    difficulty: "Medium",
    estimatedTime: "20 Days",
    category: "Frontend",
    description: "React Framework"
  },
  {
    name: "Node.js",
    difficulty: "Medium",
    estimatedTime: "20 Days",
    category: "Backend",
    description: "JavaScript Runtime"
  },
  {
    name: "Express",
    difficulty: "Easy",
    estimatedTime: "10 Days",
    category: "Backend",
    description: "Node.js Framework"
  },
  {
    name: "Java",
    difficulty: "Medium",
    estimatedTime: "45 Days",
    category: "Backend",
    description: "Programming Language"
  },
  {
    name: "Spring Boot",
    difficulty: "Hard",
    estimatedTime: "40 Days",
    category: "Backend",
    description: "Java Framework"
  },
  {
    name: "SQL",
    difficulty: "Easy",
    estimatedTime: "15 Days",
    category: "Database",
    description: "Relational Database Language"
  },
  {
    name: "Docker",
    difficulty: "Medium",
    estimatedTime: "20 Days",
    category: "DevOps",
    description: "Containerization Platform"
  },
  {
    name: "Git",
    difficulty: "Easy",
    estimatedTime: "7 Days",
    category: "Tools",
    description: "Version Control System"
  }
];

export const roles = [
  {
    name: "Frontend Engineer",
    description: "Builds responsive web applications",
    salaryRange: "8-20 LPA",
  },
  {
    name: "Backend Engineer",
    description: "Builds scalable backend systems",
    salaryRange: "10-25 LPA",
  },
  {
    name: "Full Stack Engineer",
    description: "Works on frontend and backend",
    salaryRange: "12-30 LPA",
  },
];

export const companies = [
  {
    name: "Netflix",
    website: "https://netflix.com",
  },
  {
    name: "Meta",
    website: "https://meta.com",
  },
  {
    name: "Google",
    website: "https://google.com",
  },
  {
    name: "Amazon",
    website: "https://amazon.com",
  },
  {
    name: "Spotify",
    website: "https://spotify.com",
  },
];

export const projects = [
  {
    title: "Portfolio Website",
    difficulty: "Easy",
    description: "Personal developer portfolio",
  },
  {
    title: "E-Commerce Store",
    difficulty: "Medium",
    description: "Online shopping platform",
  },
  {
    title: "Chat Application",
    difficulty: "Medium",
    description: "Realtime messaging app",
  },
  {
    title: "Kanban Board",
    difficulty: "Medium",
    description: "Task management application",
  },
  {
    title: "Blog CMS",
    difficulty: "Hard",
    description: "Content management platform",
  },
];

export const learningResources = [
  {
    title: "MDN Web Docs",
    type: "Documentation",
    url: "https://developer.mozilla.org",
    provider: "MDN",
  },
  {
    title: "React Official Docs",
    type: "Documentation",
    url: "https://react.dev",
    provider: "Meta",
  },
  {
    title: "Node.js Docs",
    type: "Documentation",
    url: "https://nodejs.org",
    provider: "Node.js",
  },
  {
    title: "Spring Official Docs",
    type: "Documentation",
    url: "https://spring.io",
    provider: "Spring",
  },
  {
    title: "TypeScript Handbook",
    type: "Documentation",
    url: "https://www.typescriptlang.org/docs",
    provider: "Microsoft",
  },
];

export const relationships = [
  {
    from: "HTML",
    to: "CSS",
    type: "LEADS_TO",
  },
  {
    from: "CSS",
    to: "JavaScript",
    type: "LEADS_TO",
  },
  {
    from: "JavaScript",
    to: "React",
    type: "LEADS_TO",
  },
  {
    from: "React",
    to: "Next.js",
    type: "LEADS_TO",
  },

  {
    from: "React",
    to: "JavaScript",
    type: "REQUIRES",
  },

  {
    from: "Next.js",
    to: "React",
    type: "REQUIRES",
  },

  {
    from: "Express",
    to: "Node.js",
    type: "REQUIRES",
  },

  {
    from: "Spring Boot",
    to: "Java",
    type: "REQUIRES",
  }
];