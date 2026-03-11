export interface Achievement {
  icon: string;
  title: string;
  description: string;
}

export interface Experience {
  company: string;
  location: string;
  role: string;
  period: string;
  achievements: Achievement[];
}

export interface CaseStudy {
  challenge: string;
  solution: string;
  impact: string;
}

export interface Project {
  id: string;
  title: string;
  company: string;
  description: string;
  tech: string[];
  highlight: string;
  accentColor: string;
  imageUrl: string;
  appScreenshots?: string[];
  screenshotLayout?: "phone" | "landscape";
  caseStudy: CaseStudy;
}

export interface SkillCategory {
  icon: string;
  title: string;
  skills: string[];
}
