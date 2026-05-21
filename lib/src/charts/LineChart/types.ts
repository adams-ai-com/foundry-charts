import type { CSSProperties } from 'react'
import type { SeriesConfig } from '../BarChart/types'

export type { SeriesConfig }

export type LineChartDatum = Record<string, string | number>

export type LineChartVariant = 'line' | 'area'

export type LineCurve = 'smooth' | 'linear'

export type LineChartProps = {
  data: LineChartDatum[]
  series: SeriesConfig[]
  xKey: string
  variant?: LineChartVariant
  curve?: LineCurve
  height?: number
  formatY?: (value: number) => string
  formatX?: (value: string) => string
  className?: string
  style?: CSSProperties
}
