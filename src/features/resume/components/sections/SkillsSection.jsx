/**
 * Skills Section Component
 * Handles skills, tools, languages, and certifications inputs
 */
export default function SkillsSection({
  skills,
  tools,
  languages,
  certifications,
  selectedTemplate,
  errors,
  addSkill,
  updateSkill,
  removeSkill,
  addTool,
  updateTool,
  removeTool,
  addLanguage,
  updateLanguage,
  removeLanguage,
  addCertification,
  updateCertification,
  removeCertification,
  setErrors,
}) {
  return (
    <>
      {/* Skills */}
      <div className="bg-white border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-2">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Skills</h2>
          <button onClick={addSkill} className="px-3 sm:px-4 py-2 bg-gray-900 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-800 active:bg-gray-700 transition-colors w-full sm:w-auto">
            Add Skill
          </button>
        </div>
        <p className="text-sm text-gray-500 italic mb-4">Add your core technical and professional skills</p>
        {errors.skills_general && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{errors.skills_general}</p>
          </div>
        )}
        {skills.length === 0 && (
          <div className="py-12 text-center text-gray-400 text-sm">
            <p>No skills yet. Click "Add Skill" to get started.</p>
          </div>
        )}
        {skills.map((skill) => (
          <div key={skill.id} className="bg-gray-50 border border-gray-200 rounded-lg p-3 sm:p-4 mb-2 sm:mb-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
            <div className="flex-1">
              <input
                type="text"
                placeholder="JavaScript, Python, Project Management, etc."
                value={skill.name}
                onChange={(e) => {
                  updateSkill(skill.id, 'name', e.target.value)
                  if (errors[`skill_${skill.id}`]) {
                    setErrors(prev => ({ ...prev, [`skill_${skill.id}`]: null }))
                  }
                }}
                className={`w-full px-3 py-2 border rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 ${
                  errors[`skill_${skill.id}`]
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                }`}
              />
              {errors[`skill_${skill.id}`] && (
                <p className="text-xs text-red-500 mt-1">{errors[`skill_${skill.id}`]}</p>
              )}
            </div>
            <button onClick={() => removeSkill(skill.id)} className="px-3 sm:px-4 py-2 bg-white text-gray-600 border border-gray-300 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-50 hover:text-gray-900 hover:border-gray-400 active:bg-gray-100 transition-colors whitespace-nowrap w-full sm:w-auto">
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Tools - Hidden for corporate and with-image templates */}
      {selectedTemplate !== 'corporate' && selectedTemplate !== 'with-image' && (
        <div className="bg-white border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-2">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Tools & Technologies</h2>
            <button onClick={addTool} className="px-3 sm:px-4 py-2 bg-gray-900 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-800 active:bg-gray-700 transition-colors w-full sm:w-auto">
              Add Tool
            </button>
          </div>
          <p className="text-sm text-gray-500 italic mb-4">Add software, frameworks, or tools you're proficient with</p>
          {tools.length === 0 && (
            <div className="py-12 text-center text-gray-400 text-sm">
              <p>No tools yet. Click "Add Tool" to get started.</p>
            </div>
          )}
          {tools.map((tool) => (
            <div key={tool.id} className="bg-gray-50 border border-gray-200 rounded-lg p-3 sm:p-4 mb-2 sm:mb-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="React, Docker, Figma, Git, etc."
                  value={tool.name}
                  onChange={(e) => {
                    updateTool(tool.id, e.target.value)
                    if (errors[`tool_${tool.id}`]) {
                      setErrors(prev => ({ ...prev, [`tool_${tool.id}`]: null }))
                    }
                  }}
                  className={`w-full px-3 py-2 border rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 ${
                    errors[`tool_${tool.id}`]
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                  }`}
                />
                {errors[`tool_${tool.id}`] && (
                  <p className="text-xs text-red-500 mt-1">{errors[`tool_${tool.id}`]}</p>
                )}
              </div>
              <button onClick={() => removeTool(tool.id)} className="px-3 sm:px-4 py-2 bg-white text-gray-600 border border-gray-300 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-50 hover:text-gray-900 hover:border-gray-400 active:bg-gray-100 transition-colors whitespace-nowrap w-full sm:w-auto">
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Languages - Hidden for corporate template */}
      {selectedTemplate !== 'corporate' && (
        <div className="bg-white border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-2">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Languages</h2>
            <button onClick={addLanguage} className="px-3 sm:px-4 py-2 bg-gray-900 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-800 active:bg-gray-700 transition-colors w-full sm:w-auto">
              Add Language
            </button>
          </div>
          <p className="text-sm text-gray-500 italic mb-4">List languages you speak and your proficiency level</p>
          {languages.length === 0 && (
            <div className="py-12 text-center text-gray-400 text-sm">
              <p>No languages yet. Click "Add Language" to get started.</p>
            </div>
          )}
          {languages.map((lang) => (
            <div key={lang.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-5 md:p-6 mb-3 sm:mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-4 sm:mb-5">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">Language</label>
                  <input
                    type="text"
                    placeholder="English, Spanish, etc."
                    value={lang.name}
                    onChange={(e) => {
                      updateLanguage(lang.id, 'name', e.target.value)
                      if (errors[`language_${lang.id}_name`]) {
                        setErrors(prev => ({ ...prev, [`language_${lang.id}_name`]: null }))
                      }
                    }}
                    className={`w-full px-3 py-2.5 border rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 ${
                      errors[`language_${lang.id}_name`]
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                    }`}
                  />
                  {errors[`language_${lang.id}_name`] && (
                    <p className="text-xs text-red-500">{errors[`language_${lang.id}_name`]}</p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">Proficiency</label>
                  <select
                    value={lang.proficiency}
                    onChange={(e) => updateLanguage(lang.id, 'proficiency', e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                  >
                    <option value="Native">Native</option>
                    <option value="Fluent">Fluent</option>
                    <option value="Professional">Professional</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Basic">Basic</option>
                  </select>
                </div>
              </div>
              <button onClick={() => removeLanguage(lang.id)} className="px-4 py-2 bg-white text-gray-600 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 hover:text-gray-900 hover:border-gray-400 transition-colors">
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Certifications - Hidden for corporate template */}
      {selectedTemplate !== 'corporate' && (
        <div className="bg-white border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-2">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Certifications</h2>
            <button onClick={addCertification} className="px-3 sm:px-4 py-2 bg-gray-900 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-800 active:bg-gray-700 transition-colors w-full sm:w-auto">
              Add Certification
            </button>
          </div>
          <p className="text-sm text-gray-500 italic mb-4">Add professional certifications and credentials</p>
          {certifications.length === 0 && (
            <div className="py-12 text-center text-gray-400 text-sm">
              <p>No certifications yet. Click "Add Certification" to get started.</p>
            </div>
          )}
          {certifications.map((cert) => (
            <div key={cert.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-5 md:p-6 mb-3 sm:mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-4 sm:mb-5">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">Certification Name</label>
                  <input
                    type="text"
                    placeholder="AWS Certified Solutions Architect"
                    value={cert.name}
                    onChange={(e) => {
                      updateCertification(cert.id, 'name', e.target.value)
                      if (errors[`certification_${cert.id}_name`]) {
                        setErrors(prev => ({ ...prev, [`certification_${cert.id}_name`]: null }))
                      }
                    }}
                    className={`w-full px-3 py-2.5 border rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 ${
                      errors[`certification_${cert.id}_name`]
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                    }`}
                  />
                  {errors[`certification_${cert.id}_name`] && (
                    <p className="text-xs text-red-500">{errors[`certification_${cert.id}_name`]}</p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">Issuing Organization</label>
                  <input
                    type="text"
                    placeholder="Amazon Web Services"
                    value={cert.issuer}
                    onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">Date Obtained</label>
                  <input
                    type="text"
                    placeholder="Jan 2023"
                    value={cert.date}
                    onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <button onClick={() => removeCertification(cert.id)} className="px-4 py-2 bg-white text-gray-600 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 hover:text-gray-900 hover:border-gray-400 transition-colors">
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
