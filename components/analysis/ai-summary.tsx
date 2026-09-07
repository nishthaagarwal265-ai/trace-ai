import { Card, CardHeader, CardBody } from "@/components/ui/card";
import { Brain, ListChecks, TriangleAlert } from "lucide-react";

export function AiSummary({
  summary,
  whyThisMatters,
  recommendedActions,
}: {
  summary: string;
  whyThisMatters: string;
  recommendedActions: string[];
}) {
  return (
    <Card className="border-accent/25">
      <CardHeader
        title={
          <span className="flex items-center gap-2">
            <Brain className="h-4 w-4 text-accent-2" />
            AI Investigation Summary
          </span>
        }
        subtitle="Generated from detector, forensic, and metadata analysis — always requires investigator confirmation"
      />
      <CardBody className="space-y-5">
        <p className="text-[13.5px] leading-relaxed text-text">{summary}</p>

        <div className="rounded-lg border border-[#4A2E15] bg-high-soft px-4 py-3">
          <div className="mb-1 flex items-center gap-2 text-[12.5px] font-semibold text-[#FFB27A]">
            <TriangleAlert className="h-4 w-4" />
            Why this matters
          </div>
          <p className="text-[13px] leading-relaxed text-text-muted">{whyThisMatters}</p>
        </div>

        <div>
          <div className="mb-2 flex items-center gap-2 text-[12.5px] font-semibold text-text">
            <ListChecks className="h-4 w-4 text-accent-2" />
            Recommended investigator actions
          </div>
          <ul className="space-y-1.5">
            {recommendedActions.map((a, i) => (
              <li key={i} className="flex items-start gap-2 text-[13px] text-text-muted">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-2" />
                {a}
              </li>
            ))}
          </ul>
        </div>
      </CardBody>
    </Card>
  );
}
