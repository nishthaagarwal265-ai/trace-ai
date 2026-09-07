import { Card } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  trend,
  up,
  icon: Icon,
  accent = "accent",
}: {
  label: string;
  value: string | number;
  trend: number;
  up: boolean;
  icon: LucideIcon;
  accent?: "accent" | "critical" | "high" | "safe";
}) {
  const accentMap: Record<string, string> = {
    accent: "text-accent-2 bg-accent-soft",
    critical: "text-[#FF8A83] bg-critical-soft",
    high: "text-[#FFB27A] bg-high-soft",
    safe: "text-[#6EE7B7] bg-safe-soft",
  };
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[12.5px] text-text-muted">{label}</div>
          <div className="mt-2 font-display text-[28px] font-semibold leading-none text-text">{value}</div>
        </div>
        <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg", accentMap[accent])}>
          <Icon className="h-4.5 w-4.5" strokeWidth={1.9} />
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1 text-[12px]">
        <span
          className={cn(
            "flex items-center gap-0.5 font-medium",
            up ? "text-safe" : "text-[#FFB27A]"
          )}
        >
          {up ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
          {trend}%
        </span>
        <span className="text-text-dim">vs last 30 days</span>
      </div>
    </Card>
  );
}
