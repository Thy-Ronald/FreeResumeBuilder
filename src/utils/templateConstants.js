/**
 * Shared template constants and utilities
 * Used across ResumePreview, ResumePDF, and template selection components
 */

/**
 * Get template-specific padding in points (1mm = 2.83465pt)
 */
export const getTemplatePadding = (templateId) => {
  const paddingMap = {
    compact: { top: 22.68, right: 28.35, bottom: 22.68, left: 28.35 }, // 8mm 10mm
    modern: { top: 25.51, right: 31.18, bottom: 25.51, left: 31.18 }, // 9mm 11mm
    classic: { top: 25.51, right: 34.02, bottom: 25.51, left: 34.02 }, // 9mm 12mm
    minimal: { top: 22.68, right: 28.35, bottom: 22.68, left: 28.35 }, // 8mm 10mm
    corporate: { top: 34.02, right: 42.52, bottom: 34.02, left: 42.52 }, // 12mm 15mm
    'with-image': { top: 28.35, right: 34.02, bottom: 28.35, left: 34.02 }, // 10mm 12mm
  }
  return paddingMap[templateId] || paddingMap.modern
}

/**
 * US Letter dimensions at 96 DPI: 816px x 1056px (exact 1:1 scale)
 */
export const US_LETTER_DIMENSIONS = {
  width: 816,
  height: 1056,
  aspectRatio: 8.5 / 11, // US Letter aspect ratio
}

/**
 * Map Google Fonts to PDF-compatible fonts
 * React-pdf supports: Helvetica, Times-Roman, Courier
 */
export const getPDFFontFamily = (fontId) => {
  const fontMap = {
    'inter': 'Helvetica',
    'roboto': 'Helvetica',
    'opensans': 'Helvetica',
    'lato': 'Helvetica',
    'montserrat': 'Helvetica',
    'raleway': 'Helvetica',
    'poppins': 'Helvetica',
    'source-sans': 'Helvetica',
    'ubuntu': 'Helvetica',
    'playfair': 'Times-Roman',
    'merriweather': 'Times-Roman',
    'crimson': 'Times-Roman',
  }
  return fontMap[fontId] || 'Helvetica'
}

/**
 * Get default preview color for templates
 */
export const getPreviewColor = (templateId, customColor = null) => {
  if (customColor) return customColor
  
  const colors = {
    modern: '#D1D5DB',
    classic: '#D1D5DB',
    minimal: '#D1D5DB',
    compact: '#D1D5DB',
    corporate: '#2563eb',
    'with-image': '#D1D5DB'
  }
  return colors[templateId] || '#D1D5DB'
}

/**
 * Calculate responsive font size based on base size and mobile flag
 */
export const getResponsiveFontSize = (baseSize, isMobile = false) => {
  if (isMobile) {
    return `${baseSize * 0.85}px`
  }
  return `${baseSize}px`
}
