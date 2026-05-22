import type { CSSProperties } from 'react'

export type SparklineVariant = 'line' | 'area'

export type SparklineProps = {
  data: number[]
  color?: string
  variant?: SparklineVariant
  height?: number
  strokeWidth?: number
  className?: string
  style?: CSSProperties
}
