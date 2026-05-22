'use client'

import { DonutChart, formatCurrency } from 'foundry-charts'
import { DocsNav } from '@/components/DocsNav'

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

const revenueData = [
  { label: 'Parts', value: 28000 },
  { label: 'Labor', value: 19000 },
  { label: 'Sublet', value: 4200 },
]

const fleetData = [
  { label: 'In Service', value: 142 },
  { label: 'Available',  value: 58 },
  { label: 'In Repair',  value: 23 },
  { label: 'Retired',    value: 7 },
]

const BASIC_CODE = `import { DonutChart, formatCurrency } from 'foundry-charts'

const data = [
  { label: 'Parts',  value: 28000 },
  { label: 'Labor',  value: 19000 },
  { label: 'Sublet', value: 4200 },
]

<DonutChart
  data={data}
  formatValue={formatCurrency}
  centerLabel="Revenue"
/>`

const CUSTOM_CODE = `// Custom colors per segment
const data = [
  { label: 'In Service', value: 142, color: '#10b981' },
  { label: 'Available',  value: 58,  color: '#3b82f6' },
  { label: 'In Repair',  value: 23,  color: '#f59e0b' },
  { label: 'Retired',    value: 7,   color: '#ef4444' },
]

<DonutChart data={data} centerLabel="Fleet" />`

export default function DonutChartPage() {
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
              Donut Chart
            </h1>
            <p style={{ fontSize: 15, color: 'rgba(240,240,245,0.5)', lineHeight: 1.65, maxWidth: 520 }}>
              Part-to-whole breakdowns with a center label slot. Segments animate in on mount,
              pop out on hover, and update the center display to show the hovered value.
            </p>
          </div>

          {/* Basic */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#f0f0f5', marginBottom: 20, letterSpacing: '-0.01em' }}>
              Basic
            </h2>
            <div style={{ maxWidth: 320, marginBottom: 28 }}>
              <DonutChart
                data={revenueData}
                formatValue={formatCurrency}
                centerLabel="Revenue"
              />
            </div>
            <CodeBlock code={BASIC_CODE} />
          </div>

          {/* Custom colors */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#f0f0f5', marginBottom: 8, letterSpacing: '-0.01em' }}>
              Custom colors
            </h2>
            <p style={{ fontSize: 14, color: 'rgba(240,240,245,0.4)', marginBottom: 20, lineHeight: 1.6 }}>
              Each datum accepts an optional <code style={{ fontSize: 12, color: '#3b82f6' }}>color</code> override.
            </p>
            <div style={{ maxWidth: 320, marginBottom: 28 }}>
              <DonutChart
                data={[
                  { label: 'In Service', value: 142, color: '#10b981' },
                  { label: 'Available',  value: 58,  color: '#3b82f6' },
                  { label: 'In Repair',  value: 23,  color: '#f59e0b' },
                  { label: 'Retired',    value: 7,   color: '#ef4444' },
                ]}
                centerLabel="Fleet"
              />
            </div>
            <CodeBlock code={CUSTOM_CODE} />
          </div>

          {/* Props table */}
          <div style={{ marginTop: 56 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#f0f0f5', marginBottom: 20, letterSpacing: '-0.01em' }}>
              Props
            </h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    {['Prop', 'Type', 'Default', 'Description'].map((h) => (
                      <th key={h} style={{ padding: '8px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'rgba(240,240,245,0.3)' }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <PropRow name="data"          type="DonutDatum[]"           desc='Array of { label, value, color? } objects.' />
                  <PropRow name="formatValue"   type="(v: number) => string"  def="formatValue"  desc="Formatter for values shown in the center and legend." />
                  <PropRow name="centerLabel"   type="string"                 def='"Total"'       desc="Sub-label shown in the hole when no segment is hovered." />
                  <PropRow name="innerRadius"   type="number"                 def="0.65"          desc="Hole size as a fraction of the outer radius (0–1)." />
                  <PropRow name="height"        type="number"                 def="280"           desc="Chart height in pixels. Width fills the container." />
                  <PropRow name="className"     type="string"                 desc="Extra class on the wrapper element." />
                  <PropRow name="style"         type="CSSProperties"          desc="Inline styles merged onto the wrapper element." />
                </tbody>
              </table>
            </div>
          </div>

          {/* DonutDatum shape */}
          <div style={{ marginTop: 40 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#f0f0f5', marginBottom: 16, letterSpacing: '-0.01em' }}>
              DonutDatum
            </h2>
            <CodeBlock code={`type DonutDatum = {
  label: string   // shown in legend and center on hover
  value: number   // segment size
  color?: string  // overrides the default palette color
}`} />
          </div>

        </div>
      </div>
    </div>
  )
}
