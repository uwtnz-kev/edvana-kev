import { User, Clock, BookOpen, ArrowRight } from "lucide-react";

interface SubjectCardProps {
  title: string;
  description: string;
  instructor: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  duration: string;
  color: string;
  bgGradient: string;
}

export function SubjectCard({
  title,
  description,
  instructor,
  progress,
  totalLessons,
  completedLessons,
  duration,
  color,
  bgGradient
}: SubjectCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-6 hover:bg-white/10 hover:shadow-2xl transition-all duration-300 group">
      {/* Header with Subject Icon */}
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 ${bgGradient} rounded-xl flex items-center justify-center shadow-lg`}>
          <BookOpen className="h-6 w-6 text-white" />
        </div>
        <div className="text-right">
          <span className={`text-sm font-medium ${color}`}>{progress}% Complete</span>
          <div className="w-16 bg-white/20 rounded-full h-2 mt-1">
            <div 
              className={`h-2 rounded-full ${bgGradient} transition-all duration-300`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Subject Details */}
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-white/90 transition-colors">
        {title}
      </h3>
      <p className="text-white/70 text-sm mb-4 line-clamp-2">
        {description}
      </p>

      {/* Instructor and Metadata */}
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex items-center space-x-2">
          <User className="h-4 w-4 text-white/60" />
          <span className="text-white/80 text-sm">{instructor}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-white/60" />
          <span className="text-white/80 text-sm">{duration}</span>
        </div>
      </div>

      {/* Progress Details */}
      <div className="flex items-center justify-between">
        <div className="text-white/70 text-sm">
          {completedLessons} of {totalLessons} lessons
        </div>
        <button className={`flex items-center space-x-2 ${color} hover:opacity-80 transition-opacity group-hover:translate-x-1 transition-transform duration-200`}>
          <span className="text-sm font-medium">Continue</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}