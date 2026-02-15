import React from "react";
import { Brain, FileQuestion, Trophy } from "lucide-react";

export function QuizFeatures() {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Quiz Generator Features</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Custom Topics */}
        <div className="flex items-start space-x-3 p-4 bg-white/5 rounded-xl">
          <div className="w-8 h-8 bg-gradient-to-br from-[#FF715B] to-[#FF715B]/80 rounded-lg flex items-center justify-center flex-shrink-0">
            <Brain className="h-4 w-4 text-white" />
          </div>
          <div>
            <h4 className="text-white font-medium text-sm mb-1">Custom Topics</h4>
            <p className="text-white/70 text-xs mb-2">
              Generate quizzes on any subject or specific topic you're studying
            </p>
            <ul className="text-white/50 text-xs space-y-1">
              <li>• Any subject coverage</li>
              <li>• Specific topic focus</li>
              <li>• Difficulty adjustment</li>
            </ul>
          </div>
        </div>

        {/* Multiple Formats */}
        <div className="flex items-start space-x-3 p-4 bg-white/5 rounded-xl">
          <div className="w-8 h-8 bg-gradient-to-br from-[#1EA896] to-[#1EA896]/80 rounded-lg flex items-center justify-center flex-shrink-0">
            <FileQuestion className="h-4 w-4 text-white" />
          </div>
          <div>
            <h4 className="text-white font-medium text-sm mb-1">Multiple Formats</h4>
            <p className="text-white/70 text-xs mb-2">
              Choose from MCQ, open-ended, or mixed question types
            </p>
            <ul className="text-white/50 text-xs space-y-1">
              <li>• Multiple choice questions</li>
              <li>• Open-ended responses</li>
              <li>• Mixed question formats</li>
            </ul>
          </div>
        </div>

        {/* Progress Tracking */}
        <div className="flex items-start space-x-3 p-4 bg-white/5 rounded-xl">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <Trophy className="h-4 w-4 text-white" />
          </div>
          <div>
            <h4 className="text-white font-medium text-sm mb-1">Progress Tracking</h4>
            <p className="text-white/70 text-xs mb-2">
              Track your quiz performance and identify areas for improvement
            </p>
            <ul className="text-white/50 text-xs space-y-1">
              <li>• Score tracking</li>
              <li>• Performance analytics</li>
              <li>• Retake functionality</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}