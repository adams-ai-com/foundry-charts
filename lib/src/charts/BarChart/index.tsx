import React, { useCallback, useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { XAxis, YAxis, ZeroLine } from '../../components/Axis'
import { Tooltip, TooltipRow } from '../../components/Tooltip'
import { Legend } from '../../components/Legend'
import { getSeriesColor, CHART_MARGINS, BAR_PADDING_INNER, BAR_PADDING_OUTER, BAR_GROUP_INNER_PADDING } from '../../theme/default-theme'
import { formatValue } from '../../utils/formatters'
import type { BarChartProps } from './types'

type TooltipState = {
  x: number
  y: number
  title: string
  rows: TooltipRow[]
} | null

export function BarChart({
  data,
  series,
  xKey,
  variant = 'grouped',
  height = 320,
  formatY = formatValue,
  formatX,
  className,
  style,
}: BarChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(600)
  const [tooltip, setTooltip] = useState<TooltipState>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
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

  const xScale = d3
    .scaleBand()
    .domain(categories)
    .range([0, innerW])
    .paddingInner(BAR_PADDING_INNER)
    .paddingOuter(BAR_PADDING_OUTER)

  let yMin = 0
  let yMax = 0

  if (variant === 'grouped') {
    data.forEach((d) => {
      series.forEach((s) => {
        const v = Number(d[s.key] ?? 0)
        if (v < yMin) yMin = v
        if (v > yMax) yMax = v
      })
    })
  } else {
    data.forEach((d) => {
      let pos = 0
      let neg = 0
      series.forEach((s) => {
        const v = Number(d[s.key] ?? 0)
        if (v >= 0) pos += v
        else neg += v
      })
      if (pos > yMax) yMax = pos
      if (neg < yMin) yMin = neg
    })
  }

  const yPad = (yMax - yMin) * 0.1
  const yScale = d3
    .scaleLinear()
    .domain([yMin < 0 ? yMin - yPad * 0.5 : 0, yMax + yPad])
    .nice()
    .range([innerH, 0])

  const yZero = yScale(0)

  const yTicks = yScale.ticks(5).map((v) => ({ value: v, y: yScale(v) }))
  const xTicks = categories.map((c) => ({
    value: c,
    x: (xScale(c) ?? 0) + xScale.bandwidth() / 2,
  }))

  const xInner = variant === 'grouped'
    ? d3.scaleBand()
        .domain(series.map((s) => s.key))
        .range([0, xScale.bandwidth()])
        .paddingInner(BAR_GROUP_INNER_PADDING)
    : null

  const stackedData = variant === 'stacked'
    ? d3.stack<Record<string, string | number>>().keys(series.map((s) => s.key))(data)
    : null

  const handlePointerLeave = useCallback(() => setTooltip(null), [])

  const handleBarHover = useCallback(
    (event: React.PointerEvent<SVGRectElement>, categoryIdx: number) => {
      const svgRect = (event.currentTarget.closest('svg') as SVGSVGElement).getBoundingClientRect()
      const svgX = event.clientX - svgRect.left - m.left
      const svgY = event.clientY - svgRect.top - m.top

      const d = data[categoryIdx]
      const rows: TooltipRow[] = series.map((s, si) => ({
        color: seriesColors[si],
        label: s.label,
        value: formatY(Number(d[s.key] ?? 0)),
      }))

      setTooltip({
        x: svgX,
        y: svgY,
        title: String(d[xKey]),
        rows,
      })
    },
    [data, series, seriesColors, formatY, xKey, m.left, m.top],
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
          <YAxis
            ticks={yTicks}
            x={0}
            width={innerW}
            formatTick={formatY}
          />
          <XAxis
            ticks={xTicks}
            y={innerH}
            formatTick={formatX}
          />
          {yMin < 0 && <ZeroLine x={0} width={innerW} y={yZero} />}

          {variant === 'grouped' && xInner &&
            data.map((d, di) => {
              const catX = xScale(String(d[xKey])) ?? 0
              return (
                <g key={di} transform={`translate(${catX},0)`}>
                  {series.map((s, si) => {
                    const v = Number(d[s.key] ?? 0)
                    const bx = xInner(s.key) ?? 0
                    const bw = xInner.bandwidth()
                    const by = v >= 0 ? yScale(v) : yZero
                    const bh = Math.abs(yZero - yScale(v))
                    const color = seriesColors[si]
                    return (
                      <rect
                        key={s.key}
                        x={bx}
                        y={mounted ? by : yZero}
                        width={bw}
                        height={mounted ? bh : 0}
                        rx={3}
                        fill={color}
                        opacity={0.9}
                        style={{
                          transition: 'y var(--fc-transition-slow, 400ms ease), height var(--fc-transition-slow, 400ms ease)',
                          cursor: 'crosshair',
                        }}
                        onPointerMove={(e) => handleBarHover(e, di)}
                      />
                    )
                  })}
                  {/* invisible hover target covering full category width */}
                  <rect
                    x={0}
                    y={0}
                    width={xScale.bandwidth()}
                    height={innerH}
                    fill="transparent"
                    onPointerMove={(e) => handleBarHover(e, di)}
                  />
                </g>
              )
            })}

          {variant === 'stacked' && stackedData &&
            stackedData.map((layer, si) => {
              const color = seriesColors[si]
              return layer.map((seg, di) => {
                const catX = xScale(String(data[di][xKey])) ?? 0
                const bw = xScale.bandwidth()
                const y0 = yScale(seg[1])
                const y1 = yScale(seg[0])
                const by = Math.min(y0, y1)
                const bh = Math.abs(y1 - y0)
                return (
                  <rect
                    key={`${si}-${di}`}
                    x={catX}
                    y={mounted ? by : yZero}
                    width={bw}
                    height={mounted ? bh : 0}
                    fill={color}
                    opacity={0.9}
                    style={{
                      transition: 'y var(--fc-transition-slow, 400ms ease), height var(--fc-transition-slow, 400ms ease)',
                      cursor: 'crosshair',
                    }}
                    onPointerMove={(e) => handleBarHover(e, di)}
                  />
                )
              })
            })}

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
