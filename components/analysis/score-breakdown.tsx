import { Progress } from "@/components/ui/progress";
import { AnalysisResult } from "@/types";

export function ScoreBreakdown({ result }: { result: AnalysisResult }) {
  const rows = [
    { label: "AI Detection", value: result.aiDetectionScore },
    { label: "Forensic Evidence", value: result.forensicEvidenceScore },
    { label: "Metadata Risk", value: result.metadataRiskScore },
    { label: "Audio-Visual Consistency", value: result.avConsistencyScore },
  ];
  return (
    <div className="space-y-4">
      {rows.map((r) => (
        <div key={r.label}>
          <div className="mb-1.5 flex items-center justify-between text-[12.5px]">
            <span className="text-text-muted">{r.label}</span>
            <span className="font-mono text-text">{r.value}%</span>
          </div>
          <Progress value={r.value} colorByValue />
        </div>
      ))}
    </div>
  );
}
