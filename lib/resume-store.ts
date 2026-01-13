import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ResumeData, defaultResumeData } from '@/types/resume';

interface ResumeStore {
  resumeData: ResumeData;
  updateContactInfo: (info: Partial<ResumeData['contactInfo']>) => void;
  updateSummary: (summary: string) => void;
  setSkills: (skills: ResumeData['skills']) => void;
  addExperience: (experience: ResumeData['experience'][0]) => void;
  updateExperience: (id: string, experience: Partial<ResumeData['experience'][0]>) => void;
  removeExperience: (id: string) => void;
  addProject: (project: ResumeData['projects'][0]) => void;
  updateProject: (id: string, project: Partial<ResumeData['projects'][0]>) => void;
  removeProject: (id: string) => void;
  addEducation: (education: ResumeData['education'][0]) => void;
  updateEducation: (id: string, education: Partial<ResumeData['education'][0]>) => void;
  removeEducation: (id: string) => void;
  addAward: (award: ResumeData['awards'][0]) => void;
  updateAward: (id: string, award: Partial<ResumeData['awards'][0]>) => void;
  removeAward: (id: string) => void;
  resetResume: () => void;
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      resumeData: defaultResumeData,
      
      updateContactInfo: (info) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            contactInfo: { ...state.resumeData.contactInfo, ...info },
          },
        })),
      
      updateSummary: (summary) =>
        set((state) => ({
          resumeData: { ...state.resumeData, summary },
        })),
      
      setSkills: (skills) =>
        set((state) => ({
          resumeData: { ...state.resumeData, skills },
        })),
      
      addExperience: (experience) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: [...state.resumeData.experience, experience],
          },
        })),
      
      updateExperience: (id, experience) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: state.resumeData.experience.map((exp) =>
              exp.id === id ? { ...exp, ...experience } : exp
            ),
          },
        })),
      
      removeExperience: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: state.resumeData.experience.filter((exp) => exp.id !== id),
          },
        })),
      
      addProject: (project) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            projects: [...state.resumeData.projects, project],
          },
        })),
      
      updateProject: (id, project) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            projects: state.resumeData.projects.map((proj) =>
              proj.id === id ? { ...proj, ...project } : proj
            ),
          },
        })),
      
      removeProject: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            projects: state.resumeData.projects.filter((proj) => proj.id !== id),
          },
        })),
      
      addEducation: (education) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: [...state.resumeData.education, education],
          },
        })),
      
      updateEducation: (id, education) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: state.resumeData.education.map((edu) =>
              edu.id === id ? { ...edu, ...education } : edu
            ),
          },
        })),
      
      removeEducation: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: state.resumeData.education.filter((edu) => edu.id !== id),
          },
        })),
      
      addAward: (award) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            awards: [...state.resumeData.awards, award],
          },
        })),
      
      updateAward: (id, award) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            awards: state.resumeData.awards.map((awd) =>
              awd.id === id ? { ...awd, ...award } : awd
            ),
          },
        })),
      
      removeAward: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            awards: state.resumeData.awards.filter((awd) => awd.id !== id),
          },
        })),
      
      resetResume: () => set({ resumeData: defaultResumeData }),
    }),
    {
      name: 'resume-storage',
    }
  )
);
