import './ATSTemplate.css'

function ATSTemplate({ resumeData }) {
  const { personalInfo, summary, experience, education, skills, projects } = resumeData

  return (
    <div className="ats-template">
      <header className="ats-header">
        <h1>{personalInfo.fullName || 'Your Name'}</h1>
        <div className="contact-info">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>| {personalInfo.phone}</span>}
          {personalInfo.location && <span>| {personalInfo.location}</span>}
          {personalInfo.linkedin && <span>| LinkedIn: {personalInfo.linkedin}</span>}
          {personalInfo.github && <span>| GitHub: {personalInfo.github}</span>}
        </div>
      </header>

      {summary && (
        <section className="ats-section">
          <h2>PROFESSIONAL SUMMARY</h2>
          <p>{summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="ats-section">
          <h2>PROFESSIONAL EXPERIENCE</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="ats-item">
              <div className="ats-item-header">
                <h3>{exp.position || 'Position'}</h3>
                <span className="ats-date">
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <p className="ats-company">{exp.company || 'Company'}</p>
              {exp.description && (
                <div className="ats-description">
                  {exp.description.split('\n').map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section className="ats-section">
          <h2>EDUCATION</h2>
          {education.map((edu) => (
            <div key={edu.id} className="ats-item">
              <div className="ats-item-header">
                <h3>{edu.degree || 'Degree'}</h3>
                <span className="ats-date">
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
              <p className="ats-company">{edu.school || 'School'}</p>
              {edu.field && <p className="ats-field">Major: {edu.field}</p>}
              {edu.gpa && <p className="ats-field">GPA: {edu.gpa}</p>}
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section className="ats-section">
          <h2>SKILLS</h2>
          <div className="ats-skills">
            {skills.map((skill, index) => (
              <span key={skill.id} className="ats-skill-tag">
                {skill.name || 'Skill'}
                {index < skills.length - 1 && ', '}
              </span>
            ))}
          </div>
        </section>
      )}

      {projects && projects.length > 0 && (
        <section className="ats-section">
          <h2>PROJECTS</h2>
          {projects.map((project) => (
            <div key={project.id} className="ats-item">
              <h3>{project.name || 'Project Name'}</h3>
              {project.technologies && (
                <p className="ats-field">Technologies: {project.technologies}</p>
              )}
              {project.description && <p className="ats-description">{project.description}</p>}
              {(project.link || project.github) && (
                <p className="ats-field">
                  {project.link && `Link: ${project.link}`}
                  {project.link && project.github && ' | '}
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

export default ATSTemplate
