"use client";
import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, Circle } from "lucide-react";

const steps = [
  "Uploading",
  "Extracting frames",
  "Running AI detectors",
  "Analyzing metadata",
  "Checking temporal consistency",
  "Generating forensic evidence",
  "Generating AI explanation",
];

export function AnalysisProgress({ onComplete }: { onComplete: () => void }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (current >= steps.length) {
      const t = setTimeout(onComplete, 500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setCurrent((c) => c + 1), 620);
    return () => clearTimeout(t);
  }, [current, onComplete]);

  return (
    <div className="mx-auto max-w-md py-6">
      <div className="space-y-3">
        {steps.map((s, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <div key={s} className="flex items-center gap-3">
              {done ? (
                <CheckCircle2 className="h-4.5 w-4.5 shrink-0 text-safe" />
              ) : active ? (
                <Loader2 className="h-4.5 w-4.5 shrink-0 animate-spin text-accent-2" />
              ) : (
                <Circle className="h-4.5 w-4.5 shrink-0 text-text-dim" />
              )}
              <span
                className={
                  done ? "text-[13.5px] text-text-muted" : active ? "text-[13.5px] font-medium text-text" : "text-[13.5px] text-text-dim"
                }
              >
                {s}
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2 transition-all duration-500"
          style={{ width: `${(Math.min(current, steps.length) / steps.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
