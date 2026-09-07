"use client";
import Link from "next/link";
import { forensicCases } from "@/data/mock-data";
import { RiskBadge, Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatRelativeTime } from "@/lib/utils";
import { FileVideo, FileImage, FileAudio, Eye, ScanSearch, FileText } from "lucide-react";
import { MediaType } from "@/types";

const mediaIcon: Record<MediaType, typeof FileVideo> = {
  video: FileVideo,
  image: FileImage,
  audio: FileAudio,
};

const statusStyles: Record<string, string> = {
  investigating: "accent",
  completed: "success",
  pending: "muted",
  closed: "outline",
};

export function RecentCasesTable() {
  const cases = forensicCases.slice(0, 6);
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[900px] text-left">
        <thead>
          <tr className="border-b border-border-soft text-[11px] uppercase tracking-wide text-text-dim">
            <th className="px-5 py-3 font-medium">Case ID</th>
            <th className="px-3 py-3 font-medium">Media</th>
            <th className="px-3 py-3 font-medium">Type</th>
            <th className="px-3 py-3 font-medium">Risk</th>
            <th className="px-3 py-3 font-medium">Confidence</th>
            <th className="px-3 py-3 font-medium">Status</th>
            <th className="px-3 py-3 font-medium">Created</th>
            <th className="px-5 py-3 font-medium text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {cases.map((c) => {
            const Icon = mediaIcon[c.mediaType];
            return (
              <tr key={c.id} className="border-b border-border-soft/70 text-[13px] transition-colors hover:bg-surface-2/50">
                <td className="px-5 py-3">
                  <Link href={`/cases/${c.id}`} className="font-mono text-[12.5px] text-accent-2 hover:underline">
                    {c.id}
                  </Link>
                </td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-2 text-text-muted">
                    <Icon className="h-3.5 w-3.5 shrink-0" />
                    <span className="max-w-[160px] truncate">{c.mediaFile}</span>
                  </div>
                </td>
                <td className="px-3 py-3 capitalize text-text-muted">{c.mediaType}</td>
                <td className="px-3 py-3">
                  <RiskBadge risk={c.risk} />
                </td>
                <td className="px-3 py-3 font-mono text-text">{c.confidence}%</td>
                <td className="px-3 py-3">
                  <Badge variant={statusStyles[c.status] as "accent" | "success" | "muted" | "outline"}>
                    {c.status}
                  </Badge>
                </td>
                <td className="px-3 py-3 whitespace-nowrap text-text-dim">{formatRelativeTime(c.createdAt)}</td>
                <td className="px-5 py-3">
                  <div className="flex justify-end gap-1.5">
                    <Link href={`/cases/${c.id}`}>
                      <Button size="sm" variant="ghost" icon={<Eye className="h-3.5 w-3.5" />}>
                        View
                      </Button>
                    </Link>
                    <Link href={`/analysis/${c.id}`}>
                      <Button size="sm" variant="ghost" icon={<ScanSearch className="h-3.5 w-3.5" />}>
                        Analyze
                      </Button>
                    </Link>
                    <Link href={`/reports/${c.id}`}>
                      <Button size="sm" variant="ghost" icon={<FileText className="h-3.5 w-3.5" />}>
                        Report
                      </Button>
                    </Link>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
