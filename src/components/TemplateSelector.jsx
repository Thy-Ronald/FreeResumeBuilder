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
        fullName: 'Ronald Moran Jr',
        email: 'ronald.moran@example.com',
        phone: '+1 (555) 000-0000',
        location: 'New York, NY',
        linkedin: 'linkedin.com/in/ronaldmoran',
        github: 'github.com/ronaldmoran',
      },
      summary: 'Experienced software engineer with 10+ years of expertise in full-stack development, cloud architecture, and team leadership. Proven track record of delivering scalable solutions that drive business growth. Passionate about clean code, best practices, and mentoring the next generation of developers. Expert in microservices, API design, and modern JavaScript frameworks.',
      experience: [
        {
          id: 1,
          position: 'Senior Software Engineer',
          company: 'Tech Corp',
          location: 'New York, NY',
          startDate: '2020',
          endDate: 'Present',
          current: true,
          description: 'Led development of microservices architecture serving 2M+ daily active users\nArchitected and implemented scalable REST APIs reducing latency by 50%\nMentored team of 6 junior developers and conducted code reviews\nImplemented CI/CD pipelines reducing deployment time from 2 hours to 15 minutes\nCollaborated with product managers to define technical requirements and roadmaps\nOptimized application performance resulting in 40% reduction in server costs\nEstablished coding standards and best practices adopted across engineering teams',
        },
        {
          id: 2,
          position: 'Software Engineer',
          company: 'StartupXYZ',
          location: 'San Francisco, CA',
          startDate: '2018',
          endDate: '2020',
          current: false,
          description: 'Developed responsive web applications using React, Node.js, and PostgreSQL\nBuilt real-time features using WebSockets and Redis\nOptimized database queries improving page load time by 40%\nParticipated in agile sprints and daily standups\nWrote comprehensive unit and integration tests achieving 85% code coverage\nImplemented authentication and authorization systems\nCollaborated with DevOps team on infrastructure improvements',
        },
      ],
      education: [
        {
          id: 1,
          degree: 'Bachelor of Science',
          school: 'State University',
          field: 'Computer Science',
          location: 'New York, NY',
          startDate: '2012',
          endDate: '2016',
          gpa: '3.8',
        },
        {
          id: 2,
          degree: 'High School Diploma',
          school: 'Lincoln High School',
          location: 'New York, NY',
          startDate: '2008',
          endDate: '2012',
        },
      ],
      skills: [
        { id: 1, name: 'JavaScript', level: 9 },
        { id: 2, name: 'TypeScript', level: 8 },
        { id: 3, name: 'React', level: 9 },
        { id: 4, name: 'Node.js', level: 8 },
        { id: 5, name: 'Python', level: 7 },
        { id: 6, name: 'AWS', level: 8 },
        { id: 7, name: 'Docker', level: 7 },
        { id: 8, name: 'PostgreSQL', level: 8 },
        { id: 9, name: 'Git', level: 9 },
        { id: 10, name: 'Agile/Scrum', level: 8 },
      ],
      projects: [
        {
          id: 1,
          name: 'E-Commerce Platform',
          technologies: 'React, Node.js, PostgreSQL, AWS, Stripe',
          description: 'Built full-stack e-commerce platform with payment integration\nHandled 10K+ concurrent users with 99.9% uptime\nImplemented real-time inventory management system\nIntegrated third-party shipping APIs for order fulfillment\nDeveloped admin dashboard for order and inventory management',
          link: 'https://example.com/ecommerce',
          github: 'github.com/ronaldmoran/ecommerce',
        },
        {
          id: 2,
          name: 'Task Management App',
          technologies: 'React, Express, MongoDB, Socket.io',
          description: 'Developed collaborative task management application with real-time updates\nImplemented user authentication and authorization\nCreated responsive design supporting mobile and desktop\nAdded file upload and sharing capabilities\nIntegrated email notifications for task assignments',
          link: 'https://example.com/tasks',
          github: 'github.com/ronaldmoran/tasks',
        },
        {
          id: 3,
          name: 'Analytics Dashboard',
          technologies: 'React, D3.js, Python, Flask',
          description: 'Created interactive data visualization dashboard\nBuilt RESTful API for data processing\nImplemented real-time data updates using WebSockets\nDesigned responsive charts and graphs\nExported reports in PDF and CSV formats',
          link: 'https://example.com/analytics',
          github: 'github.com/ronaldmoran/analytics',
        },
        {
          id: 4,
          name: 'Mobile Banking App',
          technologies: 'React Native, Node.js, PostgreSQL',
          description: 'Developed mobile banking application for iOS and Android\nImplemented secure authentication with biometric login\nBuilt transaction history and account management features\nIntegrated payment processing and money transfer functionality',
          github: 'github.com/ronaldmoran/banking-app',
        },
      ],
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
        fullName: 'Ronald Moran Jr',
        email: 'ronald.moran@example.com',
        phone: '+1 (555) 111-1111',
        location: 'San Francisco, CA',
        linkedin: 'linkedin.com/in/ronaldmoran',
        website: 'ronaldmoran.design',
      },
      summary: 'Creative product designer with 8+ years of experience crafting beautiful and intuitive user experiences. Specialized in mobile app design, design systems, and user research. Passionate about solving complex problems through thoughtful design and collaboration.',
      experience: [
        {
          id: 1,
          position: 'Senior Product Designer',
          company: 'Design Studio',
          location: 'San Francisco, CA',
          startDate: '2019',
          endDate: 'Present',
          current: true,
          description: 'Led design for flagship mobile app with 5M+ downloads\nCreated comprehensive design system used across 10+ products\nConducted user research and usability testing sessions\nCollaborated with engineers to ensure pixel-perfect implementation\nMentored 3 junior designers and established design best practices',
        },
        {
          id: 2,
          position: 'Product Designer',
          company: 'Tech Startup',
          location: 'San Francisco, CA',
          startDate: '2017',
          endDate: '2019',
          current: false,
          description: 'Designed user interfaces for web and mobile applications\nCreated wireframes, prototypes, and high-fidelity mockups\nWorked closely with product managers to define features\nParticipated in design critiques and design sprints',
        },
      ],
      education: [
        {
          id: 1,
          degree: 'Master of Fine Arts',
          school: 'Design School',
          field: 'Interaction Design',
          location: 'San Francisco, CA',
          startDate: '2013',
          endDate: '2015',
          gpa: '3.9',
        },
        {
          id: 2,
          degree: 'Bachelor of Arts',
          school: 'State University',
          field: 'Graphic Design',
          location: 'Los Angeles, CA',
          startDate: '2009',
          endDate: '2013',
        },
      ],
      skills: [
        { id: 1, name: 'UI/UX Design', level: 10 },
        { id: 2, name: 'Figma', level: 10 },
        { id: 3, name: 'Sketch', level: 9 },
        { id: 4, name: 'Adobe XD', level: 8 },
        { id: 5, name: 'Prototyping', level: 9 },
        { id: 6, name: 'User Research', level: 8 },
        { id: 7, name: 'Design Systems', level: 9 },
        { id: 8, name: 'Illustration', level: 7 },
      ],
      projects: [
        {
          id: 1,
          name: 'Mobile Banking App',
          technologies: 'Figma, Principle, After Effects',
          description: 'Designed complete mobile banking experience from scratch\nCreated comprehensive design system with 50+ components\nConducted user testing with 20+ participants\nAchieved 4.8/5 app store rating\nDesigned onboarding flow reducing drop-off rate by 40%',
          link: 'https://example.com/banking-app',
        },
        {
          id: 2,
          name: 'E-Commerce Platform Redesign',
          technologies: 'Sketch, InVision, Zeplin',
          description: 'Redesigned entire e-commerce platform improving conversion by 35%\nCreated responsive designs for all device sizes\nCollaborated with developers throughout implementation\nImproved checkout flow reducing cart abandonment\nDesigned product detail pages with enhanced imagery',
          link: 'https://example.com/ecommerce-redesign',
        },
        {
          id: 3,
          name: 'Healthcare Dashboard',
          technologies: 'Figma, React, Storybook',
          description: 'Designed patient management dashboard for healthcare providers\nCreated data visualization components for medical metrics\nConducted usability testing with healthcare professionals\nEnsured HIPAA compliance in design decisions',
          link: 'https://example.com/healthcare-dashboard',
        },
        {
          id: 4,
          name: 'SaaS Admin Panel',
          technologies: 'Figma, Adobe XD',
          description: 'Designed comprehensive admin panel for SaaS platform\nCreated user management and analytics interfaces\nDeveloped design system for consistent UI\nImproved task completion time by 50%',
        },
      ],
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
        fullName: 'Ronald Moran Jr',
        email: 'ronald.moran@example.com',
        phone: '+1 (555) 222-2222',
        location: 'Chicago, IL',
        linkedin: 'linkedin.com/in/ronaldmoran',
      },
      summary: 'Results-driven business analyst with 10+ years of experience in financial services, process optimization, and data-driven decision making. Expert in requirements gathering, stakeholder management, and translating business needs into technical solutions. Strong analytical skills and proven ability to deliver projects on time and within budget.',
      experience: [
        {
          id: 1,
          position: 'Senior Business Analyst',
          company: 'Finance Inc',
          location: 'Chicago, IL',
          startDate: '2018',
          endDate: 'Present',
          current: true,
          description: 'Lead business analysis for enterprise-wide digital transformation initiatives\nGather and document requirements from stakeholders across multiple departments\nCreate detailed process flows, user stories, and acceptance criteria\nFacilitate workshops and meetings with cross-functional teams\nAnalyze data to identify trends and provide actionable insights\nManage project timelines and coordinate with development teams',
        },
        {
          id: 2,
          position: 'Business Analyst',
          company: 'Investment Bank',
          location: 'Chicago, IL',
          startDate: '2015',
          endDate: '2018',
          current: false,
          description: 'Analyzed business processes and identified improvement opportunities\nCreated comprehensive requirement documents and specifications\nWorked with development teams to ensure accurate implementation\nConducted user acceptance testing and training sessions\nPrepared executive reports and presentations',
        },
      ],
      education: [
        {
          id: 1,
          degree: 'Master of Business Administration',
          school: 'Business School',
          field: 'Finance',
          location: 'Chicago, IL',
          startDate: '2011',
          endDate: '2013',
          gpa: '3.9',
        },
        {
          id: 2,
          degree: 'Bachelor of Science',
          school: 'State University',
          field: 'Business Administration',
          location: 'Chicago, IL',
          startDate: '2007',
          endDate: '2011',
          gpa: '3.7',
        },
      ],
      skills: [
        { id: 1, name: 'Data Analysis', level: 10 },
        { id: 2, name: 'Excel', level: 10 },
        { id: 3, name: 'SQL', level: 8 },
        { id: 4, name: 'Tableau', level: 9 },
        { id: 5, name: 'Requirements Gathering', level: 10 },
        { id: 6, name: 'Process Mapping', level: 9 },
        { id: 7, name: 'Stakeholder Management', level: 9 },
        { id: 8, name: 'Project Management', level: 8 },
      ],
      projects: [
        {
          id: 1,
          name: 'Digital Transformation Initiative',
          technologies: 'SQL, Tableau, JIRA, Confluence',
          description: 'Led business analysis for $5M digital transformation project\nDocumented 200+ requirements across 15 business processes\nReduced manual processing time by 60%\nImproved data accuracy by 45%\nCoordinated with 5 development teams across 3 time zones',
        },
        {
          id: 2,
          name: 'Customer Portal Redesign',
          technologies: 'Figma, JIRA, Excel',
          description: 'Analyzed user needs and created requirements for new customer portal\nConducted 30+ stakeholder interviews\nCreated detailed user stories and acceptance criteria\nProject resulted in 40% increase in customer satisfaction\nReduced support tickets by 35%',
        },
        {
          id: 3,
          name: 'Process Automation Project',
          technologies: 'Visio, Excel, SharePoint',
          description: 'Identified automation opportunities in manual processes\nDocumented current state and future state processes\nCreated business case for automation initiative\nReduced processing time by 70%\nEliminated 3 manual steps from workflow',
        },
        {
          id: 4,
          name: 'Data Migration Analysis',
          technologies: 'SQL, Excel, Access',
          description: 'Analyzed data migration requirements for system upgrade\nMapped data fields between old and new systems\nCreated data validation rules\nEnsured 100% data accuracy in migration',
        },
      ],
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
        fullName: 'Ronald Moran Jr',
        email: 'ronald.moran@example.com',
        phone: '+1 (555) 333-3333',
        location: 'Boston, MA',
        linkedin: 'linkedin.com/in/ronaldmoran',
        github: 'github.com/ronaldmoran',
      },
      summary: 'Results-driven software engineer with 6+ years of experience building scalable web applications and cloud infrastructure. Expert in Java, Python, and modern JavaScript frameworks. Proven track record of delivering high-quality software solutions that drive business value. Strong problem-solving skills and passion for continuous learning.',
      experience: [
        {
          id: 1,
          position: 'Senior Software Engineer',
          company: 'Tech Solutions',
          location: 'Boston, MA',
          startDate: '2019',
          endDate: 'Present',
          current: true,
          description: 'Developed and maintained microservices architecture serving 3M+ users\nBuilt RESTful APIs using Java Spring Boot and Python Django\nOptimized database queries reducing response time by 55%\nImplemented automated testing achieving 90% code coverage\nLed code reviews and mentored 4 junior developers\nCollaborated with DevOps team to improve CI/CD pipelines',
        },
        {
          id: 2,
          position: 'Software Engineer',
          company: 'Software Corp',
          location: 'Boston, MA',
          startDate: '2017',
          endDate: '2019',
          current: false,
          description: 'Developed web applications using Java, Spring Framework, and MySQL\nCreated responsive frontend components using React and Redux\nWrote unit and integration tests using JUnit and Mockito\nParticipated in agile development process and sprint planning\nFixed bugs and implemented new features based on requirements',
        },
      ],
      education: [
        {
          id: 1,
          degree: 'Bachelor of Science',
          school: 'State University',
          field: 'Computer Science',
          location: 'Boston, MA',
          startDate: '2012',
          endDate: '2016',
          gpa: '3.8',
        },
      ],
      skills: [
        { id: 1, name: 'Java', level: 9 },
        { id: 2, name: 'Python', level: 8 },
        { id: 3, name: 'JavaScript', level: 8 },
        { id: 4, name: 'SQL', level: 9 },
        { id: 5, name: 'Spring Boot', level: 8 },
        { id: 6, name: 'React', level: 7 },
        { id: 7, name: 'AWS', level: 7 },
        { id: 8, name: 'Docker', level: 7 },
        { id: 9, name: 'Git', level: 9 },
        { id: 10, name: 'Agile/Scrum', level: 8 },
      ],
      projects: [
        {
          id: 1,
          name: 'E-Commerce Platform',
          technologies: 'Java, Spring Boot, React, PostgreSQL, AWS',
          description: 'Built full-stack e-commerce application with payment integration\nImplemented microservices architecture with 10+ services\nHandled 50K+ daily transactions with 99.9% uptime\nIntegrated Stripe payment gateway and email notifications\nDeveloped admin dashboard for order management\nImplemented recommendation engine increasing sales by 25%',
          link: 'https://example.com/ecommerce',
          github: 'github.com/ronaldmoran/ecommerce',
        },
        {
          id: 2,
          name: 'Task Management API',
          technologies: 'Python, Django, PostgreSQL, Redis',
          description: 'Developed RESTful API for task management system\nImplemented real-time notifications using WebSockets\nCreated comprehensive API documentation\nAchieved sub-100ms average response time\nBuilt authentication and authorization system\nIntegrated with third-party calendar services',
          github: 'github.com/ronaldmoran/task-api',
        },
        {
          id: 3,
          name: 'Analytics Service',
          technologies: 'Java, Spring Boot, Kafka, Elasticsearch',
          description: 'Built real-time analytics service processing 1M+ events daily\nImplemented event streaming using Apache Kafka\nCreated dashboards for data visualization\nReduced data processing time by 60%',
          github: 'github.com/ronaldmoran/analytics',
        },
        {
          id: 4,
          name: 'API Gateway',
          technologies: 'Java, Spring Cloud Gateway, Redis',
          description: 'Developed API gateway handling 100K+ requests per minute\nImplemented rate limiting and authentication\nCreated monitoring and logging system\nImproved API response time by 35%',
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
        fullName: 'Ronald Moran Jr',
        email: 'ronald.moran@example.com',
        phone: '+1 (555) 444-4444',
        location: 'Seattle, WA',
        linkedin: 'linkedin.com/in/ronaldmoran',
        website: 'ronaldmoran.com',
      },
      summary: 'Strategic marketing professional with 9+ years of experience driving growth through data-driven campaigns and brand development. Expert in digital marketing, SEO, content strategy, and team leadership. Proven track record of increasing brand awareness, generating leads, and driving revenue growth.',
      experience: [
        {
          id: 1,
          position: 'Senior Marketing Manager',
          company: 'Digital Agency',
          location: 'Seattle, WA',
          startDate: '2020',
          endDate: 'Present',
          current: true,
          description: 'Led marketing campaigns and brand strategy for 20+ clients\nManaged team of 8 marketing specialists across multiple channels\nIncreased brand awareness by 40% through integrated campaigns\nDeveloped and executed content marketing strategy\nAnalyzed campaign performance and optimized ROI\nManaged $2M+ annual marketing budget',
        },
        {
          id: 2,
          position: 'Marketing Manager',
          company: 'Tech Startup',
          location: 'Seattle, WA',
          startDate: '2018',
          endDate: '2020',
          current: false,
          description: 'Developed and executed marketing strategies for B2B SaaS product\nManaged social media presence across 5 platforms\nCreated content calendar and produced blog posts\nRan paid advertising campaigns on Google and LinkedIn\nIncreased qualified leads by 60%',
        },
      ],
      education: [
        {
          id: 1,
          degree: 'Master of Business Administration',
          school: 'Business University',
          field: 'Marketing',
          location: 'Seattle, WA',
          startDate: '2013',
          endDate: '2015',
          gpa: '3.9',
        },
        {
          id: 2,
          degree: 'Bachelor of Arts',
          school: 'State University',
          field: 'Communications',
          location: 'Portland, OR',
          startDate: '2009',
          endDate: '2013',
        },
      ],
      skills: [
        { id: 1, name: 'Marketing Strategy', level: 10 },
        { id: 2, name: 'SEO', level: 9 },
        { id: 3, name: 'Analytics', level: 9 },
        { id: 4, name: 'Content Marketing', level: 9 },
        { id: 5, name: 'Social Media', level: 9 },
        { id: 6, name: 'Email Marketing', level: 8 },
        { id: 7, name: 'Google Ads', level: 8 },
        { id: 8, name: 'Team Leadership', level: 9 },
      ],
      projects: [
        {
          id: 1,
          name: 'Brand Rebranding Campaign',
          technologies: 'Google Analytics, Facebook Ads, Mailchimp',
          description: 'Led complete brand rebranding for major client\nIncreased brand recognition by 50%\nGenerated 10K+ new leads\nWon industry award for best campaign\nCreated brand guidelines and style guide\nExecuted multi-channel campaign across 10+ platforms',
        },
        {
          id: 2,
          name: 'Content Marketing Program',
          technologies: 'WordPress, HubSpot, SEMrush',
          description: 'Developed comprehensive content marketing strategy\nPublished 100+ blog posts\nIncreased organic traffic by 200%\nGenerated $500K in qualified leads\nCreated content calendar and editorial process\nManaged team of 5 content writers',
        },
        {
          id: 3,
          name: 'Social Media Growth Campaign',
          technologies: 'Hootsuite, Canva, Sprout Social',
          description: 'Grew social media following from 10K to 100K followers\nIncreased engagement rate by 300%\nCreated viral content reaching 1M+ impressions\nDeveloped influencer partnership program',
        },
        {
          id: 4,
          name: 'SEO Optimization Project',
          technologies: 'SEMrush, Ahrefs, Google Search Console',
          description: 'Improved website ranking for 50+ target keywords\nIncreased organic traffic by 150%\nOptimized 200+ pages for search engines\nCreated link building strategy',
        },
      ],
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
        fullName: 'Ronald Moran Jr',
        email: 'ronald.moran@example.com',
        phone: '+1 (555) 555-5555',
        location: 'Los Angeles, CA',
        linkedin: 'linkedin.com/in/ronaldmoran',
        website: 'ronaldmoran.design',
      },
      summary: 'Award-winning creative director with 12+ years of experience in brand design, visual identity, and creative strategy. Passionate about creating memorable brand experiences that resonate with audiences. Expert in leading creative teams and delivering projects that exceed client expectations. Winner of 8 design awards including Cannes Lions and D&AD.',
      experience: [
        {
          id: 1,
          position: 'Creative Director',
          company: 'Design Studio',
          location: 'Los Angeles, CA',
          startDate: '2019',
          endDate: 'Present',
          current: true,
          description: 'Led creative team of 12 designers and art directors\nOversaw design projects from concept to completion for Fortune 500 clients\nDeveloped brand identities and visual systems for 50+ brands\nWon 3 design awards in 2023 including Cannes Lions\nManaged creative budget of $3M+ annually\nPresented creative concepts to C-level executives',
        },
        {
          id: 2,
          position: 'Senior Art Director',
          company: 'Advertising Agency',
          location: 'Los Angeles, CA',
          startDate: '2016',
          endDate: '2019',
          current: false,
          description: 'Created visual concepts for print, digital, and TV campaigns\nCollaborated with copywriters and account managers\nDirected photo and video shoots\nDeveloped brand guidelines and style guides\nWon 2 Clio Awards for outstanding creative work',
        },
      ],
      education: [
        {
          id: 1,
          degree: 'Bachelor of Fine Arts',
          school: 'Art Institute',
          field: 'Graphic Design',
          location: 'Los Angeles, CA',
          startDate: '2009',
          endDate: '2013',
          gpa: '3.9',
        },
      ],
      skills: [
        { id: 1, name: 'Brand Design', level: 10 },
        { id: 2, name: 'Illustration', level: 9 },
        { id: 3, name: 'Typography', level: 10 },
        { id: 4, name: 'Adobe Creative Suite', level: 10 },
        { id: 5, name: 'Figma', level: 9 },
        { id: 6, name: 'Art Direction', level: 10 },
        { id: 7, name: 'Creative Strategy', level: 9 },
        { id: 8, name: 'Team Leadership', level: 9 },
      ],
      projects: [
        {
          id: 1,
          name: 'Global Brand Identity',
          technologies: 'Adobe Illustrator, Photoshop, InDesign',
          description: 'Created complete brand identity for international tech company\nDesigned logo, color palette, typography, and brand guidelines\nDeveloped visual system used across 20+ countries\nWon Cannes Lions award for brand identity\nCreated comprehensive brand guidelines document\nDesigned marketing materials and digital assets',
          link: 'https://example.com/brand-identity',
        },
        {
          id: 2,
          name: 'Packaging Design Collection',
          technologies: 'Adobe Illustrator, C4D',
          description: 'Designed packaging for premium product line\nCreated 3D mockups and renderings\nCollaborated with manufacturers on production\nIncreased sales by 35%\nDeveloped sustainable packaging solutions\nCreated unboxing experience design',
          link: 'https://example.com/packaging',
        },
        {
          id: 3,
          name: 'Advertising Campaign',
          technologies: 'Adobe Creative Suite, After Effects',
          description: 'Created multi-channel advertising campaign for major brand\nDesigned print ads, digital banners, and social media content\nDeveloped video concepts and storyboards\nCampaign reached 50M+ impressions\nWon D&AD award for creative excellence',
        },
        {
          id: 4,
          name: 'Website Redesign',
          technologies: 'Figma, Adobe XD, Sketch',
          description: 'Redesigned website for Fortune 500 company\nCreated responsive design for all devices\nImproved user experience and conversion rates\nIncreased website traffic by 60%\nDeveloped design system for consistency',
        },
      ],
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
        fullName: 'Ronald Moran Jr',
        email: 'ronald.moran@example.com',
        phone: '+1 (555) 666-6666',
        location: 'Austin, TX',
        linkedin: 'linkedin.com/in/ronaldmoran',
        github: 'github.com/ronaldmoran',
      },
      summary: 'Results-oriented data analyst with 5+ years of experience transforming complex datasets into actionable insights. Expert in statistical analysis, data visualization, and predictive modeling. Strong background in Python, SQL, and business intelligence tools. Proven ability to communicate findings to stakeholders and drive data-driven decision making.',
      experience: [
        {
          id: 1,
          position: 'Senior Data Analyst',
          company: 'Tech Company',
          location: 'Austin, TX',
          startDate: '2021',
          endDate: 'Present',
          current: true,
          description: 'Analyzed large datasets to drive business decisions and strategy\nBuilt predictive models using machine learning algorithms\nCreated interactive dashboards in Tableau and Power BI\nPresented insights to executive leadership team\nReduced operational costs by 15% through data-driven recommendations\nMentored 2 junior analysts and established best practices',
        },
        {
          id: 2,
          position: 'Data Analyst',
          company: 'E-Commerce Platform',
          location: 'Austin, TX',
          startDate: '2019',
          endDate: '2021',
          current: false,
          description: 'Analyzed customer behavior and purchase patterns\nCreated reports and visualizations for marketing team\nOptimized A/B tests improving conversion rate by 12%\nWrote SQL queries to extract and transform data\nCollaborated with data engineers on ETL processes',
        },
      ],
      education: [
        {
          id: 1,
          degree: 'Bachelor of Science',
          school: 'State College',
          field: 'Statistics',
          location: 'Austin, TX',
          startDate: '2014',
          endDate: '2018',
          gpa: '3.8',
        },
      ],
      skills: [
        { id: 1, name: 'Python', level: 9 },
        { id: 2, name: 'R', level: 8 },
        { id: 3, name: 'SQL', level: 9 },
        { id: 4, name: 'Tableau', level: 9 },
        { id: 5, name: 'Power BI', level: 8 },
        { id: 6, name: 'Excel', level: 10 },
        { id: 7, name: 'Machine Learning', level: 7 },
        { id: 8, name: 'Statistical Analysis', level: 9 },
      ],
      projects: [
        {
          id: 1,
          name: 'Customer Churn Prediction Model',
          technologies: 'Python, Scikit-learn, Pandas, Matplotlib',
          description: 'Built predictive model to identify customers at risk of churning\nAchieved 85% accuracy in predictions\nReduced churn rate by 20% through targeted interventions\nCreated dashboard for business stakeholders\nImplemented model in production environment\nMonitored model performance and retrained quarterly',
          github: 'github.com/ronaldmoran/churn-model',
        },
        {
          id: 2,
          name: 'Sales Performance Dashboard',
          technologies: 'Tableau, SQL, Excel',
          description: 'Developed comprehensive sales performance dashboard\nTracked KPIs across multiple regions\nEnabled real-time decision making\nIncreased sales team productivity by 25%\nCreated automated data refresh process\nAdded drill-down capabilities for detailed analysis',
        },
        {
          id: 3,
          name: 'Market Segmentation Analysis',
          technologies: 'Python, K-means, Pandas',
          description: 'Performed customer segmentation using clustering algorithms\nIdentified 5 distinct customer segments\nDeveloped targeted marketing strategies for each segment\nIncreased marketing ROI by 30%\nCreated visualizations for stakeholder presentation',
        },
        {
          id: 4,
          name: 'Revenue Forecasting Model',
          technologies: 'Python, Time Series, Prophet',
          description: 'Built time series forecasting model for revenue prediction\nAchieved 92% accuracy in quarterly forecasts\nHelped company plan budgets and resources\nCreated interactive dashboard for executives\nUpdated model monthly with new data',
        },
      ],
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
        fullName: 'Ronald Moran Jr',
        title: 'Software Engineer',
        email: 'ronald.moran@example.com',
        phone: '+1 (555) 777-7777',
        location: '30400 42nd Ave SW, Seattle, WA 98136, United States',
      },
      summary: 'Experienced software engineer with 7+ years developing scalable web applications. Proficient in full-stack development, cloud infrastructure, and agile methodologies. Dedicated to writing clean, maintainable code and delivering high-quality solutions. Strong background in microservices architecture, API design, and team leadership.',
      experience: [
        {
          id: 1,
          position: 'Senior Software Engineer',
          company: 'Tech Innovations Inc',
          location: 'Seattle',
          startDate: 'AUGUST 2020',
          endDate: 'PRESENT',
          current: true,
          description: 'Led development of microservices architecture serving 1M+ users\nReduced API response time by 40% through optimization\nMentored team of 4 junior developers\nImplemented CI/CD pipelines reducing deployment time by 60%\nCollaborated with product managers to define technical requirements\nArchitected scalable solutions handling 10K+ requests per second',
        },
        {
          id: 2,
          position: 'Software Engineer',
          company: 'StartupXYZ',
          location: 'Seattle',
          startDate: 'AUGUST 2018',
          endDate: 'AUGUST 2020',
          current: false,
          description: 'Built RESTful APIs using Node.js and Express\nDeveloped responsive frontend with React and TypeScript\nCollaborated with product team to deliver features on time\nOptimized database queries improving performance by 35%\nImplemented automated testing achieving 80% code coverage',
        },
      ],
      education: [
        {
          id: 1,
          degree: 'Bachelor of Science',
          school: 'State University',
          location: 'Seattle',
          field: 'Computer Science',
          startDate: 'AUGUST 2012',
          endDate: 'MAY 2016',
          gpa: 'High Honors',
        },
        {
          id: 2,
          degree: 'High School Diploma',
          school: 'Lincoln High School',
          location: 'Seattle',
          startDate: 'SEPTEMBER 2008',
          endDate: 'MAY 2012',
        },
      ],
      skills: [
        { id: 1, name: 'JavaScript', level: 9 },
        { id: 2, name: 'TypeScript', level: 8 },
        { id: 3, name: 'React', level: 9 },
        { id: 4, name: 'Node.js', level: 8 },
        { id: 5, name: 'Python', level: 7 },
        { id: 6, name: 'AWS', level: 8 },
        { id: 7, name: 'Docker', level: 7 },
        { id: 8, name: 'PostgreSQL', level: 8 },
        { id: 9, name: 'Git', level: 9 },
        { id: 10, name: 'Agile/Scrum', level: 8 },
      ],
      projects: [
        {
          id: 1,
          name: 'E-Commerce Platform',
          technologies: 'React, Node.js, PostgreSQL, AWS',
          description: 'Built full-stack e-commerce platform with payment integration\nHandled 10K+ concurrent users with 99.9% uptime\nImplemented real-time inventory management system\nIntegrated Stripe payment gateway and email notifications\nDeveloped admin dashboard for order management\nImplemented recommendation engine',
        },
        {
          id: 2,
          name: 'Task Management API',
          technologies: 'Node.js, Express, MongoDB, Redis',
          description: 'Developed RESTful API for task management system\nImplemented real-time updates using WebSockets\nCreated comprehensive API documentation\nAchieved sub-100ms average response time\nBuilt authentication and authorization system\nIntegrated with calendar services',
        },
        {
          id: 3,
          name: 'Real-Time Chat Application',
          technologies: 'React, Node.js, Socket.io, MongoDB',
          description: 'Built real-time chat application with multiple rooms\nImplemented user authentication and presence\nCreated message history and search functionality\nSupported file sharing and emoji reactions',
        },
        {
          id: 4,
          name: 'Analytics Dashboard',
          technologies: 'React, D3.js, Python, Flask',
          description: 'Created interactive data visualization dashboard\nBuilt RESTful API for data processing\nImplemented real-time data updates\nDesigned responsive charts and graphs\nExported reports in multiple formats',
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
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TemplateSelector
