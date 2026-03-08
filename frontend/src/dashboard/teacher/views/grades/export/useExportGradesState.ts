// State hook for export grades list creation and import tracking.
import { useState } from "react";
import { buildNewGradeList, seedExportGradeLists } from "./exportGradesHelpers";

export function useExportGradesState() {
  const [gradeLists, setGradeLists] = useState(seedExportGradeLists);
  const [lastImportedFile, setLastImportedFile] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [activeNewListName, setActiveNewListName] = useState("");

  return {
    activeNewListName,
    createOpen,
    gradeLists,
    lastImportedFile,
    newListName,
    handleImportGrades: (file: File | null) => { if (file) setLastImportedFile(file.name); },
    submitCreate: () => {
      const title = newListName.trim();
      if (!title) return;
      setGradeLists((current) => [buildNewGradeList(title), ...current]);
      setActiveNewListName(title);
      setNewListName("");
      setCreateOpen(false);
    },
    setCreateOpen,
    setNewListName,
  };
}
