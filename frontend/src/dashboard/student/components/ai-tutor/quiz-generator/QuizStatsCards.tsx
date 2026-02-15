import React from "react";
import { Brain, Trophy, Target, FileQuestion } from "lucide-react";

interface Quiz {
  id: string;
  title: string;
  type: "MCQ" | "Open" | "Mixed";
  subject: string;
  difficulty: "Easy" | "Medium" | "Hard";
  totalQuestions: number;
  createdAt: string;
  estimatedTime: number;
  description?: string;
}

interface OngoingQuiz {
  id: string;
  title: string;
  type: "MCQ" | "Open" | "Mixed";
  subject: string;
  difficulty: "Easy" | "Medium" | "Hard";
  totalQuestions: number;
  answeredQuestions: number;
  timeStarted: string;
  estimatedTime: number;
}

interface CompletedQuiz {
  id: string;
  title: string;
  type: "MCQ" | "Open" | "Mixed";
  subject: string;
  difficulty: "Easy" | "Medium" | "Hard";
  totalQuestions: number;
  score: number;
  completedAt: string;
  timeSpent: number;
  passed: boolean;
}

interface QuizStatsCardsProps {
  availableQuizzes: Quiz[];
  ongoingQuizzes: OngoingQuiz[];
  completedQuizzes: CompletedQuiz[];
}

export function QuizStatsCards({ 
  availableQuizzes, 
  ongoingQuizzes, 
  completedQuizzes 
}: QuizStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#FF715B] to-[#FF715B]/80 rounded-lg flex items-center justify-center">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{availableQuizzes.length}</p>
            <p className="text-white/60 text-sm">Available Quizzes</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#1EA896] to-[#1EA896]/80 rounded-lg flex items-center justify-center">
            <Trophy className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{completedQuizzes.length}</p>
            <p className="text-white/60 text-sm">Completed</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#4C5454] to-[#523F38] rounded-lg flex items-center justify-center">
            <Target className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">
              {completedQuizzes.filter(q => q.score >= 80).length}
            </p>
            <p className="text-white/60 text-sm">High Scores</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
            <FileQuestion className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{ongoingQuizzes.length}</p>
            <p className="text-white/60 text-sm">In Progress</p>
          </div>
        </div>
      </div>
    </div>
  );
}