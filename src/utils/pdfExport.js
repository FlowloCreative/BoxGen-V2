import jsPDF from 'jspdf'
import 'svg2pdf.js'

/**
 * Export SVG to PDF using svg2pdf.js
 */
export async function exportToPDF(svgString, filename = 'box-pattern.pdf') {
  try {
    const parser = new DOMParser()
    const svgDoc = parser.parseFromString(svgString, 'image/svg+xml')
    const svgElement = svgDoc.documentElement

    const width = parseFloat(svgElement.getAttribute('width'))
    const height = parseFloat(svgElement.getAttribute('height'))

    const orientation = width > height ? 'landscape' : 'portrait'
    const pdf = new jsPDF({
      orientation,
      unit: 'mm',
      format: [width * 0.264583, height * 0.264583]
    })

    await pdf.svg(svgElement, {
      x: 0,
      y: 0,
      width: width * 0.264583,
      height: height * 0.264583
    })

    pdf.save(filename)

    return { success: true }
  } catch (error) {
    console.error('PDF export error:', error)
    return { success: false, error: error.message }
  }
}