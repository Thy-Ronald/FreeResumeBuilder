import { useState } from 'react'
import Icon from '../../components/common/Icon'
import { templates } from '../../constants/templates'
import logoImage from '../../assets/logo.jpg'

function TemplateSelection({ onSelectTemplate }) {
  const [selectedTemplate, setSelectedTemplate] = useState('compact')

  const handleContinue = () => {
    onSelectTemplate(selectedTemplate)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold text-gray-900 mb-4 tracking-tight">
            Choose Your Resume Template
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select a professionally designed template. All templates are ATS-friendly and optimized for one-page resumes.
          </p>
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`relative bg-white border-2 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 ${
                selectedTemplate === template.id
                  ? 'border-blue-500 shadow-lg shadow-blue-500/20'
                  : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
              }`}
              onClick={() => setSelectedTemplate(template.id)}
            >
              {/* Preview */}
              <div className="relative bg-gray-50 p-6 h-64 flex items-center justify-center">
                <div className="w-full h-full bg-white border border-gray-200 rounded p-4 overflow-hidden">
                  {template.id === 'compact' && (
                    <div className="w-full h-full flex flex-col text-[6px] leading-tight">
                      <div className="text-[8px] font-bold text-center mb-0.5">Ronald Moran Jr</div>
                      <div className="text-[5px] text-gray-600 text-center mb-1">Software Engineer</div>
                      <div className="h-px bg-gray-300 my-1"></div>
                      <div className="flex gap-2 flex-1 mt-0.5">
                        <div className="w-[30%] flex flex-col gap-2">
                          <div className="flex flex-col gap-0.5">
                            <div className="text-[5px] font-bold uppercase">Skills</div>
                            <div className="h-px bg-gray-300 mb-0.5"></div>
                            <div className="text-[4px] text-gray-600">JavaScript</div>
                            <div className="text-[4px] text-gray-600">Python</div>
                            <div className="text-[4px] text-gray-600">React</div>
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <div className="text-[5px] font-bold uppercase">Tools</div>
                            <div className="h-px bg-gray-300 mb-0.5"></div>
                            <div className="text-[4px] text-gray-600">Git</div>
                            <div className="text-[4px] text-gray-600">Docker</div>
                          </div>
                        </div>
                        <div className="w-[70%] flex flex-col gap-2">
                          <div className="flex flex-col gap-0.5">
                            <div className="text-[5px] font-bold uppercase">Summary</div>
                            <div className="h-px bg-gray-300 mb-0.5"></div>
                            <div className="text-[4px] text-gray-600">Experienced software engineer...</div>
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <div className="text-[5px] font-bold uppercase">Experience</div>
                            <div className="h-px bg-gray-300 mb-0.5"></div>
                            <div className="text-[4px] font-semibold">Senior Engineer</div>
                            <div className="text-[4px] text-gray-600">Tech Company Inc.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {template.id === 'modern' && (
                    <div className="w-full h-full flex flex-col text-[6px] leading-tight">
                      <div className="text-[9px] font-bold text-center mb-0.5">Ronald Moran Jr</div>
                      <div className="text-[5px] text-gray-600 text-center mb-2">Software Engineer</div>
                      <div className="h-px bg-gray-300 my-1"></div>
                      <div className="flex gap-2 flex-1 mt-1">
                        <div className="w-[30%] flex flex-col gap-3">
                          <div className="flex flex-col gap-1">
                            <div className="text-[5px] font-bold uppercase">Skills</div>
                            <div className="h-px bg-gray-300 mb-0.5"></div>
                            <div className="text-[4px] text-gray-600">JavaScript</div>
                            <div className="text-[4px] text-gray-600">Python</div>
                          </div>
                          <div className="flex flex-col gap-1">
                            <div className="text-[5px] font-bold uppercase">Tools</div>
                            <div className="h-px bg-gray-300 mb-0.5"></div>
                            <div className="text-[4px] text-gray-600">Git</div>
                          </div>
                        </div>
                        <div className="w-[70%] flex flex-col gap-3">
                          <div className="flex flex-col gap-1">
                            <div className="text-[5px] font-bold uppercase">Summary</div>
                            <div className="h-px bg-gray-300 mb-0.5"></div>
                            <div className="text-[4px] text-gray-600">Experienced software engineer...</div>
                            <div className="text-[4px] text-gray-600">with expertise in...</div>
                          </div>
                          <div className="flex flex-col gap-1">
                            <div className="text-[5px] font-bold uppercase">Experience</div>
                            <div className="h-px bg-gray-300 mb-0.5"></div>
                            <div className="text-[4px] font-semibold">Senior Engineer</div>
                            <div className="text-[4px] text-gray-600">Tech Company Inc.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {template.id === 'classic' && (
                    <div className="w-full h-full flex flex-col text-[6px] leading-tight">
                      <div className="text-[9px] font-bold text-center mb-0.5">Ronald Moran Jr</div>
                      <div className="text-[5px] text-gray-600 text-center mb-2">Software Engineer</div>
                      <div className="h-px bg-gray-300 my-1"></div>
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                          <div className="text-[5px] font-bold uppercase">Summary</div>
                          <div className="h-px bg-gray-300 mb-0.5"></div>
                          <div className="text-[4px] text-gray-600">Experienced software engineer with expertise...</div>
                          <div className="text-[4px] text-gray-600">in modern web technologies...</div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="text-[5px] font-bold uppercase">Experience</div>
                          <div className="h-px bg-gray-300 mb-0.5"></div>
                          <div className="text-[4px] font-semibold">Senior Engineer</div>
                          <div className="text-[4px] text-gray-600">Tech Company Inc.</div>
                          <div className="text-[4px] text-gray-600">• Led development projects</div>
                        </div>
                      </div>
                    </div>
                  )}
                  {template.id === 'minimal' && (
                    <div className="w-full h-full flex flex-col text-[6px] leading-tight">
                      <div className="text-[8px] font-semibold text-center mb-1">Ronald Moran Jr</div>
                      <div className="h-0.5 bg-gray-300 my-1"></div>
                      <div className="flex gap-2 flex-1 mt-0.5">
                        <div className="w-[30%] flex flex-col gap-3">
                          <div className="flex flex-col gap-0.5">
                            <div className="text-[5px] font-semibold uppercase">Skills</div>
                            <div className="h-px bg-gray-200 mb-0.5"></div>
                            <div className="text-[4px] text-gray-600">JavaScript</div>
                            <div className="text-[4px] text-gray-600">Python</div>
                          </div>
                        </div>
                        <div className="w-[70%] flex flex-col gap-3">
                          <div className="flex flex-col gap-0.5">
                            <div className="text-[5px] font-semibold uppercase">Summary</div>
                            <div className="h-px bg-gray-200 mb-0.5"></div>
                            <div className="text-[4px] text-gray-600">Experienced engineer...</div>
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <div className="text-[5px] font-semibold uppercase">Experience</div>
                            <div className="h-px bg-gray-200 mb-0.5"></div>
                            <div className="text-[4px] text-gray-600">Senior Engineer at Tech Co.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {template.id === 'corporate' && (
                    <div className="w-full h-full flex flex-col text-[6px] leading-tight">
                      <div className="text-[10px] font-bold mb-0.5">Ronald Moran Jr</div>
                      <div className="text-[6px] text-gray-700 mb-1">Software Engineer</div>
                      <div className="h-0.5 bg-blue-500 w-1/4 mb-1"></div>
                      <div className="flex gap-2 flex-1">
                        <div className="w-[35%] flex flex-col gap-2">
                          <div className="flex flex-col gap-0.5">
                            <div className="text-[5px] font-bold uppercase text-blue-600">Education</div>
                            <div className="h-px bg-gray-300 mb-0.5"></div>
                            <div className="text-[4px] font-semibold">Bachelor of Science</div>
                            <div className="text-[4px] text-gray-600">State University</div>
                            <div className="text-[4px] text-gray-500">2016 - 2020</div>
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <div className="text-[5px] font-bold uppercase text-blue-600">Skills</div>
                            <div className="h-px bg-gray-300 mb-0.5"></div>
                            <div className="text-[4px] text-gray-600">• JavaScript</div>
                            <div className="text-[4px] text-gray-600">• Python</div>
                          </div>
                        </div>
                        <div className="w-[65%] flex flex-col gap-2">
                          <div className="flex flex-col gap-0.5">
                            <div className="text-[5px] font-bold uppercase text-blue-600">Summary</div>
                            <div className="h-px bg-gray-300 mb-0.5"></div>
                            <div className="text-[4px] text-gray-600">Experienced software engineer...</div>
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <div className="text-[5px] font-bold uppercase text-blue-600">Work History</div>
                            <div className="h-px bg-gray-300 mb-0.5"></div>
                            <div className="text-[4px] font-semibold">Senior Engineer</div>
                            <div className="text-[4px] text-blue-600">Tech Company Inc.</div>
                            <div className="text-[4px] text-gray-600">• Led development projects</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {template.id === 'with-image' && (
                    <div className="w-full h-full flex flex-col text-[6px] leading-tight">
                      <div className="mb-1.5 pb-1 border-b border-gray-300">
                        <div className="text-[7px] font-bold mb-0.5">Ronald Moran Jr</div>
                        <div className="text-[5px] text-gray-600 mb-0.5">Software Engineer</div>
                        <div className="text-[4px] text-gray-500">email@example.com | +1 (555) 000-0000</div>
                      </div>
                      <div className="flex gap-1.5 flex-1">
                        <div className="w-[28%] flex flex-col gap-2">
                          <img 
                            src={logoImage} 
                            alt="Profile" 
                            className="w-full aspect-square object-cover rounded border border-gray-200"
                          />
                          <div className="flex flex-col gap-0.5">
                            <div className="text-[5px] font-bold uppercase">Skills</div>
                            <div className="h-px bg-gray-300 mb-0.5"></div>
                            <div className="text-[4px] text-gray-600">JavaScript</div>
                            <div className="text-[4px] text-gray-600">Python</div>
                          </div>
                        </div>
                        <div className="w-[72%] flex flex-col gap-2">
                          <div className="flex flex-col gap-0.5">
                            <div className="text-[5px] font-bold uppercase">Summary</div>
                            <div className="h-px bg-gray-300 mb-0.5"></div>
                            <div className="text-[4px] text-gray-600">Experienced software engineer...</div>
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <div className="text-[5px] font-bold uppercase">Experience</div>
                            <div className="h-px bg-gray-300 mb-0.5"></div>
                            <div className="text-[4px] font-semibold">Senior Engineer</div>
                            <div className="text-[4px] text-blue-600">Tech Company Inc.</div>
                            <div className="text-[4px] text-gray-600">• Led development projects</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {selectedTemplate === template.id && (
                  <div className="absolute top-3 right-3 bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg">
                    <i className="fi fi-rr-check text-sm"></i>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.name}</h3>
                <p className="text-sm text-gray-600 mb-3 leading-relaxed">{template.description}</p>
                <div className="flex flex-wrap gap-2">
                  {template.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className={`text-xs px-2 py-1 rounded font-medium ${
                        selectedTemplate === template.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-center items-center gap-3 bg-gray-50 rounded-lg p-6 mb-8">
          <i className="fi fi-rr-info text-blue-500"></i>
          <span className="text-sm text-gray-600">
            You can switch templates anytime. Your content will be preserved.
          </span>
        </div>

        {/* Continue Button */}
        <div className="flex justify-center">
          <button
            onClick={handleContinue}
            className="px-8 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 flex items-center gap-2 shadow-lg"
          >
            Continue with {templates.find(t => t.id === selectedTemplate)?.name}
            <Icon name="briefcase" className="text-white" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default TemplateSelection
