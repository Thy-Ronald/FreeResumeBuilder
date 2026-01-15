import { useState, useCallback } from 'react'

/**
 * Custom hook for managing modal states
 * @returns {Object} Modal states and control functions
 */
export function useModals() {
  const [showDownloadModal, setShowDownloadModal] = useState(false)
  const [showTemplateModal, setShowTemplateModal] = useState(false)
  const [showFontModal, setShowFontModal] = useState(false)
  const [showColorModal, setShowColorModal] = useState(false)
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)

  const openDownloadModal = useCallback(() => setShowDownloadModal(true), [])
  const closeDownloadModal = useCallback(() => setShowDownloadModal(false), [])
  const openTemplateModal = useCallback(() => setShowTemplateModal(true), [])
  const closeTemplateModal = useCallback(() => setShowTemplateModal(false), [])
  const openFontModal = useCallback(() => setShowFontModal(true), [])
  const closeFontModal = useCallback(() => setShowFontModal(false), [])
  const openColorModal = useCallback(() => setShowColorModal(true), [])
  const closeColorModal = useCallback(() => setShowColorModal(false), [])
  const openPreviewModal = useCallback(() => setShowPreviewModal(true), [])
  const closePreviewModal = useCallback(() => setShowPreviewModal(false), [])
  const openSidebar = useCallback(() => setShowSidebar(true), [])
  const closeSidebar = useCallback(() => setShowSidebar(false), [])

  return {
    // States
    showDownloadModal,
    showTemplateModal,
    showFontModal,
    showColorModal,
    showPreviewModal,
    showSidebar,
    // Control functions
    openDownloadModal,
    closeDownloadModal,
    openTemplateModal,
    closeTemplateModal,
    openFontModal,
    closeFontModal,
    openColorModal,
    closeColorModal,
    openPreviewModal,
    closePreviewModal,
    openSidebar,
    closeSidebar,
    // Direct setters (for backward compatibility if needed)
    setShowDownloadModal,
    setShowTemplateModal,
    setShowFontModal,
    setShowColorModal,
    setShowPreviewModal,
    setShowSidebar,
  }
}
