// Orchestrates the modular teacher exam card sections.
import type { TeacherExam } from "../ExamsTypes";
import { TeacherExamCardActions } from "./TeacherExamCardActions";
import { TeacherExamCardHeader } from "./TeacherExamCardHeader";
import { TeacherExamCardMeta } from "./TeacherExamCardMeta";

type Props = {
  exam: TeacherExam;
  onDelete: (id: string) => void;
  onPreview: (id: string) => void;
  onPublish: (id: string) => void;
  onRepublish: (id: string) => void;
};

export function TeacherExamCard(props: Props) {
  return (
    <article className="group flex h-full w-full flex-col overflow-hidden rounded-2xl teacher-panel-surface teacher-panel-hover-lift">
      <div className="rounded-t-2xl border-b border-white/10 bg-white/5 p-3.5">
        <TeacherExamCardHeader exam={props.exam} />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-3.5">
        <TeacherExamCardMeta exam={props.exam} />
        <div className="mt-auto border-t border-white/10 pt-2.5">
          <TeacherExamCardActions
            exam={props.exam}
            onDelete={props.onDelete}
            onPreview={props.onPreview}
            onPublish={props.onPublish}
            onRepublish={() => props.onRepublish(props.exam.id)}
          />
        </div>
      </div>
    </article>
  );
}
