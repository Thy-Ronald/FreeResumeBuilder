import { useState, useMemo } from 'react'
import Icon from '../../../components/common/Icon'
import { validatePersonal, validateEducation, validateExperience, validateSkills, validateProjects } from '../../../utils/validation'
import PersonalInfoSection from './sections/PersonalInfoSection'
import EducationSection from './sections/EducationSection'
import ExperienceSection from './sections/ExperienceSection'
import SkillsSection from './sections/SkillsSection'
import ProjectsSection from './sections/ProjectsSection'

const allSections = [
  { id: 'personal', label: 'Personal Info', icon: 'user' },
  { id: 'education', label: 'Education', icon: 'education' },
  { id: 'experience', label: 'Experience', icon: 'briefcase' },
  { id: 'skills', label: 'Skills & More', icon: 'skills' },
  { id: 'projects', label: 'Projects', icon: 'project' },
]

function ResumeForm({
  resumeData,
  currentSection,
  setCurrentSection,
  selectedTemplate = 'modern',
  onFinish,
  onGoBack,
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
}) {
  const [errors, setErrors] = useState({})
  
  // Filter sections based on template
  const sections = useMemo(() => {
    const baseSections = [
      { id: 'personal', label: 'Personal Info', icon: 'user' },
      { id: 'education', label: 'Education', icon: 'education' },
      { id: 'experience', label: 'Experience', icon: 'briefcase' },
    ]
    
    if (selectedTemplate === 'corporate') {
      // Corporate: Only Personal, Education, Experience, Skills
      return [
        ...baseSections,
        { id: 'skills', label: 'Skills & More', icon: 'skills' },
      ]
    } else {
      // All other templates: Personal, Education, Experience, Skills, Projects
      return [
        ...baseSections,
        { id: 'skills', label: 'Skills & More', icon: 'skills' },
        { id: 'projects', label: 'Projects', icon: 'project' },
      ]
    }
  }, [selectedTemplate])
  
  const currentSectionId = sections[currentSection]?.id

  // Validation functions - using imported utilities

  const validateCurrentSection = () => {
    let newErrors = {}
    switch (currentSectionId) {
      case 'personal':
        newErrors = validatePersonal(resumeData.personalInfo)
        break
      case 'education':
        newErrors = validateEducation(resumeData.education)
        break
      case 'experience':
        newErrors = validateExperience(resumeData.experience)
        break
      case 'skills':
        newErrors = validateSkills(resumeData.skills, resumeData.tools, resumeData.languages, resumeData.certifications)
        break
      case 'projects':
        newErrors = validateProjects(resumeData.projects)
        break
      default:
        break
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Validate all sections before finishing (only sections in current template)
  const validateAllSections = () => {
    const allErrors = {}
    
    // Validate personal info (always present)
    const personalErrors = validatePersonal(resumeData.personalInfo)
    Object.assign(allErrors, personalErrors)
    
    // Validate education (always present)
    const educationErrors = validateEducation(resumeData.education)
    Object.assign(allErrors, educationErrors)
    
    // Validate experience (always present)
    const experienceErrors = validateExperience(resumeData.experience)
    Object.assign(allErrors, experienceErrors)
    
    // Validate skills (always present)
    const skillsErrors = validateSkills(resumeData.skills, resumeData.tools, resumeData.languages, resumeData.certifications)
    Object.assign(allErrors, skillsErrors)
    
    // Validate projects (only if in template)
    if (selectedTemplate !== 'corporate') {
      const projectsErrors = validateProjects(resumeData.projects)
      Object.assign(allErrors, projectsErrors)
    }
    
    return allErrors
  }

  const handleFinish = () => {
    const allErrors = validateAllSections()
    
    if (Object.keys(allErrors).length > 0) {
      // Find the first section with errors and navigate to it
      let sectionToNavigate = -1
      
      // Find section index by matching section ID
      if (allErrors.fullName || allErrors.email || allErrors.phone || allErrors.location) {
        sectionToNavigate = sections.findIndex(s => s.id === 'personal')
      }
      else if (allErrors.education_general || Object.keys(allErrors).some(key => key.startsWith('education_'))) {
        sectionToNavigate = sections.findIndex(s => s.id === 'education')
      }
      else if (allErrors.experience_general || Object.keys(allErrors).some(key => key.startsWith('experience_'))) {
        sectionToNavigate = sections.findIndex(s => s.id === 'experience')
      }
      else if (allErrors.skills_general || Object.keys(allErrors).some(key => key.startsWith('skill_'))) {
        sectionToNavigate = sections.findIndex(s => s.id === 'skills')
      }
      else if (allErrors.projects_general || Object.keys(allErrors).some(key => key.startsWith('project_'))) {
        sectionToNavigate = sections.findIndex(s => s.id === 'projects')
      }
      
      // Navigate to the section with errors
      if (sectionToNavigate >= 0 && sectionToNavigate !== currentSection) {
        setCurrentSection(sectionToNavigate)
      }
      
      // Show error message
      setErrors(allErrors)
      // Scroll to top to show error message
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      // All validations passed, proceed to finish
      setErrors({})
      if (onFinish) {
        onFinish()
      }
    }
  }

  const scrollToFirstError = (errors) => {
    // Wait a bit for errors to be set in state and DOM to update
    setTimeout(() => {
      // Find the first input/textarea field with error styling (border-red-500)
      const errorFields = document.querySelectorAll('input.border-red-500, textarea.border-red-500')
      
      if (errorFields.length > 0) {
        // Calculate offset to account for fixed header
        const headerHeight = 57 // Height of fixed header
        const elementTop = errorFields[0].getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementTop - headerHeight - 20 // 20px padding
        
        // Smooth scroll to the field with offset
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
        
        // Focus the field after a short delay to ensure scroll completes
        setTimeout(() => {
          errorFields[0].focus()
        }, 300)
        return
      }
      
      // Fallback: Find first error message element
      const firstErrorMsg = document.querySelector('.text-red-500, .bg-red-50')
      if (firstErrorMsg) {
        // Try to find the input/textarea near the error message
        const parentContainer = firstErrorMsg.closest('.flex-col, .bg-gray-50, .bg-white')
        if (parentContainer) {
          const inputField = parentContainer.querySelector('input, textarea')
          if (inputField) {
            const headerHeight = 57
            const elementTop = inputField.getBoundingClientRect().top + window.pageYOffset
            const offsetPosition = elementTop - headerHeight - 20
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            })
            
            setTimeout(() => {
              inputField.focus()
            }, 300)
            return
          }
        }
        
        // Scroll to error message
        const headerHeight = 57
        const elementTop = firstErrorMsg.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementTop - headerHeight - 20
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      } else {
        // Last resort: scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }, 200)
  }

  const nextSection = () => {
    // Validate current section - this sets errors and returns true/false
    let newErrors = {}
    switch (currentSectionId) {
      case 'personal':
        newErrors = validatePersonal(resumeData.personalInfo)
        break
      case 'education':
        newErrors = validateEducation(resumeData.education)
        break
      case 'experience':
        newErrors = validateExperience(resumeData.experience)
        break
      case 'skills':
        newErrors = validateSkills(resumeData.skills, resumeData.tools, resumeData.languages, resumeData.certifications)
        break
      case 'projects':
        newErrors = validateProjects(resumeData.projects)
        break
      default:
        break
    }
    
    // Set errors in state
    setErrors(newErrors)
    
    // Check if there are any errors - if yes, prevent navigation
    const hasErrors = Object.keys(newErrors).length > 0
    
    if (hasErrors) {
      // Scroll to first error field
      scrollToFirstError(newErrors)
      return // Prevent navigation - do not proceed to next section
    }
    
    // Only proceed if no errors (validation passed)
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1)
      setErrors({})
      // Scroll to top when moving to next section
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1)
      setErrors({})
      // Scroll to top when moving to previous section
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const goToSection = (index) => {
    if (setCurrentSection) {
      setCurrentSection(index)
    }
    setErrors({})
  }

  const renderSection = () => {
    switch (currentSectionId) {
      case 'personal':
        return (
          <PersonalInfoSection
            personalInfo={resumeData.personalInfo}
            summary={resumeData.summary}
            selectedTemplate={selectedTemplate}
            errors={errors}
            updatePersonalInfo={updatePersonalInfo}
            updateSummary={updateSummary}
            setErrors={setErrors}
          />
        )

      case 'education':
        return (
          <EducationSection
            education={resumeData.education}
            errors={errors}
            addEducation={addEducation}
            updateEducation={updateEducation}
            removeEducation={removeEducation}
            setErrors={setErrors}
          />
        )

      case 'experience':
        return (
          <ExperienceSection
            experience={resumeData.experience}
            errors={errors}
            addExperience={addExperience}
            updateExperience={updateExperience}
            removeExperience={removeExperience}
            setErrors={setErrors}
          />
        )

      case 'skills':
        return (
          <SkillsSection
            skills={resumeData.skills}
            tools={resumeData.tools}
            languages={resumeData.languages}
            certifications={resumeData.certifications}
            selectedTemplate={selectedTemplate}
            errors={errors}
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
            setErrors={setErrors}
          />
        )

      case 'projects':
        return (
          <ProjectsSection
            projects={resumeData.projects}
            errors={errors}
            addProject={addProject}
            updateProject={updateProject}
            removeProject={removeProject}
            setErrors={setErrors}
          />
        )

      default:
        return null
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen py-6 sm:py-8 md:py-10 px-3 sm:px-4 md:px-6 lg:px-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto flex flex-col">
        {/* Current Section Content */}
        <div className="flex-1">
          {renderSection()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200 gap-3">
          <button
            onClick={currentSection === 0 ? onGoBack : prevSection}
            className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base font-medium transition-colors flex items-center gap-1.5 sm:gap-2 bg-black text-white hover:bg-gray-800 active:bg-gray-900"
          >
            <span className="text-base sm:text-lg">←</span>
            <span className="hidden sm:inline">Go Back</span>
            <span className="sm:hidden">Back</span>
          </button>
          {currentSection === sections.length - 1 ? (
            <button
              onClick={handleFinish}
              className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base font-medium transition-colors flex items-center gap-1.5 sm:gap-2 bg-green-600 text-white hover:bg-green-700 active:bg-green-800"
            >
              <span className="hidden xs:inline">Finish</span>
              <span className="text-base sm:text-lg">✓</span>
            </button>
          ) : (
            <button
              onClick={nextSection}
              className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base font-medium transition-colors flex items-center gap-1.5 sm:gap-2 bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"
            >
              <span>Next</span>
              <span className="text-base sm:text-lg">→</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ResumeForm
