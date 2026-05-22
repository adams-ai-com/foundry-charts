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

| Component | Description |
|---|---|
| `<BarChart>` | Grouped, stacked, and negative values. Responsive. |
| `<LineChart>` | Multi-series lines with smooth curves and area fill variant |
| `<DonutChart>` | Animated segments, center label slot |
| `<Sparkline>` | Inline trend indicator, no axes |
| `<MetricCard>` | Big number + trend badge + sparkline — the most-used dashboard element |

## Theming

One CSS file controls everything. Override any token to match your design system:

```css
:root {
  --fc-blue: #3b82f6;
  --fc-surface: #13131f;
  --fc-font: 'Inter', system-ui;
  --fc-radius: 4px;
}
```

## Requirements

- React 18+
- D3 v7

## License

MIT · Built by [Adams AI](https://adams-ai.com)
