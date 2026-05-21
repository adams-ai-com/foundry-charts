
export type TooltipRow = {
  color: string
  label: string
  value: string
}

type TooltipProps = {
  x: number
  y: number
  title: string
  rows: TooltipRow[]
  containerWidth: number
  containerHeight: number
}

const WIDTH = 180

export function Tooltip({ x, y, title, rows, containerWidth }: TooltipProps) {
  const flipX = x + WIDTH + 16 > containerWidth
  const left = flipX ? x - WIDTH - 12 : x + 12

  return (
    <foreignObject
      x={left}
      y={Math.max(4, y - 8)}
      width={WIDTH}
      height={rows.length * 24 + 44}
      style={{ pointerEvents: 'none', overflow: 'visible' }}
    >
      <div
        style={{
          background: 'var(--fc-tooltip-bg, #1e1e30)',
          border: '1px solid var(--fc-tooltip-border, rgba(255,255,255,0.12))',
          borderRadius: 'var(--fc-radius, 6px)',
          boxShadow: 'var(--fc-tooltip-shadow, 0 8px 32px rgba(0,0,0,0.5))',
          padding: '10px 12px',
          fontFamily: 'var(--fc-font, system-ui)',
          minWidth: WIDTH,
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: 'var(--fc-text-secondary, rgba(240,240,245,0.5))',
            marginBottom: 8,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          {title}
        </div>
        {rows.map((r) => (
          <div
            key={r.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 4,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 2,
                background: r.color,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: 12,
                color: 'var(--fc-text-secondary, rgba(240,240,245,0.5))',
                flex: 1,
              }}
            >
              {r.label}
            </span>
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: 'var(--fc-text-primary, #f0f0f5)',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {r.value}
            </span>
          </div>
        ))}
      </div>
    </foreignObject>
  )
}
