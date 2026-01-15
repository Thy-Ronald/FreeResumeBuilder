/**
 * Shared utility functions for resume layout rendering
 */

/**
 * Render a standardized divider element for PDF-safe rendering
 */
export const renderDivider = (themeColor) => {
  return (
    <div
      style={{
        width: '100%',
        height: '0.75pt',
        backgroundColor: themeColor,
        marginTop: '8pt',
        marginBottom: '8pt',
        border: 'none',
        padding: 0,
      }}
    />
  )
}

/**
 * Render section divider for all templates (full width, no margins)
 */
export const renderSectionDivider = (themeColor) => {
  return (
    <div
      style={{
        width: '100%',
        height: '0.75pt',
        backgroundColor: themeColor,
        margin: 0,
        padding: 0,
        border: 'none',
      }}
    />
  )
}

/**
 * Render section header for all templates: divider first, then title
 */
export const renderSectionHeader = (title, selectedTemplate, colorScheme, themeColor) => {
  const headerStyles = {
    compact: { fontSize: '9.5pt', fontWeight: 'bold' },
    modern: { fontSize: '10pt', fontWeight: 'bold' },
    classic: { fontSize: '10pt', fontWeight: 'bold' },
    minimal: { fontSize: '9pt', fontWeight: '600' },
    corporate: { fontSize: '10pt', fontWeight: 'bold' },
    'with-image': { fontSize: '10pt', fontWeight: 'bold' },
  }
  
  const headerStyle = headerStyles[selectedTemplate] || headerStyles.modern
  const headerColor = selectedTemplate === 'corporate' 
    ? '#2563eb' // Blue color for corporate section headers
    : colorScheme.colors.primary
  
  const textFlowStyles = {
    whiteSpace: 'normal',
    wordBreak: 'normal',
    overflowWrap: 'break-word',
    letterSpacing: 'normal',
    textAlign: 'left'
  }
  
  return (
    <>
      {renderSectionDivider(themeColor)}
      <h2 
        className="uppercase" 
        style={{ 
          ...headerStyle,
          margin: 0,
          paddingTop: '7pt', // 6-8pt spacing from divider to title
          paddingBottom: 0,
          fontVariant: 'small-caps', 
          color: headerColor,
          ...textFlowStyles
        }}
      >
        {title}
      </h2>
    </>
  )
}

/**
 * Text flow normalization styles - match Word/Google Docs rendering
 */
export const textFlowStyles = {
  whiteSpace: 'normal',
  wordBreak: 'normal',
  overflowWrap: 'break-word',
  letterSpacing: 'normal',
  textAlign: 'left'
}
