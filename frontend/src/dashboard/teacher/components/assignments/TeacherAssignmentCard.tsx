import { Clock, Users, ArrowRight, ClipboardList } from "lucide-react";

interface TeacherAssignmentCardProps {
  title: string;
  classNameLabel: string;
  dueDate: string;
  submissions: number;
  totalStudents: number;
  status: "draft" | "active" | "grading";
  color: string;
  bgGradient: string;
}

export function TeacherAssignmentCard({
  title,
  classNameLabel,
  dueDate,
  submissions,
  totalStudents,
  status,
  color,
  bgGradient,
}: TeacherAssignmentCardProps) {
  const pct = totalStudents === 0 ? 0 : Math.round((submissions / totalStudents) * 100);

  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-6 hover:bg-white/10 hover:shadow-2xl transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 ${bgGradient} rounded-xl flex items-center justify-center shadow-lg`}>
          <ClipboardList className="h-6 w-6 text-white" />
        </div>

        <div className="text-right">
          <span className={`text-sm font-medium ${color}`}>{status.toUpperCase()}</span>
          <div className="w-20 bg-white/20 rounded-full h-2 mt-1">
            <div
              className={`h-2 rounded-full ${bgGradient} transition-all duration-300`}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>

      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-white/90 transition-colors">
        {title}
      </h3>

      <p className="text-white/70 text-sm mb-4">
        {classNameLabel}
      </p>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-white/60" />
          <span className="text-white/80 text-sm">
            {submissions}/{totalStudents} submitted
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-white/60" />
          <span className="text-white/80 text-sm">
            Due {new Date(dueDate).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-white/70 text-sm">{pct}% submission rate</div>
        <button className={`flex items-center space-x-2 ${color} hover:opacity-80 transition-opacity group-hover:translate-x-1 transition-transform duration-200`}>
          <span className="text-sm font-medium">Open</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
