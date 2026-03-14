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

export function useSubjectViewState(initialSubjectId?: string | null, classId?: string | null) {
  const navigate = useNavigate();
  const location = useLocation();
  const [subjects] = useState<TeacherSubject2[]>(() => seedSubjects2);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(initialSubjectId ?? null);
  const selectedSubject = useMemo(() => subjects.find((subject) => subject.id === selectedSubjectId) ?? null, [subjects, selectedSubjectId]);

  useEffect(() => {
    setSelectedSubjectId(initialSubjectId ?? null);
  }, [initialSubjectId]);

  useEffect(() => {
    const state = location.state as SubjectViewRestoreState | null;
    if (state?.resetToHome) {
      setSelectedSubjectId(null);
      return void navigate(
        {
          pathname: location.pathname,
          search: location.search,
        },
        { replace: true, state: null },
      );
    }
    if (!state?.restoreSubjectId) return;
    const exists = subjects.some((subject) => subject.id === state.restoreSubjectId);
    setSelectedSubjectId(exists ? state.restoreSubjectId : null);
    navigate(
      {
        pathname: location.pathname,
        search: location.search,
      },
      { replace: true, state: null },
    );
  }, [location.pathname, location.search, location.state, navigate, subjects]);

  return {
    selectedSubject,
    selectedSubjectData: getSubjectWorkspaceData(selectedSubjectId),
    selectedSubjectId,
    selectedSubjectTheme: selectedSubject ? getSubjectThemeById(selectedSubject.id) : null,
    setSelectedSubjectId,
    sidebarActions: selectedSubject ? getSubjectSidebarActions(selectedSubject.id, classId) : [],
    subjects,
    onBack: () => setSelectedSubjectId(null),
  };
}
