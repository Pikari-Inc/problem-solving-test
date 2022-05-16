// Currency formatting
const formatCAD = new Intl.NumberFormat('en-CA', {
  currency: 'CAD',
  style: 'currency',
})

// Format a number or float to CAD currency
export const formatCADCurrency = amount => formatCAD.format(amount)

// Number formatting
const formatterCurrency = new Intl.NumberFormat('en-CA', {
  style: 'decimal',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  useGrouping: true,
})

export const formatCurrency = amount => formatterCurrency.format(amount)

// Convert cents to dollars
export const sumEl = (items, el) => items.reduce((acc, cur) => acc + cur[el], 0)
