import { Sparkline } from '../Sparkline'
import { formatValue as defaultFormat } from '../../utils/formatters'
import type { MetricCardProps } from './types'

const POSITIVE_COLOR = '#10b981'
const NEGATIVE_COLOR = '#ef4444'
const NEUTRAL_COLOR = 'rgba(240,240,245,0.5)'

export function MetricCard({
  label,
  value,
  formatValue = defaultFormat,
  trend,
  trendLabel,
  sparkline,
  sparklineColor,
  sparklineVariant = 'area',
  className,
  style,
}: MetricCardProps) {
  const displayValue = typeof value === 'number' ? formatValue(value) : value

  const hasTrend = trend !== undefined
  const isPositive = hasTrend && trend > 0
  const isNegative = hasTrend && trend < 0

  const trendColor = isPositive ? POSITIVE_COLOR : isNegative ? NEGATIVE_COLOR : NEUTRAL_COLOR
  const trendBg = isPositive
    ? 'rgba(16,185,129,0.12)'
    : isNegative
    ? 'rgba(239,68,68,0.12)'
    : 'rgba(255,255,255,0.06)'
  const trendArrow = isPositive ? '↑' : isNegative ? '↓' : '→'

  // Default sparkline color follows trend direction
  const resolvedSparklineColor = sparklineColor
    ?? (isPositive ? POSITIVE_COLOR : isNegative ? NEGATIVE_COLOR : '#3b82f6')

  const hasSparkline = sparkline && sparkline.length >= 2
  const cardPadding = '20px'

  return (
    <div
      className={className}
      style={{
        background: 'var(--fc-surface, #13131f)',
        border: '1px solid var(--fc-border, rgba(255,255,255,0.08))',
        borderRadius: 10,
        fontFamily: 'var(--fc-font, system-ui)',
        overflow: 'hidden',
        ...style,
      }}
    >
      <div style={{ padding: hasSparkline ? `${cardPadding} ${cardPadding} 16px` : cardPadding }}>
        {/* Label */}
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--fc-text-secondary, rgba(240,240,245,0.5))',
            marginBottom: 10,
          }}
        >
          {label}
        </div>

        {/* Value */}
        <div
          style={{
            fontSize: 32,
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: 'var(--fc-text-primary, #f0f0f5)',
            lineHeight: 1,
            marginBottom: hasTrend ? 12 : 0,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {displayValue}
        </div>

        {/* Trend row */}
        {hasTrend && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 3,
                padding: '3px 8px',
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 600,
                color: trendColor,
                background: trendBg,
              }}
            >
              {trendArrow} {Math.abs(trend).toFixed(1)}%
            </span>
            {trendLabel && (
              <span
                style={{
                  fontSize: 12,
                  color: 'var(--fc-text-tertiary, rgba(240,240,245,0.28))',
                }}
              >
                {trendLabel}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Sparkline — flush to card edges */}
      {hasSparkline && (
        <Sparkline
          data={sparkline}
          color={resolvedSparklineColor}
          variant={sparklineVariant}
          height={52}
          strokeWidth={1.5}
        />
      )}
    </div>
  )
}
