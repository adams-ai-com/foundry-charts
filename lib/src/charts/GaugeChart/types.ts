import type { CSSProperties } from 'react'

export interface GaugeChartProps {
  /** Current value */
  value: number
  /** Maximum possible value */
  max: number
  /** Label shown below the value (e.g. "Quota Attainment") */
  label?: string
  /** Optional target/goal value — renders a marker tick on the arc */
  target?: number
  /** Override the fill color; defaults to attainment-based traffic-light */
  color?: string
  /** Number formatter for the center value label */
  formatValue?: (v: number) => string
  /** Number formatter for the target label */
  formatTarget?: (v: number) => string
  /** SVG height in px. Width is always responsive. */
  height?: number
  className?: string
  style?: CSSProperties
}
