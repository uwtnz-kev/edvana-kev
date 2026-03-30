import { File as FileIcon, FileSpreadsheet, FileText, Presentation } from "lucide-react";

export type PreviewKind = "image" | "pdf" | "doc" | "ppt" | "xls" | "file";

export type UploadPreviewFile = {
  file: File;
  previewKind: PreviewKind;
  previewUrl: string | null;
};

const PREVIEW_LABELS: Record<PreviewKind, { label: string; accent: string }> = {
  image: { label: "IMAGE", accent: "#38bdf8" },
  pdf: { label: "PDF", accent: "#f87171" },
  doc: { label: "DOC", accent: "#60a5fa" },
  ppt: { label: "PPT", accent: "#fb923c" },
  xls: { label: "XLS", accent: "#34d399" },
  file: { label: "FILE", accent: "#cbd5e1" },
};

const PREVIEW_TILE_MAP: Record<Exclude<PreviewKind, "image">, { label: string; icon: typeof FileIcon; tileClass: string }> = {
  pdf: { label: "PDF", icon: FileText, tileClass: "bg-red-500/15 text-red-300" },
  doc: { label: "DOC", icon: FileText, tileClass: "bg-blue-500/15 text-blue-300" },
  ppt: { label: "PPT", icon: Presentation, tileClass: "bg-orange-500/15 text-orange-300" },
  xls: { label: "XLS", icon: FileSpreadsheet, tileClass: "bg-emerald-500/15 text-emerald-300" },
  file: { label: "FILE", icon: FileIcon, tileClass: "bg-white/10 text-white/70" },
};

function encodePreviewSvg(svg: string) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export function getUploadFilePreviewKind(file: File): PreviewKind {
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (["jpg", "jpeg", "png"].includes(extension)) return "image";
  if (extension === "pdf") return "pdf";
  if (["doc", "docx"].includes(extension)) return "doc";
  if (["ppt", "pptx"].includes(extension)) return "ppt";
  if (["xls", "xlsx"].includes(extension)) return "xls";
  return "file";
}

export function formatSelectedFileSize(sizeBytes: number) {
  if (sizeBytes >= 1024 * 1024) return `${(sizeBytes / (1024 * 1024)).toFixed(1)} MB`;
  if (sizeBytes >= 1024) return `${Math.round(sizeBytes / 1024)} KB`;
  return `${sizeBytes} B`;
}

export async function buildPersistedPreview(file: UploadPreviewFile, title: string, description: string) {
  if (file.previewKind === "image" || file.previewKind === "pdf") {
    return "";
  }

  const preview = PREVIEW_LABELS[file.previewKind];
  const safeTitle = title.replace(/[<>&]/g, "");
  const safeDescription = (description.trim() || file.file.name).replace(/[<>&]/g, "");

  return encodePreviewSvg(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1600" viewBox="0 0 1200 1600">
    <rect width="1200" height="1600" fill="#07111f" />
    <rect x="70" y="70" width="1060" height="1460" rx="42" fill="#0f1c30" stroke="${preview.accent}" stroke-width="6" />
    <rect x="120" y="140" width="220" height="56" rx="28" fill="${preview.accent}" fill-opacity="0.2" />
    <text x="230" y="177" text-anchor="middle" fill="${preview.accent}" font-family="Arial, sans-serif" font-size="28" font-weight="700">${preview.label}</text>
    <text x="120" y="280" fill="#ffffff" font-family="Arial, sans-serif" font-size="60" font-weight="700">${safeTitle}</text>
    <foreignObject x="120" y="340" width="960" height="820">
      <div xmlns="http://www.w3.org/1999/xhtml" style="color:#d7e3f4;font-family:Arial,sans-serif;font-size:34px;line-height:1.45;white-space:pre-wrap;">${safeDescription}</div>
    </foreignObject>
    <rect x="120" y="1270" width="960" height="2" fill="#29435c" />
    <text x="120" y="1335" fill="#8ca6c6" font-family="Arial,sans-serif" font-size="28">${file.file.name}</text>
  </svg>`);
}

export function renderUploadFilePreviewTile(file: UploadPreviewFile) {
  if (file.previewKind === "image" && file.previewUrl) {
    return <img src={file.previewUrl} alt={file.file.name} className="h-full w-full object-cover" />;
  }

  const preview = PREVIEW_TILE_MAP[file.previewKind];
  const Icon = preview.icon;

  return (
    <div className={`flex h-full w-full flex-col items-center justify-center gap-2 ${preview.tileClass}`}>
      <Icon className="h-8 w-8" />
      <span className="text-xs font-semibold tracking-[0.18em]">{preview.label}</span>
    </div>
  );
}
