/**
 * Default/placeholder resume data for previews and templates
 * Used to show sample content when user hasn't filled in their data
 */

export const defaultSkills = [
  { id: 1, name: 'JavaScript' },
  { id: 2, name: 'Python' },
  { id: 3, name: 'TypeScript' },
  { id: 4, name: 'React' },
  { id: 5, name: 'Node.js' },
  { id: 6, name: 'SQL' },
  { id: 7, name: 'Problem Solving' },
  { id: 8, name: 'System Design' },
]

export const defaultTools = [
  { id: 1, name: 'Git' },
  { id: 2, name: 'Docker' },
  { id: 3, name: 'AWS' },
  { id: 4, name: 'PostgreSQL' },
  { id: 5, name: 'MongoDB' },
  { id: 6, name: 'Jest' },
  { id: 7, name: 'Webpack' },
]

export const defaultLanguages = [
  { id: 1, name: 'English', proficiency: 'Native' },
  { id: 2, name: 'Spanish', proficiency: 'Fluent' },
  { id: 3, name: 'French', proficiency: 'Intermediate' },
]

export const defaultCertifications = [
  { id: 1, name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', date: 'Jan 2023' },
  { id: 2, name: 'Google Cloud Professional', issuer: 'Google Cloud Platform', date: 'Mar 2022' },
]

export const defaultExperience = [
  {
    id: 1,
    position: 'Senior Software Engineer',
    company: 'Tech Company Inc.',
    location: 'San Francisco, CA',
    startDate: 'Jan 2021',
    endDate: null,
    current: true,
    description: 'Led development of microservices architecture serving 2M+ daily active users, reducing latency by 40%\nArchitected and implemented real-time data processing pipeline handling 50K requests/second\nMentored team of 5 junior engineers, establishing code review practices and technical standards\nOptimized database queries and caching strategies, improving API response time by 60%\nCollaborated with product and design teams to deliver features increasing user engagement by 25%',
  },
  {
    id: 2,
    position: 'Software Engineer',
    company: 'Startup Solutions',
    location: 'New York, NY',
    startDate: 'Jun 2019',
    endDate: 'Dec 2020',
    current: false,
    description: 'Developed full-stack web applications using React, Node.js, and PostgreSQL\nBuilt RESTful APIs and GraphQL endpoints supporting mobile and web clients\nImplemented automated testing suite achieving 85% code coverage, reducing production bugs by 50%\nDeployed applications on AWS using Docker and Kubernetes, ensuring 99.9% uptime',
  },
]

export const defaultEducation = [
  {
    id: 1,
    degree: 'Bachelor of Science in Computer Science',
    school: 'State University',
    field: 'Computer Science',
    location: 'City, State',
    startDate: 'Aug 2016',
    endDate: 'May 2020',
    gpa: '3.8',
  },
]

export const defaultProjects = [
  {
    id: 1,
    name: 'E-Commerce Platform',
    technologies: 'React, Node.js, MongoDB',
    description: 'Built scalable e-commerce platform with payment integration and inventory management\nImplemented real-time order tracking and notification system using WebSockets\nOptimized database queries and caching, reducing page load time by 45%',
    link: 'github.com/username/ecommerce',
    github: null,
  },
  {
    id: 2,
    name: 'Task Management App',
    technologies: 'Vue.js, Express, PostgreSQL',
    description: 'Developed collaborative task management application with real-time updates\nDesigned RESTful API architecture supporting 10K+ concurrent users',
    link: null,
    github: 'github.com/username/taskapp',
  },
]

export const defaultSummary = 'Experienced software engineer with 5+ years of expertise in full-stack development, specializing in modern web technologies and cloud infrastructure. Proven track record of delivering scalable applications serving millions of users. Strong background in system architecture, performance optimization, and agile methodologies. Passionate about writing clean, maintainable code and mentoring junior developers to build high-performing engineering teams.'

export const defaultPersonalInfo = {
  fullName: 'Ronald Moran Jr',
  title: 'Software Engineer',
  email: 'email@example.com',
  phone: '+63 912 345 6789',
  location: 'San Francisco, CA',
  linkedin: 'linkedin.com/in/username',
  github: 'github.com/username',
  profilePhoto: null,
}
