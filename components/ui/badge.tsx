import { cn } from "@/lib/utils";
import { RiskLevel } from "@/types";

const riskStyles: Record<RiskLevel, string> = {
  critical: "bg-critical-soft text-[#FF8A83] border-[#4A1E1B]",
  high: "bg-high-soft text-[#FFB27A] border-[#4A2E15]",
  medium: "bg-medium-soft text-[#F5D778] border-[#4A3E17]",
  low: "bg-safe-soft text-[#6EE7B7] border-[#134432]",
};

export function RiskBadge({ risk, className }: { risk: RiskLevel; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[11px] font-mono font-medium uppercase tracking-wide",
        riskStyles[risk],
        className
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          risk === "critical" && "bg-[#F0453D]",
          risk === "high" && "bg-[#F5893A]",
          risk === "medium" && "bg-[#F0C242]",
          risk === "low" && "bg-[#34D399]"
        )}
      />
      {risk}
    </span>
  );
}

export function Badge({
  children,
  className,
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "accent" | "success" | "muted";
}) {
  const variants: Record<string, string> = {
    default: "bg-surface-2 text-text border-border",
    outline: "bg-transparent text-text-muted border-border",
    accent: "bg-accent-soft text-accent-2 border-[#1E3A5C]",
    success: "bg-safe-soft text-[#6EE7B7] border-[#134432]",
    muted: "bg-surface text-text-dim border-border-soft",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[11px] font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
