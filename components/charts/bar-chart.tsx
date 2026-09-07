"use client";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, Cell } from "recharts";

export function SimpleBarChart({
  data,
  dataKey,
  nameKey,
  color = "#3B82F6",
  height = 220,
  colorByValue,
}: {
  data: Record<string, unknown>[];
  dataKey: string;
  nameKey: string;
  color?: string;
  height?: number;
  colorByValue?: (v: number) => string;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1A212B" vertical={false} />
        <XAxis
          dataKey={nameKey}
          tick={{ fill: "#5B6572", fontSize: 11 }}
          axisLine={{ stroke: "#1F2731" }}
          tickLine={false}
        />
        <YAxis tick={{ fill: "#5B6572", fontSize: 11 }} axisLine={false} tickLine={false} />
        <Tooltip
          cursor={{ fill: "rgba(59,130,246,0.06)" }}
          contentStyle={{
            background: "#161C25",
            border: "1px solid #1F2731",
            borderRadius: 8,
            fontSize: 12,
            color: "#E7ECF2",
          }}
        />
        <Bar dataKey={dataKey} radius={[5, 5, 0, 0]} maxBarSize={38}>
          {data.map((entry, i) => (
            <Cell key={i} fill={colorByValue ? colorByValue(entry[dataKey] as number) : color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
