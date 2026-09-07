import { MediaMetadata } from "@/types";
import { AlertTriangle } from "lucide-react";

export function MetadataPanel({ metadata }: { metadata: MediaMetadata }) {
  const rows: { label: string; key: keyof MediaMetadata }[] = [
    { label: "Filename", key: "filename" },
    { label: "File Type", key: "fileType" },
    { label: "File Size", key: "fileSize" },
    { label: "Created Date", key: "createdDate" },
    { label: "Modified Date", key: "modifiedDate" },
    { label: "Codec", key: "codec" },
    { label: "Resolution", key: "resolution" },
    { label: "Frame Rate", key: "frameRate" },
    { label: "Duration", key: "duration" },
    { label: "Software / Encoder", key: "encoder" },
  ];

  return (
    <div className="overflow-hidden rounded-lg border border-border-soft">
      <table className="w-full text-left">
        <tbody>
          {rows
            .filter((r) => metadata[r.key])
            .map((r, i) => {
              const suspicious = metadata.suspiciousFields.includes(r.key);
              return (
                <tr key={r.key} className={i % 2 === 0 ? "bg-surface-2/30" : ""}>
                  <td className="w-1/3 px-4 py-2.5 text-[12.5px] text-text-muted">{r.label}</td>
                  <td className="px-4 py-2.5">
                    <span className={`font-mono text-[12.5px] ${suspicious ? "text-[#FFB27A]" : "text-text"}`}>
                      {String(metadata[r.key])}
                    </span>
                    {suspicious && (
                      <span className="ml-2 inline-flex items-center gap-1 text-[10.5px] font-medium text-[#FFB27A]">
                        <AlertTriangle className="h-3 w-3" />
                        Inconsistent with original-source claim
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          <tr className="bg-surface-2/30">
            <td className="px-4 py-2.5 text-[12.5px] text-text-muted">SHA-256</td>
            <td className="px-4 py-2.5">
              <span className="break-all font-mono text-[11.5px] text-accent-2">{metadata.sha256}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
