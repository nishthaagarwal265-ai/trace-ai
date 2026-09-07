"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardBody } from "@/components/ui/card";
import { UploadDropzone, StagedFile } from "@/components/analysis/upload-dropzone";
import { AnalysisProgress } from "@/components/analysis/analysis-progress";
import { Button } from "@/components/ui/button";
import { ScanSearch } from "lucide-react";

type Stage = "idle" | "staged" | "analyzing";

export default function AnalyzeMediaPage() {
  const router = useRouter();
  const [stage, setStage] = useState<Stage>("idle");
  const [staged, setStaged] = useState<StagedFile | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-[22px] font-semibold text-text">Analyze Media</h1>
        <p className="mt-1 text-[13.5px] text-text-muted">
          Submit suspicious media for AI-powered deepfake detection and forensic analysis.
        </p>
      </div>

      <Card>
        <CardHeader
          title="Media Upload"
          subtitle="File hash and metadata are captured immediately for evidence integrity"
        />
        <CardBody>
          {stage !== "analyzing" && (
            <UploadDropzone
              onStaged={(f) => {
                setStaged(f);
                setStage("staged");
              }}
            />
          )}

          {stage === "analyzing" && (
            <AnalysisProgress onComplete={() => router.push("/analysis/DF-2026-0182")} />
          )}

          {stage === "staged" && staged && (
            <div className="mt-5 flex justify-end">
              <Button variant="primary" size="lg" icon={<ScanSearch className="h-4 w-4" />} onClick={() => setStage("analyzing")}>
                Run Forensic Analysis
              </Button>
            </div>
          )}
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="What happens during analysis" />
        <CardBody>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <PipelineNote
              title="Detection"
              body="Multiple AI models independently score the media for manipulation indicators."
            />
            <PipelineNote
              title="Forensic Evidence"
              body="Frame, metadata, and compression analysis surfaces concrete findings, not just a verdict."
            />
            <PipelineNote
              title="Explainability"
              body="Findings are translated into plain-language investigator guidance, never framed as certainty."
            />
            <PipelineNote
              title="Risk Assessment"
              body="Composite scoring across detection, forensics, metadata, and A/V consistency."
            />
            <PipelineNote
              title="Investigation Workflow"
              body="Results attach directly to a case file with chain-of-custody preserved."
            />
            <PipelineNote
              title="Reporting"
              body="Generate a structured forensic report ready for review or export."
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

function PipelineNote({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-lg border border-border-soft bg-surface-2/30 p-4">
      <div className="text-[13px] font-semibold text-text">{title}</div>
      <p className="mt-1 text-[12px] leading-relaxed text-text-dim">{body}</p>
    </div>
  );
}
