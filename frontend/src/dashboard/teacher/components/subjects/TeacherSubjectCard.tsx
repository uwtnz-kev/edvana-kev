import { Users, ClipboardList, BookOpen, ArrowRight } from "lucide-react";

interface TeacherSubjectCardProps {
  title: string;
  description: string;
  classesCount: number;
  studentsCount: number;
  pendingToGrade: number;
  nextLesson: string;
  color: string;
  bgGradient: string;
}

export function TeacherSubjectCard({
  title,
  description,
  classesCount,
  studentsCount,
  pendingToGrade,
  nextLesson,
  color,
  bgGradient,
}: TeacherSubjectCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-6 hover:bg-white/10 hover:shadow-2xl transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 ${bgGradient} rounded-xl flex items-center justify-center shadow-lg`}>
          <BookOpen className="h-6 w-6 text-white" />
        </div>

        <div className="text-right">
          <span className={`text-sm font-medium ${color}`}>{pendingToGrade} pending</span>
          <div className="w-20 bg-white/20 rounded-full h-2 mt-1">
            <div
              className={`h-2 rounded-full ${bgGradient} transition-all duration-300`}
              style={{ width: `${Math.min(100, Math.max(10, pendingToGrade * 4))}%` }}
            />
          </div>
        </div>
      </div>

      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-white/90 transition-colors">
        {title}
      </h3>

      <p className="text-white/70 text-sm mb-4 line-clamp-2">{description}</p>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-white/60" />
          <span className="text-white/80 text-sm">{studentsCount} students</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-white/60 text-sm">Classes</span>
          <span className="text-white/80 text-sm">{classesCount}</span>
        </div>

        <div className="flex items-center gap-2">
          <ClipboardList className="h-4 w-4 text-white/60" />
          <span className="text-white/80 text-sm">{pendingToGrade} to grade</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-white/70 text-sm">
          Next lesson: <span className="text-white/90">{nextLesson}</span>
        </div>

        <button className={`flex items-center space-x-2 ${color} hover:opacity-80 transition-opacity group-hover:translate-x-1 transition-transform duration-200`}>
          <span className="text-sm font-medium">Open</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
