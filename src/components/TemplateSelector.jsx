import { useState } from 'react'
import './TemplateSelector.css'
import Icon from './Icon'
import MinimalTemplate from './templates/MinimalTemplate'
import ModernTemplate from './templates/ModernTemplate'
import ClassicTemplate from './templates/ClassicTemplate'
import ATSTemplate from './templates/ATSTemplate'
import TwoColumnTemplate from './templates/TwoColumnTemplate'
import CreativeTemplate from './templates/CreativeTemplate'
import CompactTemplate from './templates/CompactTemplate'
import ProfessionalTemplate from './templates/ProfessionalTemplate'

const templateCategories = [
  { id: 'all', label: 'All templates' },
  { id: 'simple', label: 'Simple' },
  { id: 'modern', label: 'Modern' },
  { id: 'classic', label: 'Classic' },
  { id: 'ats', label: 'ATS' },
  { id: 'two-column', label: 'Two-column' },
  { id: 'creative', label: 'Creative' },
]

const templates = [
  {
    id: 'minimal',
    name: 'Minimal',
    category: 'simple',
    description: 'Clean and simple design',
    preview: MinimalTemplate,
    previewData: {
      personalInfo: {
        fullName: 'John Doe',
        email: 'john@example.com',
        phone: '+1 (555) 000-0000',
        location: 'New York, NY',
      },
      summary: 'Experienced professional with a strong background in...',
      experience: [
        {
          id: 1,
          position: 'Senior Developer',
          company: 'Tech Corp',
          startDate: '2020',
          endDate: 'Present',
          current: true,
          description: 'Led development of key features...',
        },
      ],
      education: [
        {
          id: 1,
          degree: 'Bachelor\'s Degree',
          school: 'University',
          startDate: '2016',
          endDate: '2020',
        },
      ],
      skills: [
        { id: 1, name: 'JavaScript', level: 8 },
        { id: 2, name: 'React', level: 9 },
      ],
      projects: [],
    },
  },
  {
    id: 'modern',
    name: 'Modern',
    category: 'modern',
    description: 'Colorful and bold design',
    preview: ModernTemplate,
    previewData: {
      personalInfo: {
        fullName: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+1 (555) 111-1111',
        location: 'San Francisco, CA',
      },
      summary: 'Creative professional with expertise in...',
      experience: [
        {
          id: 1,
          position: 'Product Designer',
          company: 'Design Studio',
          startDate: '2019',
          endDate: 'Present',
          current: true,
          description: 'Designed user interfaces for mobile apps...',
        },
      ],
      education: [
        {
          id: 1,
          degree: 'Master\'s Degree',
          school: 'Design School',
          startDate: '2017',
          endDate: '2019',
        },
      ],
      skills: [
        { id: 1, name: 'UI/UX Design', level: 10 },
        { id: 2, name: 'Figma', level: 9 },
      ],
      projects: [],
    },
  },
  {
    id: 'classic',
    name: 'Classic',
    category: 'classic',
    description: 'Traditional professional format',
    preview: ClassicTemplate,
    previewData: {
      personalInfo: {
        fullName: 'Robert Johnson',
        email: 'robert@example.com',
        phone: '+1 (555) 222-2222',
        location: 'Chicago, IL',
      },
      summary: 'Dedicated professional with extensive experience...',
      experience: [
        {
          id: 1,
          position: 'Business Analyst',
          company: 'Finance Inc',
          startDate: '2018',
          endDate: 'Present',
          current: true,
          description: 'Analyzed business processes and requirements...',
        },
      ],
      education: [
        {
          id: 1,
          degree: 'MBA',
          school: 'Business School',
          startDate: '2016',
          endDate: '2018',
        },
      ],
      skills: [
        { id: 1, name: 'Data Analysis', level: 9 },
        { id: 2, name: 'Excel', level: 10 },
      ],
      projects: [],
    },
  },
  {
    id: 'ats',
    name: 'ATS Friendly',
    category: 'ats',
    description: 'Optimized for applicant tracking systems',
    preview: ATSTemplate,
    previewData: {
      personalInfo: {
        fullName: 'Michael Chen',
        email: 'michael@example.com',
        phone: '+1 (555) 333-3333',
        location: 'Boston, MA',
      },
      summary: 'Results-driven professional with proven track record in...',
      experience: [
        {
          id: 1,
          position: 'Software Engineer',
          company: 'Tech Solutions',
          startDate: '2019',
          endDate: 'Present',
          current: true,
          description: 'Developed and maintained web applications using modern technologies.\nCollaborated with cross-functional teams to deliver high-quality software.\nImplemented best practices for code quality and performance optimization.',
        },
      ],
      education: [
        {
          id: 1,
          degree: 'Bachelor of Science',
          school: 'State University',
          field: 'Computer Science',
          startDate: '2015',
          endDate: '2019',
          gpa: '3.8',
        },
      ],
      skills: [
        { id: 1, name: 'Java', level: 9 },
        { id: 2, name: 'Python', level: 8 },
        { id: 3, name: 'SQL', level: 9 },
        { id: 4, name: 'Git', level: 8 },
      ],
      projects: [
        {
          id: 1,
          name: 'E-Commerce Platform',
          technologies: 'React, Node.js, MongoDB',
          description: 'Built a full-stack e-commerce application with payment integration.',
        },
      ],
    },
  },
  {
    id: 'two-column',
    name: 'Two Column',
    category: 'two-column',
    description: 'Sidebar layout with color accent',
    preview: TwoColumnTemplate,
    previewData: {
      personalInfo: {
        fullName: 'Sarah Williams',
        email: 'sarah@example.com',
        phone: '+1 (555) 444-4444',
        location: 'Seattle, WA',
      },
      summary: 'Experienced professional with expertise in...',
      experience: [
        {
          id: 1,
          position: 'Marketing Manager',
          company: 'Digital Agency',
          startDate: '2020',
          endDate: 'Present',
          current: true,
          description: 'Led marketing campaigns and brand strategy.\nManaged team of 5 marketing specialists.\nIncreased brand awareness by 40%.',
        },
      ],
      education: [
        {
          id: 1,
          degree: 'Master of Business',
          school: 'Business University',
          startDate: '2018',
          endDate: '2020',
        },
      ],
      skills: [
        { id: 1, name: 'Marketing Strategy', level: 9 },
        { id: 2, name: 'SEO', level: 8 },
        { id: 3, name: 'Analytics', level: 9 },
      ],
      projects: [],
    },
  },
  {
    id: 'creative',
    name: 'Creative',
    category: 'creative',
    description: 'Bold design with gradient header',
    preview: CreativeTemplate,
    previewData: {
      personalInfo: {
        fullName: 'Alex Martinez',
        email: 'alex@example.com',
        phone: '+1 (555) 555-5555',
        location: 'Los Angeles, CA',
      },
      summary: 'Creative professional with a passion for design and innovation...',
      experience: [
        {
          id: 1,
          position: 'Creative Director',
          company: 'Design Studio',
          startDate: '2019',
          endDate: 'Present',
          current: true,
          description: 'Led creative team in developing brand identities.\nOversaw design projects from concept to completion.\nWon 3 design awards in 2023.',
        },
      ],
      education: [
        {
          id: 1,
          degree: 'Bachelor of Fine Arts',
          school: 'Art Institute',
          startDate: '2015',
          endDate: '2019',
        },
      ],
      skills: [
        { id: 1, name: 'Brand Design', level: 10 },
        { id: 2, name: 'Illustration', level: 9 },
        { id: 3, name: 'Typography', level: 9 },
      ],
      projects: [],
    },
  },
  {
    id: 'compact',
    name: 'Compact',
    category: 'simple',
    description: 'Space-efficient layout',
    preview: CompactTemplate,
    previewData: {
      personalInfo: {
        fullName: 'David Kim',
        email: 'david@example.com',
        phone: '+1 (555) 666-6666',
        location: 'Austin, TX',
      },
      summary: 'Results-oriented professional with strong analytical skills...',
      experience: [
        {
          id: 1,
          position: 'Data Analyst',
          company: 'Tech Company',
          startDate: '2021',
          endDate: 'Present',
          current: true,
          description: 'Analyzed large datasets to drive business decisions.',
        },
      ],
      education: [
        {
          id: 1,
          degree: 'BS in Statistics',
          school: 'State College',
          startDate: '2017',
          endDate: '2021',
        },
      ],
      skills: [
        { id: 1, name: 'Python', level: 9 },
        { id: 2, name: 'R', level: 8 },
        { id: 3, name: 'SQL', level: 9 },
        { id: 4, name: 'Tableau', level: 8 },
      ],
      projects: [],
    },
  },
  {
    id: 'professional',
    name: 'Professional',
    category: 'ats',
    description: 'Space-efficient ATS-friendly layout',
    preview: ProfessionalTemplate,
    previewData: {
      personalInfo: {
        fullName: 'Emily Rodriguez',
        email: 'emily@example.com',
        phone: '+1 (555) 777-7777',
        location: 'Denver, CO',
      },
      summary: 'Experienced software engineer with 5+ years developing scalable web applications. Proficient in full-stack development, cloud infrastructure, and agile methodologies.',
      experience: [
        {
          id: 1,
          position: 'Senior Software Engineer',
          company: 'Tech Innovations Inc',
          startDate: '2020',
          endDate: 'Present',
          current: true,
          description: 'Led development of microservices architecture serving 1M+ users\nReduced API response time by 40% through optimization\nMentored team of 4 junior developers\nImplemented CI/CD pipelines reducing deployment time by 60%',
        },
        {
          id: 2,
          position: 'Software Engineer',
          company: 'StartupXYZ',
          startDate: '2018',
          endDate: '2020',
          current: false,
          description: 'Built RESTful APIs using Node.js and Express\nDeveloped responsive frontend with React and TypeScript\nCollaborated with product team to deliver features on time',
        },
      ],
      education: [
        {
          id: 1,
          degree: 'Bachelor of Science',
          school: 'State University',
          field: 'Computer Science',
          startDate: '2014',
          endDate: '2018',
          gpa: '3.7',
        },
      ],
      skills: [
        { id: 1, name: 'JavaScript', level: 9 },
        { id: 2, name: 'TypeScript', level: 8 },
        { id: 3, name: 'React', level: 9 },
        { id: 4, name: 'Node.js', level: 8 },
        { id: 5, name: 'Python', level: 7 },
        { id: 6, name: 'AWS', level: 8 },
      ],
      projects: [
        {
          id: 1,
          name: 'E-Commerce Platform',
          technologies: 'React, Node.js, PostgreSQL, AWS',
          description: 'Built full-stack e-commerce platform with payment integration\nHandled 10K+ concurrent users with 99.9% uptime\nImplemented real-time inventory management system',
        },
      ],
    },
  },
]

function TemplateSelector({ selectedTemplate, onSelectTemplate, onSkip }) {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredTemplates =
    activeCategory === 'all'
      ? templates
      : templates.filter((t) => t.category === activeCategory)

  return (
    <div className="template-selector-page">
      <div className="template-selector-header">
        <div className="header-left">
          <div className="logo">
            <Icon name="project" className="logo-icon" />
            <span className="logo-text">Resume Builder</span>
          </div>
        </div>
        <div className="header-center">
          <h1>Please choose a template</h1>
        </div>
        <div className="header-right">
          {onSkip && (
            <button onClick={onSkip} className="skip-button">
              Skip
            </button>
          )}
        </div>
      </div>

      <div className="template-filters">
        {templateCategories.map((category) => (
          <button
            key={category.id}
            className={`filter-button ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="template-grid">
        {filteredTemplates.map((template) => {
          const PreviewComponent = template.preview
          return (
            <div
              key={template.id}
              className={`template-card ${selectedTemplate === template.id ? 'selected' : ''}`}
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="template-preview-container">
                <div className="template-preview">
                  <PreviewComponent resumeData={template.previewData} />
                </div>
              </div>
              <div className="template-card-footer">
                <div className="template-info">
                  <h3>{template.name}</h3>
                  <p>{template.description}</p>
                </div>
                {selectedTemplate === template.id && (
                  <div className="template-checkmark">
                    <Icon name="preview" className="check-icon" />
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TemplateSelector
