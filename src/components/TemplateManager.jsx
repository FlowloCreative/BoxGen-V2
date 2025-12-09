import { useState, useEffect } from 'react'
import { 
  saveTemplate, 
  getTemplates, 
  deleteTemplate, 
  loadTemplate,
  exportTemplates,
  importTemplates 
} from '../utils/templateStorage'

export default function TemplateManager({ currentDimensions, onLoad }) {
  const [templates, setTemplates] = useState({})
  const [newName, setNewName] = useState('')
  const [showSave, setShowSave] = useState(false)

  useEffect(() => {
    setTemplates(getTemplates())
  }, [])

  const handleSave = () => {
    if (newName.trim()) {
      saveTemplate(newName, currentDimensions)
      setTemplates(getTemplates())
      setNewName('')
      setShowSave(false)
      alert(`Template "${newName}" saved!`)
    }
  }

  const handleLoad = (name) => {
    const template = loadTemplate(name)
    if (template) {
      onLoad(template)
      alert(`Template "${name}" loaded!`)
    }
  }

  const handleDelete = (name) => {
    if (confirm(`Delete template "${name}"?`)) {
      deleteTemplate(name)
      setTemplates(getTemplates())
    }
  }

  const handleImport = (e) => {
    const file = e.target.files[0]
    if (file) {
      importTemplates(file)
        .then(count => {
          setTemplates(getTemplates())
          alert(`${count} templates imported!`)
        })
        .catch(err => alert('Import failed: ' + err.message))
    }
  }

  return (
    <div className="template-manager">
      <h3>💾 Templates</h3>

      {!showSave ? (
        <button className="btn-save-template" onClick={() => setShowSave(true)}>
          + Save Current
        </button>
      ) : (
        <div className="save-form">
          <input
            type="text"
            placeholder="Template name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSave()}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setShowSave(false)}>Cancel</button>
        </div>
      )}

      <div className="template-list">
        {Object.keys(templates).length === 0 ? (
          <p className="no-templates">No saved templates</p>
        ) : (
          Object.keys(templates).map(name => (
            <div key={name} className="template-item">
              <div className="template-name">{name}</div>
              <div className="template-actions">
                <button onClick={() => handleLoad(name)}>Load</button>
                <button onClick={() => handleDelete(name)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="template-tools">
        <button onClick={exportTemplates}>Export All</button>
        <label className="btn-import">
          Import
          <input 
            type="file" 
            accept=".json" 
            onChange={handleImport} 
            style={{ display: 'none' }}
          />
        </label>
      </div>
    </div>
  )
}