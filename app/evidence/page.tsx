import { forensicCases } from "@/data/mock-data";
import { getAnalysisForCase } from "@/lib/analysis";
import { Card, CardHeader, CardBody } from "@/components/ui/card";
import { RiskBadge } from "@/components/ui/badge";
import Link from "next/link";
import { ShieldCheck, Hash } from "lucide-react";

export default function EvidencePage() {
  const cases = forensicCases.slice(0, 8).map((c) => ({ c, result: getAnalysisForCase(c.id)! }));
  const totalEvidence = forensicCases.reduce((s, c) => s + c.evidenceCount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-[22px] font-semibold text-text">Evidence Repository</h1>
        <p className="mt-1 text-[13.5px] text-text-muted">
          {totalEvidence} preserved evidence items across {forensicCases.length} active cases.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cases.map(({ c, result }) => (
          <Card key={c.id} className="flex flex-col">
            <CardHeader
              title={c.id}
              subtitle={c.mediaFile}
              action={<RiskBadge risk={c.risk} />}
            />
            <CardBody className="flex flex-1 flex-col justify-between gap-4">
              <div className="space-y-2">
                {result.evidence.slice(0, 3).map((e) => (
                  <div key={e.id} className="flex items-center justify-between text-[12.5px]">
                    <span className="text-text-muted">{e.finding}</span>
                    <span
                      className={
                        e.status === "Detected"
                          ? "text-[#FF8A83]"
                          : e.status === "Possible"
                          ? "text-[#FFB27A]"
                          : "text-safe"
                      }
                    >
                      {e.status}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between border-t border-border-soft pt-3">
                <div className="flex items-center gap-1.5 text-[11px] text-text-dim">
                  <Hash className="h-3 w-3" />
                  <span className="font-mono">{result.metadata.sha256.slice(0, 12)}…</span>
                </div>
                <Link href={`/cases/${c.id}`} className="flex items-center gap-1 text-[12px] text-accent-2 hover:underline">
                  <ShieldCheck className="h-3.5 w-3.5" /> View chain of custody
                </Link>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
