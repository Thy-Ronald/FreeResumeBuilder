import { useRef, useEffect } from 'react'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import Icon from '../../../components/common/Icon'

function ResumePreview({ resumeData, selectedTemplate = 'compact', onDownloadReady }) {
  const resumeRef = useRef(null)

  const downloadPDF = async () => {
    if (!resumeRef.current) return

    try {
      // Wait a bit for fonts to load
      await new Promise(resolve => setTimeout(resolve, 300))

      const canvas = await html2canvas(resumeRef.current, {
        scale: 3,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 816, // US Letter width in pixels at 96 DPI (8.5" x 96)
        windowHeight: 1056, // US Letter height in pixels at 96 DPI (11" x 96)
        scrollY: -window.scrollY,
        scrollX: -window.scrollX,
        allowTaint: true,
        foreignObjectRendering: false,
      })

      const imgData = canvas.toDataURL('image/png', 1.0)
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'letter', // US Letter format (8.5" x 11")
        compress: true,
      })

      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()

      // Add image to fill the entire page
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, '', 'FAST')
      pdf.save(`${resumeData.personalInfo.fullName || 'resume'}-resume.pdf`)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Error generating PDF. Please try again.')
    }
  }

  useEffect(() => {
    if (onDownloadReady) {
      onDownloadReady(downloadPDF)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getTemplateClasses = () => {
    // US Letter: 8.5" x 11" = 215.9mm x 279.4mm (aspect ratio 1:1.294)
    // Maintaining true physical dimensions for PDF export
    // Reduced padding to maximize content density
    const base = "bg-white w-[215.9mm] h-[279.4mm] font-sans text-gray-900 overflow-hidden"
    const styles = {
      compact: `${base} text-[9pt] leading-[1.28] p-[8mm_10mm]`,
      modern: `${base} text-[9.5pt] leading-[1.35] p-[9mm_11mm]`,
      classic: `${base} text-[9pt] leading-[1.32] p-[9mm_12mm]`,
      minimal: `${base} text-[9pt] leading-[1.4] p-[8mm_10mm]`,
    }
    return styles[selectedTemplate] || styles.compact
  }

  const renderHeader = () => {
    const headerStyles = {
      compact: 'text-center mb-1.5 pb-1 border-b border-gray-300',
      modern: 'text-center mb-2 pb-1.5 border-b-2 border-gray-400',
      classic: 'text-center mb-2 pb-1.5 border-b border-gray-300',
      minimal: 'text-center mb-1.5 pb-0.5 border-b border-gray-200',
    }
    const nameStyles = {
      compact: 'text-[17pt] font-bold tracking-wider mb-0.5 text-black uppercase',
      modern: 'text-[18pt] font-bold tracking-wide mb-1 text-black',
      classic: 'text-[18pt] font-bold tracking-normal mb-1 text-black',
      minimal: 'text-[16pt] font-semibold tracking-wide mb-0.5 text-black',
    }
    const titleStyles = {
      compact: 'text-[9.5pt] font-medium mb-1 text-gray-600',
      modern: 'text-[10pt] font-medium mb-1.5 text-gray-600',
      classic: 'text-[10pt] font-medium mb-1.5 text-gray-600',
      minimal: 'text-[9pt] font-normal mb-1 text-gray-500',
    }
    const contactStyles = {
      compact: 'flex justify-center flex-wrap gap-1 text-[8pt] text-gray-600',
      modern: 'flex justify-center flex-wrap gap-2 text-[8.5pt] text-gray-600',
      classic: 'flex justify-center flex-wrap gap-2 text-[8.5pt] text-gray-600',
      minimal: 'flex justify-center flex-wrap gap-1 text-[7.5pt] text-gray-500',
    }

    return (
      <header className={headerStyles[selectedTemplate] || headerStyles.compact}>
        <h1 className={nameStyles[selectedTemplate] || nameStyles.compact}>
          {resumeData.personalInfo.fullName || 'Your Name'}
        </h1>
        {resumeData.personalInfo.title && (
          <p className={titleStyles[selectedTemplate] || titleStyles.compact}>
            {resumeData.personalInfo.title}
          </p>
        )}
        <div className={contactStyles[selectedTemplate] || contactStyles.compact}>
          {resumeData.personalInfo.email && (
            <span className="inline-block">{resumeData.personalInfo.email}</span>
          )}
          {resumeData.personalInfo.phone && (
            <>
              <span className="text-gray-300">|</span>
              <span className="inline-block">{resumeData.personalInfo.phone}</span>
            </>
          )}
          {resumeData.personalInfo.location && (
            <>
              <span className="text-gray-300">|</span>
              <span className="inline-block">{resumeData.personalInfo.location}</span>
            </>
          )}
          {resumeData.personalInfo.linkedin && (
            <>
              <span className="text-gray-300">|</span>
              <span className="inline-block">{resumeData.personalInfo.linkedin}</span>
            </>
          )}
          {resumeData.personalInfo.github && (
            <>
              <span className="text-gray-300">|</span>
              <span className="inline-block">{resumeData.personalInfo.github}</span>
            </>
          )}
        </div>
      </header>
    )
  }

  const renderSectionHeader = (title) => {
    const headerStyles = {
      compact: 'text-[9.5pt] font-bold uppercase tracking-wide mb-0.5 text-black',
      modern: 'text-[10pt] font-bold uppercase tracking-wide mb-0.5 text-black',
      classic: 'text-[10pt] font-bold uppercase tracking-wide mb-0.5 text-black',
      minimal: 'text-[9pt] font-semibold uppercase tracking-wide mb-0.5 text-gray-800',
    }
    const dividerStyles = {
      compact: 'h-[0.5px] bg-gray-300 mb-1',
      modern: 'h-[1px] bg-gray-400 mb-1',
      classic: 'h-[1px] bg-gray-300 mb-1',
      minimal: 'h-[0.5px] bg-gray-200 mb-0.5',
    }
    return (
      <>
        <h2 className={headerStyles[selectedTemplate] || headerStyles.compact} style={{ fontVariant: 'small-caps' }}>
          {title}
        </h2>
        <div className={dividerStyles[selectedTemplate] || dividerStyles.compact}></div>
      </>
    )
  }

  const renderTwoColumnLayout = () => (
    <div className={`flex gap-2.5 mt-2`}>
            {/* Left Column - 30% */}
            <aside className="w-[30%] flex-shrink-0">
              {/* Skills */}
              {(resumeData.skills.length > 0 || true) && (
                <section className="mb-1.5">
                  {renderSectionHeader('Skills')}
                  <ul className="list-none p-0 m-0">
                    {resumeData.skills.length > 0 ? (
                      resumeData.skills.map(skill => (
                        <li key={skill.id} className="py-0 text-[8.5pt] leading-[1.25] text-gray-700">
                          {skill.name}
                        </li>
                      ))
                    ) : (
                      <>
                        <li className="py-0 text-[8.5pt] leading-[1.25] text-gray-400 italic">JavaScript</li>
                        <li className="py-0 text-[8.5pt] leading-[1.25] text-gray-400 italic">Python</li>
                        <li className="py-0 text-[8.5pt] leading-[1.25] text-gray-400 italic">TypeScript</li>
                        <li className="py-0 text-[8.5pt] leading-[1.25] text-gray-400 italic">React</li>
                        <li className="py-0 text-[8.5pt] leading-[1.25] text-gray-400 italic">Node.js</li>
                        <li className="py-0 text-[8.5pt] leading-[1.25] text-gray-400 italic">SQL</li>
                        <li className="py-0 text-[8.5pt] leading-[1.25] text-gray-400 italic">Problem Solving</li>
                        <li className="py-0 text-[8.5pt] leading-[1.25] text-gray-400 italic">System Design</li>
                      </>
                    )}
                  </ul>
                </section>
              )}

              {/* Tools */}
              {(resumeData.tools.length > 0 || true) && (
                <section className="mb-1.5">
                  {renderSectionHeader('Tools')}
                  <ul className="list-none p-0 m-0">
                    {resumeData.tools.length > 0 ? (
                      resumeData.tools.map(tool => (
                        <li key={tool.id} className="py-0 text-[8.5pt] leading-[1.25] text-gray-700">
                          {tool.name}
                        </li>
                      ))
                    ) : (
                      <>
                        <li className="py-0 text-[8.5pt] leading-[1.25] text-gray-400 italic">Git</li>
                        <li className="py-0 text-[8.5pt] leading-[1.25] text-gray-400 italic">Docker</li>
                        <li className="py-0 text-[8.5pt] leading-[1.25] text-gray-400 italic">AWS</li>
                        <li className="py-0 text-[8.5pt] leading-[1.25] text-gray-400 italic">PostgreSQL</li>
                        <li className="py-0 text-[8.5pt] leading-[1.25] text-gray-400 italic">MongoDB</li>
                        <li className="py-0 text-[8.5pt] leading-[1.25] text-gray-400 italic">Jest</li>
                        <li className="py-0 text-[8.5pt] leading-[1.25] text-gray-400 italic">Webpack</li>
                      </>
                    )}
                  </ul>
                </section>
              )}

              {/* Languages */}
              {(resumeData.languages.length > 0 || true) && (
                <section className="mb-1.5">
                  {renderSectionHeader('Languages')}
                  <ul className="list-none p-0 m-0">
                    {resumeData.languages.length > 0 ? (
                      resumeData.languages.map(lang => (
                        <li key={lang.id} className="py-0 flex justify-between items-center text-[8.5pt] leading-[1.25]">
                          <span className="font-medium text-gray-900">{lang.name}</span>
                          <span className="text-[7.5pt] text-gray-500">{lang.proficiency}</span>
                        </li>
                      ))
                    ) : (
                      <>
                        <li className="py-0 flex justify-between items-center text-[8.5pt] leading-[1.25]">
                          <span className="font-medium text-gray-400 italic">English</span>
                          <span className="text-[7.5pt] text-gray-400 italic">Native</span>
                        </li>
                        <li className="py-0 flex justify-between items-center text-[8.5pt] leading-[1.25]">
                          <span className="font-medium text-gray-400 italic">Spanish</span>
                          <span className="text-[7.5pt] text-gray-400 italic">Fluent</span>
                        </li>
                        <li className="py-0 flex justify-between items-center text-[8.5pt] leading-[1.25]">
                          <span className="font-medium text-gray-400 italic">French</span>
                          <span className="text-[7.5pt] text-gray-400 italic">Intermediate</span>
                        </li>
                      </>
                    )}
                  </ul>
                </section>
              )}

              {/* Certifications */}
              {(resumeData.certifications.length > 0 || true) && (
                <section className="mb-1.5">
                  {renderSectionHeader('Certifications')}
                  <div className="flex flex-col gap-1">
                    {resumeData.certifications.length > 0 ? (
                      resumeData.certifications.map(cert => (
                        <div key={cert.id} className="leading-[1.25]">
                          <div className="text-[8.5pt] font-semibold text-gray-900 mb-0">{cert.name}</div>
                          {cert.issuer && <div className="text-[8pt] text-gray-600">{cert.issuer}</div>}
                          {cert.date && <div className="text-[7.5pt] text-gray-500">{cert.date}</div>}
                        </div>
                      ))
                    ) : (
                      <>
                        <div className="leading-[1.25]">
                          <div className="text-[8.5pt] font-semibold text-gray-400 italic mb-0">AWS Certified Solutions Architect</div>
                          <div className="text-[8pt] text-gray-400 italic">Amazon Web Services</div>
                          <div className="text-[7.5pt] text-gray-400 italic">Jan 2023</div>
                        </div>
                        <div className="leading-[1.25]">
                          <div className="text-[8.5pt] font-semibold text-gray-400 italic mb-0">Google Cloud Professional</div>
                          <div className="text-[8pt] text-gray-400 italic">Google Cloud Platform</div>
                          <div className="text-[7.5pt] text-gray-400 italic">Mar 2022</div>
                        </div>
                      </>
                    )}
                  </div>
                </section>
              )}
            </aside>

            {/* Right Column - 70% */}
            <main className="w-[70%] flex-grow">
              {/* Professional Summary */}
              {(resumeData.summary || true) && (
                <section className="mb-1.5">
                  {renderSectionHeader('Summary')}
                  <p className="m-0 text-[8.5pt] leading-[1.3] text-justify">
                    {resumeData.summary ? (
                      <span className="text-gray-700">{resumeData.summary}</span>
                    ) : (
                      <span className="text-gray-400 italic">
                        Experienced software engineer with 5+ years of expertise in full-stack development, specializing in modern web technologies and cloud infrastructure. Proven track record of delivering scalable applications serving millions of users. Strong background in system architecture, performance optimization, and agile methodologies. Passionate about writing clean, maintainable code and mentoring junior developers to build high-performing engineering teams.
                      </span>
                    )}
                  </p>
                </section>
              )}

              {/* Experience */}
              {(resumeData.experience.length > 0 || true) && (
                <section className="mb-1.5">
                  {renderSectionHeader('Experience')}
                  <div className="flex flex-col gap-1">
                    {resumeData.experience.length > 0 ? (
                      resumeData.experience.map(exp => (
                      <div key={exp.id} className="break-inside-avoid">
                        <div className="flex justify-between mb-0.5">
                          <div className="flex-1">
                            <h3 className="text-[9.5pt] font-bold m-0 mb-0 text-black leading-[1.2]">
                              {exp.position || 'Position'}
                            </h3>
                            <div className="text-[9pt] font-semibold text-blue-600 mb-0 leading-[1.2]">
                              {exp.company || 'Company'}
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            {exp.location && <div className="text-[8pt] text-gray-500">{exp.location}</div>}
                            <div className="text-[8pt] text-gray-600 font-medium">
                              {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                            </div>
                          </div>
                        </div>
                        {exp.description && (
                          <ul className="list-none p-0 m-0 mt-0">
                            {exp.description.split('\n').filter(line => line.trim()).map((line, idx) => (
                              <li key={idx} className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-700">
                                <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                                {line.trim().replace(/^[•\-]\s*/, '')}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="break-inside-avoid">
                        <div className="flex justify-between mb-0.5">
                          <div className="flex-1">
                            <h3 className="text-[9.5pt] font-bold m-0 mb-0 text-gray-400 italic leading-[1.2]">
                              Senior Software Engineer
                            </h3>
                            <div className="text-[9pt] font-semibold text-gray-400 italic mb-0 leading-[1.2]">
                              Tech Company Inc.
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="text-[8pt] text-gray-400 italic">San Francisco, CA</div>
                            <div className="text-[8pt] text-gray-400 italic font-medium">
                              Jan 2021 - Present
                            </div>
                          </div>
                        </div>
                        <ul className="list-none p-0 m-0 mt-0">
                          <li className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-400 italic">
                            <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                            Led development of microservices architecture serving 2M+ daily active users, reducing latency by 40%
                          </li>
                          <li className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-400 italic">
                            <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                            Architected and implemented real-time data processing pipeline handling 50K requests/second
                          </li>
                          <li className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-400 italic">
                            <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                            Mentored team of 5 junior engineers, establishing code review practices and technical standards
                          </li>
                          <li className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-400 italic">
                            <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                            Optimized database queries and caching strategies, improving API response time by 60%
                          </li>
                          <li className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-400 italic">
                            <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                            Collaborated with product and design teams to deliver features increasing user engagement by 25%
                          </li>
                        </ul>
                      </div>
                      <div className="break-inside-avoid">
                        <div className="flex justify-between mb-0.5">
                          <div className="flex-1">
                            <h3 className="text-[9.5pt] font-bold m-0 mb-0 text-gray-400 italic leading-[1.2]">
                              Software Engineer
                            </h3>
                            <div className="text-[9pt] font-semibold text-gray-400 italic mb-0 leading-[1.2]">
                              Startup Solutions
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="text-[8pt] text-gray-400 italic">New York, NY</div>
                            <div className="text-[8pt] text-gray-400 italic font-medium">
                              Jun 2019 - Dec 2020
                            </div>
                          </div>
                        </div>
                        <ul className="list-none p-0 m-0 mt-0">
                          <li className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-400 italic">
                            <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                            Developed full-stack web applications using React, Node.js, and PostgreSQL
                          </li>
                          <li className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-400 italic">
                            <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                            Built RESTful APIs and GraphQL endpoints supporting mobile and web clients
                          </li>
                          <li className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-400 italic">
                            <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                            Implemented automated testing suite achieving 85% code coverage, reducing production bugs by 50%
                          </li>
                          <li className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-400 italic">
                            <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                            Deployed applications on AWS using Docker and Kubernetes, ensuring 99.9% uptime
                          </li>
                        </ul>
                      </div>
                    </>
                  )}
                  </div>
                </section>
              )}

              {/* Projects */}
              {(resumeData.projects.length > 0 || true) && (
                <section className="mb-1.5">
                  {renderSectionHeader('Projects')}
                  <div className="flex flex-col gap-1">
                    {resumeData.projects.length > 0 ? (
                      resumeData.projects.map(project => (
                      <div key={project.id} className="break-inside-avoid">
                        <div className="flex justify-between items-baseline mb-0.5">
                          <h3 className="text-[9.5pt] font-bold m-0 text-black leading-[1.2]">
                            {project.name || 'Project Name'}
                          </h3>
                          {project.technologies && (
                            <span className="text-[7.5pt] text-gray-500 italic">{project.technologies}</span>
                          )}
                        </div>
                        {project.description && (
                          <ul className="list-none p-0 m-0 mt-0">
                            {project.description.split('\n').filter(line => line.trim()).map((line, idx) => (
                              <li key={idx} className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-700">
                                <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                                {line.trim().replace(/^[•\-]\s*/, '')}
                              </li>
                            ))}
                          </ul>
                        )}
                        <div className="flex gap-2.5 mt-0 text-[7.5pt] text-blue-600">
                          {project.link && <span>{project.link}</span>}
                          {project.github && <span>{project.github}</span>}
                        </div>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="break-inside-avoid">
                        <div className="flex justify-between items-baseline mb-0.5">
                          <h3 className="text-[9.5pt] font-bold m-0 text-gray-400 italic leading-[1.2]">
                            E-Commerce Platform
                          </h3>
                          <span className="text-[7.5pt] text-gray-400 italic">React, Node.js, MongoDB</span>
                        </div>
                        <ul className="list-none p-0 m-0 mt-0">
                          <li className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-400 italic">
                            <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                            Built scalable e-commerce platform with payment integration and inventory management
                          </li>
                          <li className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-400 italic">
                            <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                            Implemented real-time order tracking and notification system using WebSockets
                          </li>
                          <li className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-400 italic">
                            <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                            Optimized database queries and caching, reducing page load time by 45%
                          </li>
                        </ul>
                        <div className="flex gap-2.5 mt-0 text-[7.5pt] text-gray-400 italic">
                          <span>github.com/username/ecommerce</span>
                        </div>
                      </div>
                      <div className="break-inside-avoid">
                        <div className="flex justify-between items-baseline mb-0.5">
                          <h3 className="text-[9.5pt] font-bold m-0 text-gray-400 italic leading-[1.2]">
                            Task Management App
                          </h3>
                          <span className="text-[7.5pt] text-gray-400 italic">Vue.js, Express, PostgreSQL</span>
                        </div>
                        <ul className="list-none p-0 m-0 mt-0">
                          <li className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-400 italic">
                            <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                            Developed collaborative task management application with real-time updates
                          </li>
                          <li className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-400 italic">
                            <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                            Designed RESTful API architecture supporting 10K+ concurrent users
                          </li>
                        </ul>
                        <div className="flex gap-2.5 mt-0 text-[7.5pt] text-gray-400 italic">
                          <span>github.com/username/taskapp</span>
                        </div>
                      </div>
                    </>
                  )}
                  </div>
                </section>
              )}

              {/* Education */}
              {(resumeData.education.length > 0 || true) && (
                <section className="mb-0">
                  {renderSectionHeader('Education')}
                  <div className="flex flex-col gap-1">
                    {resumeData.education.length > 0 ? (
                      resumeData.education.map(edu => (
                      <div key={edu.id} className="break-inside-avoid">
                        <div className="flex justify-between mb-0">
                          <div className="flex-1">
                            <h3 className="text-[9.5pt] font-bold m-0 mb-0 text-black leading-[1.2]">
                              {edu.degree || 'Degree'}
                            </h3>
                            <div className="text-[9pt] font-semibold text-blue-600 mb-0 leading-[1.2]">
                              {edu.school || 'School'}
                            </div>
                            {edu.field && <div className="text-[8.5pt] text-gray-600 italic">{edu.field}</div>}
                          </div>
                          <div className="text-right flex-shrink-0">
                            {edu.location && <div className="text-[8pt] text-gray-500">{edu.location}</div>}
                            <div className="text-[8pt] text-gray-600 font-medium">
                              {edu.startDate} - {edu.endDate}
                            </div>
                            {edu.gpa && <div className="text-[8pt] text-gray-600 mt-0">GPA: {edu.gpa}</div>}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="break-inside-avoid">
                      <div className="flex justify-between mb-0">
                        <div className="flex-1">
                          <h3 className="text-[9.5pt] font-bold m-0 mb-0 text-gray-400 italic leading-[1.2]">
                            Bachelor of Science in Computer Science
                          </h3>
                          <div className="text-[9pt] font-semibold text-gray-400 italic mb-0 leading-[1.2]">
                            State University
                          </div>
                          <div className="text-[8.5pt] text-gray-400 italic">Computer Science</div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-[8pt] text-gray-400 italic">City, State</div>
                          <div className="text-[8pt] text-gray-400 italic font-medium">
                            Aug 2016 - May 2020
                          </div>
                          <div className="text-[8pt] text-gray-400 italic mt-0">GPA: 3.8</div>
                        </div>
                      </div>
                    </div>
                  )}
                  </div>
                </section>
              )}
            </main>
          </div>
  )

  const renderSingleColumnLayout = () => (
    <div className="mt-1.5">
      {/* Professional Summary */}
      {(resumeData.summary || true) && (
        <section className="mb-1.5">
          {renderSectionHeader('Summary')}
          <p className="m-0 text-[8.5pt] leading-[1.3] text-justify">
            {resumeData.summary ? (
              <span className="text-gray-700">{resumeData.summary}</span>
            ) : (
              <span className="text-gray-400 italic">
                Experienced software engineer with 5+ years of expertise in full-stack development, specializing in modern web technologies and cloud infrastructure. Proven track record of delivering scalable applications serving millions of users. Strong background in system architecture, performance optimization, and agile methodologies. Passionate about writing clean, maintainable code and mentoring junior developers to build high-performing engineering teams.
              </span>
            )}
          </p>
        </section>
      )}

      {/* Experience */}
      {(resumeData.experience.length > 0 || true) && (
        <section className="mb-1.5">
          {renderSectionHeader('Experience')}
          <div className="flex flex-col gap-1">
            {resumeData.experience.length > 0 ? (
              resumeData.experience.map(exp => (
                <div key={exp.id} className="break-inside-avoid">
                  <div className="flex justify-between mb-0.5">
                    <div className="flex-1">
                      <h3 className="text-[9.5pt] font-bold m-0 mb-0 text-black leading-[1.2]">
                        {exp.position || 'Position'}
                      </h3>
                      <div className="text-[9pt] font-semibold text-blue-600 mb-0 leading-[1.2]">
                        {exp.company || 'Company'}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      {exp.location && <div className="text-[8pt] text-gray-500">{exp.location}</div>}
                      <div className="text-[8pt] text-gray-600 font-medium">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </div>
                    </div>
                  </div>
                  {exp.description && (
                    <ul className="list-none p-0 m-0 mt-0">
                      {exp.description.split('\n').filter(line => line.trim()).map((line, idx) => (
                        <li key={idx} className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-700">
                          <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                          {line.trim().replace(/^[•\-]\s*/, '')}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))
            ) : (
              <>
                <div className="break-inside-avoid">
                  <div className="flex justify-between mb-0.5">
                    <div className="flex-1">
                      <h3 className="text-[9.5pt] font-bold m-0 mb-0 text-gray-400 italic leading-[1.2]">
                        Senior Software Engineer
                      </h3>
                      <div className="text-[9pt] font-semibold text-gray-400 italic mb-0 leading-[1.2]">
                        Tech Company Inc.
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-[8pt] text-gray-400 italic">San Francisco, CA</div>
                      <div className="text-[8pt] text-gray-400 italic font-medium">
                        Jan 2021 - Present
                      </div>
                    </div>
                  </div>
                  <ul className="list-none p-0 m-0 mt-0">
                    <li className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-400 italic">
                      <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                      Led development of microservices architecture serving 2M+ daily active users, reducing latency by 40%
                    </li>
                    <li className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-400 italic">
                      <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                      Architected and implemented real-time data processing pipeline handling 50K requests/second
                    </li>
                    <li className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-400 italic">
                      <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                      Mentored team of 5 junior engineers, establishing code review practices and technical standards
                    </li>
                    <li className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-400 italic">
                      <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                      Optimized database queries and caching strategies, improving API response time by 60%
                    </li>
                    <li className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-400 italic">
                      <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                      Collaborated with product and design teams to deliver features increasing user engagement by 25%
                    </li>
                  </ul>
                </div>
                <div className="break-inside-avoid">
                  <div className="flex justify-between mb-0.5">
                    <div className="flex-1">
                      <h3 className="text-[9.5pt] font-bold m-0 mb-0 text-gray-400 italic leading-[1.2]">
                        Software Engineer
                      </h3>
                      <div className="text-[9pt] font-semibold text-gray-400 italic mb-0 leading-[1.2]">
                        Startup Solutions
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-[8pt] text-gray-400 italic">New York, NY</div>
                      <div className="text-[8pt] text-gray-400 italic font-medium">
                        Jun 2019 - Dec 2020
                      </div>
                    </div>
                  </div>
                  <ul className="list-none p-0 m-0 mt-0">
                    <li className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-400 italic">
                      <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                      Developed full-stack web applications using React, Node.js, and PostgreSQL
                    </li>
                    <li className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-400 italic">
                      <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                      Built RESTful APIs and GraphQL endpoints supporting mobile and web clients
                    </li>
                    <li className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-400 italic">
                      <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                      Implemented automated testing suite achieving 85% code coverage, reducing production bugs by 50%
                    </li>
                    <li className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-400 italic">
                      <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                      Deployed applications on AWS using Docker and Kubernetes, ensuring 99.9% uptime
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </section>
      )}

      {/* Projects */}
      {(resumeData.projects.length > 0 || true) && (
        <section className="mb-1.5">
          {renderSectionHeader('Projects')}
          <div className="flex flex-col gap-1">
            {resumeData.projects.length > 0 ? (
              resumeData.projects.map(project => (
                <div key={project.id} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="text-[9.5pt] font-bold m-0 text-black leading-[1.2]">
                      {project.name || 'Project Name'}
                    </h3>
                    {project.technologies && (
                      <span className="text-[7.5pt] text-gray-500 italic">{project.technologies}</span>
                    )}
                  </div>
                  {project.description && (
                    <ul className="list-none p-0 m-0 mt-0">
                      {project.description.split('\n').filter(line => line.trim()).map((line, idx) => (
                        <li key={idx} className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-700">
                          <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                          {line.trim().replace(/^[•\-]\s*/, '')}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="flex gap-2.5 mt-0 text-[7.5pt] text-blue-600">
                    {project.link && <span>{project.link}</span>}
                    {project.github && <span>{project.github}</span>}
                  </div>
                </div>
              ))
            ) : (
              <>
                <div className="break-inside-avoid">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="text-[9.5pt] font-bold m-0 text-gray-400 italic leading-[1.2]">
                      E-Commerce Platform
                    </h3>
                    <span className="text-[7.5pt] text-gray-400 italic">React, Node.js, MongoDB</span>
                  </div>
                  <ul className="list-none p-0 m-0 mt-0">
                    <li className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-400 italic">
                      <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                      Built scalable e-commerce platform with payment integration and inventory management
                    </li>
                    <li className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-400 italic">
                      <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                      Implemented real-time order tracking and notification system using WebSockets
                    </li>
                    <li className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-400 italic">
                      <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                      Optimized database queries and caching, reducing page load time by 45%
                    </li>
                  </ul>
                  <div className="flex gap-2.5 mt-0 text-[7.5pt] text-gray-400 italic">
                    <span>github.com/username/ecommerce</span>
                  </div>
                </div>
                <div className="break-inside-avoid">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="text-[9.5pt] font-bold m-0 text-gray-400 italic leading-[1.2]">
                      Task Management App
                    </h3>
                    <span className="text-[7.5pt] text-gray-400 italic">Vue.js, Express, PostgreSQL</span>
                  </div>
                  <ul className="list-none p-0 m-0 mt-0">
                    <li className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-400 italic">
                      <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                      Developed collaborative task management application with real-time updates
                    </li>
                    <li className="relative pl-3 mb-0 text-[8.5pt] leading-[1.28] text-gray-400 italic">
                      <span className="absolute left-1 text-gray-400 font-bold text-[7pt]">•</span>
                      Designed RESTful API architecture supporting 10K+ concurrent users
                    </li>
                  </ul>
                  <div className="flex gap-2.5 mt-0 text-[7.5pt] text-gray-400 italic">
                    <span>github.com/username/taskapp</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      )}

      {/* Education */}
      {(resumeData.education.length > 0 || true) && (
        <section className="mb-1.5">
          {renderSectionHeader('Education')}
          <div className="flex flex-col gap-1">
            {resumeData.education.length > 0 ? (
              resumeData.education.map(edu => (
                <div key={edu.id} className="break-inside-avoid">
                  <div className="flex justify-between mb-0">
                    <div className="flex-1">
                      <h3 className="text-[9.5pt] font-bold m-0 mb-0 text-black leading-[1.2]">
                        {edu.degree || 'Degree'}
                      </h3>
                      <div className="text-[9pt] font-semibold text-blue-600 mb-0 leading-[1.2]">
                        {edu.school || 'School'}
                      </div>
                      {edu.field && <div className="text-[8.5pt] text-gray-600 italic">{edu.field}</div>}
                    </div>
                    <div className="text-right flex-shrink-0">
                      {edu.location && <div className="text-[8pt] text-gray-500">{edu.location}</div>}
                      <div className="text-[8pt] text-gray-600 font-medium">
                        {edu.startDate} - {edu.endDate}
                      </div>
                      {edu.gpa && <div className="text-[8pt] text-gray-600 mt-0">GPA: {edu.gpa}</div>}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="break-inside-avoid">
                <div className="flex justify-between mb-0">
                  <div className="flex-1">
                    <h3 className="text-[9.5pt] font-bold m-0 mb-0 text-gray-400 italic leading-[1.2]">
                      Bachelor of Science in Computer Science
                    </h3>
                    <div className="text-[9pt] font-semibold text-gray-400 italic mb-0 leading-[1.2]">
                      State University
                    </div>
                    <div className="text-[8.5pt] text-gray-400 italic">Computer Science</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-[8pt] text-gray-400 italic">City, State</div>
                    <div className="text-[8pt] text-gray-400 italic font-medium">
                      Aug 2016 - May 2020
                    </div>
                    <div className="text-[8pt] text-gray-400 italic mt-0">GPA: 3.8</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Skills */}
      {(resumeData.skills.length > 0 || true) && (
        <section className="mb-1.5">
          {renderSectionHeader('Skills')}
          <div className="flex flex-wrap gap-1.5">
            {resumeData.skills.length > 0 ? (
              resumeData.skills.map(skill => (
                <span key={skill.id} className="text-[8.5pt] text-gray-700">
                  {skill.name}
                </span>
              ))
            ) : (
              <>
                <span className="text-[8.5pt] text-gray-400 italic">JavaScript</span>
                <span className="text-[8.5pt] text-gray-400 italic">Python</span>
                <span className="text-[8.5pt] text-gray-400 italic">TypeScript</span>
                <span className="text-[8.5pt] text-gray-400 italic">React</span>
                <span className="text-[8.5pt] text-gray-400 italic">Node.js</span>
                <span className="text-[8.5pt] text-gray-400 italic">SQL</span>
                <span className="text-[8.5pt] text-gray-400 italic">Problem Solving</span>
                <span className="text-[8.5pt] text-gray-400 italic">System Design</span>
              </>
            )}
          </div>
        </section>
      )}

      {/* Tools */}
      {(resumeData.tools.length > 0 || true) && (
        <section className="mb-1.5">
          {renderSectionHeader('Tools')}
          <div className="flex flex-wrap gap-1.5">
            {resumeData.tools.length > 0 ? (
              resumeData.tools.map(tool => (
                <span key={tool.id} className="text-[8.5pt] text-gray-700">
                  {tool.name}
                </span>
              ))
            ) : (
              <>
                <span className="text-[8.5pt] text-gray-400 italic">Git</span>
                <span className="text-[8.5pt] text-gray-400 italic">Docker</span>
                <span className="text-[8.5pt] text-gray-400 italic">AWS</span>
                <span className="text-[8.5pt] text-gray-400 italic">PostgreSQL</span>
                <span className="text-[8.5pt] text-gray-400 italic">MongoDB</span>
                <span className="text-[8.5pt] text-gray-400 italic">Jest</span>
                <span className="text-[8.5pt] text-gray-400 italic">Webpack</span>
              </>
            )}
          </div>
        </section>
      )}

      {/* Languages */}
      {(resumeData.languages.length > 0 || true) && (
        <section className="mb-1.5">
          {renderSectionHeader('Languages')}
          <div className="flex flex-wrap gap-2">
            {resumeData.languages.length > 0 ? (
              resumeData.languages.map(lang => (
                <span key={lang.id} className="text-[8.5pt] text-gray-700">
                  {lang.name} <span className="text-[7.5pt] text-gray-500">({lang.proficiency})</span>
                </span>
              ))
            ) : (
              <>
                <span className="text-[8.5pt] text-gray-400 italic">English <span className="text-[7.5pt] text-gray-400 italic">(Native)</span></span>
                <span className="text-[8.5pt] text-gray-400 italic">Spanish <span className="text-[7.5pt] text-gray-400 italic">(Fluent)</span></span>
                <span className="text-[8.5pt] text-gray-400 italic">French <span className="text-[7.5pt] text-gray-400 italic">(Intermediate)</span></span>
              </>
            )}
          </div>
        </section>
      )}

      {/* Certifications */}
      {(resumeData.certifications.length > 0 || true) && (
        <section className="mb-0">
          {renderSectionHeader('Certifications')}
          <div className="flex flex-col gap-1">
            {resumeData.certifications.length > 0 ? (
              resumeData.certifications.map(cert => (
                <div key={cert.id} className="leading-[1.25]">
                  <div className="text-[8.5pt] font-semibold text-gray-900 mb-0">{cert.name}</div>
                  {cert.issuer && <div className="text-[8pt] text-gray-600">{cert.issuer}</div>}
                  {cert.date && <div className="text-[7.5pt] text-gray-500">{cert.date}</div>}
                </div>
              ))
            ) : (
              <>
                <div className="leading-[1.25]">
                  <div className="text-[8.5pt] font-semibold text-gray-400 italic mb-0">AWS Certified Solutions Architect</div>
                  <div className="text-[8pt] text-gray-400 italic">Amazon Web Services</div>
                  <div className="text-[7.5pt] text-gray-400 italic">Jan 2023</div>
                </div>
                <div className="leading-[1.25]">
                  <div className="text-[8.5pt] font-semibold text-gray-400 italic mb-0">Google Cloud Professional</div>
                  <div className="text-[8pt] text-gray-400 italic">Google Cloud Platform</div>
                  <div className="text-[7.5pt] text-gray-400 italic">Mar 2022</div>
                </div>
              </>
            )}
          </div>
        </section>
      )}
    </div>
  )

  return (
    <div className="h-full min-h-[calc(100vh-57px)] overflow-hidden flex flex-col justify-start items-center pt-10" data-resume-preview>
      {/* Scaled preview wrapper - maintains true US Letter aspect ratio (8.5:11) */}
      <div 
        className="scale-[0.4] sm:scale-[0.5] md:scale-[0.6] lg:scale-[0.7] xl:scale-[0.75] origin-top"
      >
        {/* Actual resume content - true physical dimensions (215.9mm x 279.4mm = US Letter) */}
        <div 
          ref={resumeRef} 
          className={getTemplateClasses()}
          style={{ 
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif"
          }}
        >
          {renderHeader()}
          {selectedTemplate === 'classic' ? renderSingleColumnLayout() : renderTwoColumnLayout()}
        </div>
      </div>
    </div>
  )
}

export default ResumePreview
