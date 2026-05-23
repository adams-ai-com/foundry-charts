import type { CSSProperties } from 'react'

export interface FunnelDatum {
  /** Stage label */
  label: string
  /** Absolute value for this stage */
  value: number
  /** Optional color override; defaults to series palette */
  color?: string
}

export interface FunnelChartProps {
  data: FunnelDatum[]
  /** Number formatter for values */
  formatValue?: (v: number) => string
  /** Show conversion rate vs. the first stage (default true) */
  showConversion?: boolean
  /** SVG height in px */
  height?: number
  className?: string
  style?: CSSProperties
}
