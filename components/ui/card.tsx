import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
  scan = false,
}: {
  children: React.ReactNode;
  className?: string;
  scan?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-border bg-surface/80 backdrop-blur-sm",
        scan && "scan-sweep",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  subtitle,
  action,
  className,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-start justify-between gap-4 border-b border-border-soft px-5 py-4", className)}>
      <div>
        <h3 className="font-display text-[15px] font-semibold text-text">{title}</h3>
        {subtitle && <p className="mt-0.5 text-[13px] text-text-muted">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function CardBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("px-5 py-4", className)}>{children}</div>;
}
