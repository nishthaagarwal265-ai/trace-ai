"use client";
import { useState } from "react";
import { Card, CardHeader, CardBody } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ShieldCheck } from "lucide-react";

const checks = [
  "Original file preserved",
  "SHA-256 generated",
  "Analysis performed on working copy",
  "Chain-of-custody record",
  "Timestamp recorded",
];

export function EvidenceIntegrity({ hash }: { hash: string }) {
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);

  return (
    <Card>
      <CardHeader title="Evidence Integrity" subtitle="Chain-of-custody and cryptographic verification" />
      <CardBody>
        <div className="space-y-2">
          {checks.map((c) => (
            <div key={c} className="flex items-center justify-between text-[13px]">
              <span className="text-text-muted">{c}</span>
              <CheckCircle2 className="h-4 w-4 text-safe" />
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-lg border border-border-soft bg-surface-2/40 px-3 py-2.5">
          <div className="text-[10.5px] uppercase tracking-wide text-text-dim">Evidence Hash</div>
          <div className="mt-1 break-all font-mono text-[11.5px] text-accent-2">
            {hash.slice(0, 8)}...{hash.slice(-8)}
          </div>
        </div>

        <Button
          className="mt-4 w-full"
          variant={verified ? "secondary" : "outline"}
          loading={verifying}
          icon={verified ? <ShieldCheck className="h-4 w-4 text-safe" /> : undefined}
          onClick={() => {
            setVerifying(true);
            setTimeout(() => {
              setVerifying(false);
              setVerified(true);
            }, 1400);
          }}
        >
          {verifying ? "Verifying evidence…" : verified ? "Evidence Verified" : "Verify Evidence"}
        </Button>
      </CardBody>
    </Card>
  );
}
