import React from 'react'

type XAxisProps = {
  ticks: { value: string; x: number }[]
  y: number
  formatTick?: (v: string) => string
}

type YAxisProps = {
  ticks: { value: number; y: number }[]
  x: number
  width: number
  formatTick?: (v: number) => string
}

const TICK_COLOR = 'rgba(240,240,245,0.35)'
const GRID_COLOR = 'rgba(255,255,255,0.05)'
const LABEL_STYLE: React.CSSProperties = {
  fontSize: 11,
  fontFamily: 'var(--fc-font, system-ui)',
  fill: TICK_COLOR,
  userSelect: 'none',
}

export function XAxis({ ticks, y, formatTick }: XAxisProps) {
  return (
    <g>
      {ticks.map((t) => (
        <text
          key={t.value}
          x={t.x}
          y={y + 16}
          textAnchor="middle"
          style={LABEL_STYLE}
        >
          {formatTick ? formatTick(t.value) : t.value}
        </text>
      ))}
    </g>
  )
}

export function YAxis({ ticks, x, width, formatTick }: YAxisProps) {
  return (
    <g>
      {ticks.map((t) => (
        <g key={t.value}>
          <line
            x1={x}
            x2={x + width}
            y1={t.y}
            y2={t.y}
            stroke={GRID_COLOR}
            strokeWidth={1}
          />
          <text
            x={x - 8}
            y={t.y}
            textAnchor="end"
            dominantBaseline="middle"
            style={LABEL_STYLE}
          >
            {formatTick ? formatTick(t.value) : t.value}
          </text>
        </g>
      ))}
    </g>
  )
}

export function ZeroLine({ x, width, y }: { x: number; width: number; y: number }) {
  return (
    <line
      x1={x}
      x2={x + width}
      y1={y}
      y2={y}
      stroke="rgba(255,255,255,0.2)"
      strokeWidth={1}
    />
  )
}
