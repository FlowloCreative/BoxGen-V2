export function generateTuckTopBox(length, width, height, thickness, unit = 'mm', params = {}) {
  const flapHeight = (height * (params.dustFlapPercent || 25)) / 100
  const tuckFlap = params.tuckDepth || Math.max(20, width / 3)
  const glueFlap = params.glueTab || 15

  const totalWidth = width * 2 + height * 2 + glueFlap
  const totalHeight = length + flapHeight + tuckFlap

  let path = `M 0,${tuckFlap} `

  const points = [
    [0, tuckFlap], [0, tuckFlap + length], [glueFlap, tuckFlap + length], [glueFlap, tuckFlap],
    [glueFlap, tuckFlap], [glueFlap, 0], [glueFlap + width, 0], [glueFlap + width, tuckFlap],
    [glueFlap + width, tuckFlap], [glueFlap + width, tuckFlap + length],
    [glueFlap + width + height, tuckFlap + length], [glueFlap + width + height, tuckFlap],
    [glueFlap + width + height, tuckFlap], [glueFlap + width + height, 0],
    [glueFlap + width + height + width, 0], [glueFlap + width + height + width, tuckFlap],
    [glueFlap + width + height + width, tuckFlap],
    [glueFlap + width + height + width, tuckFlap + length],
    [totalWidth, tuckFlap + length], [totalWidth, tuckFlap]
  ]

  path = 'M ' + points.map(p => p.join(',')).join(' L ') + ' Z'

  const dustFlaps = []
  const flapPositions = [
    { x: glueFlap + width, y: tuckFlap + length, w: height, h: flapHeight },
    { x: glueFlap + width + height + width, y: tuckFlap + length, w: height, h: flapHeight }
  ]

  flapPositions.forEach(flap => {
    dustFlaps.push(`
      <path d="M ${flap.x},${flap.y} 
               L ${flap.x + flap.w * 0.2},${flap.y + flap.h}
               L ${flap.x + flap.w * 0.8},${flap.y + flap.h}
               L ${flap.x + flap.w},${flap.y}" 
            fill="none" stroke="green" stroke-width="0.5"/>
    `)
  })

  const foldLines = [
    { x1: glueFlap, y1: 0, x2: glueFlap, y2: totalHeight },
    { x1: glueFlap + width, y1: 0, x2: glueFlap + width, y2: totalHeight },
    { x1: glueFlap + width + height, y1: 0, x2: glueFlap + width + height, y2: totalHeight },
    { x1: glueFlap + width + height + width, y1: 0, x2: glueFlap + width + height + width, y2: totalHeight },
    { x1: 0, y1: tuckFlap, x2: totalWidth, y2: tuckFlap },
    { x1: glueFlap, y1: tuckFlap + length, x2: totalWidth, y2: tuckFlap + length }
  ]

  return {
    path,
    dustFlaps,
    foldLines,
    dimensions: { width: totalWidth, height: totalHeight },
    style: 'Tuck Top'
  }
}