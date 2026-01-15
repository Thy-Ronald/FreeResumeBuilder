import { useState, useRef, useCallback } from 'react'

/**
 * Custom hook for managing PDF generation state and download functionality
 * @returns {Object} PDF generation state and functions
 */
export function usePDFGeneration() {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const downloadPDFRef = useRef(null)

  const handleDownloadPDF = useCallback(async (onSuccess) => {
    if (!downloadPDFRef.current) return
    
    setIsGeneratingPDF(true)
    try {
      await downloadPDFRef.current()
      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Error generating PDF. Please try again.')
      throw error
    } finally {
      setIsGeneratingPDF(false)
    }
  }, [])

  const setDownloadFunction = useCallback((downloadFn) => {
    downloadPDFRef.current = downloadFn
  }, [])

  return {
    isGeneratingPDF,
    handleDownloadPDF,
    setDownloadFunction,
    downloadPDFRef, // Exposed for direct access if needed
  }
}
