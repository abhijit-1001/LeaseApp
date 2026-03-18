import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import './DonutChart.css';

const data = [
  { name: 'In Progress', value: 606, color: '#3b5bdb' },
  { name: 'Completed',   value: 42,  color: '#d4a017' },
  { name: 'Cancelled',   value: 69,  color: '#0ea5a0' },
];

const TOTAL = data.reduce((sum, d) => sum + d.value, 0);

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0].payload;
    const pct = ((value / TOTAL) * 100).toFixed(1);
    return (
      <div className="donut-tooltip">
        <span className="tt-name">{name}</span>
        <span className="tt-value">{value.toLocaleString()}</span>
        <span className="tt-pct">{pct}%</span>
      </div>
    );
  }
  return null;
};

function DonutChart() {
  return (
    <div className="donut-wrapper">
      <div className="donut-chart-area">
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center label */}
        <div className="donut-center-label">
          <span className="donut-total">{TOTAL.toLocaleString()}</span>
          <span className="donut-sublabel">Total</span>
        </div>
      </div>

      <div className="donut-title">Total Request {TOTAL.toLocaleString()}</div>

      {/* Legend */}
      <div className="donut-legend">
        {data.map(({ name, value, color }) => (
          <div className="legend-item" key={name}>
            <span className="legend-dot" style={{ background: color }} />
            <span className="legend-name">{name}</span>
            <span className="legend-value">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DonutChart;
