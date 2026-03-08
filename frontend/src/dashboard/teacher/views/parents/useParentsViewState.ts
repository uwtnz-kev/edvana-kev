// State hook for the teacher parents workspace and restore-route flow.
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { ParentRecord } from "@/utils/data/parents/parentsStore";
import {
  getTeacherParentDetails,
  getTeacherParents,
  type TeacherParentRow,
} from "@/utils/data/teacher/getTeacherParents";
import { seedSubjects2, type TeacherSubject2 } from "@/dashboard/teacher/components/assignments";
import {
  getFilteredParentRows,
  getParentClasses,
  getSubjectParentRows,
  type ParentsRestoreState,
} from "./parentsViewHelpers";

export function useParentsViewState() {
  const navigate = useNavigate();
  const location = useLocation();
  const [rows, setRows] = useState<TeacherParentRow[]>([]);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<ParentRecord | null>(null);
  const [selectedClass, setSelectedClass] = useState("all");
  const [subjects] = useState<TeacherSubject2[]>(() => seedSubjects2);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const selectedSubject = useMemo(() => {
    return subjects.find((subject) => subject.id === selectedSubjectId) ?? null;
  }, [subjects, selectedSubjectId]);

  const refreshRows = () => getTeacherParents().then(setRows);
  const resetWorkspaceState = () => void (setQuery(""), setOpen(false), setSelected(null), setSelectedClass("all"));

  useEffect(() => void refreshRows(), []);

  useEffect(() => {
    const state = location.state as ParentsRestoreState | null;
    if (state?.resetToHome) {
      setSelectedSubjectId(null);
      resetWorkspaceState();
      return void refreshRows().then(() => navigate(".", { replace: true, state: null }));
    }
    if (!state?.restoreSubjectId) return;
    const exists = subjects.some((subject) => subject.id === state.restoreSubjectId);
    setSelectedSubjectId(exists ? state.restoreSubjectId : null);
    setOpen(false);
    setSelected(null);
    refreshRows().then(() => navigate(".", { replace: true, state: null }));
  }, [location.state, navigate, subjects]);

  const subjectRows = useMemo(() => getSubjectParentRows(selectedSubject?.name ?? null, rows), [rows, selectedSubject?.name]);
  const filteredRows = useMemo(() => getFilteredParentRows(subjectRows, query, selectedClass), [query, selectedClass, subjectRows]);

  return {
    classes: getParentClasses(subjectRows),
    filteredRows,
    open,
    query,
    selected,
    selectedClass,
    selectedSubject,
    selectedSubjectId,
    setOpen,
    setQuery,
    setSelectedClass,
    setSelectedSubjectId,
    stats: { totalParents: subjectRows.length },
    subjects,
    handleBack: () => void (setSelectedSubjectId(null), resetWorkspaceState()),
    handleView: async (parentId: string) => {
      const details = await getTeacherParentDetails(parentId);
      setSelected(details);
      setOpen(true);
    },
  };
}
