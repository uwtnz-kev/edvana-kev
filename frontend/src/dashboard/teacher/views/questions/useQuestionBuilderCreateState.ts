// Manages question builder create state, origin routing, and save/cancel behavior.
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { getSubjectTheme } from "@/dashboard/teacher/components/shared/subjectTheme";
import {
  buildQuestionsText,
  createEmptyQuestion,
  createQuestionBuilderDraftId,
  getQuestionsForBuilder,
  saveQuestionsForBuilder,
  type QuestionBuilderAssessmentType,
  type QuestionBuilderQuestion,
} from "@/dashboard/teacher/components/questions/questionsStore";
import { getBuilderTitle, getCreateBackRoute, parseAssessmentType } from "@/dashboard/teacher/components/questions/helpers/questionBuilderHelpers";
import { hasUnsavedQuestionChanges } from "@/dashboard/teacher/components/questions/helpers/questionBuilderValidation";

type BuilderOriginState = {
  formDraft?: Record<string, unknown>;
  originPath?: string;
  originState?: unknown;
  questionDraftId?: string;
  subjectId?: string;
};

export function useQuestionBuilderCreateState() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const selectedType = parseAssessmentType(searchParams.get("type"));
  useEffect(() => { if (!selectedType) navigate("/dashboard/teacher/overview", { replace: true }); }, [navigate, selectedType]);
  const originState = (location.state as BuilderOriginState | null) ?? null;
  const subjectId = originState?.subjectId ?? searchParams.get("subjectId") ?? "";
  const theme = getSubjectTheme(subjectId);
  const formDraft = originState?.formDraft && typeof originState.formDraft === "object" ? originState.formDraft : undefined;
  const questionDraftId = originState?.questionDraftId?.trim() ? originState.questionDraftId : createQuestionBuilderDraftId(selectedType ?? "quiz");
  const seededQuestions = useMemo(() => {
    if (!selectedType) return [];
    const existing = getQuestionsForBuilder(selectedType, questionDraftId);
    return existing.length > 0 ? existing : [createEmptyQuestion(selectedType, questionDraftId)];
  }, [questionDraftId, selectedType]);
  const [questions, setQuestions] = useState<QuestionBuilderQuestion[]>(seededQuestions);
  const [isBackConfirmOpen, setIsBackConfirmOpen] = useState(false);
  const initialSnapshotRef = useRef(JSON.stringify(seededQuestions));
  const totalPoints = useMemo(() => questions.reduce((sum, question) => sum + question.points, 0), [questions]);
  const hasUnsavedChanges = useMemo(() => hasUnsavedQuestionChanges(questions, initialSnapshotRef.current), [questions]);

  const navigateToOrigin = (payload?: Record<string, unknown>) => {
    if (!selectedType) return;
    const resolvedOriginPath = originState?.originPath?.trim() ? originState.originPath : getCreateBackRoute(selectedType);
    const baseState = originState?.originState && typeof originState.originState === "object" ? originState.originState as Record<string, unknown> : {};
    navigate(resolvedOriginPath, { state: { ...baseState, ...(formDraft ? { formDraft } : {}), questionDraftId, ...(payload ?? {}) } });
  };

  return {
    hasUnsavedChanges,
    isBackConfirmOpen,
    questionDraftId,
    questions,
    selectedType,
    setIsBackConfirmOpen,
    theme,
    title: selectedType ? getBuilderTitle(selectedType) : "",
    totalPoints,
    addQuestion: () => selectedType ? setQuestions((current) => [...current, createEmptyQuestion(selectedType, questionDraftId)]) : undefined,
    handleBackClick: () => hasUnsavedChanges ? setIsBackConfirmOpen(true) : navigateToOrigin(),
    handleConfirmBack: () => { setIsBackConfirmOpen(false); navigateToOrigin(); },
    moveQuestion: (questionId: string, direction: -1 | 1) => setQuestions((current) => moveQuestion(current, questionId, direction)),
    removeQuestion: (questionId: string) => setQuestions((current) => current.filter((question) => question.id !== questionId)),
    saveQuestions: () => {
      if (!selectedType) return;
      const savedQuestions = saveQuestionsForBuilder(selectedType, questions, questionDraftId);
      const questionsText = buildQuestionsText(savedQuestions);
      navigateToOrigin({ ...(formDraft ? { formDraft } : {}), questionDraftId, questionsTextFromBuilder: questionsText, questionsText, questionsUpdatedAt: Date.now() });
    },
    updateQuestion: (questionId: string, updater: (question: QuestionBuilderQuestion) => QuestionBuilderQuestion) => setQuestions((current) => current.map((question) => question.id === questionId ? updater(question) : question)),
  };
}

// Reorders a question without mutating the previous array reference.
function moveQuestion(
  questions: QuestionBuilderQuestion[],
  questionId: string,
  direction: -1 | 1
) {
  const index = questions.findIndex((question) => question.id === questionId);
  if (index < 0) return questions;
  const nextIndex = index + direction;
  if (nextIndex < 0 || nextIndex >= questions.length) return questions;
  const next = [...questions];
  const [item] = next.splice(index, 1);
  next.splice(nextIndex, 0, item);
  return next;
}
