// Orchestrates the modular teacher exam card sections.
import type { TeacherExam } from "../examsTypes";
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
  return (
    <article className="group bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl p-4 space-y-4 transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:bg-white/20">
      <TeacherExamCardHeader exam={props.exam} />
      <TeacherExamCardMeta exam={props.exam} />
      <TeacherExamCardActions
        exam={props.exam}
        onDelete={props.onDelete}
        onDuplicate={props.onDuplicate}
        onEdit={props.onEdit}
        onPreview={props.onPreview}
        onPublish={props.onPublish}
      />
    </article>
  );
}
