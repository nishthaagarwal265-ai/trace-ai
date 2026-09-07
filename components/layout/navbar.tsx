"use client";
import { Search, Bell, ShieldCheck } from "lucide-react";
import { currentInvestigator } from "@/data/mock-data";

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b border-border bg-bg/85 px-6 backdrop-blur-md">
      <div className="flex max-w-md flex-1 items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5 text-text-dim focus-within:border-accent/50">
        <Search className="h-3.5 w-3.5 shrink-0" />
        <input
          placeholder="Search cases, media, hashes…"
          className="w-full bg-transparent text-[13px] text-text placeholder:text-text-dim focus:outline-none"
        />
        <kbd className="hidden shrink-0 rounded border border-border-soft bg-surface-2 px-1.5 py-0.5 font-mono text-[10px] text-text-dim sm:block">
          ⌘K
        </kbd>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden items-center gap-1.5 rounded-md border border-[#134432] bg-safe-soft px-2.5 py-1 text-[11px] font-mono text-safe md:flex">
          <ShieldCheck className="h-3.5 w-3.5" />
          ALL SYSTEMS OPERATIONAL
        </div>

        <button className="relative flex h-8 w-8 items-center justify-center rounded-lg text-text-muted hover:bg-surface-2 hover:text-text">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-critical" />
        </button>

        <div className="flex items-center gap-2.5 border-l border-border-soft pl-4">
          <div className="hidden text-right leading-tight sm:block">
            <div className="text-[12.5px] font-medium text-text">{currentInvestigator.name}</div>
            <div className="text-[10.5px] text-text-dim">{currentInvestigator.role}</div>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-accent/40 to-accent-2/30 text-[12px] font-semibold text-text ring-1 ring-border">
            AS
          </div>
        </div>
      </div>
    </header>
  );
}
