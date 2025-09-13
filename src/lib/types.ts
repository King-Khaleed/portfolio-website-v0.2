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
  title: string;
  description: string;
  image: string;
  category: BlogCategory;
  date: string;
  readingTime: number;
}
