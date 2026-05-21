export function formatValue(value: number): string {
  const abs = Math.abs(value)
  if (abs >= 1_000_000) return `${sign(value)}${(abs / 1_000_000).toFixed(abs % 1_000_000 === 0 ? 0 : 1)}M`
  if (abs >= 1_000) return `${sign(value)}${(abs / 1_000).toFixed(abs % 1_000 === 0 ? 0 : 1)}K`
  return value.toString()
}

export function formatCurrency(value: number): string {
  const abs = Math.abs(value)
  if (abs >= 1_000_000) return `$${sign(value)}${(abs / 1_000_000).toFixed(1)}M`
  if (abs >= 1_000) return `$${sign(value)}${(abs / 1_000).toFixed(abs % 1_000 === 0 ? 0 : 1)}K`
  return `$${value.toLocaleString()}`
}

export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`
}

function sign(v: number): string {
  return v < 0 ? '-' : ''
}
