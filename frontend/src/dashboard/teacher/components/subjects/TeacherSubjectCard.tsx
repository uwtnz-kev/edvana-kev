// Orchestrates the teacher subject card using focused card subcomponents.
import { useNavigate } from "react-router-dom";
import { getSubjectThemeById } from "@/dashboard/teacher/components/shared";
import { SubjectCardActions } from "./card/SubjectCardActions";
import { SubjectCardHeader } from "./card/SubjectCardHeader";
import { SubjectCardMeta } from "./card/SubjectCardMeta";

export type TeacherSubjectNavData = {
  id: number | string;
  name: string;
  title: string;
  description: string;
  classesCount: number;
  studentsCount: number;
  pendingToGrade: number;
  nextLesson: string;
  color: string;
  bgGradient: string;
  category?: string;
};

interface TeacherSubjectCardProps {
  subject: TeacherSubjectNavData;
}

export function TeacherSubjectCard({ subject }: TeacherSubjectCardProps) {
  const navigate = useNavigate();
  const theme = getSubjectThemeById(String(subject.id));

  return (
    <div
      className="
        relative overflow-hidden
        bg-white/5 backdrop-blur-lg
        border border-white/10
        rounded-2xl shadow-xl p-6
        transition-all duration-300 ease-out
        hover:bg-white/10
        hover:shadow-2xl
        hover:-translate-y-1.5
        hover:scale-[1.02]
        hover:border-white/20
        group will-change-transform
      "
    >
      <SubjectCardHeader subject={subject} theme={theme} />
      <SubjectCardMeta subject={subject} />
      <SubjectCardActions
        nextLesson={subject.nextLesson}
        onOpen={() =>
          navigate("/dashboard/teacher/subjects", {
            state: { restoreSubjectId: subject.id, subject },
          })
        }
        subjectColor={subject.color}
      />
    </div>
  );
}
