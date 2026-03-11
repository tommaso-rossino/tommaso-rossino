import type { SkillCategory } from "@/types";

export const skills: SkillCategory[] = [
  {
    icon: "Code",
    title: "Frontend",
    skills: [
      "React",
      "JavaScript (ESNext)",
      "TypeScript",
      "Redux",
      "Next.js",
      "TanStack Query",
      "AngularJS",
      "D3.js",
    ],
  },
  {
    icon: "Database",
    title: "Backend/Full-Stack",
    skills: [
      "Node.js",
      "Java",
      "Groovy",
      "Spring Framework",
      "Microservices",
      "REST/SOAP",
    ],
  },
  {
    icon: "Cloud",
    title: "DevOps/Tooling",
    skills: [
      "CI/CD",
      "TDD",
      "Git (GitHub/GitLab)",
      "Docker",
      "AWS",
      "Jenkins",
      "Figma",
    ],
  },
  {
    icon: "Database",
    title: "Database",
    skills: ["MySQL", "Oracle SQL", "PostgreSQL", "Snowflake"],
  },
];
