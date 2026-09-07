export type RiskLevel = "critical" | "high" | "medium" | "low";

export type MediaType = "video" | "image" | "audio";

export type CaseStatus = "investigating" | "completed" | "pending" | "closed";

export interface ForensicCase {
  id: string; // e.g. DF-2026-0182
  title: string;
  mediaFile: string;
  mediaType: MediaType;
  investigator: string;
  risk: RiskLevel;
  confidence: number; // 0-100
  status: CaseStatus;
  evidenceCount: number;
  createdAt: string; // ISO
  updatedAt: string; // ISO
  thumbnail?: string;
  description?: string;
}

export interface ThreatActivity {
  id: string;
  caseId: string;
  risk: RiskLevel;
  title: string;
  timestamp: string; // ISO
}

export interface DetectorResult {
  id: string;
  name: string;
  type: string;
  score: number; // 0-100
  flagged: boolean;
}

export interface ForensicEvidenceItem {
  id: string;
  finding: string;
  status: "Detected" | "Possible" | "Not Detected";
  confidence: number;
  timestamp?: string;
  explanation: string;
  severity: RiskLevel;
}

export interface SuspiciousFrame {
  id: string;
  frameNumber: number;
  timestamp: string;
  probability: number;
  thumbnail?: string;
}

export interface TimelineSegment {
  startSec: number;
  endSec: number;
  risk: RiskLevel;
  label: string;
}

export interface MediaMetadata {
  filename: string;
  fileType: string;
  fileSize: string;
  createdDate: string;
  modifiedDate: string;
  codec?: string;
  resolution?: string;
  frameRate?: string;
  duration?: string;
  encoder: string;
  sha256: string;
  suspiciousFields: string[];
}

export interface AnalysisResult {
  caseId: string;
  mediaFile: string;
  mediaType: MediaType;
  overallRisk: RiskLevel;
  confidence: number;
  aiDetectionScore: number;
  forensicEvidenceScore: number;
  metadataRiskScore: number;
  avConsistencyScore: number;
  detectors: DetectorResult[];
  evidence: ForensicEvidenceItem[];
  frames: SuspiciousFrame[];
  timelineSegments: TimelineSegment[];
  metadata: MediaMetadata;
  summary: string;
  whyThisMatters: string;
  recommendedActions: string[];
  duration?: number; // seconds, for video/audio
}

export interface DetectionModel {
  id: string;
  name: string;
  type: string;
  version: string;
  status: "online" | "offline" | "degraded";
  accuracy: number; // AUC / accuracy percentage
  lastUpdated: string;
  provider: string;
}

export interface SystemService {
  name: string;
  status: "online" | "offline" | "degraded";
}

export interface CaseNote {
  id: string;
  author: string;
  timestamp: string;
  content: string;
}

export interface CaseTimelineEvent {
  id: string;
  label: string;
  description: string;
  timestamp: string;
  actor: string;
}
