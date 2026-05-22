'use client'

import { useState } from 'react'
import { LineChart } from 'foundry-charts'
import { formatCurrency } from 'foundry-charts'
import { DocsNav } from '@/components/DocsNav'

const monthlyRevenue = [
  { month: 'Jan', revenue: 42000, target: 38000 },
  { month: 'Feb', revenue: 55000, target: 42000 },
  { month: 'Mar', revenue: 48000, target: 45000 },
  { month: 'Apr', revenue: 61000, target: 50000 },
  { month: 'May', revenue: 53000, target: 52000 },
  { month: 'Jun', revenue: 67000, target: 55000 },
  { month: 'Jul', revenue: 72000, target: 58000 },
  { month: 'Aug', revenue: 69000, target: 62000 },
]

const areaData = [
  { month: 'Jan', parts: 28000, labor: 19000 },
  { month: 'Feb', parts: 31000, labor: 22000 },
  { month: 'Mar', parts: 27000, labor: 18500 },
  { month: 'Apr', parts: 35000, labor: 24000 },
  { month: 'May', parts: 29000, labor: 21000 },
  { month: 'Jun', parts: 38000, labor: 26000 },
  { month: 'Jul', parts: 41000, labor: 29000 },
  { month: 'Aug', parts: 36000, labor: 24500 },
]

const singleSeries = [
  { key: 'revenue', label: 'Revenue' },
]

const twoSeries = [
  { key: 'revenue', label: 'Revenue' },
  { key: 'target', label: 'Target' },
]

const areaSeries = [
  { key: 'parts', label: 'Parts' },
  { key: 'labor', label: 'Labor' },
]

type Example = 'line' | 'area' | 'multi'

function CodeBlock({ code }: { code: string }) {
  return (
    <pre
      style={{
        background: '#13131f',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 8,
        padding: '20px 24px',
        fontSize: 13,
        lineHeight: 1.7,
        color: 'rgba(240,240,245,0.75)',
        overflowX: 'auto',
        fontFamily: '"SF Mono", "Fira Code", monospace',
      }}
    >
      <code>{code}</code>
    </pre>
  )
}

function PropRow({ name, type, def, desc }: { name: string; type: string; def?: string; desc: string }) {
  return (
    <tr>
      <td style={{ padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)', verticalAlign: 'top' }}>
        <code style={{ fontSize: 12, color: '#3b82f6', fontFamily: '"SF Mono", monospace' }}>{name}</code>
      </td>
      <td style={{ padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)', verticalAlign: 'top' }}>
        <code style={{ fontSize: 12, color: '#10b981', fontFamily: '"SF Mono", monospace' }}>{type}</code>
      </td>
      <td style={{ padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)', verticalAlign: 'top' }}>
        <code style={{ fontSize: 12, color: 'rgba(240,240,245,0.35)', fontFamily: '"SF Mono", monospace' }}>{def ?? '—'}</code>
      </td>
      <td style={{ padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: 13, color: 'rgba(240,240,245,0.5)', verticalAlign: 'top' }}>
        {desc}
      </td>
    </tr>
  )
}

export default function LineChartPage() {
  const [active, setActive] = useState<Example>('line')

  const tabs: { id: Example; label: string }[] = [
    { id: 'line', label: 'Line' },
    { id: 'area', label: 'Area' },
    { id: 'multi', label: 'Multi-series' },
  ]

  return (
    <div className="fc-docs-layout">
      <DocsNav />

      <div className="fc-docs-content">
        <div className="fc-docs-inner">
          {/* Header */}
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontSize: 12, color: 'rgba(240,240,245,0.3)', marginBottom: 10, letterSpacing: '0.04em', textTransform: 'uppercase', fontWeight: 600 }}>
              Charts
            </div>
            <h1 style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.03em', color: '#f0f0f5', marginBottom: 12 }}>
              Line Chart
            </h1>
            <p style={{ fontSize: 15, color: 'rgba(240,240,245,0.5)', lineHeight: 1.65, maxWidth: 520 }}>
              Line and area variants. Multi-series with hover tooltips and animated
              mount. Built with D3 scales and Catmull-Rom smooth curves.
            </p>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 4, borderBottom: '1px solid rgba(255,255,255,0.07)', paddingBottom: 0 }}>
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                style={{
                  padding: '8px 16px',
                  fontSize: 13,
                  fontWeight: 500,
                  color: active === t.id ? '#f0f0f5' : 'rgba(240,240,245,0.4)',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: active === t.id ? '2px solid #3b82f6' : '2px solid transparent',
                  cursor: 'pointer',
                  marginBottom: -1,
                  transition: 'color 150ms',
                  fontFamily: 'inherit',
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Demo */}
          <div
            style={{
              background: '#13131f',
              border: '1px solid rgba(255,255,255,0.07)',
              borderTop: 'none',
              borderRadius: '0 0 10px 10px',
              padding: '28px 28px 20px',
              marginBottom: 32,
            }}
          >
            {active === 'line' && (
              <LineChart
                data={monthlyRevenue}
                series={singleSeries}
                xKey="month"
                variant="line"
                height={300}
                formatY={formatCurrency}
              />
            )}
            {active === 'area' && (
              <LineChart
                data={areaData}
                series={areaSeries}
                xKey="month"
                variant="area"
                height={300}
                formatY={formatCurrency}
              />
            )}
            {active === 'multi' && (
              <LineChart
                data={monthlyRevenue}
                series={twoSeries}
                xKey="month"
                variant="line"
                height={300}
                formatY={formatCurrency}
              />
            )}
          </div>

          {/* Code */}
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#f0f0f5', marginBottom: 14, letterSpacing: '-0.02em' }}>
            Usage
          </h2>

          {active === 'line' && (
            <CodeBlock code={`import { LineChart, formatCurrency } from 'foundry-charts'

<LineChart
  data={[
    { month: 'Jan', revenue: 42000 },
    { month: 'Feb', revenue: 55000 },
    // ...
  ]}
  series={[{ key: 'revenue', label: 'Revenue' }]}
  xKey="month"
  variant="line"
  formatY={formatCurrency}
/>`} />
          )}

          {active === 'area' && (
            <CodeBlock code={`import { LineChart, formatCurrency } from 'foundry-charts'

// variant="area" adds a gradient fill under each line.
// Works the same as "line" — just change the prop.

<LineChart
  data={data}
  series={[
    { key: 'parts', label: 'Parts' },
    { key: 'labor', label: 'Labor' },
  ]}
  xKey="month"
  variant="area"
  formatY={formatCurrency}
/>`} />
          )}

          {active === 'multi' && (
            <CodeBlock code={`import { LineChart, formatCurrency } from 'foundry-charts'

// Multiple series share the same x-axis.
// Each gets a distinct color from the default palette.

<LineChart
  data={data}
  series={[
    { key: 'revenue', label: 'Revenue' },
    { key: 'target',  label: 'Target' },
  ]}
  xKey="month"
  variant="line"
  formatY={formatCurrency}
/>`} />
          )}

          {/* Props */}
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#f0f0f5', marginTop: 40, marginBottom: 14, letterSpacing: '-0.02em' }}>
            Props
          </h2>

          <div style={{ border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.03)' }}>
                  {['Prop', 'Type', 'Default', 'Description'].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: '10px 16px',
                        textAlign: 'left',
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        color: 'rgba(240,240,245,0.3)',
                        borderBottom: '1px solid rgba(255,255,255,0.07)',
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <PropRow name="data" type="LineChartDatum[]" desc="Array of data objects. Each object represents one x-axis point." />
                <PropRow name="series" type="SeriesConfig[]" desc="Which keys to plot. Each entry has key, label, and optional color." />
                <PropRow name="xKey" type="string" desc="The key in each datum that provides the x-axis label." />
                <PropRow name="variant" type="'line' | 'area'" def="'line'" desc="Line only, or line with gradient fill below it." />
                <PropRow name="curve" type="'smooth' | 'linear'" def="'smooth'" desc="Catmull-Rom smooth curves or straight line segments." />
                <PropRow name="height" type="number" def="320" desc="Chart height in pixels. Width is always 100% of the container." />
                <PropRow name="formatY" type="(v: number) => string" def="formatValue" desc="Formatter for y-axis ticks and tooltip values." />
                <PropRow name="formatX" type="(v: string) => string" desc="Optional formatter for x-axis tick labels." />
                <PropRow name="className" type="string" desc="Additional CSS class on the root element." />
                <PropRow name="style" type="CSSProperties" desc="Inline styles on the root element." />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
