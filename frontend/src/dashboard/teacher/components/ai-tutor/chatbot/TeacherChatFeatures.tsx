// src/dashboard/teacher/components/ai-tutor/chatbot/TeacherChatFeatures.tsx

import { MessageSquare, Brain, Bot, BarChart3 } from "lucide-react";

function FeatureCard({
  icon,
  title,
  desc,
  bullets,
  iconBg,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  bullets: string[];
  iconBg: string;
}) {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4">
      <div className="flex items-center space-x-3 mb-3">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconBg}`}
        >
          {icon}
        </div>
        <div>
          <h3 className="text-white font-semibold text-base">{title}</h3>
          <p className="text-white/60 text-sm">{desc}</p>
        </div>
      </div>

      <ul className="space-y-1 text-white/60 text-sm pl-5 list-disc">
        {bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </div>
  );
}

export default function TeacherChatFeatures() {
  return (
    <div className="space-y-4">
      {/* Features */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Chatbot Features</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FeatureCard
            icon={<MessageSquare className="h-5 w-5 text-white" />}
            title="Lesson Planning"
            desc="Draft lesson plans and activities quickly"
            bullets={["Objectives and outcomes", "Step by step flow", "Exit ticket ideas"]}
            iconBg="bg-gradient-to-br from-[#1EA896] to-[#1EA896]/80"
          />

          <FeatureCard
            icon={<Brain className="h-5 w-5 text-white" />}
            title="Smart Responses"
            desc="Teacher focused guidance and prompts"
            bullets={["Clarifying questions", "Structured outputs", "CBC aligned tone"]}
            iconBg="bg-gradient-to-br from-[#FF715B] to-[#FF715B]/80"
          />

          <FeatureCard
            icon={<Bot className="h-5 w-5 text-white" />}
            title="Assessment Support"
            desc="Generate quizzes and rubrics"
            bullets={["MCQ and open items", "Rubric drafts", "Feedback starters"]}
            iconBg="bg-gradient-to-br from-purple-500 to-purple-600"
          />
        </div>
      </div>

      {/* Pro tips (same size + structure as quiz generator tip) */}
      <div className="bg-gradient-to-r from-[#1EA896]/10 to-[#FF715B]/10 border border-white/10 rounded-xl p-4">
  <div className="flex items-start gap-2">
    <BarChart3 className="h-5 w-5 text-[#1EA896] mt-0.5 flex-shrink-0" />
    <div>
      <h3 className="text-white font-semibold text-sm">Pro Tips</h3>
      <p className="text-white/70 text-xs mt-1 leading-tight">
         Include subject, class level, learning objective, and difficulty.
              Ask for one output at a time (lesson plan, quiz, rubric, or marking feedback). </p>
    </div>
  </div>
</div>

    </div>
  );
}
