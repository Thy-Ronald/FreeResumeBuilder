import './ProfessionalTemplate.css'

function ProfessionalTemplate({ resumeData }) {
  const { personalInfo, summary, experience, education, skills, projects } = resumeData

  return (
    <div className="professional-template">
      <header className="professional-header">
        <h1>{personalInfo.fullName || 'Your Name'}</h1>
        <div className="header-contact">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
          {personalInfo.github && <span>• {personalInfo.github}</span>}
        </div>
      </header>

      <div className="professional-layout">
        <div className="professional-left">
          {skills.length > 0 && (
            <section className="professional-section">
              <h2>Skills</h2>
              <div className="skills-list">
                {skills.map((skill) => (
                  <div key={skill.id} className="skill-item">
                    {skill.name || 'Skill'}
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="professional-section">
            <h2>Tools</h2>
            <div className="skills-list">
              <div className="skill-item">Git</div>
              <div className="skill-item">Docker</div>
              <div className="skill-item">VS Code</div>
            </div>
          </section>

          <section className="professional-section">
            <h2>Languages</h2>
            <div className="skills-list">
              <div className="skill-item">English (Native)</div>
              <div className="skill-item">Spanish (Fluent)</div>
            </div>
          </section>

          <section className="professional-section">
            <h2>Certifications</h2>
            <div className="cert-list">
              <div className="cert-item">AWS Certified Solutions Architect</div>
              <div className="cert-item">Google Cloud Professional</div>
            </div>
          </section>
        </div>

        <div className="professional-right">
          {summary && (
            <section className="professional-section">
              <h2>Summary</h2>
              <p className="summary-text">{summary}</p>
            </section>
          )}

          {experience.length > 0 && (
            <section className="professional-section">
              <h2>Experience</h2>
              {experience.map((exp) => (
                <div key={exp.id} className="professional-item">
                  <div className="item-header">
                    <div>
                      <h3>{exp.position || 'Position'}</h3>
                      <span className="item-company">{exp.company || 'Company'}</span>
                    </div>
                    <span className="item-date">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.description && (
                    <ul className="item-bullets">
                      {exp.description.split('\n').map((line, idx) => (
                        line.trim() && (
                          <li key={idx}>{line.trim()}</li>
                        )
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          )}

          {projects && projects.length > 0 && (
            <section className="professional-section">
              <h2>Projects</h2>
              {projects.map((project) => (
                <div key={project.id} className="professional-item">
                  <div className="item-header">
                    <div>
                      <h3>{project.name || 'Project Name'}</h3>
                      {project.technologies && (
                        <span className="item-tech">{project.technologies}</span>
                      )}
                    </div>
                  </div>
                  {project.description && (
                    <ul className="item-bullets">
                      {project.description.split('\n').map((line, idx) => (
                        line.trim() && (
                          <li key={idx}>{line.trim()}</li>
                        )
                      ))}
                    </ul>
                  )}
                  {(project.link || project.github) && (
                    <div className="item-links">
                      {project.link && <span>{project.link}</span>}
                      {project.github && <span>{project.github}</span>}
                    </div>
                  )}
                </div>
              ))}
            </section>
          )}

          {education.length > 0 && (
            <section className="professional-section">
              <h2>Education</h2>
              {education.map((edu) => (
                <div key={edu.id} className="professional-item">
                  <div className="item-header">
                    <div>
                      <h3>{edu.degree || 'Degree'}</h3>
                      <span className="item-company">{edu.school || 'School'}</span>
                      {edu.field && <span className="item-tech">{edu.field}</span>}
                    </div>
                    <span className="item-date">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                  {edu.gpa && <div className="item-meta">GPA: {edu.gpa}</div>}
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfessionalTemplate
