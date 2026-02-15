import React from "react";
import { Brain } from "lucide-react";

export function QuizTipsCard() {
  return (
    <div className="bg-gradient-to-r from-[#FF715B]/10 to-[#1EA896]/10 border border-white/10 rounded-xl p-4">
      <div className="flex items-center space-x-3">
        <Brain className="h-5 w-5 text-[#FF715B]" />
        <div>
          <p className="text-white font-medium text-sm">Pro Tips for Quiz Creation</p>
          <p className="text-white/70 text-xs">
            Be specific about topics, choose the right question type for your study goals, and use different difficulty levels. 
            Regular practice with varied quizzes helps reinforce learning and identify knowledge gaps.
          </p>
        </div>
      </div>
    </div>
  );
}