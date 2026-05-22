'use client'

import { useState } from 'react'
import { AreaChart, formatCurrency, formatPercent } from 'foundry-charts'
import { DocsNav } from '@/components/DocsNav'

const revenueData = [
  { month: 'Jan', software: 22600, services: 15400, support: 3200 },
  { month: 'Feb', software: 24100, services: 16300, support: 3400 },
  { month: 'Mar', software: 21800, services: 14800, support: 3500 },
  { month: 'Apr', software: 25400, services: 17200, support: 3600 },
  { month: 'May', software: 23700, services: 16800, support: 4400 },
  { month: 'Jun', software: 28000, services: 19000, support: 4200 },
]

const revenueSeries = [
  { key: 'software', label: 'Software' },
  { key: 'services', label: 'Services' },
  { key: 'support',  label: 'Support' },
]

const utilizationData = [
  { month: 'Jan', technicians: 78.2, bays: 64.1, lifts: 71.3 },
  { month: 'Feb', technicians: 82.4, bays: 68.7, lifts: 74.9 },
  { month: 'Mar', technicians: 79.1, bays: 65.3, lifts: 70.8 },
  { month: 'Apr', technicians: 86.8, bays: 72.4, lifts: 79.2 },
  { month: 'May', technicians: 84.3, bays: 70.1, lifts: 76.5 },
  { month: 'Jun', technicians: 88.6, bays: 74.9, lifts: 81.4 },
]

const utilizationSeries = [
  { key: 'technicians', label: 'Technicians' },
  { key: 'bays',        label: 'Service Bays' },
  { key: 'lifts',       label: 'Lifts' },
]

type Example = 'stacked' | 'overlapping'

function CodeBlock({ code }: { code: string }) {
  return (
    <pre style={{ background: '#13131f', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, padding: '20px 24px', fontSize: 13, lineHeight: 1.7, color: 'rgba(240,240,245,0.75)', overflowX: 'auto', fontFamily: '"SF Mono", "Fira Code", monospace' }}>
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

const TH = { padding: '10px 16px', textAlign: 'left' as const, fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: 'rgba(240,240,245,0.3)', borderBottom: '1px solid rgba(255,255,255,0.07)' }

export default function AreaChartPage() {
  const [active, setActive] = useState<Example>('stacked')

  const tabs = [
    { id: 'stacked'     as Example, label: 'Stacked' },
    { id: 'overlapping' as Example, label: 'Overlapping' },
  ]

  return (
    <div className="fc-docs-layout">
      <DocsNav />
      <div className="fc-docs-content">
        <div className="fc-docs-inner">
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontSize: 12, color: 'rgba(240,240,245,0.3)', marginBottom: 10, letterSpacing: '0.04em', textTransform: 'uppercase', fontWeight: 600 }}>Charts</div>
            <h1 style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.03em', color: '#f0f0f5', marginBottom: 12 }}>Area Chart</h1>
            <p style={{ fontSize: 15, color: 'rgba(240,240,245,0.5)', lineHeight: 1.65, maxWidth: 540 }}>
              Multi-series area chart with stacked and overlapping variants. Stacked shows
              cumulative totals; overlapping shows each series independently for direct
              comparison. Smooth curves, gradient fills, and a crosshair tooltip.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 4, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            {tabs.map((t) => (
              <button key={t.id} onClick={() => setActive(t.id)} style={{ padding: '8px 16px', fontSize: 13, fontWeight: 500, color: active === t.id ? '#f0f0f5' : 'rgba(240,240,245,0.4)', background: 'transparent', border: 'none', borderBottom: active === t.id ? '2px solid #3b82f6' : '2px solid transparent', cursor: 'pointer', marginBottom: -1, transition: 'color 150ms', fontFamily: 'inherit' }}>
                {t.label}
              </button>
            ))}
          </div>

          <div style={{ background: '#13131f', border: '1px solid rgba(255,255,255,0.07)', borderTop: 'none', borderRadius: '0 0 10px 10px', padding: '28px 28px 20px', marginBottom: 32 }}>
            {active === 'stacked' && (
              <AreaChart
                data={revenueData}
                series={revenueSeries}
                xKey="month"
                variant="stacked"
                height={300}
                formatY={formatCurrency}
              />
            )}
            {active === 'overlapping' && (
              <AreaChart
                data={utilizationData}
                series={utilizationSeries}
                xKey="month"
                variant="overlapping"
                height={300}
                formatY={(v) => formatPercent(v, 1)}
              />
            )}
          </div>

          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#f0f0f5', marginBottom: 14, letterSpacing: '-0.02em' }}>Usage</h2>

          {active === 'stacked' && (
            <CodeBlock code={`import { AreaChart, formatCurrency } from 'foundry-charts'

const data = [
  { month: 'Jan', software: 22600, services: 15400, support: 3200 },
  { month: 'Feb', software: 24100, services: 16300, support: 3400 },
  // ...
]

<AreaChart
  data={data}
  series={[
    { key: 'software', label: 'Software' },
    { key: 'services', label: 'Services' },
    { key: 'support',  label: 'Support' },
  ]}
  xKey="month"
  variant="stacked"
  formatY={formatCurrency}
/>`} />
          )}

          {active === 'overlapping' && (
            <CodeBlock code={`import { AreaChart, formatPercent } from 'foundry-charts'

// Each series drawn independently — good for comparing rates
<AreaChart
  data={data}
  series={[
    { key: 'technicians', label: 'Technicians' },
    { key: 'bays',        label: 'Service Bays' },
    { key: 'lifts',       label: 'Lifts' },
  ]}
  xKey="month"
  variant="overlapping"
  formatY={(v) => formatPercent(v, 1)}
/>`} />
          )}

          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#f0f0f5', marginTop: 40, marginBottom: 14, letterSpacing: '-0.02em' }}>Props</h2>
          <div style={{ border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead><tr style={{ background: 'rgba(255,255,255,0.03)' }}>{['Prop','Type','Default','Description'].map((h) => <th key={h} style={TH}>{h}</th>)}</tr></thead>
              <tbody>
                <PropRow name="data" type="AreaDatum[]" desc="Array of data objects. Each object is one x-axis point." />
                <PropRow name="series" type="AreaSeriesConfig[]" desc="Which keys to plot, with labels and optional color overrides." />
                <PropRow name="xKey" type="string" desc="Key in each datum that provides the x-axis label." />
                <PropRow name="variant" type="'stacked' | 'overlapping'" def="'stacked'" desc="Stacked accumulates series; overlapping draws them independently." />
                <PropRow name="height" type="number" def="320" desc="Chart height in pixels. Width is always 100% of the container." />
                <PropRow name="formatY" type="(v: number) => string" def="formatValue" desc="Formatter for y-axis ticks and tooltip values." />
                <PropRow name="formatX" type="(v: string) => string" desc="Optional formatter for x-axis labels." />
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
