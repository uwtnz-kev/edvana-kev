import type { SubjectFileItem, SubjectFolderItem } from "@/dashboard/teacher/components/subjects/files/subjectFilesTypes";
import type { SubjectModuleItem } from "@/dashboard/teacher/components/subjects/subjectModulesStore";

export type DuplicateDecision = "proceed" | "cancel";

export type PendingDuplicateUpload = {
  duplicateFileId: string | null;
  duplicateFileName: string;
  existingLocations: string[];
};

export const DUPLICATE_FILE_MESSAGE = "A file with this title or filename already exists in this location.";

type ResolveDuplicateFileLocationsArgs = {
  duplicateFile: SubjectFileItem;
  subjectName: string;
  classId?: string | null;
  folders: SubjectFolderItem[];
  modules: SubjectModuleItem[];
};

export function normalizeComparisonValue(value: string) {
  return value.trim().toLowerCase();
}

function splitNameAndExtension(name: string) {
  const trimmed = name.trim();
  const extensionIndex = trimmed.lastIndexOf(".");
  if (extensionIndex <= 0) return { baseName: trimmed, extension: "" };
  return {
    baseName: trimmed.slice(0, extensionIndex),
    extension: trimmed.slice(extensionIndex),
  };
}

function formatClassLabel(classId?: string | null) {
  return classId && classId.trim().length > 0 ? classId.trim().toUpperCase() : null;
}

function buildLocation(parts: Array<string | null | undefined>) {
  return parts.filter((part): part is string => Boolean(part && part.trim().length > 0)).join(" -> ");
}

export function generateUniqueName(name: string, existingNames: string[]) {
  const normalizedNames = new Set(existingNames.map((value) => normalizeComparisonValue(value)));
  const { baseName, extension } = splitNameAndExtension(name);

  if (!normalizedNames.has(normalizeComparisonValue(name))) {
    return name;
  }

  for (let suffix = 2; suffix < 1000; suffix += 1) {
    const nextName = `${baseName} (${suffix})${extension}`;
    if (!normalizedNames.has(normalizeComparisonValue(nextName))) {
      return nextName;
    }
  }

  return `${baseName} (${Date.now()})${extension}`;
}

export function findDuplicateFile(files: SubjectFileItem[], targetFolderId: string | null, title: string, fileName: string) {
  const normalizedTitle = normalizeComparisonValue(title);
  const normalizedFileName = normalizeComparisonValue(fileName);

  return (
    files
      .filter((file) => file.folderId === targetFolderId)
      .find((file) => {
        const existingTitle = normalizeComparisonValue(file.name);
        const existingFileName = normalizeComparisonValue(file.originalFileName);
        return existingTitle === normalizedTitle || existingFileName === normalizedFileName;
      }) ?? null
  );
}

export function resolveDuplicateFileLocations({ duplicateFile, subjectName, classId, folders, modules }: ResolveDuplicateFileLocationsArgs) {
  const classLabel = formatClassLabel(classId);
  const folder = duplicateFile.folderId ? folders.find((item) => item.id === duplicateFile.folderId) ?? null : null;
  const locations = new Set<string>();

  if (duplicateFile.visibility !== "module-only") {
    locations.add(buildLocation(folder ? [classLabel, subjectName, "Files", folder.name] : [classLabel, subjectName, "Files library"]));
  }

  modules.forEach((module) => {
    if (module.attachedFileIds.includes(duplicateFile.id)) {
      locations.add(buildLocation([classLabel, subjectName, module.title]));
    }

    module.submodules.forEach((submodule) => {
      if (submodule.attachedFileIds.includes(duplicateFile.id)) {
        locations.add(buildLocation([classLabel, subjectName, module.title, submodule.title]));
      }
    });
  });

  if (locations.size === 0 && duplicateFile.visibility === "module-only") {
    locations.add(buildLocation([classLabel, subjectName, "Module-only storage"]));
  }

  return [...locations];
}
