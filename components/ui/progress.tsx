import { cn } from "@/lib/utils";

export function Progress({
  value,
  className,
  barClassName,
  colorByValue = false,
}: {
  value: number;
  className?: string;
  barClassName?: string;
  colorByValue?: boolean;
}) {
  const color = colorByValue
    ? value >= 85
      ? "bg-critical"
      : value >= 65
      ? "bg-high"
      : value >= 40
      ? "bg-medium"
      : "bg-safe"
    : "bg-accent";
  return (
    <div className={cn("h-1.5 w-full overflow-hidden rounded-full bg-surface-2", className)}>
      <div
        className={cn("h-full rounded-full transition-all duration-700", color, barClassName)}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
