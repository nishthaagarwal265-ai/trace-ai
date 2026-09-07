import { forensicCases } from "@/data/mock-data";
import { Card } from "@/components/ui/card";
import { RiskBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileText, Eye } from "lucide-react";
import { formatRelativeTime } from "@/lib/utils";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-[22px] font-semibold text-text">Forensic Reports</h1>
        <p className="mt-1 text-[13.5px] text-text-muted">
          Generate and export structured forensic reports for legal or investigative use.
        </p>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left">
            <thead>
              <tr className="border-b border-border-soft text-[11px] uppercase tracking-wide text-text-dim">
                <th className="px-5 py-3 font-medium">Case ID</th>
                <th className="px-3 py-3 font-medium">Media</th>
                <th className="px-3 py-3 font-medium">Risk</th>
                <th className="px-3 py-3 font-medium">Last Updated</th>
                <th className="px-5 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {forensicCases.map((c) => (
                <tr key={c.id} className="border-b border-border-soft/70 text-[13px] hover:bg-surface-2/50">
                  <td className="px-5 py-3 font-mono text-[12.5px] text-accent-2">{c.id}</td>
                  <td className="px-3 py-3 text-text-muted">{c.mediaFile}</td>
                  <td className="px-3 py-3">
                    <RiskBadge risk={c.risk} />
                  </td>
                  <td className="px-3 py-3 text-text-dim">{formatRelativeTime(c.updatedAt)}</td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-1.5">
                      <Link href={`/reports/${c.id}`}>
                        <Button size="sm" variant="ghost" icon={<Eye className="h-3.5 w-3.5" />}>
                          Preview
                        </Button>
                      </Link>
                      <Link href={`/reports/${c.id}`}>
                        <Button size="sm" variant="secondary" icon={<FileText className="h-3.5 w-3.5" />}>
                          Generate
                        </Button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
