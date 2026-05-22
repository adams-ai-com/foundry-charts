'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  BarChart,
  LineChart,
  DonutChart,
  MetricCard,
  WaterfallChart,
  formatCurrency,
} from 'foundry-charts'

// ─── Revenue Overview data ────────────────────────────────────────────────────

const revSparks = {
  revenue:    [41200, 43800, 40100, 46200, 44900, 51200],
  customers:  [310,   328,   315,   344,   337,   361],
  deals:      [108,   117,   103,   122,   115,   124],
  avgDeal:    [381,   374,   390,   378,   391,   413],
}

const revenueByMonth = [
  { month: 'Jan', software: 22600, services: 15400, support: 3200 },
  { month: 'Feb', software: 24100, services: 16300, support: 3400 },
  { month: 'Mar', software: 21800, services: 14800, support: 3500 },
  { month: 'Apr', software: 25400, services: 17200, support: 3600 },
  { month: 'May', software: 23700, services: 16800, support: 4400 },
  { month: 'Jun', software: 28000, services: 19000, support: 4200 },
]

const revenueMix = [
  { label: 'Software',  value: 28000 },
  { label: 'Services',  value: 19000 },
  { label: 'Support',   value: 4200 },
]

const revenueSeries = [
  { key: 'software', label: 'Software' },
  { key: 'services', label: 'Services' },
  { key: 'support',  label: 'Support' },
]

// ─── Operations data ──────────────────────────────────────────────────────────

const opsSparks = {
  utilization: [82.1, 84.3, 81.7, 87.2, 85.4, 86.9],
  incidents:   [31,   27,   33,   24,   26,   23],
  capacity:    [71,   74,   69,   78,   76,   79],
}

const resourceStatus = [
  { label: 'Active',      value: 142, color: '#10b981' },
  { label: 'Idle',        value: 58,  color: '#3b82f6' },
  { label: 'Maintenance', value: 23,  color: '#f59e0b' },
  { label: 'Offline',     value: 7,   color: '#6b7280' },
]

const utilizationTrend = [
  { month: 'Jan', utilization: 82.1, capacity: 71.0 },
  { month: 'Feb', utilization: 84.3, capacity: 74.2 },
  { month: 'Mar', utilization: 81.7, capacity: 69.3 },
  { month: 'Apr', utilization: 87.2, capacity: 78.1 },
  { month: 'May', utilization: 85.4, capacity: 75.6 },
  { month: 'Jun', utilization: 86.9, capacity: 79.4 },
]

const utilizationSeries = [
  { key: 'utilization', label: 'Utilization %' },
  { key: 'capacity',    label: 'Capacity %' },
]

// ─── Shared components ────────────────────────────────────────────────────────

function ChartCard({
  title,
  subtitle,
  children,
  style,
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
  style?: React.CSSProperties
}) {
  return (
    <div
      style={{
        background: 'var(--fc-surface, #13131f)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 10,
        padding: 24,
        ...style,
      }}
    >
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#f0f0f5', letterSpacing: '-0.01em' }}>
          {title}
        </div>
        {subtitle && (
          <div style={{ fontSize: 12, color: 'rgba(240,240,245,0.35)', marginTop: 3 }}>
            {subtitle}
          </div>
        )}
      </div>
      {children}
    </div>
  )
}

function DashboardHeader({ title, subtitle, range }: { title: string; subtitle: string; range: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 24,
      }}
    >
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#f0f0f5', letterSpacing: '-0.02em', margin: 0 }}>
          {title}
        </h2>
        <p style={{ fontSize: 13, color: 'rgba(240,240,245,0.4)', margin: '4px 0 0' }}>
          {subtitle}
        </p>
      </div>
      <span
        style={{
          fontSize: 12,
          color: 'rgba(240,240,245,0.4)',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 6,
          padding: '5px 12px',
          whiteSpace: 'nowrap',
        }}
      >
        {range}
      </span>
    </div>
  )
}

// ─── Dashboard examples ───────────────────────────────────────────────────────

function RevenueOverview() {
  return (
    <div>
      <DashboardHeader
        title="Revenue Overview"
        subtitle="Monthly performance across software, services, and support"
        range="Jan – Jun 2025"
      />

      {/* KPI row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 16,
          marginBottom: 20,
        }}
      >
        <MetricCard
          label="Monthly Revenue"
          value={51200}
          formatValue={formatCurrency}
          trend={14.0}
          trendLabel="vs May"
          sparkline={revSparks.revenue}
        />
        <MetricCard
          label="Active Customers"
          value="361"
          trend={7.1}
          trendLabel="vs May"
          sparkline={revSparks.customers}
        />
        <MetricCard
          label="Deals Closed"
          value="124"
          trend={7.8}
          trendLabel="vs May"
          sparkline={revSparks.deals}
        />
        <MetricCard
          label="Avg Deal Size"
          value={413}
          formatValue={formatCurrency}
          trend={5.6}
          trendLabel="vs May"
          sparkline={revSparks.avgDeal}
        />
      </div>

      {/* Charts row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)',
          gap: 16,
        }}
        className="fc-examples-chart-row"
      >
        <ChartCard title="Revenue by Month" subtitle="Stacked by product line">
          <BarChart
            data={revenueByMonth}
            series={revenueSeries}
            xKey="month"
            variant="stacked"
            formatY={formatCurrency}
            height={260}
          />
        </ChartCard>

        <ChartCard title="Revenue Mix" subtitle="June breakdown">
          <DonutChart
            data={revenueMix}
            formatValue={formatCurrency}
            centerLabel="Revenue"
            height={260}
          />
        </ChartCard>
      </div>
    </div>
  )
}

function Operations() {
  return (
    <div>
      <DashboardHeader
        title="Operations"
        subtitle="Resource utilization, capacity, and incident tracking"
        range="Jan – Jun 2025"
      />

      {/* KPI row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 16,
          marginBottom: 20,
        }}
      >
        <MetricCard
          label="Total Resources"
          value="230"
          trend={0}
          trendLabel="no change"
        />
        <MetricCard
          label="Utilization Rate"
          value="86.9%"
          trend={1.8}
          trendLabel="vs May"
          sparkline={opsSparks.utilization}
        />
        <MetricCard
          label="Open Incidents"
          value="23"
          trend={-11.5}
          trendLabel="vs May"
          sparkline={opsSparks.incidents}
        />
        <MetricCard
          label="Capacity Used"
          value="79.4%"
          trend={4.7}
          trendLabel="vs May"
          sparkline={opsSparks.capacity}
        />
      </div>

      {/* Charts row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 2fr)',
          gap: 16,
        }}
        className="fc-examples-chart-row"
      >
        <ChartCard title="Resource Status" subtitle="Current distribution">
          <DonutChart
            data={resourceStatus}
            centerLabel="Resources"
            height={260}
          />
        </ChartCard>

        <ChartCard title="Utilization vs. Capacity" subtitle="6-month trend">
          <LineChart
            data={utilizationTrend}
            series={utilizationSeries}
            xKey="month"
            variant="area"
            formatY={(v) => `${v.toFixed(1)}%`}
            height={260}
          />
        </ChartCard>
      </div>
    </div>
  )
}

// ─── Inventory data ───────────────────────────────────────────────────────────

const inventoryBridge = [
  { label: 'Starting',      value: 245, type: 'total' as const },
  { label: 'New Units In',  value: 48 },
  { label: 'Trade-Ins',     value: 15 },
  { label: 'Units Sold',    value: -62 },
  { label: 'Aged Out >90d', value: -12 },
  { label: 'Ending',        value: 234, type: 'total' as const },
]

const cashBridge = [
  { label: 'Opening Cash',  value: 820000, type: 'total' as const },
  { label: 'Collections',   value: 310000 },
  { label: 'Parts Revenue', value: 94000 },
  { label: 'Payroll',       value: -187000 },
  { label: 'Inventory Buy', value: -240000 },
  { label: 'Overhead',      value: -56000 },
  { label: 'Closing Cash',  value: 741000, type: 'total' as const },
]

const invSparks = {
  units:    [231, 238, 242, 245, 248, 234],
  sold:     [58,  61,  55,  68,  62,  62],
  aged:     [18,  15,  14,  16,  13,  12],
  turnover: [28,  26,  27,  24,  25,  25],
}

function Inventory() {
  return (
    <div>
      <DashboardHeader
        title="Inventory"
        subtitle="Unit flow, aging, and cash position for the current period"
        range="June 2025"
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 20 }}>
        <MetricCard label="Units on Lot"     value="234"  trend={-4.5}  trendLabel="vs May" sparkline={invSparks.units} />
        <MetricCard label="Units Sold"       value="62"   trend={0}     trendLabel="vs May" sparkline={invSparks.sold} />
        <MetricCard label="Aged > 90 Days"   value="12"   trend={-7.7}  trendLabel="vs May" sparkline={invSparks.aged} />
        <MetricCard label="Avg Days to Turn" value="25"   trend={0}     trendLabel="vs May" sparkline={invSparks.turnover} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 16 }} className="fc-examples-chart-row">
        <ChartCard title="Inventory Bridge" subtitle="Unit flow this period">
          <WaterfallChart data={inventoryBridge} height={280} />
        </ChartCard>
        <ChartCard title="Cash Flow Bridge" subtitle="Period cash movement" style={{}}>
          <WaterfallChart data={cashBridge} height={280} formatValue={formatCurrency} />
        </ChartCard>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const TABS = [
  { id: 'revenue',    label: 'Revenue Overview', component: RevenueOverview },
  { id: 'operations', label: 'Operations',        component: Operations },
  { id: 'inventory',  label: 'Inventory',         component: Inventory },
]

export default function ExamplesPage() {
  const [active, setActive] = useState('revenue')
  const ActiveExample = TABS.find((t) => t.id === active)!.component

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Nav */}
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
            maxWidth: 1200,
            margin: '0 auto',
            padding: '0 24px',
            height: 56,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
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
          </Link>
          <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Link
              href="/docs/charts/bar-chart"
              style={{ padding: '6px 12px', fontSize: 13, color: 'rgba(240,240,245,0.5)', borderRadius: 6 }}
            >
              Docs
            </Link>
            <Link
              href="/examples"
              style={{ padding: '6px 12px', fontSize: 13, color: '#f0f0f5', borderRadius: 6, fontWeight: 500 }}
            >
              Examples
            </Link>
          </nav>
        </div>
      </header>

      {/* Page header */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px 0' }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#f0f0f5', letterSpacing: '-0.03em', marginBottom: 8 }}>
          Examples
        </h1>
        <p style={{ fontSize: 15, color: 'rgba(240,240,245,0.45)', marginBottom: 32, lineHeight: 1.6 }}>
          Full dashboard layouts built with Foundry Charts. Each example combines multiple chart
          types in a realistic business context.
        </p>

        {/* Tab bar */}
        <div
          style={{
            display: 'flex',
            gap: 4,
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            marginBottom: 32,
          }}
        >
          {TABS.map((t) => (
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
      </div>

      {/* Dashboard content */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 80px' }}>
        <ActiveExample />
      </div>
    </div>
  )
}
