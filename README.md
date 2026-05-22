# Foundry Charts

Beautiful React charts. Dark-mode first. Business-dashboard optimized.

**[foundry-charts.adams-ai.com](https://foundry-charts.adams-ai.com)** · [Docs](https://foundry-charts.adams-ai.com/docs/charts/bar-chart) · [Examples](https://foundry-charts.adams-ai.com/examples)

---

Most React chart libraries were designed by engineers, not designers. Recharts, Nivo, Victory all have the same problem: mediocre defaults that look developer-built. Foundry Charts fixes that — opinionated, beautiful, dark-mode-first, and optimized for real business dashboards.

## Features

- **Dark-mode first** — designed for dark backgrounds, light mode is the adaptation
- **Opinionated defaults** — no rainbow palettes, no 3D, no chartjunk
- **Useful tooltips** — `$1.2M` not `1234567.89`, context-aware formatting built in
- **Business chart types** — the types that actually show up in dealer analytics, fleet dashboards, and revenue reporting
- **Tree-shakeable** — import `<BarChart>` and nothing else ships
- **Built on D3** — D3 as a `peerDependency`; you control the version

## Install

```bash
npm install foundry-charts d3
```

## Usage

```tsx
import { BarChart, formatCurrency } from 'foundry-charts'
import 'foundry-charts/styles'

const data = [
  { month: 'Jan', parts: 28000, labor: 19000, sublet: 4200 },
  { month: 'Feb', parts: 31000, labor: 22000, sublet: 3800 },
  // ...
]

export function RevenueChart() {
  return (
    <BarChart
      data={data}
      series={[
        { key: 'parts', label: 'Parts' },
        { key: 'labor', label: 'Labor' },
        { key: 'sublet', label: 'Sublet' },
      ]}
      xKey="month"
      variant="stacked"
      formatY={formatCurrency}
    />
  )
}
```

## Chart types

| Component | Variants | Description |
|---|---|---|
| `<BarChart>` | `grouped`, `stacked` | Grouped and stacked bars with negative value support. Responsive. |
| `<LineChart>` | `line`, `area` | Multi-series lines with smooth curves and optional area fill. |
| `<AreaChart>` | `stacked`, `overlapping` | True stacked areas or overlapping with gradient fills and crosshair tooltip. |
| `<DonutChart>` | — | Animated segments with a center label slot. |
| `<ScatterChart>` | `scatter`, `bubble` | Two-variable scatter plot. Bubble variant maps a third dimension to radius. Supports quadrant lines. |
| `<MetricCard>` | — | Big number + trend badge + inline sparkline — the most-used dashboard element. |
| `<WaterfallChart>` | — | Floating bar bridge chart for inventory, cash flow, and any start→changes→end story. |

## Formatters

```tsx
import { formatCurrency, formatPercent, formatValue } from 'foundry-charts'

formatCurrency(51200)   // → "$51.2K"
formatCurrency(1340000) // → "$1.3M"
formatPercent(86.9)     // → "86.9%"
formatValue(3400)       // → "3.4K"
```

## Theming

One CSS file controls everything. Override any token to match your design system:

```css
:root {
  --fc-blue: #3b82f6;
  --fc-surface: #13131f;
  --fc-font: 'Inter', system-ui;
  --fc-radius: 4px;
  --fc-transition-slow: 400ms ease;
}
```

## WaterfallChart example

```tsx
import { WaterfallChart } from 'foundry-charts'

// Inventory bridge — the chart type no other library has right
const data = [
  { label: 'Starting Inventory', value: 245, type: 'total' },
  { label: 'New Units In',       value: 48 },
  { label: 'Trade-Ins',          value: 15 },
  { label: 'Units Sold',         value: -62 },
  { label: 'Aged Out (>90d)',    value: -12 },
  { label: 'Ending Inventory',   value: 234, type: 'total' },
]

<WaterfallChart data={data} height={300} />
```

## ScatterChart example

```tsx
import { ScatterChart, formatCurrency } from 'foundry-charts'

<ScatterChart
  series={[
    {
      key: 'new',
      label: 'New Units',
      data: [
        { x: 12, y: 4200 },
        { x: 8,  y: 5100 },
        // ...
      ],
    },
  ]}
  xLabel="Days on Lot"
  yLabel="Gross Profit"
  formatY={formatCurrency}
  quadrants={[{ axis: 'x', value: 30, label: '30-day threshold' }]}
/>
```

## Requirements

- React 18+
- D3 v7

## License

MIT · Built by [Adams AI](https://adams-ai.com)
