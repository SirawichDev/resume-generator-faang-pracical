'use client';

import { useResumeStore } from '@/lib/resume-store';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export function ResumePreview() {
  const { resumeData } = useResumeStore();
  const { contactInfo, summary, skills, experience, projects, education, awards } = resumeData;

  return (
    <div
      id="resume-preview"
      className="bg-white text-black p-8 shadow-lg min-h-[11in] w-full max-w-[8.5in] mx-auto"
      style={{
        fontFamily: 'Arial, sans-serif',
        fontSize: '11pt',
        lineHeight: '1.4',
      }}
    >
      {/* Contact Information */}
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold mb-1" style={{ fontSize: '18pt' }}>
          {contactInfo.fullName || 'Your Name'}
        </h1>
        <div className="text-sm" style={{ fontSize: '10pt' }}>
          {[
            contactInfo.location,
            contactInfo.phone,
            contactInfo.email,
            contactInfo.linkedin,
            contactInfo.github,
            contactInfo.website,
            contactInfo.portfolio,
          ]
            .filter(Boolean)
            .join(' | ')}
        </div>
      </div>

      {/* Professional Summary */}
      {summary && (
        <>
          <Separator className="my-3 bg-black" />
          <div className="mb-4">
            <h2 className="text-sm font-bold mb-2 uppercase" style={{ fontSize: '12pt' }}>
              Professional Summary
            </h2>
            <p className="text-sm" style={{ fontSize: '10pt' }}>
              {summary}
            </p>
          </div>
        </>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <>
          <Separator className="my-3 bg-black" />
          <div className="mb-4">
            <h2 className="text-sm font-bold mb-2 uppercase" style={{ fontSize: '12pt' }}>
              Technical Skills
            </h2>
            <div className="space-y-1">
              {skills.map((skill, index) => (
                <div key={index} className="text-sm" style={{ fontSize: '10pt' }}>
                  <span className="font-semibold">{skill.category}:</span>{' '}
                  {skill.items.join(' | ')}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Work Experience */}
      {experience.length > 0 && (
        <>
          <Separator className="my-3 bg-black" />
          <div className="mb-4">
            <h2 className="text-sm font-bold mb-2 uppercase" style={{ fontSize: '12pt' }}>
              Work Experience
            </h2>
            <div className="space-y-3">
              {experience.map((exp, index) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <div>
                      <span className="font-semibold" style={{ fontSize: '10pt' }}>
                        {exp.company}, {exp.location}
                      </span>
                    </div>
                    <div className="text-sm" style={{ fontSize: '10pt' }}>
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </div>
                  </div>
                  <div className="font-semibold italic mb-1" style={{ fontSize: '10pt' }}>
                    {exp.position}
                  </div>
                  {exp.accomplishments.length > 0 && (
                    <ul className="list-disc ml-5 space-y-1">
                      {exp.accomplishments.map((acc, idx) => (
                        <li key={idx} className="text-sm" style={{ fontSize: '10pt' }}>
                          {acc}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <>
          <Separator className="my-3 bg-black" />
          <div className="mb-4">
            <h2 className="text-sm font-bold mb-2 uppercase" style={{ fontSize: '12pt' }}>
              Projects
            </h2>
            <div className="space-y-3">
              {projects.map((project) => (
                <div key={project.id}>
                  <div className="flex justify-between items-baseline">
                    <span className="font-semibold" style={{ fontSize: '10pt' }}>
                      {project.name}
                    </span>
                    {project.technologies.length > 0 && (
                      <span className="text-sm italic" style={{ fontSize: '9pt' }}>
                        {project.technologies.join(', ')}
                      </span>
                    )}
                  </div>
                  <p className="text-sm mb-1" style={{ fontSize: '10pt' }}>
                    {project.description}
                  </p>
                  {project.highlights.length > 0 && (
                    <ul className="list-disc ml-5 space-y-1">
                      {project.highlights.map((highlight, idx) => (
                        <li key={idx} className="text-sm" style={{ fontSize: '10pt' }}>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  )}
                  {(project.link || project.github) && (
                    <div className="text-sm mt-1" style={{ fontSize: '9pt' }}>
                      {project.link && <span>Link: {project.link}</span>}
                      {project.link && project.github && <span> | </span>}
                      {project.github && <span>GitHub: {project.github}</span>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Education */}
      {education.length > 0 && (
        <>
          <Separator className="my-3 bg-black" />
          <div className="mb-4">
            <h2 className="text-sm font-bold mb-2 uppercase" style={{ fontSize: '12pt' }}>
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline">
                    <div>
                      <span className="font-semibold" style={{ fontSize: '10pt' }}>
                        {edu.institution}, {edu.location}
                      </span>
                    </div>
                    <div className="text-sm" style={{ fontSize: '10pt' }}>
                      {edu.startDate} - {edu.endDate}
                    </div>
                  </div>
                  <div className="italic mb-1" style={{ fontSize: '10pt' }}>
                    {edu.degree} in {edu.field}
                    {edu.gpa && ` | GPA: ${edu.gpa}`}
                  </div>
                  {edu.honors && edu.honors.length > 0 && (
                    <ul className="list-disc ml-5">
                      {edu.honors.map((honor, idx) => (
                        <li key={idx} className="text-sm" style={{ fontSize: '10pt' }}>
                          {honor}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Awards & Certifications */}
      {awards.length > 0 && (
        <>
          <Separator className="my-3 bg-black" />
          <div className="mb-4">
            <h2 className="text-sm font-bold mb-2 uppercase" style={{ fontSize: '12pt' }}>
              Awards & Certifications
            </h2>
            <div className="space-y-2">
              {awards.map((award) => (
                <div key={award.id}>
                  <div className="flex justify-between items-baseline">
                    <span className="font-semibold" style={{ fontSize: '10pt' }}>
                      {award.title}
                    </span>
                    {award.date && (
                      <span className="text-sm" style={{ fontSize: '10pt' }}>
                        {award.date}
                      </span>
                    )}
                  </div>
                  <div className="text-sm" style={{ fontSize: '10pt' }}>
                    {award.issuer}
                  </div>
                  {award.description && (
                    <p className="text-sm" style={{ fontSize: '10pt' }}>
                      {award.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Empty State */}
      {!contactInfo.fullName &&
        !summary &&
        skills.length === 0 &&
        experience.length === 0 &&
        projects.length === 0 &&
        education.length === 0 &&
        awards.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg">Start filling out your resume details</p>
            <p className="text-sm mt-2">Your resume preview will appear here</p>
          </div>
        )}
    </div>
  );
}
