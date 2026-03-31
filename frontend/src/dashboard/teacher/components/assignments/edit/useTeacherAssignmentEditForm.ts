/** Manages assignment edit form state, question sync, and save behavior. */
import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { seedClasses2, updateAssignment, type AssignmentAttachment } from "@/dashboard/teacher/components/assignments";
import { clearQuestionsForBuilder, ensureQuestionsForBuilderFromText, getQuestionsTextForBuilder } from "@/dashboard/teacher/components/questions/questionsStore";
import { getSubjectIdByName } from "@/dashboard/teacher/components/shared/subjectTheme";
import { getQuestionBuilderPersistenceValues, requiresQuestionBuilder, type SubmissionMethod } from "@/dashboard/teacher/components/shared/assessment/submissionMethods";
import { ALL_TOUCHED, buildAttachmentId, FIELD_IDS, INITIAL_TOUCHED, toInitialValues } from "./assignmentEditHelpers";
import { buildAssignmentEditErrors, canSaveAssignmentEdit } from "./assignmentEditValidation";
import type { FieldName, TeacherAssignmentEditFormProps, TouchedState } from "./assignmentEditTypes";

export function useTeacherAssignmentEditForm({ assignment, onSaved }: Pick<TeacherAssignmentEditFormProps, "assignment" | "onSaved">) {
  const navigate = useNavigate();
  const location = useLocation();
  const [values, setValues] = useState(() => toInitialValues(assignment));
  const [touched, setTouched] = useState<TouchedState>(INITIAL_TOUCHED);
  const [attachments, setAttachments] = useState<AssignmentAttachment[]>(() => [...(assignment.attachments ?? [])]);
  const [isQuestionsPreviewOpen, setIsQuestionsPreviewOpen] = useState(false);
  const attachmentsInputRef = useRef<HTMLInputElement | null>(null);
  const previousQuestionCountRef = useRef(String(assignment.totalQuestions || 10));
  const errors = useMemo(() => buildAssignmentEditErrors(values), [values]);

  useEffect(() => {
    const routeState = (location.state as { questionsText?: string; questionsTextFromBuilder?: string } | null) ?? null;
    const fromBuilder = routeState?.questionsText ?? routeState?.questionsTextFromBuilder;
    if (typeof fromBuilder === "string") return void setValues((prev) => ({ ...prev, questionsText: fromBuilder }));
    const savedText = getQuestionsTextForBuilder("assignment", assignment.id);
    if (savedText.trim()) setValues((prev) => (prev.questionsText.trim() ? prev : { ...prev, questionsText: savedText }));
  }, [assignment.id, location.state]);

  const onFieldChange = (name: FieldName, value: string) => setValues((prev) => ({ ...prev, [name]: value }));
  const onFieldBlur = (name: FieldName) => setTouched((prev) => ({ ...prev, [name]: true }));
  const showError = (name: FieldName) => touched[name] && Boolean(errors[name]);
  const onSubmissionMethodsChange = (methods: SubmissionMethod[]) => {
    const nextRequiresBuilder = requiresQuestionBuilder(methods);
    setValues((prev) => {
      const currentRequiresBuilder = requiresQuestionBuilder(prev.submissionMethods);
      if (currentRequiresBuilder && !nextRequiresBuilder && prev.totalQuestions !== "0") previousQuestionCountRef.current = prev.totalQuestions;
      return {
        ...prev,
        submissionMethods: methods,
        totalQuestions: nextRequiresBuilder ? (prev.totalQuestions === "0" ? previousQuestionCountRef.current : prev.totalQuestions) : "0",
      };
    });
    setTouched((prev) => ({ ...prev, submissionMethods: true }));
  };

  const onClassChange = (classId: string) => {
    const selectedClass = seedClasses2.find((item) => item.id === classId) ?? null;
    setValues((prev) => ({ ...prev, classId, classLabel: selectedClass?.label ?? "" }));
    setTouched((prev) => ({ ...prev, classId: true }));
  };

  const onPickAttachments = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return;
    const picked = Array.from(event.target.files).map((file) => ({ id: buildAttachmentId(), name: file.name, size: file.size, type: file.type, lastModified: file.lastModified }));
    setAttachments((prev) => [...prev, ...picked]);
    event.target.value = "";
  };

  const onSave = () => {
    if (!canSaveAssignmentEdit(errors)) return markInvalidFields(errors, setTouched);
    const dueDate = new Date(values.dueAt);
    const accessCode = values.accessCode.trim() || undefined;
    const maxScore = values.maxScore.trim() ? Number(values.maxScore.trim()) : undefined;
    const questionBuilderValues = getQuestionBuilderPersistenceValues(values.submissionMethods, values.questionsText, values.totalQuestions);
    if (!requiresQuestionBuilder(values.submissionMethods)) clearQuestionsForBuilder("assignment", assignment.id);
    const updated = updateAssignment(assignment.id, { title: values.title.trim(), classId: values.classId, classLabel: values.classLabel, dueAt: Number.isNaN(dueDate.getTime()) ? assignment.dueAt : dueDate.toISOString(), totalAttempts: Number(values.totalAttempts), totalQuestions: questionBuilderValues.totalQuestions, submissionMethods: values.submissionMethods, instructions: values.instructions.trim(), questionsText: questionBuilderValues.questionsText, attachments: attachments.length ? attachments : undefined, rubric: values.rubric.trim() || undefined, maxScore: typeof maxScore === "number" && Number.isFinite(maxScore) ? maxScore : undefined, accessCode });
    if (updated) onSaved();
  };

  return { attachments, attachmentsInputRef, errors, isQuestionsPreviewOpen, onClassChange, onFieldBlur, onFieldChange, onOpenQuestionBuilder: () => { if (!requiresQuestionBuilder(values.submissionMethods)) return; ensureQuestionsForBuilderFromText("assignment", assignment.id, values.questionsText); navigate(`/dashboard/teacher/questions/edit/${assignment.id}?type=assignment`, { state: { originPath: `${location.pathname}${location.search}`, originState: location.state, parentType: "assignment", mode: "edit", itemId: assignment.id, subjectId: getSubjectIdByName(assignment.subject) ?? undefined } }); }, onPickAttachments, onRemoveAttachment: (id: string) => setAttachments((prev) => prev.filter((item) => item.id !== id)), onClearAttachments: () => setAttachments([]), onSave, onSubmissionMethodsChange, requiresQuestionBuilder: requiresQuestionBuilder(values.submissionMethods), setIsQuestionsPreviewOpen, showError, touched, values };
}

// Marks invalid fields and scrolls the earliest failing input into view.
function markInvalidFields(errors: ReturnType<typeof buildAssignmentEditErrors>, setTouched: React.Dispatch<React.SetStateAction<TouchedState>>) {
  setTouched(ALL_TOUCHED);
  const firstInvalid = (Object.keys(FIELD_IDS) as FieldName[]).find((field) => Boolean(errors[field]));
  document.getElementById(firstInvalid ? FIELD_IDS[firstInvalid] : "")?.scrollIntoView({ behavior: "smooth", block: "center" });
}

