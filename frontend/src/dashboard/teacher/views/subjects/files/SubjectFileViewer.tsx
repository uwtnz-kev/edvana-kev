import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, FileText, Folder } from "lucide-react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { formatSubjectFileSize, useSubjectFile, useSubjectFolder } from "@/dashboard/teacher/components/subjects/files/subjectFilesStore";
import { readSubjectFileContent } from "@/dashboard/teacher/components/subjects/files/subjectFilesBinaryStorage";
import { getSubjectThemeById } from "@/dashboard/teacher/components/shared";
import { useSubjectModules } from "@/dashboard/teacher/components/subjects/subjectModulesStore";
import { getSubjectName } from "@/dashboard/teacher/components/subjects/upload/uploadModuleHelpers";
import type { SubjectUploadRouteState } from "@/dashboard/teacher/components/subjects/upload/uploadModuleTypes";
import { appendClassIdToPath, getClassIdFromSearchParams } from "../subjectClassRouting";

type Params = { subjectId?: string; fileId?: string };
type SubjectFileViewerRouteState = Pick<SubjectUploadRouteState, "restoreSubjectId" | "subject"> & {
  from?: "files" | "module";
  moduleId?: string;
  returnScrollTop?: number;
  submoduleId?: string;
};

function formatTimestamp(value: string) {
  return new Date(value).toLocaleString([], { year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

function buildPdfBlobUrl(previewUrl: string) {
  const [metadata, payload] = previewUrl.split(",", 2);
  if (!metadata || !payload || !metadata.includes(";base64")) return null;

  try {
    const binary = atob(payload);
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) {
      bytes[index] = binary.charCodeAt(index);
    }
    return URL.createObjectURL(new Blob([bytes], { type: "application/pdf" }));
  } catch {
    return null;
  }
}

function buildObjectUrl(blob: Blob) {
  return URL.createObjectURL(blob);
}

function isContentBlank(value: string) {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim().length === 0;
}

export default function SubjectFileViewer() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { subjectId = "", fileId = "" } = useParams<Params>();
  const classId = getClassIdFromSearchParams(searchParams);
  const state = (location.state as SubjectFileViewerRouteState | null) ?? null;
  const theme = getSubjectThemeById(subjectId);
  const subjectName = getSubjectName(subjectId, state);
  const file = useSubjectFile(subjectId, fileId);
  const folder = useSubjectFolder(subjectId, file?.folderId ?? "");
  const modules = useSubjectModules(subjectId);
  const filesRoute = file?.folderId
    ? appendClassIdToPath(`/dashboard/teacher/subjects/${subjectId}/files/folders/${file.folderId}`, classId)
    : appendClassIdToPath(`/dashboard/teacher/subjects/${subjectId}/files`, classId);
  const originatingModule = useMemo(
    () => (state?.moduleId ? modules.find((item) => item.id === state.moduleId) ?? null : null),
    [modules, state?.moduleId],
  );
  const originatingSubmodule = useMemo(
    () => (state?.submoduleId ? originatingModule?.submodules.find((item) => item.id === state.submoduleId) ?? null : null),
    [originatingModule, state?.submoduleId],
  );
  const displayTitle = state?.from === "module"
    && state.submoduleId
    && originatingSubmodule
    && originatingSubmodule.title.trim().length > 0
    ? originatingSubmodule.title
    : file?.name ?? "File Not Found";
  const shouldSkipSubmoduleBack = state?.from === "module"
    && Boolean(originatingSubmodule)
    && originatingSubmodule.attachedFileIds.length > 0
    && isContentBlank(originatingSubmodule.content);
  const moduleRoute = shouldSkipSubmoduleBack
    ? appendClassIdToPath(`/dashboard/teacher/subjects/${subjectId}/modules`, classId)
    : state?.submoduleId && state.moduleId
      ? appendClassIdToPath(`/dashboard/teacher/subjects/${subjectId}/modules/${state.moduleId}/submodules/${state.submoduleId}`, classId)
      : appendClassIdToPath(`/dashboard/teacher/subjects/${subjectId}/modules`, classId);
  const backRoute = state?.from === "module" ? moduleRoute : filesRoute;
  const backState = state?.from === "module" && shouldSkipSubmoduleBack
    ? {
        restoreSubjectId: subjectId,
        returnModuleId: state?.moduleId,
        returnScrollTop: state?.returnScrollTop,
        subject: state?.subject ?? null,
      }
    : { restoreSubjectId: subjectId, subject: state?.subject ?? null };
  const isImage = file?.mimeType.startsWith("image/") ?? false;
  const isPdf = file?.mimeType === "application/pdf";
  const isPdfDataUrl = isPdf && file.previewUrl.startsWith("data:application/pdf");
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
  const [contentUrl, setContentUrl] = useState<string | null>(null);
  const [contentError, setContentError] = useState<string | null>(null);
  const pdfSrc = contentUrl ?? (isPdfDataUrl ? pdfBlobUrl ?? file?.previewUrl ?? "" : file?.previewUrl ?? "");

  useEffect(() => {
    if (!isPdfDataUrl || !file?.previewUrl) {
      setPdfBlobUrl(null);
      return;
    }

    const nextBlobUrl = buildPdfBlobUrl(file.previewUrl);
    setPdfBlobUrl(nextBlobUrl);

    return () => {
      if (nextBlobUrl) {
        URL.revokeObjectURL(nextBlobUrl);
      }
    };
  }, [file?.previewUrl, isPdfDataUrl]);

  useEffect(() => {
    let active = true;
    let nextObjectUrl: string | null = null;

    if (!file?.blobKey || (!isImage && !isPdf)) {
      setContentUrl(null);
      setContentError(null);
      return;
    }

    readSubjectFileContent(file.blobKey)
      .then((record) => {
        if (!active) return;
        if (!record) {
          setContentUrl(null);
          setContentError("Stored file content could not be loaded.");
          return;
        }

        nextObjectUrl = buildObjectUrl(record.blob);
        setContentUrl(nextObjectUrl);
        setContentError(null);
      })
      .catch(() => {
        if (!active) return;
        setContentUrl(null);
        setContentError("Stored file content could not be loaded.");
      });

    return () => {
      active = false;
      if (nextObjectUrl) {
        URL.revokeObjectURL(nextObjectUrl);
      }
    };
  }, [file?.blobKey, isImage, isPdf]);

  return (
    <div className="w-full overflow-x-hidden p-4 sm:p-6" style={{ overflowX: "hidden" }}>
      <div className="mx-auto w-full max-w-6xl space-y-4">
        <header className="rounded-2xl border border-white/10 bg-white/10 px-6 py-5 backdrop-blur-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button type="button" onClick={() => navigate(backRoute, { state: backState })} className="w-fit rounded-2xl border border-white/20 bg-white/10 text-white transition-all duration-200 hover:bg-white/30 hover:shadow-sm">
              <ArrowLeft className="mr-2 h-4 w-4" />Back
            </Button>
            <div className="flex items-center gap-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${theme.bgClass}`}><FileText className={`h-6 w-6 ${theme.iconClass}`} /></div>
              <div><h1 className="text-2xl font-semibold text-[var(--text-primary)]">{displayTitle}</h1><p className="mt-1 text-[var(--text-secondary)]">Subject: {subjectName}</p></div>
            </div>
          </div>
        </header>

        {file ? (
          <section className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl">
            <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-[var(--text-secondary)]">
              <span>{file.originalFileName}</span>
              <span>&bull;</span>
              <span>{formatSubjectFileSize(file.sizeBytes)}</span>
              <span>&bull;</span>
              <span>Modified {formatTimestamp(file.updatedAt)} by {file.modifiedBy}</span>
              {folder ? (
                <>
                  <span>&bull;</span>
                  <span className="inline-flex items-center gap-1"><Folder className="h-3.5 w-3.5" />{folder.name}</span>
                </>
              ) : null}
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40">
              {contentError ? (
                <div className="px-6 py-8 text-sm text-[var(--text-primary)]/75">{contentError}</div>
              ) : isImage ? (
                <div className="flex justify-center bg-slate-950/30 p-4">
                  <img src={contentUrl ?? file.previewUrl} alt={file.name} className="max-h-[760px] w-auto max-w-full rounded-xl object-contain" />
                </div>
              ) : isPdf ? (
                <object data={pdfSrc} type="application/pdf" className="h-[760px] w-full">
                  <iframe src={pdfSrc} title={file.name} className="h-[760px] w-full" />
                </object>
              ) : (
                <iframe src={file.previewUrl} title={file.name} className="h-[760px] w-full" />
              )}
            </div>
          </section>
        ) : (
          <section className="rounded-2xl border border-white/15 bg-white/10 px-6 py-8 text-sm text-[var(--text-primary)]/75 backdrop-blur-xl">
            The requested file could not be found.
          </section>
        )}
      </div>
    </div>
  );
}
