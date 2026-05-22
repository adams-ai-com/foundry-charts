import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { SERIES_COLORS } from '../../theme/default-theme'
import type { SparklineProps } from './types'

export function Sparkline({
  data,
  color = SERIES_COLORS[0],
  variant = 'area',
  height = 40,
  strokeWidth = 1.5,
  className,
  style,
}: SparklineProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(120)

  useEffect(() => {
    if (!containerRef.current) return
    const ro = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width)
    })
    ro.observe(containerRef.current)
    setWidth(containerRef.current.clientWidth)
    return () => ro.disconnect()
  }, [])

  if (!data || data.length < 2) {
    return <div ref={containerRef} className={className} style={{ width: '100%', height, ...style }} />
  }

  const gradId = `fc-spark-${color.replace(/[^a-z0-9]/gi, '')}-${height}`

  const xScale = d3.scaleLinear().domain([0, data.length - 1]).range([0, width])
  const [yMin, yMax] = d3.extent(data) as [number, number]
  const yPad = (yMax - yMin) * 0.15 || Math.abs(yMax) * 0.15 || 1
  const yScale = d3.scaleLinear().domain([yMin - yPad, yMax + yPad]).range([height, 0])

  const lineGen = d3.line<number>()
    .x((_, i) => xScale(i))
    .y((d) => yScale(d))
    .curve(d3.curveCatmullRom.alpha(0.5))

  const areaGen = d3.area<number>()
    .x((_, i) => xScale(i))
    .y0(height)
    .y1((d) => yScale(d))
    .curve(d3.curveCatmullRom.alpha(0.5))

  const linePath = lineGen(data) ?? ''
  const areaPath = areaGen(data) ?? ''

  return (
    <div ref={containerRef} className={className} style={{ width: '100%', ...style }}>
      <svg width={width} height={height} style={{ display: 'block' }}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        {variant === 'area' && (
          <path d={areaPath} fill={`url(#${gradId})`} />
        )}
        <path
          d={linePath}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
