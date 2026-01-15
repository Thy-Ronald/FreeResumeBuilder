import { textColors } from '../../../../constants/colors'

/**
 * Color Selection Modal Component
 * @param {boolean} isOpen - Whether the modal is open
 * @param {Function} onClose - Function to close the modal
 * @param {string} selectedColor - Currently selected color scheme ID
 * @param {Function} onSelectColor - Function to select a color scheme
 */
export default function ColorModal({ isOpen, onClose, selectedColor, onSelectColor }) {
  if (!isOpen) return null

  const handleSelectColor = (colorId) => {
    onSelectColor(colorId)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-white rounded-lg sm:rounded-xl shadow-xl p-4 sm:p-5 md:p-6 max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-3 sm:mb-4 md:mb-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Select Text Color Scheme</h2>
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
          Choose a color scheme for your resume. The selected colors will be applied to all text elements.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
          {textColors.map((colorScheme) => (
            <button
              key={colorScheme.id}
              onClick={() => handleSelectColor(colorScheme.id)}
              className={`relative p-3 sm:p-4 border-2 rounded-lg text-left transition-all duration-200 ${
                selectedColor === colorScheme.id
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 truncate">{colorScheme.name}</h3>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1 line-clamp-2">{colorScheme.description}</p>
                </div>
                {selectedColor === colorScheme.id && (
                  <div className="bg-blue-500 text-white w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center flex-shrink-0 ml-2">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div 
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded border border-gray-300 flex-shrink-0"
                    style={{ backgroundColor: colorScheme.colors.primary }}
                  ></div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] sm:text-xs text-gray-600">Primary</div>
                    <div className="text-[9px] sm:text-xs font-mono text-gray-500 truncate">{colorScheme.colors.primary}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div 
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded border border-gray-300 flex-shrink-0"
                    style={{ backgroundColor: colorScheme.colors.secondary }}
                  ></div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] sm:text-xs text-gray-600">Secondary</div>
                    <div className="text-[9px] sm:text-xs font-mono text-gray-500 truncate">{colorScheme.colors.secondary}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div 
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded border border-gray-300 flex-shrink-0"
                    style={{ backgroundColor: colorScheme.colors.tertiary }}
                  ></div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] sm:text-xs text-gray-600">Tertiary</div>
                    <div className="text-[9px] sm:text-xs font-mono text-gray-500 truncate">{colorScheme.colors.tertiary}</div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
