'use client'

import { MetricCard, formatCurrency } from 'foundry-charts'
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

const revenueSparkline = [240000, 255000, 248000, 271000, 263000, 284000]
const expenseSparkline = [180000, 192000, 205000, 198000, 212000, 224000]
const unitSparkline    = [42, 55, 48, 61, 53, 67]
const returnSparkline  = [8, 12, 9, 15, 11, 8]

const BASIC_CODE = `import { MetricCard, formatCurrency } from 'foundry-charts'

<MetricCard
  label="Monthly Revenue"
  value={284000}
  formatValue={formatCurrency}
  trend={12.4}
  trendLabel="vs last month"
  sparkline={[240000, 255000, 248000, 271000, 263000, 284000]}
/>`

const GRID_CODE = `<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
  <MetricCard label="Revenue"   value={284000} formatValue={formatCurrency} trend={12.4}  trendLabel="vs last month" sparkline={revenueSparkline} />
  <MetricCard label="Expenses"  value={224000} formatValue={formatCurrency} trend={-4.1}  trendLabel="vs last month" sparkline={expenseSparkline} />
  <MetricCard label="Units Sold" value={67}    trend={26.4}  trendLabel="vs last month" sparkline={unitSparkline} />
  <MetricCard label="Returns"    value={8}     trend={-27.3} trendLabel="vs last month" sparkline={returnSparkline} />
</div>`

const NO_SPARKLINE_CODE = `<MetricCard
  label="Active Subscribers"
  value="1,284"
  trend={3.2}
  trendLabel="this week"
/>`

export default function MetricCardPage() {
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
              Metric Card
            </h1>
            <p style={{ fontSize: 15, color: 'rgba(240,240,245,0.5)', lineHeight: 1.65, maxWidth: 520 }}>
              Big number + trend badge + sparkline. The most-used element in business dashboards.
              Drop one in, or tile them in a grid.
            </p>
          </div>

          {/* Single card example */}
          <div style={{ marginBottom: 12 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#f0f0f5', marginBottom: 20, letterSpacing: '-0.01em' }}>
              Basic
            </h2>
            <div style={{ maxWidth: 280, marginBottom: 28 }}>
              <MetricCard
                label="Monthly Revenue"
                value={284000}
                formatValue={formatCurrency}
                trend={12.4}
                trendLabel="vs last month"
                sparkline={revenueSparkline}
              />
            </div>
            <CodeBlock code={BASIC_CODE} />
          </div>

          {/* Grid example */}
          <div style={{ marginTop: 48, marginBottom: 12 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#f0f0f5', marginBottom: 8, letterSpacing: '-0.01em' }}>
              Dashboard grid
            </h2>
            <p style={{ fontSize: 14, color: 'rgba(240,240,245,0.4)', marginBottom: 20, lineHeight: 1.6 }}>
              Pair with CSS grid for an instant KPI dashboard. Sparkline color auto-matches trend direction.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 28 }}>
              <MetricCard label="Revenue"    value={284000} formatValue={formatCurrency} trend={12.4}  trendLabel="vs last month" sparkline={revenueSparkline} />
              <MetricCard label="Expenses"   value={224000} formatValue={formatCurrency} trend={-4.1}  trendLabel="vs last month" sparkline={expenseSparkline} />
              <MetricCard label="Units Sold" value={67}     trend={26.4}  trendLabel="vs last month" sparkline={unitSparkline} />
              <MetricCard label="Returns"    value={8}      trend={-27.3} trendLabel="vs last month" sparkline={returnSparkline} />
            </div>
            <CodeBlock code={GRID_CODE} />
          </div>

          {/* No sparkline */}
          <div style={{ marginTop: 48, marginBottom: 12 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#f0f0f5', marginBottom: 8, letterSpacing: '-0.01em' }}>
              Without sparkline
            </h2>
            <p style={{ fontSize: 14, color: 'rgba(240,240,245,0.4)', marginBottom: 20, lineHeight: 1.6 }}>
              Sparkline is optional — omit it for a compact stat.
            </p>
            <div style={{ maxWidth: 240, marginBottom: 28 }}>
              <MetricCard
                label="Active Subscribers"
                value="1,284"
                trend={3.2}
                trendLabel="this week"
              />
            </div>
            <CodeBlock code={NO_SPARKLINE_CODE} />
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
                  <PropRow name="label"           type="string"                  desc="Card heading shown above the value." />
                  <PropRow name="value"           type="number | string"         desc="The primary metric. Numbers are formatted via formatValue; strings are shown as-is." />
                  <PropRow name="formatValue"     type="(v: number) => string"   def="formatValue"  desc="Formatter for numeric values. Pass formatCurrency, formatPercent, or your own." />
                  <PropRow name="trend"           type="number"                  desc="Percent change (e.g. 12.4 = +12.4%). Drives badge color and arrow direction." />
                  <PropRow name="trendLabel"      type="string"                  desc='Secondary text next to the badge, e.g. "vs last month".' />
                  <PropRow name="sparkline"       type="number[]"                desc="Array of raw values for the mini chart at the bottom of the card." />
                  <PropRow name="sparklineColor"  type="string"                  desc="Override sparkline color. Defaults to green/red matching trend, or blue if no trend." />
                  <PropRow name="sparklineVariant" type='"line" | "area"'        def='"area"'       desc='Sparkline style. "area" fills below the line.' />
                  <PropRow name="className"       type="string"                  desc="Extra class on the card element." />
                  <PropRow name="style"           type="CSSProperties"           desc="Inline styles merged onto the card element." />
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
