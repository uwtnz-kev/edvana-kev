// Owns route parsing, search state, and navigation for the not-submitted list view.
import { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  getNotSubmittedStudents,
  getPublishedItemById,
  seedSubjects2,
  type TeacherGradeSelectionType,
} from "@/dashboard/teacher/components/grades";
import { TEACHER_ROUTES } from "@/dashboard/teacher/routes";
import { buildGradesWorkspaceRoute } from "../gradesViewHelpers";

export function useGradeItemNotSubmittedState() {
  const navigate = useNavigate();
  const location = useLocation();
  const { itemId } = useParams<{ itemId: string }>();
  const query = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const type = query.get("type") as TeacherGradeSelectionType | null;
  const subjectId = query.get("subjectId");
  const [search, setSearch] = useState("");
  const item = useMemo(() => (itemId ? getPublishedItemById(itemId) : null), [itemId]);
  const subjectName = useMemo(
    () => seedSubjects2.find((subject) => subject.id === subjectId)?.name ?? "Unknown subject",
    [subjectId]
  );
  const notSubmitted = useMemo(() => {
    if (!itemId) return [];
    return getNotSubmittedStudents(itemId, search);
  }, [itemId, search]);

  return {
    item,
    itemId,
    notSubmitted,
    search,
    setSearch,
    subjectName,
    type,
    backToWorkspace: () => navigate(buildGradesWorkspaceRoute(subjectId, type)),
    openSubmitted: () => navigate(`${TEACHER_ROUTES.GRADES_WORKSPACE}/${itemId}/submitted${location.search}`),
  };
}
