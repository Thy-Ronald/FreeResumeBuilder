/**
 * Personal Information Section Component
 * Handles personal info and professional summary inputs
 */
export default function PersonalInfoSection({
  personalInfo,
  summary,
  selectedTemplate,
  errors,
  updatePersonalInfo,
  updateSummary,
  setErrors,
}) {
  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="John Doe"
              value={personalInfo.fullName}
              onChange={(e) => {
                updatePersonalInfo('fullName', e.target.value)
                if (errors.fullName) {
                  setErrors(prev => ({ ...prev, fullName: null }))
                }
              }}
              className={`w-full px-3 py-2.5 border rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 ${
                errors.fullName
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
              }`}
            />
            {errors.fullName && (
              <p className="text-xs text-red-500">{errors.fullName}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Professional Title <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              type="text"
              placeholder="Software Engineer, Marketing Manager, etc."
              value={personalInfo.title}
              onChange={(e) => updatePersonalInfo('title', e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          {selectedTemplate === 'with-image' && (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Profile Photo <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0]
                    if (file) {
                      const reader = new FileReader()
                      reader.onloadend = () => {
                        updatePersonalInfo('profilePhoto', reader.result)
                      }
                      reader.readAsDataURL(file)
                    }
                  }}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {personalInfo.profilePhoto && (
                  <img 
                    src={personalInfo.profilePhoto} 
                    alt="Profile preview" 
                    className="w-16 h-16 object-cover rounded-lg border-2 border-gray-200"
                  />
                )}
              </div>
            </div>
          )}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="john@example.com"
              value={personalInfo.email}
              onChange={(e) => {
                updatePersonalInfo('email', e.target.value)
                if (errors.email) {
                  setErrors(prev => ({ ...prev, email: null }))
                }
              }}
              className={`w-full px-3 py-2.5 border rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 ${
                errors.email
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
              }`}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              placeholder="+63 912 345 6789"
              value={personalInfo.phone}
              onChange={(e) => {
                updatePersonalInfo('phone', e.target.value)
                if (errors.phone) {
                  setErrors(prev => ({ ...prev, phone: null }))
                }
              }}
              className={`w-full px-3 py-2.5 border rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 ${
                errors.phone
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
              }`}
            />
            {errors.phone && (
              <p className="text-xs text-red-500">{errors.phone}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="City, Country"
              value={personalInfo.location}
              onChange={(e) => {
                updatePersonalInfo('location', e.target.value)
                if (errors.location) {
                  setErrors(prev => ({ ...prev, location: null }))
                }
              }}
              className={`w-full px-3 py-2.5 border rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 ${
                errors.location
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
              }`}
            />
            {errors.location && (
              <p className="text-xs text-red-500">{errors.location}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              LinkedIn <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              type="text"
              placeholder="linkedin.com/in/username"
              value={personalInfo.linkedin}
              onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              GitHub <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              type="text"
              placeholder="github.com/username"
              value={personalInfo.github}
              onChange={(e) => updatePersonalInfo('github', e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Professional Summary</h2>
        <div className="flex flex-col gap-2">
          <textarea
            placeholder="Write a brief summary of your professional background and key achievements..."
            value={summary}
            onChange={(e) => updateSummary(e.target.value)}
            rows="6"
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y min-h-[100px] leading-relaxed"
          />
        </div>
      </div>
    </>
  )
}
