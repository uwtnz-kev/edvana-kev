// Coordinates quiz create state, draft restoration, and save behavior for the form shell.
import { useEffect, useMemo, useRef, useState, type ChangeEvent, type Dispatch, type SetStateAction } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createQuiz, seedClasses2, type QuizAttachment } from "@/dashboard/teacher/components/quiz";
import { clearCreateDraft as clearQuestionDraft, createQuestionBuilderDraftId } from "@/dashboard/teacher/components/questions/questionsStore";
import { getQuestionBuilderPersistenceValues, requiresQuestionBuilder, type SubmissionMethod } from "@/dashboard/teacher/components/shared/assessment/submissionMethods";
import { FIELD_IDS, allTouched, initialTouched, initialValues } from "./quizCreateConstants";
import { buildAttachmentId, buildErrors, canSaveQuiz, resolveFormValues } from "./quizCreateUtils";
import type { FieldName, QuizCreateLocationState, TeacherQuizCreateFormProps, TouchedState } from "./quizCreateTypes";

export function useTeacherQuizCreateForm({ onSaved, subjectId, subjectName }: Pick<TeacherQuizCreateFormProps, "onSaved" | "subjectId" | "subjectName">) {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = (location.state as QuizCreateLocationState | null) ?? null;
  const [questionDraftId] = useState(() => locationState?.questionDraftId?.trim() ? locationState.questionDraftId : createQuestionBuilderDraftId("quiz"));
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState(initialTouched);
  const [attachments, setAttachments] = useState<QuizAttachment[]>([]);
  const [isQuestionsPreviewOpen, setIsQuestionsPreviewOpen] = useState(false);
  const attachmentsInputRef = useRef<HTMLInputElement | null>(null);
  const previousQuestionCountRef = useRef(initialValues.totalQuestions);
  const errors = useMemo(() => buildErrors(values), [values]);

  useEffect(() => {
    if (!locationState?.questionDraftId?.trim()) clearQuestionDraft("quiz");
  }, [locationState?.questionDraftId]);

  useEffect(() => {
    setValues(resolveFormValues(locationState));
  }, [locationState]);

  const onFieldChange = (name: FieldName, value: string) => setValues((previous) => ({ ...previous, [name]: value }));
  const onFieldBlur = (name: FieldName) => setTouched((previous: TouchedState) => ({ ...previous, [name]: true }));
  const onSubmissionMethodsChange = (_methods: SubmissionMethod[]) => {
    const normalizedMethods: SubmissionMethod[] = ["quiz_form"];
    const nextRequiresBuilder = requiresQuestionBuilder(normalizedMethods);
    setValues((previous) => {
      const currentRequiresBuilder = requiresQuestionBuilder(previous.submissionMethods);
      if (currentRequiresBuilder && !nextRequiresBuilder && previous.totalQuestions !== "0") previousQuestionCountRef.current = previous.totalQuestions;
      return {
        ...previous,
        submissionMethods: normalizedMethods,
        totalQuestions: nextRequiresBuilder ? (previous.totalQuestions === "0" ? previousQuestionCountRef.current : previous.totalQuestions) : "0",
      };
    });
    setTouched((previous) => ({ ...previous, submissionMethods: true }));
  };

  const onClassChange = (classId: string) => {
    const selectedClass = seedClasses2.find((item) => item.id === classId) ?? null;
    setValues((previous) => ({ ...previous, classId, classLabel: selectedClass?.label ?? "" }));
    setTouched((previous) => ({ ...previous, classId: true }));
  };

  const onPickAttachments = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (!fileList?.length) return;
    const picked = Array.from(fileList).map((file) => ({ id: buildAttachmentId(), name: file.name, size: file.size, type: file.type, lastModified: file.lastModified }));
    setAttachments((previous) => [...previous, ...picked]);
    event.target.value = "";
  };

  const onSave = () => {
    if (!canSaveQuiz(errors)) return markInvalidFields(errors, setTouched);
    const dueDate = new Date(values.dueAt);
    const accessCode = values.accessCode.trim() || undefined;
    const maxScore = values.maxScore.trim() ? Number(values.maxScore.trim()) : undefined;
    const normalizedSubmissionMethods: SubmissionMethod[] = ["quiz_form"];
    const questionBuilderValues = getQuestionBuilderPersistenceValues(normalizedSubmissionMethods, values.questionsText, values.totalQuestions);
    createQuiz({ title: values.title.trim(), subject: subjectName, classId: values.classId, classLabel: values.classLabel, dueAt: Number.isNaN(dueDate.getTime()) ? new Date().toISOString() : dueDate.toISOString(), durationMinutes: Number(values.durationMinutes), totalAttempts: Number(values.totalAttempts), totalQuestions: questionBuilderValues.totalQuestions, status: "draft", submissionMethods: normalizedSubmissionMethods, instructions: values.instructions.trim(), questionsText: questionBuilderValues.questionsText, attachments: attachments.length ? attachments : undefined, rubric: values.rubric.trim() || undefined, maxScore: typeof maxScore === "number" && Number.isFinite(maxScore) ? maxScore : undefined, accessCode });
    clearQuestionDraft("quiz", questionDraftId);
    onSaved(subjectId);
  };

  return { attachments, attachmentsInputRef, errors, isQuestionsPreviewOpen, onClassChange, onFieldBlur, onFieldChange, onPickAttachments, onRemoveAttachment: (id: string) => setAttachments((previous) => previous.filter((item) => item.id !== id)), onClearAttachments: () => setAttachments([]), onOpenQuestionBuilder: () => { if (!requiresQuestionBuilder(values.submissionMethods)) return; navigate("/dashboard/teacher/questions/create?type=quiz", { state: { formDraft: values, originPath: `${location.pathname}${location.search}`, originState: location.state, parentType: "quiz", mode: "create", questionDraftId, subjectId } }); }, onSave, onSubmissionMethodsChange, requiresQuestionBuilder: requiresQuestionBuilder(values.submissionMethods), setIsQuestionsPreviewOpen, touched, values };
}

function markInvalidFields(errors: ReturnType<typeof buildErrors>, setTouched: Dispatch<SetStateAction<TouchedState>>) {
  setTouched(allTouched);
  const firstInvalid = (Object.keys(FIELD_IDS) as FieldName[]).find((field) => Boolean(errors[field]));
  document.getElementById(firstInvalid ? FIELD_IDS[firstInvalid] : "")?.scrollIntoView({ behavior: "smooth", block: "center" });
}
