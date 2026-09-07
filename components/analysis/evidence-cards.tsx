import { ForensicEvidenceItem } from "@/types";
import { Card } from "@/components/ui/card";
import { RiskBadge } from "@/components/ui/badge";
import { CircleCheck, CircleHelp, CircleX } from "lucide-react";

const statusMeta: Record<string, { icon: typeof CircleCheck; color: string }> = {
  Detected: { icon: CircleCheck, color: "text-[#FF8A83]" },
  Possible: { icon: CircleHelp, color: "text-[#FFB27A]" },
  "Not Detected": { icon: CircleX, color: "text-safe" },
};

export function EvidenceCards({ evidence }: { evidence: ForensicEvidenceItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {evidence.map((e) => {
        const meta = statusMeta[e.status];
        const Icon = meta.icon;
        return (
          <Card key={e.id} className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <Icon className={`mt-0.5 h-4.5 w-4.5 shrink-0 ${meta.color}`} />
                <div>
                  <div className="font-display text-[13.5px] font-semibold text-text">{e.finding}</div>
                  <div className={`text-[11.5px] font-medium ${meta.color}`}>{e.status}</div>
                </div>
              </div>
              <RiskBadge risk={e.severity} />
            </div>
            <p className="mt-2.5 text-[12.5px] leading-relaxed text-text-muted">{e.explanation}</p>
            <div className="mt-3 flex items-center justify-between border-t border-border-soft pt-2.5 text-[11.5px]">
              <span className="font-mono text-text-dim">{e.timestamp ?? "N/A"}</span>
              <span className="font-mono text-text">{e.confidence}% confidence</span>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
