// src/dashboard/teacher/components/ai-tutor/chatbot/TeacherChatbotPanel.tsx

import { useMemo, useState } from "react";
import { Bot, ClipboardList, FileText, Sparkles, Send } from "lucide-react";
import TeacherChatFeatures from "./TeacherChatFeatures";
import type { Msg } from "./chatTypes";
import { buildTeacherReply } from "./chatEngine";
import { ChatMessage, StatCard } from "./chatUI";

export default function TeacherChatbotPanel() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: "m1",
      role: "ai",
      content:
        "Tell me what you need: lesson plan, quiz, rubric, marking feedback, or explanation. Include subject and class level (example: Biology S3).",
    },
  ]);

  const [value, setValue] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  const lastTeacherText = useMemo(() => {
    const last = [...messages].reverse().find((m) => m.role === "teacher");
    return last?.content ?? "";
  }, [messages]);

  const handleSend = async () => {
    const trimmed = value.trim();
    if (!trimmed || isThinking) return;

    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: "teacher", content: trimmed },
    ]);

    setValue("");
    setIsThinking(true);

    await new Promise((r) => setTimeout(r, 600));

    const reply = buildTeacherReply(trimmed, lastTeacherText);

    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: "ai", content: reply },
    ]);

    setIsThinking(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2CB7A7] shadow-md">
          <Bot className="h-6 w-6 text-[#1F2326]" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-white">AI Chatbot</h1>
          <p className="text-white/70 mt-1">
            Focused teaching assistant for CBC aligned lessons, quizzes, and rubrics.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-stretch">
        <div className="transition-transform duration-200 hover:scale-[1.01] hover:-translate-y-0.5">
          <StatCard
            icon={<Sparkles className="h-6 w-6 text-white" />}
            value="24/7"
            label="Planning support"
            iconBg="bg-[#1EA896]"
          />
        </div>

        <div className="transition-transform duration-200 hover:scale-[1.01] hover:-translate-y-0.5">
          <StatCard
            icon={<ClipboardList className="h-6 w-6 text-white" />}
            value="Rubrics"
            label="Marking templates"
            iconBg="bg-[#FF715B]"
          />
        </div>

        <div className="transition-transform duration-200 hover:scale-[1.01] hover:-translate-y-0.5">
          <StatCard
            icon={<FileText className="h-6 w-6 text-white" />}
            value="Quizzes"
            label="Draft questions"
            iconBg="bg-[#4C5454]"
          />
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-white/10">
          <div className="text-white font-semibold">Teacher AI Assistant</div>
          <div className="text-white/60 text-sm">
            Try: "Quiz photosynthesis S3 10 questions medium"
          </div>
        </div>

        <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto space-y-3">
          {messages.map((m) => (
            <ChatMessage key={m.id} role={m.role} content={m.content} />
          ))}
          {isThinking && <ChatMessage role="ai" content="Thinking..." />}
        </div>

        <div className="p-4 sm:p-6 border-t border-white/10">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Ask for a lesson plan, quiz, rubric, explanation..."
              className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#1EA896]/40"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              disabled={isThinking}
            />

            <button
              onClick={handleSend}
              disabled={isThinking}
              className="px-4 py-3 rounded-xl bg-gradient-to-r from-[#1EA896]/20 to-[#1EA896]/10 border border-[#1EA896]/30 text-white hover:opacity-90 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
              <span className="hidden sm:inline">
                {isThinking ? "Thinking" : "Send"}
              </span>
            </button>
          </div>
        </div>
      </div>

      <TeacherChatFeatures />
    </div>
  );
}