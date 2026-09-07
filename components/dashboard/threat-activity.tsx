import { threatActivity } from "@/data/mock-data";
import { RiskBadge } from "@/components/ui/badge";
import { formatRelativeTime } from "@/lib/utils";
import Link from "next/link";

export function ThreatActivityList() {
  return (
    <div className="space-y-0">
      {threatActivity.map((t, i) => (
        <Link
          key={t.id}
          href={`/cases/${t.caseId}`}
          className="group relative flex gap-3 px-5 py-3.5 transition-colors hover:bg-surface-2/60"
        >
          <div className="relative flex flex-col items-center">
            <span
              className={`h-2.5 w-2.5 shrink-0 rounded-full ring-4 ${
                t.risk === "critical"
                  ? "bg-critical ring-critical-soft"
                  : t.risk === "high"
                  ? "bg-high ring-high-soft"
                  : t.risk === "medium"
                  ? "bg-medium ring-medium-soft"
                  : "bg-safe ring-safe-soft"
              }`}
            />
            {i < threatActivity.length - 1 && <span className="mt-1 w-px flex-1 bg-border-soft" />}
          </div>
          <div className="flex-1 pb-1">
            <div className="flex items-center gap-2">
              <RiskBadge risk={t.risk} />
              <span className="font-mono text-[11.5px] text-text-dim">{t.caseId}</span>
            </div>
            <div className="mt-1 text-[13px] text-text group-hover:text-accent-2">{t.title}</div>
            <div className="mt-0.5 text-[11.5px] text-text-dim">{formatRelativeTime(t.timestamp)}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}
