"use client";
import { DetectorResult } from "@/types";
import { Card } from "@/components/ui/card";
import { SimpleBarChart } from "@/components/charts/bar-chart";
import { CheckCircle2, XCircle } from "lucide-react";

export function DetectorConsensus({ detectors }: { detectors: DetectorResult[] }) {
  const flaggedCount = detectors.filter((d) => d.flagged).length;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {detectors.map((d) => (
          <Card key={d.id} className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-display text-[13.5px] font-semibold text-text">{d.name}</div>
                <div className="text-[11.5px] text-text-dim">{d.type}</div>
              </div>
              {d.flagged ? (
                <XCircle className="h-4.5 w-4.5 text-[#FF8A83]" />
              ) : (
                <CheckCircle2 className="h-4.5 w-4.5 text-safe" />
              )}
            </div>
            <div className="mt-3 flex items-end justify-between">
              <span className="font-mono text-[22px] font-semibold text-text">{d.score}%</span>
              <span className={`text-[11px] font-medium ${d.flagged ? "text-[#FF8A83]" : "text-safe"}`}>
                {d.flagged ? "Manipulation likely" : "No indicators"}
              </span>
            </div>
          </Card>
        ))}
      </div>

      <div
        className={`rounded-lg border px-4 py-2.5 text-center text-[13px] font-medium ${
          flaggedCount === detectors.length
            ? "border-[#4A1E1B] bg-critical-soft text-[#FF8A83]"
            : flaggedCount > 0
            ? "border-[#4A2E15] bg-high-soft text-[#FFB27A]"
            : "border-[#134432] bg-safe-soft text-safe"
        }`}
      >
        {flaggedCount} / {detectors.length} detectors indicate potential manipulation
      </div>

      <Card className="p-4">
        <div className="mb-2 text-[12.5px] font-medium text-text-muted">Detector score comparison</div>
        <SimpleBarChart
          data={detectors.map((d) => ({ name: d.name, score: d.score }))}
          dataKey="score"
          nameKey="name"
          height={200}
          colorByValue={(v) => (v >= 85 ? "#F0453D" : v >= 65 ? "#F5893A" : v >= 40 ? "#F0C242" : "#34D399")}
        />
      </Card>
    </div>
  );
}
