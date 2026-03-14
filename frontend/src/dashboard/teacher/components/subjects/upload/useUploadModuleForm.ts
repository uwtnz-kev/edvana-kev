// Manages upload module form state, touched flags, and submodule row mutations.
import { useMemo, useState } from "react";
import { buildModuleErrors } from "./uploadModuleValidation";
import { createEmptySubmodule } from "./uploadModuleHelpers";
import type { FieldTouchedState } from "./uploadModuleTypes";

export function useUploadModuleForm() {
  const [moduleTitle, setModuleTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submodules, setSubmodules] = useState([createEmptySubmodule()]);
  const [touched, setTouched] = useState<FieldTouchedState>({ moduleTitle: false, description: false, submodules: {} });
  const errors = useMemo(() => buildModuleErrors(moduleTitle, description, submodules), [description, moduleTitle, submodules]);

  return {
    description,
    errors,
    moduleTitle,
    submodules,
    touched,
    setDescription,
    setModuleTitle,
    setTouched,
    addSubmodule: () => {
      const next = createEmptySubmodule();
      setSubmodules((items) => [...items, next]);
      setTouched((current) => ({ ...current, submodules: { ...current.submodules, [next.id]: { title: false, description: false } } }));
    },
    removeSubmodule: (submoduleId: string) => {
      setSubmodules((items) => {
        const next = items.filter((item) => item.id !== submoduleId);
        return next.length > 0 ? next : [createEmptySubmodule()];
      });
      setTouched((current) => {
        const next = { ...current.submodules };
        delete next[submoduleId];
        return { ...current, submodules: next };
      });
    },
    setSubmoduleTouched: (submoduleId: string, field: "title" | "description") => {
      setTouched((current) => ({ ...current, submodules: { ...current.submodules, [submoduleId]: { title: current.submodules[submoduleId]?.title ?? false, description: current.submodules[submoduleId]?.description ?? false, [field]: true } } }));
    },
    updateSubmodule: (submoduleId: string, field: "title" | "description", value: string) => {
      setSubmodules((items) => items.map((item) => item.id === submoduleId ? { ...item, [field]: value } : item));
    },
  };
}
