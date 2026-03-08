// Validates upload module fields and locates the first invalid control for scrolling.
import type { ModuleErrors, SubmoduleDraft } from "./uploadModuleTypes";

export function buildModuleErrors(moduleTitle: string, description: string, submodules: SubmoduleDraft[]): ModuleErrors {
  return {
    moduleTitle: moduleTitle.trim().length === 0 ? "Module title is required." : null,
    description: description.trim().length === 0 ? "Description is required." : null,
    submodules: Object.fromEntries(
      submodules.map((submodule) => {
        const title = submodule.title.trim();
        const submoduleDescription = submodule.description.trim();
        return [submodule.id, {
          title: title.length === 0 && submoduleDescription.length > 0 ? "Submodule title is required." : null,
          description: submoduleDescription.length === 0 && title.length > 0 ? "Submodule description is required." : null,
        }];
      })
    ),
  };
}

export function hasModuleErrors(errors: ModuleErrors, submodules: SubmoduleDraft[]) {
  return Boolean(errors.moduleTitle) || Boolean(errors.description) || submodules.some((submodule) => {
    const submoduleError = errors.submodules[submodule.id];
    return Boolean(submoduleError?.title || submoduleError?.description);
  });
}

// Finds the first invalid field so the page can focus users on the blocking error.
export function getFirstInvalidField(errors: ModuleErrors, submodules: SubmoduleDraft[]) {
  if (errors.moduleTitle) return "module-title";
  if (errors.description) return "module-description";
  const firstInvalidSubmodule = submodules.find((submodule) => {
    const submoduleError = errors.submodules[submodule.id];
    return Boolean(submoduleError?.title || submoduleError?.description);
  });
  if (!firstInvalidSubmodule) return null;
  return errors.submodules[firstInvalidSubmodule.id]?.title ? firstInvalidSubmodule.id : `${firstInvalidSubmodule.id}-description`;
}
