"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  FolderOpen,
  ScanSearch,
  ShieldCheck,
  FileText,
  Cpu,
  BarChart3,
  Settings,
  ChevronsLeft,
  ChevronsRight,
  Fingerprint,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { systemServices } from "@/data/mock-data";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/cases", label: "Cases", icon: FolderOpen },
  { href: "/analyze", label: "Analyze Media", icon: ScanSearch },
  { href: "/evidence", label: "Evidence", icon: ShieldCheck },
  { href: "/reports", label: "Reports", icon: FileText },
  { href: "/models", label: "Detection Models", icon: Cpu },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "sticky top-0 flex h-screen shrink-0 flex-col border-r border-border bg-bg-raised transition-all duration-200",
        collapsed ? "w-[68px]" : "w-[240px]"
      )}
    >
      <div className="flex h-14 items-center gap-2.5 border-b border-border-soft px-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-accent to-accent-2 shadow-[0_0_18px_-3px_rgba(59,130,246,0.6)]">
          <Fingerprint className="h-4.5 w-4.5 text-[#050709]" strokeWidth={2.4} />
        </div>
        {!collapsed && (
          <div className="leading-tight">
            <div className="font-display text-[14.5px] font-bold tracking-wide text-text">TRACE-AI</div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-text-dim">Forensics Platform</div>
          </div>
        )}
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-2.5 py-3">
        {navItems.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-colors",
                active
                  ? "bg-accent-soft text-accent-2"
                  : "text-text-muted hover:bg-surface-2 hover:text-text"
              )}
            >
              {active && (
                <span className="absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-r bg-accent-2" />
              )}
              <Icon className="h-4.5 w-4.5 shrink-0" strokeWidth={1.9} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {!collapsed && (
        <div className="border-t border-border-soft px-4 py-3">
          <div className="mb-2 text-[10px] font-mono uppercase tracking-widest text-text-dim">System Status</div>
          <div className="space-y-1.5">
            {systemServices.slice(0, 3).map((s) => (
              <div key={s.name} className="flex items-center justify-between text-[11.5px]">
                <span className="text-text-muted">{s.name.replace(" Engine", "")}</span>
                <span className="flex items-center gap-1.5 font-mono text-safe">
                  <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-safe" />
                  {s.name === "Evidence Storage" ? "SECURE" : "ONLINE"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={() => setCollapsed((c) => !c)}
        className="flex h-10 items-center justify-center border-t border-border-soft text-text-dim transition-colors hover:bg-surface-2 hover:text-text"
      >
        {collapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
      </button>
    </aside>
  );
}
