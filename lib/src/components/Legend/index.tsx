
export type LegendItem = {
  color: string
  label: string
}

type LegendProps = {
  items: LegendItem[]
}

export function Legend({ items }: LegendProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px 20px',
        marginTop: 12,
        fontFamily: 'var(--fc-font, system-ui)',
      }}
    >
      {items.map((item) => (
        <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 3,
              background: item.color,
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: 12,
              color: 'var(--fc-text-secondary, rgba(240,240,245,0.5))',
            }}
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  )
}
