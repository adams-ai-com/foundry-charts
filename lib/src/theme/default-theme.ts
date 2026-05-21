export const SERIES_COLORS = [
  '#3b82f6',
  '#8b5cf6',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#06b6d4',
]

export function getSeriesColor(index: number, override?: string): string {
  if (override) return override
  return SERIES_COLORS[index % SERIES_COLORS.length]
}

export const CHART_MARGINS = {
  top: 16,
  right: 20,
  bottom: 44,
  left: 56,
}

export const BAR_PADDING_INNER = 0.28
export const BAR_PADDING_OUTER = 0.12
export const BAR_GROUP_INNER_PADDING = 0.08
