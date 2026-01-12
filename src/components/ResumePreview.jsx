import { useRef } from 'react'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import ModernTemplate from './templates/ModernTemplate'
import ClassicTemplate from './templates/ClassicTemplate'
import MinimalTemplate from './templates/MinimalTemplate'
import ATSTemplate from './templates/ATSTemplate'
import TwoColumnTemplate from './templates/TwoColumnTemplate'
import CreativeTemplate from './templates/CreativeTemplate'
import CompactTemplate from './templates/CompactTemplate'
import ProfessionalTemplate from './templates/ProfessionalTemplate'
import Icon from './Icon'
import './ResumePreview.css'

const templates = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
  minimal: MinimalTemplate,
  ats: ATSTemplate,
  'two-column': TwoColumnTemplate,
  creative: CreativeTemplate,
  compact: CompactTemplate,
  professional: ProfessionalTemplate,
}

function ResumePreview({ resumeData, template }) {
  const resumeRef = useRef(null)
  const TemplateComponent = templates[template] || ModernTemplate

  const downloadPDF = async () => {
    if (!resumeRef.current) return

    try {
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      })

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      })

      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = canvas.width
      const imgHeight = canvas.height
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
      const imgScaledWidth = imgWidth * ratio
      const imgScaledHeight = imgHeight * ratio
      const xOffset = (pdfWidth - imgScaledWidth) / 2
      const yOffset = (pdfHeight - imgScaledHeight) / 2

      pdf.addImage(imgData, 'PNG', xOffset, yOffset, imgScaledWidth, imgScaledHeight)
      pdf.save(`${resumeData.personalInfo.fullName || 'resume'}-resume.pdf`)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Error generating PDF. Please try again.')
    }
  }

  return (
    <div className="resume-preview">
      <div className="preview-header">
        <h2>Preview</h2>
        <button onClick={downloadPDF} className="btn-primary">
          <Icon name="download" className="btn-icon" />
          Download PDF
        </button>
      </div>
      <div className="preview-container">
        <div ref={resumeRef} className="resume-content">
          <TemplateComponent resumeData={resumeData} />
        </div>
      </div>
    </div>
  )
}

export default ResumePreview
