import './ClassicTemplate.css'

function ClassicTemplate({ resumeData }) {
  const { personalInfo, summary, experience, education, skills } = resumeData

  return (
    <div className="classic-template">
      <header className="classic-header">
        <h1>{personalInfo.fullName || 'Your Name'}</h1>
        <div className="contact-info">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.linkedin && <span>• LinkedIn: {personalInfo.linkedin}</span>}
          {personalInfo.github && <span>• GitHub: {personalInfo.github}</span>}
        </div>
      </header>

      {summary && (
        <section className="classic-section">
          <h2>PROFESSIONAL SUMMARY</h2>
          <p>{summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="classic-section">
          <h2>PROFESSIONAL EXPERIENCE</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="classic-item">
              <div className="item-header">
                <h3>{exp.position || 'Position'}</h3>
                <span className="date">
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <p className="company">{exp.company || 'Company'}</p>
              {exp.description && (
                <p className="description">{exp.description}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section className="classic-section">
          <h2>EDUCATION</h2>
          {education.map((edu) => (
            <div key={edu.id} className="classic-item">
              <div className="item-header">
                <h3>{edu.degree || 'Degree'}</h3>
                <span className="date">
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
              <p className="company">{edu.school || 'School'}</p>
              {edu.field && <p className="field">{edu.field}</p>}
              {edu.gpa && <p className="gpa">GPA: {edu.gpa}</p>}
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section className="classic-section">
          <h2>SKILLS</h2>
          <div className="skills-list">
            {skills.map((skill, index) => (
              <span key={skill.id} className="skill-tag">
                {skill.name || 'Skill'}
                {index < skills.length - 1 && ' •'}
              </span>
            ))}
          </div>
        </section>
      )}

      {resumeData.projects && resumeData.projects.length > 0 && (
        <section className="classic-section">
          <h2>PROJECTS</h2>
          {resumeData.projects.map((project) => (
            <div key={project.id} className="classic-item">
              <div className="item-header">
                <h3>{project.name || 'Project Name'}</h3>
              </div>
              {project.technologies && (
                <p className="company">{project.technologies}</p>
              )}
              {project.description && (
                <p className="description">{project.description}</p>
              )}
              {(project.link || project.github) && (
                <p className="field">
                  {project.link && `Link: ${project.link}`}
                  {project.link && project.github && ' • '}
                  {project.github && `GitHub: ${project.github}`}
                </p>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  )
}

export default ClassicTemplate
