import { exportToPDF } from '../utils/pdfExport'

export default function DownloadButtons({ svgString, disabled, boxStyle }) {
  const timestamp = new Date().toISOString().slice(0, 10)
  const basename = `${boxStyle}-${timestamp}`

  const handleSVGDownload = () => {
    if (svgString) {
      const blob = new Blob([svgString], { type: 'image/svg+xml' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${basename}.svg`
      link.click()
      URL.revokeObjectURL(url)
    }
  }

  const handlePDFDownload = async () => {
    if (svgString) {
      const result = await exportToPDF(svgString, `${basename}.pdf`)
      if (!result.success) {
        alert('PDF export failed: ' + result.error)
      }
    }
  }

  return (
    <div className="download-buttons">
      <button 
        onClick={handleSVGDownload} 
        disabled={disabled}
        className="btn-download btn-svg"
      >
        📥 Download SVG
      </button>

      <button 
        onClick={handlePDFDownload} 
        disabled={disabled}
        className="btn-download btn-pdf"
      >
        📄 Download PDF
      </button>
    </div>
  )
}