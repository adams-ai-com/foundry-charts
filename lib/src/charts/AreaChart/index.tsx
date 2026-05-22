import React, { useCallback, useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { XAxis, YAxis } from '../../components/Axis'
import { Tooltip, TooltipRow } from '../../components/Tooltip'
import { Legend } from '../../components/Legend'
import { getSeriesColor, CHART_MARGINS } from '../../theme/default-theme'
import { formatValue } from '../../utils/formatters'
import type { AreaChartProps } from './types'

type TooltipState = {
  x: number
  y: number
  title: string
  rows: TooltipRow[]
} | null

export function AreaChart({
  data,
  series,
  xKey,
  variant = 'stacked',
  height = 320,
  formatY = formatValue,
  formatX,
  className,
  style,
}: AreaChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
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

  const categories = data.map((d) => String(d[xKey]))
  const seriesColors = series.map((s, i) => getSeriesColor(i, s.color))

  // Stack layout
  const stackGen = d3.stack<Record<string, string | number>>()
    .keys(series.map((s) => s.key))
    .order(d3.stackOrderNone)
    .offset(d3.stackOffsetNone)

  const stackedData = variant === 'stacked' ? stackGen(data) : null

  const yMax = variant === 'stacked'
    ? Math.max(...stackedData!.at(-1)!.map((d) => d[1]))
    : Math.max(...data.flatMap((d) => series.map((s) => Number(d[s.key] ?? 0))))

  const yScale = d3.scaleLinear().domain([0, yMax * 1.1]).nice().range([innerH, 0])
  const xScale = d3.scalePoint().domain(categories).range([0, innerW]).padding(0.05)

  const yTicks = yScale.ticks(5).map((v) => ({ value: v, y: yScale(v) }))
  const xTicks = categories.map((c) => ({ value: c, x: xScale(c) ?? 0 }))

  const curve = d3.curveCatmullRom.alpha(0.5)

  const areaGen = d3.area<[number, number]>()
    .x((_, i) => xScale(categories[i]) ?? 0)
    .y0((d) => yScale(d[0]))
    .y1((d) => yScale(d[1]))
    .curve(curve)

  const lineGen = d3.line<[number, number]>()
    .x((_, i) => xScale(categories[i]) ?? 0)
    .y((d) => yScale(d[1]))
    .curve(curve)

  // For overlapping variant
  const overlapAreaGen = (key: string) =>
    d3.area<Record<string, string | number>>()
      .x((_d, i) => xScale(categories[i]) ?? 0)
      .y0(yScale(0))
      .y1((d) => yScale(Number(d[key] ?? 0)))
      .curve(curve)

  const overlapLineGen = (key: string) =>
    d3.line<Record<string, string | number>>()
      .x((_d, i) => xScale(categories[i]) ?? 0)
      .y((d) => yScale(Number(d[key] ?? 0)))
      .curve(curve)

  // Invisible bisect overlay for tooltips
  const handlePointerMove = useCallback(
    (event: React.PointerEvent<SVGRectElement>) => {
      if (!svgRef.current) return
      const svgRect = svgRef.current.getBoundingClientRect()
      const mouseX = event.clientX - svgRect.left - m.left

      // Find nearest category
      const positions = categories.map((c) => xScale(c) ?? 0)
      let nearestIdx = 0
      let minDist = Infinity
      positions.forEach((px, i) => {
        const d = Math.abs(px - mouseX)
        if (d < minDist) { minDist = d; nearestIdx = i }
      })

      const datum = data[nearestIdx]
      const nearestX = positions[nearestIdx]
      const rows: TooltipRow[] = series.map((s, si) => ({
        color: seriesColors[si],
        label: s.label,
        value: formatY(Number(datum[s.key] ?? 0)),
      }))

      setTooltip({
        x: nearestX,
        y: event.clientY - svgRect.top - m.top,
        title: String(datum[xKey]),
        rows,
      })
    },
    [categories, xScale, data, series, seriesColors, formatY, xKey, m.left, m.top],
  )

  const handlePointerLeave = useCallback(() => setTooltip(null), [])

  // Animate: before mount, collapse all areas to the bottom
  const animatedAreaGen = mounted ? areaGen : d3.area<[number, number]>()
    .x((_d, i) => xScale(categories[i]) ?? 0)
    .y0(yScale(0)).y1(yScale(0)).curve(curve)

  const animatedOverlapArea = (key: string) => mounted
    ? overlapAreaGen(key)
    : d3.area<Record<string, string | number>>()
        .x((_d, i) => xScale(categories[i]) ?? 0)
        .y0(yScale(0)).y1(yScale(0)).curve(curve)

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: '100%', ...style }}
      onPointerLeave={handlePointerLeave}
    >
      <svg
        ref={svgRef}
        width={width}
        height={height}
        style={{ display: 'block', overflow: 'visible', touchAction: 'none' }}
      >
        <defs>
          {seriesColors.map((color, i) => (
            <linearGradient key={i} id={`fc-area-grad-${i}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={variant === 'stacked' ? 0.85 : 0.5} />
              <stop offset="100%" stopColor={color} stopOpacity={variant === 'stacked' ? 0.6 : 0.05} />
            </linearGradient>
          ))}
        </defs>

        <g transform={`translate(${m.left},${m.top})`}>
          <YAxis ticks={yTicks} x={0} width={innerW} formatTick={formatY} />
          <XAxis ticks={xTicks} y={innerH} formatTick={formatX} />

          {variant === 'stacked' && stackedData && (
            [...stackedData].reverse().map((layer, revIdx) => {
              const si = stackedData.length - 1 - revIdx
              const color = seriesColors[si]
              const aPath = animatedAreaGen(layer as unknown as [number, number][])
              const lPath = mounted ? lineGen(layer as unknown as [number, number][]) : null
              return (
                <g key={si}>
                  <path
                    d={aPath ?? ''}
                    fill={`url(#fc-area-grad-${si})`}
                    style={{ transition: 'd var(--fc-transition-slow, 400ms ease)' }}
                  />
                  {lPath && (
                    <path
                      d={lPath}
                      fill="none"
                      stroke={color}
                      strokeWidth={2}
                      opacity={0.9}
                    />
                  )}
                </g>
              )
            })
          )}

          {variant === 'overlapping' && series.map((s, si) => {
            const color = seriesColors[si]
            const aPath = animatedOverlapArea(s.key)(data)
            const lPath = mounted ? overlapLineGen(s.key)(data) : null
            return (
              <g key={si}>
                <path
                  d={aPath ?? ''}
                  fill={`url(#fc-area-grad-${si})`}
                  style={{ transition: 'd var(--fc-transition-slow, 400ms ease)' }}
                />
                {lPath && (
                  <path
                    d={lPath}
                    fill="none"
                    stroke={color}
                    strokeWidth={2}
                    opacity={0.9}
                  />
                )}
              </g>
            )
          })}

          {/* Invisible overlay for tooltip bisect */}
          <rect
            x={0} y={0}
            width={innerW} height={innerH}
            fill="transparent"
            style={{ cursor: 'crosshair' }}
            onPointerMove={handlePointerMove}
          />

          {/* Vertical crosshair */}
          {tooltip && (
            <line
              x1={tooltip.x} x2={tooltip.x}
              y1={0} y2={innerH}
              stroke="rgba(255,255,255,0.15)"
              strokeWidth={1}
              strokeDasharray="3 3"
              style={{ pointerEvents: 'none' }}
            />
          )}

          {tooltip && (
            <Tooltip {...tooltip} containerWidth={innerW} containerHeight={innerH} />
          )}
        </g>
      </svg>

      <Legend items={series.map((s, i) => ({ color: seriesColors[i], label: s.label }))} />
    </div>
  )
}
