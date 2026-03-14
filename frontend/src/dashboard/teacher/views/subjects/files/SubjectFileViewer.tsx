import { ArrowLeft, FileText, Folder } from "lucide-react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { formatSubjectFileSize, useSubjectFile, useSubjectFolder } from "@/dashboard/teacher/components/subjects/files/subjectFilesStore";
import { getSubjectThemeById } from "@/dashboard/teacher/components/shared";
import { getSubjectName } from "@/dashboard/teacher/components/subjects/upload/uploadModuleHelpers";
import type { SubjectUploadRouteState } from "@/dashboard/teacher/components/subjects/upload/uploadModuleTypes";
import { appendClassIdToPath, getClassIdFromSearchParams } from "../subjectClassRouting";

type Params = { subjectId?: string; fileId?: string };

function formatTimestamp(value: string) {
  return new Date(value).toLocaleString([], { year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

export default function SubjectFileViewer() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { subjectId = "", fileId = "" } = useParams<Params>();
  const classId = getClassIdFromSearchParams(searchParams);
  const state = (location.state as SubjectUploadRouteState | null) ?? null;
  const theme = getSubjectThemeById(subjectId);
  const subjectName = getSubjectName(subjectId, state);
  const file = useSubjectFile(subjectId, fileId);
  const folder = useSubjectFolder(subjectId, file?.folderId ?? "");
  const filesRoute = file?.folderId
    ? appendClassIdToPath(`/dashboard/teacher/subjects/${subjectId}/files/folders/${file.folderId}`, classId)
    : appendClassIdToPath(`/dashboard/teacher/subjects/${subjectId}/files`, classId);
  const isImage = file?.mimeType.startsWith("image/") ?? false;

  return (
    <div className="w-full overflow-x-hidden p-4 sm:p-6" style={{ overflowX: "hidden" }}>
      <div className="mx-auto w-full max-w-6xl space-y-4">
        <header className="rounded-2xl border border-white/10 bg-white/10 px-6 py-5 backdrop-blur-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button type="button" onClick={() => navigate(filesRoute, { state: { restoreSubjectId: subjectId, subject: state?.subject ?? null } })} className="w-fit rounded-2xl border border-white/20 bg-white/10 text-white transition-all duration-200 hover:bg-white/30 hover:shadow-sm">
              <ArrowLeft className="mr-2 h-4 w-4" />Back
            </Button>
            <div className="flex items-center gap-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${theme.bgClass}`}><FileText className={`h-6 w-6 ${theme.iconClass}`} /></div>
              <div><h1 className="text-2xl font-semibold text-[var(--text-primary)]">{file?.name ?? "File Not Found"}</h1><p className="mt-1 text-[var(--text-secondary)]">Subject: {subjectName}</p></div>
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
              {isImage ? (
                <div className="flex justify-center bg-slate-950/30 p-4">
                  <img src={file.previewUrl} alt={file.name} className="max-h-[760px] w-auto max-w-full rounded-xl object-contain" />
                </div>
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
