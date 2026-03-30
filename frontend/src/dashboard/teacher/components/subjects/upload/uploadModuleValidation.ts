// Validates upload module fields and locates the first invalid control for scrolling.
import type { ModuleErrors, SubmoduleDraft } from "./uploadModuleTypes";

function hasMeaningfulText(value: string) {
  return value.trim().length > 0;
}

function normalizeValue(value: string) {
  return value.trim().toLowerCase();
}

function isContentBlank(value: string) {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim().length === 0;
}

export function buildModuleErrors(moduleTitle: string, _description: string, submodules: SubmoduleDraft[], existingModuleTitles: string[] = []): ModuleErrors {
  const normalizedExistingModuleTitles = new Set(existingModuleTitles.map((title) => normalizeValue(title)));
  const seenSubmoduleTitles = new Set<string>();

  return {
    moduleTitle: !hasMeaningfulText(moduleTitle)
      ? "Module title is required."
      : normalizedExistingModuleTitles.has(normalizeValue(moduleTitle))
        ? "A module with this title already exists in this subject."
        : null,
    description: null,
    submodules: Object.fromEntries(
      submodules.map((submodule) => {
        const title = submodule.title.trim();
        let titleError: string | null = null;

        if (title.length === 0) {
          titleError = "Submodule title is required";
        } else {
          const normalizedTitle = normalizeValue(title);
          if (seenSubmoduleTitles.has(normalizedTitle)) {
            titleError = "A submodule with this title already exists in this module.";
          }
          seenSubmoduleTitles.add(normalizedTitle);
        }

        return [submodule.id, {
          title: titleError,
          description: null,
          content: isContentBlank(submodule.content)
            ? "Please add written submodule content. Attached files do not replace the content field."
            : null,
        }];
      })
    ),
  };
}

export function hasModuleErrors(errors: ModuleErrors, submodules: SubmoduleDraft[]) {
  return Boolean(errors.moduleTitle) || submodules.some((submodule) => {
    const submoduleError = errors.submodules[submodule.id];
    return Boolean(submoduleError?.title || submoduleError?.description || submoduleError?.content);
  });
}

// Finds the first invalid field so the page can focus users on the blocking error.
export function getFirstInvalidField(errors: ModuleErrors, submodules: SubmoduleDraft[]) {
  if (errors.moduleTitle) return "module-title";
  const firstInvalidSubmodule = submodules.find((submodule) => {
    const submoduleError = errors.submodules[submodule.id];
    return Boolean(submoduleError?.title || submoduleError?.description || submoduleError?.content);
  });
  if (!firstInvalidSubmodule) return null;
  if (errors.submodules[firstInvalidSubmodule.id]?.title) return firstInvalidSubmodule.id;
  if (errors.submodules[firstInvalidSubmodule.id]?.description) return `${firstInvalidSubmodule.id}-description`;
  return `${firstInvalidSubmodule.id}-content`;
}


