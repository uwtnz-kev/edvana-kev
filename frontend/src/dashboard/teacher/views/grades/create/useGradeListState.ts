// Manages create grade list state, workspace sync, validation, and submission flow.
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SUBJECT_CLASS_MAP, loadGradesWorkspace, saveGradesWorkspace, seedSubjects2, type TeacherGradeAssessmentType } from "@/dashboard/teacher/components/grades";
import { useStudents } from "@/dashboard/teacher/components/students";
import { getSubjectThemeById } from "@/dashboard/teacher/components/shared";
import { getCreateGradeListTitle, getCreateState, isSelectionType, toSelectionType } from "./gradeListHelpers";
import { getBackRoute, saveGradeListRecord } from "./gradeListSubmission";
import { buildRowErrors, hasValidMaxScore } from "./gradeListValidation";
import type { GradeRowDraft } from "./gradeListTypes";
import { buildGradesTypeSelectionRoute } from "../gradesViewHelpers";
import { getClassIdFromSearchParams } from "../../subjects/subjectClassRouting";

export function useGradeListState() {
  const navigate = useNavigate(); const location = useLocation(); const { students } = useStudents();
  const createState = getCreateState(location.state); const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]); const querySubjectId = useMemo(() => searchParams.get("subjectId") ?? undefined, [searchParams]); const queryType = useMemo(() => { const value = searchParams.get("type"); return value && isSelectionType(value) ? value : undefined; }, [searchParams]); const routeClassId = useMemo(() => getClassIdFromSearchParams(searchParams), [searchParams]); const workspace = useMemo(() => loadGradesWorkspace(), []);
  const stateGradeType = toSelectionType(createState?.gradeType) ?? toSelectionType(createState?.type); const lockedAssessmentType = stateGradeType ?? queryType ?? workspace.selectedGradeType ?? null; const subjectId = createState?.subjectId ?? querySubjectId ?? workspace.selectedSubjectId ?? "";
  const [classId, setClassId] = useState(""); const [assessmentType, setAssessmentType] = useState<Exclude<TeacherGradeAssessmentType, "all"> | "">(lockedAssessmentType ?? ""); const [title, setTitle] = useState(""); const [date, setDate] = useState(""); const [maxScore, setMaxScore] = useState(""); const [rowsByStudentId, setRowsByStudentId] = useState<Record<string, GradeRowDraft>>({}); const [isSubmitted, setIsSubmitted] = useState(false);
  const selectedSubject = useMemo(() => seedSubjects2.find((subject) => subject.id === subjectId) ?? null, [subjectId]); const iconTheme = useMemo(() => getSubjectThemeById(selectedSubject?.id ?? ""), [selectedSubject?.id]);

  useEffect(() => { const currentWorkspace = loadGradesWorkspace(); if (!subjectId) { navigate(routeClassId ? `/dashboard/teacher/grades?classId=${encodeURIComponent(routeClassId)}` : "/dashboard/teacher/grades", { replace: true }); return; } if (!currentWorkspace.selectedSubjectId) { saveGradesWorkspace({ ...currentWorkspace, selectedSubjectId: subjectId, selectedGradeType: currentWorkspace.selectedGradeType ?? lockedAssessmentType }); return; } if (!currentWorkspace.selectedGradeType && lockedAssessmentType) saveGradesWorkspace({ ...currentWorkspace, selectedGradeType: lockedAssessmentType }); }, [lockedAssessmentType, navigate, routeClassId, subjectId]);
  useEffect(() => { if (subjectId && !lockedAssessmentType) navigate(routeClassId ? `/dashboard/teacher/grades?classId=${encodeURIComponent(routeClassId)}` : "/dashboard/teacher/grades", { replace: true }); }, [lockedAssessmentType, navigate, routeClassId, subjectId]);
  useEffect(() => { if (subjectId && !selectedSubject) navigate(buildGradesTypeSelectionRoute(subjectId, routeClassId), { replace: true }); }, [navigate, routeClassId, selectedSubject, subjectId]);

  const classOptions = useMemo(() => { if (!selectedSubject) return []; const subjectClasses = SUBJECT_CLASS_MAP[selectedSubject.name] ?? []; if (subjectClasses.length > 0) return [...subjectClasses].sort(); return Array.from(new Set(students.map((student) => student.class))).sort(); }, [selectedSubject, students]);
  const classStudents = useMemo(() => !classId ? [] : students.filter((student) => student.class === classId), [classId, students]);
  const effectiveAssessmentType = lockedAssessmentType ?? assessmentType; const headerTitle = getCreateGradeListTitle(lockedAssessmentType); const parsedMaxScore = Number(maxScore); const validMaxScore = hasValidMaxScore(parsedMaxScore); const rowErrors = useMemo(() => buildRowErrors(classStudents, rowsByStudentId, parsedMaxScore), [classStudents, parsedMaxScore, rowsByStudentId]);
  const hasFormErrors = !subjectId || !classId || !effectiveAssessmentType || !title.trim() || !date || !validMaxScore || classStudents.length === 0 || Object.keys(rowErrors).length > 0;
  const backRoute = getBackRoute(subjectId, effectiveAssessmentType, routeClassId);

  return {
    assessmentType, backRoute, classId, classOptions, classStudents, date, effectiveAssessmentType, hasFormErrors, headerTitle, iconTheme, isSubmitted, lockedAssessmentType, maxScore, parsedMaxScore, rowErrors, rowsByStudentId, selectedSubject, subjectId, title, validMaxScore,
    backToGrades: () => navigate(backRoute),
    saveGradeList: () => { setIsSubmitted(true); if (hasFormErrors || !effectiveAssessmentType) return; saveGradeListRecord({ subjectId, classId, title, assessmentType: effectiveAssessmentType, date, maxScore: parsedMaxScore, classStudents, rowsByStudentId }); navigate(backRoute); },
    setAssessmentType,
    setClassId,
    setDate,
    setMaxScore,
    setTitle,
    updateRow: (studentId: string, score: string) => setRowsByStudentId((previous) => ({ ...previous, [studentId]: { score } })),
  };
}
