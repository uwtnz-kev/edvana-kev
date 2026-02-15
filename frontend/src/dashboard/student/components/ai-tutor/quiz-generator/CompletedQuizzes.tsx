import React from "react";
import { Trophy, CheckCircle, XCircle, Eye, RotateCcw } from "lucide-react";
import { cn } from "@/utils/cn";

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

interface CompletedQuizzesProps {
  quizzes: CompletedQuiz[];
  onViewResults: (quiz: CompletedQuiz) => void;
  onRetakeQuiz: (quiz: CompletedQuiz) => void;
}

export function CompletedQuizzes({ quizzes, onViewResults, onRetakeQuiz }: CompletedQuizzesProps) {
  if (quizzes.length === 0) {
    return (
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Trophy className="h-5 w-5 text-[#1EA896]" />
          Completed Quizzes
        </h3>
        <div className="text-center py-8">
          <Trophy className="h-12 w-12 text-white/30 mx-auto mb-3" />
          <p className="text-white/60">No completed quizzes yet</p>
          <p className="text-white/40 text-sm">Complete some quizzes to see your results here</p>
        </div>
      </div>
    );
  }

  const averageScore = Math.round(quizzes.reduce((sum, quiz) => sum + quiz.score, 0) / quizzes.length);
  const passedQuizzes = quizzes.filter(quiz => quiz.passed).length;

  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Trophy className="h-5 w-5 text-[#1EA896]" />
          Completed Quizzes ({quizzes.length})
        </h3>
        
        <div className="flex items-center gap-4 text-sm text-white/60">
          <div className="flex items-center gap-1">
            <CheckCircle className="h-4 w-4 text-green-400" />
            <span>{passedQuizzes} passed</span>
          </div>
          <div className="bg-white/10 px-2 py-1 rounded-md">
            Avg: {averageScore}%
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-white font-medium text-sm">{quiz.title}</h4>
                  {quiz.passed ? (
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-400" />
                  )}
                </div>
                
                <div className="flex items-center gap-3 text-xs text-white/60">
                  <span className="bg-white/10 px-2 py-1 rounded-md">{quiz.subject}</span>
                  <span className={cn(
                    "px-2 py-1 rounded-md",
                    quiz.difficulty === "Easy" && "bg-green-500/20 text-green-300",
                    quiz.difficulty === "Medium" && "bg-yellow-500/20 text-yellow-300",
                    quiz.difficulty === "Hard" && "bg-red-500/20 text-red-300"
                  )}>
                    {quiz.difficulty}
                  </span>
                  <span>{quiz.type}</span>
                  <span>{quiz.timeSpent}min</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className={cn(
                  "px-3 py-1 rounded-lg text-sm font-medium",
                  quiz.score >= 80 && "bg-green-500/20 text-green-300",
                  quiz.score >= 60 && quiz.score < 80 && "bg-yellow-500/20 text-yellow-300",
                  quiz.score < 60 && "bg-red-500/20 text-red-300"
                )}>
                  {quiz.score}%
                </div>
                
                <button
                  onClick={() => onViewResults(quiz)}
                  className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200"
                  title="View Results"
                >
                  <Eye className="h-4 w-4" />
                </button>
                
                <button
                  onClick={() => onRetakeQuiz(quiz)}
                  className="p-2 bg-white/10 hover:bg-[#FF715B]/20 text-white hover:text-[#FF715B] rounded-lg transition-all duration-200"
                  title="Retake Quiz"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-xs text-white/50">
              <span>Completed {new Date(quiz.completedAt).toLocaleDateString()}</span>
              <span>{quiz.totalQuestions} questions</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}