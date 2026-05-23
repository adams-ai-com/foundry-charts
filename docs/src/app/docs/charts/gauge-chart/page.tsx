'use client'

import { GaugeChart, formatCurrency, formatPercent } from 'foundry-charts'
import { DocsNav } from '@/components/DocsNav'

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

const BASIC_CODE = `import { GaugeChart, formatCurrency } from 'foundry-charts'

<GaugeChart
  value={84000}
  max={100000}
  label="Revenue Quota"
  formatValue={formatCurrency}
/>`

const TARGET_CODE = `<GaugeChart
  value={47}
  max={60}
  target={60}
  label="Units Sold"
  formatValue={(v) => \`\${v} units\`}
/>`

const MULTI_CODE = `// Dashboard row of three gauges
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
  <GaugeChart value={84000} max={100000} label="Revenue"     formatValue={formatCurrency} />
  <GaugeChart value={47}    max={60}     label="Units Sold"  formatValue={(v) => \`\${v}\`} />
  <GaugeChart value={91.4}  max={100}    label="CSI Score"   formatValue={(v) => \`\${v}\`} />
</div>`

const PAGE = { background: '#0a0a0f', minHeight: '100vh', color: '#f8f8ff', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }
const WRAP = { maxWidth: 900, margin: '0 auto', padding: '0 24px 80px' }
const H1   = { fontSize: 32, fontWeight: 700, margin: '40px 0 8px', color: '#f8f8ff' }
const SUB  = { fontSize: 16, color: 'rgba(240,240,245,0.45)', marginBottom: 40, lineHeight: 1.6 }
const H2   = { fontSize: 18, fontWeight: 600, margin: '48px 0 16px', color: '#f8f8ff' }
const CARD = { background: '#13131f', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: 32, marginBottom: 24 }

export default function GaugeChartPage() {
  return (
    <div style={PAGE}>
      <DocsNav />
      <div style={WRAP}>
        <h1 style={H1}>GaugeChart</h1>
        <p style={SUB}>
          Semi-circular gauge for quota attainment, KPI progress, and single-value dashboards.
          Fill color uses a traffic-light scheme by default — red below 50%, amber 50–80%, green 80%+.
        </p>

        <h2 style={H2}>Basic</h2>
        <div style={CARD}>
          <div style={{ maxWidth: 280, margin: '0 auto' }}>
            <GaugeChart value={84000} max={100000} label="Revenue Quota" formatValue={formatCurrency} />
          </div>
        </div>
        <CodeBlock code={BASIC_CODE} />

        <h2 style={H2}>With target marker</h2>
        <div style={CARD}>
          <div style={{ maxWidth: 280, margin: '0 auto' }}>
            <GaugeChart value={47} max={60} target={60} label="Units Sold" formatValue={(v) => `${v} units`} />
          </div>
        </div>
        <CodeBlock code={TARGET_CODE} />

        <h2 style={H2}>Dashboard row</h2>
        <div style={CARD}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            <GaugeChart value={84000} max={100000} label="Revenue"    formatValue={formatCurrency} />
            <GaugeChart value={47}    max={60}      label="Units Sold" formatValue={(v) => `${v}`} />
            <GaugeChart value={91.4}  max={100}     label="CSI Score"  formatValue={(v) => `${v}`} />
          </div>
        </div>
        <CodeBlock code={MULTI_CODE} />

        <h2 style={H2}>Low attainment / amber zone</h2>
        <div style={CARD}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            <GaugeChart value={28}  max={100} label="Below target" />
            <GaugeChart value={62}  max={100} label="On track"     />
          </div>
        </div>

        <h2 style={H2}>Props</h2>
        <div style={{ ...CARD, padding: 0, overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                {['Prop', 'Type', 'Default', 'Description'].map((h) => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: 'rgba(240,240,245,0.5)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <PropRow name="value"       type="number"            desc="Current value" />
              <PropRow name="max"         type="number"            desc="Maximum value (full gauge)" />
              <PropRow name="label"       type="string"            desc="Caption below the gauge" />
              <PropRow name="target"      type="number"            desc="Optional goal value — renders a tick mark on the arc" />
              <PropRow name="color"       type="string"            desc="Override the fill color (skips traffic-light logic)" />
              <PropRow name="formatValue" type="(v: number) => string" def="formatValue" desc="Formatter for the center value and target label" />
              <PropRow name="formatTarget" type="(v: number) => string" desc="Separate formatter for the target tick label" />
              <PropRow name="height"      type="number"            def="200"  desc="SVG height in px; width is always responsive" />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
