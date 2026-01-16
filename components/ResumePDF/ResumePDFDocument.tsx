import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
    lineHeight: 1.4,
  },
  // Header / Contact Info
  header: {
    textAlign: 'center',
    marginBottom: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  contactLine: {
    fontSize: 9,
    color: '#333',
    marginTop: 10,
  },
  // Section styles
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 3,
  },
  // Entry styles (for experience, education, etc.)
  entry: {
    marginBottom: 10,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  entryTitle: {
    fontWeight: 'bold',
    fontSize: 10,
  },
  entryDate: {
    fontSize: 10,
    color: '#333',
  },
  entrySubtitle: {
    fontStyle: 'italic',
    fontSize: 10,
    marginBottom: 3,
  },
  // List styles
  bulletList: {
    marginLeft: 15,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  bulletPoint: {
    width: 10,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
  },
  // Skills styles
  skillLine: {
    marginBottom: 3,
    fontSize: 10,
  },
  skillCategory: {
    fontWeight: 'bold',
  },
  // Summary
  summaryText: {
    fontSize: 10,
    textAlign: 'justify',
  },
  // Projects
  projectTech: {
    fontSize: 9,
    fontStyle: 'italic',
    color: '#555',
  },
  projectDescription: {
    fontSize: 10,
    marginBottom: 3,
  },
  projectLinks: {
    fontSize: 9,
    color: '#555',
    marginTop: 2,
  },
});

interface ResumePDFDocumentProps {
  data: ResumeData;
}

export function ResumePDFDocument({ data }: ResumePDFDocumentProps) {
  const { contactInfo, summary, skills, experience, projects, education, awards } = data;

  // Build contact line
  const contactItems = [
    contactInfo.location,
    contactInfo.phone,
    contactInfo.email,
    contactInfo.linkedin,
    contactInfo.github,
    contactInfo.website,
    contactInfo.portfolio,
  ].filter(Boolean);

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        {/* Header / Contact Info */}
        <View style={styles.header}>
          <Text style={styles.name}>{contactInfo.fullName || 'Your Name'}</Text>
          {contactItems.length > 0 && (
            <Text style={styles.contactLine}>{contactItems.join(' | ')}</Text>
          )}
        </View>

        {/* Professional Summary */}
        {summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.summaryText}>{summary}</Text>
          </View>
        )}

        {/* Technical Skills */}
        {skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Technical Skills</Text>
            {skills.map((skill, index) => (
              <Text key={index} style={styles.skillLine}>
                <Text style={styles.skillCategory}>{skill.category}: </Text>
                {skill.items.join(' | ')}
              </Text>
            ))}
          </View>
        )}

        {/* Work Experience */}
        {experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {experience.map((exp) => (
              <View key={exp.id} style={styles.entry} wrap={false}>
                <View style={styles.entryHeader}>
                  <Text style={styles.entryTitle}>
                    {exp.company}, {exp.location}
                  </Text>
                  <Text style={styles.entryDate}>
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </Text>
                </View>
                <Text style={styles.entrySubtitle}>{exp.position}</Text>
                {exp.accomplishments.length > 0 && (
                  <View style={styles.bulletList}>
                    {exp.accomplishments.map((acc, idx) => (
                      <View key={idx} style={styles.bulletRow}>
                        <Text style={styles.bulletPoint}>•</Text>
                        <Text style={styles.bulletText}>{acc}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects.map((project) => (
              <View key={project.id} style={styles.entry} wrap={false}>
                <View style={styles.entryHeader}>
                  <Text style={styles.entryTitle}>{project.name}</Text>
                  {project.technologies.length > 0 && (
                    <Text style={styles.projectTech}>
                      {project.technologies.join(', ')}
                    </Text>
                  )}
                </View>
                <Text style={styles.projectDescription}>{project.description}</Text>
                {project.highlights.length > 0 && (
                  <View style={styles.bulletList}>
                    {project.highlights.map((highlight, idx) => (
                      <View key={idx} style={styles.bulletRow}>
                        <Text style={styles.bulletPoint}>•</Text>
                        <Text style={styles.bulletText}>{highlight}</Text>
                      </View>
                    ))}
                  </View>
                )}
                {(project.link || project.github) && (
                  <Text style={styles.projectLinks}>
                    {project.link && `Link: ${project.link}`}
                    {project.link && project.github && ' | '}
                    {project.github && `GitHub: ${project.github}`}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu) => (
              <View key={edu.id} style={styles.entry} wrap={false}>
                <View style={styles.entryHeader}>
                  <Text style={styles.entryTitle}>
                    {edu.institution}, {edu.location}
                  </Text>
                  {(edu.startDate || edu.endDate) && (
                    <Text style={styles.entryDate}>
                      {edu.startDate && edu.endDate
                        ? `${edu.startDate} - ${edu.endDate}`
                        : edu.startDate || edu.endDate}
                    </Text>
                  )}
                </View>
                <Text style={styles.entrySubtitle}>
                  {edu.degree} in {edu.field}
                  {edu.gpa && ` | GPA: ${edu.gpa}`}
                </Text>
                {edu.honors && edu.honors.length > 0 && (
                  <View style={styles.bulletList}>
                    {edu.honors.map((honor, idx) => (
                      <View key={idx} style={styles.bulletRow}>
                        <Text style={styles.bulletPoint}>•</Text>
                        <Text style={styles.bulletText}>{honor}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Awards & Certifications */}
        {awards.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Awards & Certifications</Text>
            {awards.map((award) => (
              <View key={award.id} style={styles.entry} wrap={false}>
                <View style={styles.entryHeader}>
                  <Text style={styles.entryTitle}>{award.title}</Text>
                  {award.date && <Text style={styles.entryDate}>{award.date}</Text>}
                </View>
                <Text style={styles.entrySubtitle}>{award.issuer}</Text>
                {award.description && (
                  <Text style={styles.bulletText}>{award.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
