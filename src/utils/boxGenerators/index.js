import { generateTuckTopBox } from './tuckTop'
import { generateSnapLockBox } from './snapLock'
import { generatePillowBox } from './pillowBox'

export const BOX_STYLES = {
  TUCK_TOP: 'tuck-top',
  SNAP_LOCK: 'snap-lock',
  PILLOW: 'pillow'
}

export function generateBox(style, length, width, height, thickness, unit, params = {}) {
  switch (style) {
    case BOX_STYLES.TUCK_TOP:
      return generateTuckTopBox(length, width, height, thickness, unit, params)
    case BOX_STYLES.SNAP_LOCK:
      return generateSnapLockBox(length, width, height, thickness, unit, params)
    case BOX_STYLES.PILLOW:
      return generatePillowBox(length, width, height, thickness, unit, params)
    default:
      return generateTuckTopBox(length, width, height, thickness, unit, params)
  }
}