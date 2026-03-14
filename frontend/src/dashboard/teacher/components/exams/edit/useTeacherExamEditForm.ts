// Owns exam edit form state, validation, question-builder integration, and save actions.
import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { seedClasses2, updateExam, type ExamAttachment, type TeacherExam } from "@/dashboard/teacher/components/exams";
import { clearQuestionsForBuilder, ensureQuestionsForBuilderFromText, getQuestionsTextForBuilder } from "@/dashboard/teacher/components/questions/questionsStore";
import { getSubjectIdByName } from "@/dashboard/teacher/components/shared/subjectTheme";
import { getQuestionBuilderPersistenceValues, requiresQuestionBuilder, type SubmissionMethod } from "@/dashboard/teacher/components/shared/assessment/submissionMethods";
import type { FieldName, TouchedState } from "../create/examCreateTypes";
import { FIELD_IDS, initialTouched, mapFilesToExamAttachments, toInitialExamEditValues } from "./examEditHelpers";
import { canSaveExamEdit, getExamEditErrors } from "./examEditValidation";

type Props = { exam: TeacherExam; onSaved: () => void };

export function useTeacherExamEditForm({ exam, onSaved }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [values, setValues] = useState(() => toInitialExamEditValues(exam));
  const [touched, setTouched] = useState<TouchedState>(initialTouched);
  const [attachments, setAttachments] = useState<ExamAttachment[]>(() => [...(exam.attachments ?? [])]);
  const [isQuestionsPreviewOpen, setIsQuestionsPreviewOpen] = useState(false);
  const attachmentsInputRef = useRef<HTMLInputElement | null>(null);
  const previousQuestionCountRef = useRef(String(exam.totalQuestions || 10));
  const errors = useMemo(() => getExamEditErrors(values), [values]);

  useEffect(() => {
    const routeState = location.state as { questionsText?: string; questionsTextFromBuilder?: string } | null;
    const fromBuilder = routeState?.questionsText ?? routeState?.questionsTextFromBuilder;
    if (typeof fromBuilder === "string") return void setValues((current) => ({ ...current, questionsText: fromBuilder }));
    const savedText = getQuestionsTextForBuilder("exam", exam.id);
    if (savedText.trim().length > 0) setValues((current) => current.questionsText.trim().length > 0 ? current : { ...current, questionsText: savedText });
  }, [location.state, exam.id]);

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
      ensureQuestionsForBuilderFromText("exam", exam.id, values.questionsText);
      navigate(`/dashboard/teacher/questions/edit/${exam.id}?type=exam`, { state: { originPath: `${location.pathname}${location.search}`, originState: location.state, parentType: "exam", mode: "edit", itemId: exam.id, subjectId: getSubjectIdByName(exam.subject) ?? undefined } });
    },
    onPickAttachments: (event: ChangeEvent<HTMLInputElement>) => {
      const fileList = event.target.files;
      if (!fileList || fileList.length === 0) return;
      setAttachments((current) => [...current, ...mapFilesToExamAttachments(fileList)]);
      event.target.value = "";
    },
    onRemoveAttachment: (id: string) => setAttachments((current) => current.filter((attachment) => attachment.id !== id)),
    onClearAttachments: () => setAttachments([]),
    onSave: () => {
      if (!canSaveExamEdit(errors)) {
        setTouched({ title: true, instructions: true, questionsText: true, scheduledAt: true, classId: true, classLabel: true, accessCode: true, durationMinutes: true, totalAttempts: true, totalQuestions: true, submissionMethods: true, rubric: true, maxScore: true });
        scrollToFirstError();
        return;
      }
      const scheduledAtDate = new Date(values.scheduledAt);
      const accessCode = values.accessCode.trim().length > 0 ? values.accessCode.trim() : undefined;
      const maxScore = values.maxScore.trim().length > 0 ? Number(values.maxScore.trim()) : undefined;
      const questionBuilderValues = getQuestionBuilderPersistenceValues(values.submissionMethods, values.questionsText, values.totalQuestions);
      if (!requiresQuestionBuilder(values.submissionMethods)) clearQuestionsForBuilder("exam", exam.id);
      const updated = updateExam(exam.id, { title: values.title.trim(), classId: values.classId, classLabel: values.classLabel, scheduledAt: Number.isNaN(scheduledAtDate.getTime()) ? exam.scheduledAt : scheduledAtDate.toISOString(), durationMinutes: Number(values.durationMinutes), totalAttempts: Number(values.totalAttempts), totalQuestions: questionBuilderValues.totalQuestions, submissionMethods: values.submissionMethods, instructions: values.instructions.trim(), questionsText: questionBuilderValues.questionsText, attachments: attachments.length > 0 ? attachments : undefined, rubric: values.rubric.trim() || undefined, maxScore: typeof maxScore === "number" && Number.isFinite(maxScore) ? maxScore : undefined, accessCode });
      if (updated) onSaved();
    },
    openQuestionsPreview: () => setIsQuestionsPreviewOpen(true),
    requiresQuestionBuilder: requiresQuestionBuilder(values.submissionMethods),
    showError: (name: FieldName) => touched[name] && Boolean(errors[name]),
  };
}
