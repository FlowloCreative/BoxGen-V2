import { useState } from 'react'
import BoxForm from './components/BoxForm'
import StyleSelector from './components/StyleSelector'
import SVGPreview from './components/SVGPreview'
import Box3DPreview from './components/Box3DPreview'
import DownloadButtons from './components/DownloadButtons'
import TemplateManager from './components/TemplateManager'
import UnitsToggle from './components/UnitsToggle'
import AdvancedParams from './components/AdvancedParams'
import { generateBox, BOX_STYLES } from './utils/boxGenerators'
import { createSVG } from './utils/svgGenerator'
import { convertToMM, UNITS } from './utils/unitConverter'
import { useLocalStorage } from './hooks/useLocalStorage'
import './App.css'

function App() {
  const [svgString, setSvgString] = useState('')
  const [boxData, setBoxData] = useState(null)
  const [boxStyle, setBoxStyle] = useLocalStorage('boxStyle', BOX_STYLES.TUCK_TOP)
  const [unit, setUnit] = useLocalStorage('unit', UNITS.MM)
  const [dimensions, setDimensions] = useState({
    length: 100,
    width: 80,
    height: 60,
    thickness: 2
  })
  const [advancedParams, setAdvancedParams] = useState({
    dustFlapPercent: 25,
    tuckDepth: 30,
    flapAngle: 45,
    glueTab: 15,
    lockTab: 15,
    lockSlot: 12,
    tabRadius: 3,
    cornerRadius: 2,
    innerRadius: 1,
    notchDepth: 3,
    foldTolerance: 0.5,
    cutOffset: 0,
    bleed: 3
  })
  const [showPrintMarks, setShowPrintMarks] = useState(true)
  const [show3D, setShow3D] = useState(false)

  const handleGenerate = (dims) => {
    const dimsInMM = {
      length: convertToMM(dims.length, unit),
      width: convertToMM(dims.width, unit),
      height: convertToMM(dims.height, unit),
      thickness: convertToMM(dims.thickness, unit)
    }

    setDimensions(dimsInMM)

    const data = generateBox(
      boxStyle,
      dimsInMM.length,
      dimsInMM.width,
      dimsInMM.height,
      dimsInMM.thickness,
      unit,
      advancedParams
    )

    setBoxData(data)

    const svg = createSVG(data, {
      showDimensions: true,
      showPrintMarks,
      unit
    })

    setSvgString(svg)
  }

  const handleLoadTemplate = (template) => {
    setBoxStyle(template.style || BOX_STYLES.TUCK_TOP)
    setUnit(template.unit || UNITS.MM)
    setDimensions(template)
    if (template.advancedParams) {
      setAdvancedParams(template.advancedParams)
    }
    handleGenerate(template)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>📦 BoxGen V2 - Professional Box Pattern Generator</h1>
        <p>Create custom dielines for paper/cardboard packaging with multiple styles</p>
      </header>

      <main className="app-main">
        <aside className="sidebar">
          <StyleSelector selected={boxStyle} onChange={setBoxStyle} />

          <div className="units-section">
            <h3>Units</h3>
            <UnitsToggle unit={unit} onChange={setUnit} />
          </div>

          <BoxForm 
            onGenerate={handleGenerate} 
            initialDimensions={dimensions}
            unit={unit}
          />

          <AdvancedParams 
            params={advancedParams}
            onChange={setAdvancedParams}
            boxStyle={boxStyle}
          />

          <div className="options-section">
            <label>
              <input 
                type="checkbox" 
                checked={showPrintMarks}
                onChange={(e) => setShowPrintMarks(e.target.checked)}
              />
              Print marks (crop & registration)
            </label>
            <label>
              <input 
                type="checkbox" 
                checked={show3D}
                onChange={(e) => setShow3D(e.target.checked)}
              />
              Show 3D preview
            </label>
          </div>

          <DownloadButtons 
            svgString={svgString} 
            disabled={!svgString}
            boxStyle={boxStyle}
          />

          <TemplateManager 
            currentDimensions={{ ...dimensions, style: boxStyle, unit, advancedParams }}
            onLoad={handleLoadTemplate}
          />
        </aside>

        <div className="content">
          <div className="preview-tabs">
            <button 
              className={!show3D ? 'active' : ''}
              onClick={() => setShow3D(false)}
            >
              2D Dieline
            </button>
            <button 
              className={show3D ? 'active' : ''}
              onClick={() => setShow3D(true)}
            >
              3D Preview
            </button>
          </div>

          {!show3D ? (
            <SVGPreview svgString={svgString} />
          ) : (
            <Box3DPreview dimensions={dimensions} boxStyle={boxStyle} />
          )}
        </div>
      </main>

      <footer className="app-footer">
        <p>
          Built with React + Vite + Three.js by Flowlo Creative Solution | 
          <a href="https://github.com/FlowloCreative/BoxGen-V2" target="_blank" rel="noopener noreferrer"> Open Source on GitHub</a>
        </p>
      </footer>
    </div>
  )
}

export default App