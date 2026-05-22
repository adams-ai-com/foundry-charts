import type { CSSProperties } from 'react'

export type SeriesConfig = {
  key: string
  label: string
  color?: string
}

export type BarChartDatum = Record<string, string | number>

export type BarChartVariant = 'grouped' | 'stacked'

export type BarChartProps = {
  data: BarChartDatum[]
  series: SeriesConfig[]
  xKey: string
  variant?: BarChartVariant
  height?: number
  formatY?: (value: number) => string
  formatX?: (value: string) => string
  onBarClick?: (datum: BarChartDatum, categoryIdx: number) => void
  selectedKey?: string
  className?: string
  style?: CSSProperties
}
