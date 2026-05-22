'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  BarChart,
  LineChart,
  AreaChart,
  DonutChart,
  ScatterChart,
  MetricCard,
  WaterfallChart,
  formatCurrency,
  formatPercent,
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

// ─── Deal performance data (scatter) ─────────────────────────────────────────

const dealScatter = [
  {
    key: 'New', label: 'New Units',
    data: [
      { x: 12, y: 4200 }, { x: 8,  y: 5100 }, { x: 22, y: 3800 },
      { x: 5,  y: 6200 }, { x: 31, y: 2900 }, { x: 18, y: 4700 },
      { x: 44, y: 2100 }, { x: 9,  y: 5400 }, { x: 27, y: 3500 },
    ],
  },
  {
    key: 'Used', label: 'Used Units',
    data: [
      { x: 38, y: 1800 }, { x: 52, y: 1200 }, { x: 19, y: 2800 },
      { x: 61, y: 900  }, { x: 29, y: 2300 }, { x: 41, y: 1600 },
      { x: 11, y: 3100 }, { x: 55, y: 1100 }, { x: 33, y: 2000 },
    ],
  },
]

const areaRevenueData = [
  { month: 'Jan', software: 22600, services: 15400, support: 3200 },
  { month: 'Feb', software: 24100, services: 16300, support: 3400 },
  { month: 'Mar', software: 21800, services: 14800, support: 3500 },
  { month: 'Apr', software: 25400, services: 17200, support: 3600 },
  { month: 'May', software: 23700, services: 16800, support: 4400 },
  { month: 'Jun', software: 28000, services: 19000, support: 4200 },
]

const areaRevenueSeries = [
  { key: 'software', label: 'Software' },
  { key: 'services', label: 'Services' },
  { key: 'support',  label: 'Support' },
]

const dealSparks = {
  gross:   [3800, 4100, 3600, 4500, 4200, 4700],
  volume:  [58,   61,   55,   68,   62,   64],
  aged:    [18,   15,   14,   16,   13,   12],
  avgDays: [28,   26,   27,   24,   25,   22],
}

// ─── Service Department data ─────────────────────────────────────────────────

const serviceSparks = {
  ros:       [2840, 3100, 2760, 3380, 3210, 3540],
  labor:     [74.1, 76.3, 72.8, 79.2, 77.4, 81.6],
  csi:       [88,   90,   87,   91,   89,   93],
  comebacks: [14,   12,   16,   11,   13,   9],
}

const laborMix = [
  { label: 'Warranty',    value: 31, color: '#3b82f6' },
  { label: 'Customer Pay',value: 48, color: '#10b981' },
  { label: 'Internal',    value: 12, color: '#8b5cf6' },
  { label: 'Sublet',      value: 9,  color: '#f59e0b' },
]

const techPerformance = [
  {
    key: 'Senior', label: 'Senior Tech',
    data: [
      { x: 112, y: 94.2, z: 48, label: 'J. Torres' },
      { x: 98,  y: 88.7, z: 41, label: 'M. Reyes' },
      { x: 124, y: 91.3, z: 52, label: 'D. Kim' },
      { x: 105, y: 96.1, z: 44, label: 'P. Nguyen' },
    ],
  },
  {
    key: 'Junior', label: 'Junior Tech',
    data: [
      { x: 74,  y: 78.4, z: 31, label: 'A. Smith' },
      { x: 81,  y: 82.1, z: 34, label: 'C. Brown' },
      { x: 68,  y: 74.9, z: 28, label: 'R. Davis' },
      { x: 88,  y: 85.3, z: 37, label: 'T. Wilson' },
    ],
  },
]

const roTrend = [
  { month: 'Jan', warranty: 182, customerPay: 241, internal: 68 },
  { month: 'Feb', warranty: 194, customerPay: 268, internal: 72 },
  { month: 'Mar', warranty: 171, customerPay: 229, internal: 61 },
  { month: 'Apr', warranty: 208, customerPay: 294, internal: 81 },
  { month: 'May', warranty: 196, customerPay: 278, internal: 74 },
  { month: 'Jun', warranty: 221, customerPay: 312, internal: 88 },
]

const roSeries = [
  { key: 'customerPay', label: 'Customer Pay' },
  { key: 'warranty',    label: 'Warranty' },
  { key: 'internal',    label: 'Internal' },
]

// ─── HR & Headcount data ─────────────────────────────────────────────────────

const hrSparks = {
  headcount: [142, 144, 143, 147, 146, 149],
  attrition: [3.1, 2.8, 3.4, 2.6, 2.9, 2.4],
  openRoles:  [8,   9,   11,  7,   8,   6],
  avgTenure:  [3.2, 3.3, 3.2, 3.4, 3.4, 3.5],
}

const headcountByDept = [
  { dept: 'Sales',    q1: 38, q2: 41 },
  { dept: 'Service',  q1: 52, q2: 54 },
  { dept: 'Parts',    q1: 21, q2: 22 },
  { dept: 'Finance',  q1: 14, q2: 15 },
  { dept: 'Admin',    q1: 17, q2: 17 },
]

const headcountSeries = [
  { key: 'q1', label: 'Q1 2025' },
  { key: 'q2', label: 'Q2 2025' },
]

const headcountBridge = [
  { label: 'Q1 Close',  value: 142, type: 'total' as const },
  { label: 'New Hires', value: 18 },
  { label: 'Rehires',   value: 4 },
  { label: 'Voluntary', value: -9 },
  { label: 'Involuntary',value: -4 },
  { label: 'Transfers', value: -2 },
  { label: 'Q2 Close',  value: 149, type: 'total' as const },
]

const compensationTrend = [
  { month: 'Jan', base: 610000, overtime: 48000, bonus: 22000 },
  { month: 'Feb', base: 618000, overtime: 51000, bonus: 18000 },
  { month: 'Mar', base: 615000, overtime: 44000, bonus: 31000 },
  { month: 'Apr', base: 631000, overtime: 56000, bonus: 24000 },
  { month: 'May', base: 628000, overtime: 52000, bonus: 19000 },
  { month: 'Jun', base: 644000, overtime: 61000, bonus: 28000 },
]

const compSeries = [
  { key: 'base',     label: 'Base' },
  { key: 'overtime', label: 'Overtime' },
  { key: 'bonus',    label: 'Bonus' },
]

// ─── Financial Health data ────────────────────────────────────────────────────

const finSparks = {
  gross:    [18.4, 19.1, 17.8, 20.2, 19.6, 21.3],
  ebitda:   [8.2,  8.7,  7.9,  9.1,  8.8,  9.4],
  cashflow: [741,  812,  698,  893,  841,  924],
  dso:      [38,   35,   41,   33,   36,   31],
}

const plTrend = [
  { month: 'Jan', gross: 18.4, ebitda: 8.2, net: 5.1 },
  { month: 'Feb', gross: 19.1, ebitda: 8.7, net: 5.6 },
  { month: 'Mar', gross: 17.8, ebitda: 7.9, net: 4.8 },
  { month: 'Apr', gross: 20.2, ebitda: 9.1, net: 6.1 },
  { month: 'May', gross: 19.6, ebitda: 8.8, net: 5.8 },
  { month: 'Jun', gross: 21.3, ebitda: 9.4, net: 6.4 },
]

const marginSeries = [
  { key: 'gross',  label: 'Gross Margin %' },
  { key: 'ebitda', label: 'EBITDA %' },
  { key: 'net',    label: 'Net %' },
]

const expenseMix = [
  { label: 'COGS',      value: 58.2, color: '#ef4444' },
  { label: 'Labor',     value: 18.1, color: '#f59e0b' },
  { label: 'Overhead',  value: 9.4,  color: '#8b5cf6' },
  { label: 'Marketing', value: 4.1,  color: '#3b82f6' },
  { label: 'Other',     value: 10.2, color: '#6b7280' },
]

const cashBridgeFin = [
  { label: 'Opening',     value: 741000,  type: 'total' as const },
  { label: 'Collections', value: 892000 },
  { label: 'Other Income',value: 43000 },
  { label: 'COGS',        value: -518000 },
  { label: 'Payroll',     value: -241000 },
  { label: 'Overhead',    value: -87000 },
  { label: 'CapEx',       value: -62000 },
  { label: 'Closing',     value: 768000,  type: 'total' as const },
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

// ─── Deal Performance example ────────────────────────────────────────────────

function DealPerformance() {
  return (
    <div>
      <DashboardHeader
        title="Deal Performance"
        subtitle="Gross profit vs. days on lot, plus revenue mix over time"
        range="Jan – Jun 2025"
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 20 }}>
        <MetricCard label="Avg Gross / Deal" value={4700} formatValue={formatCurrency} trend={11.9} trendLabel="vs May" sparkline={dealSparks.gross} />
        <MetricCard label="Units Sold"       value="64"                                trend={3.2}  trendLabel="vs May" sparkline={dealSparks.volume} />
        <MetricCard label="Aged > 90 Days"   value="12"                                trend={-7.7} trendLabel="vs May" sparkline={dealSparks.aged} />
        <MetricCard label="Avg Days to Turn" value="22"                                trend={-12}  trendLabel="vs May" sparkline={dealSparks.avgDays} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 16 }} className="fc-examples-chart-row">
        <ChartCard title="Gross vs. Days on Lot" subtitle="New vs. used — scatter by unit">
          <ScatterChart
            series={dealScatter}
            height={280}
            xLabel="Days on Lot"
            yLabel="Gross Profit"
            formatY={formatCurrency}
            quadrants={[{ axis: 'x', value: 30, label: '30d threshold' }]}
          />
        </ChartCard>
        <ChartCard title="Revenue Mix Over Time" subtitle="Stacked by product line">
          <AreaChart
            data={areaRevenueData}
            series={areaRevenueSeries}
            xKey="month"
            variant="stacked"
            height={280}
            formatY={formatCurrency}
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

// ─── Service Department example ───────────────────────────────────────────────

function ServiceDepartment() {
  return (
    <div>
      <DashboardHeader
        title="Service Department"
        subtitle="RO volume, labor efficiency, tech performance, and CSI"
        range="Jan – Jun 2025"
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 20 }}>
        <MetricCard label="Avg RO Value"    value={3540}   formatValue={formatCurrency} trend={10.3} trendLabel="vs May" sparkline={serviceSparks.ros} />
        <MetricCard label="Labor Efficiency"value="81.6%"                               trend={5.4}  trendLabel="vs May" sparkline={serviceSparks.labor} />
        <MetricCard label="CSI Score"       value="93"                                  trend={4.5}  trendLabel="vs May" sparkline={serviceSparks.csi} />
        <MetricCard label="Comebacks"       value="9"                                   trend={-30.8}trendLabel="vs May" sparkline={serviceSparks.comebacks} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 16, marginBottom: 16 }} className="fc-examples-chart-row">
        <ChartCard title="RO Volume by Type" subtitle="Stacked monthly repair orders">
          <AreaChart data={roTrend} series={roSeries} xKey="month" variant="stacked" height={260} />
        </ChartCard>
        <ChartCard title="Labor Mix" subtitle="June breakdown">
          <DonutChart data={laborMix} centerLabel="Labor Hrs" height={260} />
        </ChartCard>
      </div>

      <ChartCard title="Tech Performance" subtitle="Hours flagged vs. efficiency — bubble = ROs written">
        <ScatterChart
          series={techPerformance}
          variant="bubble"
          height={260}
          xLabel="Hours Flagged"
          yLabel="Efficiency %"
          formatZ={(v) => `${v} ROs`}
          formatY={(v) => `${v.toFixed(1)}%`}
          quadrants={[
            { axis: 'x', value: 100, label: '100hr target' },
            { axis: 'y', value: 85,  label: '85% efficiency' },
          ]}
        />
      </ChartCard>
    </div>
  )
}

// ─── HR & Headcount example ───────────────────────────────────────────────────

function HRHeadcount() {
  return (
    <div>
      <DashboardHeader
        title="HR & Headcount"
        subtitle="Workforce movement, compensation, and attrition"
        range="Q1 → Q2 2025"
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 20 }}>
        <MetricCard label="Total Headcount"  value="149"   trend={4.9}  trendLabel="vs Q1" sparkline={hrSparks.headcount} />
        <MetricCard label="Attrition Rate"   value="2.4%"  trend={-17.2}trendLabel="vs Q1" sparkline={hrSparks.attrition} />
        <MetricCard label="Open Roles"       value="6"     trend={-25}  trendLabel="vs Q1" sparkline={hrSparks.openRoles} />
        <MetricCard label="Avg Tenure (yrs)" value="3.5"   trend={2.9}  trendLabel="vs Q1" sparkline={hrSparks.avgTenure} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 16, marginBottom: 16 }} className="fc-examples-chart-row">
        <ChartCard title="Headcount Bridge" subtitle="Q1 → Q2 movement">
          <WaterfallChart data={headcountBridge} height={260} />
        </ChartCard>
        <ChartCard title="Headcount by Department" subtitle="Q1 vs Q2">
          <BarChart data={headcountByDept} series={headcountSeries} xKey="dept" variant="grouped" height={260} />
        </ChartCard>
      </div>

      <ChartCard title="Compensation Trend" subtitle="Base, overtime, and bonus — stacked monthly">
        <AreaChart data={compensationTrend} series={compSeries} xKey="month" variant="stacked" height={260} formatY={formatCurrency} />
      </ChartCard>
    </div>
  )
}

// ─── Financial Health example ─────────────────────────────────────────────────

function FinancialHealth() {
  return (
    <div>
      <DashboardHeader
        title="Financial Health"
        subtitle="Margins, expense mix, and cash position"
        range="Jan – Jun 2025"
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 20 }}>
        <MetricCard label="Gross Margin"  value="21.3%"  trend={8.7}  trendLabel="vs May" sparkline={finSparks.gross} />
        <MetricCard label="EBITDA"        value="9.4%"   trend={6.8}  trendLabel="vs May" sparkline={finSparks.ebitda} />
        <MetricCard label="Cash Position" value={924000} formatValue={formatCurrency} trend={9.9} trendLabel="vs May" sparkline={finSparks.cashflow} />
        <MetricCard label="DSO (days)"    value="31"     trend={-13.9}trendLabel="vs May" sparkline={finSparks.dso} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,2fr) minmax(0,1fr)', gap: 16, marginBottom: 16 }} className="fc-examples-chart-row">
        <ChartCard title="Margin Trends" subtitle="Gross, EBITDA, and net — overlapping">
          <AreaChart
            data={plTrend}
            series={marginSeries}
            xKey="month"
            variant="overlapping"
            height={260}
            formatY={(v) => formatPercent(v, 1)}
          />
        </ChartCard>
        <ChartCard title="Expense Mix" subtitle="% of revenue">
          <DonutChart data={expenseMix} centerLabel="Expenses" height={260} formatValue={(v) => `${v}%`} />
        </ChartCard>
      </div>

      <ChartCard title="Cash Flow Bridge" subtitle="June — sources and uses">
        <WaterfallChart data={cashBridgeFin} height={260} formatValue={formatCurrency} />
      </ChartCard>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const TABS = [
  { id: 'revenue',     label: 'Revenue Overview', component: RevenueOverview },
  { id: 'operations',  label: 'Operations',        component: Operations },
  { id: 'inventory',   label: 'Inventory',         component: Inventory },
  { id: 'deals',       label: 'Deal Performance',  component: DealPerformance },
  { id: 'service',     label: 'Service Dept',      component: ServiceDepartment },
  { id: 'hr',          label: 'HR & Headcount',    component: HRHeadcount },
  { id: 'financial',   label: 'Financial Health',  component: FinancialHealth },
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
