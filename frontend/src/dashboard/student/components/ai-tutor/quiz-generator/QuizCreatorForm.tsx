import { useState } from "react";
import { Brain, Send } from "lucide-react";

interface QuizFormData {
  topic: string;
  type: "MCQ" | "Open" | "Mixed";
  questionCount: number;
}

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

interface QuizCreatorFormProps {
  onQuizGenerated: (quiz: Quiz) => void;
}

export function QuizCreatorForm({ onQuizGenerated }: QuizCreatorFormProps) {
  const [formData, setFormData] = useState<QuizFormData>({
    topic: "",
    type: "MCQ",
    questionCount: 5
  });
  const [isGenerating, setIsGenerating] = useState(false);

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

    onQuizGenerated(newQuiz);
    setIsGenerating(false);
    setFormData({ topic: "", type: "MCQ", questionCount: 5 });
  };

  return (
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
  );
}