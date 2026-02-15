import { Calendar, Clock, BookOpen, FileText, AlertCircle } from "lucide-react";
import { StatusBadge } from "../shared/StatusBadge";

interface AssignmentCardProps {
  title: string;
  courseName: string;
  dueDate: string;
  status: "pending" | "completed" | "overdue" | "draft";
  description: string;
  points: number;
  submittedDate?: string;
  grade?: number;
  type: "essay" | "quiz" | "project" | "homework";
}

export function AssignmentCard({
  title,
  courseName,
  dueDate,
  status,
  description,
  points,
  submittedDate,
  grade,
  type
}: AssignmentCardProps) {
  const isOverdue = status === "pending" && new Date(dueDate) < new Date();
  const actualStatus = isOverdue ? "overdue" : status;

  const getTypeIcon = () => {
    switch (type) {
      case "essay":
        return <FileText className="h-5 w-5 text-white" />;
      case "quiz":
        return <Clock className="h-5 w-5 text-white" />;
      case "project":
        return <BookOpen className="h-5 w-5 text-white" />;
      case "homework":
        return <FileText className="h-5 w-5 text-white" />;
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case "essay":
        return "from-[#FF715B] to-[#FF715B]/80";
      case "quiz":
        return "from-[#1EA896] to-[#1EA896]/80";
      case "project":
        return "from-[#4C5454] to-[#523F38]";
      case "homework":
        return "from-[#523F38] to-[#4C5454]";
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-6 hover:bg-white/10 hover:shadow-2xl transition-all duration-300 group">
      {/* Header with Status */}
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${getTypeColor()} rounded-xl flex items-center justify-center shadow-lg`}>
          {getTypeIcon()}
        </div>
        <StatusBadge status={actualStatus} />
      </div>

      {/* Assignment Details */}
      <div className="space-y-3 mb-4">
        <div>
          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-white/90 transition-colors">
            {title}
          </h3>
          <p className="text-[#1EA896] text-sm font-medium">{courseName}</p>
        </div>
        <p className="text-white/70 text-sm line-clamp-2">
          {description}
        </p>
      </div>

      {/* Assignment Metadata */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-white/60" />
          <span className="text-white/80 text-sm">
            Due {new Date(dueDate).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-white/60 text-sm font-medium">Points:</span>
          <span className="text-white/80 text-sm">{points}</span>
        </div>
      </div>

      {/* Footer with Grade/Status Info */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div className="text-xs text-white/60">
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </div>
        <div className="flex items-center space-x-2">
          {status === "completed" && grade !== undefined && (
            <span className="text-sm font-medium text-[#1EA896]">
              {grade}/{points}
            </span>
          )}
          {status === "completed" && submittedDate && (
            <span className="text-xs text-white/60">
              Submitted {new Date(submittedDate).toLocaleDateString()}
            </span>
          )}
          {actualStatus === "overdue" && (
            <div className="flex items-center space-x-1 text-red-400">
              <AlertCircle className="h-3 w-3" />
              <span className="text-xs">Overdue</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}