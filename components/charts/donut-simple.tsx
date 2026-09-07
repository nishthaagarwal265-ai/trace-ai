"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

export function DonutSimple({
  data,
  colors,
  height = 220,
}: {
  data: { name: string; value: number }[];
  colors: string[];
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={54} outerRadius={84} paddingAngle={2} strokeWidth={0}>
          {data.map((_, i) => (
            <Cell key={i} fill={colors[i % colors.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ background: "#161C25", border: "1px solid #1F2731", borderRadius: 8, fontSize: 12, color: "#E7ECF2" }}
        />
        <Legend
          verticalAlign="bottom"
          height={28}
          formatter={(v) => <span style={{ color: "#8A96A6", fontSize: 12 }}>{v}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
