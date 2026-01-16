'use client';

import { ContactInfoForm } from '@/components/ResumeForm/ContactInfoForm';
import { SummaryForm } from '@/components/ResumeForm/SummaryForm';
import { SkillsForm } from '@/components/ResumeForm/SkillsForm';
import { ExperienceForm } from '@/components/ResumeForm/ExperienceForm';
import { ProjectsForm } from '@/components/ResumeForm/ProjectsForm';
import { EducationForm } from '@/components/ResumeForm/EducationForm';
import { AwardsForm } from '@/components/ResumeForm/AwardsForm';
import { ResumePreview } from '@/components/ResumePreview/ResumePreview';
import { PDFDownloadButton } from '@/components/ResumePDF/PDFDownloadButton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  FAANG Resume Generator
                </h1>
                <p className="text-sm text-muted-foreground">
                  ATS-Friendly Resume Builder
                </p>
              </div>
            </div>
            <PDFDownloadButton filename="my-resume.pdf" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Form Section */}
          <div className="space-y-6">
            <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-lg p-6 shadow-lg">
              <Tabs defaultValue="contact" className="w-full">
                <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
                  <TabsTrigger value="contact">Contact</TabsTrigger>
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="awards">Awards</TabsTrigger>
                </TabsList>

                <div className="mt-6">
                  <TabsContent value="contact" className="space-y-4">
                    <ContactInfoForm />
                  </TabsContent>

                  <TabsContent value="summary" className="space-y-4">
                    <SummaryForm />
                  </TabsContent>

                  <TabsContent value="skills" className="space-y-4">
                    <SkillsForm />
                  </TabsContent>

                  <TabsContent value="experience" className="space-y-4">
                    <ExperienceForm />
                  </TabsContent>

                  <TabsContent value="projects" className="space-y-4">
                    <ProjectsForm />
                  </TabsContent>

                  <TabsContent value="education" className="space-y-4">
                    <EducationForm />
                  </TabsContent>

                  <TabsContent value="awards" className="space-y-4">
                    <AwardsForm />
                  </TabsContent>
                </div>
              </Tabs>
            </div>

            {/* Tips Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                💡 ATS-Friendly Tips
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Use action verbs and quantifiable results in accomplishments</li>
                <li>• Format: &quot;[Action] that resulted in [quantifiable outcome]&quot;</li>
                <li>• Keep skills relevant to the job you&apos;re applying for</li>
                <li>• Use standard section headings for better ATS parsing</li>
                <li>• Include keywords from job descriptions in your experience</li>
              </ul>
            </div>
          </div>

          {/* Right: Preview Section */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Resume Preview</h2>
              <div className="overflow-auto max-h-[calc(100vh-200px)] border rounded-lg">
                <ResumePreview />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
