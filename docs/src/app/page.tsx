'use client'

import Link from 'next/link'
import { BarChart } from 'foundry-charts'
import { formatCurrency } from 'foundry-charts'

const heroData = [
  { month: 'Jan', new: 42, used: 31, service: 18 },
  { month: 'Feb', new: 55, used: 27, service: 22 },
  { month: 'Mar', new: 48, used: 35, service: 20 },
  { month: 'Apr', new: 61, used: 29, service: 25 },
  { month: 'May', new: 53, used: 38, service: 19 },
  { month: 'Jun', new: 67, used: 33, service: 28 },
]

const heroSeries = [
  { key: 'new', label: 'New Units' },
  { key: 'used', label: 'Used Units' },
  { key: 'service', label: 'Service' },
]

const principles = [
  {
    title: 'Dark-mode first',
    body: 'Designed for dark backgrounds. Light mode is the adaptation, not the origin.',
  },
  {
    title: 'Opinionated defaults',
    body: 'No rainbow palettes, no 3D, no chartjunk. Ship beautiful out of the box.',
  },
  {
    title: 'Useful tooltips',
    body: 'Context-aware formatting: $1.2M, not 1234567.89. Configurable formatters.',
  },
  {
    title: 'Business-optimized',
    body: 'Dealer analytics, fleet dashboards, unit aging — the types no other library has.',
  },
]

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section
        style={{
          maxWidth: 1080,
          margin: '0 auto',
          padding: '96px 40px 64px',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(59,130,246,0.12)',
            border: '1px solid rgba(59,130,246,0.25)',
            borderRadius: 20,
            padding: '4px 12px',
            fontSize: 12,
            color: '#3b82f6',
            fontWeight: 500,
            marginBottom: 28,
          }}
        >
          Open source · MIT license
        </div>

        <h1
          style={{
            fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1.05,
            color: '#f0f0f5',
            marginBottom: 20,
            maxWidth: 700,
          }}
        >
          Beautiful charts
          <br />
          <span style={{ color: 'rgba(240,240,245,0.35)' }}>for React.</span>
        </h1>

        <p
          style={{
            fontSize: 18,
            color: 'rgba(240,240,245,0.55)',
            maxWidth: 520,
            lineHeight: 1.65,
            marginBottom: 40,
          }}
        >
          Dark-mode first. Opinionated defaults that actually look good.
          Business-dashboard chart types no one else has.
        </p>

        <div style={{ display: 'flex', gap: 12, marginBottom: 72 }}>
          <Link
            href="/charts/bar-chart"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: '#3b82f6',
              color: '#fff',
              padding: '11px 22px',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: '-0.01em',
            }}
          >
            View charts
          </Link>
          <a
            href="https://github.com/adams-ai/foundry-charts"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(255,255,255,0.06)',
              color: 'rgba(240,240,245,0.7)',
              padding: '11px 22px',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 500,
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            GitHub
          </a>
        </div>

        {/* Hero chart */}
        <div
          style={{
            background: '#13131f',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 12,
            padding: '28px 28px 20px',
          }}
        >
          <div style={{ fontSize: 13, color: 'rgba(240,240,245,0.4)', marginBottom: 20, fontWeight: 500 }}>
            Unit Sales by Month
          </div>
          <BarChart
            data={heroData}
            series={heroSeries}
            xKey="month"
            height={280}
          />
        </div>
      </section>

      {/* Principles */}
      <section
        style={{
          maxWidth: 1080,
          margin: '0 auto',
          padding: '0 40px 96px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 1,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 12,
            overflow: 'hidden',
          }}
        >
          {principles.map((p) => (
            <div
              key={p.title}
              style={{
                background: '#0d0d14',
                padding: '28px 24px',
              }}
            >
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#f0f0f5',
                  marginBottom: 8,
                  letterSpacing: '-0.01em',
                }}
              >
                {p.title}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: 'rgba(240,240,245,0.45)',
                  lineHeight: 1.6,
                }}
              >
                {p.body}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
