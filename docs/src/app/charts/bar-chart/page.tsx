'use client'

import { useState } from 'react'
import { BarChart } from 'foundry-charts'
import { formatCurrency } from 'foundry-charts'
import { Nav } from '@/components/Nav'

const groupedData = [
  { month: 'Jan', new: 42, used: 31, service: 18 },
  { month: 'Feb', new: 55, used: 27, service: 22 },
  { month: 'Mar', new: 48, used: 35, service: 20 },
  { month: 'Apr', new: 61, used: 29, service: 25 },
  { month: 'May', new: 53, used: 38, service: 19 },
  { month: 'Jun', new: 67, used: 33, service: 28 },
]

const stackedData = [
  { month: 'Jan', parts: 28000, labor: 19000, sublet: 4200 },
  { month: 'Feb', parts: 31000, labor: 22000, sublet: 3800 },
  { month: 'Mar', parts: 27000, labor: 18500, sublet: 5100 },
  { month: 'Apr', parts: 35000, labor: 24000, sublet: 4600 },
  { month: 'May', parts: 29000, labor: 21000, sublet: 3900 },
  { month: 'Jun', parts: 38000, labor: 26000, sublet: 5800 },
]

const negativeData = [
  { month: 'Jan', profit: 12400, loss: -3200 },
  { month: 'Feb', profit: 18200, loss: -1800 },
  { month: 'Mar', profit: 9100, loss: -6400 },
  { month: 'Apr', profit: 21300, loss: -2100 },
  { month: 'May', profit: 15700, loss: -4300 },
  { month: 'Jun', profit: 24100, loss: -1600 },
]

const salesSeries = [
  { key: 'new', label: 'New Units' },
  { key: 'used', label: 'Used Units' },
  { key: 'service', label: 'Service' },
]

const revSeries = [
  { key: 'parts', label: 'Parts' },
  { key: 'labor', label: 'Labor' },
  { key: 'sublet', label: 'Sublet' },
]

const pnlSeries = [
  { key: 'profit', label: 'Gross Profit' },
  { key: 'loss', label: 'Losses' },
]

type Example = 'grouped' | 'stacked' | 'negative'

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

export default function BarChartPage() {
  const [active, setActive] = useState<Example>('grouped')

  const tabs: { id: Example; label: string }[] = [
    { id: 'grouped', label: 'Grouped' },
    { id: 'stacked', label: 'Stacked' },
    { id: 'negative', label: 'Negative values' },
  ]

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Nav />

      <div style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 40px 96px' }}>
          {/* Header */}
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontSize: 12, color: 'rgba(240,240,245,0.3)', marginBottom: 10, letterSpacing: '0.04em', textTransform: 'uppercase', fontWeight: 600 }}>
              Charts
            </div>
            <h1 style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.03em', color: '#f0f0f5', marginBottom: 12 }}>
              Bar Chart
            </h1>
            <p style={{ fontSize: 15, color: 'rgba(240,240,245,0.5)', lineHeight: 1.65, maxWidth: 520 }}>
              Grouped, stacked, and negative-value variants. Built with D3 scales,
              animated on mount, responsive by default.
            </p>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 0, borderBottom: '1px solid rgba(255,255,255,0.07)', paddingBottom: 0 }}>
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
            {active === 'grouped' && (
              <BarChart
                data={groupedData}
                series={salesSeries}
                xKey="month"
                variant="grouped"
                height={300}
              />
            )}
            {active === 'stacked' && (
              <BarChart
                data={stackedData}
                series={revSeries}
                xKey="month"
                variant="stacked"
                height={300}
                formatY={formatCurrency}
              />
            )}
            {active === 'negative' && (
              <BarChart
                data={negativeData}
                series={pnlSeries}
                xKey="month"
                variant="grouped"
                height={300}
                formatY={formatCurrency}
              />
            )}
          </div>

          {/* Code example */}
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#f0f0f5', marginBottom: 14, letterSpacing: '-0.02em' }}>
            Usage
          </h2>

          {active === 'grouped' && (
            <CodeBlock code={`import { BarChart } from 'foundry-charts'

const data = [
  { month: 'Jan', new: 42, used: 31, service: 18 },
  { month: 'Feb', new: 55, used: 27, service: 22 },
  // ...
]

const series = [
  { key: 'new', label: 'New Units' },
  { key: 'used', label: 'Used Units' },
  { key: 'service', label: 'Service' },
]

<BarChart
  data={data}
  series={series}
  xKey="month"
  variant="grouped"
  height={300}
/>`} />
          )}

          {active === 'stacked' && (
            <CodeBlock code={`import { BarChart, formatCurrency } from 'foundry-charts'

<BarChart
  data={data}
  series={[
    { key: 'parts', label: 'Parts' },
    { key: 'labor', label: 'Labor' },
    { key: 'sublet', label: 'Sublet' },
  ]}
  xKey="month"
  variant="stacked"
  height={300}
  formatY={formatCurrency}
/>`} />
          )}

          {active === 'negative' && (
            <CodeBlock code={`import { BarChart, formatCurrency } from 'foundry-charts'

// Negative values extend below the zero line automatically.
// No configuration needed — the y scale adjusts.

<BarChart
  data={data}
  series={[
    { key: 'profit', label: 'Gross Profit' },
    { key: 'loss', label: 'Losses' },
  ]}
  xKey="month"
  variant="grouped"
  height={300}
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
                <PropRow name="data" type="BarChartDatum[]" desc="Array of data objects. Each object represents one x-axis category." />
                <PropRow name="series" type="SeriesConfig[]" desc="Which keys to plot. Each entry has key, label, and optional color." />
                <PropRow name="xKey" type="string" desc="The key in each datum that provides the x-axis label." />
                <PropRow name="variant" type="'grouped' | 'stacked'" def="'grouped'" desc="Layout variant." />
                <PropRow name="height" type="number" def="320" desc="Chart height in pixels. Width is always 100% of the container." />
                <PropRow name="formatY" type="(v: number) => string" def="formatValue" desc="Formatter for y-axis tick labels and tooltip values." />
                <PropRow name="formatX" type="(v: string) => string" desc="Optional formatter for x-axis tick labels." />
                <PropRow name="className" type="string" desc="Additional CSS class on the root element." />
                <PropRow name="style" type="CSSProperties" desc="Inline styles on the root element." />
              </tbody>
            </table>
          </div>

          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#f0f0f5', marginTop: 40, marginBottom: 14, letterSpacing: '-0.02em' }}>
            SeriesConfig
          </h2>
          <div style={{ border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.03)' }}>
                  {['Prop', 'Type', 'Default', 'Description'].map((h) => (
                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(240,240,245,0.3)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <PropRow name="key" type="string" desc="Key in the data object to read values from." />
                <PropRow name="label" type="string" desc="Human-readable label for legend and tooltip." />
                <PropRow name="color" type="string" desc="Override the default series color. Any valid CSS color." />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
