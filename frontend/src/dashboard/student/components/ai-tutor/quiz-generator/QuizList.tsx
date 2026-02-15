import React from "react";
import { Play, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/utils/cn";

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

interface QuizListProps {
  quizzes: Quiz[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onStartQuiz: (quiz: Quiz) => void;
  loading?: boolean;
}

export function QuizList({ 
  quizzes, 
  currentPage, 
  totalPages, 
  onPageChange, 
  onStartQuiz,
  loading = false 
}: QuizListProps) {
  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-white/5 rounded-xl p-4">
            <div className="h-4 bg-white/10 rounded w-1/3 mb-2"></div>
            <div className="h-3 bg-white/10 rounded w-1/2 mb-3"></div>
            <div className="flex gap-2">
              <div className="h-6 bg-white/10 rounded w-16"></div>
              <div className="h-6 bg-white/10 rounded w-16"></div>
              <div className="h-6 bg-white/10 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (quizzes.length === 0) {
    return (
      <div className="text-center py-12">
        <Clock className="h-16 w-16 text-white/30 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-white mb-2">No quizzes found</h3>
        <p className="text-white/60">Try adjusting your filters or create a new quiz</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="text-sm text-white/60">
          Page {currentPage} of {Math.max(1, totalPages)}
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all duration-200 group"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-white font-medium">{quiz.title}</h4>
                  <div className="flex items-center gap-2">
                    <span className="bg-white/10 px-2 py-1 rounded-md text-xs text-white/70">
                      {quiz.subject}
                    </span>
                    <span className={cn(
                      "px-2 py-1 rounded-md text-xs",
                      quiz.difficulty === "Easy" && "bg-green-500/20 text-green-300",
                      quiz.difficulty === "Medium" && "bg-yellow-500/20 text-yellow-300",
                      quiz.difficulty === "Hard" && "bg-red-500/20 text-red-300"
                    )}>
                      {quiz.difficulty}
                    </span>
                    <span className="bg-white/10 px-2 py-1 rounded-md text-xs text-white/70">
                      {quiz.type}
                    </span>
                  </div>
                </div>
                
                {quiz.description && (
                  <p className="text-white/70 text-sm mb-3 line-clamp-2">
                    {quiz.description}
                  </p>
                )}
                
                <div className="flex items-center gap-4 text-xs text-white/50">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>~{quiz.estimatedTime} min</span>
                  </div>
                  <span>{quiz.totalQuestions} questions</span>
                  <span>Created {new Date(quiz.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              
              <button
                onClick={() => onStartQuiz(quiz)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FF715B] to-[#FF715B]/80 hover:from-[#FF715B]/80 hover:to-[#FF715B] text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-[#FF715B]/20 group-hover:scale-105"
              >
                <Play className="h-4 w-4" />
                Start Quiz
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200",
              currentPage === 1
                ? "bg-white/5 text-white/40 cursor-not-allowed"
                : "bg-white/10 hover:bg-white/20 text-white"
            )}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </button>
          
          <div className="flex items-center gap-2">
            {[...Array(Math.min(5, totalPages))].map((_, i) => {
              const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
              if (pageNum > totalPages) return null;
              
              return (
                <button
                  key={pageNum}
                  onClick={() => onPageChange(pageNum)}
                  className={cn(
                    "w-10 h-10 rounded-lg font-medium transition-all duration-200",
                    pageNum === currentPage
                      ? "bg-[#1EA896] text-white"
                      : "bg-white/10 hover:bg-white/20 text-white/70 hover:text-white"
                  )}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
          
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200",
              currentPage === totalPages
                ? "bg-white/5 text-white/40 cursor-not-allowed"
                : "bg-white/10 hover:bg-white/20 text-white"
            )}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}