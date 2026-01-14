/**
 * Validation utilities for resume form fields
 */

export const validatePersonal = (personalInfo) => {
  const errors = {}
  if (!personalInfo.fullName?.trim()) {
    errors.fullName = 'Full name is required'
  }
  if (!personalInfo.email?.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalInfo.email)) {
    errors.email = 'Please enter a valid email address'
  }
  if (!personalInfo.phone?.trim()) {
    errors.phone = 'Phone is required'
  }
  if (!personalInfo.location?.trim()) {
    errors.location = 'Location is required'
  }
  return errors
}

export const validateEducation = (education) => {
  const errors = {}
  if (education.length === 0) {
    errors.education_general = 'At least one education entry is required'
    return errors
  }
  education.forEach((edu) => {
    if (!edu.school?.trim()) {
      errors[`education_${edu.id}_school`] = 'School/University is required'
    }
    if (!edu.degree?.trim()) {
      errors[`education_${edu.id}_degree`] = 'Degree is required'
    }
    if (!edu.field?.trim()) {
      errors[`education_${edu.id}_field`] = 'Field of study is required'
    }
    if (!edu.startDate?.trim()) {
      errors[`education_${edu.id}_startDate`] = 'Start date is required'
    }
    if (!edu.endDate?.trim()) {
      errors[`education_${edu.id}_endDate`] = 'End date is required'
    }
  })
  return errors
}

export const validateExperience = (experience) => {
  const errors = {}
  if (experience.length === 0) {
    errors.experience_general = 'At least one experience entry is required'
    return errors
  }
  experience.forEach((exp) => {
    if (!exp.company?.trim()) {
      errors[`experience_${exp.id}_company`] = 'Company is required'
    }
    if (!exp.position?.trim()) {
      errors[`experience_${exp.id}_position`] = 'Position is required'
    }
    if (!exp.startDate?.trim()) {
      errors[`experience_${exp.id}_startDate`] = 'Start date is required'
    }
    if (!exp.current && !exp.endDate?.trim()) {
      errors[`experience_${exp.id}_endDate`] = 'End date is required (or check "Currently working here")'
    }
    if (!exp.description?.trim()) {
      errors[`experience_${exp.id}_description`] = 'Description is required'
    }
  })
  return errors
}

export const validateSkills = (skills, tools, languages, certifications) => {
  const errors = {}
  
  // Validate Skills
  if (skills.length === 0) {
    errors.skills_general = 'At least one skill is required'
    return errors
  }
  skills.forEach((skill) => {
    if (!skill.name?.trim()) {
      errors[`skill_${skill.id}`] = 'Skill name is required'
    }
  })
  
  // Validate Tools - if tools exist, each must have a name
  tools.forEach((tool) => {
    if (!tool.name?.trim()) {
      errors[`tool_${tool.id}`] = 'Tool name is required'
    }
  })
  
  // Validate Languages - if languages exist, each must have a name
  languages.forEach((lang) => {
    if (!lang.name?.trim()) {
      errors[`language_${lang.id}_name`] = 'Language name is required'
    }
  })
  
  // Validate Certifications - if certifications exist, each must have a name
  certifications.forEach((cert) => {
    if (!cert.name?.trim()) {
      errors[`certification_${cert.id}_name`] = 'Certification name is required'
    }
  })
  
  return errors
}

export const validateProjects = (projects) => {
  const errors = {}
  if (projects.length === 0) {
    errors.projects_general = 'At least one project is required'
    return errors
  }
  projects.forEach((project) => {
    if (!project.name?.trim()) {
      errors[`project_${project.id}_name`] = 'Project name is required'
    }
    if (!project.description?.trim()) {
      errors[`project_${project.id}_description`] = 'Project description is required'
    }
  })
  return errors
}
