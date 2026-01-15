/**
 * Projects Section Component
 * Handles project entries input
 */
export default function ProjectsSection({
  projects,
  errors,
  addProject,
  updateProject,
  removeProject,
  setErrors,
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Projects</h2>
        <button onClick={addProject} className="px-3 sm:px-4 py-2 bg-gray-900 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-800 active:bg-gray-700 transition-colors w-full sm:w-auto">
          Add Project
        </button>
      </div>
      {errors.projects_general && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{errors.projects_general}</p>
        </div>
      )}
      {projects.length === 0 && (
        <div className="py-12 text-center text-gray-400 text-sm">
          <p>No projects yet. Click "Add Project" to get started.</p>
        </div>
      )}
      {projects.map((project) => (
        <div key={project.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-5 md:p-6 mb-3 sm:mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-4 sm:mb-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Project Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Project Name"
                value={project.name}
                onChange={(e) => {
                  updateProject(project.id, 'name', e.target.value)
                  if (errors[`project_${project.id}_name`]) {
                    setErrors(prev => ({ ...prev, [`project_${project.id}_name`]: null }))
                  }
                }}
                className={`w-full px-3 py-2.5 border rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 ${
                  errors[`project_${project.id}_name`]
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                }`}
              />
              {errors[`project_${project.id}_name`] && (
                <p className="text-xs text-red-500">{errors[`project_${project.id}_name`]}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Technologies</label>
              <input
                type="text"
                placeholder="React, Node.js, MongoDB"
                value={project.technologies}
                onChange={(e) => updateProject(project.id, 'technologies', e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Live Link <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                type="text"
                placeholder="https://project.com"
                value={project.link}
                onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                GitHub <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                type="text"
                placeholder="github.com/username/project"
                value={project.github}
                onChange={(e) => updateProject(project.id, 'github', e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-5">
            <label className="text-sm font-medium text-gray-700">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Describe the project, your role, and key features..."
              value={project.description}
              onChange={(e) => {
                updateProject(project.id, 'description', e.target.value)
                if (errors[`project_${project.id}_description`]) {
                  setErrors(prev => ({ ...prev, [`project_${project.id}_description`]: null }))
                }
              }}
              rows="4"
              className={`w-full px-3 py-2.5 border rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 resize-y min-h-[100px] leading-relaxed ${
                errors[`project_${project.id}_description`]
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
              }`}
            />
            {errors[`project_${project.id}_description`] && (
              <p className="text-xs text-red-500">{errors[`project_${project.id}_description`]}</p>
            )}
          </div>
          <button onClick={() => removeProject(project.id)} className="px-4 py-2 bg-white text-gray-600 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 hover:text-gray-900 hover:border-gray-400 transition-colors">
            Remove
          </button>
        </div>
      ))}
    </div>
  )
}
