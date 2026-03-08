// State hook for subject selection and restore-route behavior.
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { seedSubjects2, type TeacherSubject2 } from "@/dashboard/teacher/components/assignments";
import { getSubjectThemeById } from "@/dashboard/teacher/components/shared";
import {
  getSubjectSidebarActions,
  getSubjectWorkspaceData,
  type SubjectViewRestoreState,
} from "./subjectViewHelpers";

export function useSubjectViewState() {
  const navigate = useNavigate();
  const location = useLocation();
  const [subjects] = useState<TeacherSubject2[]>(() => seedSubjects2);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const selectedSubject = useMemo(() => subjects.find((subject) => subject.id === selectedSubjectId) ?? null, [subjects, selectedSubjectId]);

  useEffect(() => {
    const state = location.state as SubjectViewRestoreState | null;
    if (state?.resetToHome) {
      setSelectedSubjectId(null);
      return void navigate(".", { replace: true, state: null });
    }
    if (!state?.restoreSubjectId) return;
    const exists = subjects.some((subject) => subject.id === state.restoreSubjectId);
    setSelectedSubjectId(exists ? state.restoreSubjectId : null);
    navigate(".", { replace: true, state: null });
  }, [location.state, navigate, subjects]);

  return {
    selectedSubject,
    selectedSubjectData: getSubjectWorkspaceData(selectedSubjectId),
    selectedSubjectId,
    selectedSubjectTheme: selectedSubject ? getSubjectThemeById(selectedSubject.id) : null,
    setSelectedSubjectId,
    sidebarActions: selectedSubject ? getSubjectSidebarActions(selectedSubject.id) : [],
    subjects,
    onBack: () => setSelectedSubjectId(null),
  };
}
