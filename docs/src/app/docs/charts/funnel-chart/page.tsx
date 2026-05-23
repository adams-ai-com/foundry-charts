'use client'

import { FunnelChart, formatValue } from 'foundry-charts'
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

const salesPipeline = [
  { label: 'Leads',      value: 1240 },
  { label: 'Qualified',  value: 680  },
  { label: 'Proposal',   value: 312  },
  { label: 'Negotiation',value: 148  },
  { label: 'Won',        value: 87   },
]

const serviceStages = [
  { label: 'ROs Opened',  value: 428 },
  { label: 'Inspected',   value: 395 },
  { label: 'Approved',    value: 342 },
  { label: 'Completed',   value: 328 },
  { label: 'Paid',        value: 319 },
]

const BASIC_CODE = `import { FunnelChart } from 'foundry-charts'

const data = [
  { label: 'Leads',       value: 1240 },
  { label: 'Qualified',   value: 680  },
  { label: 'Proposal',    value: 312  },
  { label: 'Negotiation', value: 148  },
  { label: 'Won',         value: 87   },
]

<FunnelChart data={data} height={300} />`

const NO_CONV_CODE = `<FunnelChart
  data={data}
  showConversion={false}
  height={280}
/>`

const PAGE = { background: '#0a0a0f', minHeight: '100vh', color: '#f8f8ff', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }
const WRAP = { maxWidth: 900, margin: '0 auto', padding: '0 24px 80px' }
const H1   = { fontSize: 32, fontWeight: 700, margin: '40px 0 8px', color: '#f8f8ff' }
const SUB  = { fontSize: 16, color: 'rgba(240,240,245,0.45)', marginBottom: 40, lineHeight: 1.6 }
const H2   = { fontSize: 18, fontWeight: 600, margin: '48px 0 16px', color: '#f8f8ff' }
const CARD = { background: '#13131f', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: 32, marginBottom: 24 }

export default function FunnelChartPage() {
  return (
    <div style={PAGE}>
      <DocsNav />
      <div style={WRAP}>
        <h1 style={H1}>FunnelChart</h1>
        <p style={SUB}>
          Pipeline and conversion visualization. Each stage is a trapezoid sized to its value
          relative to the first stage. Conversion rates vs. the top of the funnel are shown automatically.
        </p>

        <h2 style={H2}>Sales pipeline</h2>
        <div style={CARD}>
          <FunnelChart data={salesPipeline} height={300} />
        </div>
        <CodeBlock code={BASIC_CODE} />

        <h2 style={H2}>Service workflow</h2>
        <div style={CARD}>
          <FunnelChart data={serviceStages} height={280} />
        </div>

        <h2 style={H2}>Without conversion labels</h2>
        <div style={CARD}>
          <FunnelChart data={salesPipeline} showConversion={false} height={280} />
        </div>
        <CodeBlock code={NO_CONV_CODE} />

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
              <PropRow name="data"           type="FunnelDatum[]"          desc="Array of pipeline stages in order from largest to smallest" />
              <PropRow name="formatValue"    type="(v: number) => string"  def="formatValue" desc="Number formatter for stage values" />
              <PropRow name="showConversion" type="boolean"                def="true"        desc="Show percentage vs. first stage on each stage" />
              <PropRow name="height"         type="number"                 def="320"         desc="SVG height in px; width is always responsive" />
            </tbody>
          </table>
        </div>

        <h2 style={H2}>FunnelDatum</h2>
        <CodeBlock code={`interface FunnelDatum {
  label: string      // Stage name
  value: number      // Absolute count or value
  color?: string     // Optional color override (defaults to series palette)
}`} />
      </div>
    </div>
  )
}
