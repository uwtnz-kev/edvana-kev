// Coordinates assignment create state, draft restoration, and save behavior.
import { useEffect, useMemo, useRef, useState, type ChangeEvent, type Dispatch, type SetStateAction } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createAssignment, seedClasses2, type AssignmentAttachment } from "@/dashboard/teacher/components/assignments";
import { clearCreateDraft as clearQuestionDraft, createQuestionBuilderDraftId } from "@/dashboard/teacher/components/questions/questionsStore";
import { FIELD_IDS, allTouched, initialTouched, initialValues } from "./assignmentCreateConstants";
import { buildAttachmentId, buildErrors, canSaveAssignment, resolveFormValues } from "./assignmentCreateUtils";
import type { AssignmentCreateLocationState, FieldName, TeacherAssignmentCreateFormProps, TouchedState } from "./assignmentCreateTypes";

export function useTeacherAssignmentCreateForm({ onSaved, subjectId, subjectName }: Pick<TeacherAssignmentCreateFormProps, "onSaved" | "subjectId" | "subjectName">) {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = (location.state as AssignmentCreateLocationState | null) ?? null;
  const [questionDraftId] = useState(() => locationState?.questionDraftId?.trim() ? locationState.questionDraftId : createQuestionBuilderDraftId("assignment"));
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState(initialTouched);
  const [attachments, setAttachments] = useState<AssignmentAttachment[]>([]);
  const [isQuestionsPreviewOpen, setIsQuestionsPreviewOpen] = useState(false);
  const attachmentsInputRef = useRef<HTMLInputElement | null>(null);
  const errors = useMemo(() => buildErrors(values), [values]);

  useEffect(() => {
    if (!locationState?.questionDraftId?.trim()) clearQuestionDraft("assignment");
  }, [locationState?.questionDraftId]);

  useEffect(() => {
    setValues(resolveFormValues(locationState));
  }, [locationState]);

  const onFieldChange = (name: FieldName, value: string) => setValues((prev) => ({ ...prev, [name]: value }));
  const onFieldBlur = (name: FieldName) => setTouched((prev: TouchedState) => ({ ...prev, [name]: true }));

  const onClassChange = (classId: string) => {
    const selectedClass = seedClasses2.find((item) => item.id === classId) ?? null;
    setValues((prev) => ({ ...prev, classId, classLabel: selectedClass?.label ?? "" }));
    setTouched((prev) => ({ ...prev, classId: true }));
  };

  const onPickAttachments = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (!fileList?.length) return;
    const picked = Array.from(fileList).map((file) => ({ id: buildAttachmentId(), name: file.name, size: file.size, type: file.type, lastModified: file.lastModified }));
    setAttachments((prev) => [...prev, ...picked]);
    event.target.value = "";
  };

  const onSave = () => {
    if (!canSaveAssignment(errors)) return markInvalidFields(errors, setTouched);
    const dueDate = new Date(values.dueAt);
    const maxScore = values.maxScore.trim() ? Number(values.maxScore.trim()) : undefined;
    createAssignment({ title: values.title.trim(), subject: subjectName, classId: values.classId, classLabel: values.classLabel, dueAt: Number.isNaN(dueDate.getTime()) ? new Date().toISOString() : dueDate.toISOString(), status: "draft", totalQuestions: Number(values.totalQuestions), totalSubmissions: 0, pendingToGrade: 0, estimatedMinutes: Number(values.estimatedMinutes), instructions: values.instructions.trim(), questionsText: values.questionsText.trim() || undefined, attachments: attachments.length ? attachments : undefined, rubric: values.rubric.trim() || undefined, maxScore: typeof maxScore === "number" && Number.isFinite(maxScore) ? maxScore : undefined });
    clearQuestionDraft("assignment", questionDraftId);
    onSaved(subjectId);
  };

  return { attachments, attachmentsInputRef, errors, isQuestionsPreviewOpen, onClassChange, onFieldBlur, onFieldChange, onPickAttachments, onRemoveAttachment: (id: string) => setAttachments((prev) => prev.filter((item) => item.id !== id)), onClearAttachments: () => setAttachments([]), onOpenQuestionBuilder: () => navigate("/dashboard/teacher/questions/create?type=assignment", { state: { formDraft: values, originPath: `${location.pathname}${location.search}`, originState: location.state, parentType: "assignment", mode: "create", questionDraftId, subjectId } }), onSave, setIsQuestionsPreviewOpen, touched, values };
}

// Marks all invalid fields as touched and scrolls the earliest invalid input into view.
function markInvalidFields(errors: ReturnType<typeof buildErrors>, setTouched: Dispatch<SetStateAction<TouchedState>>) {
  setTouched(allTouched);
  const firstInvalid = (Object.keys(FIELD_IDS) as FieldName[]).find((field) => Boolean(errors[field]));
  document.getElementById(firstInvalid ? FIELD_IDS[firstInvalid] : "")?.scrollIntoView({ behavior: "smooth", block: "center" });
}
