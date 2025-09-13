export type QuizTier = 'Apprentice Wizard' | 'Digital Sorcerer' | 'Web3 Archmage' | 'Legendary Tech Wizard';

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

export type BlogCategory = "Introvert Chronicles" | "Tech Insights" | "Web3 Wizardry" | "AI & Innovation";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  image: string;
  category: BlogCategory;
  date: string;
  readingTime: number;
  meta: {
    description: string;
    keywords: string[];
  };
}

export interface ServicePackage {
  title: string;
  price: string;
  target: string;
  features: string[];
  timeline: string;
  support: string;
}
