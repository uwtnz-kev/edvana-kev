import { useMemo, useState } from "react";
import { BarChart3 } from "lucide-react";
import type { TeacherQuiz } from "./teacherQuizTypes";
import { seedQuizzes } from "./teacherQuizMock";
import TeacherQuizCreatorForm from "./TeacherQuizCreatorForm";
import TeacherQuizStatsCards from "./TeacherQuizStatsCards";
import TeacherQuizLibrary from "./TeacherQuizLibrary";
import TeacherQuizFeatures from "./TeacherQuizFeatures";
import QuizPreviewModal from "./QuizPreviewModal";

export default function TeacherQuizGenerator() {
  const [quizzes, setQuizzes] = useState<TeacherQuiz[]>(seedQuizzes);
  const [previewId, setPreviewId] = useState<string | null>(null);

  const previewQuiz = useMemo(() => {
    if (!previewId) return null;
    return quizzes.find((q) => q.id === previewId) ?? null;
  }, [previewId, quizzes]);

  const stats = useMemo(() => {
    const total = quizzes.length;
    const published = quizzes.filter((q) => q.status === "published").length;
    const drafts = quizzes.filter((q) => q.status === "draft").length;
    const totalQuestions = quizzes.reduce((sum, q) => sum + q.totalQuestions, 0);
    return { total, published, drafts, totalQuestions };
  }, [quizzes]);

  const onCreated = (quiz: TeacherQuiz) => {
    setQuizzes((prev) => [quiz, ...prev]);
  };

  const onPublish = (id: string) => {
    setQuizzes((prev) =>
      prev.map((q) =>
        q.id === id ? { ...q, status: "published", publishedTo: ["S3A"] } : q
      )
    );
  };

  const onDuplicate = (id: string) => {
    const q = quizzes.find((x) => x.id === id);
    if (!q) return;

    const copy: TeacherQuiz = {
      ...q,
      id: `tq-${Date.now()}`,
      title: `${q.title} (Copy)`,
      status: "draft",
      createdAt: new Date().toISOString(),
      publishedTo: undefined,
    };

    setQuizzes((prev) => [copy, ...prev]);
  };

  const onPreview = (id: string) => {
    setPreviewId(id);
  };

  return (
    <div className="space-y-6">
      <TeacherQuizStatsCards stats={stats} />

      <TeacherQuizCreatorForm onCreated={onCreated} />

      <TeacherQuizLibrary
        quizzes={quizzes}
        onPreview={onPreview}
        onDuplicate={onDuplicate}
        onPublish={onPublish}
      />

      <TeacherQuizFeatures />

      <div className="group bg-gradient-to-r from-[#1EA896]/10 to-[#FF715B]/10 border border-white/10 rounded-xl p-4 hover:bg-gradient-to-r from-[#1EA896]/20 to-[#FF715B]/20 transition-all duration-300 hover:shadow-2xl hover:shadow-[#8B6F52]/25 hover:-translate-y-1">
        <div className="flex items-start gap-2">
          <BarChart3 className="h-5 w-5 text-[#1EA896] mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
          <div>
            <h3 className="text-white font-semibold text-sm group-hover:text-white transition-colors duration-300">
              Pro tips
            </h3>
            <p className="text-white/70 text-xs mt-1 leading-tight">
              Align quizzes with curriculum goals. Use varied question types (multiple choice,
              short answer, application) at different difficulties for all learners. Regular quizzes
              track progress and improve teaching.
            </p>
          </div>
        </div>
      </div>

      <QuizPreviewModal
        open={previewId !== null}
        quiz={previewQuiz}
        onOpenChange={(open) => {
          if (!open) setPreviewId(null);
        }}
      />
    </div>
  );
}