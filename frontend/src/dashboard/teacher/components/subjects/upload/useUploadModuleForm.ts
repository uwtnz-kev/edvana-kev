// Manages upload module form state, touched flags, and submodule row mutations.
import { useMemo, useState } from "react";
import { buildModuleErrors } from "./uploadModuleValidation";
import { createEmptySubmodule } from "./uploadModuleHelpers";
import type { FieldTouchedState } from "./uploadModuleTypes";

type Options = {
  existingModuleTitles?: string[];
};

export function useUploadModuleForm(options: Options = {}) {
  const [moduleTitle, setModuleTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submodules, setSubmodules] = useState([createEmptySubmodule()]);
  const [attachmentsOpenBySubmoduleId, setAttachmentsOpenBySubmoduleId] = useState<Record<string, boolean>>({});
  const [touched, setTouched] = useState<FieldTouchedState>({ moduleTitle: false, description: false, submodules: {} });
  const errors = useMemo(
    () => buildModuleErrors(moduleTitle, description, submodules, options.existingModuleTitles ?? []),
    [description, moduleTitle, options.existingModuleTitles, submodules],
  );

  return {
    attachmentsOpenBySubmoduleId,
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
      setAttachmentsOpenBySubmoduleId((current) => ({ ...current, [next.id]: false }));
      setTouched((current) => ({ ...current, submodules: { ...current.submodules, [next.id]: { title: false, description: false, content: false } } }));
    },
    removeSubmodule: (submoduleId: string) => {
      setSubmodules((items) => {
        const next = items.filter((item) => item.id !== submoduleId);
        return next.length > 0 ? next : [createEmptySubmodule()];
      });
      setAttachmentsOpenBySubmoduleId((current) => {
        const next = { ...current };
        delete next[submoduleId];
        return next;
      });
      setTouched((current) => {
        const next = { ...current.submodules };
        delete next[submoduleId];
        return { ...current, submodules: next };
      });
    },
    setSubmoduleTouched: (submoduleId: string, field: "title" | "description" | "content") => {
      setTouched((current) => ({ ...current, submodules: { ...current.submodules, [submoduleId]: { title: current.submodules[submoduleId]?.title ?? false, description: current.submodules[submoduleId]?.description ?? false, content: current.submodules[submoduleId]?.content ?? false, [field]: true } } }));
    },
    toggleSubmoduleAttachments: (submoduleId: string) => {
      setAttachmentsOpenBySubmoduleId((current) => ({ ...current, [submoduleId]: !current[submoduleId] }));
    },
    updateSubmodule: (submoduleId: string, field: "title" | "description" | "content", value: string) => {
      setSubmodules((items) => items.map((item) => item.id === submoduleId ? { ...item, [field]: value } : item));
    },
    addSubmoduleAttachedFile: (submoduleId: string, fileId: string) => {
      setSubmodules((items) => items.map((item) => item.id === submoduleId ? { ...item, attachedFileIds: item.attachedFileIds.includes(fileId) ? item.attachedFileIds : [...item.attachedFileIds, fileId] } : item));
      setAttachmentsOpenBySubmoduleId((current) => ({ ...current, [submoduleId]: true }));
    },
    removeSubmoduleAttachedFile: (submoduleId: string, fileId: string) => {
      setSubmodules((items) => items.map((item) => item.id === submoduleId ? { ...item, attachedFileIds: item.attachedFileIds.filter((id) => id !== fileId) } : item));
    },
  };
}
