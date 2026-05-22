import type { CSSProperties } from 'react'

export type ScatterDatum = {
  x: number
  y: number
  // z drives bubble radius when variant='bubble'. Omit for plain scatter.
  z?: number
  label?: string
}

export type ScatterSeries = {
  key: string
  label: string
  data: ScatterDatum[]
  color?: string
}

export type QuadrantLine = {
  axis: 'x' | 'y'
  value: number
  label?: string
}

export type ScatterChartProps = {
  series: ScatterSeries[]
  height?: number
  formatX?: (value: number) => string
  formatY?: (value: number) => string
  formatZ?: (value: number) => string
  xLabel?: string
  yLabel?: string
  quadrants?: QuadrantLine[]
  variant?: 'scatter' | 'bubble'
  className?: string
  style?: CSSProperties
}
