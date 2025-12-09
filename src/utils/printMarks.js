/**
 * Add professional print marks to SVG
 */
export function addPrintMarks(svg, width, height, options = {}) {
  const {
    cropMarks = true,
    registrationMarks = true,
    colorBars = false,
    margin = 20
  } = options

  let marks = ''

  if (cropMarks) {
    const markLength = 15
    const offset = margin / 2

    // Corner crop marks
    const corners = [
      { x: -offset, y: -offset },
      { x: width + offset, y: -offset },
      { x: -offset, y: height + offset },
      { x: width + offset, y: height + offset }
    ]

    corners.forEach(corner => {
      marks += `
        <line x1="${corner.x - markLength}" y1="${corner.y}" 
              x2="${corner.x}" y2="${corner.y}" 
              stroke="black" stroke-width="0.5"/>
        <line x1="${corner.x}" y1="${corner.y - markLength}" 
              x2="${corner.x}" y2="${corner.y}" 
              stroke="black" stroke-width="0.5"/>
      `
    })
  }

  if (registrationMarks) {
    const markSize = 10
    const positions = [
      { x: width / 2, y: -margin },
      { x: width / 2, y: height + margin }
    ]

    positions.forEach(pos => {
      marks += `
        <g transform="translate(${pos.x}, ${pos.y})">
          <circle cx="0" cy="0" r="${markSize / 2}" 
                  fill="none" stroke="black" stroke-width="0.5"/>
          <line x1="-${markSize}" y1="0" x2="${markSize}" y2="0" 
                stroke="black" stroke-width="0.5"/>
          <line x1="0" y1="-${markSize}" x2="0" y2="${markSize}" 
                stroke="black" stroke-width="0.5"/>
        </g>
      `
    })
  }

  if (colorBars) {
    const colors = ['#00FFFF', '#FF00FF', '#FFFF00', '#000000']
    const barWidth = 20
    const barHeight = 10

    colors.forEach((color, i) => {
      marks += `
        <rect x="${i * barWidth}" y="${height + margin}" 
              width="${barWidth}" height="${barHeight}" 
              fill="${color}"/>
      `
    })
  }

  return marks
}