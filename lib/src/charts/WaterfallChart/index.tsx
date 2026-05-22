import React, { useCallback, useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { XAxis, YAxis, ZeroLine } from '../../components/Axis'
import { Tooltip } from '../../components/Tooltip'
import { CHART_MARGINS, BAR_PADDING_INNER, BAR_PADDING_OUTER } from '../../theme/default-theme'
import { formatValue } from '../../utils/formatters'
import type { WaterfallChartProps, WaterfallDatum } from './types'

const COLOR_INCREASE  = '#10b981'
const COLOR_DECREASE  = '#ef4444'
const COLOR_TOTAL     = '#3b82f6'
const COLOR_SUBTOTAL  = '#8b5cf6'

type Segment = {
  label: string
  value: number
  cumStart: number
  cumEnd: number
  color: string
  isTotal: boolean
}

function buildSegments(data: WaterfallDatum[]): Segment[] {
  let running = 0
  return data.map((d) => {
    const isTotal = d.type === 'total' || d.type === 'subtotal'
    const color =
      d.type === 'total'    ? COLOR_TOTAL :
      d.type === 'subtotal' ? COLOR_SUBTOTAL :
      d.value >= 0          ? COLOR_INCREASE : COLOR_DECREASE

    if (isTotal) {
      const seg: Segment = { label: d.label, value: d.value, cumStart: 0, cumEnd: d.value, color, isTotal: true }
      running = d.value
      return seg
    }

    const cumStart = running
    const cumEnd = running + d.value
    running = cumEnd
    return { label: d.label, value: d.value, cumStart, cumEnd, color, isTotal: false }
  })
}

type TooltipState = {
  x: number
  y: number
  title: string
  rows: { color: string; label: string; value: string }[]
} | null

export function WaterfallChart({
  data,
  height = 320,
  formatValue: fmt = formatValue,
  formatX,
  showConnectors = true,
  showLabels = true,
  className,
  style,
}: WaterfallChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(600)
  const [tooltip, setTooltip] = useState<TooltipState>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!containerRef.current) return
    const ro = new ResizeObserver((entries) => setWidth(entries[0].contentRect.width))
    ro.observe(containerRef.current)
    setWidth(containerRef.current.clientWidth)
    return () => ro.disconnect()
  }, [])

  const m = CHART_MARGINS
  const innerW = width - m.left - m.right
  const innerH = height - m.top - m.bottom

  const segments = buildSegments(data)

  const allValues = segments.flatMap((s) => [s.cumStart, s.cumEnd])
  const rawMin = Math.min(0, ...allValues)
  const rawMax = Math.max(0, ...allValues)
  const yPad = (rawMax - rawMin) * 0.12

  const yScale = d3
    .scaleLinear()
    .domain([rawMin - (rawMin < 0 ? yPad * 0.4 : 0), rawMax + yPad])
    .nice()
    .range([innerH, 0])

  const xScale = d3
    .scaleBand()
    .domain(segments.map((s) => s.label))
    .range([0, innerW])
    .paddingInner(BAR_PADDING_INNER)
    .paddingOuter(BAR_PADDING_OUTER)

  const yZero = yScale(0)
  const yTicks = yScale.ticks(5).map((v) => ({ value: v, y: yScale(v) }))
  const xTicks = segments.map((s) => ({
    value: s.label,
    x: (xScale(s.label) ?? 0) + xScale.bandwidth() / 2,
  }))

  const handlePointerLeave = useCallback(() => setTooltip(null), [])

  const handleHover = useCallback(
    (event: React.PointerEvent, seg: Segment) => {
      const svgRect = (event.currentTarget.closest('svg') as SVGSVGElement).getBoundingClientRect()
      const svgX = event.clientX - svgRect.left - m.left
      const svgY = event.clientY - svgRect.top - m.top

      const isIncrease = !seg.isTotal && seg.value >= 0
      const isDecrease = !seg.isTotal && seg.value < 0
      const deltaLabel = isIncrease ? 'Increase' : isDecrease ? 'Decrease' : 'Total'
      const runningLabel = seg.isTotal ? null : 'Running total'

      setTooltip({
        x: svgX,
        y: svgY,
        title: seg.label,
        rows: [
          { color: seg.color, label: deltaLabel, value: (seg.value >= 0 ? '+' : '') + fmt(seg.value) },
          ...(runningLabel ? [{ color: 'rgba(240,240,245,0.3)', label: runningLabel, value: fmt(seg.cumEnd) }] : []),
        ],
      })
    },
    [fmt, m.left, m.top],
  )

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: '100%', ...style }}
      onPointerLeave={handlePointerLeave}
    >
      <svg
        width={width}
        height={height}
        style={{ display: 'block', overflow: 'visible', touchAction: 'none' }}
      >
        <g transform={`translate(${m.left},${m.top})`}>
          <YAxis ticks={yTicks} x={0} width={innerW} formatTick={fmt} />
          <XAxis ticks={xTicks} y={innerH} formatTick={formatX} />
          {rawMin < 0 && <ZeroLine x={0} width={innerW} y={yZero} />}

          {/* Connector lines */}
          {showConnectors && segments.map((seg, i) => {
            const next = segments[i + 1]
            if (!next || next.isTotal) return null
            const x1 = (xScale(seg.label) ?? 0) + xScale.bandwidth()
            const x2 = xScale(next.label) ?? 0
            const cy = yScale(seg.cumEnd)
            return (
              <line
                key={`connector-${i}`}
                x1={x1}
                x2={x2}
                y1={cy}
                y2={cy}
                stroke="rgba(255,255,255,0.15)"
                strokeWidth={1}
                strokeDasharray="3 3"
              />
            )
          })}

          {/* Bars */}
          {segments.map((seg, i) => {
            const bx = xScale(seg.label) ?? 0
            const bw = xScale.bandwidth()
            const yTop = yScale(Math.max(seg.cumStart, seg.cumEnd))
            const yBot = yScale(Math.min(seg.cumStart, seg.cumEnd))
            const bh = Math.max(1, yBot - yTop)

            // Animate from zero line when mounting
            const animY = mounted ? yTop : yZero
            const animH = mounted ? bh : 0

            // Label position
            const labelY = seg.value >= 0
              ? yTop - 6
              : yBot + 14

            const labelText = seg.isTotal
              ? fmt(seg.value)
              : (seg.value >= 0 ? '+' : '') + fmt(seg.value)

            return (
              <g key={i}>
                <rect
                  x={bx}
                  y={animY}
                  width={bw}
                  height={animH}
                  rx={3}
                  fill={seg.color}
                  opacity={0.9}
                  style={{
                    transition: 'y var(--fc-transition-slow, 400ms ease), height var(--fc-transition-slow, 400ms ease)',
                    cursor: 'crosshair',
                  }}
                  onPointerMove={(e) => handleHover(e, seg)}
                />
                {/* invisible full-height hover target */}
                <rect
                  x={bx}
                  y={0}
                  width={bw}
                  height={innerH}
                  fill="transparent"
                  onPointerMove={(e) => handleHover(e, seg)}
                />
                {showLabels && mounted && (
                  <text
                    x={bx + bw / 2}
                    y={labelY}
                    textAnchor="middle"
                    style={{
                      fontSize: 11,
                      fontFamily: 'var(--fc-font, system-ui)',
                      fill: seg.color,
                      fontWeight: 600,
                      userSelect: 'none',
                    }}
                  >
                    {labelText}
                  </text>
                )}
              </g>
            )
          })}

          {tooltip && (
            <Tooltip {...tooltip} containerWidth={innerW} containerHeight={innerH} />
          )}
        </g>
      </svg>
    </div>
  )
}
