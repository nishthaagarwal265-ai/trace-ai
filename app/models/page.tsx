import { detectionModels } from "@/data/mock-data";
import { Card, CardHeader, CardBody } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cpu, Info } from "lucide-react";

const statusColor: Record<string, string> = {
  online: "text-safe",
  degraded: "text-[#FFB27A]",
  offline: "text-[#FF8A83]",
};

export default function ModelsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-[22px] font-semibold text-text">Detection Models</h1>
        <p className="mt-1 text-[13.5px] text-text-muted">
          Engines powering the AI detection pipeline. These are detection engines, not models developed by TRACE-AI.
        </p>
      </div>

      <div className="flex items-start gap-2.5 rounded-lg border border-[#1E3A5C] bg-accent-soft px-4 py-3 text-[12.5px] text-text-muted">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent-2" />
        TRACE-AI orchestrates third-party and integrated detection engines. Model versions and accuracy shown here are
        illustrative mock values pending live benchmarking integration.
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {detectionModels.map((m) => (
          <Card key={m.id}>
            <CardHeader
              title={
                <span className="flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-accent-2" />
                  {m.name}
                </span>
              }
              subtitle={m.type}
              action={
                <span className={`flex items-center gap-1.5 text-[11px] font-mono ${statusColor[m.status]}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${m.status === "online" ? "bg-safe pulse-dot" : m.status === "degraded" ? "bg-[#FFB27A]" : "bg-[#FF8A83]"}`} />
                  {m.status.toUpperCase()}
                </span>
              }
            />
            <CardBody className="space-y-3">
              <div className="flex items-center justify-between text-[12.5px]">
                <span className="text-text-muted">Accuracy / AUC</span>
                <span className="font-mono text-[16px] font-semibold text-text">{m.accuracy}%</span>
              </div>
              <div className="flex items-center justify-between text-[12.5px]">
                <span className="text-text-muted">Version</span>
                <span className="font-mono text-text">{m.version}</span>
              </div>
              <div className="flex items-center justify-between text-[12.5px]">
                <span className="text-text-muted">Last Updated</span>
                <span className="text-text">{m.lastUpdated}</span>
              </div>
              <Badge variant="muted" className="mt-1">{m.provider}</Badge>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
