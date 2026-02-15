import { Clock, Target, TrendingUp } from "lucide-react";

interface WeeklyProgressProps {
  lessonsGoal?: number;
  lessonsCompleted?: number;
  gradingGoal?: number;
  gradingCompleted?: number;
}

export function WeeklyProgress({
  lessonsGoal = 12,
  lessonsCompleted = 8,
  gradingGoal = 25,
  gradingCompleted = 14,
}: WeeklyProgressProps) {
  const lessonsPct = Math.round((lessonsCompleted / lessonsGoal) * 100);
  const gradingPct = Math.round((gradingCompleted / gradingGoal) * 100);

  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Weekly Progress</h2>
        <div className="flex items-center space-x-2 text-[#1EA896]">
          <TrendingUp className="h-5 w-5" />
          <span className="text-sm font-medium">On track</span>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-[#FF715B]" />
              <span className="text-white font-medium">Lessons</span>
            </div>
            <span className="text-white/70 text-sm">
              {lessonsCompleted}/{lessonsGoal} lessons
            </span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-[#FF715B] to-[#FF715B]/80 h-3 rounded-full shadow-lg transition-all duration-300"
              style={{ width: `${Math.min(lessonsPct, 100)}%` }}
            />
          </div>
          <p className="text-white/60 text-xs mt-2">{lessonsPct}% completed</p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-[#1EA896]" />
              <span className="text-white font-medium">Grading</span>
            </div>
            <span className="text-white/70 text-sm">
              {gradingCompleted}/{gradingGoal} items
            </span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-[#1EA896] to-[#1EA896]/80 h-3 rounded-full shadow-lg transition-all duration-300"
              style={{ width: `${Math.min(gradingPct, 100)}%` }}
            />
          </div>
          <p className="text-white/60 text-xs mt-2">{gradingPct}% completed</p>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-white/10">
        <p className="text-white/70 text-sm text-center">
          Keep it up. Your week is progressing well.
        </p>
      </div>
    </div>
  );
}

