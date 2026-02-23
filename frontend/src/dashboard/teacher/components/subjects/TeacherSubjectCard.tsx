import { Users, ClipboardList, BookOpen, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export type TeacherSubjectNavData = {
  id: number | string;
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

  const handleOpen = () => {
    navigate(`/dashboard/teacher/subjects/${subject.id}`, {
      state: { subject },
    });
  };

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
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-12 h-12 ${subject.bgGradient} rounded-xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110`}
        >
          <BookOpen className="h-6 w-6 text-white" />
        </div>

        <div className="text-right">
          <span className={`text-sm font-medium ${subject.color}`}>
            {subject.pendingToGrade} pending
          </span>
          <div className="w-20 bg-white/20 rounded-full h-2 mt-1">
            <div
              className={`h-2 rounded-full ${subject.bgGradient} transition-all duration-300`}
              style={{
                width: `${Math.min(100, Math.max(10, subject.pendingToGrade * 4))}%`,
              }}
            />
          </div>
        </div>
      </div>

      <h3 className="text-xl font-bold text-white mb-2 transition-colors duration-200 group-hover:text-white/90">
        {subject.title}
      </h3>

      <p className="text-white/70 text-sm mb-4 line-clamp-2">
        {subject.description}
      </p>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-white/60" />
          <span className="text-white/80 text-sm">
            {subject.studentsCount} students
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-white/60 text-sm">Classes</span>
          <span className="text-white/80 text-sm">{subject.classesCount}</span>
        </div>

        <div className="flex items-center gap-2">
          <ClipboardList className="h-4 w-4 text-white/60" />
          <span className="text-white/80 text-sm">
            {subject.pendingToGrade} to grade
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-white/70 text-sm">
          Next lesson: <span className="text-white/90">{subject.nextLesson}</span>
        </div>

        <button
          type="button"
          onClick={handleOpen}
          className={`
            inline-flex items-center gap-2
            px-3 py-2 rounded-lg
            ${subject.color}
            border border-current
            text-sm font-medium
            transition-all duration-200
            hover:bg-white/10 hover:-translate-y-0.5
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30
          `}
        >
          <span>Open</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}