'use client'

import Link from 'next/link'
import { BarChart, formatCurrency } from 'foundry-charts'

const demoData = [
  { month: 'Jan', parts: 28000, labor: 19000, sublet: 4200 },
  { month: 'Feb', parts: 31000, labor: 22000, sublet: 3800 },
  { month: 'Mar', parts: 27000, labor: 18500, sublet: 5100 },
  { month: 'Apr', parts: 35000, labor: 24000, sublet: 4600 },
  { month: 'May', parts: 29000, labor: 21000, sublet: 3900 },
  { month: 'Jun', parts: 38000, labor: 26000, sublet: 5800 },
]
const demoSeries = [
  { key: 'parts', label: 'Parts' },
  { key: 'labor', label: 'Labor' },
  { key: 'sublet', label: 'Sublet' },
]

const USAGE_CODE = `import { BarChart, formatCurrency } from 'foundry-charts'
import 'foundry-charts/styles'

const data = [
  { month: 'Jan', parts: 28000, labor: 19000, sublet: 4200 },
  { month: 'Feb', parts: 31000, labor: 22000, sublet: 3800 },
  // ...
]

export function RevenueChart() {
  return (
    <BarChart
      data={data}
      series={[
        { key: 'parts', label: 'Parts' },
        { key: 'labor', label: 'Labor' },
        { key: 'sublet', label: 'Sublet' },
      ]}
      xKey="month"
      variant="stacked"
      formatY={formatCurrency}
    />
  )
}`

const features = [
  {
    title: 'Dark-mode first',
    body: 'Designed for dark backgrounds. Light mode is the adaptation, not the origin. One CSS import sets the whole theme.',
  },
  {
    title: 'Opinionated defaults',
    body: 'No rainbow palettes, no 3D, no chartjunk. Clean gridlines, readable labels, subtle animations — beautiful out of the box.',
  },
  {
    title: 'Useful tooltips',
    body: 'Context-aware formatting: $1.2M not 1234567.89. Configurable formatters for currency, percent, or anything custom.',
  },
  {
    title: 'Business-optimized',
    body: 'Dealer analytics, fleet dashboards, revenue breakdowns — the chart types that actually show up in real business software.',
  },
]

export default function Home() {
  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Top nav */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backdropFilter: 'blur(12px)',
          background: 'rgba(13,13,20,0.8)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div
          style={{
            maxWidth: 1080,
            margin: '0 auto',
            padding: '0 20px',
            height: 56,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#f0f0f5', letterSpacing: '-0.02em' }}>
              Foundry Charts
            </span>
            <span
              style={{
                fontSize: 11,
                color: '#3b82f6',
                background: 'rgba(59,130,246,0.12)',
                border: '1px solid rgba(59,130,246,0.2)',
                borderRadius: 20,
                padding: '2px 8px',
                fontWeight: 500,
              }}
            >
              v0.1
            </span>
          </div>
          <nav className="fc-nav-secondary">
            <Link
              href="/docs/charts/bar-chart"
              style={{
                padding: '6px 12px',
                fontSize: 13,
                color: 'rgba(240,240,245,0.6)',
                borderRadius: 6,
                transition: 'color 150ms',
              }}
            >
              Docs
            </Link>
            <Link
              href="/examples"
              style={{
                padding: '6px 12px',
                fontSize: 13,
                color: 'rgba(240,240,245,0.6)',
                borderRadius: 6,
                transition: 'color 150ms',
              }}
            >
              Examples
            </Link>
            <a
              href="https://github.com/adams-ai-com/foundry-charts"
              style={{
                padding: '6px 12px',
                fontSize: 13,
                color: 'rgba(240,240,245,0.6)',
                borderRadius: 6,
                transition: 'color 150ms',
              }}
            >
              GitHub
            </a>
            <span
              style={{
                padding: '4px 10px',
                fontSize: 11,
                color: 'rgba(240,240,245,0.35)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 20,
                fontWeight: 500,
                letterSpacing: '0.02em',
              }}
            >
              React
            </span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="fc-hero-padding" style={{ maxWidth: 1080, margin: '0 auto', padding: '80px 40px 72px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(59,130,246,0.1)',
            border: '1px solid rgba(59,130,246,0.2)',
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
            fontSize: 'clamp(36px, 6vw, 68px)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1.05,
            color: '#f0f0f5',
            marginBottom: 20,
            maxWidth: 680,
          }}
          className="fc-hero-h1"
        >
          Beautiful charts
          <br />
          <span style={{ color: 'rgba(240,240,245,0.3)' }}>for React.</span>
        </h1>

        <p
          style={{
            fontSize: 18,
            color: 'rgba(240,240,245,0.5)',
            maxWidth: 500,
            lineHeight: 1.65,
            marginBottom: 40,
          }}
        >
          Dark-mode first. Opinionated defaults that actually look good.
          Business-dashboard chart types no one else has. Built on D3.
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 72 }}>
          <Link
            href="/docs/charts/bar-chart"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: '#3b82f6',
              color: '#fff',
              padding: '10px 22px',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: '-0.01em',
            }}
          >
            Explore docs →
          </Link>
          <a
            href="https://github.com/adams-ai-com/foundry-charts"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(255,255,255,0.05)',
              color: 'rgba(240,240,245,0.7)',
              padding: '10px 22px',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 500,
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            View on GitHub
          </a>
        </div>

        {/* Hero chart */}
        <div
          style={{
            background: '#13131f',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 12,
            padding: '24px 28px 16px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 20,
            }}
          >
            <span style={{ fontSize: 13, color: 'rgba(240,240,245,0.4)', fontWeight: 500 }}>
              Service Revenue by Month
            </span>
            <span style={{ fontSize: 11, color: 'rgba(240,240,245,0.2)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Live demo
            </span>
          </div>
          <BarChart
            data={demoData}
            series={demoSeries}
            xKey="month"
            variant="stacked"
            height={280}
            formatY={formatCurrency}
          />
        </div>
      </section>

      {/* Quick start */}
      <section
        style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          background: 'rgba(255,255,255,0.015)',
        }}
      >
        <div className="fc-section-padding" style={{ maxWidth: 1080, margin: '0 auto', padding: '64px 40px' }}>
          <div className="fc-quickstart-grid">
            <div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#3b82f6',
                  marginBottom: 12,
                }}
              >
                Get started
              </div>
              <h2
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  color: '#f0f0f5',
                  lineHeight: 1.2,
                  marginBottom: 16,
                }}
              >
                Drop in a chart
              </h2>
              <p style={{ fontSize: 14, color: 'rgba(240,240,245,0.45)', lineHeight: 1.7, marginBottom: 24 }}>
                Import a component, pass your data. That&apos;s it — you get
                animations, responsive layout, hover tooltips, and a legend
                for free.
              </p>
              <Link
                href="/docs/charts/bar-chart"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 13,
                  color: '#3b82f6',
                  fontWeight: 500,
                }}
              >
                Read the docs →
              </Link>
            </div>

            <div>
              <pre
                style={{
                  background: '#13131f',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 10,
                  padding: '20px 24px',
                  fontSize: 12,
                  lineHeight: 1.75,
                  color: 'rgba(240,240,245,0.7)',
                  overflowX: 'auto',
                  fontFamily: '"SF Mono", "Fira Code", "Cascadia Code", monospace',
                  margin: 0,
                }}
              >
                <code>{USAGE_CODE}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="fc-section-padding" style={{ maxWidth: 1080, margin: '0 auto', padding: '64px 40px 96px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 1,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: 12,
            overflow: 'hidden',
          }}
        >
          {features.map((f) => (
            <div key={f.title} style={{ background: '#0d0d14', padding: '28px 24px' }}>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#f0f0f5',
                  marginBottom: 8,
                  letterSpacing: '-0.01em',
                }}
              >
                {f.title}
              </div>
              <div style={{ fontSize: 13, color: 'rgba(240,240,245,0.4)', lineHeight: 1.65 }}>
                {f.body}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        className="fc-footer-padding"
        style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          padding: '32px 40px',
        }}
      >
        <div
          style={{
            maxWidth: 1080,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <span style={{ fontSize: 13, color: 'rgba(240,240,245,0.25)' }}>
            Foundry Charts · MIT License · Built by{' '}
            <a
              href="https://adams-ai.com"
              style={{ color: 'rgba(240,240,245,0.4)' }}
            >
              Adams AI
            </a>
          </span>
          <div style={{ display: 'flex', gap: 20 }}>
            {[
              { label: 'Docs', href: '/docs/charts/bar-chart' },
              { label: 'GitHub', href: 'https://github.com/adams-ai-com/foundry-charts' },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                style={{ fontSize: 13, color: 'rgba(240,240,245,0.3)' }}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
