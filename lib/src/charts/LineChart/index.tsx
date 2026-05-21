import React, { useCallback, useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { XAxis, YAxis } from '../../components/Axis'
import { Tooltip, TooltipRow } from '../../components/Tooltip'
import { Legend } from '../../components/Legend'
import { getSeriesColor, CHART_MARGINS } from '../../theme/default-theme'
import { formatValue } from '../../utils/formatters'
import type { LineChartProps } from './types'

type TooltipState = {
  x: number
  y: number
  title: string
  rows: TooltipRow[]
} | null

export function LineChart({
  data,
  series,
  xKey,
  variant = 'line',
  curve = 'smooth',
  height = 320,
  formatY = formatValue,
  formatX,
  className,
  style,
}: LineChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(600)
  const [tooltip, setTooltip] = useState<TooltipState>(null)
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

  const m = CHART_MARGINS
  const innerW = width - m.left - m.right
  const innerH = height - m.top - m.bottom

  const categories = data.map((d) => String(d[xKey]))
  const seriesColors = series.map((s, i) => getSeriesColor(i, s.color))

  const xScale = d3.scalePoint<string>()
    .domain(categories)
    .range([0, innerW])
    .padding(0.1)

  let yMin = Infinity
  let yMax = -Infinity
  data.forEach((d) => {
    series.forEach((s) => {
      const v = Number(d[s.key] ?? 0)
      if (v < yMin) yMin = v
      if (v > yMax) yMax = v
    })
  })
  if (!isFinite(yMin)) { yMin = 0; yMax = 0 }

  const yPad = Math.max((yMax - yMin) * 0.12, Math.abs(yMax) * 0.08, 1)
  const yScale = d3.scaleLinear()
    .domain([Math.min(0, yMin - yPad * 0.3), yMax + yPad])
    .nice()
    .range([innerH, 0])

  const curveFactory = curve === 'smooth' ? d3.curveCatmullRom.alpha(0.5) : d3.curveLinear

  const yZero = yScale(0)

  const paths = series.map((s) => {
    const lineGen = d3.line<typeof data[0]>()
      .defined((d) => d[s.key] != null)
      .x((d) => xScale(String(d[xKey])) ?? 0)
      .y((d) => yScale(Number(d[s.key] ?? 0)))
      .curve(curveFactory)

    const areaGen = d3.area<typeof data[0]>()
      .defined((d) => d[s.key] != null)
      .x((d) => xScale(String(d[xKey])) ?? 0)
      .y0(yZero)
      .y1((d) => yScale(Number(d[s.key] ?? 0)))
      .curve(curveFactory)

    return {
      line: lineGen(data) ?? '',
      area: areaGen(data) ?? '',
    }
  })

  const yTicks = yScale.ticks(5).map((v) => ({ value: v, y: yScale(v) }))
  const xTicks = categories.map((c) => ({
    value: c,
    x: xScale(c) ?? 0,
  }))

  const xPositions = categories.map((c) => xScale(c) ?? 0)

  const handlePointerLeave = useCallback(() => {
    setTooltip(null)
    setHoverIdx(null)
  }, [])

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<SVGSVGElement>) => {
      const svgRect = event.currentTarget.getBoundingClientRect()
      const mouseX = event.clientX - svgRect.left - m.left

      let nearestIdx = 0
      let minDist = Infinity
      xPositions.forEach((px, i) => {
        const dist = Math.abs(px - mouseX)
        if (dist < minDist) {
          minDist = dist
          nearestIdx = i
        }
      })

      const d = data[nearestIdx]
      const rows: TooltipRow[] = series.map((s, si) => ({
        color: seriesColors[si],
        label: s.label,
        value: formatY(Number(d[s.key] ?? 0)),
      }))

      const dotYs = series.map((s) => yScale(Number(d[s.key] ?? 0)))
      const tipY = Math.min(...dotYs)

      setHoverIdx(nearestIdx)
      setTooltip({
        x: xPositions[nearestIdx],
        y: tipY,
        title: formatX ? formatX(categories[nearestIdx]) : categories[nearestIdx],
        rows,
      })
    },
    [data, series, seriesColors, formatY, formatX, xPositions, yScale, categories, m.left],
  )

  const hoverX = hoverIdx !== null ? (xScale(categories[hoverIdx]) ?? 0) : null

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: '100%', ...style }}
    >
      <svg
        width={width}
        height={height}
        style={{ display: 'block', overflow: 'visible', cursor: 'crosshair', touchAction: 'none' }}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <defs>
          {variant === 'area' && series.map((s, si) => (
            <linearGradient
              key={s.key}
              id={`fc-area-grad-${si}`}
              x1="0" y1="0" x2="0" y2="1"
            >
              <stop offset="0%" stopColor={seriesColors[si]} stopOpacity={0.3} />
              <stop offset="100%" stopColor={seriesColors[si]} stopOpacity={0.02} />
            </linearGradient>
          ))}
        </defs>

        <g transform={`translate(${m.left},${m.top})`}>
          <YAxis ticks={yTicks} x={0} width={innerW} formatTick={formatY} />
          <XAxis ticks={xTicks} y={innerH} formatTick={formatX} />

          {/* Area fills */}
          {variant === 'area' && series.map((s, si) => (
            <path
              key={`area-${s.key}`}
              d={paths[si].area}
              fill={`url(#fc-area-grad-${si})`}
              style={{
                opacity: mounted ? 1 : 0,
                transition: `opacity 500ms ease ${si * 80}ms`,
              }}
            />
          ))}

          {/* Lines */}
          {series.map((s, si) => (
            <path
              key={`line-${s.key}`}
              d={paths[si].line}
              stroke={seriesColors[si]}
              strokeWidth={2.5}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                opacity: mounted ? 1 : 0,
                transition: `opacity 500ms ease ${si * 80}ms`,
              }}
            />
          ))}

          {/* Data dots (always visible at each point) */}
          {mounted && series.map((s, si) => (
            data.map((d, di) => {
              const cx = xScale(String(d[xKey])) ?? 0
              const cy = yScale(Number(d[s.key] ?? 0))
              const isHovered = hoverIdx === di
              return (
                <circle
                  key={`dot-${si}-${di}`}
                  cx={cx}
                  cy={cy}
                  r={isHovered ? 5 : 3}
                  fill={isHovered ? seriesColors[si] : '#0d0d14'}
                  stroke={seriesColors[si]}
                  strokeWidth={isHovered ? 0 : 2}
                  style={{ transition: 'r 120ms ease, fill 120ms ease' }}
                />
              )
            })
          ))}

          {/* Hover vertical guide */}
          {hoverX !== null && (
            <line
              x1={hoverX}
              x2={hoverX}
              y1={0}
              y2={innerH}
              stroke="rgba(255,255,255,0.12)"
              strokeWidth={1}
              strokeDasharray="4 4"
            />
          )}

          {tooltip && (
            <Tooltip
              {...tooltip}
              containerWidth={innerW}
              containerHeight={innerH}
            />
          )}
        </g>
      </svg>

      <Legend items={series.map((s, i) => ({ color: seriesColors[i], label: s.label }))} />
    </div>
  )
}
