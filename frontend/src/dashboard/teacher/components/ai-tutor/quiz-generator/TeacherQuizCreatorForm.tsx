import { useState } from "react";
import { Brain, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import type { Difficulty, QuizType, TeacherQuiz } from "./teacherQuizTypes";
import { subjects, grades } from "./teacherQuizMock";
import { buildNewQuiz } from "./teacherQuizUtils";

export default function TeacherQuizCreatorForm({
  onCreated,
}: {
  onCreated: (quiz: TeacherQuiz) => void;
}) {
  const [form, setForm] = useState({
    topic: "",
    subject: "Mathematics",
    grade: "S3",
    type: "MCQ" as QuizType,
    difficulty: "Medium" as Difficulty,
    questionCount: 10,
    estimatedTime: 15,
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const generate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.topic.trim()) return;

    setIsGenerating(true);
    await new Promise((r) => setTimeout(r, 900));

    onCreated(
      buildNewQuiz({
        topic: form.topic,
        subject: form.subject,
        grade: form.grade,
        type: form.type,
        difficulty: form.difficulty,
        questionCount: form.questionCount,
        estimatedTime: form.estimatedTime,
      })
    );

    setIsGenerating(false);
    setForm((p) => ({ ...p, topic: "" }));
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 transition-all duration-300 ease-out hover:bg-white/10 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.01] group">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-[#1EA896] to-[#1EA896]/80 rounded-lg flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
          <Brain className="h-5 w-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Create a quiz draft</h2>
          <p className="text-white/60 text-sm">CBC aligned draft generation</p>
        </div>
      </div>

      <form onSubmit={generate} className="space-y-4">
        <div>
          <label className="block text-white/80 text-sm font-medium mb-2">Topic</label>
          <textarea
            value={form.topic}
            onChange={(e) => setForm((p) => ({ ...p, topic: e.target.value }))}
            rows={3}
            placeholder="e.g., Photosynthesis light reactions"
            className="w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-[#1EA896]/50 focus:ring-2 focus:ring-[#1EA896]/20 transition-all duration-200 outline-none resize-vertical"
            required
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="block text-white/80 text-sm font-medium">Subject</label>
            <Select
              value={form.subject}
              onValueChange={(v) => setForm((p) => ({ ...p, subject: v }))}
            >
              <SelectTrigger className="bg-white/5 border-white/20 text-white rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white/5 backdrop-blur-xl border border-white/10 text-white rounded-xl">
                {subjects.map((s) => (
                  <SelectItem
                    key={s}
                    value={s}
                    className="text-white hover:bg-white/10 focus:bg-white/10"
                  >
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="block text-white/80 text-sm font-medium">Grade</label>
            <Select
              value={form.grade}
              onValueChange={(v) => setForm((p) => ({ ...p, grade: v }))}
            >
              <SelectTrigger className="bg-white/5 border-white/20 text-white rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white/5 backdrop-blur-xl border border-white/10 text-white rounded-xl">
                {grades.map((g) => (
                  <SelectItem
                    key={g}
                    value={g}
                    className="text-white hover:bg-white/10 focus:bg-white/10"
                  >
                    {g}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="block text-white/80 text-sm font-medium">Type</label>
            <Select
              value={form.type}
              onValueChange={(v) => setForm((p) => ({ ...p, type: v as any }))}
            >
              <SelectTrigger className="bg-white/5 border-white/20 text-white rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white/5 backdrop-blur-xl border border-white/10 text-white rounded-xl">
                {(["MCQ", "Open", "Mixed"] as QuizType[]).map((t) => (
                  <SelectItem
                    key={t}
                    value={t}
                    className="text-white hover:bg-white/10 focus:bg-white/10"
                  >
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="block text-white/80 text-sm font-medium">Difficulty</label>
            <Select
              value={form.difficulty}
              onValueChange={(v) => setForm((p) => ({ ...p, difficulty: v as any }))}
            >
              <SelectTrigger className="bg-white/5 border-white/20 text-white rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white/5 backdrop-blur-xl border border-white/10 text-white rounded-xl">
                {(["Easy", "Medium", "Hard"] as Difficulty[]).map((d) => (
                  <SelectItem
                    key={d}
                    value={d}
                    className="text-white hover:bg-white/10 focus:bg-white/10"
                  >
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="block text-white/80 text-sm font-medium">Questions</label>
            <Input
              type="number"
              min={1}
              max={20}
              value={form.questionCount}
              onChange={(e) =>
                setForm((p) => ({ ...p, questionCount: Number(e.target.value) || 10 }))
              }
              className="bg-white/5 border-white/20 text-white rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-white/80 text-sm font-medium">Estimated time (min)</label>
            <Input
              type="number"
              min={5}
              max={60}
              value={form.estimatedTime}
              onChange={(e) =>
                setForm((p) => ({ ...p, estimatedTime: Number(e.target.value) || 15 }))
              }
              className="bg-white/5 border-white/20 text-white rounded-xl"
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={isGenerating || !form.topic.trim()}
          className="w-full bg-gradient-to-r from-[#FF715B] to-[#FF715B]/80 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-[#FF715B]/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              <span>Generate Draft</span>
            </>
          )}
        </Button>
      </form>
    </div>
  );
}