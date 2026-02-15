import { FileQuestion, Trophy, RotateCcw, Eye } from "lucide-react";

interface Quiz {
  id: string;
  title: string;
  type: "MCQ" | "Open" | "Mixed";
  questions: Question[];
  createdAt: string;
  completed?: boolean;
  score?: number;
  totalQuestions: number;
}

interface Question {
  id: string;
  type: "MCQ" | "Open";
  question: string;
  options?: string[];
  correctAnswer?: string;
  userAnswer?: string;
}

interface GeneratedQuizListProps {
  quizzes: Quiz[];
  onTakeQuiz: (quiz: Quiz) => void;
}

export function GeneratedQuizList({ quizzes, onTakeQuiz }: GeneratedQuizListProps) {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-[#4C5454] to-[#523F38] rounded-lg flex items-center justify-center">
          <FileQuestion className="h-5 w-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Your Quizzes</h2>
          <p className="text-white/60 text-sm">Generated quizzes and results</p>
        </div>
      </div>

      {quizzes.length === 0 ? (
        <div className="text-center py-8">
          <FileQuestion className="h-12 w-12 text-white/40 mx-auto mb-3" />
          <p className="text-white/60">No quizzes generated yet.</p>
          <p className="text-white/40 text-sm">Create your first quiz using the form above.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {quizzes.map((quiz) => (
            <div key={quiz.id} className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-white font-semibold">{quiz.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-white/60 mt-1">
                    <span>{quiz.type}</span>
                    <span>{quiz.totalQuestions} questions</span>
                    <span>{new Date(quiz.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                
                {quiz.completed ? (
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2 bg-green-500/20 text-green-400 px-3 py-1 rounded-lg">
                      <Trophy className="h-4 w-4" />
                      <span className="text-sm font-medium">{quiz.score}%</span>
                    </div>
                    <button
                      onClick={() => onTakeQuiz(quiz)}
                      className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-lg transition-colors"
                    >
                      <RotateCcw className="h-4 w-4" />
                      <span className="text-sm">Retake</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => onTakeQuiz(quiz)}
                    className="flex items-center space-x-2 bg-gradient-to-r from-[#1EA896] to-[#1EA896]/80 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
                  >
                    <Eye className="h-4 w-4" />
                    <span className="text-sm">Take Quiz</span>
                  </button>
                )}
              </div>

              {quiz.completed && (
                <div className="text-xs text-white/50 bg-white/5 rounded-lg p-3 mt-3">
                  <p className="font-medium text-white/70 mb-1">Quiz Summary:</p>
                  <p>Completed on {new Date(quiz.createdAt).toLocaleDateString()} with a score of {quiz.score}%. 
                  {(quiz.score || 0) >= 80 ? " Excellent work!" : (quiz.score || 0) >= 60 ? " Good job!" : " Keep practicing!"}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}