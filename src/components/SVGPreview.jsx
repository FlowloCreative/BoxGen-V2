export default function SVGPreview({ svgString }) {
  if (!svgString) {
    return (
      <div className="svg-preview empty">
        <p>Enter dimensions and click "Generate Dieline" to preview</p>
      </div>
    )
  }

  return (
    <div className="svg-preview">
      <div 
        className="svg-container"
        dangerouslySetInnerHTML={{ __html: svgString }}
      />
    </div>
  )
}