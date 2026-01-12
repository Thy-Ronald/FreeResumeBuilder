import './CreativeTemplate.css'

function CreativeTemplate({ resumeData }) {
  const { personalInfo, summary, experience, education, skills, projects } = resumeData

  return (
    <div className="creative-template">
      <header className="creative-header">
        <div className="header-content">
          <h1>{personalInfo.fullName || 'Your Name'}</h1>
          <div className="header-line"></div>
          <div className="contact-grid">
            {personalInfo.email && (
              <div className="contact-item">
                <span className="contact-label">Email</span>
                <span className="contact-value">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="contact-item">
                <span className="contact-label">Phone</span>
                <span className="contact-value">{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="contact-item">
                <span className="contact-label">Location</span>
                <span className="contact-value">{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="contact-item">
                <span className="contact-label">LinkedIn</span>
                <span className="contact-value">{personalInfo.linkedin}</span>
              </div>
            )}
            {personalInfo.github && (
              <div className="contact-item">
                <span className="contact-label">GitHub</span>
                <span className="contact-value">{personalInfo.github}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {summary && (
        <section className="creative-section">
          <h2 className="section-title">About</h2>
          <div className="section-content">
            <p>{summary}</p>
          </div>
        </section>
      )}

      {experience.length > 0 && (
        <section className="creative-section">
          <h2 className="section-title">Experience</h2>
          <div className="section-content">
            {experience.map((exp) => (
              <div key={exp.id} className="creative-item">
                <div className="item-meta">
                  <h3>{exp.position || 'Position'}</h3>
                  <span className="item-date">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className="item-company">{exp.company || 'Company'}</p>
                {exp.description && (
                  <div className="item-description">
                    {exp.description.split('\n').map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="creative-grid">
        {education.length > 0 && (
          <section className="creative-section">
            <h2 className="section-title">Education</h2>
            <div className="section-content">
              {education.map((edu) => (
                <div key={edu.id} className="creative-item">
                  <h3>{edu.degree || 'Degree'}</h3>
                  <p className="item-company">{edu.school || 'School'}</p>
                  {edu.field && <p className="item-meta-text">{edu.field}</p>}
                  <p className="item-date">
                    {edu.startDate} - {edu.endDate}
                  </p>
                  {edu.gpa && <p className="item-meta-text">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {skills.length > 0 && (
          <section className="creative-section">
            <h2 className="section-title">Skills</h2>
            <div className="section-content">
              <div className="skills-grid">
                {skills.map((skill) => (
                  <div key={skill.id} className="skill-item">
                    <span className="skill-label">{skill.name || 'Skill'}</span>
                    <div className="skill-progress">
                      <div
                        className="skill-progress-bar"
                        style={{ width: `${(skill.level / 10) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      {projects && projects.length > 0 && (
        <section className="creative-section">
          <h2 className="section-title">Projects</h2>
          <div className="section-content">
            {projects.map((project) => (
              <div key={project.id} className="creative-item">
                <h3>{project.name || 'Project Name'}</h3>
                {project.technologies && (
                  <p className="item-meta-text">{project.technologies}</p>
                )}
                {project.description && (
                  <div className="item-description">
                    <p>{project.description}</p>
                  </div>
                )}
                {(project.link || project.github) && (
                  <p className="item-links">
                    {project.link && <span>{project.link}</span>}
                    {project.github && <span>{project.github}</span>}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default CreativeTemplate
