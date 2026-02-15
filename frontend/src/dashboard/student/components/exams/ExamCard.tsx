import { Clock, FileText, Calendar, CheckCircle, AlertCircle, PlayCircle } from "lucide-react";
import { StatusBadge } from "../shared/StatusBadge";

interface ExamCardProps {
  title: string;
  description: string;
  timeLimit: number; // in minutes
  questionsCount: number;
  status: "upcoming" | "active" | "completed";
  dueDate: string;
  subject: string;
  score?: number;
  color: string;
  bgGradient: string;
}

export function ExamCard({
  title,
  description,
  timeLimit,
  questionsCount,
  status,
  dueDate,
  subject,
  score,
  color,
  bgGradient
}: ExamCardProps) {
  const isOverdue = status === "upcoming" && new Date(dueDate) < new Date();

  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-6 hover:bg-white/10 hover:shadow-2xl transition-all duration-300 group">
      {/* Header with Status Badge */}
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 ${bgGradient} rounded-xl flex items-center justify-center shadow-lg`}>
          <FileText className="h-6 w-6 text-white" />
        </div>
        <div className="flex flex-col items-end space-y-2">
          <StatusBadge status={status} />
          {isOverdue && (
            <StatusBadge status="overdue" />
          )}
        </div>
      </div>

      {/* Exam Details */}
      <div className="space-y-3 mb-4">
        <div>
          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-white/90 transition-colors">
            {title}
          </h3>
          <p className="text-[#1EA896] text-sm font-medium">{subject}</p>
        </div>
        <p className="text-white/70 text-sm line-clamp-2">
          {description}
        </p>
      </div>

      {/* Exam Metadata */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-white/60" />
          <span className="text-white/80 text-sm">{timeLimit} min</span>
        </div>
        <div className="flex items-center space-x-2">
          <FileText className="h-4 w-4 text-white/60" />
          <span className="text-white/80 text-sm">{questionsCount} questions</span>
        </div>
      </div>

      {/* Due Date and Score */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div>
          <p className="text-white/60 text-xs">Due Date</p>
          <p className="text-white text-sm font-medium">{dueDate}</p>
        </div>
        {status === "completed" && score !== undefined ? (
          <div className="text-right">
            <p className="text-white/60 text-xs">Score</p>
            <p className={`text-lg font-bold ${score >= 80 ? 'text-[#1EA896]' : score >= 60 ? 'text-[#FF715B]' : 'text-red-400'}`}>
              {score}%
            </p>
          </div>
        ) : (
          <button className={`px-4 py-2 rounded-lg ${bgGradient} text-white text-sm font-medium hover:opacity-80 transition-opacity group-hover:scale-105 transition-transform duration-200`}>
            {status === "active" ? "Continue" : "Start Exam"}
          </button>
        )}
      </div>
    </div>
  );
}