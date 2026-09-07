import { getAnalysisForCase } from "@/lib/analysis";
import { forensicCases, caseNotes } from "@/data/mock-data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardHeader, CardBody } from "@/components/ui/card";
import { RiskBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileDown, FileJson, FileArchive } from "lucide-react";

export default async function ReportPreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const c = forensicCases.find((c) => c.id === id);
  const result = getAnalysisForCase(id);
  const notes = caseNotes[id] ?? [];
  if (!c || !result) notFound();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link href={`/cases/${id}`} className="mb-2 flex items-center gap-1 text-[12.5px] text-text-muted hover:text-accent-2">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to case {id}
          </Link>
          <h1 className="font-display text-[22px] font-semibold text-text">Forensic Report Preview</h1>
          <p className="mt-1 text-[13.5px] text-text-muted">Case {id} · {c.mediaFile}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" icon={<FileJson className="h-4 w-4" />}>Export JSON</Button>
          <Button variant="secondary" icon={<FileArchive className="h-4 w-4" />}>Evidence Manifest</Button>
          <Button variant="primary" icon={<FileDown className="h-4 w-4" />}>Generate PDF</Button>
        </div>
      </div>

      <Card className="mx-auto max-w-4xl">
        <CardBody className="space-y-8 p-8">
          <div className="border-b border-border-soft pb-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-display text-[19px] font-bold text-text">TRACE-AI Forensic Report</div>
                <div className="mt-0.5 text-[12px] text-text-dim">AI-Powered Deepfake Detection & Digital Forensics Platform</div>
              </div>
              <RiskBadge risk={c.risk} />
            </div>
          </div>

          <ReportSection title="1. Case Information">
            <ReportRow label="Case ID" value={c.id} />
            <ReportRow label="Title" value={c.title} />
            <ReportRow label="Investigator" value={c.investigator} />
            <ReportRow label="Status" value={c.status} />
            <ReportRow label="Created" value={new Date(c.createdAt).toLocaleString()} />
          </ReportSection>

          <ReportSection title="2. Media Information">
            <ReportRow label="Filename" value={result.metadata.filename} />
            <ReportRow label="File Type" value={result.metadata.fileType} />
            <ReportRow label="File Size" value={result.metadata.fileSize} />
            {result.metadata.duration && <ReportRow label="Duration" value={result.metadata.duration} />}
          </ReportSection>

          <ReportSection title="3. Evidence Hash">
            <div className="break-all rounded-md border border-border-soft bg-surface-2/40 px-3 py-2 font-mono text-[12px] text-accent-2">
              {result.metadata.sha256}
            </div>
          </ReportSection>

          <ReportSection title="4. Detection Results">
            {result.detectors.map((d) => (
              <ReportRow key={d.id} label={d.name} value={`${d.score}% — ${d.flagged ? "Flagged" : "Clear"}`} />
            ))}
          </ReportSection>

          <ReportSection title="5. Forensic Findings">
            {result.evidence.map((e) => (
              <ReportRow key={e.id} label={e.finding} value={`${e.status} (${e.confidence}%)`} />
            ))}
          </ReportSection>

          {result.frames.length > 0 && (
            <ReportSection title="6. Suspicious Frames">
              {result.frames.map((f) => (
                <ReportRow key={f.id} label={`Frame ${f.frameNumber} (${f.timestamp})`} value={`${f.probability}%`} />
              ))}
            </ReportSection>
          )}

          <ReportSection title="7. Metadata">
            <ReportRow label="Encoder" value={result.metadata.encoder} />
            <ReportRow label="Created Date" value={result.metadata.createdDate} />
            <ReportRow label="Modified Date" value={result.metadata.modifiedDate} />
          </ReportSection>

          <ReportSection title="8. AI Analysis">
            <p className="text-[13px] leading-relaxed text-text-muted">{result.summary}</p>
          </ReportSection>

          <ReportSection title="9. Risk Assessment">
            <ReportRow label="Overall Risk" value={result.overallRisk} />
            <ReportRow label="Confidence" value={`${result.confidence}%`} />
          </ReportSection>

          <ReportSection title="10. Investigator Notes">
            {notes.length === 0 ? (
              <p className="text-[13px] text-text-dim">No notes recorded.</p>
            ) : (
              notes.map((n) => (
                <p key={n.id} className="text-[13px] text-text-muted">
                  <span className="font-medium text-text">{n.author}:</span> {n.content}
                </p>
              ))
            )}
          </ReportSection>

          <ReportSection title="11. Conclusion">
            <p className="text-[13px] leading-relaxed text-text-muted">{result.whyThisMatters}</p>
          </ReportSection>
        </CardBody>
      </Card>
    </div>
  );
}

function ReportSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 font-display text-[14px] font-semibold text-accent-2">{title}</h3>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function ReportRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border-soft/60 py-1.5 text-[12.5px]">
      <span className="text-text-muted">{label}</span>
      <span className="font-mono capitalize text-text">{value}</span>
    </div>
  );
}
