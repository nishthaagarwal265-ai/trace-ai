"use client";
import { useState } from "react";
import { TimelineSegment } from "@/types";
import { cn } from "@/lib/utils";

const riskColor: Record<string, string> = {
  critical: "#F0453D",
  high: "#F5893A",
  medium: "#F0C242",
  low: "#34D399",
};

export function FrameTimeline({ segments, duration }: { segments: TimelineSegment[]; duration: number }) {
  const [active, setActive] = useState<number | null>(
    segments.findIndex((s) => s.risk === "critical" || s.risk === "high")
  );

  const fmt = (s: number) => `00:${s.toString().padStart(2, "0")}`;

  return (
    <div>
      <div className="flex h-10 w-full overflow-hidden rounded-md border border-border-soft">
        {segments.map((seg, i) => {
          const width = ((seg.endSec - seg.startSec) / duration) * 100;
          return (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{ width: `${width}%`, background: riskColor[seg.risk] + (active === i ? "" : "AA") }}
              className={cn(
                "relative h-full border-r border-bg/40 transition-all hover:opacity-90",
                active === i && "ring-2 ring-inset ring-white/60"
              )}
              title={`${fmt(seg.startSec)}–${fmt(seg.endSec)}: ${seg.label}`}
            />
          );
        })}
      </div>
      <div className="mt-1.5 flex justify-between font-mono text-[10.5px] text-text-dim">
        <span>{fmt(0)}</span>
        <span>{fmt(Math.round(duration / 2))}</span>
        <span>{fmt(duration)}</span>
      </div>

      {active !== null && segments[active] && (
        <div className="mt-4 rounded-lg border border-border-soft bg-surface-2/50 px-4 py-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[12.5px] text-text">
              {fmt(segments[active].startSec)} – {fmt(segments[active].endSec)}
            </span>
            <span
              className="rounded-md border px-2 py-0.5 font-mono text-[10.5px] uppercase tracking-wide"
              style={{
                color: riskColor[segments[active].risk],
                borderColor: riskColor[segments[active].risk] + "55",
                background: riskColor[segments[active].risk] + "14",
              }}
            >
              {segments[active].risk}
            </span>
          </div>
          <p className="mt-1.5 text-[13px] text-text-muted">{segments[active].label}</p>
        </div>
      )}
    </div>
  );
}
