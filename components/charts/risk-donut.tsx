"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { riskBreakdown } from "@/data/mock-data";

const COLORS: Record<string, string> = {
  low: "#34D399",
  medium: "#F0C242",
  high: "#F5893A",
  critical: "#F0453D",
};

export function RiskDonut() {
  const total = riskBreakdown.reduce((s, r) => s + r.value, 0);
  return (
    <div className="relative h-[220px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={riskBreakdown}
            dataKey="value"
            nameKey="name"
            innerRadius={62}
            outerRadius={92}
            paddingAngle={3}
            strokeWidth={0}
          >
            {riskBreakdown.map((entry) => (
              <Cell key={entry.risk} fill={COLORS[entry.risk]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: "#161C25",
              border: "1px solid #1F2731",
              borderRadius: 8,
              fontSize: 12,
              color: "#E7ECF2",
            }}
            itemStyle={{ color: "#E7ECF2" }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <div className="font-display text-2xl font-bold text-text">{total.toLocaleString()}</div>
        <div className="text-[11px] text-text-dim">Total Analyzed</div>
      </div>
    </div>
  );
}
