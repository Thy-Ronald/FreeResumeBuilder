import ResumePreview from '../ResumePreview'

/**
 * Preview Modal Component
 * @param {boolean} isOpen - Whether the modal is open
 * @param {Function} onClose - Function to close the modal
 * @param {Object} resumeData - Resume data object
 * @param {string} selectedTemplate - Currently selected template
 * @param {string} selectedFont - Currently selected font
 * @param {string} selectedColor - Currently selected color scheme
 * @param {string} themeColor - Current theme color
 * @param {Function} onDownloadReady - Callback when download function is ready
 */
export default function PreviewModal({
  isOpen,
  onClose,
  resumeData,
  selectedTemplate,
  selectedFont,
  selectedColor,
  themeColor,
  onDownloadReady,
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-3 md:p-4">
      <div className="bg-white rounded-lg sm:rounded-xl shadow-xl w-full h-full sm:h-auto sm:max-w-4xl sm:max-h-[95vh] md:max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-2.5 sm:p-3 md:p-4 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">Resume Preview</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0 p-1"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-auto p-2 sm:p-3 md:p-4 lg:p-6 bg-gray-50 flex items-center justify-center min-h-0">
          <div className="w-full h-full flex justify-center items-center">
            {/* Scaled preview wrapper - scales for display but resume is always 816x1056px at 1:1 */}
            {/* The ResumePreview component always renders at exact 816x1056px internally */}
            <div className="transform scale-[0.4] sm:scale-[0.5] md:scale-[0.6] lg:scale-[0.65] xl:scale-[0.7] origin-center">
              {/* Actual resume content - always 816x1056px (US Letter at 96 DPI) for pixel-perfect WYSIWYG */}
              <ResumePreview
                resumeData={resumeData}
                selectedTemplate={selectedTemplate}
                selectedFont={selectedFont}
                selectedColor={selectedColor}
                themeColor={themeColor}
                inModal={true}
                onDownloadReady={onDownloadReady}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
