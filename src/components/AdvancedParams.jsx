import { useState } from 'react'

export default function AdvancedParams({ params, onChange, boxStyle }) {
  const [activeTab, setActiveTab] = useState('flaps')

  const handleChange = (key, value) => {
    onChange({ ...params, [key]: parseFloat(value) })
  }

  const tabs = [
    { id: 'flaps', label: '📐 Flaps', icon: '📐' },
    { id: 'tabs', label: '📎 Tabs', icon: '📎' },
    { id: 'corners', label: '⭕ Corners', icon: '⭕' },
    { id: 'tolerances', label: '⚙️ Adjust', icon: '⚙️' }
  ]

  return (
    <div className="advanced-params">
      <h3>⚡ Custom Parameters</h3>

      <div className="param-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`param-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
            title={tab.label}
          >
            {tab.icon}
          </button>
        ))}
      </div>

      <div className="param-content">
        {activeTab === 'flaps' && (
          <FlapControls params={params} onChange={handleChange} style={boxStyle} />
        )}
        {activeTab === 'tabs' && (
          <TabControls params={params} onChange={handleChange} style={boxStyle} />
        )}
        {activeTab === 'corners' && (
          <CornerControls params={params} onChange={handleChange} />
        )}
        {activeTab === 'tolerances' && (
          <ToleranceControls params={params} onChange={handleChange} />
        )}
      </div>
    </div>
  )
}

function FlapControls({ params, onChange, style }) {
  return (
    <div className="param-group">
      <Slider
        label="Dust Flap %"
        value={params.dustFlapPercent || 25}
        onChange={(v) => onChange('dustFlapPercent', v)}
        min={15}
        max={50}
        unit="%"
        help="Height as % of box height"
      />

      {style === 'tuck-top' && (
        <Slider
          label="Tuck Depth"
          value={params.tuckDepth || 30}
          onChange={(v) => onChange('tuckDepth', v)}
          min={15}
          max={60}
          unit="mm"
          help="Top closure flap depth"
        />
      )}

      <Slider
        label="Flap Angle"
        value={params.flapAngle || 45}
        onChange={(v) => onChange('flapAngle', v)}
        min={30}
        max={75}
        unit="°"
        help="Side flap taper angle"
      />
    </div>
  )
}

function TabControls({ params, onChange, style }) {
  return (
    <div className="param-group">
      <Slider
        label="Glue Tab"
        value={params.glueTab || 15}
        onChange={(v) => onChange('glueTab', v)}
        min={8}
        max={25}
        unit="mm"
        help="Glue flap width"
      />

      {style === 'snap-lock' && (
        <>
          <Slider
            label="Lock Tab"
            value={params.lockTab || 15}
            onChange={(v) => onChange('lockTab', v)}
            min={10}
            max={25}
            unit="mm"
            help="Snap lock tab height"
          />

          <Slider
            label="Lock Slot"
            value={params.lockSlot || 12}
            onChange={(v) => onChange('lockSlot', v)}
            min={8}
            max={20}
            unit="mm"
            help="Snap lock slot width"
          />
        </>
      )}

      <Slider
        label="Tab Radius"
        value={params.tabRadius || 3}
        onChange={(v) => onChange('tabRadius', v)}
        min={0}
        max={8}
        unit="mm"
        help="Rounded tab corners"
      />
    </div>
  )
}

function CornerControls({ params, onChange }) {
  return (
    <div className="param-group">
      <Slider
        label="Cut Corner"
        value={params.cornerRadius || 2}
        onChange={(v) => onChange('cornerRadius', v)}
        min={0}
        max={10}
        unit="mm"
        help="Outer corner radius"
      />

      <Slider
        label="Inner Curve"
        value={params.innerRadius || 1}
        onChange={(v) => onChange('innerRadius', v)}
        min={0}
        max={5}
        unit="mm"
        help="Fold relief cuts"
      />

      <Slider
        label="Notch Depth"
        value={params.notchDepth || 3}
        onChange={(v) => onChange('notchDepth', v)}
        min={0}
        max={8}
        unit="mm"
        help="Corner notch depth"
      />
    </div>
  )
}

function ToleranceControls({ params, onChange }) {
  return (
    <div className="param-group">
      <Slider
        label="Fold Gap"
        value={params.foldTolerance || 0.5}
        onChange={(v) => onChange('foldTolerance', v)}
        min={0}
        max={3}
        step={0.1}
        unit="mm"
        help="Material thickness buffer"
      />

      <Slider
        label="Cut Offset"
        value={params.cutOffset || 0}
        onChange={(v) => onChange('cutOffset', v)}
        min={-2}
        max={2}
        step={0.1}
        unit="mm"
        help="Laser kerf compensation"
      />

      <Slider
        label="Bleed"
        value={params.bleed || 3}
        onChange={(v) => onChange('bleed', v)}
        min={0}
        max={10}
        unit="mm"
        help="Artwork extension"
      />
    </div>
  )
}

function Slider({ label, value, onChange, min, max, step = 1, unit = '', help }) {
  return (
    <div className="slider-control">
      <div className="slider-header">
        <label>{label}</label>
        <span className="slider-value">{value}{unit}</span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="slider-input"
      />

      <div className="slider-labels">
        <span>{min}{unit}</span>
        <span className="slider-help">{help}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  )
}