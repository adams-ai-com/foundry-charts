'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useIsMobile } from '@/hooks/useIsMobile'

const charts = [
  { href: '/docs/charts/bar-chart', label: 'Bar Chart' },
  { href: '/docs/charts/line-chart', label: 'Line Chart' },
  { href: '/docs/charts/metric-card', label: 'Metric Card' },
]

export function DocsNav() {
  const pathname = usePathname()
  const isMobile = useIsMobile()
  const [open, setOpen] = useState(false)

  const currentLabel = charts.find((c) => c.href === pathname)?.label ?? 'Docs'

  if (isMobile) {
    return (
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          background: '#0d0d14',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        {/* Mobile top bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 20px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link
              href="/"
              style={{ fontSize: 13, color: 'rgba(240,240,245,0.4)' }}
            >
              ← Home
            </Link>
            <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: 13 }}>/</span>
            <span style={{ fontSize: 13, color: '#f0f0f5', fontWeight: 600 }}>
              {currentLabel}
            </span>
          </div>
          <button
            onClick={() => setOpen((o) => !o)}
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 6,
              color: 'rgba(240,240,245,0.7)',
              fontSize: 12,
              padding: '5px 10px',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>

        {/* Dropdown menu */}
        {open && (
          <div
            style={{
              padding: '8px 16px 16px',
              borderTop: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'rgba(240,240,245,0.28)',
                padding: '4px 8px',
                marginBottom: 4,
              }}
            >
              Charts
            </div>
            {charts.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                onClick={() => setOpen(false)}
                style={{
                  display: 'block',
                  padding: '9px 8px',
                  borderRadius: 6,
                  fontSize: 14,
                  color: pathname === c.href ? '#f0f0f5' : 'rgba(240,240,245,0.5)',
                  background: pathname === c.href ? 'rgba(255,255,255,0.08)' : 'transparent',
                }}
              >
                {c.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    )
  }

  // Desktop sidebar
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
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Link href="/" style={{ display: 'block', padding: '0 24px', marginBottom: 32 }}>
        <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.02em', color: '#f0f0f5' }}>
          Foundry Charts
        </div>
        <div style={{ fontSize: 11, color: 'rgba(240,240,245,0.3)', marginTop: 2, letterSpacing: '0.04em' }}>
          v0.1.0
        </div>
      </Link>

      <div style={{ padding: '0 16px', marginBottom: 8 }}>
        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'rgba(240,240,245,0.28)',
            padding: '0 8px',
            marginBottom: 4,
          }}
        >
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
