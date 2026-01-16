/**
 * Education Section Component
 * Handles education entries input
 */

// List of predefined degree options
const DEGREE_OPTIONS = [
  'Associate of Arts (AA)',
  'Associate of Science (AS)',
  'Associate of Applied Science (AAS)',
  'Bachelor of Arts (BA)',
  'Bachelor of Science (BS)',
  'Bachelor of Engineering (BEng)',
  'Bachelor of Business Administration (BBA)',
  'Bachelor of Fine Arts (BFA)',
  'Bachelor of Architecture (BArch)',
  'Bachelor of Computer Science (BCS)',
  'Bachelor of Nursing (BN)',
  'Bachelor of Education (BEd)',
  'Bachelor of Laws (LLB)',
  'Master of Arts (MA)',
  'Master of Science (MS)',
  'Master of Business Administration (MBA)',
  'Master of Engineering (MEng)',
  'Master of Fine Arts (MFA)',
  'Master of Education (MEd)',
  'Master of Public Administration (MPA)',
  'Master of Public Health (MPH)',
  'Master of Laws (LLM)',
  'Master of Computer Science (MCS)',
  'Doctor of Philosophy (PhD)',
  'Doctor of Medicine (MD)',
  'Doctor of Education (EdD)',
  'Doctor of Business Administration (DBA)',
  'Doctor of Jurisprudence (JD)',
  'Doctor of Engineering (DEng)',
  'Professional Certificate',
  'Diploma',
  'Certificate',
]

// List of predefined field of study options
const FIELD_OF_STUDY_OPTIONS = [
  'Computer Science',
  'Software Engineering',
  'Information Technology',
  'Computer Engineering',
  'Data Science',
  'Cybersecurity',
  'Information Systems',
  'Business Administration',
  'Business Management',
  'Finance',
  'Accounting',
  'Marketing',
  'Economics',
  'International Business',
  'Human Resources',
  'Management',
  'Entrepreneurship',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Chemical Engineering',
  'Biomedical Engineering',
  'Aerospace Engineering',
  'Industrial Engineering',
  'Environmental Engineering',
  'Medicine',
  'Nursing',
  'Pharmacy',
  'Public Health',
  'Biology',
  'Chemistry',
  'Physics',
  'Mathematics',
  'Statistics',
  'Psychology',
  'Sociology',
  'Political Science',
  'International Relations',
  'Law',
  'Criminal Justice',
  'Education',
  'English',
  'History',
  'Philosophy',
  'Communications',
  'Journalism',
  'Media Studies',
  'Graphic Design',
  'Fine Arts',
  'Architecture',
  'Urban Planning',
  'Environmental Science',
  'Agriculture',
  'Veterinary Science',
  'Dentistry',
  'Physical Therapy',
  'Occupational Therapy',
  'Social Work',
  'Anthropology',
  'Linguistics',
  'Theology',
  'Music',
  'Theater',
  'Film Studies',
]

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
              {(() => {
                const isCustomDegree = edu.degree && !DEGREE_OPTIONS.includes(edu.degree)
                const selectValue = isCustomDegree ? 'Other' : (edu.degree || '')
                
                return (
                  <>
                    <select
                      value={selectValue}
                      onChange={(e) => {
                        if (e.target.value === 'Other') {
                          // When "Other" is selected, clear the degree so user can type
                          updateEducation(edu.id, 'degree', '')
                        } else {
                          updateEducation(edu.id, 'degree', e.target.value)
                        }
                        if (errors[`education_${edu.id}_degree`]) {
                          setErrors(prev => ({ ...prev, [`education_${edu.id}_degree`]: null }))
                        }
                      }}
                      className={`w-full px-3 py-2.5 border rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 appearance-none cursor-pointer ${
                        errors[`education_${edu.id}_degree`]
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                      }`}
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: 'right 0.5rem center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '1.5em 1.5em',
                        paddingRight: '2.5rem'
                      }}
                    >
                      <option value="">Select a degree</option>
                      <optgroup label="Associate Degrees">
                        <option value="Associate of Arts (AA)">Associate of Arts (AA)</option>
                        <option value="Associate of Science (AS)">Associate of Science (AS)</option>
                        <option value="Associate of Applied Science (AAS)">Associate of Applied Science (AAS)</option>
                      </optgroup>
                      <optgroup label="Bachelor's Degrees">
                        <option value="Bachelor of Arts (BA)">Bachelor of Arts (BA)</option>
                        <option value="Bachelor of Science (BS)">Bachelor of Science (BS)</option>
                        <option value="Bachelor of Engineering (BEng)">Bachelor of Engineering (BEng)</option>
                        <option value="Bachelor of Business Administration (BBA)">Bachelor of Business Administration (BBA)</option>
                        <option value="Bachelor of Fine Arts (BFA)">Bachelor of Fine Arts (BFA)</option>
                        <option value="Bachelor of Architecture (BArch)">Bachelor of Architecture (BArch)</option>
                        <option value="Bachelor of Computer Science (BCS)">Bachelor of Computer Science (BCS)</option>
                        <option value="Bachelor of Nursing (BN)">Bachelor of Nursing (BN)</option>
                        <option value="Bachelor of Education (BEd)">Bachelor of Education (BEd)</option>
                        <option value="Bachelor of Laws (LLB)">Bachelor of Laws (LLB)</option>
                      </optgroup>
                      <optgroup label="Master's Degrees">
                        <option value="Master of Arts (MA)">Master of Arts (MA)</option>
                        <option value="Master of Science (MS)">Master of Science (MS)</option>
                        <option value="Master of Business Administration (MBA)">Master of Business Administration (MBA)</option>
                        <option value="Master of Engineering (MEng)">Master of Engineering (MEng)</option>
                        <option value="Master of Fine Arts (MFA)">Master of Fine Arts (MFA)</option>
                        <option value="Master of Education (MEd)">Master of Education (MEd)</option>
                        <option value="Master of Public Administration (MPA)">Master of Public Administration (MPA)</option>
                        <option value="Master of Public Health (MPH)">Master of Public Health (MPH)</option>
                        <option value="Master of Laws (LLM)">Master of Laws (LLM)</option>
                        <option value="Master of Computer Science (MCS)">Master of Computer Science (MCS)</option>
                      </optgroup>
                      <optgroup label="Doctoral Degrees">
                        <option value="Doctor of Philosophy (PhD)">Doctor of Philosophy (PhD)</option>
                        <option value="Doctor of Medicine (MD)">Doctor of Medicine (MD)</option>
                        <option value="Doctor of Education (EdD)">Doctor of Education (EdD)</option>
                        <option value="Doctor of Business Administration (DBA)">Doctor of Business Administration (DBA)</option>
                        <option value="Doctor of Jurisprudence (JD)">Doctor of Jurisprudence (JD)</option>
                        <option value="Doctor of Engineering (DEng)">Doctor of Engineering (DEng)</option>
                      </optgroup>
                      <optgroup label="Professional Certifications">
                        <option value="Professional Certificate">Professional Certificate</option>
                        <option value="Diploma">Diploma</option>
                        <option value="Certificate">Certificate</option>
                      </optgroup>
                      <option value="Other">Other (Specify)</option>
                    </select>
                    {(selectValue === 'Other' || isCustomDegree) && (
                      <input
                        type="text"
                        placeholder="Enter your degree"
                        value={isCustomDegree ? edu.degree : ''}
                        onChange={(e) => {
                          updateEducation(edu.id, 'degree', e.target.value)
                          if (errors[`education_${edu.id}_degree`]) {
                            setErrors(prev => ({ ...prev, [`education_${edu.id}_degree`]: null }))
                          }
                        }}
                        className={`w-full px-3 py-2.5 border rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 mt-2 ${
                          errors[`education_${edu.id}_degree`]
                            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                            : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                        }`}
                      />
                    )}
                  </>
                )
              })()}
              {errors[`education_${edu.id}_degree`] && (
                <p className="text-xs text-red-500">{errors[`education_${edu.id}_degree`]}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Field of Study <span className="text-red-500">*</span>
              </label>
              {(() => {
                const isCustomField = edu.field && !FIELD_OF_STUDY_OPTIONS.includes(edu.field)
                const selectValue = isCustomField ? 'Other' : (edu.field || '')
                
                return (
                  <>
                    <select
                      value={selectValue}
                      onChange={(e) => {
                        if (e.target.value === 'Other') {
                          // When "Other" is selected, clear the field so user can type
                          updateEducation(edu.id, 'field', '')
                        } else {
                          updateEducation(edu.id, 'field', e.target.value)
                        }
                        if (errors[`education_${edu.id}_field`]) {
                          setErrors(prev => ({ ...prev, [`education_${edu.id}_field`]: null }))
                        }
                      }}
                      className={`w-full px-3 py-2.5 border rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 appearance-none cursor-pointer ${
                        errors[`education_${edu.id}_field`]
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                      }`}
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: 'right 0.5rem center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '1.5em 1.5em',
                        paddingRight: '2.5rem'
                      }}
                    >
                      <option value="">Select a field of study</option>
                      <optgroup label="Computer & Technology">
                        <option value="Computer Science">Computer Science</option>
                        <option value="Software Engineering">Software Engineering</option>
                        <option value="Information Technology">Information Technology</option>
                        <option value="Computer Engineering">Computer Engineering</option>
                        <option value="Data Science">Data Science</option>
                        <option value="Cybersecurity">Cybersecurity</option>
                        <option value="Information Systems">Information Systems</option>
                      </optgroup>
                      <optgroup label="Business & Management">
                        <option value="Business Administration">Business Administration</option>
                        <option value="Business Management">Business Management</option>
                        <option value="Finance">Finance</option>
                        <option value="Accounting">Accounting</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Economics">Economics</option>
                        <option value="International Business">International Business</option>
                        <option value="Human Resources">Human Resources</option>
                        <option value="Management">Management</option>
                        <option value="Entrepreneurship">Entrepreneurship</option>
                      </optgroup>
                      <optgroup label="Engineering">
                        <option value="Electrical Engineering">Electrical Engineering</option>
                        <option value="Mechanical Engineering">Mechanical Engineering</option>
                        <option value="Civil Engineering">Civil Engineering</option>
                        <option value="Chemical Engineering">Chemical Engineering</option>
                        <option value="Biomedical Engineering">Biomedical Engineering</option>
                        <option value="Aerospace Engineering">Aerospace Engineering</option>
                        <option value="Industrial Engineering">Industrial Engineering</option>
                        <option value="Environmental Engineering">Environmental Engineering</option>
                      </optgroup>
                      <optgroup label="Health & Medicine">
                        <option value="Medicine">Medicine</option>
                        <option value="Nursing">Nursing</option>
                        <option value="Pharmacy">Pharmacy</option>
                        <option value="Public Health">Public Health</option>
                        <option value="Dentistry">Dentistry</option>
                        <option value="Physical Therapy">Physical Therapy</option>
                        <option value="Occupational Therapy">Occupational Therapy</option>
                        <option value="Veterinary Science">Veterinary Science</option>
                      </optgroup>
                      <optgroup label="Sciences">
                        <option value="Biology">Biology</option>
                        <option value="Chemistry">Chemistry</option>
                        <option value="Physics">Physics</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Statistics">Statistics</option>
                        <option value="Environmental Science">Environmental Science</option>
                        <option value="Agriculture">Agriculture</option>
                      </optgroup>
                      <optgroup label="Social Sciences & Humanities">
                        <option value="Psychology">Psychology</option>
                        <option value="Sociology">Sociology</option>
                        <option value="Political Science">Political Science</option>
                        <option value="International Relations">International Relations</option>
                        <option value="Anthropology">Anthropology</option>
                        <option value="History">History</option>
                        <option value="Philosophy">Philosophy</option>
                        <option value="English">English</option>
                        <option value="Linguistics">Linguistics</option>
                        <option value="Theology">Theology</option>
                      </optgroup>
                      <optgroup label="Law & Justice">
                        <option value="Law">Law</option>
                        <option value="Criminal Justice">Criminal Justice</option>
                      </optgroup>
                      <optgroup label="Education & Communication">
                        <option value="Education">Education</option>
                        <option value="Communications">Communications</option>
                        <option value="Journalism">Journalism</option>
                        <option value="Media Studies">Media Studies</option>
                      </optgroup>
                      <optgroup label="Arts & Design">
                        <option value="Graphic Design">Graphic Design</option>
                        <option value="Fine Arts">Fine Arts</option>
                        <option value="Architecture">Architecture</option>
                        <option value="Urban Planning">Urban Planning</option>
                        <option value="Music">Music</option>
                        <option value="Theater">Theater</option>
                        <option value="Film Studies">Film Studies</option>
                      </optgroup>
                      <optgroup label="Other">
                        <option value="Social Work">Social Work</option>
                      </optgroup>
                      <option value="Other">Other (Specify)</option>
                    </select>
                    {(selectValue === 'Other' || isCustomField) && (
                      <input
                        type="text"
                        placeholder="Enter your field of study"
                        value={isCustomField ? edu.field : ''}
                        onChange={(e) => {
                          updateEducation(edu.id, 'field', e.target.value)
                          if (errors[`education_${edu.id}_field`]) {
                            setErrors(prev => ({ ...prev, [`education_${edu.id}_field`]: null }))
                          }
                        }}
                        className={`w-full px-3 py-2.5 border rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 mt-2 ${
                          errors[`education_${edu.id}_field`]
                            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                            : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                        }`}
                      />
                    )}
                  </>
                )
              })()}
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
