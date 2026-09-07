"use client";
import { useCallback, useState } from "react";
import { UploadCloud, FileVideo, FileImage, FileAudio, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StagedFile {
  file: File;
  hash: string;
  kind: "video" | "image" | "audio";
}

function kindFromType(type: string): "video" | "image" | "audio" {
  if (type.startsWith("video")) return "video";
  if (type.startsWith("audio")) return "audio";
  return "image";
}

async function fakeHash(file: File) {
  // Lightweight deterministic mock hash from file name/size, not a real digest.
  const seed = `${file.name}-${file.size}-${file.lastModified}`;
  let h1 = 0xdeadbeef,
    h2 = 0x41c6ce57;
  for (let i = 0; i < seed.length; i++) {
    const ch = seed.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = (h1 ^ (h1 >>> 16)) >>> 0;
  h2 = (h2 ^ (h2 >>> 16)) >>> 0;
  return (h1.toString(16) + h2.toString(16)).padEnd(64, "0").slice(0, 64);
}

const icons = { video: FileVideo, image: FileImage, audio: FileAudio };

export function UploadDropzone({ onStaged }: { onStaged: (f: StagedFile) => void }) {
  const [dragging, setDragging] = useState(false);
  const [staged, setStaged] = useState<StagedFile | null>(null);

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;
      const file = files[0];
      const hash = await fakeHash(file);
      const kind = kindFromType(file.type);
      const sf = { file, hash, kind };
      setStaged(sf);
      onStaged(sf);
    },
    [onStaged]
  );

  if (staged) {
    const Icon = icons[staged.kind];
    return (
      <div className="rounded-xl border border-border-soft bg-surface-2/40 p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent-2">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <div className="text-[13.5px] font-medium text-text">{staged.file.name}</div>
              <div className="mt-0.5 text-[12px] text-text-dim">
                {(staged.file.size / (1024 * 1024)).toFixed(2)} MB · {staged.file.type || "unknown type"}
              </div>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11.5px]">
                <span className="text-text-dim">SHA-256:</span>
                <span className="break-all font-mono text-accent-2">{staged.hash}</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setStaged(null)}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-text-dim hover:bg-surface-2 hover:text-text"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <label
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        handleFiles(e.dataTransfer.files);
      }}
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-16 text-center transition-colors",
        dragging ? "border-accent bg-accent-soft/40" : "border-border hover:border-accent/40 hover:bg-surface-2/30"
      )}
    >
      <input
        type="file"
        className="hidden"
        accept=".mp4,.mov,.avi,.jpg,.jpeg,.png,.wav,.mp3"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-accent-2">
        <UploadCloud className="h-6 w-6" />
      </div>
      <div className="text-[15px] font-medium text-text">Upload suspicious image, video or audio</div>
      <p className="max-w-sm text-[12.5px] text-text-dim">
        Drag and drop a file here, or click to browse. Files are hashed locally before upload for evidence integrity.
      </p>
      <div className="mt-2 flex flex-wrap justify-center gap-1.5">
        {["MP4", "MOV", "AVI", "JPG", "PNG", "WAV", "MP3"].map((f) => (
          <span key={f} className="rounded border border-border-soft bg-surface-2 px-2 py-0.5 font-mono text-[10.5px] text-text-dim">
            {f}
          </span>
        ))}
      </div>
      <p className="text-[11px] text-text-dim">Maximum file size: 500 MB</p>
    </label>
  );
}
