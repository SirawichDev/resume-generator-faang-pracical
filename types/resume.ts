export interface ContactInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  github?: string;
  website?: string;
  portfolio?: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Experience {
  id: string;
  company: string;
  location: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  accomplishments: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  highlights: string[];
  link?: string;
  github?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  honors?: string[];
}

export interface Award {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
}

export interface ResumeData {
  contactInfo: ContactInfo;
  summary: string;
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
  awards: Award[];
}

export const defaultResumeData: ResumeData = {
  contactInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
  },
  summary: '',
  skills: [],
  experience: [],
  projects: [],
  education: [],
  awards: [],
};
