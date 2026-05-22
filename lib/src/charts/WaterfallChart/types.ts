import type { CSSProperties } from 'react'

export type WaterfallDatum = {
  label: string
  value: number
  // 'total': bar spans from 0 to value; resets the running total.
  // 'subtotal': same visual treatment as total but in a distinct color.
  // Omit for a floating increase/decrease bar.
  type?: 'total' | 'subtotal'
}

export type WaterfallChartProps = {
  data: WaterfallDatum[]
  height?: number
  formatValue?: (value: number) => string
  formatX?: (label: string) => string
  showConnectors?: boolean
  showLabels?: boolean
  className?: string
  style?: CSSProperties
}
