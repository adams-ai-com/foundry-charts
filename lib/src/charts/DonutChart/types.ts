import type { CSSProperties } from 'react'

export type DonutDatum = {
  label: string
  value: number
  color?: string
}

export type DonutChartProps = {
  data: DonutDatum[]
  formatValue?: (v: number) => string
  centerLabel?: string
  innerRadius?: number
  height?: number
  className?: string
  style?: CSSProperties
}
