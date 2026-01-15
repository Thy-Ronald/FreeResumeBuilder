import { fonts } from '../../../../constants/fonts'

/**
 * Font Selection Modal Component
 * @param {boolean} isOpen - Whether the modal is open
 * @param {Function} onClose - Function to close the modal
 * @param {string} selectedFont - Currently selected font ID
 * @param {Function} onSelectFont - Function to select a font
 */
export default function FontModal({ isOpen, onClose, selectedFont, onSelectFont }) {
  if (!isOpen) return null

  const handleSelectFont = (fontId) => {
    onSelectFont(fontId)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-white rounded-lg sm:rounded-xl shadow-xl p-4 sm:p-5 md:p-6 max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-3 sm:mb-4 md:mb-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Select Font Style</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0 p-1"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-3 sm:mb-4 md:mb-6">
          Choose a font style for your resume. The selected font will be applied to all text elements.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
          {fonts.map((font) => (
            <button
              key={font.id}
              onClick={() => handleSelectFont(font.id)}
              className={`relative p-3 sm:p-4 border-2 rounded-lg text-left transition-all duration-200 ${
                selectedFont === font.id
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900" style={{ fontFamily: font.family }}>
                  {font.name}
                </h3>
                {selectedFont === font.id && (
                  <div className="bg-blue-500 text-white w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="text-xs sm:text-sm text-gray-600" style={{ fontFamily: font.family }}>
                The quick brown fox jumps over the lazy dog
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
