import { useState, lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useParams, useNavigate } from 'react-router-dom'
import ErrorBoundary from './components/common/ErrorBoundary'
import LandingPage from './features/landing/LandingPage'

// Lazy load heavy components for better performance
const TemplateSelection = lazy(() => import('./features/template/TemplateSelection'))
const ResumeBuilder = lazy(() => import('./features/resume/ResumeBuilder'))

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
)

// Template Colors Context Component
function TemplateColorsProvider({ children }) {
  const [templateColors, setTemplateColors] = useState(() => {
    // Load from localStorage on mount
    const saved = localStorage.getItem('resumeBuilder_templateColors')
    return saved ? JSON.parse(saved) : {}
  })

  useEffect(() => {
    // Save to localStorage whenever templateColors changes
    localStorage.setItem('resumeBuilder_templateColors', JSON.stringify(templateColors))
  }, [templateColors])

  const handleTemplateColorChange = (templateId, color) => {
    setTemplateColors(prev => ({
      ...prev,
      [templateId]: color
    }))
  }

  const getTemplateColor = (templateId) => {
    return templateColors[templateId] || null
  }

  const getTemplateColorWithDefault = (templateId) => {
    return templateColors[templateId] || '#F2F2F2'
  }

  return children({
    templateColors,
    onTemplateColorChange: handleTemplateColorChange,
    getTemplateColor,
    getTemplateColorWithDefault
  })
}

// Landing Page Route Component
function LandingPageRoute() {
  const navigate = useNavigate()
  return <LandingPage onGetStarted={() => navigate('/templates')} />
}

// Template Selection Route Component
function TemplateSelectionRoute() {
  const navigate = useNavigate()
  return (
    <TemplateColorsProvider>
      {({ templateColors, onTemplateColorChange, getTemplateColor }) => (
        <TemplateSelection 
          onSelectTemplate={(templateId) => navigate(`/builder/${templateId}`)} 
          templateColors={templateColors}
          onTemplateColorChange={onTemplateColorChange}
          getTemplateColor={getTemplateColor}
        />
      )}
    </TemplateColorsProvider>
  )
}

// Resume Builder Route Component
function ResumeBuilderRoute() {
  const { templateId } = useParams()
  const navigate = useNavigate()
  
  return (
    <TemplateColorsProvider>
      {({ templateColors, onTemplateColorChange, getTemplateColor, getTemplateColorWithDefault }) => (
        <ResumeBuilder 
          selectedTemplate={templateId || 'modern'} 
          themeColor={getTemplateColorWithDefault(templateId || 'modern')} 
          onBack={() => navigate('/templates')}
          templateColors={templateColors}
          onTemplateColorChange={onTemplateColorChange}
          getTemplateColor={getTemplateColor}
        />
      )}
    </TemplateColorsProvider>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<LandingPageRoute />} />
          <Route 
            path="/templates" 
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <TemplateSelectionRoute />
              </Suspense>
            } 
          />
          <Route 
            path="/builder/:templateId" 
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <ResumeBuilderRoute />
              </Suspense>
            } 
          />
          {/* Redirect any unknown routes to home */}
          <Route path="*" element={<LandingPageRoute />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  )
}

export default App
