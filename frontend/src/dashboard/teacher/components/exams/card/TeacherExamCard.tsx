// Orchestrates the modular teacher exam card sections.
import { useState } from "react";
import { RepublishAssignmentModal } from "@/dashboard/teacher/components/assignments/republish/RepublishAssignmentModal";
import { getRepublishEligibleStudents } from "@/dashboard/teacher/components/assignments/republish/republishHelpers";
import type { RepublishAssignmentPayload } from "@/dashboard/teacher/components/assignments/republish/republishTypes";
import type { TeacherExam } from "../ExamsTypes";
import { TeacherExamCardActions } from "./TeacherExamCardActions";
import { TeacherExamCardHeader } from "./TeacherExamCardHeader";
import { TeacherExamCardMeta } from "./TeacherExamCardMeta";

type Props = {
  exam: TeacherExam;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onEdit: (id: string) => void;
  onPreview: (id: string) => void;
  onPublish: (id: string) => void;
};

export function TeacherExamCard(props: Props) {
  const [republishOpen, setRepublishOpen] = useState(false);
  const eligibleStudents = getRepublishEligibleStudents(props.exam);

  const handleRepublishConfirm = (payload: RepublishAssignmentPayload) => {
    console.info("Republish exam payload", { examId: props.exam.id, payload });
  };

  return (
    <article className="group teacher-panel-surface rounded-2xl p-4 space-y-4 teacher-panel-hover-lift">
      <TeacherExamCardHeader exam={props.exam} />
      <TeacherExamCardMeta exam={props.exam} />
      <TeacherExamCardActions
        exam={props.exam}
        onDelete={props.onDelete}
        onDuplicate={props.onDuplicate}
        onEdit={props.onEdit}
        onPreview={props.onPreview}
        onPublish={props.onPublish}
        onRepublish={() => setRepublishOpen(true)}
      />
      <RepublishAssignmentModal open={republishOpen} assignmentTitle={props.exam.title} assessmentLabel="exam" classLabel={props.exam.classLabel} eligibleStudents={eligibleStudents} onClose={() => setRepublishOpen(false)} onConfirm={handleRepublishConfirm} />
    </article>
  );
}

