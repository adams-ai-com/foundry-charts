import type { CSSProperties } from 'react'
import type { SparklineVariant } from '../Sparkline/types'

export type MetricCardProps = {
  label: string
  value: number | string
  formatValue?: (v: number) => string
  trend?: number
  trendLabel?: string
  sparkline?: number[]
  sparklineColor?: string
  sparklineVariant?: SparklineVariant
  className?: string
  style?: CSSProperties
}
