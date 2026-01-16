import { useState, useCallback } from 'react'
import ResumeForm from './components/ResumeForm'
import ResumePreview from './components/ResumePreview'
import { templates } from '../../constants/templates'
import { fonts } from '../../constants/fonts'
import { textColors } from '../../constants/colors'
import logoImage from '../../assets/logo.jpg'
import Icon from '../../components/common/Icon'
import { themeColors } from '../../constants/themeColors'
import { useResumeData } from '../../hooks/useResumeData'
import { useResumeSections } from '../../hooks/useResumeSections'
import { useTemplateColors } from '../../hooks/useTemplateColors'
import { useModals } from '../../hooks/useModals'
import { usePDFGeneration } from '../../hooks/usePDFGeneration'
import { useFontAndColor } from '../../hooks/useFontAndColor'
import DownloadModal from './components/modals/DownloadModal'
import FontModal from './components/modals/FontModal'
import ColorModal from './components/modals/ColorModal'
import PreviewModal from './components/modals/PreviewModal'

function ResumeBuilder({ 
  selectedTemplate: initialTemplate = 'modern', 
  themeColor = '#F2F2F2', 
  onBack,
  templateColors = {},
  onTemplateColorChange,
  getTemplateColor: getTemplateColorProp
}) {
  const [selectedTemplate, setSelectedTemplate] = useState(initialTemplate)

  // Custom hooks
  const resumeDataHook = useResumeData()
  const { selectedFont, setSelectedFont, selectedColor, setSelectedColor } = useFontAndColor()
  const modals = useModals()
  const pdfGeneration = usePDFGeneration()
  
  const sectionsHook = useResumeSections(selectedTemplate, resumeDataHook.resumeData, {
    addExperience: resumeDataHook.addExperience,
    addEducation: resumeDataHook.addEducation,
    addSkill: resumeDataHook.addSkill,
    addTool: resumeDataHook.addTool,
    addLanguage: resumeDataHook.addLanguage,
    addCertification: resumeDataHook.addCertification,
    addProject: resumeDataHook.addProject,
  })

  const templateColorsHook = useTemplateColors(
    templateColors,
    onTemplateColorChange,
    getTemplateColorProp,
    selectedTemplate,
    themeColor
  )

  // Destructure for easier access
  const {
    resumeData,
    updatePersonalInfo,
    updateSummary,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
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
    addProject,
    updateProject,
    removeProject,
    resetResumeData,
  } = resumeDataHook

  const {
    currentSection,
    setCurrentSection,
    sections,
    progress,
    hasFormData,
  } = sectionsHook

  const {
    getTemplateColor,
    getPreviewColor,
    handleTemplateColorChange,
    currentThemeColor,
  } = templateColorsHook

  // Handle go back with confirmation
  const handleGoBack = useCallback(() => {
    // If on the first section, check if there's form data before showing alert
    if (currentSection === 0) {
      if (hasFormData) {
        const confirmed = window.confirm(
          'Are you sure you want to go back?\n\nThis will reset all form data and you will lose all your progress.\n\nDo you want to continue?'
        )
        if (confirmed) {
          resetResumeData()
          setCurrentSection(0)
          onBack()
        }
      } else {
        // No form data, just go back without alert
        resetResumeData()
        setCurrentSection(0)
        onBack()
      }
    } else if (hasFormData) {
      const confirmed = window.confirm(
        'Your progress has been saved. Going back will take you to template selection.\n\nYou can return to continue editing your resume later.\n\nDo you want to continue?'
      )
      if (confirmed) {
        onBack()
      }
    } else {
      onBack()
    }
  }, [currentSection, hasFormData, onBack, resetResumeData, setCurrentSection])

  // Handle finish button click
  const handleFinish = useCallback(() => {
    modals.openDownloadModal()
  }, [modals])

  // Handle download PDF with loading state
  const handleDownloadPDF = useCallback(async () => {
    try {
      await pdfGeneration.handleDownloadPDF(() => {
        // Close modal after successful download
        modals.closeDownloadModal()
      })
    } catch (error) {
      // Error is already handled in the hook
    }
  }, [pdfGeneration, modals])

  // Handle template change
  const handleTemplateChange = useCallback((templateId) => {
    setSelectedTemplate(templateId)
    modals.closeTemplateModal()
  }, [modals])

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header with Progress Bar */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 px-3 sm:px-4 md:px-6 py-2 sm:py-3 z-10">
        <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
          {/* Hamburger Menu Button - Mobile Only */}
          <button
            onClick={modals.openSidebar}
            className="lg:hidden flex items-center justify-center text-blue-600 hover:text-blue-700 transition-colors flex-shrink-0 p-1.5"
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Progress Bar - Centered on mobile, left-aligned on desktop */}
          <div className="flex-1 flex justify-center lg:justify-start min-w-0 lg:ml-4">
            <div className="max-w-[200px] sm:max-w-[280px] md:max-w-md w-full">
              <div className="flex items-center justify-between mb-1 sm:mb-1.5 gap-1">
              {sections.map((section, index) => (
                <div
                  key={section.id}
                  className={`flex flex-col items-center gap-0.5 transition-all cursor-default flex-shrink-0 ${
                    index === currentSection
                      ? 'text-gray-900'
                      : index < currentSection
                      ? 'text-blue-600'
                      : 'text-gray-400'
                  }`}
                >
                  <div
                    className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center border-2 transition-all ${
                      index === currentSection
                        ? 'bg-gray-900 text-white border-gray-900'
                        : index < currentSection
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white border-gray-300'
                    }`}
                  >
                    <Icon name={section.icon} className="text-[7px] sm:text-[8px]" />
                  </div>
                  <span className="text-[8px] sm:text-[9px] font-medium hidden sm:block">{section.label}</span>
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-0.5">
              <div
                className="bg-blue-600 h-0.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="text-center mt-0.5 text-[8px] sm:text-[9px] text-gray-600 px-1">
              Step {currentSection + 1} of {sections.length}: {sections[currentSection].label}
            </div>
            </div>
          </div>

          {/* Preview Button - Mobile Only */}
          <button
            onClick={modals.openPreviewModal}
            className="lg:hidden flex items-center gap-1.5 text-blue-600 hover:text-blue-700 transition-colors flex-shrink-0 p-1.5"
            aria-label="Show preview"
          >
            <Icon name="preview" className="text-base" />
            <span className="text-xs font-medium hidden sm:inline">Preview</span>
          </button>

          {/* Font, Color and Template Buttons - Desktop Only */}
          <div className="hidden lg:flex items-center gap-2 md:gap-3 ml-auto flex-shrink-0">
            <button
              onClick={modals.openFontModal}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors flex-shrink-0"
              title="Change Font"
            >
              <Icon name="font" className="text-lg" />
              <span className="text-sm font-medium">Font</span>
            </button>
            <button
              onClick={modals.openColorModal}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors flex-shrink-0"
              title="Change Text Color"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
              <span className="text-sm font-medium">Color</span>
            </button>
            <button
              onClick={modals.openTemplateModal}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors flex-shrink-0"
            >
              <Icon name="template" className="text-lg" />
              <span className="text-sm font-medium">Template</span>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Sidebar */}
      <>
        {/* Overlay */}
        <div 
          className={`fixed inset-0 bg-black z-40 lg:hidden transition-opacity duration-300 ease-in-out ${
            modals.showSidebar ? 'opacity-50 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          onClick={modals.closeSidebar}
        />
        {/* Sidebar */}
        <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-out lg:hidden ${
          modals.showSidebar ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Settings</h2>
              <button
                onClick={modals.closeSidebar}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Sidebar Content */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    modals.openFontModal()
                    modals.closeSidebar()
                  }}
                  className={`flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200 ${
                    modals.showSidebar ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  }`}
                  style={{ transitionDelay: modals.showSidebar ? '0.1s' : '0s' }}
                >
                  <Icon name="font" className="text-xl text-blue-600" />
                  <div className="flex flex-col">
                    <span className="font-medium">Change Font</span>
                    <span className="text-xs text-gray-500">Select font style</span>
                  </div>
                </button>
                
                <button
                  onClick={() => {
                    modals.openColorModal()
                    modals.closeSidebar()
                  }}
                  className={`flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200 ${
                    modals.showSidebar ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  }`}
                  style={{ transitionDelay: modals.showSidebar ? '0.15s' : '0s' }}
                >
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                  <div className="flex flex-col">
                    <span className="font-medium">Change Color</span>
                    <span className="text-xs text-gray-500">Select text color scheme</span>
                  </div>
                </button>
                
                <button
                  onClick={() => {
                    modals.openTemplateModal()
                    modals.closeSidebar()
                  }}
                  className={`flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200 ${
                    modals.showSidebar ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  }`}
                  style={{ transitionDelay: modals.showSidebar ? '0.2s' : '0s' }}
                >
                  <Icon name="template" className="text-xl text-blue-600" />
                  <div className="flex flex-col">
                    <span className="font-medium">Change Template</span>
                    <span className="text-xs text-gray-500">Select resume template</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </>

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[calc(100vh-57px)] sm:min-h-[calc(100vh-65px)] mt-[57px] sm:mt-[65px]">
        <ResumeForm
          resumeData={resumeData}
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
          selectedTemplate={selectedTemplate}
          onFinish={handleFinish}
          onGoBack={handleGoBack}
          updatePersonalInfo={updatePersonalInfo}
          updateSummary={updateSummary}
          addExperience={addExperience}
          updateExperience={updateExperience}
          removeExperience={removeExperience}
          addEducation={addEducation}
          updateEducation={updateEducation}
          removeEducation={removeEducation}
          addSkill={addSkill}
          updateSkill={updateSkill}
          removeSkill={removeSkill}
          addTool={addTool}
          updateTool={updateTool}
          removeTool={removeTool}
          addLanguage={addLanguage}
          updateLanguage={updateLanguage}
          removeLanguage={removeLanguage}
          addCertification={addCertification}
          updateCertification={updateCertification}
          removeCertification={removeCertification}
          addProject={addProject}
          updateProject={updateProject}
          removeProject={removeProject}
        />
        <ResumePreview
          resumeData={resumeData}
          selectedTemplate={selectedTemplate}
          selectedFont={selectedFont}
          selectedColor={selectedColor}
          themeColor={currentThemeColor}
          onDownloadReady={pdfGeneration.setDownloadFunction}
        />
      </div>

      {/* Template Change Modal */}
      {modals.showTemplateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-white rounded-lg sm:rounded-xl shadow-xl p-4 sm:p-5 md:p-6 max-w-7xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-3 sm:mb-4 md:mb-6">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 tracking-tight">Change Template</h2>
              <button
                onClick={modals.closeTemplateModal}
                className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0 p-1"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Template Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-4 sm:mb-6">
              {templates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => handleTemplateChange(template.id)}
                  className={`relative bg-white border-2 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 ${
                    selectedTemplate === template.id
                      ? 'border-blue-500 shadow-lg shadow-blue-500/20'
                      : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                  }`}
                >
                  {/* Preview - True Paper Representation */}
                  <div className="relative bg-gray-50 p-2 sm:p-4 md:p-5 lg:p-6 flex items-center justify-center">
                    {/* Paper frame - US Letter: 8.5" x 11" (aspect ratio 1:1.294) - True physical paper */}
                    <div 
                      className="relative bg-white w-full max-w-[140px] sm:max-w-[180px] md:max-w-[200px] lg:max-w-[220px]"
                      style={{
                        aspectRatio: '8.5 / 11', // US Letter aspect ratio (exact)
                        border: '0.5px solid #D1D5DB', // Thin light-gray page border
                        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)', // Soft subtle shadow for paper lift
                      }}
                    >
                      <div className="w-full h-full p-0.5 sm:p-1 md:p-1.5 overflow-hidden flex flex-col" style={{ boxSizing: 'border-box' }}>
                      {template.id === 'modern' && (() => {
                        const previewColor = getPreviewColor(template.id)
                        return (
                        <div className="w-full h-full flex flex-col text-[4.5px] sm:text-[5.5px] md:text-[6px] leading-[1.2] flex-1">
                          <div className="text-[7px] sm:text-[8px] md:text-[9px] font-bold text-center mb-0.5">Ronald Moran Jr</div>
                          <div className="text-[3.5px] sm:text-[4.5px] md:text-[5px] text-gray-600 text-center mb-1">Software Engineer | email@example.com | +1 (555) 000-0000</div>
                          <div className="h-px my-0.5" style={{ backgroundColor: previewColor }}></div>
                          <div className="flex gap-1 sm:gap-1.5 flex-1 mt-0.5">
                            <div className="w-[30%] flex flex-col gap-1">
                              <div className="flex flex-col gap-0.5">
                                <div className="text-[3.5px] sm:text-[4.5px] md:text-[5px] font-bold uppercase">Skills</div>
                                <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
                                <div className="text-[3px] sm:text-[4px] md:text-[4.5px] text-gray-600">JavaScript</div>
                                <div className="text-[3px] sm:text-[4px] md:text-[4.5px] text-gray-600">Python</div>
                                <div className="text-[3px] sm:text-[4px] md:text-[4.5px] text-gray-600">React</div>
                                <div className="text-[3px] sm:text-[4px] md:text-[4.5px] text-gray-600">Node.js</div>
                                <div className="text-[3px] sm:text-[4px] md:text-[4.5px] text-gray-600">TypeScript</div>
                                <div className="text-[3px] sm:text-[4px] md:text-[4.5px] text-gray-600">SQL</div>
                                <div className="text-[3px] sm:text-[4px] md:text-[4.5px] text-gray-600">System Design</div>
                              </div>
                              <div className="flex flex-col gap-0.5">
                                <div className="text-[3.5px] sm:text-[4.5px] md:text-[5px] font-bold uppercase">Tools</div>
                                <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
                                <div className="text-[3px] sm:text-[4px] md:text-[4.5px] text-gray-600">Git</div>
                                <div className="text-[3px] sm:text-[4px] md:text-[4.5px] text-gray-600">Docker</div>
                                <div className="text-[3px] sm:text-[4px] md:text-[4.5px] text-gray-600">AWS</div>
                                <div className="text-[3px] sm:text-[4px] md:text-[4.5px] text-gray-600">PostgreSQL</div>
                              </div>
                              <div className="flex flex-col gap-0.5">
                                <div className="text-[3.5px] sm:text-[4.5px] md:text-[5px] font-bold uppercase">Education</div>
                                <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
                                <div className="text-[3px] sm:text-[4px] md:text-[4.5px] font-semibold">BS Computer Science</div>
                                <div className="text-[3px] sm:text-[4px] md:text-[4.5px] text-gray-600">State University</div>
                                <div className="text-[3px] sm:text-[4px] md:text-[4.5px] text-gray-600">2016 - 2020</div>
                              </div>
                            </div>
                            <div className="w-[70%] flex flex-col gap-1">
                              <div className="flex flex-col gap-0.5">
                                <div className="text-[3.5px] sm:text-[4.5px] md:text-[5px] font-bold uppercase">Summary</div>
                                <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
                                <div className="text-[3px] sm:text-[4px] md:text-[4.5px] text-gray-600">Experienced software engineer with 5+ years of expertise in full-stack development, specializing in modern web technologies and cloud infrastructure. Proven track record of delivering scalable applications serving millions of users. Strong background in system architecture, performance optimization, and agile methodologies.</div>
                              </div>
                              <div className="flex flex-col gap-0.5">
                                <div className="text-[3.5px] sm:text-[4.5px] md:text-[5px] font-bold uppercase">Experience</div>
                                <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
                                <div className="text-[3px] sm:text-[4px] md:text-[4.5px] font-semibold">Senior Software Engineer</div>
                                <div className="text-[3px] sm:text-[4px] md:text-[4.5px] text-gray-600">Tech Company Inc. | Jan 2021 - Present</div>
                                <div className="text-[3px] sm:text-[4px] md:text-[4.5px] text-gray-600">• Led development of microservices architecture serving 2M+ daily active users, reducing latency by 40%</div>
                                <div className="text-[3px] sm:text-[4px] md:text-[4.5px] text-gray-600">• Architected real-time data processing pipeline handling 50K requests/second</div>
                                <div className="text-[3px] sm:text-[4px] md:text-[4.5px] text-gray-600">• Mentored team of 5 junior engineers, establishing code review practices</div>
                                <div className="text-[3px] sm:text-[4px] md:text-[4.5px] text-gray-600">• Optimized database queries and caching strategies, improving API response time by 60%</div>
                                <div className="text-[3px] sm:text-[4px] md:text-[4.5px] text-gray-600">• Collaborated with product teams to deliver features increasing user engagement by 25%</div>
                                <div className="text-[3px] sm:text-[4px] md:text-[4.5px] font-semibold mt-0.5">Software Engineer</div>
                                <div className="text-[3px] sm:text-[4px] md:text-[4.5px] text-gray-600">Startup Solutions | Jun 2019 - Dec 2020</div>
                                <div className="text-[3px] sm:text-[4px] md:text-[4.5px] text-gray-600">• Developed full-stack web applications using React, Node.js, and PostgreSQL</div>
                                <div className="text-[3px] sm:text-[4px] md:text-[4.5px] text-gray-600">• Built RESTful APIs and GraphQL endpoints supporting mobile and web clients</div>
                                <div className="text-[3px] sm:text-[4px] md:text-[4.5px] text-gray-600">• Implemented automated testing suite achieving 85% code coverage</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        )
                      })()}
                      {template.id === 'classic' && (() => {
                        const previewColor = getPreviewColor(template.id)
                        return (
                        <div className="w-full h-full flex flex-col text-[4px] sm:text-[5px] md:text-[5.5px] leading-[1.15] flex-1">
                          <div className="text-[6px] sm:text-[7px] md:text-[8px] font-bold text-center mb-0.5">Ronald Moran Jr</div>
                          <div className="text-[3px] sm:text-[4px] md:text-[4.5px] text-gray-600 text-center mb-0.5">Software Engineer | email@example.com | +1 (555) 000-0000</div>
                          <div className="h-px my-0.5" style={{ backgroundColor: previewColor }}></div>
                          <div className="flex flex-col gap-0.5 flex-1 mt-0.5">
                            <div className="flex flex-col gap-0.5">
                              <div className="text-[3px] sm:text-[4px] md:text-[4.5px] font-bold uppercase">Summary</div>
                              <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
                              <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">Experienced software engineer with 5+ years of expertise in full-stack development, specializing in modern web technologies and cloud infrastructure. Proven track record of delivering scalable applications serving millions of users. Strong background in system architecture, performance optimization, and agile methodologies. Passionate about writing clean, maintainable code and mentoring junior developers.</div>
                            </div>
                            <div className="flex flex-col gap-0.5">
                              <div className="text-[3px] sm:text-[4px] md:text-[4.5px] font-bold uppercase">Skills</div>
                              <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
                              <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">JavaScript, Python, React, Node.js, TypeScript, SQL, System Design, Microservices, Git, Docker, AWS, PostgreSQL</div>
                            </div>
                            <div className="flex flex-col gap-0.5">
                              <div className="text-[3px] sm:text-[4px] md:text-[4.5px] font-bold uppercase">Experience</div>
                              <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
                              <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] font-semibold">Senior Software Engineer</div>
                              <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">Tech Company Inc. | Jan 2021 - Present</div>
                              <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">• Led development of microservices architecture serving 2M+ daily active users, reducing latency by 40%</div>
                              <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">• Architected real-time data processing pipeline handling 50K requests/second</div>
                              <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">• Mentored team of 5 junior engineers, establishing code review practices and technical standards</div>
                              <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">• Optimized database queries and caching strategies, improving API response time by 60%</div>
                              <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">• Collaborated with product and design teams to deliver features increasing user engagement by 25%</div>
                              <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] font-semibold mt-0.5">Software Engineer</div>
                              <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">Startup Solutions | Jun 2019 - Dec 2020</div>
                              <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">• Developed full-stack web applications using React, Node.js, and PostgreSQL</div>
                              <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">• Built RESTful APIs and GraphQL endpoints supporting mobile and web clients</div>
                              <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">• Implemented automated testing suite achieving 85% code coverage, reducing production bugs by 50%</div>
                              <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">• Deployed applications on AWS using Docker and Kubernetes, ensuring 99.9% uptime</div>
                            </div>
                            <div className="flex flex-col gap-0.5">
                              <div className="text-[3px] sm:text-[4px] md:text-[4.5px] font-bold uppercase">Education</div>
                              <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
                              <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] font-semibold">BS Computer Science</div>
                              <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">State University | 2016 - 2020</div>
                            </div>
                          </div>
                        </div>
                        )
                      })()}
                      {template.id === 'minimal' && (() => {
                        const previewColor = getPreviewColor(template.id)
                        return (
                        <div className="w-full h-full flex flex-col text-[4px] sm:text-[5px] md:text-[5.5px] leading-[1.15] flex-1">
                          <div className="text-[6px] sm:text-[7px] md:text-[8px] font-semibold text-center mb-0.5">Ronald Moran Jr</div>
                          <div className="text-[3px] sm:text-[4px] md:text-[4.5px] text-gray-600 text-center mb-0.5">Software Engineer | email@example.com | +1 (555) 000-0000</div>
                          <div className="h-0.5 my-0.5" style={{ backgroundColor: previewColor }}></div>
                          <div className="flex gap-1 sm:gap-1.5 flex-1 mt-0.5">
                            <div className="w-[30%] flex flex-col gap-0.5">
                              <div className="flex flex-col gap-0.5">
                                <div className="text-[3px] sm:text-[4px] md:text-[4.5px] font-semibold uppercase">Skills</div>
                                <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">JavaScript</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">Python</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">React</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">Node.js</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">TypeScript</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">SQL</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">System Design</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">Microservices</div>
                              </div>
                              <div className="flex flex-col gap-0.5">
                                <div className="text-[3px] sm:text-[4px] md:text-[4.5px] font-semibold uppercase">Tools</div>
                                <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">Git</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">Docker</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">AWS</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">PostgreSQL</div>
                              </div>
                              <div className="flex flex-col gap-0.5">
                                <div className="text-[3px] sm:text-[4px] md:text-[4.5px] font-semibold uppercase">Education</div>
                                <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] font-semibold">BS Computer Science</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">State University</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">2016 - 2020</div>
                              </div>
                            </div>
                            <div className="w-[70%] flex flex-col gap-0.5">
                              <div className="flex flex-col gap-0.5">
                                <div className="text-[3px] sm:text-[4px] md:text-[4.5px] font-semibold uppercase">Summary</div>
                                <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">Experienced software engineer with 5+ years of expertise in full-stack development, specializing in modern web technologies and cloud infrastructure. Proven track record of delivering scalable applications serving millions of users. Strong background in system architecture, performance optimization, and agile methodologies.</div>
                              </div>
                              <div className="flex flex-col gap-0.5">
                                <div className="text-[3px] sm:text-[4px] md:text-[4.5px] font-semibold uppercase">Experience</div>
                                <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] font-semibold">Senior Software Engineer</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">Tech Company Inc. | Jan 2021 - Present</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">• Led development of microservices architecture serving 2M+ daily active users, reducing latency by 40%</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">• Architected real-time data processing pipeline handling 50K requests/second</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">• Mentored team of 5 junior engineers, establishing code review practices</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">• Optimized database queries and caching strategies, improving API response time by 60%</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">• Collaborated with product teams to deliver features increasing user engagement by 25%</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] font-semibold mt-0.5">Software Engineer</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">Startup Solutions | Jun 2019 - Dec 2020</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">• Developed full-stack web applications using React, Node.js, and PostgreSQL</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">• Built RESTful APIs and GraphQL endpoints supporting mobile and web clients</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">• Implemented automated testing suite achieving 85% code coverage</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        )
                      })()}
                      {template.id === 'corporate' && (() => {
                        const previewColor = getPreviewColor(template.id)
                        return (
                        <div className="w-full h-full flex flex-col text-[4px] sm:text-[5px] md:text-[5.5px] leading-[1.15] flex-1">
                          <div className="text-[7px] sm:text-[8px] md:text-[9px] font-bold mb-0.5">Ronald Moran Jr</div>
                          <div className="text-[3.5px] sm:text-[4.5px] md:text-[5px] text-gray-700 mb-0.5">Software Engineer | email@example.com | +1 (555) 000-0000</div>
                          <div className="h-0.5 w-1/4 mb-0.5" style={{ backgroundColor: previewColor }}></div>
                          <div className="flex gap-1 sm:gap-1.5 flex-1">
                            <div className="w-[35%] flex flex-col gap-0.5">
                              <div className="flex flex-col gap-0.5">
                                <div className="text-[3px] sm:text-[4px] md:text-[4.5px] font-bold uppercase text-blue-600">Education</div>
                                <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] font-semibold">BS Computer Science</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">State University</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-500">2016 - 2020</div>
                              </div>
                              <div className="flex flex-col gap-0.5">
                                <div className="text-[3px] sm:text-[4px] md:text-[4.5px] font-bold uppercase text-blue-600">Skills</div>
                                <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">• JavaScript</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">• Python</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">• React</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">• Node.js</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">• TypeScript</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">• SQL</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">• System Design</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">• Microservices</div>
                              </div>
                              <div className="flex flex-col gap-0.5">
                                <div className="text-[3px] sm:text-[4px] md:text-[4.5px] font-bold uppercase text-blue-600">Tools</div>
                                <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">• Git</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">• Docker</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">• AWS</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">• PostgreSQL</div>
                              </div>
                            </div>
                            <div className="w-[65%] flex flex-col gap-0.5">
                              <div className="flex flex-col gap-0.5">
                                <div className="text-[3px] sm:text-[4px] md:text-[4.5px] font-bold uppercase text-blue-600">Summary</div>
                                <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">Experienced software engineer with 5+ years of expertise in full-stack development, specializing in modern web technologies and cloud infrastructure. Proven track record of delivering scalable applications serving millions of users. Strong background in system architecture, performance optimization, and agile methodologies.</div>
                              </div>
                              <div className="flex flex-col gap-0.5">
                                <div className="text-[3px] sm:text-[4px] md:text-[4.5px] font-bold uppercase text-blue-600">Work History</div>
                                <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] font-semibold">Senior Software Engineer</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-blue-600">Tech Company Inc. | Jan 2021 - Present</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">• Led development of microservices architecture serving 2M+ daily active users, reducing latency by 40%</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">• Architected real-time data processing pipeline handling 50K requests/second</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">• Mentored team of 5 junior engineers, establishing code review practices and technical standards</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">• Optimized database queries and caching strategies, improving API response time by 60%</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">• Collaborated with product and design teams to deliver features increasing user engagement by 25%</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] font-semibold mt-0.5">Software Engineer</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-blue-600">Startup Solutions | Jun 2019 - Dec 2020</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">• Developed full-stack web applications using React, Node.js, and PostgreSQL</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">• Built RESTful APIs and GraphQL endpoints supporting mobile and web clients</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">• Implemented automated testing suite achieving 85% code coverage</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        )
                      })()}
                      {template.id === 'with-image' && (() => {
                        const previewColor = getPreviewColor(template.id)
                        return (
                        <div className="w-full h-full flex flex-col text-[4px] sm:text-[5px] md:text-[5.5px] leading-[1.15] flex-1">
                          <div className="mb-0.5 sm:mb-1 pb-0.5 border-b" style={{ borderColor: previewColor }}>
                            <div className="text-[6px] sm:text-[7px] md:text-[8px] font-bold mb-0.5">Ronald Moran Jr</div>
                            <div className="text-[3px] sm:text-[4px] md:text-[4.5px] text-gray-600 mb-0.5">Software Engineer</div>
                            <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-500">email@example.com | +1 (555) 000-0000</div>
                          </div>
                          <div className="flex gap-1 sm:gap-1.5 flex-1">
                            <div className="w-[28%] flex flex-col gap-0.5">
                              <img 
                                src={logoImage} 
                                alt="Profile" 
                                className="w-full aspect-square object-cover rounded border border-gray-200 mb-0.5"
                              />
                              <div className="flex flex-col gap-0.5">
                                <div className="text-[3px] sm:text-[4px] md:text-[4.5px] font-bold uppercase">Skills</div>
                                <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">JavaScript</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">Python</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">React</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">Node.js</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">TypeScript</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">SQL</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">System Design</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">Microservices</div>
                              </div>
                              <div className="flex flex-col gap-0.5">
                                <div className="text-[3px] sm:text-[4px] md:text-[4.5px] font-bold uppercase">Tools</div>
                                <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">Git</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">Docker</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">AWS</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">PostgreSQL</div>
                              </div>
                              <div className="flex flex-col gap-0.5">
                                <div className="text-[3px] sm:text-[4px] md:text-[4.5px] font-bold uppercase">Education</div>
                                <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] font-semibold">BS Computer Science</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">State University</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">2016 - 2020</div>
                              </div>
                            </div>
                            <div className="w-[72%] flex flex-col gap-0.5">
                              <div className="flex flex-col gap-0.5">
                                <div className="text-[3px] sm:text-[4px] md:text-[4.5px] font-bold uppercase">Summary</div>
                                <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">Experienced software engineer with 5+ years of expertise in full-stack development, specializing in modern web technologies and cloud infrastructure. Proven track record of delivering scalable applications serving millions of users. Strong background in system architecture, performance optimization, and agile methodologies.</div>
                              </div>
                              <div className="flex flex-col gap-0.5">
                                <div className="text-[3px] sm:text-[4px] md:text-[4.5px] font-bold uppercase">Experience</div>
                                <div className="h-px mb-0.5" style={{ backgroundColor: previewColor }}></div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] font-semibold">Senior Software Engineer</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-blue-600">Tech Company Inc. | Jan 2021 - Present</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">• Led development of microservices architecture serving 2M+ daily active users, reducing latency by 40%</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">• Architected real-time data processing pipeline handling 50K requests/second</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">• Mentored team of 5 junior engineers, establishing code review practices and technical standards</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">• Optimized database queries and caching strategies, improving API response time by 60%</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">• Collaborated with product and design teams to deliver features increasing user engagement by 25%</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] font-semibold mt-0.5">Software Engineer</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-blue-600">Startup Solutions | Jun 2019 - Dec 2020</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">• Developed full-stack web applications using React, Node.js, and PostgreSQL</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">• Built RESTful APIs and GraphQL endpoints supporting mobile and web clients</div>
                                <div className="text-[2.5px] sm:text-[3.5px] md:text-[4px] text-gray-600">• Implemented automated testing suite achieving 85% code coverage</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        )
                      })()}
                      </div>
                    </div>
                    {selectedTemplate === template.id && (
                      <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-blue-500 text-white w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-lg">
                        <i className="fi fi-rr-check text-xs sm:text-sm"></i>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-3 sm:p-4 md:p-5 flex flex-col">
                    <div className="min-h-[3rem] sm:min-h-[3.5rem] md:min-h-[4rem] flex items-center justify-center mb-3 sm:mb-4">
                      <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 text-center leading-tight">{template.name}</h3>
                    </div>
                    
                    {/* Color Palette Picker */}
                    <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                      {themeColors.map((color) => {
                        const templateColor = getTemplateColor(template.id)
                        const isSelected = templateColor !== null && templateColor === color.hex
                        return (
                          <button
                            key={color.id}
                            onClick={(e) => {
                              e.stopPropagation()
                              handleTemplateColorChange(template.id, color.hex)
                            }}
                            className={`relative w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full transition-all duration-200 ${
                              isSelected
                                ? 'ring-2 ring-offset-1'
                                : 'ring-1 ring-transparent hover:ring-gray-300'
                            }`}
                            style={{
                              backgroundColor: color.hex,
                              ringColor: isSelected ? '#E5E7EB' : 'transparent',
                            }}
                            title={`Select ${color.hex}`}
                            aria-label={`Select ${color.hex}`}
                          >
                            {isSelected && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white opacity-80"></div>
                              </div>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Font Selection Modal */}
      <FontModal
        isOpen={modals.showFontModal}
        onClose={modals.closeFontModal}
        selectedFont={selectedFont}
        onSelectFont={setSelectedFont}
      />

      {/* Color Selection Modal */}
      <ColorModal
        isOpen={modals.showColorModal}
        onClose={modals.closeColorModal}
        selectedColor={selectedColor}
        onSelectColor={setSelectedColor}
      />

      {/* Preview Modal */}
      <PreviewModal
        isOpen={modals.showPreviewModal}
        onClose={modals.closePreviewModal}
        resumeData={resumeData}
        selectedTemplate={selectedTemplate}
        selectedFont={selectedFont}
        selectedColor={selectedColor}
        themeColor={currentThemeColor}
        onDownloadReady={pdfGeneration.setDownloadFunction}
      />

      {/* Download Modal */}
      <DownloadModal
        isOpen={modals.showDownloadModal}
        onClose={modals.closeDownloadModal}
        onDownload={handleDownloadPDF}
        isGeneratingPDF={pdfGeneration.isGeneratingPDF}
      />
    </div>
  )
}

export default ResumeBuilder
