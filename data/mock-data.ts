import {
  ForensicCase,
  ThreatActivity,
  DetectionModel,
  SystemService,
  CaseNote,
  CaseTimelineEvent,
  AnalysisResult,
} from "@/types";

export const systemServices: SystemService[] = [
  { name: "AI Detection Engine", status: "online" },
  { name: "Forensic Analysis Engine", status: "online" },
  { name: "Metadata Engine", status: "online" },
  { name: "Evidence Storage", status: "online" },
  { name: "Report Engine", status: "online" },
];

export const dashboardStats = {
  totalCases: { value: 128, trend: 8.2, up: true },
  analyzedMedia: { value: 1842, trend: 12.4, up: true },
  highRiskFindings: { value: 47, trend: 4.1, up: true },
  pendingInvestigations: { value: 13, trend: 2.3, up: false },
};

export const riskBreakdown = [
  { name: "Low", value: 612, risk: "low" as const },
  { name: "Medium", value: 481, risk: "medium" as const },
  { name: "High", value: 302, risk: "high" as const },
  { name: "Critical", value: 96, risk: "critical" as const },
];

export const threatActivity: ThreatActivity[] = [
  {
    id: "t1",
    caseId: "DF-2026-0182",
    risk: "high",
    title: "Suspicious video detected",
    timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
  },
  {
    id: "t2",
    caseId: "DF-2026-0180",
    risk: "critical",
    title: "Possible synthetic identity",
    timestamp: new Date(Date.now() - 18 * 60 * 1000).toISOString(),
  },
  {
    id: "t3",
    caseId: "DF-2026-0179",
    risk: "medium",
    title: "Metadata inconsistency",
    timestamp: new Date(Date.now() - 42 * 60 * 1000).toISOString(),
  },
  {
    id: "t4",
    caseId: "DF-2026-0177",
    risk: "low",
    title: "Voice sample cleared review",
    timestamp: new Date(Date.now() - 71 * 60 * 1000).toISOString(),
  },
  {
    id: "t5",
    caseId: "DF-2026-0175",
    risk: "high",
    title: "Face-swap indicators found",
    timestamp: new Date(Date.now() - 130 * 60 * 1000).toISOString(),
  },
];

export const forensicCases: ForensicCase[] = [
  {
    id: "DF-2026-0182",
    title: "Interview footage authenticity review",
    mediaFile: "Interview_01.mp4",
    mediaType: "video",
    investigator: "A. Sharma",
    risk: "critical",
    confidence: 94.2,
    status: "investigating",
    evidenceCount: 6,
    createdAt: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
    description: "Submitted broadcast interview clip flagged by newsroom verification team.",
  },
  {
    id: "DF-2026-0181",
    title: "Profile image identity check",
    mediaFile: "profile_image.jpg",
    mediaType: "image",
    investigator: "R. Verma",
    risk: "high",
    confidence: 87.6,
    status: "completed",
    evidenceCount: 4,
    createdAt: new Date(Date.now() - 28 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
    description: "Dating profile image reported as suspected synthetic persona.",
  },
  {
    id: "DF-2026-0180",
    title: "Synthetic identity investigation",
    mediaFile: "kyc_submission_04.jpg",
    mediaType: "image",
    investigator: "A. Sharma",
    risk: "critical",
    confidence: 96.8,
    status: "investigating",
    evidenceCount: 7,
    createdAt: new Date(Date.now() - 18 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 18 * 60 * 1000).toISOString(),
    description: "KYC onboarding photo flagged by liveness detection pipeline.",
  },
  {
    id: "DF-2026-0179",
    title: "Metadata inconsistency review",
    mediaFile: "statement_clip.mp4",
    mediaType: "video",
    investigator: "P. Iyer",
    risk: "medium",
    confidence: 62.4,
    status: "pending",
    evidenceCount: 3,
    createdAt: new Date(Date.now() - 42 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 42 * 60 * 1000).toISOString(),
    description: "Encoder metadata does not match claimed capture device.",
  },
  {
    id: "DF-2026-0178",
    title: "Voice sample verification",
    mediaFile: "voicemail_evidence.wav",
    mediaType: "audio",
    investigator: "R. Verma",
    risk: "low",
    confidence: 21.3,
    status: "completed",
    evidenceCount: 2,
    createdAt: new Date(Date.now() - 65 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    description: "Voicemail submitted as evidence in fraud case, cleared on review.",
  },
  {
    id: "DF-2026-0177",
    title: "Call recording authenticity",
    mediaFile: "call_recording_09.mp3",
    mediaType: "audio",
    investigator: "P. Iyer",
    risk: "low",
    confidence: 18.9,
    status: "closed",
    evidenceCount: 1,
    createdAt: new Date(Date.now() - 71 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 55 * 60 * 1000).toISOString(),
    description: "Customer support call recording, no manipulation indicators found.",
  },
  {
    id: "DF-2026-0176",
    title: "Social media clip verification",
    mediaFile: "reel_export.mp4",
    mediaType: "video",
    investigator: "A. Sharma",
    risk: "medium",
    confidence: 58.1,
    status: "investigating",
    evidenceCount: 3,
    createdAt: new Date(Date.now() - 95 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 80 * 60 * 1000).toISOString(),
    description: "Viral clip reported by platform trust & safety team.",
  },
  {
    id: "DF-2026-0175",
    title: "Executive impersonation clip",
    mediaFile: "boardroom_clip.mov",
    mediaType: "video",
    investigator: "R. Verma",
    risk: "high",
    confidence: 89.4,
    status: "investigating",
    evidenceCount: 5,
    createdAt: new Date(Date.now() - 130 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 110 * 60 * 1000).toISOString(),
    description: "Internal video circulated showing exec making disputed statements.",
  },
  {
    id: "DF-2026-0174",
    title: "Passport photo verification",
    mediaFile: "passport_scan_11.png",
    mediaType: "image",
    investigator: "P. Iyer",
    risk: "low",
    confidence: 12.5,
    status: "closed",
    evidenceCount: 1,
    createdAt: new Date(Date.now() - 200 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 180 * 60 * 1000).toISOString(),
    description: "Standard onboarding scan, passed all integrity checks.",
  },
  {
    id: "DF-2026-0173",
    title: "Hostage-style video analysis",
    mediaFile: "field_upload_02.mp4",
    mediaType: "video",
    investigator: "A. Sharma",
    risk: "critical",
    confidence: 91.7,
    status: "investigating",
    evidenceCount: 8,
    createdAt: new Date(Date.now() - 260 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 240 * 60 * 1000).toISOString(),
    description: "Field-submitted footage flagged for urgent forensic triage.",
  },
];

export const caseNotes: Record<string, CaseNote[]> = {
  "DF-2026-0182": [
    {
      id: "n1",
      author: "A. Sharma",
      timestamp: new Date(Date.now() - 9 * 60 * 1000).toISOString(),
      content:
        "Cross-checked source claim with the broadcaster. Original camera file was not made available for comparison.",
    },
    {
      id: "n2",
      author: "R. Verma",
      timestamp: new Date(Date.now() - 4 * 60 * 1000).toISOString(),
      content:
        "Detector consensus is strong (4/4). Recommend escalating to senior review before external disclosure.",
    },
  ],
};

export const caseTimelineEvents: Record<string, CaseTimelineEvent[]> = {
  "DF-2026-0182": [
    {
      id: "e1",
      label: "Case opened",
      description: "Media submitted for forensic review.",
      timestamp: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
      actor: "A. Sharma",
    },
    {
      id: "e2",
      label: "Media analysis started",
      description: "Automated AI + forensic pipeline initiated.",
      timestamp: new Date(Date.now() - 11 * 60 * 1000).toISOString(),
      actor: "System",
    },
    {
      id: "e3",
      label: "Detector consensus reached",
      description: "4 of 4 detection models flagged manipulation indicators.",
      timestamp: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
      actor: "System",
    },
    {
      id: "e4",
      label: "Investigator review",
      description: "Manual review of frame-level evidence in progress.",
      timestamp: new Date(Date.now() - 4 * 60 * 1000).toISOString(),
      actor: "R. Verma",
    },
  ],
};

export const detectionModels: DetectionModel[] = [
  {
    id: "m1",
    name: "Xception",
    type: "Image / Frame Classifier",
    version: "v3.2.1",
    status: "online",
    accuracy: 96.1,
    lastUpdated: "2026-07-28",
    provider: "Third-party research model",
  },
  {
    id: "m2",
    name: "EfficientNet-B4",
    type: "Image / Frame Classifier",
    version: "v2.9.0",
    status: "online",
    accuracy: 94.7,
    lastUpdated: "2026-07-15",
    provider: "Third-party research model",
  },
  {
    id: "m3",
    name: "Video Temporal Model",
    type: "Temporal Consistency",
    version: "v1.6.3",
    status: "online",
    accuracy: 92.8,
    lastUpdated: "2026-08-01",
    provider: "Integrated detection engine",
  },
  {
    id: "m4",
    name: "Frequency Detector",
    type: "Frequency-Domain Analysis",
    version: "v2.1.0",
    status: "online",
    accuracy: 91.3,
    lastUpdated: "2026-07-22",
    provider: "Integrated detection engine",
  },
  {
    id: "m5",
    name: "Audio Spectral Model",
    type: "Audio Synthesis Detection",
    version: "v1.2.4",
    status: "online",
    accuracy: 89.6,
    lastUpdated: "2026-06-30",
    provider: "Third-party research model",
  },
  {
    id: "m6",
    name: "Lip-Sync Consistency Model",
    type: "Audio-Visual Consistency",
    version: "v1.0.9",
    status: "degraded",
    accuracy: 85.2,
    lastUpdated: "2026-05-19",
    provider: "Integrated detection engine",
  },
];

export const analysisResults: Record<string, AnalysisResult> = {
  "DF-2026-0182": {
    caseId: "DF-2026-0182",
    mediaFile: "Interview_01.mp4",
    mediaType: "video",
    overallRisk: "critical",
    confidence: 94.2,
    aiDetectionScore: 94.2,
    forensicEvidenceScore: 89.7,
    metadataRiskScore: 62.4,
    avConsistencyScore: 81.3,
    duration: 34,
    detectors: [
      { id: "d1", name: "Xception", type: "Frame Classifier", score: 92, flagged: true },
      { id: "d2", name: "EfficientNet-B4", type: "Frame Classifier", score: 89, flagged: true },
      { id: "d3", name: "Video Temporal Model", type: "Temporal Consistency", score: 96, flagged: true },
      { id: "d4", name: "Frequency Detector", type: "Frequency Analysis", score: 91, flagged: true },
    ],
    evidence: [
      {
        id: "ev1",
        finding: "Face manipulation",
        status: "Detected",
        confidence: 93,
        timestamp: "00:17 – 00:21",
        explanation:
          "Localized blending artifacts around the jawline and eye region are consistent with face-swap or reenactment synthesis.",
        severity: "critical",
      },
      {
        id: "ev2",
        finding: "Temporal inconsistency",
        status: "Detected",
        confidence: 91,
        timestamp: "Frames 510–630",
        explanation:
          "Frame-to-frame motion vectors show discontinuities that do not match natural head movement.",
        severity: "high",
      },
      {
        id: "ev3",
        finding: "Metadata anomaly",
        status: "Detected",
        confidence: 76,
        timestamp: "Container header",
        explanation:
          "Encoder tag references editing software inconsistent with the claimed original-source recording device.",
        severity: "medium",
      },
      {
        id: "ev4",
        finding: "Audio/video mismatch",
        status: "Possible",
        confidence: 68,
        timestamp: "00:14 – 00:19",
        explanation:
          "Minor lip-sync drift detected; could indicate resynthesis or could be attributable to compression artifacts.",
        severity: "medium",
      },
      {
        id: "ev5",
        finding: "Compression anomaly",
        status: "Detected",
        confidence: 82,
        timestamp: "Global",
        explanation:
          "Double-compression signature detected, indicating the file was re-encoded after initial capture.",
        severity: "high",
      },
    ],
    frames: [
      { id: "f1", frameNumber: 510, timestamp: "00:17", probability: 93 },
      { id: "f2", frameNumber: 545, timestamp: "00:18", probability: 96 },
      { id: "f3", frameNumber: 601, timestamp: "00:20", probability: 91 },
      { id: "f4", frameNumber: 615, timestamp: "00:20", probability: 88 },
      { id: "f5", frameNumber: 630, timestamp: "00:21", probability: 85 },
      { id: "f6", frameNumber: 642, timestamp: "00:21", probability: 79 },
    ],
    timelineSegments: [
      { startSec: 0, endSec: 8, risk: "low", label: "No anomalies detected" },
      { startSec: 8, endSec: 17, risk: "medium", label: "Minor inconsistencies" },
      { startSec: 17, endSec: 21, risk: "critical", label: "High manipulation probability" },
      { startSec: 21, endSec: 31, risk: "medium", label: "Residual artifacts" },
      { startSec: 31, endSec: 34, risk: "low", label: "No anomalies detected" },
    ],
    metadata: {
      filename: "Interview_01.mp4",
      fileType: "video/mp4",
      fileSize: "48.2 MB",
      createdDate: "2026-08-10 14:22:03",
      modifiedDate: "2026-08-10 16:47:51",
      codec: "H.264 (High Profile)",
      resolution: "1920x1080",
      frameRate: "29.97 fps",
      duration: "00:00:34",
      encoder: "Adobe Premiere Pro 2026",
      sha256: "8f3c91ab6e2d4f0a7b1c5e9d3a2f8b6c4e1d9a7b5c3f0e2d8a6b4c1f9e7d3a91",
      suspiciousFields: ["encoder", "modifiedDate"],
    },
    summary:
      "The analyzed media shows multiple indicators consistent with digital manipulation. Four detection models identified anomalous facial features, while temporal analysis detected inconsistencies between frames 510–630. Metadata analysis also identified an editing pipeline inconsistent with the claimed source. These findings likely indicate synthetic alteration, though full certainty requires expert manual review.",
    whyThisMatters:
      "This media was submitted as authentic supporting evidence. If manipulated, its use in reporting, legal proceedings, or public statements could mislead audiences or unfairly implicate the depicted individual.",
    recommendedActions: [
      "Escalate to senior forensic examiner for manual frame-by-frame review",
      "Request original camera source file from submitting party",
      "Preserve chain-of-custody documentation for potential legal proceedings",
      "Cross-reference facial biometrics against verified reference footage",
      "Do not publish or distribute pending verification",
    ],
  },
};

export const analyticsTrends = [
  { month: "Feb", cases: 62, flagged: 21 },
  { month: "Mar", cases: 74, flagged: 26 },
  { month: "Apr", cases: 81, flagged: 30 },
  { month: "May", cases: 95, flagged: 38 },
  { month: "Jun", cases: 112, flagged: 44 },
  { month: "Jul", cases: 121, flagged: 49 },
  { month: "Aug", cases: 128, flagged: 47 },
];

export const casesByRisk = [
  { name: "Low", value: 612 },
  { name: "Medium", value: 481 },
  { name: "High", value: 302 },
  { name: "Critical", value: 96 },
];

export const mediaTypeBreakdown = [
  { name: "Video", value: 812 },
  { name: "Image", value: 704 },
  { name: "Audio", value: 326 },
];

export const modelPerformance = [
  { name: "Xception", accuracy: 96.1, falsePositive: 3.1 },
  { name: "EfficientNet-B4", accuracy: 94.7, falsePositive: 4.0 },
  { name: "Video Temporal", accuracy: 92.8, falsePositive: 5.2 },
  { name: "Frequency Detector", accuracy: 91.3, falsePositive: 6.4 },
  { name: "Audio Spectral", accuracy: 89.6, falsePositive: 7.8 },
  { name: "Lip-Sync Model", accuracy: 85.2, falsePositive: 9.9 },
];

export const falsePositiveTrend = [
  { week: "W1", rate: 8.2 },
  { week: "W2", rate: 7.6 },
  { week: "W3", rate: 7.9 },
  { week: "W4", rate: 6.8 },
  { week: "W5", rate: 6.1 },
  { week: "W6", rate: 5.9 },
];

export const crossDatasetPerformance = [
  { dataset: "FF++", auc: 97.2 },
  { dataset: "DFDC", auc: 91.4 },
  { dataset: "Celeb-DF", auc: 88.9 },
  { dataset: "In-house Field Set", auc: 84.3 },
];

export const currentInvestigator = {
  name: "Aditi Sharma",
  role: "Senior Digital Forensics Analyst",
  badge: "INV-0042",
  unit: "Cybercrime Forensics Unit",
};
