// Manages item-level submissions state, tab filtering, and inline score editing.
import { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getSubjectTheme } from "@/dashboard/teacher/components/shared/subjectTheme";
import {
  getClassRosterByClass,
  getItemSubmissions,
  getNotSubmittedStudents,
  getPublishedItemById,
  markSubmissionGraded,
  seedSubjects2,
  type TeacherGradeSelectionType,
  type TeacherGradeSubmission,
  updateSubmissionScore,
} from "@/dashboard/teacher/components/grades";
import { TEACHER_ROUTES } from "@/dashboard/teacher/routes";
import { buildGradesWorkspaceRoute } from "../gradesViewHelpers";

export function useGradeItemSubmissionsState() {
  const navigate = useNavigate();
  const location = useLocation();
  const { itemId } = useParams<{ itemId: string }>();
  const query = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const type = query.get("type") as TeacherGradeSelectionType | null;
  const subjectId = query.get("subjectId");
  const item = useMemo(() => (itemId ? getPublishedItemById(itemId) : null), [itemId]);
  const subjectName = useMemo(() => seedSubjects2.find((subject) => subject.id === subjectId)?.name ?? "Unknown subject", [subjectId]);
  const subjectTheme = useMemo(() => getSubjectTheme(subjectId ?? ""), [subjectId]);
  const lockedClass = item?.className ?? "";
  const [search, setSearch] = useState(""); const [activeTab, setActiveTab] = useState<"submitted" | "not-submitted">("submitted"); const [version, setVersion] = useState(0); const [editingSubmissionId, setEditingSubmissionId] = useState<string | null>(null); const [editingScore, setEditingScore] = useState(""); const [editingError, setEditingError] = useState<string | null>(null);
  const submittedRows = useMemo(() => !itemId || !lockedClass ? [] : getItemSubmissions(itemId, lockedClass, search, "all"), [itemId, lockedClass, search, version]);
  const notSubmittedRows = useMemo(() => !itemId ? [] : getNotSubmittedStudents(itemId, search), [itemId, search, version]);
  const allSubmissions = useMemo(() => !itemId ? [] : getItemSubmissions(itemId, "all", "", "all"), [itemId, version]);
  const classRoster = useMemo(() => !lockedClass ? [] : getClassRosterByClass(lockedClass), [lockedClass]);
  return {
    activeTab, editingError, editingScore, editingSubmissionId, item, itemId, notSubmittedRows, search, subjectName, subjectTheme, submittedCount: allSubmissions.filter((s) => s.status === "submitted" || s.status === "graded").length, submittedRows, type, notSubmittedCount: Math.max(classRoster.length - allSubmissions.length, 0),
    backToWorkspace: () => navigate(buildGradesWorkspaceRoute(subjectId, type)),
    openDetails: (submissionId: string) => navigate(`${TEACHER_ROUTES.GRADES_WORKSPACE}/${itemId}/submissions/${submissionId}${location.search}`),
    setActiveTab,
    setEditingError,
    setEditingScore,
    setSearch,
    startEditing: (submission: TeacherGradeSubmission) => { setEditingSubmissionId(submission.id); setEditingScore(typeof submission.score === "number" ? String(submission.score) : ""); setEditingError(null); },
    stopEditing: () => { setEditingSubmissionId(null); setEditingScore(""); setEditingError(null); },
    submitScoreUpdate: (submission: TeacherGradeSubmission) => { const parsed = Number(editingScore); if (!Number.isFinite(parsed) || parsed < 0 || parsed > submission.maxScore) { setEditingError(`Score must be between 0 and ${submission.maxScore}.`); return; } if (!updateSubmissionScore(submission.id, parsed)) { setEditingError("Unable to save score."); return; } markSubmissionGraded(submission.id); setEditingSubmissionId(null); setEditingScore(""); setEditingError(null); setVersion((current) => current + 1); },
  };
}
