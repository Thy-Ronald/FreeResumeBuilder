import './MinimalTemplate.css'

function MinimalTemplate({ resumeData }) {
  const { personalInfo, summary, experience, education, skills } = resumeData

  return (
    <div className="minimal-template">
      <header className="minimal-header">
        <h1>{personalInfo.fullName || 'Your Name'}</h1>
        <div className="contact-info">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.github && <span>{personalInfo.github}</span>}
        </div>
      </header>

      {summary && (
        <section className="minimal-section">
          <h2>Summary</h2>
          <p>{summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="minimal-section">
          <h2>Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="minimal-item">
              <div className="item-row">
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
        <section className="minimal-section">
          <h2>Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="minimal-item">
              <div className="item-row">
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
        <section className="minimal-section">
          <h2>Skills</h2>
          <div className="skills-container">
            {skills.map((skill) => (
              <div key={skill.id} className="skill-badge">
                {skill.name || 'Skill'}
              </div>
            ))}
          </div>
        </section>
      )}

      {resumeData.projects && resumeData.projects.length > 0 && (
        <section className="minimal-section">
          <h2>Projects</h2>
          {resumeData.projects.map((project) => (
            <div key={project.id} className="minimal-item">
              <div className="item-row">
                <h3>{project.name || 'Project Name'}</h3>
              </div>
              {project.technologies && (
                <p className="company">{project.technologies}</p>
              )}
              {project.description && (
                <p className="description">{project.description}</p>
              )}
              {(project.link || project.github) && (
                <div className="contact-info" style={{ marginTop: '8px' }}>
                  {project.link && <span>{project.link}</span>}
                  {project.github && <span>{project.github}</span>}
                </div>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  )
}

export default MinimalTemplate
