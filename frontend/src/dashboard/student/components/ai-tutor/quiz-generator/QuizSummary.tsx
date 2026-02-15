import { Trophy, Target, Clock, BookOpen, PartyPopper, Zap } from "lucide-react";

interface Quiz {
  id: string;
  title: string;
  type: "MCQ" | "Open" | "Mixed";
  createdAt: string;
  completed?: boolean;
  score?: number;
  totalQuestions: number;
}

interface QuizSummaryProps {
  quiz: Quiz;
  timeTaken?: string;
  correctAnswers?: number;
  onRetake?: () => void;
  onReview?: () => void;
}

export function QuizSummary({ 
  quiz, 
  timeTaken = "12 minutes", 
  correctAnswers, 
  onRetake, 
  onReview 
}: QuizSummaryProps) {
  if (!quiz.completed || !quiz.score) {
    return null;
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getScoreMessage = (score: number) => {
    if (score >= 80) return "Excellent work! You've mastered this topic.";
    if (score >= 60) return "Good job! Keep practicing to improve further.";
    return "Keep studying and try again. You'll get better!";
  };

  const calculatedCorrectAnswers = correctAnswers ?? Math.round((quiz.score / 100) * quiz.totalQuestions);

  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
      <div className="text-center mb-6">
        <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
          quiz.score >= 80 
            ? "bg-gradient-to-br from-green-500 to-green-600"
            : quiz.score >= 60
            ? "bg-gradient-to-br from-yellow-500 to-yellow-600"
            : "bg-gradient-to-br from-red-500 to-red-600"
        }`}>
          <Trophy className="h-8 w-8 text-white" />
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-2">Quiz Complete!</h2>
        <p className="text-white/70">{quiz.title}</p>
      </div>

      {/* Score Display */}
      <div className="text-center mb-6">
        <div className={`text-6xl font-bold mb-2 ${getScoreColor(quiz.score)}`}>
          {quiz.score}%
        </div>
        <p className="text-white/80 font-medium">{getScoreMessage(quiz.score)}</p>
      </div>

      {/* Quiz Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white/5 rounded-xl p-4 text-center">
          <div className="w-8 h-8 bg-gradient-to-br from-[#1EA896] to-[#1EA896]/80 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Target className="h-4 w-4 text-white" />
          </div>
          <p className="text-2xl font-bold text-white">{calculatedCorrectAnswers}</p>
          <p className="text-white/60 text-xs">Correct</p>
        </div>

        <div className="bg-white/5 rounded-xl p-4 text-center">
          <div className="w-8 h-8 bg-gradient-to-br from-[#FF715B] to-[#FF715B]/80 rounded-lg flex items-center justify-center mx-auto mb-2">
            <BookOpen className="h-4 w-4 text-white" />
          </div>
          <p className="text-2xl font-bold text-white">{quiz.totalQuestions}</p>
          <p className="text-white/60 text-xs">Total</p>
        </div>

        <div className="bg-white/5 rounded-xl p-4 text-center sm:col-span-1 col-span-2">
          <div className="w-8 h-8 bg-gradient-to-br from-[#4C5454] to-[#523F38] rounded-lg flex items-center justify-center mx-auto mb-2">
            <Clock className="h-4 w-4 text-white" />
          </div>
          <p className="text-2xl font-bold text-white">{timeTaken}</p>
          <p className="text-white/60 text-xs">Time Taken</p>
        </div>
      </div>

      {/* Performance Breakdown */}
      <div className="bg-white/5 rounded-xl p-4 mb-6">
        <h3 className="text-white font-medium mb-3">Performance Breakdown</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-white/70 text-sm">Quiz Type:</span>
            <span className="text-white font-medium">{quiz.type}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/70 text-sm">Completed On:</span>
            <span className="text-white font-medium">{new Date(quiz.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/70 text-sm">Accuracy Rate:</span>
            <span className={`font-medium ${getScoreColor(quiz.score)}`}>
              {((calculatedCorrectAnswers / quiz.totalQuestions) * 100).toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        {onRetake && (
          <button
            onClick={onRetake}
            className="flex-1 bg-gradient-to-r from-[#1EA896] to-[#1EA896]/80 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-[#1EA896]/25 transition-all duration-200"
          >
            Retake Quiz
          </button>
        )}
        {onReview && (
          <button
            onClick={onReview}
            className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-xl border border-white/20 transition-all duration-200"
          >
            Review Answers
          </button>
        )}
      </div>

      {/* Encouragement Message */}
      <div className="mt-6 p-4 bg-gradient-to-r from-[#1EA896]/10 to-[#FF715B]/10 border border-white/10 rounded-xl">
        <div className="flex items-center space-x-3">
          {quiz.score >= 80 ? (
            <PartyPopper className="h-5 w-5 text-[#1EA896] flex-shrink-0" />
          ) : quiz.score >= 60 ? (
            <Zap className="h-5 w-5 text-[#FF715B] flex-shrink-0" />
          ) : (
            <BookOpen className="h-5 w-5 text-[#4C5454] flex-shrink-0" />
          )}
          <p className="text-white/80 text-sm">
            {quiz.score >= 80 
              ? "Outstanding! You're ready for more advanced topics."
              : quiz.score >= 60
              ? "Good progress! Practice similar questions to improve."
              : "Don't give up! Review the material and try again."
            }
          </p>
        </div>
      </div>
    </div>
  );
}