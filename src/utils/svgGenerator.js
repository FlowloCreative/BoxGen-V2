import { addPrintMarks } from './printMarks'
import { formatValue } from './unitConverter'

export function createSVG(boxData, options = {}) {
  const {
    showDimensions = true,
    showPrintMarks = true,
    unit = 'mm'
  } = options

  const { path, snapFlaps = [], dustFlaps = [], foldLines, dimensions, style, paths } = boxData
  const padding = showPrintMarks ? 50 : 20

  const viewBoxWidth = dimensions.width + padding * 2
  const viewBoxHeight = dimensions.height + padding * 2

  let svgContent = `
    <defs>
      <style>
        .cut-line { stroke: #00AA00; stroke-width: 0.5; fill: none; }
        .fold-line { stroke: #FF0000; stroke-width: 0.3; stroke-dasharray: 3,2; }
        .dimension-text { font-family: Arial; font-size: 10px; fill: #666; text-anchor: middle; }
        .style-label { font-family: Arial; font-size: 14px; fill: #333; font-weight: bold; }
      </style>
    </defs>

    <rect width="${viewBoxWidth}" height="${viewBoxHeight}" fill="#ffffff"/>

    <g transform="translate(${padding}, ${padding})">
  `

  if (path) {
    svgContent += `<path d="${path}" class="cut-line"/>`
  }

  if (paths) {
    paths.forEach(p => {
      svgContent += `<path d="${p}" class="cut-line"/>`
    })
  }

  if (snapFlaps.length > 0) {
    svgContent += snapFlaps.join('\n')
  }

  if (dustFlaps.length > 0) {
    svgContent += dustFlaps.join('\n')
  }

  foldLines.forEach(line => {
    svgContent += `<line x1="${line.x1}" y1="${line.y1}" x2="${line.x2}" y2="${line.y2}" class="fold-line"/>`
  })

  svgContent += `<text x="${dimensions.width / 2}" y="-10" class="style-label">${style}</text>`

  if (showDimensions) {
    svgContent += `
      <text x="${dimensions.width / 2}" y="-25" class="dimension-text">
        ${formatValue(dimensions.width, unit)} × ${formatValue(dimensions.height, unit)}
      </text>
    `
  }

  svgContent += `</g>`

  if (showPrintMarks) {
    svgContent += addPrintMarks(svgContent, dimensions.width + padding * 2, dimensions.height + padding * 2, {
      cropMarks: true,
      registrationMarks: true,
      colorBars: false
    })
  }

  svgContent += `
    <g transform="translate(${padding}, ${viewBoxHeight - 25})">
      <line x1="0" y1="0" x2="30" y2="0" class="cut-line"/>
      <text x="35" y="4" class="dimension-text">Cut line</text>

      <line x1="100" y1="0" x2="130" y2="0" class="fold-line"/>
      <text x="135" y="4" class="dimension-text">Fold line</text>
    </g>
  `

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${viewBoxWidth}" height="${viewBoxHeight}" viewBox="0 0 ${viewBoxWidth} ${viewBoxHeight}">
    ${svgContent}
  </svg>`
}