import { useMemo, useState } from "react";
import { ArrowLeft, FileText, Folder, Plus, Search, Trash2 } from "lucide-react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ConfirmDeleteModal } from "@/dashboard/teacher/components/assignments/ConfirmDeleteModal";
import { Input } from "@/components/ui/input";
import { getSubjectThemeById } from "@/dashboard/teacher/components/shared";
import { deleteSubjectFile, deleteSubjectFolder, formatSubjectFileSize, isSubjectFileVisibleInFiles, useSubjectFiles, useSubjectFolder, useSubjectFolders } from "@/dashboard/teacher/components/subjects/files/subjectFilesStore";
import { getSubjectName } from "@/dashboard/teacher/components/subjects/upload/uploadModuleHelpers";
import type { SubjectUploadRouteState } from "@/dashboard/teacher/components/subjects/upload/uploadModuleTypes";
import { appendClassIdToPath, getClassIdFromSearchParams } from "./subjects/subjectClassRouting";

type Params = { subjectId?: string; folderId?: string };

type VisibleRow =
  | { type: "folder"; id: string; name: string; createdAt: string }
  | { type: "file"; id: string; name: string; createdAt: string; updatedAt: string; originalFileName: string; sizeBytes: number };

function formatTimestamp(value: string) {
  return new Date(value).toLocaleString([], { year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

export default function SubjectFilesView() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { subjectId = "", folderId = "" } = useParams<Params>();
  const classId = getClassIdFromSearchParams(searchParams);
  const state = (location.state as SubjectUploadRouteState | null) ?? null;
  const theme = getSubjectThemeById(subjectId);
  const subjectName = getSubjectName(subjectId, state);
  const files = useSubjectFiles(subjectId);
  const visibleFiles = useMemo(() => files.filter(isSubjectFileVisibleInFiles), [files]);
  const folders = useSubjectFolders(subjectId);
  const currentFolder = useSubjectFolder(subjectId, folderId);
  const [query, setQuery] = useState("");
  const [fileIdPendingDelete, setFileIdPendingDelete] = useState<string | null>(null);
  const [folderIdPendingDelete, setFolderIdPendingDelete] = useState<string | null>(null);
  const topLevelRoute = appendClassIdToPath(`/dashboard/teacher/subjects/${subjectId}/files`, classId);
  const scopedUploadRoute = currentFolder
    ? `/dashboard/teacher/subjects/${subjectId}/upload-files?${new URLSearchParams({
        ...(classId ? { classId } : {}),
        folderId: currentFolder.id,
      }).toString()}`
    : null;
  const isFolderRoute = folderId.trim().length > 0;
  const folderMissing = isFolderRoute && !currentFolder;
  const backRoute = isFolderRoute ? topLevelRoute : appendClassIdToPath(`/dashboard/teacher/subjects/${subjectId}`, classId);
  const folderFiles = useMemo(() => visibleFiles.filter((file) => file.folderId === folderId), [visibleFiles, folderId]);
  const topLevelFiles = useMemo(() => visibleFiles.filter((file) => file.folderId === null), [visibleFiles]);

  const visibleRows = useMemo<VisibleRow[]>(() => {
    if (folderMissing) return [];

    const normalizedQuery = query.trim().toLowerCase();
    if (currentFolder) {
      return folderFiles
        .filter((file) => !normalizedQuery || [file.name, file.originalFileName, file.category, file.modifiedBy].some((value) => value.toLowerCase().includes(normalizedQuery)))
        .map((file) => ({
          type: "file",
          id: file.id,
          name: file.name,
          createdAt: file.createdAt,
          updatedAt: file.updatedAt,
          originalFileName: file.originalFileName,
          sizeBytes: file.sizeBytes,
        }));
    }

    const visibleFolders: VisibleRow[] = folders
      .filter((folder) => !normalizedQuery || folder.name.toLowerCase().includes(normalizedQuery))
      .map((folder) => ({ type: "folder", id: folder.id, name: folder.name, createdAt: folder.createdAt }));
    const visibleFileRows: VisibleRow[] = topLevelFiles
      .filter((file) => !normalizedQuery || [file.name, file.originalFileName, file.category, file.modifiedBy].some((value) => value.toLowerCase().includes(normalizedQuery)))
      .map((file) => ({
        type: "file",
        id: file.id,
        name: file.name,
        createdAt: file.createdAt,
        updatedAt: file.updatedAt,
        originalFileName: file.originalFileName,
        sizeBytes: file.sizeBytes,
      }));

    return [...visibleFolders, ...visibleFileRows];
  }, [currentFolder, folderFiles, folderMissing, folders, query, topLevelFiles]);

  const pendingFolder = useMemo(
    () => folders.find((folder) => folder.id === folderIdPendingDelete) ?? null,
    [folderIdPendingDelete, folders],
  );
  const pendingFolderHasFiles = useMemo(
    () => (pendingFolder ? visibleFiles.some((file) => file.folderId === pendingFolder.id) : false),
    [pendingFolder, visibleFiles],
  );

  const handleRowOpen = (row: VisibleRow) => {
    if (row.type === "folder") {
      navigate(appendClassIdToPath(`/dashboard/teacher/subjects/${subjectId}/files/folders/${row.id}`, classId), { state: { restoreSubjectId: subjectId, subject: state?.subject ?? null } });
      return;
    }
    navigate(appendClassIdToPath(`/dashboard/teacher/subjects/${subjectId}/files/${row.id}`, classId), { state: { restoreSubjectId: subjectId, subject: state?.subject ?? null } });
  };

  const emptyMessage = folderMissing
    ? "The requested folder could not be found."
    : currentFolder
      ? "No files match your search in this folder."
      : "No folders or files match your search.";

  const confirmDeleteFile = () => {
    if (!fileIdPendingDelete) return;
    deleteSubjectFile(subjectId, fileIdPendingDelete);
    setFileIdPendingDelete(null);
  };

  const confirmDeleteFolder = () => {
    if (!folderIdPendingDelete) return;
    deleteSubjectFolder(subjectId, folderIdPendingDelete);
    setFolderIdPendingDelete(null);
  };

  return (
    <div className="w-full overflow-x-hidden p-4 sm:p-6" style={{ overflowX: "hidden" }}>
      <div className="mx-auto w-full max-w-6xl space-y-4">
        <header className="rounded-2xl border border-white/10 bg-white/10 px-6 py-5 backdrop-blur-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button type="button" onClick={() => navigate(backRoute, { state: { restoreSubjectId: subjectId, subject: state?.subject ?? null } })} className="w-fit rounded-2xl border border-white/20 bg-white/10 text-white transition-all duration-200 hover:bg-white/30 hover:shadow-sm">
              <ArrowLeft className="mr-2 h-4 w-4" />Back
            </Button>
            <div className="flex items-center gap-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${theme.bgClass}`}><FileText className={`h-6 w-6 ${theme.iconClass}`} /></div>
              <div>
                <h1 className="text-2xl font-semibold text-[var(--text-primary)]">Files</h1>
                <p className="mt-1 text-[var(--text-secondary)]">Subject: {subjectName}</p>
                {currentFolder ? <p className="mt-1 text-sm text-[var(--text-secondary)]">Folder: {currentFolder.name}</p> : null}
              </div>
            </div>
          </div>
        </header>

        <section className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">{currentFolder ? currentFolder.name : "Subject Files"}</h2>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">{currentFolder ? "Review files stored inside this folder." : "Search and review uploaded files for this subject."}</p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
              {currentFolder ? (
                <Button
                  type="button"
                  onClick={() => scopedUploadRoute && navigate(scopedUploadRoute, { state: { restoreSubjectId: subjectId, subject: state?.subject ?? null } })}
                  className="rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-white/20"
                >
                  <Plus className="mr-2 h-4 w-4" />Add File
                </Button>
              ) : null}
              <div className="relative w-full sm:w-80">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/55" />
                <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={currentFolder ? "Search this folder" : "Search files and folders"} className="h-11 rounded-2xl border-white/20 bg-white/10 pl-10 text-white placeholder:text-white/55" />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
            <table className="min-w-full table-fixed border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 text-left text-xs uppercase tracking-[0.18em] text-white/55">
                  <th className="w-[42%] px-4 py-3 font-medium">Name</th>
                  <th className="w-[22%] px-4 py-3 font-medium">Created</th>
                  <th className="w-[20%] px-4 py-3 font-medium">Last Modified</th>
                  <th className="w-[14%] px-4 py-3 font-medium">Size</th>
                  <th className="w-[8%] px-4 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {visibleRows.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-sm text-[var(--text-primary)]/70">
                      {emptyMessage}
                    </td>
                  </tr>
                ) : null}
                {visibleRows.map((row) => (
                  <tr key={`${row.type}-${row.id}`} className="border-b border-white/10 text-sm text-[var(--text-primary)]/80 last:border-b-0">
                    <td className="min-w-0 w-[42%] max-w-0 px-4 py-4 align-top">
                      <button
                        type="button"
                        onClick={() => handleRowOpen(row)}
                        className="block min-w-0 w-full overflow-hidden text-left"
                      >
                        <div className="flex min-w-0 items-center gap-4">
                          <div className="shrink-0">
                            <span className={`flex h-10 w-10 items-center justify-center rounded-2xl ${row.type === "folder" ? "bg-amber-400/15 text-amber-300" : `${theme.bgClass} ${theme.iconClass}`}`}>
                              {row.type === "folder" ? <Folder className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
                            </span>
                          </div>

                          <div className="min-w-0 flex-1 overflow-hidden">
                            <div
                              className={`truncate text-sm font-semibold hover:underline underline-offset-2 ${row.type === "folder" ? "text-amber-200" : "text-cyan-300"}`}
                              title={row.name}
                            >
                              {row.name}
                            </div>

                            {row.type === "folder" ? (
                              <div className="truncate text-xs text-white/65" title="Folder">
                                Folder
                              </div>
                            ) : (
                              <div className="truncate text-xs text-white/65" title={row.originalFileName}>
                                {row.originalFileName}
                              </div>
                            )}
                          </div>
                        </div>
                      </button>
                    </td>
                    <td className="px-4 py-4 align-top text-xs text-[var(--text-primary)]/70">{formatTimestamp(row.createdAt)}</td>
                    <td className="px-4 py-4 align-top text-xs text-[var(--text-primary)]/70">{row.type === "folder" ? "-" : formatTimestamp(row.updatedAt)}</td>
                    <td className="px-4 py-4 align-top text-xs text-[var(--text-primary)]/70">{row.type === "folder" ? "-" : formatSubjectFileSize(row.sizeBytes)}</td>
                    <td className="px-4 py-4 align-top">
                      <button
                        type="button"
                        onClick={() => row.type === "folder" ? setFolderIdPendingDelete(row.id) : setFileIdPendingDelete(row.id)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-red-400/20 bg-red-500/10 text-red-300 transition-all duration-200 hover:bg-red-500/20 hover:border-red-400/30"
                        aria-label={row.type === "folder" ? `Delete ${row.name}` : `Delete ${row.name}`}
                        title={row.type === "folder" ? "Delete folder" : "Delete file"}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
      <ConfirmDeleteModal
        open={fileIdPendingDelete !== null}
        onOpenChange={(open) => {
          if (!open) setFileIdPendingDelete(null);
        }}
        title="Delete file?"
        description="This file will be removed immediately."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={confirmDeleteFile}
      />
      <ConfirmDeleteModal
        open={folderIdPendingDelete !== null}
        onOpenChange={(open) => {
          if (!open) setFolderIdPendingDelete(null);
        }}
        title="Delete folder?"
        description={pendingFolderHasFiles ? "Are you sure you want to delete this folder and its contents?" : "Are you sure you want to delete this folder?"}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={confirmDeleteFolder}
      />
    </div>
  );
}
