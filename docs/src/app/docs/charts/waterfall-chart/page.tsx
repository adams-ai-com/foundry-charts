'use client'

import { useState } from 'react'
import { WaterfallChart, formatCurrency } from 'foundry-charts'
import { DocsNav } from '@/components/DocsNav'

// Dealer inventory example — the canonical use case
const inventoryData = [
  { label: 'Starting Inventory', value: 245, type: 'total' as const },
  { label: 'New Units In',       value: 48 },
  { label: 'Trade-Ins',          value: 15 },
  { label: 'Units Sold',         value: -62 },
  { label: 'Aged Out (>90d)',    value: -12 },
  { label: 'Ending Inventory',   value: 234, type: 'total' as const },
]

// Cash flow bridge
const cashFlowData = [
  { label: 'Opening Cash',   value: 820000, type: 'total' as const },
  { label: 'Collections',    value: 310000 },
  { label: 'Parts Revenue',  value: 94000 },
  { label: 'Payroll',        value: -187000 },
  { label: 'Inventory Buy',  value: -240000 },
  { label: 'Overhead',       value: -56000 },
  { label: 'Closing Cash',   value: 741000, type: 'total' as const },
]

type Example = 'inventory' | 'cashflow'

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

const TABLE_HEADER_STYLE = { padding: '10px 16px', textAlign: 'left' as const, fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: 'rgba(240,240,245,0.3)', borderBottom: '1px solid rgba(255,255,255,0.07)' }

export default function WaterfallChartPage() {
  const [active, setActive] = useState<Example>('inventory')

  const tabs: { id: Example; label: string }[] = [
    { id: 'inventory', label: 'Inventory aging' },
    { id: 'cashflow',  label: 'Cash flow bridge' },
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
              Waterfall Chart
            </h1>
            <p style={{ fontSize: 15, color: 'rgba(240,240,245,0.5)', lineHeight: 1.65, maxWidth: 560 }}>
              Shows how an initial value is built up or torn down by a series of positive
              and negative changes. Use it for inventory bridges, cash flow analysis, and
              any time you need to explain how you got from A to B.
            </p>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 4, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
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
          <div style={{ background: '#13131f', border: '1px solid rgba(255,255,255,0.07)', borderTop: 'none', borderRadius: '0 0 10px 10px', padding: '28px 28px 20px', marginBottom: 32 }}>
            {active === 'inventory' && (
              <WaterfallChart
                data={inventoryData}
                height={300}
              />
            )}
            {active === 'cashflow' && (
              <WaterfallChart
                data={cashFlowData}
                height={300}
                formatValue={formatCurrency}
              />
            )}
          </div>

          {/* Code */}
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#f0f0f5', marginBottom: 14, letterSpacing: '-0.02em' }}>
            Usage
          </h2>

          {active === 'inventory' && (
            <CodeBlock code={`import { WaterfallChart } from 'foundry-charts'

const data = [
  { label: 'Starting Inventory', value: 245, type: 'total' },
  { label: 'New Units In',       value: 48 },
  { label: 'Trade-Ins',          value: 15 },
  { label: 'Units Sold',         value: -62 },
  { label: 'Aged Out (>90d)',    value: -12 },
  { label: 'Ending Inventory',   value: 234, type: 'total' },
]

<WaterfallChart data={data} height={300} />`} />
          )}

          {active === 'cashflow' && (
            <CodeBlock code={`import { WaterfallChart, formatCurrency } from 'foundry-charts'

const data = [
  { label: 'Opening Cash',  value: 820000, type: 'total' },
  { label: 'Collections',   value: 310000 },
  { label: 'Parts Revenue', value: 94000 },
  { label: 'Payroll',       value: -187000 },
  { label: 'Inventory Buy', value: -240000 },
  { label: 'Overhead',      value: -56000 },
  { label: 'Closing Cash',  value: 741000, type: 'total' },
]

<WaterfallChart
  data={data}
  height={300}
  formatValue={formatCurrency}
/>`} />
          )}

          {/* How it works */}
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#f0f0f5', marginTop: 40, marginBottom: 12, letterSpacing: '-0.02em' }}>
            How it works
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(240,240,245,0.5)', lineHeight: 1.7, marginBottom: 20 }}>
            Each bar&apos;s position is computed from a running total. Increases float up from the
            current total; decreases float down. Bars marked <code style={{ fontSize: 13, color: '#3b82f6' }}>type: &apos;total&apos;</code> always
            start from zero — use them for the opening and closing values of a bridge chart.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 32 }}>
            {[
              { color: '#10b981', label: 'Increase', desc: 'Positive delta, floats up' },
              { color: '#ef4444', label: 'Decrease', desc: 'Negative delta, floats down' },
              { color: '#3b82f6', label: 'Total', desc: 'Anchored to zero' },
              { color: '#8b5cf6', label: 'Subtotal', desc: 'Anchored to zero, distinct color' },
            ].map((item) => (
              <div key={item.label} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, padding: '14px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: item.color }} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#f0f0f5' }}>{item.label}</span>
                </div>
                <div style={{ fontSize: 12, color: 'rgba(240,240,245,0.4)', lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            ))}
          </div>

          {/* Props */}
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#f0f0f5', marginBottom: 14, letterSpacing: '-0.02em' }}>
            Props
          </h2>
          <div style={{ border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, overflow: 'hidden', marginBottom: 32 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.03)' }}>
                  {['Prop', 'Type', 'Default', 'Description'].map((h) => (
                    <th key={h} style={TABLE_HEADER_STYLE}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <PropRow name="data" type="WaterfallDatum[]" desc="Array of data points. Order determines left-to-right rendering." />
                <PropRow name="height" type="number" def="320" desc="Chart height in pixels. Width is always 100% of the container." />
                <PropRow name="formatValue" type="(v: number) => string" def="formatValue" desc="Formatter applied to bar labels, y-axis ticks, and tooltip values." />
                <PropRow name="formatX" type="(v: string) => string" desc="Optional formatter for x-axis labels." />
                <PropRow name="showConnectors" type="boolean" def="true" desc="Draw dashed connector lines between floating bars." />
                <PropRow name="showLabels" type="boolean" def="true" desc="Show the delta value above/below each bar." />
                <PropRow name="className" type="string" desc="Additional CSS class on the root element." />
                <PropRow name="style" type="CSSProperties" desc="Inline styles on the root element." />
              </tbody>
            </table>
          </div>

          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#f0f0f5', marginBottom: 14, letterSpacing: '-0.02em' }}>
            WaterfallDatum
          </h2>
          <div style={{ border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.03)' }}>
                  {['Prop', 'Type', 'Default', 'Description'].map((h) => (
                    <th key={h} style={TABLE_HEADER_STYLE}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <PropRow name="label" type="string" desc="X-axis label for this bar." />
                <PropRow name="value" type="number" desc="For floating bars: the delta. For total/subtotal: the absolute value." />
                <PropRow name="type" type="'total' | 'subtotal'" desc="Marks this bar as a total (blue, anchored to zero) or subtotal (purple)." />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
