export function generateSnapLockBox(length, width, height, thickness, unit = 'mm', params = {}) {
  const flapHeight = height * 0.75
  const lockTab = params.lockTab || 15
  const glueFlap = params.glueTab || 15

  const totalWidth = width * 2 + height * 2 + glueFlap
  const totalHeight = length + flapHeight

  let path = `M 0,0 L 0,${length} L ${glueFlap},${length} L ${glueFlap},0 Z`

  const snapFlaps = []

  snapFlaps.push(`
    <path d="M ${glueFlap + width},${length}
             L ${glueFlap + width + height * 0.3},${length + flapHeight * 0.9}
             L ${glueFlap + width + height * 0.7},${length + flapHeight * 0.9}
             L ${glueFlap + width + height},${length}
             M ${glueFlap + width + height * 0.45},${length + flapHeight * 0.6}
             L ${glueFlap + width + height * 0.45},${length + flapHeight * 0.9}
             L ${glueFlap + width + height * 0.55},${length + flapHeight * 0.9}
             L ${glueFlap + width + height * 0.55},${length + flapHeight * 0.6}"
          fill="none" stroke="green" stroke-width="0.5"/>
  `)

  snapFlaps.push(`
    <path d="M ${glueFlap},${length}
             L ${glueFlap + width * 0.2},${length + flapHeight}
             L ${glueFlap + width * 0.4},${length + flapHeight}
             L ${glueFlap + width * 0.4},${length + flapHeight - lockTab}
             L ${glueFlap + width * 0.6},${length + flapHeight - lockTab}
             L ${glueFlap + width * 0.6},${length + flapHeight}
             L ${glueFlap + width * 0.8},${length + flapHeight}
             L ${glueFlap + width},${length}"
          fill="none" stroke="green" stroke-width="0.5"/>
  `)

  const foldLines = [
    { x1: glueFlap, y1: 0, x2: glueFlap, y2: length },
    { x1: glueFlap + width, y1: 0, x2: glueFlap + width, y2: totalHeight },
    { x1: glueFlap + width + height, y1: 0, x2: glueFlap + width + height, y2: length },
    { x1: glueFlap + width + height + width, y1: 0, x2: glueFlap + width + height + width, y2: totalHeight },
    { x1: 0, y1: length, x2: totalWidth, y2: length }
  ]

  return {
    path,
    snapFlaps,
    foldLines,
    dimensions: { width: totalWidth, height: totalHeight },
    style: 'Snap Lock Bottom'
  }
}