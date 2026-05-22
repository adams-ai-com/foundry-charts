import React, { useCallback, useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { YAxis } from '../../components/Axis'
import { Tooltip } from '../../components/Tooltip'
import { Legend } from '../../components/Legend'
import { getSeriesColor, CHART_MARGINS } from '../../theme/default-theme'
import { formatValue } from '../../utils/formatters'
import type { ScatterChartProps, ScatterDatum } from './types'

const SCATTER_MARGINS = { ...CHART_MARGINS, bottom: 52 }
const DOT_R = 5
const BUBBLE_MIN_R = 4
const BUBBLE_MAX_R = 24

type TooltipState = {
  x: number
  y: number
  title: string
  rows: { color: string; label: string; value: string }[]
} | null

export function ScatterChart({
  series,
  height = 360,
  formatX = formatValue,
  formatY = formatValue,
  formatZ = formatValue,
  xLabel,
  yLabel,
  quadrants = [],
  variant = 'scatter',
  className,
  style,
}: ScatterChartProps) {
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

  const m = SCATTER_MARGINS
  const innerW = width - m.left - m.right
  const innerH = height - m.top - m.bottom

  const allX = series.flatMap((s) => s.data.map((d) => d.x))
  const allY = series.flatMap((s) => s.data.map((d) => d.y))
  const allZ = variant === 'bubble' ? series.flatMap((s) => s.data.map((d) => d.z ?? 1)) : []

  const xPad = ((Math.max(...allX) - Math.min(...allX)) || 1) * 0.08
  const yPad = ((Math.max(...allY) - Math.min(...allY)) || 1) * 0.1

  const xScale = d3.scaleLinear()
    .domain([Math.min(...allX) - xPad, Math.max(...allX) + xPad])
    .nice()
    .range([0, innerW])

  const yScale = d3.scaleLinear()
    .domain([Math.min(0, Math.min(...allY) - yPad), Math.max(...allY) + yPad])
    .nice()
    .range([innerH, 0])

  const zScale = variant === 'bubble' && allZ.length > 0
    ? d3.scaleSqrt().domain([0, Math.max(...allZ)]).range([BUBBLE_MIN_R, BUBBLE_MAX_R])
    : null

  const yTicks = yScale.ticks(5).map((v) => ({ value: v, y: yScale(v) }))

  const xTickCount = Math.max(3, Math.min(6, Math.floor(innerW / 80)))
  const xTicks = xScale.ticks(xTickCount)

  const seriesColors = series.map((s, i) => getSeriesColor(i, s.color))

  const handlePointerLeave = useCallback(() => setTooltip(null), [])

  const handleDotHover = useCallback(
    (event: React.PointerEvent<SVGCircleElement>, datum: ScatterDatum, seriesIdx: number) => {
      const svgRect = (event.currentTarget.closest('svg') as SVGSVGElement).getBoundingClientRect()
      const svgX = event.clientX - svgRect.left - m.left
      const svgY = event.clientY - svgRect.top - m.top
      const color = seriesColors[seriesIdx]

      const rows: { color: string; label: string; value: string }[] = [
        { color, label: 'X', value: formatX(datum.x) },
        { color, label: 'Y', value: formatY(datum.y) },
      ]
      if (variant === 'bubble' && datum.z !== undefined) {
        rows.push({ color, label: 'Size', value: formatZ(datum.z) })
      }

      setTooltip({
        x: svgX,
        y: svgY,
        title: datum.label ?? series[seriesIdx].label,
        rows,
      })
    },
    [series, seriesColors, formatX, formatY, formatZ, variant, m.left, m.top],
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
          <YAxis ticks={yTicks} x={0} width={innerW} formatTick={formatY} />

          {/* X-axis grid lines + ticks */}
          {xTicks.map((v) => (
            <g key={v}>
              <line
                x1={xScale(v)} x2={xScale(v)}
                y1={0} y2={innerH}
                stroke="rgba(255,255,255,0.05)" strokeWidth={1}
              />
              <text
                x={xScale(v)} y={innerH + 16}
                textAnchor="middle"
                style={{ fontSize: 11, fontFamily: 'var(--fc-font, system-ui)', fill: 'rgba(240,240,245,0.35)', userSelect: 'none' }}
              >
                {formatX(v)}
              </text>
            </g>
          ))}

          {/* Axis labels */}
          {xLabel && (
            <text
              x={innerW / 2} y={innerH + 40}
              textAnchor="middle"
              style={{ fontSize: 11, fontFamily: 'var(--fc-font, system-ui)', fill: 'rgba(240,240,245,0.3)', userSelect: 'none', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}
            >
              {xLabel}
            </text>
          )}
          {yLabel && (
            <text
              transform={`translate(${-m.left + 14}, ${innerH / 2}) rotate(-90)`}
              textAnchor="middle"
              style={{ fontSize: 11, fontFamily: 'var(--fc-font, system-ui)', fill: 'rgba(240,240,245,0.3)', userSelect: 'none', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}
            >
              {yLabel}
            </text>
          )}

          {/* Quadrant lines */}
          {quadrants.map((q, i) => {
            if (q.axis === 'x') {
              const qy = yScale(q.value)
              return (
                <g key={i}>
                  <line x1={0} x2={innerW} y1={qy} y2={qy} stroke="rgba(255,255,255,0.18)" strokeWidth={1} strokeDasharray="4 4" />
                  {q.label && (
                    <text x={4} y={qy - 5} style={{ fontSize: 10, fontFamily: 'var(--fc-font, system-ui)', fill: 'rgba(240,240,245,0.3)', userSelect: 'none' }}>{q.label}</text>
                  )}
                </g>
              )
            } else {
              const qx = xScale(q.value)
              return (
                <g key={i}>
                  <line x1={qx} x2={qx} y1={0} y2={innerH} stroke="rgba(255,255,255,0.18)" strokeWidth={1} strokeDasharray="4 4" />
                  {q.label && (
                    <text x={qx + 4} y={12} style={{ fontSize: 10, fontFamily: 'var(--fc-font, system-ui)', fill: 'rgba(240,240,245,0.3)', userSelect: 'none' }}>{q.label}</text>
                  )}
                </g>
              )
            }
          })}

          {/* Dots */}
          {series.map((s, si) => {
            const color = seriesColors[si]
            return s.data.map((d, di) => {
              const cx = xScale(d.x)
              const cy = yScale(d.y)
              const r = zScale ? zScale(d.z ?? 1) : DOT_R
              return (
                <circle
                  key={`${si}-${di}`}
                  cx={cx}
                  cy={mounted ? cy : innerH}
                  r={mounted ? r : 0}
                  fill={color}
                  fillOpacity={variant === 'bubble' ? 0.55 : 0.85}
                  stroke={color}
                  strokeWidth={variant === 'bubble' ? 1.5 : 0}
                  strokeOpacity={0.9}
                  style={{
                    transition: 'cy var(--fc-transition-slow, 400ms ease), r var(--fc-transition-slow, 400ms ease)',
                    cursor: 'crosshair',
                  }}
                  onPointerMove={(e) => handleDotHover(e, d, si)}
                />
              )
            })
          })}

          {tooltip && (
            <Tooltip {...tooltip} containerWidth={innerW} containerHeight={innerH} />
          )}
        </g>
      </svg>

      <Legend items={series.map((s, i) => ({ color: seriesColors[i], label: s.label }))} />
    </div>
  )
}
