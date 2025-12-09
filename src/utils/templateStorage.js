const STORAGE_KEY = 'box_pattern_templates'

export function saveTemplate(name, data) {
  const templates = getTemplates()
  templates[name] = {
    ...data,
    savedAt: new Date().toISOString()
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(templates))
}

export function getTemplates() {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : {}
}

export function deleteTemplate(name) {
  const templates = getTemplates()
  delete templates[name]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(templates))
}

export function loadTemplate(name) {
  const templates = getTemplates()
  return templates[name] || null
}

export function exportTemplates() {
  const templates = getTemplates()
  const json = JSON.stringify(templates, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'box-templates.json'
  link.click()
  URL.revokeObjectURL(url)
}

export function importTemplates(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result)
        const existing = getTemplates()
        const merged = { ...existing, ...imported }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged))
        resolve(Object.keys(imported).length)
      } catch (error) {
        reject(error)
      }
    }
    reader.onerror = reject
    reader.readAsText(file)
  })
}