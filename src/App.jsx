import { useState } from 'react'
import TemplateSelection from './features/template/TemplateSelection'
import ResumeBuilder from './features/resume/ResumeBuilder'

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [templateColors, setTemplateColors] = useState({})

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

  if (!selectedTemplate) {
    return (
      <TemplateSelection 
        onSelectTemplate={setSelectedTemplate} 
        templateColors={templateColors}
        onTemplateColorChange={handleTemplateColorChange}
        getTemplateColor={getTemplateColor}
      />
    )
  }

  return (
    <ResumeBuilder 
      selectedTemplate={selectedTemplate} 
      themeColor={getTemplateColorWithDefault(selectedTemplate)} 
      onBack={() => setSelectedTemplate(null)} 
    />
  )
}

export default App
