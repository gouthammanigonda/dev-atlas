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
    name: "Google",
    website: "https://google.com",
  },
  {
    name: "Netflix",
    website: "https://netflix.com",
  },
  {
    name: "Amazon",
    website: "https://amazon.com",
  },
  {
    name: "Oracle",
    website: "https://oracle.com",
  },
  {
    name: "Microsoft",
    website: "https://microsoft.com",
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
  // ===========================
  // Learning Path
  // ===========================
  { from: "HTML", to: "CSS", type: "LEADS_TO" },
  { from: "CSS", to: "JavaScript", type: "LEADS_TO" },
  { from: "JavaScript", to: "TypeScript", type: "LEADS_TO" },
  { from: "JavaScript", to: "React", type: "LEADS_TO" },
  { from: "React", to: "Next.js", type: "LEADS_TO" },
  { from: "Node.js", to: "Express", type: "LEADS_TO" },
  { from: "Java", to: "Spring Boot", type: "LEADS_TO" },
  { from: "SQL", to: "Node.js", type: "LEADS_TO" },
  { from: "Git", to: "Docker", type: "LEADS_TO" },

  // ===========================
  // Prerequisites
  // ===========================
  { from: "React", to: "JavaScript", type: "REQUIRES" },
  { from: "Next.js", to: "React", type: "REQUIRES" },
  { from: "Express", to: "Node.js", type: "REQUIRES" },
  { from: "Spring Boot", to: "Java", type: "REQUIRES" },
  { from: "Node.js", to: "JavaScript", type: "REQUIRES" },
  { from: "Docker", to: "Git", type: "REQUIRES" },

  // ===========================
  // Used In Projects
  // ===========================
  { from: "React", to: "Portfolio Website", type: "USED_IN" },
  { from: "React", to: "E-Commerce Platform", type: "USED_IN" },
  { from: "Next.js", to: "Company Landing Page", type: "USED_IN" },
  { from: "Node.js", to: "REST API", type: "USED_IN" },
  { from: "Spring Boot", to: "Banking Backend", type: "USED_IN" },
  { from: "Docker", to: "REST API", type: "USED_IN" },
  { from: "SQL", to: "Banking Backend", type: "USED_IN" },

  // ===========================
  // Learning Resources
  // ===========================
  { from: "React", to: "React Official Docs", type: "LEARN_FROM" },
  { from: "JavaScript", to: "JavaScript.info", type: "LEARN_FROM" },
  { from: "Next.js", to: "Next.js Docs", type: "LEARN_FROM" },
  { from: "Spring Boot", to: "Spring Documentation", type: "LEARN_FROM" },

  // ===========================
  // Required For Roles
  // ===========================
  { from: "React", to: "Frontend Engineer", type: "REQUIRED_FOR" },
  { from: "Next.js", to: "Frontend Engineer", type: "REQUIRED_FOR" },
  { from: "TypeScript", to: "Frontend Engineer", type: "REQUIRED_FOR" },

  { from: "Node.js", to: "Backend Engineer", type: "REQUIRED_FOR" },
  { from: "Express", to: "Backend Engineer", type: "REQUIRED_FOR" },
  { from: "SQL", to: "Backend Engineer", type: "REQUIRED_FOR" },
  { from: "Spring Boot", to: "Backend Engineer", type: "REQUIRED_FOR" },

  { from: "React", to: "Full Stack Engineer", type: "REQUIRED_FOR" },
  { from: "Node.js", to: "Full Stack Engineer", type: "REQUIRED_FOR" },
  { from: "Express", to: "Full Stack Engineer", type: "REQUIRED_FOR" },
  { from: "SQL", to: "Full Stack Engineer", type: "REQUIRED_FOR" },
  { from: "Docker", to: "Full Stack Engineer", type: "REQUIRED_FOR" },

  // ===========================
  // Companies Hiring Roles
  // ===========================
  { from: "Frontend Engineer", to: "Google", type: "HIRED_BY" },
  { from: "Frontend Engineer", to: "Netflix", type: "HIRED_BY" },

  { from: "Backend Engineer", to: "Amazon", type: "HIRED_BY" },
  { from: "Backend Engineer", to: "Oracle", type: "HIRED_BY" },

  { from: "Full Stack Engineer", to: "Microsoft", type: "HIRED_BY" },
  { from: "Full Stack Engineer", to: "Adobe", type: "HIRED_BY" },
];

export const relationshipMap = {
  LEADS_TO: {
    fromLabel: "Skill",
    fromKey: "name",
    toLabel: "Skill",
    toKey: "name",
  },

  REQUIRES: {
    fromLabel: "Skill",
    fromKey: "name",
    toLabel: "Skill",
    toKey: "name",
  },

  USED_IN: {
    fromLabel: "Skill",
    fromKey: "name",
    toLabel: "Project",
    toKey: "title",
  },

  LEARN_FROM: {
    fromLabel: "Skill",
    fromKey: "name",
    toLabel: "LearningResource",
    toKey: "title",
  },

  REQUIRED_FOR: {
    fromLabel: "Skill",
    fromKey: "name",
    toLabel: "Role",
    toKey: "name",
  },

  HIRED_BY: {
    fromLabel: "Role",
    fromKey: "name",
    toLabel: "Company",
    toKey: "name",
  },
};