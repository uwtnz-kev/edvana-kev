// Owns loading, per-question scoring, and save behavior for item submission details.
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getItemSubmission, getPublishedItemById, markSubmissionGraded, updateSubmissionScore, type TeacherGradeSubmission } from "@/dashboard/teacher/components/grades";
import { TEACHER_ROUTES } from "@/dashboard/teacher/routes";
import { getCalculatedTotal, getFinalScore, getNextSubmittedRoute, getSubmissionQuestions } from "./gradeSubmissionHelpers";

export function useGradeSubmissionState() {
  const navigate = useNavigate();
  const location = useLocation();
  const { itemId, submissionId } = useParams<{ itemId: string; submissionId: string }>();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const subjectId = searchParams.get("subjectId");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [submission, setSubmission] = useState<TeacherGradeSubmission | null>(() => itemId && submissionId ? getItemSubmission(itemId, submissionId) : null);
  const item = useMemo(() => (itemId ? getPublishedItemById(itemId) : null), [itemId]);
  const [questionScores, setQuestionScores] = useState<Record<string, string>>({});
  const [totalScore, setTotalScore] = useState("");
  const questions = useMemo(() => getSubmissionQuestions(submission), [submission]);

  useEffect(() => { setSubmission(itemId && submissionId ? getItemSubmission(itemId, submissionId) : null); }, [itemId, submissionId]);
  useEffect(() => {
    if (!submission) return void (setQuestionScores({}), setTotalScore(""));
    setQuestionScores(Object.fromEntries(questions.map((question) => [question.id, typeof question.earnedPoints === "number" ? String(question.earnedPoints) : ""])));
    setTotalScore(typeof submission.score === "number" ? String(submission.score) : "");
  }, [questions, submission]);

  const computedTotal = useMemo(() => getCalculatedTotal(questionScores, questions.map((question) => question.id)), [questionScores, questions]);

  return {
    computedTotal,
    feedback,
    item,
    itemId,
    location,
    questionScores,
    questions,
    submission,
    submissionId,
    totalScore,
    onSave: () => {
      if (!submission || !itemId) return;
      const final = getFinalScore(totalScore, computedTotal);
      if (!Number.isFinite(final) || final < 0 || final > submission.maxScore) return void setFeedback(`Total score must be between 0 and ${submission.maxScore}.`);
      const updated = updateSubmissionScore(submission.id, final);
      if (!updated) return void setFeedback("Unable to save score.");
      markSubmissionGraded(submission.id);
      navigate(getNextSubmittedRoute(itemId, type, subjectId));
    },
    setQuestionScore: (questionId: string, value: string) => setQuestionScores((current) => ({ ...current, [questionId]: value })),
    setTotalScore,
    goBack: () => itemId ? navigate(`${TEACHER_ROUTES.GRADES_WORKSPACE}/${itemId}${location.search}`) : undefined,
  };
}
