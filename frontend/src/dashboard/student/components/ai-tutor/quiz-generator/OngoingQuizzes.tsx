import React from "react";
import { Clock, Play, FileQuestion } from "lucide-react";
import { cn } from "@/utils/cn";

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

interface OngoingQuizzesProps {
  quizzes: OngoingQuiz[];
  onContinueQuiz: (quiz: OngoingQuiz) => void;
}

export function OngoingQuizzes({ quizzes, onContinueQuiz }: OngoingQuizzesProps) {
  if (quizzes.length === 0) {
    return (
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5 text-[#FF715B]" />
          Ongoing Quizzes
        </h3>
        <div className="text-center py-8">
          <FileQuestion className="h-12 w-12 text-white/30 mx-auto mb-3" />
          <p className="text-white/60">No ongoing quizzes</p>
          <p className="text-white/40 text-sm">Start a new quiz to see it here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <Clock className="h-5 w-5 text-[#FF715B]" />
        Ongoing Quizzes ({quizzes.length})
      </h3>
      
      <div className="space-y-3">
        {quizzes.map((quiz) => {
          const progress = (quiz.answeredQuestions / quiz.totalQuestions) * 100;
          const timeElapsed = Math.floor((Date.now() - new Date(quiz.timeStarted).getTime()) / (1000 * 60));
          
          return (
            <div
              key={quiz.id}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex-1">
                  <h4 className="text-white font-medium text-sm mb-1">{quiz.title}</h4>
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
                  </div>
                </div>
                
                <button
                  onClick={() => onContinueQuiz(quiz)}
                  className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-[#1EA896] to-[#1EA896]/80 hover:from-[#1EA896]/80 hover:to-[#1EA896] text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-[#1EA896]/20"
                >
                  <Play className="h-4 w-4" />
                  Continue
                </button>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-white/60">
                  <span>Progress: {quiz.answeredQuestions}/{quiz.totalQuestions} questions</span>
                  <span>{timeElapsed}min elapsed</span>
                </div>
                
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-[#1EA896] to-[#1EA896]/80 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}