// Manages question builder edit state, origin routing, and save/cancel behavior.
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getSubjectTheme } from "@/dashboard/teacher/components/shared/subjectTheme";
import {
  buildQuestionsText,
  createEmptyQuestion,
  ensureQuestionsForBuilder,
  getQuestionsForBuilder,
  saveQuestionsForBuilder,
  type QuestionBuilderQuestion,
} from "@/dashboard/teacher/components/questions/questionsStore";
import { getEditBackRoute, getEditBuilderTitle, parseAssessmentType } from "./questionBuilderHelpers";
import { hasUnsavedQuestionChanges } from "./questionBuilderValidation";

type BuilderOriginState = { itemId?: string; mode?: "create" | "edit"; originPath?: string; originState?: unknown; parentType?: "quiz" | "assignment" | "exam"; subjectId?: string };

export function useQuestionBuilderState() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams<{ itemId: string }>();
  const [searchParams] = useSearchParams();
  const itemId = params.itemId ?? "";
  const selectedType = parseAssessmentType(searchParams.get("type"));
  useEffect(() => { if (!itemId || !selectedType) navigate("/dashboard/teacher/overview", { replace: true }); }, [itemId, navigate, selectedType]);
  const originState = (location.state as BuilderOriginState | null) ?? null;
  const subjectId = originState?.subjectId ?? searchParams.get("subjectId") ?? "";
  const theme = getSubjectTheme(subjectId);
  const existingQuestions = selectedType ? getQuestionsForBuilder(selectedType, itemId) : [];
  const seededQuestions = selectedType ? (existingQuestions.length > 0 ? existingQuestions : ensureQuestionsForBuilder(selectedType, itemId)) : [];
  const [questions, setQuestions] = useState<QuestionBuilderQuestion[]>(seededQuestions);
  const [isBackConfirmOpen, setIsBackConfirmOpen] = useState(false);
  const initialSnapshotRef = useRef(JSON.stringify(seededQuestions));
  const totalPoints = useMemo(() => questions.reduce((sum, question) => sum + question.points, 0), [questions]);
  const hasUnsavedChanges = useMemo(() => hasUnsavedQuestionChanges(questions, initialSnapshotRef.current), [questions]);

  const navigateToOrigin = (payload?: Record<string, unknown>) => {
    if (!selectedType) return;
    const resolvedOriginPath = originState?.originPath?.trim() ? originState.originPath : getEditBackRoute(selectedType, itemId);
    const baseState = originState?.originState && typeof originState.originState === "object" ? originState.originState as Record<string, unknown> : {};
    navigate(resolvedOriginPath, { state: { ...baseState, ...(payload ?? {}) } });
  };

  return {
    isBackConfirmOpen,
    questions,
    selectedType,
    setIsBackConfirmOpen,
    theme,
    title: selectedType ? getEditBuilderTitle(selectedType) : "",
    totalPoints,
    addQuestion: () => selectedType ? setQuestions((current) => [...current, createEmptyQuestion(selectedType, itemId)]) : undefined,
    handleBackClick: () => hasUnsavedChanges ? setIsBackConfirmOpen(true) : navigateToOrigin(),
    handleConfirmBack: () => { setIsBackConfirmOpen(false); navigateToOrigin(); },
    moveQuestion: (questionId: string, direction: -1 | 1) => setQuestions((current) => moveQuestion(current, questionId, direction)),
    removeQuestion: (questionId: string) => setQuestions((current) => current.filter((question) => question.id !== questionId)),
    saveQuestions: () => {
      if (!selectedType) return;
      const savedQuestions = saveQuestionsForBuilder(selectedType, questions, itemId);
      const questionsText = buildQuestionsText(savedQuestions);
      navigateToOrigin({ questionsTextFromBuilder: questionsText, questionsText, questionsUpdatedAt: Date.now() });
    },
    updateQuestion: (questionId: string, updater: (question: QuestionBuilderQuestion) => QuestionBuilderQuestion) => setQuestions((current) => current.map((question) => question.id === questionId ? updater(question) : question)),
  };
}

// Reorders a question without mutating the previous array reference.
function moveQuestion(questions: QuestionBuilderQuestion[], questionId: string, direction: -1 | 1) {
  const index = questions.findIndex((question) => question.id === questionId);
  if (index < 0) return questions;
  const nextIndex = index + direction;
  if (nextIndex < 0 || nextIndex >= questions.length) return questions;
  const next = [...questions];
  const [item] = next.splice(index, 1);
  next.splice(nextIndex, 0, item);
  return next;
}
