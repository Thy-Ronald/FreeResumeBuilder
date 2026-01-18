import { useState, useRef, useEffect } from 'react'

/**
 * Custom Select Dropdown Component
 * Always opens downward and provides full control over positioning
 */
export default function CustomSelect({
  value,
  onChange,
  options = [],
  placeholder = 'Select an option',
  className = '',
  error = false,
  groups = null, // For optgroup support: [{ label: 'Group', options: ['opt1', 'opt2'] }]
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const selectRef = useRef(null)
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false)
        setSearchTerm('')
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false)
        setSearchTerm('')
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen])

  const handleSelect = (optionValue) => {
    onChange(optionValue)
    setIsOpen(false)
    setSearchTerm('')
  }

  const displayValue = value || placeholder

  // Filter options based on search term
  const filteredGroups = groups
    ? groups.map((group) => ({
        ...group,
        options: group.options.filter((opt) =>
          typeof opt === 'string'
            ? opt.toLowerCase().includes(searchTerm.toLowerCase())
            : opt.value.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      }))
    : null

  const filteredOptions = groups
    ? null
    : options.filter((opt) =>
        typeof opt === 'string'
          ? opt.toLowerCase().includes(searchTerm.toLowerCase())
          : opt.value.toLowerCase().includes(searchTerm.toLowerCase())
      )

  return (
    <div className="relative w-full" ref={selectRef}>
      {/* Select Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-3 py-2.5 border rounded-lg text-sm text-left bg-white focus:outline-none focus:ring-2 flex items-center justify-between ${
          error
            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
            : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
        } ${value ? 'text-gray-900' : 'text-gray-500'} ${className}`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
          backgroundPosition: 'right 0.5rem center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '1.5em 1.5em',
          paddingRight: '2.5rem'
        }}
      >
        <span className="truncate">{displayValue}</span>
      </button>

      {/* Dropdown Menu - Always opens downward */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto"
          style={{ zIndex: 1000 }}
        >
          {/* Search input for long lists */}
          {(groups || options.length > 10) && (
            <div className="p-2 border-b border-gray-200 sticky top-0 bg-white">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}

          {/* Options List */}
          <div className="py-1">
            {groups ? (
              // Render with groups
              filteredGroups.map((group, groupIndex) => (
                <div key={groupIndex}>
                  {group.options.length > 0 && (
                    <>
                      <div className="px-3 py-2 text-xs font-semibold text-gray-500 bg-gray-50 sticky top-0">
                        {group.label}
                      </div>
                      {group.options.map((option, optIndex) => {
                        const optValue = typeof option === 'string' ? option : option.value
                        const optLabel = typeof option === 'string' ? option : option.label
                        return (
                          <button
                            key={optIndex}
                            type="button"
                            onClick={() => handleSelect(optValue)}
                            className={`w-full text-left px-3 py-2 text-sm hover:bg-blue-50 ${
                              value === optValue ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                            }`}
                          >
                            {optLabel}
                          </button>
                        )
                      })}
                    </>
                  )}
                </div>
              ))
            ) : (
              // Render without groups
              filteredOptions.length > 0 ? (
                filteredOptions.map((option, index) => {
                  const optValue = typeof option === 'string' ? option : option.value
                  const optLabel = typeof option === 'string' ? option : option.label
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSelect(optValue)}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-blue-50 ${
                        value === optValue ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                      }`}
                    >
                      {optLabel}
                    </button>
                  )
                })
              ) : (
                <div className="px-3 py-2 text-sm text-gray-500">No options found</div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  )
}
