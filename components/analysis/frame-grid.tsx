"use client";
import { useState } from "react";
import { SuspiciousFrame } from "@/types";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { ScanFace } from "lucide-react";

export function FrameGrid({ frames }: { frames: SuspiciousFrame[] }) {
  const [selected, setSelected] = useState<SuspiciousFrame | null>(null);

  if (frames.length === 0) {
    return <p className="text-[13px] text-text-dim">No frame-level data available for this media type.</p>;
  }

  return (
    <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {frames.map((f) => (
          <button
            key={f.id}
            onClick={() => setSelected(f)}
            className="group overflow-hidden rounded-lg border border-border-soft bg-surface-2/40 text-left transition-colors hover:border-accent/40"
          >
            <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-[#151B23] to-[#0D1117]">
              <ScanFace className="h-7 w-7 text-text-dim transition-colors group-hover:text-accent-2" strokeWidth={1.5} />
            </div>
            <div className="flex items-center justify-between px-3 py-2">
              <div>
                <div className="font-mono text-[11.5px] text-text">Frame {f.frameNumber}</div>
                <div className="font-mono text-[10.5px] text-text-dim">{f.timestamp}</div>
              </div>
              <span
                className={`font-mono text-[12px] font-semibold ${
                  f.probability >= 85 ? "text-[#FF8A83]" : f.probability >= 60 ? "text-[#FFB27A]" : "text-[#F5D778]"
                }`}
              >
                {f.probability}%
              </span>
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <DialogContent title={`Frame ${selected.frameNumber} · ${selected.timestamp}`}>
          <div className="flex aspect-video items-center justify-center rounded-lg bg-gradient-to-br from-[#151B23] to-[#0D1117]">
            <ScanFace className="h-14 w-14 text-text-dim" strokeWidth={1.3} />
          </div>
          <div className="mt-4 flex items-center justify-between text-[13px]">
            <span className="text-text-muted">Manipulation probability</span>
            <span className="font-mono text-[16px] font-semibold text-[#FF8A83]">{selected.probability}%</span>
          </div>
          <p className="mt-3 text-[12.5px] leading-relaxed text-text-dim">
            Forensic viewer placeholder — connect the frame-extraction API to render the actual decoded frame with
            highlighted manipulation regions.
          </p>
        </DialogContent>
      )}
    </Dialog>
  );
}
