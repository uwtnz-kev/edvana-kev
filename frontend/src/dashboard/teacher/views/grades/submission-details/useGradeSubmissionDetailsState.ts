// State hook for grade submission details loading, scoring, and save actions.
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getGradeSubmissionById, updateSubmissionScore, type TeacherGradeSubmission } from "@/dashboard/teacher/components/grades";
import { getSubjectThemeById } from "@/dashboard/teacher/components/shared";
import { TEACHER_ROUTES } from "@/dashboard/teacher/routes";
import { getCalculatedTotal, getEffectiveTotal, getSubmissionQuestions } from "./gradeSubmissionDetailsHelpers";

export function useGradeSubmissionDetailsState() {
  const navigate = useNavigate();
  const location = useLocation();
  const { submissionId } = useParams<{ submissionId: string }>();
  const [feedback, setFeedback] = useState<string | null>(null);
  const [submission, setSubmission] = useState<TeacherGradeSubmission | null>(() => (submissionId ? getGradeSubmissionById(submissionId) : null));
  const [questionScores, setQuestionScores] = useState<Record<string, string>>({});
  const [manualTotal, setManualTotal] = useState("");

  useEffect(() => { setSubmission(submissionId ? getGradeSubmissionById(submissionId) : null); }, [submissionId]);
  const theme = useMemo(() => getSubjectThemeById(submission?.subjectId ?? ""), [submission?.subjectId]);
  const questions = useMemo(() => getSubmissionQuestions(submission), [submission]);

  useEffect(() => {
    if (!submission) return void (setQuestionScores({}), setManualTotal(""));
    const initialScores = Object.fromEntries(questions.map((question) => [question.id, typeof question.earnedPoints === "number" ? String(question.earnedPoints) : ""]));
    setQuestionScores(initialScores);
    setManualTotal(typeof submission.score === "number" ? String(submission.score) : "");
  }, [questions, submission]);

  const calculatedTotal = useMemo(() => getCalculatedTotal(questionScores, questions.map((question) => question.id)), [questionScores, questions]);
  const effectiveTotal = useMemo(() => getEffectiveTotal(manualTotal, calculatedTotal), [calculatedTotal, manualTotal]);

  return {
    calculatedTotal,
    effectiveTotal,
    feedback,
    manualTotal,
    questionScores,
    questions,
    submission,
    theme,
    backToSubmissions: () => navigate(`${TEACHER_ROUTES.GRADES_SUBMISSIONS}${location.search}`),
    saveGrade: () => {
      if (!submission) return;
      if (!Number.isFinite(effectiveTotal) || effectiveTotal < 0 || effectiveTotal > submission.maxScore) return void setFeedback(`Total score must be between 0 and ${submission.maxScore}.`);
      const updated = updateSubmissionScore(submission.id, effectiveTotal);
      if (!updated) return void setFeedback("Unable to save grade.");
      setSubmission(updated);
      setFeedback("Grade saved.");
    },
    setManualTotal,
    setQuestionScore: (questionId: string, value: string) => setQuestionScores((current) => ({ ...current, [questionId]: value })),
  };
}
