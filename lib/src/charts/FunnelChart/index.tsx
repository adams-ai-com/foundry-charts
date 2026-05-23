import { useEffect, useRef, useState } from 'react'
import { getSeriesColor } from '../../theme/default-theme'
import { formatValue as defaultFormat } from '../../utils/formatters'
import type { FunnelChartProps } from './types'

export { FunnelChartProps }

const LABEL_COL  = 120   // left label column width
const VALUE_COL  = 80    // right value column width
const STAGE_GAP  = 3     // px gap between trapezoids
const MIN_BOTTOM = 0.08  // minimum bottom-width fraction for the last stage

export function FunnelChart({
  data,
  formatValue = defaultFormat,
  showConversion = true,
  height = 320,
  className,
  style,
}: FunnelChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [width, setWidth]   = useState(500)
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

  if (!data.length) {
    return <div ref={containerRef} className={className} style={{ width: '100%', height, ...style }} />
  }

  const topValue   = data[0].value
  const maxValue   = Math.max(...data.map((d) => d.value), 1)
  const funnelW    = width - LABEL_COL - VALUE_COL
  const totalGaps  = STAGE_GAP * (data.length - 1)
  const stageH     = (height - totalGaps) / data.length

  const stages = data.map((d, i) => {
    const topFrac    = (mounted ? d.value : maxValue) / maxValue
    const nextFrac   = i < data.length - 1
      ? (mounted ? data[i + 1].value : maxValue) / maxValue
      : MIN_BOTTOM
    const topW       = topFrac * funnelW
    const bottomW    = Math.max(nextFrac, i === data.length - 1 ? MIN_BOTTOM : 0) * funnelW
    const y          = i * (stageH + STAGE_GAP)
    const midY       = y + stageH / 2
    const fcx        = LABEL_COL + funnelW / 2
    const color      = getSeriesColor(i, d.color)
    const conversion = topValue > 0 ? d.value / topValue : 0

    return { d, topW, bottomW, y, midY, fcx, color, conversion }
  })

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: '100%', height, position: 'relative', ...style }}
    >
      <svg width={width} height={height}>
        {stages.map(({ d, topW, bottomW, y, midY, fcx, color, conversion }, i) => {
          const topLeft     = fcx - topW / 2
          const topRight    = fcx + topW / 2
          const bottomLeft  = fcx - bottomW / 2
          const bottomRight = fcx + bottomW / 2
          const points = `${topLeft},${y} ${topRight},${y} ${bottomRight},${y + stageH} ${bottomLeft},${y + stageH}`

          // Conversion badge (% of top stage)
          const showConv  = showConversion && i > 0
          const convLabel = `${Math.round(conversion * 100)}%`

          // Value label inside trapezoid (only if wide enough)
          const minW = Math.min(topW, bottomW)

          return (
            <g key={d.label}>
              {/* Trapezoid */}
              <polygon
                points={points}
                fill={color}
                opacity={0.85}
                style={{ transition: 'all 600ms cubic-bezier(0.4,0,0.2,1)' }}
              />

              {/* Stage label — left column */}
              <text
                x={LABEL_COL - 10}
                y={midY}
                textAnchor="end"
                dominantBaseline="middle"
                style={{ fontSize: 12, fill: '#f8f8ff', fontFamily: 'inherit', fontWeight: 500 }}
              >
                {d.label}
              </text>

              {/* Value — right column */}
              <text
                x={LABEL_COL + funnelW + 10}
                y={midY - (showConv ? 7 : 0)}
                textAnchor="start"
                dominantBaseline="middle"
                style={{ fontSize: 12, fill: '#f8f8ff', fontFamily: 'inherit', fontWeight: 600 }}
              >
                {formatValue(d.value)}
              </text>

              {/* Conversion rate below value */}
              {showConv && (
                <text
                  x={LABEL_COL + funnelW + 10}
                  y={midY + 8}
                  textAnchor="start"
                  dominantBaseline="middle"
                  style={{ fontSize: 10, fill: 'rgba(255,255,255,0.4)', fontFamily: 'inherit' }}
                >
                  {convLabel}
                </text>
              )}

              {/* Percentage label inside funnel (if space allows) */}
              {minW > 60 && (
                <text
                  x={fcx}
                  y={midY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{
                    fontSize: 11,
                    fill: 'rgba(255,255,255,0.6)',
                    fontFamily: 'inherit',
                    pointerEvents: 'none',
                  }}
                >
                  {i === 0 ? '100%' : `${Math.round(conversion * 100)}%`}
                </text>
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}
