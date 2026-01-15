/**
 * Experience Section Component
 * Handles work experience entries input
 */
export default function ExperienceSection({
  experience,
  errors,
  addExperience,
  updateExperience,
  removeExperience,
  setErrors,
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Experience</h2>
        <button onClick={addExperience} className="px-3 sm:px-4 py-2 bg-gray-900 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-800 active:bg-gray-700 transition-colors w-full sm:w-auto">
          Add Experience
        </button>
      </div>
      {errors.experience_general && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{errors.experience_general}</p>
        </div>
      )}
      {experience.length === 0 && (
        <div className="py-12 text-center text-gray-400 text-sm">
          <p>No experience entries yet. Click "Add Experience" to get started.</p>
        </div>
      )}
      {experience.map((exp) => (
        <div key={exp.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-5 md:p-6 mb-3 sm:mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-4 sm:mb-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Company <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Company Name"
                value={exp.company}
                onChange={(e) => {
                  updateExperience(exp.id, 'company', e.target.value)
                  if (errors[`experience_${exp.id}_company`]) {
                    setErrors(prev => ({ ...prev, [`experience_${exp.id}_company`]: null }))
                  }
                }}
                className={`w-full px-3 py-2.5 border rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 ${
                  errors[`experience_${exp.id}_company`]
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                }`}
              />
              {errors[`experience_${exp.id}_company`] && (
                <p className="text-xs text-red-500">{errors[`experience_${exp.id}_company`]}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Position <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Job Title"
                value={exp.position}
                onChange={(e) => {
                  updateExperience(exp.id, 'position', e.target.value)
                  if (errors[`experience_${exp.id}_position`]) {
                    setErrors(prev => ({ ...prev, [`experience_${exp.id}_position`]: null }))
                  }
                }}
                className={`w-full px-3 py-2.5 border rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 ${
                  errors[`experience_${exp.id}_position`]
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                }`}
              />
              {errors[`experience_${exp.id}_position`] && (
                <p className="text-xs text-red-500">{errors[`experience_${exp.id}_position`]}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Location <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                type="text"
                placeholder="City, State"
                value={exp.location || ''}
                onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Jan 2020"
                value={exp.startDate}
                onChange={(e) => {
                  updateExperience(exp.id, 'startDate', e.target.value)
                  if (errors[`experience_${exp.id}_startDate`]) {
                    setErrors(prev => ({ ...prev, [`experience_${exp.id}_startDate`]: null }))
                  }
                }}
                className={`w-full px-3 py-2.5 border rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 ${
                  errors[`experience_${exp.id}_startDate`]
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                }`}
              />
              {errors[`experience_${exp.id}_startDate`] && (
                <p className="text-xs text-red-500">{errors[`experience_${exp.id}_startDate`]}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                End Date {!exp.current && <span className="text-red-500">*</span>}
              </label>
              <input
                type="text"
                placeholder="Dec 2022"
                value={exp.endDate}
                onChange={(e) => {
                  updateExperience(exp.id, 'endDate', e.target.value)
                  if (errors[`experience_${exp.id}_endDate`]) {
                    setErrors(prev => ({ ...prev, [`experience_${exp.id}_endDate`]: null }))
                  }
                }}
                disabled={exp.current}
                className={`w-full px-3 py-2.5 border rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed ${
                  errors[`experience_${exp.id}_endDate`]
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                }`}
              />
              {errors[`experience_${exp.id}_endDate`] && (
                <p className="text-xs text-red-500">{errors[`experience_${exp.id}_endDate`]}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 mb-5">
            <input
              type="checkbox"
              checked={exp.current}
              onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
            />
            <label className="text-sm text-gray-700 cursor-pointer">Currently working here</label>
          </div>
          <div className="flex flex-col gap-2 mb-5">
            <label className="text-sm font-medium text-gray-700">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Describe your responsibilities and achievements..."
              value={exp.description}
              onChange={(e) => {
                updateExperience(exp.id, 'description', e.target.value)
                if (errors[`experience_${exp.id}_description`]) {
                  setErrors(prev => ({ ...prev, [`experience_${exp.id}_description`]: null }))
                }
              }}
              rows="4"
              className={`w-full px-3 py-2.5 border rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 resize-y min-h-[100px] leading-relaxed ${
                errors[`experience_${exp.id}_description`]
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
              }`}
            />
            {errors[`experience_${exp.id}_description`] && (
              <p className="text-xs text-red-500">{errors[`experience_${exp.id}_description`]}</p>
            )}
          </div>
          <button onClick={() => removeExperience(exp.id)} className="px-4 py-2 bg-white text-gray-600 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 hover:text-gray-900 hover:border-gray-400 transition-colors">
            Remove
          </button>
        </div>
      ))}
    </div>
  )
}
