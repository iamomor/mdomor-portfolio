export type SkillLevel = "expert" | "proficient" | "familiar";

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  medium?: string;
  instagram?: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  email: string;
  location: string;
  avatar?: string;
  social: SocialLinks;
}

export interface Experience {
  company: string;
  companyUrl?: string;
  role: string;
  startDate: string;
  endDate: string | null;
  description?: string;
  highlights: string[];
  technologies: string[];
}

export interface SkillItem {
  name: string;
  level: SkillLevel;
}

export interface SkillCategory {
  category: string;
  items: SkillItem[];
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  github?: string;
  image?: string;
  featured: boolean;
}

export interface WritingPost {
  title: string;
  url: string;
  date: string;
  description: string;
  featured?: boolean;
  readingTime?: string;
}

export interface Education {
  institution: string;
  degree: string;
  location: string;
  endDate: string;
}

export interface Activity {
  organization: string;
  role: string;
  duration: string;
  highlights: string[];
}

export interface Talk {
  title: string;
  event: string;
  year: number;
  role: string;
}

export interface Publication {
  title: string;
  publisher: string;
  year: number;
  doi: string;
}

export interface Portfolio {
  personal: PersonalInfo;
  experience: Experience[];
  education?: Education[];
  skills: SkillCategory[];
  projects?: Project[];
  writingPosts?: WritingPost[];
  activities?: Activity[];
  talks?: Talk[];
  publications?: Publication[];
}
