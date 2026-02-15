import { Clock, Target, TrendingUp } from "lucide-react";

interface WeeklyProgressProps {
  studyGoal?: number;
  studyCompleted?: number;
  tasksGoal?: number;
  tasksCompleted?: number;
}

export function WeeklyProgress({ 
  studyGoal = 25, 
  studyCompleted = 18,
  tasksGoal = 12,
  tasksCompleted = 8
}: WeeklyProgressProps) {
  const studyPercentage = Math.round((studyCompleted / studyGoal) * 100);
  const taskPercentage = Math.round((tasksCompleted / tasksGoal) * 100);

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
        {/* Study Hours Progress */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-[#FF715B]" />
              <span className="text-white font-medium">Study Hours</span>
            </div>
            <span className="text-white/70 text-sm">
              {studyCompleted}/{studyGoal} hours
            </span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-[#FF715B] to-[#FF715B]/80 h-3 rounded-full shadow-lg transition-all duration-300"
              style={{ width: `${Math.min(studyPercentage, 100)}%` }}
            />
          </div>
          <p className="text-white/60 text-xs mt-2">{studyPercentage}% completed</p>
        </div>

        {/* Tasks Progress */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-[#1EA896]" />
              <span className="text-white font-medium">Tasks Completed</span>
            </div>
            <span className="text-white/70 text-sm">
              {tasksCompleted}/{tasksGoal} tasks
            </span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-[#1EA896] to-[#1EA896]/80 h-3 rounded-full shadow-lg transition-all duration-300"
              style={{ width: `${Math.min(taskPercentage, 100)}%` }}
            />
          </div>
          <p className="text-white/60 text-xs mt-2">{taskPercentage}% completed</p>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-white/10">
        <p className="text-white/70 text-sm text-center">
          Keep it up! You're doing great this week.
        </p>
      </div>
    </div>
  );
}