import { useState } from "react";
import { Brain, FileQuestion, Send, Trophy, RotateCcw, Eye } from "lucide-react";

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

const mockQuizzes: Quiz[] = [
  {
    id: "quiz-1",
    title: "Rwanda History Basics",
    type: "MCQ",
    questions: [
      {
        id: "q1",
        type: "MCQ",
        question: "When did Rwanda gain independence?",
        options: ["1960", "1962", "1961", "1963"],
        correctAnswer: "1962",
        userAnswer: "1962"
      },
      {
        id: "q2", 
        type: "MCQ",
        question: "What is the capital city of Rwanda?",
        options: ["Butare", "Kigali", "Gisenyi", "Ruhengeri"],
        correctAnswer: "Kigali",
        userAnswer: "Kigali"
      }
    ],
    createdAt: "2025-01-26T10:30:00Z",
    completed: true,
    score: 100,
    totalQuestions: 2
  },
  {
    id: "quiz-2",
    title: "Mathematics Algebra",
    type: "Mixed",
    questions: [
      {
        id: "q1",
        type: "MCQ", 
        question: "What is 2x + 5 = 15?",
        options: ["x = 5", "x = 10", "x = 15", "x = 20"],
        correctAnswer: "x = 5"
      },
      {
        id: "q2",
        type: "Open",
        question: "Explain the quadratic formula and when to use it."
      }
    ],
    createdAt: "2025-01-25T14:20:00Z",
    completed: false,
    totalQuestions: 2
  }
];

export function QuizGenerator() {
  const [formData, setFormData] = useState({
    topic: "",
    type: "MCQ" as "MCQ" | "Open" | "Mixed",
    questionCount: 5
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [quizzes, setQuizzes] = useState<Quiz[]>(mockQuizzes);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.topic.trim()) return;

    setIsGenerating(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newQuiz: Quiz = {
      id: `quiz-${Date.now()}`,
      title: formData.topic,
      type: formData.type,
      questions: generateMockQuestions(formData.type, formData.questionCount),
      createdAt: new Date().toISOString(),
      completed: false,
      totalQuestions: formData.questionCount
    };

    setQuizzes(prev => [newQuiz, ...prev]);
    setIsGenerating(false);
    setFormData({ topic: "", type: "MCQ", questionCount: 5 });
  };

  const generateMockQuestions = (type: "MCQ" | "Open" | "Mixed", count: number): Question[] => {
    const questions: Question[] = [];
    
    for (let i = 0; i < count; i++) {
      const questionType = type === "Mixed" ? (i % 2 === 0 ? "MCQ" : "Open") : type;
      
      if (questionType === "MCQ") {
        questions.push({
          id: `q${i + 1}`,
          type: "MCQ",
          question: `Sample MCQ question ${i + 1} about ${formData.topic}?`,
          options: ["Option A", "Option B", "Option C", "Option D"],
          correctAnswer: "Option A"
        });
      } else {
        questions.push({
          id: `q${i + 1}`,
          type: "Open",
          question: `Explain or discuss ${formData.topic} in detail (Question ${i + 1}).`
        });
      }
    }
    
    return questions;
  };

  const takeQuiz = (quiz: Quiz) => {
    // Simulate taking quiz - mark as completed with random score
    const updatedQuiz = {
      ...quiz,
      completed: true,
      score: Math.floor(Math.random() * 40) + 60 // Random score between 60-100
    };
    
    setQuizzes(prev => prev.map(q => q.id === quiz.id ? updatedQuiz : q));
  };

  return (
    <div className="space-y-6">
      {/* Quiz Generation Form */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-[#1EA896] to-[#1EA896]/80 rounded-lg flex items-center justify-center">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Quiz Generator</h2>
            <p className="text-white/60 text-sm">Create custom quizzes on any topic</p>
          </div>
        </div>

        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Topic or Subject
            </label>
            <textarea
              value={formData.topic}
              onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
              placeholder="Enter the topic you want to be quizzed on..."
              rows={3}
              className="w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-[#1EA896]/50 focus:ring-2 focus:ring-[#1EA896]/20 transition-all duration-200 outline-none resize-vertical"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Quiz Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
                className="w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#1EA896]/50 focus:ring-2 focus:ring-[#1EA896]/20 transition-all duration-200 outline-none"
              >
                <option value="MCQ" className="bg-black text-white">Multiple Choice (MCQ)</option>
                <option value="Open" className="bg-black text-white">Open-ended Questions</option>
                <option value="Mixed" className="bg-black text-white">Mixed (MCQ + Open)</option>
              </select>
            </div>

            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Number of Questions
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={formData.questionCount}
                onChange={(e) => setFormData(prev => ({ ...prev, questionCount: parseInt(e.target.value) || 5 }))}
                className="w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#1EA896]/50 focus:ring-2 focus:ring-[#1EA896]/20 transition-all duration-200 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isGenerating || !formData.topic.trim()}
            className="w-full bg-gradient-to-r from-[#FF715B] to-[#FF715B]/80 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-[#FF715B]/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Generating Quiz...</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>Generate Quiz</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Generated Quizzes */}
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
                        onClick={() => takeQuiz(quiz)}
                        className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-lg transition-colors"
                      >
                        <RotateCcw className="h-4 w-4" />
                        <span className="text-sm">Retake</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => takeQuiz(quiz)}
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
    </div>
  );
}