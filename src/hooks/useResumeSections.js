import { useState, useEffect, useMemo, useCallback } from 'react'

/**
 * Get sections for a given template
 * @param {string} template - Template ID
 * @returns {Array} Array of section objects
 */
const getSectionsForTemplate = (template) => {
  const baseSections = [
    { id: 'personal', label: 'Personal Info', icon: 'user' },
    { id: 'education', label: 'Education', icon: 'education' },
    { id: 'experience', label: 'Experience', icon: 'briefcase' },
  ]
  
  if (template === 'corporate') {
    return [
      ...baseSections,
      { id: 'skills', label: 'Skills & More', icon: 'skills' },
    ]
  } else {
    return [
      ...baseSections,
      { id: 'skills', label: 'Skills & More', icon: 'skills' },
      { id: 'projects', label: 'Projects', icon: 'project' },
    ]
  }
}

/**
 * Custom hook for managing resume section navigation
 * @param {string} selectedTemplate - Currently selected template
 * @param {Object} resumeData - Resume data object
 * @param {Object} handlers - Object containing add functions for each section type
 * @returns {Object} Section navigation state and functions
 */
export function useResumeSections(selectedTemplate, resumeData, handlers) {
  const [currentSection, setCurrentSection] = useState(() => {
    try {
      const saved = localStorage.getItem('resumeBuilder_currentSection')
      return saved ? parseInt(saved, 10) : 0
    } catch (error) {
      return 0
    }
  })

  // Save currentSection to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('resumeBuilder_currentSection', currentSection.toString())
    } catch (error) {
      console.error('Error saving current section to localStorage:', error)
    }
  }, [currentSection])

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  // Reset current section when template changes to prevent out-of-bounds
  useEffect(() => {
    const sections = getSectionsForTemplate(selectedTemplate)
    if (currentSection >= sections.length) {
      setCurrentSection(0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTemplate])

  // Ensure all sections have at least one entry when accessed
  useEffect(() => {
    const sections = getSectionsForTemplate(selectedTemplate)
    const currentSectionId = sections[currentSection]?.id
    
    if (currentSectionId === 'experience' && resumeData.experience.length === 0) {
      handlers.addExperience()
    } else if (currentSectionId === 'education' && resumeData.education.length === 0) {
      handlers.addEducation()
    } else if (currentSectionId === 'skills') {
      // Skills section includes skills, tools, languages, and certifications
      if (resumeData.skills.length === 0) {
        handlers.addSkill()
      }
      if (resumeData.tools.length === 0) {
        handlers.addTool()
      }
      if (resumeData.languages.length === 0) {
        handlers.addLanguage()
      }
      if (resumeData.certifications.length === 0) {
        handlers.addCertification()
      }
    } else if (currentSectionId === 'projects' && resumeData.projects.length === 0) {
      handlers.addProject()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSection, selectedTemplate])

  const sections = useMemo(() => getSectionsForTemplate(selectedTemplate), [selectedTemplate])
  const progress = useMemo(() => ((currentSection + 1) / sections.length) * 100, [currentSection, sections.length])

  const goToSection = useCallback((index) => {
    setCurrentSection(index)
  }, [])

  // Check if form has any input data
  const hasFormData = useMemo(() => {
    // Check personal info
    const hasPersonalInfo = Object.values(resumeData.personalInfo).some(value => 
      value && value.toString().trim() !== ''
    )
    
    // Check summary
    const hasSummary = resumeData.summary && resumeData.summary.trim() !== ''
    
    // Check arrays
    const hasArrays = 
      resumeData.experience.length > 0 ||
      resumeData.education.length > 0 ||
      resumeData.skills.length > 0 ||
      resumeData.tools.length > 0 ||
      resumeData.languages.length > 0 ||
      resumeData.certifications.length > 0 ||
      resumeData.projects.length > 0
    
    return hasPersonalInfo || hasSummary || hasArrays
  }, [resumeData])

  return {
    currentSection,
    setCurrentSection,
    sections,
    progress,
    goToSection,
    hasFormData,
  }
}
