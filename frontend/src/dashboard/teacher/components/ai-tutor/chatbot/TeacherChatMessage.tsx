import { Bot, User } from "lucide-react";

export default function TeacherChatMessage({
  role,
  content,
  isTyping,
}: {
  role: "teacher" | "ai";
  content: string;
  isTyping?: boolean;
}) {
  const isAI = role === "ai";

  return (
    <div className={`flex gap-3 ${isAI ? "" : "flex-row-reverse"}`}>
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center border border-white/10 ${
          isAI ? "bg-white/10" : "bg-[#FF715B]/20"
        }`}
      >
        {isAI ? <Bot className="h-4 w-4 text-white" /> : <User className="h-4 w-4 text-white" />}
      </div>

      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 border shadow-lg ${
          isAI
            ? "bg-white/5 border-white/10 text-white"
            : "bg-gradient-to-r from-[#FF715B]/20 to-[#FF715B]/10 border-[#FF715B]/30 text-white"
        }`}
      >
        <p className={`text-sm leading-relaxed whitespace-pre-wrap ${isTyping ? "text-white/70" : ""}`}>
          {content}
        </p>
      </div>
    </div>
  );
}
