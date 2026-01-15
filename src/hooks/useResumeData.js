import { useState, useEffect, useCallback } from 'react'
import { initialResumeData } from '../constants/resume'

/**
 * Custom hook for managing resume data state and localStorage persistence
 * @returns {Object} Resume data state and update functions
 */
export function useResumeData() {
  // Load saved data from localStorage on mount
  const [resumeData, setResumeData] = useState(() => {
    try {
      const saved = localStorage.getItem('resumeBuilder_resumeData')
      if (saved) {
        const parsed = JSON.parse(saved)
        // Ensure all array sections have at least one default entry
        if (!parsed.experience || parsed.experience.length === 0) {
          parsed.experience = [{
            id: Date.now(),
            company: '',
            position: '',
            location: '',
            startDate: '',
            endDate: '',
            current: false,
            description: '',
          }]
        }
        if (!parsed.education || parsed.education.length === 0) {
          parsed.education = [{
            id: Date.now(),
            school: '',
            degree: '',
            field: '',
            location: '',
            startDate: '',
            endDate: '',
            gpa: '',
          }]
        }
        if (!parsed.skills || parsed.skills.length === 0) {
          parsed.skills = [{ id: Date.now(), name: '', level: 5 }]
        }
        if (!parsed.tools || parsed.tools.length === 0) {
          parsed.tools = [{ id: Date.now(), name: '' }]
        }
        if (!parsed.languages || parsed.languages.length === 0) {
          parsed.languages = [{ id: Date.now(), name: '', proficiency: 'Fluent' }]
        }
        if (!parsed.certifications || parsed.certifications.length === 0) {
          parsed.certifications = [{ id: Date.now(), name: '', issuer: '', date: '' }]
        }
        if (!parsed.projects || parsed.projects.length === 0) {
          parsed.projects = [{
            id: Date.now(),
            name: '',
            description: '',
            technologies: '',
            link: '',
            github: '',
          }]
        }
        return parsed
      }
      return initialResumeData
    } catch (error) {
      console.error('Error loading resume data from localStorage:', error)
      return initialResumeData
    }
  })

  // Save resumeData to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('resumeBuilder_resumeData', JSON.stringify(resumeData))
    } catch (error) {
      console.error('Error saving resume data to localStorage:', error)
    }
  }, [resumeData])

  // Update functions
  const updatePersonalInfo = useCallback((field, value) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }))
  }, [])

  const updateSummary = useCallback((value) => {
    setResumeData(prev => ({ ...prev, summary: value }))
  }, [])

  // Experience handlers
  const addExperience = useCallback(() => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, {
        id: Date.now(),
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
      }]
    }))
  }, [])

  const updateExperience = useCallback((id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }))
  }, [])

  const removeExperience = useCallback((id) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }))
  }, [])

  // Education handlers
  const addEducation = useCallback(() => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, {
        id: Date.now(),
        school: '',
        degree: '',
        field: '',
        location: '',
        startDate: '',
        endDate: '',
        gpa: '',
      }]
    }))
  }, [])

  const updateEducation = useCallback((id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }))
  }, [])

  const removeEducation = useCallback((id) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }))
  }, [])

  // Skills handlers
  const addSkill = useCallback(() => {
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, { id: Date.now(), name: '', level: 5 }]
    }))
  }, [])

  const updateSkill = useCallback((id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map(skill =>
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    }))
  }, [])

  const removeSkill = useCallback((id) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }))
  }, [])

  // Projects handlers
  const addProject = useCallback(() => {
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, {
        id: Date.now(),
        name: '',
        description: '',
        technologies: '',
        link: '',
        github: '',
      }]
    }))
  }, [])

  const updateProject = useCallback((id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map(project =>
        project.id === id ? { ...project, [field]: value } : project
      )
    }))
  }, [])

  const removeProject = useCallback((id) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter(project => project.id !== id)
    }))
  }, [])

  // Tools handlers
  const addTool = useCallback(() => {
    setResumeData(prev => ({
      ...prev,
      tools: [...prev.tools, { id: Date.now(), name: '' }]
    }))
  }, [])

  const updateTool = useCallback((id, value) => {
    setResumeData(prev => ({
      ...prev,
      tools: prev.tools.map(tool =>
        tool.id === id ? { ...tool, name: value } : tool
      )
    }))
  }, [])

  const removeTool = useCallback((id) => {
    setResumeData(prev => ({
      ...prev,
      tools: prev.tools.filter(tool => tool.id !== id)
    }))
  }, [])

  // Languages handlers
  const addLanguage = useCallback(() => {
    setResumeData(prev => ({
      ...prev,
      languages: [...prev.languages, { id: Date.now(), name: '', proficiency: 'Fluent' }]
    }))
  }, [])

  const updateLanguage = useCallback((id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      languages: prev.languages.map(lang =>
        lang.id === id ? { ...lang, [field]: value } : lang
      )
    }))
  }, [])

  const removeLanguage = useCallback((id) => {
    setResumeData(prev => ({
      ...prev,
      languages: prev.languages.filter(lang => lang.id !== id)
    }))
  }, [])

  // Certifications handlers
  const addCertification = useCallback(() => {
    setResumeData(prev => ({
      ...prev,
      certifications: [...prev.certifications, { id: Date.now(), name: '', issuer: '', date: '' }]
    }))
  }, [])

  const updateCertification = useCallback((id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.map(cert =>
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    }))
  }, [])

  const removeCertification = useCallback((id) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(cert => cert.id !== id)
    }))
  }, [])

  // Reset function to clear all form data
  const resetResumeData = useCallback(() => {
    const resetData = {
      personalInfo: {
        fullName: '',
        title: '',
        email: '',
        phone: '',
        location: '',
        linkedin: '',
        github: '',
        website: '',
        profilePhoto: '',
      },
      summary: '',
      experience: [{
        id: Date.now(),
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
      }],
      education: [{
        id: Date.now(),
        school: '',
        degree: '',
        field: '',
        location: '',
        startDate: '',
        endDate: '',
        gpa: '',
      }],
      skills: [{ id: Date.now(), name: '', level: 5 }],
      tools: [{ id: Date.now(), name: '' }],
      languages: [{ id: Date.now(), name: '', proficiency: 'Fluent' }],
      certifications: [{ id: Date.now(), name: '', issuer: '', date: '' }],
      projects: [{
        id: Date.now(),
        name: '',
        description: '',
        technologies: '',
        link: '',
        github: '',
      }],
    }
    setResumeData(resetData)
    // Clear localStorage
    try {
      localStorage.removeItem('resumeBuilder_resumeData')
    } catch (error) {
      console.error('Error clearing resume data from localStorage:', error)
    }
  }, [])

  return {
    resumeData,
    setResumeData,
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
    addProject,
    updateProject,
    removeProject,
    addTool,
    updateTool,
    removeTool,
    addLanguage,
    updateLanguage,
    removeLanguage,
    addCertification,
    updateCertification,
    removeCertification,
    resetResumeData,
  }
}
