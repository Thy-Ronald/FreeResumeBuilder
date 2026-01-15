import { useState, useEffect } from 'react'

/**
 * Custom hook for managing font and color selections with localStorage persistence
 * @returns {Object} Font and color state and setters
 */
export function useFontAndColor() {
  const [selectedFont, setSelectedFont] = useState(() => {
    try {
      const saved = localStorage.getItem('resumeBuilder_selectedFont')
      return saved || 'inter'
    } catch (error) {
      return 'inter'
    }
  })

  const [selectedColor, setSelectedColor] = useState(() => {
    try {
      const saved = localStorage.getItem('resumeBuilder_selectedColor')
      return saved || 'black'
    } catch (error) {
      return 'black'
    }
  })

  // Save selectedFont to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('resumeBuilder_selectedFont', selectedFont)
    } catch (error) {
      console.error('Error saving selected font to localStorage:', error)
    }
  }, [selectedFont])

  // Save selectedColor to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('resumeBuilder_selectedColor', selectedColor)
    } catch (error) {
      console.error('Error saving selected color to localStorage:', error)
    }
  }, [selectedColor])

  return {
    selectedFont,
    setSelectedFont,
    selectedColor,
    setSelectedColor,
  }
}
