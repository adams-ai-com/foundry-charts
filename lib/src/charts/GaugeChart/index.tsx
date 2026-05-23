import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { formatValue as defaultFormat } from '../../utils/formatters'
import type { GaugeChartProps } from './types'

export { GaugeChartProps }

const START = -Math.PI / 2   // 9 o'clock
const END   =  Math.PI / 2   // 3 o'clock
const SWEEP = END - START     // π = 180°

// Traffic-light color based on attainment percentage
function attainmentColor(pct: number): string {
  if (pct >= 0.8) return '#10b981'   // green
  if (pct >= 0.5) return '#f59e0b'   // amber
  return '#ef4444'                    // red
}

function fmt2(v: number) {
  return v % 1 === 0 ? String(v) : v.toFixed(1)
}

export function GaugeChart({
  value,
  max,
  label,
  target,
  color,
  formatValue = defaultFormat,
  formatTarget,
  height = 200,
  className,
  style,
}: GaugeChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [width, setWidth]   = useState(280)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 30)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!containerRef.current) return
    const ro = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width)
    })
    ro.observe(containerRef.current)
    setWidth(containerRef.current.clientWidth)
    return () => ro.disconnect()
  }, [])

  const LABEL_AREA = 54
  const MARGIN     = 14

  const cy     = height - LABEL_AREA
  const outerR = Math.max(20, Math.min(cy - MARGIN, (width - 2 * MARGIN) / 2))
  const innerR = outerR * 0.72
  const cx     = width / 2

  const pct        = Math.min(Math.max(value / max, 0), 1)
  const fillColor  = color ?? attainmentColor(pct)
  const fillEnd    = mounted ? START + pct * SWEEP : START

  const trackArc = d3.arc<unknown>()
    .innerRadius(innerR).outerRadius(outerR)
    .startAngle(START).endAngle(END)
    .cornerRadius((outerR - innerR) / 2)

  const fillArc = d3.arc<unknown>()
    .innerRadius(innerR).outerRadius(outerR)
    .startAngle(START).endAngle(fillEnd)
    .cornerRadius((outerR - innerR) / 2)

  // Target marker tick (extends slightly beyond the arc)
  let targetEl: React.ReactNode = null
  if (target != null && target >= 0 && target <= max) {
    const tAngle  = START + Math.min(target / max, 1) * SWEEP
    const inner   = innerR - 3
    const outer   = outerR + 5
    const tx1     = cx + inner * Math.sin(tAngle)
    const ty1     = cy - inner * Math.cos(tAngle)
    const tx2     = cx + outer * Math.sin(tAngle)
    const ty2     = cy - outer * Math.cos(tAngle)
    const tLabel  = formatTarget ? formatTarget(target) : formatValue(target)
    // Offset the label above the tick mark
    const labelX  = cx + (outer + 10) * Math.sin(tAngle)
    const labelY  = cy - (outer + 10) * Math.cos(tAngle)
    targetEl = (
      <g>
        <line x1={tx1} y1={ty1} x2={tx2} y2={ty2}
          stroke="rgba(255,255,255,0.7)" strokeWidth={2.5} strokeLinecap="round" />
        <text x={labelX} y={labelY} textAnchor="middle" dominantBaseline="middle"
          style={{ fontSize: 10, fill: 'rgba(255,255,255,0.45)', fontFamily: 'inherit' }}>
          {tLabel}
        </text>
      </g>
    )
  }

  // Arc end-cap dots (left and right terminals)
  const leftX  = cx + outerR * Math.sin(START)
  const leftY  = cy - outerR * Math.cos(START)
  const rightX = cx + outerR * Math.sin(END)
  const rightY = cy - outerR * Math.cos(END)

  // Center label: value + percentage
  const pctStr = `${Math.round(pct * 100)}%`

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: '100%', height, ...style }}
    >
      <svg width={width} height={height} style={{ overflow: 'visible' }}>
        {/* Track */}
        <path
          d={trackArc(null as never) ?? ''}
          transform={`translate(${cx},${cy})`}
          fill="rgba(255,255,255,0.07)"
        />

        {/* Fill arc — animated via CSS transition on strokeDasharray in the path */}
        <path
          d={fillArc(null as never) ?? ''}
          transform={`translate(${cx},${cy})`}
          fill={fillColor}
          style={{ transition: 'all 600ms cubic-bezier(0.4,0,0.2,1)' }}
        />

        {/* Target marker */}
        {targetEl}

        {/* End-cap tick marks */}
        <circle cx={leftX}  cy={leftY}  r={3} fill="rgba(255,255,255,0.15)" />
        <circle cx={rightX} cy={rightY} r={3} fill="rgba(255,255,255,0.15)" />

        {/* Center labels */}
        <text
          x={cx} y={cy - innerR * 0.35}
          textAnchor="middle" dominantBaseline="middle"
          style={{
            fontSize: Math.max(16, Math.min(28, innerR * 0.36)),
            fontWeight: 700,
            fill: '#f8f8ff',
            fontFamily: 'inherit',
          }}
        >
          {formatValue(value)}
        </text>

        <text
          x={cx} y={cy - innerR * 0.35 + Math.max(20, innerR * 0.38)}
          textAnchor="middle" dominantBaseline="middle"
          style={{ fontSize: Math.max(10, innerR * 0.15), fill: fillColor, fontFamily: 'inherit', fontWeight: 600 }}
        >
          {pctStr}
        </text>

        {/* Min / Max labels at arc ends */}
        <text x={leftX - 6}  y={leftY + 14}
          textAnchor="end" dominantBaseline="middle"
          style={{ fontSize: 10, fill: 'rgba(255,255,255,0.3)', fontFamily: 'inherit' }}>
          0
        </text>
        <text x={rightX + 6} y={rightY + 14}
          textAnchor="start" dominantBaseline="middle"
          style={{ fontSize: 10, fill: 'rgba(255,255,255,0.3)', fontFamily: 'inherit' }}>
          {fmt2(max)}
        </text>

        {/* Bottom label */}
        {label && (
          <text
            x={cx} y={height - LABEL_AREA * 0.18}
            textAnchor="middle" dominantBaseline="middle"
            style={{ fontSize: 12, fill: 'rgba(255,255,255,0.4)', fontFamily: 'inherit' }}
          >
            {label}
          </text>
        )}
      </svg>
    </div>
  )
}
