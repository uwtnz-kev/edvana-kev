import React from "react";
import { Plus } from "lucide-react";

interface CreateQuizHeaderProps {
  onCreateQuiz: () => void;
}

export function CreateQuizHeader({ onCreateQuiz }: CreateQuizHeaderProps) {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Create New Quiz</h3>
          <p className="text-white/70 text-sm">Generate a custom quiz on any topic to test your knowledge</p>
        </div>
        <button
          onClick={onCreateQuiz}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FF715B] to-[#FF715B]/80 hover:from-[#FF715B]/80 hover:to-[#FF715B] text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-[#FF715B]/20"
        >
          <Plus className="h-5 w-5" />
          Create Quiz
        </button>
      </div>
    </div>
  );
}