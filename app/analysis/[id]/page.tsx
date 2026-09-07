import { getAnalysisForCase } from "@/lib/analysis";
import { forensicCases } from "@/data/mock-data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardHeader, CardBody } from "@/components/ui/card";
import { RiskGauge } from "@/components/analysis/risk-gauge";
import { ScoreBreakdown } from "@/components/analysis/score-breakdown";
import { DetectorConsensus } from "@/components/analysis/detector-consensus";
import { FrameTimeline } from "@/components/analysis/frame-timeline";
import { FrameGrid } from "@/components/analysis/frame-grid";
import { EvidenceCards } from "@/components/analysis/evidence-cards";
import { MetadataPanel } from "@/components/analysis/metadata-panel";
import { EvidenceIntegrity } from "@/components/analysis/evidence-integrity";
import { AiSummary } from "@/components/analysis/ai-summary";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, FileText, FlaskConical } from "lucide-react";

export default async function AnalysisResultPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const result = getAnalysisForCase(id);
  const c = forensicCases.find((c) => c.id === id);
  if (!result || !c) notFound();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link href={`/cases/${id}`} className="mb-2 flex items-center gap-1 text-[12.5px] text-text-muted hover:text-accent-2">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to case {id}
          </Link>
          <h1 className="font-display text-[22px] font-semibold text-text">Analysis Result</h1>
          <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[13px] text-text-muted">
            <span className="font-mono text-text-dim">Case ID: <span className="text-text">{id}</span></span>
            <span className="text-border">•</span>
            <span>Media: <span className="font-mono text-text">{result.mediaFile}</span></span>
          </div>
        </div>
        <Link href={`/reports/${id}`}>
          <Button variant="primary" icon={<FileText className="h-4 w-4" />}>
            Generate Report
          </Button>
        </Link>
      </div>

      <Badge variant="muted" className="inline-flex items-center gap-1.5">
        <FlaskConical className="h-3 w-3" />
        Mock analysis results — architecture is API-ready for live detection engines
      </Badge>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-5">
        <Card className="flex flex-col items-center justify-center xl:col-span-2" scan>
          <CardBody className="flex w-full flex-col items-center py-8">
            <RiskGauge confidence={result.confidence} risk={result.overallRisk} />
          </CardBody>
        </Card>
        <Card className="xl:col-span-3">
          <CardHeader title="Score Breakdown" subtitle="Composite signals contributing to overall risk" />
          <CardBody>
            <ScoreBreakdown result={result} />
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader title="Detector Consensus" subtitle="Cross-model agreement on manipulation indicators" />
        <CardBody>
          <DetectorConsensus detectors={result.detectors} />
        </CardBody>
      </Card>

      {result.mediaType === "video" && (
        <Card>
          <CardHeader title="Suspicious Frame Timeline" subtitle="Click a segment to inspect the finding" />
          <CardBody>
            <FrameTimeline segments={result.timelineSegments} duration={result.duration ?? 30} />
          </CardBody>
        </Card>
      )}

      <Card>
        <CardHeader title="Forensic Evidence" subtitle="Individually scored manipulation indicators" />
        <CardBody>
          <EvidenceCards evidence={result.evidence} />
        </CardBody>
      </Card>

      <AiSummary
        summary={result.summary}
        whyThisMatters={result.whyThisMatters}
        recommendedActions={result.recommendedActions}
      />

      {result.mediaType === "video" && (
        <Card>
          <CardHeader title="Frame Forensics" subtitle="Frames flagged with highest manipulation probability" />
          <CardBody>
            <FrameGrid frames={result.frames} />
          </CardBody>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-5">
        <Card className="xl:col-span-3">
          <CardHeader title="Metadata Analysis" subtitle="Technical file properties and integrity flags" />
          <CardBody>
            <MetadataPanel metadata={result.metadata} />
          </CardBody>
        </Card>
        <div className="xl:col-span-2">
          <EvidenceIntegrity hash={result.metadata.sha256} />
        </div>
      </div>
    </div>
  );
}
