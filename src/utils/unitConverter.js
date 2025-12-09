export const UNITS = {
  MM: 'mm',
  INCH: 'inch'
}

export const MM_TO_INCH = 0.0393701
export const INCH_TO_MM = 25.4

export function convertToMM(value, fromUnit) {
  if (fromUnit === UNITS.INCH) {
    return value * INCH_TO_MM
  }
  return value
}

export function convertFromMM(value, toUnit) {
  if (toUnit === UNITS.INCH) {
    return value * MM_TO_INCH
  }
  return value
}

export function formatValue(value, unit, decimals = 2) {
  const converted = convertFromMM(value, unit)
  return `${converted.toFixed(decimals)}${unit}`
}