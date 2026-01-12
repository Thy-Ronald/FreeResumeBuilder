import './CompactTemplate.css'

function CompactTemplate({ resumeData }) {
  const { personalInfo, summary, experience, education, skills, projects } = resumeData

  return (
    <div className="compact-template">
      <header className="compact-header">
        <div className="header-main">
          <h1>{personalInfo.fullName || 'Your Name'}</h1>
          <div className="header-subtitle">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>• {personalInfo.phone}</span>}
            {personalInfo.location && <span>• {personalInfo.location}</span>}
          </div>
        </div>
        <div className="header-links">
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.github && <span>{personalInfo.github}</span>}
        </div>
      </header>

      {summary && (
        <section className="compact-section">
          <h2>Summary</h2>
          <p>{summary}</p>
        </section>
      )}

      <div className="compact-layout">
        <div className="compact-main">
          {experience.length > 0 && (
            <section className="compact-section">
              <h2>Experience</h2>
              {experience.map((exp) => (
                <div key={exp.id} className="compact-item">
                  <div className="compact-item-header">
                    <div>
                      <h3>{exp.position || 'Position'}</h3>
                      <p className="compact-company">{exp.company || 'Company'}</p>
                    </div>
                    <span className="compact-date">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="compact-description">{exp.description}</p>
                  )}
                </div>
              ))}
            </section>
          )}

          {projects && projects.length > 0 && (
            <section className="compact-section">
              <h2>Projects</h2>
              {projects.map((project) => (
                <div key={project.id} className="compact-item">
                  <h3>{project.name || 'Project Name'}</h3>
                  {project.technologies && (
                    <p className="compact-meta">{project.technologies}</p>
                  )}
                  {project.description && (
                    <p className="compact-description">{project.description}</p>
                  )}
                </div>
              ))}
            </section>
          )}
        </div>

        <div className="compact-sidebar">
          {skills.length > 0 && (
            <section className="compact-section">
              <h2>Skills</h2>
              <div className="compact-skills">
                {skills.map((skill) => (
                  <span key={skill.id} className="compact-skill">
                    {skill.name || 'Skill'}
                  </span>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section className="compact-section">
              <h2>Education</h2>
              {education.map((edu) => (
                <div key={edu.id} className="compact-item">
                  <h3>{edu.degree || 'Degree'}</h3>
                  <p className="compact-company">{edu.school || 'School'}</p>
                  {edu.field && <p className="compact-meta">{edu.field}</p>}
                  <p className="compact-date">
                    {edu.startDate} - {edu.endDate}
                  </p>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

export default CompactTemplate
