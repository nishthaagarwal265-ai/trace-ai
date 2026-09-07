"use client";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, Line, LineChart } from "recharts";

export function TrendAreaChart({
  data,
  xKey,
  areas,
  height = 260,
}: {
  data: Record<string, unknown>[];
  xKey: string;
  areas: { key: string; color: string; label: string }[];
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
        <defs>
          {areas.map((a) => (
            <linearGradient key={a.key} id={`grad-${a.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={a.color} stopOpacity={0.35} />
              <stop offset="95%" stopColor={a.color} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#1A212B" vertical={false} />
        <XAxis dataKey={xKey} tick={{ fill: "#5B6572", fontSize: 11 }} axisLine={{ stroke: "#1F2731" }} tickLine={false} />
        <YAxis tick={{ fill: "#5B6572", fontSize: 11 }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{ background: "#161C25", border: "1px solid #1F2731", borderRadius: 8, fontSize: 12, color: "#E7ECF2" }}
        />
        {areas.map((a) => (
          <Area
            key={a.key}
            type="monotone"
            dataKey={a.key}
            name={a.label}
            stroke={a.color}
            fill={`url(#grad-${a.key})`}
            strokeWidth={2}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function SimpleLineChart({
  data,
  xKey,
  yKey,
  color = "#22D3EE",
  height = 200,
}: {
  data: Record<string, unknown>[];
  xKey: string;
  yKey: string;
  color?: string;
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1A212B" vertical={false} />
        <XAxis dataKey={xKey} tick={{ fill: "#5B6572", fontSize: 11 }} axisLine={{ stroke: "#1F2731" }} tickLine={false} />
        <YAxis tick={{ fill: "#5B6572", fontSize: 11 }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{ background: "#161C25", border: "1px solid #1F2731", borderRadius: 8, fontSize: 12, color: "#E7ECF2" }}
        />
        <Line type="monotone" dataKey={yKey} stroke={color} strokeWidth={2.2} dot={{ r: 3, fill: color }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
