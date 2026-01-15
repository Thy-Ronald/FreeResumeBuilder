import { useMemo, useCallback } from 'react'

/**
 * Custom hook for managing template colors
 * @param {Object} templateColors - Object mapping template IDs to colors
 * @param {Function} onTemplateColorChange - Callback for color changes
 * @param {Function} getTemplateColorProp - External function to get template color
 * @param {string} selectedTemplate - Currently selected template
 * @param {string} themeColor - Default theme color
 * @returns {Object} Template color functions and current theme color
 */
export function useTemplateColors(
  templateColors = {},
  onTemplateColorChange,
  getTemplateColorProp,
  selectedTemplate,
  themeColor = '#F2F2F2'
) {
  const getTemplateColor = useCallback((templateId) => {
    if (getTemplateColorProp) {
      return getTemplateColorProp(templateId)
    }
    return templateColors[templateId] || null
  }, [getTemplateColorProp, templateColors])

  const getPreviewColor = useCallback((templateId) => {
    const color = getTemplateColor(templateId)
    return color || '#D1D5DB' // Default gray if no color selected
  }, [getTemplateColor])

  const handleTemplateColorChange = useCallback((templateId, color) => {
    if (onTemplateColorChange) {
      onTemplateColorChange(templateId, color)
    }
  }, [onTemplateColorChange])

  // Get the current theme color for the selected template
  const currentThemeColor = useMemo(() => {
    return getTemplateColor(selectedTemplate) || themeColor || '#F2F2F2'
  }, [getTemplateColor, selectedTemplate, themeColor])

  return {
    getTemplateColor,
    getPreviewColor,
    handleTemplateColorChange,
    currentThemeColor,
  }
}
