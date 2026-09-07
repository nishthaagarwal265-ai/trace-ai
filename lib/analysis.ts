import { analysisResults, forensicCases, detectionModels } from "@/data/mock-data";
import { AnalysisResult, RiskLevel, DetectorResult, ForensicEvidenceItem, SuspiciousFrame, TimelineSegment } from "@/types";

const riskExplanations: Record<RiskLevel, string> = {
  critical:
    "shows strong, multi-model indicators consistent with digital manipulation. Investigators should treat this media as likely altered pending expert confirmation.",
  high: "shows several indicators that potentially point to manipulation. Manual review is recommended before drawing conclusions.",
  medium:
    "shows some inconsistencies that may indicate manipulation, though they could also result from routine re-encoding or transmission artifacts.",
  low: "does not show meaningful indicators of manipulation. Automated checks are consistent with an unaltered source, though this does not constitute definitive proof of authenticity.",
};

function seededRandom(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return () => {
    h = (h * 1664525 + 1013904223) >>> 0;
    return h / 4294967296;
  };
}

export function getAnalysisForCase(caseId: string): AnalysisResult | null {
  if (analysisResults[caseId]) return analysisResults[caseId];

  const c = forensicCases.find((c) => c.id === caseId);
  if (!c) return null;

  const rand = seededRandom(caseId);
  const base = c.confidence;

  const detectors: DetectorResult[] = detectionModels.slice(0, 4).map((m) => {
    const score = Math.max(5, Math.min(99, Math.round(base + (rand() - 0.5) * 14)));
    return { id: m.id, name: m.name, type: m.type, score, flagged: score >= 55 };
  });

  const evidence: ForensicEvidenceItem[] = [
    {
      id: "e1",
      finding: c.mediaType === "audio" ? "Synthetic voice pattern" : "Face manipulation",
      status: base >= 70 ? "Detected" : base >= 45 ? "Possible" : "Not Detected",
      confidence: Math.round(base + (rand() - 0.5) * 10),
      timestamp: c.mediaType === "image" ? "N/A" : "00:04 – 00:09",
      explanation:
        base >= 70
          ? "Localized artifacts identified that are consistent with synthetic generation or reenactment."
          : "No strong localized artifacts identified in the regions typically affected by synthesis.",
      severity: c.risk,
    },
    {
      id: "e2",
      finding: "Metadata anomaly",
      status: base >= 55 ? "Detected" : "Not Detected",
      confidence: Math.round(Math.max(10, base - 15 + (rand() - 0.5) * 10)),
      timestamp: "Container header",
      explanation:
        base >= 55
          ? "Encoder metadata is inconsistent with the claimed capture device or source."
          : "Metadata fields are consistent with the claimed capture device.",
      severity: "medium",
    },
    {
      id: "e3",
      finding: "Compression anomaly",
      status: base >= 60 ? "Detected" : "Not Detected",
      confidence: Math.round(Math.max(10, base - 8 + (rand() - 0.5) * 10)),
      timestamp: "Global",
      explanation:
        base >= 60
          ? "Signature consistent with re-encoding after initial capture was identified."
          : "No signature of re-encoding beyond expected platform compression.",
      severity: "low",
    },
  ];

  const frames: SuspiciousFrame[] = c.mediaType === "video"
    ? Array.from({ length: 4 }).map((_, i) => ({
        id: `f${i}`,
        frameNumber: 200 + i * 45,
        timestamp: `00:0${i + 3}`,
        probability: Math.max(10, Math.min(99, Math.round(base + (rand() - 0.5) * 12))),
      }))
    : [];

  const timelineSegments: TimelineSegment[] = c.mediaType === "video"
    ? [
        { startSec: 0, endSec: 6, risk: "low", label: "No anomalies detected" },
        { startSec: 6, endSec: 12, risk: c.risk, label: "Elevated manipulation probability" },
        { startSec: 12, endSec: 18, risk: "low", label: "No anomalies detected" },
      ]
    : [];

  return {
    caseId: c.id,
    mediaFile: c.mediaFile,
    mediaType: c.mediaType,
    overallRisk: c.risk,
    confidence: c.confidence,
    aiDetectionScore: c.confidence,
    forensicEvidenceScore: Math.max(5, Math.round(c.confidence - 5 + (rand() - 0.5) * 8)),
    metadataRiskScore: Math.max(5, Math.round(c.confidence - 20 + (rand() - 0.5) * 12)),
    avConsistencyScore: Math.max(5, Math.round(c.confidence - 10 + (rand() - 0.5) * 10)),
    duration: c.mediaType === "video" ? 18 : undefined,
    detectors,
    evidence,
    frames,
    timelineSegments,
    metadata: {
      filename: c.mediaFile,
      fileType: c.mediaType === "video" ? "video/mp4" : c.mediaType === "audio" ? "audio/wav" : "image/jpeg",
      fileSize: `${(8 + rand() * 40).toFixed(1)} MB`,
      createdDate: new Date(c.createdAt).toLocaleString(),
      modifiedDate: new Date(c.updatedAt).toLocaleString(),
      codec: c.mediaType === "video" ? "H.264" : undefined,
      resolution: c.mediaType !== "audio" ? "1920x1080" : undefined,
      frameRate: c.mediaType === "video" ? "29.97 fps" : undefined,
      duration: c.mediaType !== "image" ? "00:00:18" : undefined,
      encoder: base >= 55 ? "Adobe Premiere Pro 2026" : "Native Device Encoder",
      sha256: `${caseId.replace(/[^a-z0-9]/gi, "").toLowerCase()}${"a1b2c3d4e5f6".repeat(4)}`.slice(0, 64),
      suspiciousFields: base >= 55 ? ["encoder"] : [],
    },
    summary: `The analyzed media ${riskExplanations[c.risk]}`,
    whyThisMatters:
      "This media may be used as supporting evidence or shared publicly. If manipulated, it could mislead investigators, the public, or legal proceedings relying on its authenticity.",
    recommendedActions: [
      "Cross-check findings with a senior forensic examiner",
      "Request original source file where possible",
      "Preserve chain-of-custody documentation",
      base >= 55 ? "Do not publish or distribute pending verification" : "Proceed with standard verification checklist",
    ],
  };
}
