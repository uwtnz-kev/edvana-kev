// Owns form state, validation, question-builder integration, and save actions for quiz editing.
import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { seedClasses2, updateQuiz, type QuizAttachment, type TeacherQuiz } from "@/dashboard/teacher/components/quiz";
import { clearQuestionsForBuilder, ensureQuestionsForBuilderFromText, getQuestionsTextForBuilder } from "@/dashboard/teacher/components/questions/questionsStore";
import { getSubjectIdByName } from "@/dashboard/teacher/components/shared/subjectTheme";
import { getQuestionBuilderPersistenceValues, requiresQuestionBuilder, type SubmissionMethod } from "@/dashboard/teacher/components/shared/assessment/submissionMethods";
import type { FieldName, TouchedState } from "../create/quizCreateTypes";
import { FIELD_IDS, initialTouched, mapFilesToQuizAttachments, toInitialQuizEditValues } from "./quizEditHelpers";
import { canSaveQuizEdit, getQuizEditErrors } from "./quizEditValidation";

type Props = { onSaved: () => void; quiz: TeacherQuiz };

export function useTeacherQuizEditForm({ onSaved, quiz }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [values, setValues] = useState(() => toInitialQuizEditValues(quiz));
  const [touched, setTouched] = useState<TouchedState>(initialTouched);
  const [attachments, setAttachments] = useState<QuizAttachment[]>(() => [...(quiz.attachments ?? [])]);
  const [isQuestionsPreviewOpen, setIsQuestionsPreviewOpen] = useState(false);
  const attachmentsInputRef = useRef<HTMLInputElement | null>(null);
  const previousQuestionCountRef = useRef(String(quiz.totalQuestions || 10));
  const errors = useMemo(() => getQuizEditErrors(values), [values]);

  useEffect(() => {
    const routeState = location.state as { questionsText?: string; questionsTextFromBuilder?: string } | null;
    const fromBuilder = routeState?.questionsText ?? routeState?.questionsTextFromBuilder;
    if (typeof fromBuilder === "string") return void setValues((current) => ({ ...current, questionsText: fromBuilder }));
    const savedText = getQuestionsTextForBuilder("quiz", quiz.id);
    if (savedText.trim().length > 0) setValues((current) => current.questionsText.trim().length > 0 ? current : { ...current, questionsText: savedText });
  }, [location.state, quiz.id]);

  const scrollToFirstError = () => {
    const firstInvalidField = (Object.keys(FIELD_IDS) as FieldName[]).find((field) => Boolean(errors[field]));
    if (!firstInvalidField) return;
    document.getElementById(FIELD_IDS[firstInvalidField])?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return {
    attachments,
    attachmentsInputRef,
    errors,
    isQuestionsPreviewOpen,
    touched,
    values,
    closeQuestionsPreview: () => setIsQuestionsPreviewOpen(false),
    onClassChange: (nextClassId: string) => {
      const selectedClass = seedClasses2.find((item) => item.id === nextClassId) ?? null;
      setValues((current) => ({ ...current, classId: nextClassId, classLabel: selectedClass?.label ?? "" }));
      setTouched((current) => ({ ...current, classId: true }));
    },
    onFieldBlur: (name: FieldName) => setTouched((current) => ({ ...current, [name]: true })),
    onFieldChange: (name: FieldName, value: string) => setValues((current) => ({ ...current, [name]: value })),
    onSubmissionMethodsChange: (methods: SubmissionMethod[]) => {
      const nextRequiresBuilder = requiresQuestionBuilder(methods);
      setValues((current) => {
        const currentRequiresBuilder = requiresQuestionBuilder(current.submissionMethods);
        if (currentRequiresBuilder && !nextRequiresBuilder && current.totalQuestions !== "0") previousQuestionCountRef.current = current.totalQuestions;
        return {
          ...current,
          submissionMethods: methods,
          totalQuestions: nextRequiresBuilder ? (current.totalQuestions === "0" ? previousQuestionCountRef.current : current.totalQuestions) : "0",
        };
      });
      setTouched((current) => ({ ...current, submissionMethods: true }));
    },
    onOpenQuestionBuilder: () => {
      if (!requiresQuestionBuilder(values.submissionMethods)) return;
      ensureQuestionsForBuilderFromText("quiz", quiz.id, values.questionsText);
      navigate(`/dashboard/teacher/questions/edit/${quiz.id}?type=quiz`, { state: { originPath: `${location.pathname}${location.search}`, originState: location.state, parentType: "quiz", mode: "edit", itemId: quiz.id, subjectId: getSubjectIdByName(quiz.subject) ?? undefined } });
    },
    onPickAttachments: (event: ChangeEvent<HTMLInputElement>) => {
      const fileList = event.target.files;
      if (!fileList || fileList.length === 0) return;
      setAttachments((current) => [...current, ...mapFilesToQuizAttachments(fileList)]);
      event.target.value = "";
    },
    onRemoveAttachment: (id: string) => setAttachments((current) => current.filter((attachment) => attachment.id !== id)),
    onClearAttachments: () => setAttachments([]),
    onSave: () => {
      if (!canSaveQuizEdit(errors)) {
        setTouched({ title: true, instructions: true, questionsText: true, dueAt: true, classId: true, classLabel: true, accessCode: true, durationMinutes: true, totalAttempts: true, totalQuestions: true, submissionMethods: true, rubric: true, maxScore: true });
        scrollToFirstError();
        return;
      }
      const dueDate = new Date(values.dueAt);
      const accessCode = values.accessCode.trim().length > 0 ? values.accessCode.trim() : undefined;
      const maxScore = values.maxScore.trim().length > 0 ? Number(values.maxScore.trim()) : undefined;
      const questionBuilderValues = getQuestionBuilderPersistenceValues(values.submissionMethods, values.questionsText, values.totalQuestions);
      if (!requiresQuestionBuilder(values.submissionMethods)) clearQuestionsForBuilder("quiz", quiz.id);
      const updated = updateQuiz(quiz.id, { title: values.title.trim(), classId: values.classId, classLabel: values.classLabel, dueAt: Number.isNaN(dueDate.getTime()) ? quiz.dueAt : dueDate.toISOString(), durationMinutes: Number(values.durationMinutes), totalAttempts: Number(values.totalAttempts), totalQuestions: questionBuilderValues.totalQuestions, submissionMethods: values.submissionMethods, instructions: values.instructions.trim(), questionsText: questionBuilderValues.questionsText, attachments: attachments.length > 0 ? attachments : undefined, rubric: values.rubric.trim() || undefined, maxScore: typeof maxScore === "number" && Number.isFinite(maxScore) ? maxScore : undefined, accessCode });
      if (updated) onSaved();
    },
    openQuestionsPreview: () => setIsQuestionsPreviewOpen(true),
    requiresQuestionBuilder: requiresQuestionBuilder(values.submissionMethods),
    showError: (name: FieldName) => touched[name] && Boolean(errors[name]),
  };
}
