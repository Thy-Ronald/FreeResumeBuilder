const iconMap = {
  email: 'fi-rr-envelope',
  phone: 'fi-rr-phone-call',
  location: 'fi-rr-marker',
  linkedin: 'fi-brands-linkedin',
  github: 'fi-brands-github',
  link: 'fi-rr-link',
  download: 'fi-rr-download',
  template: 'fi-rr-layout-fluid',
  user: 'fi-rr-user',
  education: 'fi-rr-graduation-cap',
  briefcase: 'fi-rr-briefcase',
  skills: 'fi-rr-settings',
  project: 'fi-rr-folder',
  preview: 'fi-rr-eye',
  arrowLeft: 'fi-rr-arrow-left',
  arrowRight: 'fi-rr-arrow-right',
  chevronLeft: 'fi-rr-angle-left',
  chevronRight: 'fi-rr-angle-right',
  font: 'fi-rr-text',
  file: 'fi-rr-file',
  palette: 'fi-rr-palette',
}

function Icon({ name, className = '' }) {
  const iconClass = iconMap[name] || ''
  return <i className={`fi ${iconClass} ${className}`}></i>
}

export default Icon
