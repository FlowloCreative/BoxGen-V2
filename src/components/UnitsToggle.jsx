import { UNITS } from '../utils/unitConverter'

export default function UnitsToggle({ unit, onChange }) {
  return (
    <div className="units-toggle">
      <button
        className={`unit-btn ${unit === UNITS.MM ? 'active' : ''}`}
        onClick={() => onChange(UNITS.MM)}
      >
        mm
      </button>
      <button
        className={`unit-btn ${unit === UNITS.INCH ? 'active' : ''}`}
        onClick={() => onChange(UNITS.INCH)}
      >
        inch
      </button>
    </div>
  )
}