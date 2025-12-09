import { useState, useEffect } from 'react'

export default function BoxForm({ onGenerate, initialDimensions, unit }) {
  const [dimensions, setDimensions] = useState({
    length: 100,
    width: 80,
    height: 60,
    thickness: 2
  })

  useEffect(() => {
    if (initialDimensions) {
      setDimensions(initialDimensions)
    }
  }, [initialDimensions])

  const handleChange = (e) => {
    const { name, value } = e.target
    setDimensions(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onGenerate(dimensions)
  }

  return (
    <form onSubmit={handleSubmit} className="box-form">
      <h2>Box Dimensions</h2>

      <div className="form-group">
        <label htmlFor="length">Length ({unit}):</label>
        <input
          type="number"
          id="length"
          name="length"
          value={dimensions.length}
          onChange={handleChange}
          min="10"
          max="1000"
          step="1"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="width">Width ({unit}):</label>
        <input
          type="number"
          id="width"
          name="width"
          value={dimensions.width}
          onChange={handleChange}
          min="10"
          max="1000"
          step="1"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="height">Height ({unit}):</label>
        <input
          type="number"
          id="height"
          name="height"
          value={dimensions.height}
          onChange={handleChange}
          min="10"
          max="500"
          step="1"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="thickness">Material Thickness ({unit}):</label>
        <input
          type="number"
          id="thickness"
          name="thickness"
          value={dimensions.thickness}
          onChange={handleChange}
          min="0.5"
          max="10"
          step="0.5"
          required
        />
      </div>

      <button type="submit" className="btn-generate">
        Generate Dieline
      </button>
    </form>
  )
}