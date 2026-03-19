// Manages submissions workspace state, filters, and inline score editing.
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  listGradeSubmissions,
  loadGradesWorkspace,
  seedSubjects2,
  type TeacherGradeSelectionType,
  type TeacherGradeSubmission,
  type TeacherSubmissionStatus,
  updateSubmissionScore,
} from "@/dashboard/teacher/components/grades";
import { getSubjectThemeById } from "@/dashboard/teacher/components/shared";
import { TEACHER_ROUTES } from "@/dashboard/teacher/routes";
import { isSelectionType } from "./gradeSubmissionsHelpers";
import { buildGradesTypeSelectionRoute } from "../gradesViewHelpers";
import { getClassIdFromSearchParams } from "../../subjects/subjectClassRouting";

export function useGradeSubmissionsState() {
  const navigate = useNavigate(); const location = useLocation(); const workspace = useMemo(() => loadGradesWorkspace(), []); const [subjects] = useState(() => seedSubjects2);
  const query = useMemo(() => new URLSearchParams(location.search), [location.search]); const queryType = query.get("type"); const querySubjectId = query.get("subjectId"); const routeClassId = getClassIdFromSearchParams(query);
  const selectedGradeType = queryType && isSelectionType(queryType) ? queryType : workspace.selectedGradeType; const selectedSubjectId = querySubjectId ?? workspace.selectedSubjectId;
  const [classValue, setClassValue] = useState("all"); const [search, setSearch] = useState(""); const [status, setStatus] = useState<"all" | TeacherSubmissionStatus>("all"); const [version, setVersion] = useState(0); const [editingSubmissionId, setEditingSubmissionId] = useState<string | null>(null); const [editingScore, setEditingScore] = useState(""); const [editingError, setEditingError] = useState<string | null>(null);
  useEffect(() => { if (!selectedGradeType) navigate(routeClassId ? `${TEACHER_ROUTES.GRADES}?classId=${encodeURIComponent(routeClassId)}` : TEACHER_ROUTES.GRADES, { replace: true }); }, [navigate, routeClassId, selectedGradeType]);
  const selectedSubject = useMemo(() => subjects.find((subject) => subject.id === selectedSubjectId) ?? null, [selectedSubjectId, subjects]); const theme = useMemo(() => getSubjectThemeById(selectedSubjectId ?? ""), [selectedSubjectId]);
  const submissions = useMemo(() => listGradeSubmissions({ selectedGradeType, subjectId: selectedSubjectId, classValue, search, status }), [classValue, search, selectedGradeType, selectedSubjectId, status, version]);
  const classOptions = useMemo(() => { if (!selectedGradeType || !selectedSubjectId) return [{ value: "all", label: "All classes" }]; const subjectSubmissions = listGradeSubmissions({ selectedGradeType, subjectId: selectedSubjectId, classValue: "all", search: "", status: "all" }); const classes = Array.from(new Set(subjectSubmissions.map((item) => item.className))).sort(); return [{ value: "all", label: "All classes" }, ...classes.map((value) => ({ value, label: value }))]; }, [selectedGradeType, selectedSubjectId, version]);
  return {
    classOptions, classValue, editingError, editingScore, editingSubmissionId, search, selectedGradeType, selectedSubject, status, submissions, theme,
    backToWorkspace: () => navigate(buildGradesTypeSelectionRoute(querySubjectId, routeClassId), {
      state: querySubjectId ? { restoreSubjectId: querySubjectId } : null,
    }),
    openDetails: (submissionId: string) => { const params = new URLSearchParams(location.search); const base = `${TEACHER_ROUTES.GRADES_SUBMISSIONS}/${submissionId}`; navigate(params.toString() ? `${base}?${params.toString()}` : base); },
    startEditing: (submission: TeacherGradeSubmission) => { setEditingSubmissionId(submission.id); setEditingScore(typeof submission.score === "number" ? String(submission.score) : ""); setEditingError(null); },
    stopEditing: () => { setEditingSubmissionId(null); setEditingScore(""); setEditingError(null); },
    submitScoreUpdate: (submission: TeacherGradeSubmission) => { const parsed = Number(editingScore); if (!Number.isFinite(parsed)) { setEditingError("Enter a valid score."); return; } if (parsed < 0 || parsed > submission.maxScore) { setEditingError(`Score must be between 0 and ${submission.maxScore}.`); return; } if (!updateSubmissionScore(submission.id, parsed)) { setEditingError("Unable to save score."); return; } setEditingSubmissionId(null); setEditingScore(""); setEditingError(null); setVersion((current) => current + 1); },
    setClassValue,
    setEditingError,
    setEditingScore,
    setSearch,
    setStatus,
  };
}
