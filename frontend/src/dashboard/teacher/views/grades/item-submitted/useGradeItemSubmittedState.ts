// Owns route parsing, search state, and navigation for the submitted list view.
import { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  getItemSubmissions,
  getPublishedItemById,
  seedSubjects2,
  type TeacherGradeSelectionType,
} from "@/dashboard/teacher/components/grades";
import { TEACHER_ROUTES } from "@/dashboard/teacher/routes";
import { buildGradesWorkspaceRoute } from "../gradesViewHelpers";
import { getClassIdFromSearchParams } from "../../subjects/subjectClassRouting";

export function useGradeItemSubmittedState() {
  const navigate = useNavigate();
  const location = useLocation();
  const { itemId } = useParams<{ itemId: string }>();
  const query = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const type = query.get("type") as TeacherGradeSelectionType | null;
  const subjectId = query.get("subjectId");
  const routeClassId = getClassIdFromSearchParams(query);
  const [search, setSearch] = useState("");
  const item = useMemo(() => (itemId ? getPublishedItemById(itemId) : null), [itemId]);
  const subjectName = useMemo(
    () => seedSubjects2.find((subject) => subject.id === subjectId)?.name ?? "Unknown subject",
    [subjectId]
  );
  const submissions = useMemo(() => {
    if (!itemId) return [];
    return getItemSubmissions(itemId, "all", search, "all");
  }, [itemId, search]);

  return {
    item,
    itemId,
    search,
    setSearch,
    subjectName,
    submissions,
    type,
    backToWorkspace: () => navigate(buildGradesWorkspaceRoute(subjectId, type, routeClassId)),
    openNotSubmitted: () => navigate(`${TEACHER_ROUTES.GRADES_WORKSPACE}/${itemId}/not-submitted${location.search}`),
    openSubmission: (submissionId: string) =>
      navigate(`${TEACHER_ROUTES.GRADES_WORKSPACE}/${itemId}/submissions/${submissionId}${location.search}`),
  };
}
