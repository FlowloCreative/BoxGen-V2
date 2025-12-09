export function generatePillowBox(length, width, height, thickness, unit = 'mm', params = {}) {
  const curveDepth = height / 2
  const totalWidth = length + curveDepth * 2
  const totalHeight = width

  const leftCurve = `M 0,${width / 2}
                     Q 0,0 ${curveDepth},0
                     L ${curveDepth},${width}
                     Q 0,${width} 0,${width / 2} Z`

  const rightCurve = `M ${curveDepth + length},0
                      Q ${totalWidth},0 ${totalWidth},${width / 2}
                      Q ${totalWidth},${width} ${curveDepth + length},${width} Z`

  const mainBody = `M ${curveDepth},0 
                    L ${curveDepth + length},0 
                    L ${curveDepth + length},${width} 
                    L ${curveDepth},${width} Z`

  const foldLines = [
    { x1: curveDepth, y1: 0, x2: curveDepth, y2: width },
    { x1: curveDepth + length, y1: 0, x2: curveDepth + length, y2: width }
  ]

  return {
    paths: [leftCurve, rightCurve, mainBody],
    foldLines,
    dimensions: { width: totalWidth, height: totalHeight },
    style: 'Pillow Box'
  }
}