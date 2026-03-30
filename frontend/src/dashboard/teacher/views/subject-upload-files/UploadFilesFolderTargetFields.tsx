import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { SubjectFolderItem } from "@/dashboard/teacher/components/subjects/files/subjectFilesTypes";

type FolderMode = "none" | "create" | "existing";

type Props = {
  existingFolderError: string | null;
  existingFolderId: string;
  folderMode: FolderMode;
  folderName: string;
  onExistingFolderChange: (value: string) => void;
  onFolderNameChange: (value: string) => void;
  scopedFolder: SubjectFolderItem | null;
  subjectFolders: SubjectFolderItem[];
};

export function UploadFilesFolderTargetFields({
  existingFolderError,
  existingFolderId,
  folderMode,
  folderName,
  onExistingFolderChange,
  onFolderNameChange,
  scopedFolder,
  subjectFolders,
}: Props) {
  if (scopedFolder) {
    return (
      <div className="space-y-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
        <p className="text-sm font-medium text-white">Uploading into folder: {scopedFolder.name}</p>
        <p className="text-xs text-[var(--text-secondary)]">This upload will be saved directly inside the current folder.</p>
      </div>
    );
  }

  return (
    <>
      {folderMode === "create" ? (
        <div className="space-y-2">
          <Label htmlFor="folder-name" className="text-white">Folder Name</Label>
          <Input
            id="folder-name"
            value={folderName}
            onChange={(event) => onFolderNameChange(event.target.value)}
            placeholder="Enter folder name"
            className="h-12 rounded-2xl border-white/20 bg-white/10 text-white placeholder:text-white/70"
          />
        </div>
      ) : null}

      {folderMode === "existing" ? (
        <div className="space-y-2">
          <Label htmlFor="existing-folder" className="text-white">Folder</Label>
          <Select value={existingFolderId} onValueChange={onExistingFolderChange} disabled={subjectFolders.length === 0}>
            <SelectTrigger id="existing-folder" className="h-12 rounded-2xl border-white/20 bg-white/10 text-white">
              <SelectValue placeholder={subjectFolders.length > 0 ? "Select a folder" : "No folders available"} />
            </SelectTrigger>
            <SelectContent className="border-white/10 bg-[#1b2430]/95 text-white backdrop-blur-xl">
              {subjectFolders.map((folder) => (
                <SelectItem key={folder.id} value={folder.id} className="focus:bg-white/10">
                  {folder.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {existingFolderError ? <p className="mt-1 text-sm font-medium text-red-600">{existingFolderError}</p> : null}
          {subjectFolders.length === 0 ? <p className="text-xs text-[var(--text-secondary)]">No existing folders are available for this subject yet.</p> : null}
        </div>
      ) : null}
    </>
  );
}
