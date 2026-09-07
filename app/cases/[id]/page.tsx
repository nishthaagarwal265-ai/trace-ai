"use client";
import { use, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { forensicCases, caseNotes, caseTimelineEvents, currentInvestigator } from "@/data/mock-data";
import { getAnalysisForCase } from "@/lib/analysis";
import { Card, CardHeader, CardBody } from "@/components/ui/card";
import { RiskBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { EvidenceCards } from "@/components/analysis/evidence-cards";
import { formatRelativeTime } from "@/lib/utils";
import {
  ArrowLeft,
  ScanSearch,
  FileText,
  FileVideo,
  FileImage,
  FileAudio,
  Send,
  CircleDot,
} from "lucide-react";
import { MediaType } from "@/types";

const mediaIcon: Record<MediaType, typeof FileVideo> = {
  video: FileVideo,
  image: FileImage,
  audio: FileAudio,
};

export default function CaseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const c = forensicCases.find((c) => c.id === id);
  const result = getAnalysisForCase(id);
  const notes = caseNotes[id] ?? [];
  const timeline = caseTimelineEvents[id] ?? [];
  const [noteDraft, setNoteDraft] = useState("");
  const [localNotes, setLocalNotes] = useState(notes);

  if (!c || !result) notFound();

  const Icon = mediaIcon[c.mediaType];

  return (
    <div className="space-y-6">
      <div>
        <Link href="/cases" className="mb-2 flex items-center gap-1 text-[12.5px] text-text-muted hover:text-accent-2">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to cases
        </Link>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="font-display text-[22px] font-semibold text-text">{c.title}</h1>
              <RiskBadge risk={c.risk} />
            </div>
            <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[13px] text-text-muted">
              <span className="font-mono text-text-dim">{c.id}</span>
              <span className="text-border">•</span>
              <span className="flex items-center gap-1.5">
                <Icon className="h-3.5 w-3.5" /> {c.mediaFile}
              </span>
              <span className="text-border">•</span>
              <span>Investigator: {c.investigator}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href={`/analysis/${id}`}>
              <Button variant="secondary" icon={<ScanSearch className="h-4 w-4" />}>
                View Analysis
              </Button>
            </Link>
            <Link href={`/reports/${id}`}>
              <Button variant="primary" icon={<FileText className="h-4 w-4" />}>
                Generate Report
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="evidence">Evidence</TabsTrigger>
          <TabsTrigger value="timeline">Investigation Timeline</TabsTrigger>
          <TabsTrigger value="findings">AI Findings</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-5">
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            <Card className="xl:col-span-2">
              <CardHeader title="Case Overview" />
              <CardBody className="space-y-4">
                <p className="text-[13.5px] leading-relaxed text-text-muted">{c.description}</p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <InfoStat label="Status" value={c.status} />
                  <InfoStat label="Confidence" value={`${c.confidence}%`} />
                  <InfoStat label="Evidence Items" value={String(c.evidenceCount)} />
                  <InfoStat label="Created" value={formatRelativeTime(c.createdAt)} />
                  <InfoStat label="Last Updated" value={formatRelativeTime(c.updatedAt)} />
                  <InfoStat label="Media Type" value={c.mediaType} />
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardHeader title="Suspect Media" />
              <CardBody>
                <div className="flex aspect-video items-center justify-center rounded-lg border border-border-soft bg-gradient-to-br from-[#151B23] to-[#0D1117]">
                  <Icon className="h-9 w-9 text-text-dim" strokeWidth={1.4} />
                </div>
                <div className="mt-3 truncate font-mono text-[12px] text-text-muted">{c.mediaFile}</div>
              </CardBody>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="evidence" className="mt-5">
          <Card>
            <CardHeader title="Forensic Evidence" subtitle="Findings from automated detection pipeline" />
            <CardBody>
              <EvidenceCards evidence={result.evidence} />
            </CardBody>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="mt-5">
          <Card>
            <CardHeader title="Investigation Timeline" />
            <CardBody>
              {timeline.length === 0 ? (
                <p className="text-[13px] text-text-dim">No timeline events recorded yet for this case.</p>
              ) : (
                <div className="space-y-0">
                  {timeline.map((e, i) => (
                    <div key={e.id} className="flex gap-3 pb-5 last:pb-0">
                      <div className="flex flex-col items-center">
                        <CircleDot className="h-4 w-4 text-accent-2" />
                        {i < timeline.length - 1 && <span className="mt-1 w-px flex-1 bg-border-soft" />}
                      </div>
                      <div>
                        <div className="text-[13.5px] font-medium text-text">{e.label}</div>
                        <p className="mt-0.5 text-[12.5px] text-text-muted">{e.description}</p>
                        <div className="mt-1 text-[11.5px] text-text-dim">
                          {e.actor} · {formatRelativeTime(e.timestamp)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardBody>
          </Card>
        </TabsContent>

        <TabsContent value="findings" className="mt-5">
          <Card>
            <CardHeader title="AI Investigation Summary" />
            <CardBody>
              <p className="text-[13.5px] leading-relaxed text-text">{result.summary}</p>
            </CardBody>
          </Card>
        </TabsContent>

        <TabsContent value="notes" className="mt-5">
          <Card>
            <CardHeader title="Investigator Notes" />
            <CardBody className="space-y-4">
              <div className="flex gap-2">
                <input
                  value={noteDraft}
                  onChange={(e) => setNoteDraft(e.target.value)}
                  placeholder="Add a note for this case…"
                  className="flex-1 rounded-lg border border-border bg-surface px-3 py-2 text-[13px] text-text placeholder:text-text-dim focus:border-accent/50 focus:outline-none"
                />
                <Button
                  variant="primary"
                  icon={<Send className="h-3.5 w-3.5" />}
                  disabled={!noteDraft.trim()}
                  onClick={() => {
                    if (!noteDraft.trim()) return;
                    setLocalNotes((n) => [
                      ...n,
                      {
                        id: `local-${Date.now()}`,
                        author: currentInvestigator.name,
                        timestamp: new Date().toISOString(),
                        content: noteDraft.trim(),
                      },
                    ]);
                    setNoteDraft("");
                  }}
                >
                  Add
                </Button>
              </div>
              <div className="space-y-3">
                {localNotes.length === 0 && (
                  <p className="text-[13px] text-text-dim">No notes yet. Be the first to add one.</p>
                )}
                {localNotes
                  .slice()
                  .reverse()
                  .map((n) => (
                    <div key={n.id} className="rounded-lg border border-border-soft bg-surface-2/40 px-4 py-3">
                      <div className="flex items-center justify-between text-[11.5px] text-text-dim">
                        <span className="font-medium text-text-muted">{n.author}</span>
                        <span>{formatRelativeTime(n.timestamp)}</span>
                      </div>
                      <p className="mt-1.5 text-[13px] text-text">{n.content}</p>
                    </div>
                  ))}
              </div>
            </CardBody>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function InfoStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border-soft bg-surface-2/40 px-3 py-2.5">
      <div className="text-[10.5px] uppercase tracking-wide text-text-dim">{label}</div>
      <div className="mt-0.5 text-[13px] font-medium capitalize text-text">{value}</div>
    </div>
  );
}
