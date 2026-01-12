import './ModernTemplate.css'
import Icon from '../Icon'

function ModernTemplate({ resumeData }) {
  const { personalInfo, summary, experience, education, skills } = resumeData

  return (
    <div className="modern-template">
      <header className="modern-header">
        <h1>{personalInfo.fullName || 'Your Name'}</h1>
        <div className="contact-info">
          {personalInfo.email && (
            <span>
              <Icon name="email" className="contact-icon" /> {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span>
              <Icon name="phone" className="contact-icon" /> {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span>
              <Icon name="location" className="contact-icon" /> {personalInfo.location}
            </span>
          )}
          {personalInfo.linkedin && (
            <span>
              <Icon name="linkedin" className="contact-icon" /> {personalInfo.linkedin}
            </span>
          )}
          {personalInfo.github && (
            <span>
              <Icon name="github" className="contact-icon" /> {personalInfo.github}
            </span>
          )}
        </div>
      </header>

      {summary && (
        <section className="modern-section">
          <h2>Professional Summary</h2>
          <p>{summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="modern-section">
          <h2>Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="modern-item">
              <div className="item-header">
                <div>
                  <h3>{exp.position || 'Position'}</h3>
                  <p className="company">{exp.company || 'Company'}</p>
                </div>
                <span className="date">
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              {exp.description && (
                <p className="description">{exp.description}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section className="modern-section">
          <h2>Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="modern-item">
              <div className="item-header">
                <div>
                  <h3>{edu.degree || 'Degree'}</h3>
                  <p className="company">{edu.school || 'School'}</p>
                  {edu.field && <p className="field">{edu.field}</p>}
                </div>
                <span className="date">
                  {edu.startDate} - {edu.endDate}
                  {edu.gpa && ` • GPA: ${edu.gpa}`}
                </span>
              </div>
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section className="modern-section">
          <h2>Skills</h2>
          <div className="skills-grid">
            {skills.map((skill) => (
              <div key={skill.id} className="skill-item">
                <span className="skill-name">{skill.name || 'Skill'}</span>
                <div className="skill-bar">
                  <div
                    className="skill-fill"
                    style={{ width: `${(skill.level / 10) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {resumeData.projects && resumeData.projects.length > 0 && (
        <section className="modern-section">
          <h2>Projects</h2>
          {resumeData.projects.map((project) => (
            <div key={project.id} className="modern-item">
              <div className="item-header">
                <div>
                  <h3>{project.name || 'Project Name'}</h3>
                  {project.technologies && (
                    <p className="company">{project.technologies}</p>
                  )}
                </div>
              </div>
              {project.description && (
                <p className="description">{project.description}</p>
              )}
              {(project.link || project.github) && (
                <div className="contact-info" style={{ marginTop: '8px', fontSize: '0.85rem' }}>
                  {project.link && (
                    <span>
                      <Icon name="link" className="contact-icon" /> {project.link}
                    </span>
                  )}
                  {project.github && (
                    <span>
                      <Icon name="github" className="contact-icon" /> {project.github}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  )
}

export default ModernTemplate
