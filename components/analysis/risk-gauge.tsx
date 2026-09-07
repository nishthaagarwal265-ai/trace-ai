"use client";
import { RiskLevel } from "@/types";
import { cn } from "@/lib/utils";

const riskColor: Record<RiskLevel, string> = {
  critical: "#F0453D",
  high: "#F5893A",
  medium: "#F0C242",
  low: "#34D399",
};

export function RiskGauge({ confidence, risk }: { confidence: number; risk: RiskLevel }) {
  const color = riskColor[risk];
  const radius = 84;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (confidence / 100) * circumference;

  return (
    <div className="relative flex h-[220px] w-[220px] items-center justify-center">
      <svg width="220" height="220" className="-rotate-90">
        <circle cx="110" cy="110" r={radius} stroke="#1A212B" strokeWidth="10" fill="none" />
        {/* tick marks */}
        {Array.from({ length: 48 }).map((_, i) => {
          const angle = (i / 48) * 360;
          const active = angle <= (confidence / 100) * 360;
          return (
            <line
              key={i}
              x1="110"
              y1="14"
              x2="110"
              y2="20"
              stroke={active ? color : "#232B36"}
              strokeWidth="2"
              transform={`rotate(${angle} 110 110)`}
              opacity={active ? 0.9 : 0.5}
            />
          );
        })}
        <circle
          cx="110"
          cy="110"
          r={radius}
          stroke={color}
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 900ms ease" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-display text-[42px] font-bold leading-none text-text">{confidence}%</span>
        <span className="mt-2 text-[11px] uppercase tracking-widest text-text-dim">Confidence</span>
        <span
          className={cn(
            "mt-3 rounded-md border px-3 py-1 font-mono text-[12px] font-semibold uppercase tracking-wider"
          )}
          style={{ color, borderColor: color + "55", background: color + "14" }}
        >
          {risk} risk
        </span>
      </div>
    </div>
  );
}
