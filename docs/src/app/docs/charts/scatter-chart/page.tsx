'use client'

import { useState } from 'react'
import { ScatterChart, formatCurrency } from 'foundry-charts'
import { DocsNav } from '@/components/DocsNav'

// Deal performance — scatter
const dealData = [
  {
    key: 'New',
    label: 'New Units',
    data: [
      { x: 12, y: 4200, label: 'Unit #1842' },
      { x: 8,  y: 5100, label: 'Unit #1901' },
      { x: 22, y: 3800, label: 'Unit #2034' },
      { x: 5,  y: 6200, label: 'Unit #2103' },
      { x: 31, y: 2900, label: 'Unit #2211' },
      { x: 18, y: 4700, label: 'Unit #2345' },
      { x: 44, y: 2100, label: 'Unit #2412' },
      { x: 9,  y: 5400, label: 'Unit #2501' },
      { x: 27, y: 3500, label: 'Unit #2634' },
      { x: 15, y: 4900, label: 'Unit #2788' },
    ],
  },
  {
    key: 'Used',
    label: 'Used Units',
    data: [
      { x: 38, y: 1800, label: 'Unit #3021' },
      { x: 52, y: 1200, label: 'Unit #3198' },
      { x: 19, y: 2800, label: 'Unit #3341' },
      { x: 61, y: 900,  label: 'Unit #3512' },
      { x: 29, y: 2300, label: 'Unit #3677' },
      { x: 41, y: 1600, label: 'Unit #3801' },
      { x: 11, y: 3100, label: 'Unit #3922' },
      { x: 55, y: 1100, label: 'Unit #4034' },
      { x: 33, y: 2000, label: 'Unit #4145' },
      { x: 47, y: 1400, label: 'Unit #4289' },
    ],
  },
]

// Bubble: revenue vs satisfaction vs volume
const bubbleData = [
  {
    key: 'Parts',
    label: 'Parts Dept',
    data: [
      { x: 82, y: 4.2, z: 340 },
      { x: 74, y: 4.5, z: 410 },
      { x: 91, y: 3.8, z: 290 },
      { x: 68, y: 4.7, z: 520 },
      { x: 85, y: 4.1, z: 380 },
    ],
  },
  {
    key: 'Service',
    label: 'Service Dept',
    data: [
      { x: 76, y: 4.6, z: 210 },
      { x: 88, y: 4.3, z: 180 },
      { x: 62, y: 4.8, z: 150 },
      { x: 79, y: 4.4, z: 240 },
      { x: 94, y: 3.9, z: 190 },
    ],
  },
]

type Example = 'scatter' | 'bubble'

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

export default function ScatterChartPage() {
  const [active, setActive] = useState<Example>('scatter')

  const tabs = [
    { id: 'scatter' as Example, label: 'Scatter' },
    { id: 'bubble'  as Example, label: 'Bubble' },
  ]

  return (
    <div className="fc-docs-layout">
      <DocsNav />
      <div className="fc-docs-content">
        <div className="fc-docs-inner">
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontSize: 12, color: 'rgba(240,240,245,0.3)', marginBottom: 10, letterSpacing: '0.04em', textTransform: 'uppercase', fontWeight: 600 }}>Charts</div>
            <h1 style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.03em', color: '#f0f0f5', marginBottom: 12 }}>Scatter Chart</h1>
            <p style={{ fontSize: 15, color: 'rgba(240,240,245,0.5)', lineHeight: 1.65, maxWidth: 540 }}>
              Plot two continuous variables against each other. The bubble variant adds a third
              dimension via circle radius — useful for volume, count, or any magnitude measure.
              Quadrant lines help divide the chart into meaningful segments.
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
            {active === 'scatter' && (
              <ScatterChart
                series={dealData}
                height={320}
                xLabel="Days on Lot"
                yLabel="Gross Profit"
                formatY={formatCurrency}
                quadrants={[
                  { axis: 'x', value: 30, label: '30-day threshold' },
                  { axis: 'y', value: 3000, label: 'Target gross' },
                ]}
              />
            )}
            {active === 'bubble' && (
              <ScatterChart
                series={bubbleData}
                variant="bubble"
                height={320}
                xLabel="Utilization %"
                yLabel="Satisfaction"
                formatZ={(v) => `${v} tickets`}
              />
            )}
          </div>

          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#f0f0f5', marginBottom: 14, letterSpacing: '-0.02em' }}>Usage</h2>

          {active === 'scatter' && (
            <CodeBlock code={`import { ScatterChart, formatCurrency } from 'foundry-charts'

const series = [
  {
    key: 'New',
    label: 'New Units',
    data: [
      { x: 12, y: 4200, label: 'Unit #1842' },
      { x: 8,  y: 5100, label: 'Unit #1901' },
      // ...
    ],
  },
]

<ScatterChart
  series={series}
  xLabel="Days on Lot"
  yLabel="Gross Profit"
  formatY={formatCurrency}
  quadrants={[
    { axis: 'x', value: 30, label: '30-day threshold' },
    { axis: 'y', value: 3000, label: 'Target gross' },
  ]}
/>`} />
          )}

          {active === 'bubble' && (
            <CodeBlock code={`import { ScatterChart } from 'foundry-charts'

// Add a z field to each datum — drives bubble radius
const series = [
  {
    key: 'Parts',
    label: 'Parts Dept',
    data: [
      { x: 82, y: 4.2, z: 340 },
      { x: 74, y: 4.5, z: 410 },
      // ...
    ],
  },
]

<ScatterChart
  series={series}
  variant="bubble"
  xLabel="Utilization %"
  yLabel="Satisfaction"
  formatZ={(v) => \`\${v} tickets\`}
/>`} />
          )}

          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#f0f0f5', marginTop: 40, marginBottom: 14, letterSpacing: '-0.02em' }}>Props</h2>
          <div style={{ border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, overflow: 'hidden', marginBottom: 32 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead><tr style={{ background: 'rgba(255,255,255,0.03)' }}>{['Prop','Type','Default','Description'].map((h) => <th key={h} style={TH}>{h}</th>)}</tr></thead>
              <tbody>
                <PropRow name="series" type="ScatterSeries[]" desc="Array of series. Each series has its own data array." />
                <PropRow name="variant" type="'scatter' | 'bubble'" def="'scatter'" desc="Bubble variant scales dot radius by datum.z." />
                <PropRow name="height" type="number" def="360" desc="Chart height in pixels." />
                <PropRow name="formatX" type="(v: number) => string" def="formatValue" desc="Formatter for x-axis ticks and tooltip." />
                <PropRow name="formatY" type="(v: number) => string" def="formatValue" desc="Formatter for y-axis ticks and tooltip." />
                <PropRow name="formatZ" type="(v: number) => string" def="formatValue" desc="Formatter for bubble size in tooltip." />
                <PropRow name="xLabel" type="string" desc="Label below the x-axis." />
                <PropRow name="yLabel" type="string" desc="Label to the left of the y-axis." />
                <PropRow name="quadrants" type="QuadrantLine[]" desc="Reference lines on x or y axis with optional labels." />
                <PropRow name="className" type="string" desc="Additional CSS class on the root element." />
                <PropRow name="style" type="CSSProperties" desc="Inline styles on the root element." />
              </tbody>
            </table>
          </div>

          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#f0f0f5', marginBottom: 14, letterSpacing: '-0.02em' }}>ScatterSeries</h2>
          <div style={{ border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead><tr style={{ background: 'rgba(255,255,255,0.03)' }}>{['Prop','Type','Default','Description'].map((h) => <th key={h} style={TH}>{h}</th>)}</tr></thead>
              <tbody>
                <PropRow name="key" type="string" desc="Unique identifier for this series." />
                <PropRow name="label" type="string" desc="Human-readable label for legend and tooltip." />
                <PropRow name="data" type="ScatterDatum[]" desc="Array of {x, y, z?, label?} data points." />
                <PropRow name="color" type="string" desc="Override the default series color." />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
