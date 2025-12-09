import { BOX_STYLES } from '../utils/boxGenerators'

export default function StyleSelector({ selected, onChange }) {
  const styles = [
    { 
      id: BOX_STYLES.TUCK_TOP, 
      name: 'Tuck Top', 
      description: 'Classic tuck closure with dust flaps',
      icon: '📦'
    },
    { 
      id: BOX_STYLES.SNAP_LOCK, 
      name: 'Snap Lock Bottom', 
      description: '1-2-3 interlocking bottom (stronger)',
      icon: '🔒'
    },
    { 
      id: BOX_STYLES.PILLOW, 
      name: 'Pillow Box', 
      description: 'Curved ends, ideal for gifts',
      icon: '🎁'
    }
  ]

  return (
    <div className="style-selector">
      <h3>Box Style</h3>
      <div className="style-grid">
        {styles.map(style => (
          <button
            key={style.id}
            className={`style-card ${selected === style.id ? 'selected' : ''}`}
            onClick={() => onChange(style.id)}
          >
            <div className="style-icon">{style.icon}</div>
            <div className="style-name">{style.name}</div>
            <div className="style-description">{style.description}</div>
          </button>
        ))}
      </div>
    </div>
  )
}