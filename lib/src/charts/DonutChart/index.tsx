import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { Legend } from '../../components/Legend'
import { getSeriesColor } from '../../theme/default-theme'
import { formatValue as defaultFormat } from '../../utils/formatters'
import type { DonutChartProps } from './types'

const MARGIN = 16
const HOVER_OFFSET = 8

export function DonutChart({
  data,
  formatValue = defaultFormat,
  centerLabel = 'Total',
  innerRadius: innerRadiusFraction = 0.65,
  height = 280,
  className,
  style,
}: DonutChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(280)
  const [hoverIdx, setHoverIdx] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 20)
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

  const colors = data.map((d, i) => getSeriesColor(i, d.color))
  const total = parseFloat(data.reduce((sum, d) => sum + d.value, 0).toPrecision(10))

  const cx = width / 2
  const cy = height / 2
  const outerR = Math.min(width, height) / 2 - MARGIN
  const innerR = outerR * innerRadiusFraction

  const pie = d3.pie<(typeof data)[0]>()
    .value((d) => d.value)
    .sort(null)
    .padAngle(0.024)

  const arcGen = d3.arc<d3.PieArcDatum<(typeof data)[0]>>()
    .innerRadius(innerR)
    .outerRadius(outerR)
    .cornerRadius(3)

  const arcs = pie(data)

  // Center display: hover shows segment info, default shows total
  const hovered = hoverIdx !== null ? data[hoverIdx] : null
  const centerValue = hovered
    ? formatValue(hovered.value)
    : formatValue(total)
  const centerSub = hovered
    ? hovered.label
    : centerLabel

  // Auto-size center value font to fit the hole
  const valueFontSize = centerValue.length <= 5 ? 24
    : centerValue.length <= 8 ? 20
    : 15

  if (!data.length || outerR <= 0) {
    return <div ref={containerRef} className={className} style={{ width: '100%', height, ...style }} />
  }

  return (
    <div ref={containerRef} className={className} style={{ width: '100%', ...style }}>
      <svg
        width={width}
        height={height}
        style={{ display: 'block', touchAction: 'none' }}
      >
        <g transform={`translate(${cx},${cy})`}>
          {arcs.map((a, i) => {
            const midAngle = (a.startAngle + a.endAngle) / 2
            const tx = hoverIdx === i ? Math.sin(midAngle) * HOVER_OFFSET : 0
            const ty = hoverIdx === i ? -Math.cos(midAngle) * HOVER_OFFSET : 0

            return (
              <path
                key={data[i].label}
                d={arcGen(a) ?? ''}
                fill={colors[i]}
                opacity={mounted ? 1 : 0}
                transform={`translate(${tx},${ty})`}
                style={{
                  transition: `opacity 400ms ease ${i * 60}ms, transform 200ms ease`,
                  cursor: 'pointer',
                }}
                onPointerEnter={() => setHoverIdx(i)}
                onPointerLeave={() => setHoverIdx(null)}
              />
            )
          })}
        </g>

        {/* Center value */}
        <text
          x={cx}
          y={cy - 7}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            fontSize: valueFontSize,
            fontWeight: 700,
            fontFamily: 'var(--fc-font, system-ui)',
            fill: 'var(--fc-text-primary, #f0f0f5)',
            letterSpacing: '-0.02em',
            fontVariantNumeric: 'tabular-nums',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          {centerValue}
        </text>

        {/* Center sub-label */}
        <text
          x={cx}
          y={cy + valueFontSize * 0.7 + 4}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            fontSize: 11,
            fontWeight: 600,
            fontFamily: 'var(--fc-font, system-ui)',
            fill: 'var(--fc-text-secondary, rgba(240,240,245,0.5))',
            letterSpacing: '0.05em',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          {centerSub.toUpperCase()}
        </text>
      </svg>

      <Legend items={data.map((d, i) => ({ color: colors[i], label: d.label }))} />
    </div>
  )
}
