import type { CSSProperties } from 'react'

export type AreaDatum = Record<string, string | number>

export type AreaSeriesConfig = {
  key: string
  label: string
  color?: string
}

export type AreaChartProps = {
  data: AreaDatum[]
  series: AreaSeriesConfig[]
  xKey: string
  // 'stacked': areas stacked on top of each other (filled, no overlap)
  // 'overlapping': each series drawn independently with semi-transparent fill
  variant?: 'stacked' | 'overlapping'
  height?: number
  formatY?: (value: number) => string
  formatX?: (value: string) => string
  className?: string
  style?: CSSProperties
}
