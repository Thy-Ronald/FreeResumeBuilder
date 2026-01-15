/**
 * Education Section Component
 * Handles education entries input
 */
export default function EducationSection({
  education,
  errors,
  addEducation,
  updateEducation,
  removeEducation,
  setErrors,
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Education</h2>
        <button onClick={addEducation} className="px-3 sm:px-4 py-2 bg-gray-900 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-800 active:bg-gray-700 transition-colors w-full sm:w-auto">
          Add Education
        </button>
      </div>
      {errors.education_general && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{errors.education_general}</p>
        </div>
      )}
      {education.length === 0 && (
        <div className="py-12 text-center text-gray-400 text-sm">
          <p>No education entries yet. Click "Add Education" to get started.</p>
        </div>
      )}
      {education.map((edu) => (
        <div key={edu.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-5 md:p-6 mb-3 sm:mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-4 sm:mb-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                School/University <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="University Name"
                value={edu.school}
                onChange={(e) => {
                  updateEducation(edu.id, 'school', e.target.value)
                  if (errors[`education_${edu.id}_school`]) {
                    setErrors(prev => ({ ...prev, [`education_${edu.id}_school`]: null }))
                  }
                }}
                className={`w-full px-3 py-2.5 border rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 ${
                  errors[`education_${edu.id}_school`]
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                }`}
              />
              {errors[`education_${edu.id}_school`] && (
                <p className="text-xs text-red-500">{errors[`education_${edu.id}_school`]}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Degree <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Bachelor's, Master's, etc."
                value={edu.degree}
                onChange={(e) => {
                  updateEducation(edu.id, 'degree', e.target.value)
                  if (errors[`education_${edu.id}_degree`]) {
                    setErrors(prev => ({ ...prev, [`education_${edu.id}_degree`]: null }))
                  }
                }}
                className={`w-full px-3 py-2.5 border rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 ${
                  errors[`education_${edu.id}_degree`]
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                }`}
              />
              {errors[`education_${edu.id}_degree`] && (
                <p className="text-xs text-red-500">{errors[`education_${edu.id}_degree`]}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Field of Study <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Computer Science, Business, etc."
                value={edu.field}
                onChange={(e) => {
                  updateEducation(edu.id, 'field', e.target.value)
                  if (errors[`education_${edu.id}_field`]) {
                    setErrors(prev => ({ ...prev, [`education_${edu.id}_field`]: null }))
                  }
                }}
                className={`w-full px-3 py-2.5 border rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 ${
                  errors[`education_${edu.id}_field`]
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                }`}
              />
              {errors[`education_${edu.id}_field`] && (
                <p className="text-xs text-red-500">{errors[`education_${edu.id}_field`]}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Location <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                type="text"
                placeholder="City, State"
                value={edu.location || ''}
                onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
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
                value={edu.startDate}
                onChange={(e) => {
                  updateEducation(edu.id, 'startDate', e.target.value)
                  if (errors[`education_${edu.id}_startDate`]) {
                    setErrors(prev => ({ ...prev, [`education_${edu.id}_startDate`]: null }))
                  }
                }}
                className={`w-full px-3 py-2.5 border rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 ${
                  errors[`education_${edu.id}_startDate`]
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                }`}
              />
              {errors[`education_${edu.id}_startDate`] && (
                <p className="text-xs text-red-500">{errors[`education_${edu.id}_startDate`]}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                End Date <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Dec 2023"
                value={edu.endDate}
                onChange={(e) => {
                  updateEducation(edu.id, 'endDate', e.target.value)
                  if (errors[`education_${edu.id}_endDate`]) {
                    setErrors(prev => ({ ...prev, [`education_${edu.id}_endDate`]: null }))
                  }
                }}
                className={`w-full px-3 py-2.5 border rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 ${
                  errors[`education_${edu.id}_endDate`]
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                }`}
              />
              {errors[`education_${edu.id}_endDate`] && (
                <p className="text-xs text-red-500">{errors[`education_${edu.id}_endDate`]}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                GPA/Honors <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                type="text"
                placeholder="3.8 or High Honors"
                value={edu.gpa}
                onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <button onClick={() => removeEducation(edu.id)} className="px-4 py-2 bg-white text-gray-600 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 hover:text-gray-900 hover:border-gray-400 transition-colors">
            Remove
          </button>
        </div>
      ))}
    </div>
  )
}
