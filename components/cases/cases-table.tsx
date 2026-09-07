"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { forensicCases } from "@/data/mock-data";
import { RiskBadge, Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatRelativeTime, cn } from "@/lib/utils";
import { FileVideo, FileImage, FileAudio, Eye, ScanSearch, FileText, Search } from "lucide-react";
import { MediaType, RiskLevel, CaseStatus } from "@/types";

const mediaIcon: Record<MediaType, typeof FileVideo> = {
  video: FileVideo,
  image: FileImage,
  audio: FileAudio,
};

const statusStyles: Record<string, "accent" | "success" | "muted" | "outline"> = {
  investigating: "accent",
  completed: "success",
  pending: "muted",
  closed: "outline",
};

const riskFilters: { label: string; value: RiskLevel | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Critical", value: "critical" },
  { label: "High", value: "high" },
  { label: "Medium", value: "medium" },
  { label: "Low", value: "low" },
];

const statusFilters: { label: string; value: CaseStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Open", value: "investigating" },
  { label: "Closed", value: "closed" },
];

export function CasesTable() {
  const [riskFilter, setRiskFilter] = useState<RiskLevel | "all">("all");
  const [statusFilter, setStatusFilter] = useState<CaseStatus | "all">("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return forensicCases.filter((c) => {
      if (riskFilter !== "all" && c.risk !== riskFilter) return false;
      if (statusFilter !== "all" && c.status !== statusFilter) return false;
      if (query && !`${c.id} ${c.title} ${c.mediaFile}`.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [riskFilter, statusFilter, query]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {riskFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setRiskFilter(f.value)}
              className={cn(
                "rounded-md border px-3 py-1.5 text-[12.5px] font-medium transition-colors",
                riskFilter === f.value
                  ? "border-accent/40 bg-accent-soft text-accent-2"
                  : "border-border text-text-muted hover:text-text"
              )}
            >
              {f.label}
            </button>
          ))}
          <span className="mx-1 w-px self-stretch bg-border-soft" />
          {statusFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setStatusFilter(f.value)}
              className={cn(
                "rounded-md border px-3 py-1.5 text-[12.5px] font-medium transition-colors",
                statusFilter === f.value
                  ? "border-accent/40 bg-accent-soft text-accent-2"
                  : "border-border text-text-muted hover:text-text"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5 text-text-dim">
          <Search className="h-3.5 w-3.5" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search cases…"
            className="w-48 bg-transparent text-[13px] text-text placeholder:text-text-dim focus:outline-none"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-surface/80">
        <table className="w-full min-w-[980px] text-left">
          <thead>
            <tr className="border-b border-border-soft text-[11px] uppercase tracking-wide text-text-dim">
              <th className="px-5 py-3 font-medium">Case ID</th>
              <th className="px-3 py-3 font-medium">Title</th>
              <th className="px-3 py-3 font-medium">Investigator</th>
              <th className="px-3 py-3 font-medium">Risk</th>
              <th className="px-3 py-3 font-medium">Status</th>
              <th className="px-3 py-3 font-medium">Evidence</th>
              <th className="px-3 py-3 font-medium">Created</th>
              <th className="px-3 py-3 font-medium">Updated</th>
              <th className="px-5 py-3 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => {
              const Icon = mediaIcon[c.mediaType];
              return (
                <tr key={c.id} className="border-b border-border-soft/70 text-[13px] transition-colors hover:bg-surface-2/50">
                  <td className="px-5 py-3">
                    <Link href={`/cases/${c.id}`} className="font-mono text-[12.5px] text-accent-2 hover:underline">
                      {c.id}
                    </Link>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <Icon className="h-3.5 w-3.5 shrink-0 text-text-dim" />
                      <span className="max-w-[220px] truncate text-text">{c.title}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-text-muted">{c.investigator}</td>
                  <td className="px-3 py-3">
                    <RiskBadge risk={c.risk} />
                  </td>
                  <td className="px-3 py-3">
                    <Badge variant={statusStyles[c.status]}>{c.status}</Badge>
                  </td>
                  <td className="px-3 py-3 font-mono text-text-muted">{c.evidenceCount}</td>
                  <td className="px-3 py-3 whitespace-nowrap text-text-dim">{formatRelativeTime(c.createdAt)}</td>
                  <td className="px-3 py-3 whitespace-nowrap text-text-dim">{formatRelativeTime(c.updatedAt)}</td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-1.5">
                      <Link href={`/cases/${c.id}`}>
                        <Button size="sm" variant="ghost" icon={<Eye className="h-3.5 w-3.5" />} />
                      </Link>
                      <Link href={`/analysis/${c.id}`}>
                        <Button size="sm" variant="ghost" icon={<ScanSearch className="h-3.5 w-3.5" />} />
                      </Link>
                      <Link href={`/reports/${c.id}`}>
                        <Button size="sm" variant="ghost" icon={<FileText className="h-3.5 w-3.5" />} />
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={9} className="px-5 py-12 text-center text-[13px] text-text-dim">
                  No cases match the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
