'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const charts = [
  { href: '/charts/bar-chart', label: 'Bar Chart' },
]

export function Nav() {
  const pathname = usePathname()

  return (
    <nav
      style={{
        width: 220,
        flexShrink: 0,
        borderRight: '1px solid rgba(255,255,255,0.06)',
        padding: '32px 0',
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflowY: 'auto',
      }}
    >
      <Link href="/" style={{ display: 'block', padding: '0 24px', marginBottom: 32 }}>
        <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.02em', color: '#f0f0f5' }}>
          Foundry Charts
        </div>
        <div style={{ fontSize: 11, color: 'rgba(240,240,245,0.35)', marginTop: 2, letterSpacing: '0.04em' }}>
          v0.1.0
        </div>
      </Link>

      <div style={{ padding: '0 16px', marginBottom: 8 }}>
        <div style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'rgba(240,240,245,0.3)',
          padding: '0 8px',
          marginBottom: 4,
        }}>
          Charts
        </div>
        {charts.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            style={{
              display: 'block',
              padding: '7px 8px',
              borderRadius: 6,
              fontSize: 13,
              color: pathname === c.href ? '#f0f0f5' : 'rgba(240,240,245,0.5)',
              background: pathname === c.href ? 'rgba(255,255,255,0.08)' : 'transparent',
              transition: 'color 150ms, background 150ms',
            }}
          >
            {c.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
