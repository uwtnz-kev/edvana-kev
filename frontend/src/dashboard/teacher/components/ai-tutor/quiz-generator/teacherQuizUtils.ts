import type { Question, QuizType, TeacherQuiz, Difficulty } from "./teacherQuizTypes";

export function makeQuestions(topic: string, type: QuizType, count: number): Question[] {
  const n = Math.max(1, Math.min(count, 20));
  const out: Question[] = [];

  for (let i = 0; i < n; i++) {
    const qType = type === "Mixed" ? (i % 2 === 0 ? "MCQ" : "Open") : type;
    if (qType === "MCQ") {
      out.push({
        id: `q${i + 1}`,
        type: "MCQ",
        question: `MCQ ${i + 1}: ${topic} (teacher draft)`,
        options: ["Option A", "Option B", "Option C", "Option D"],
        correctAnswer: "Option A",
      });
    } else {
      out.push({
        id: `q${i + 1}`,
        type: "Open",
        question: `Open ${i + 1}: Explain ${topic} in your own words.`,
      });
    }
  }

  return out;
}

export function buildNewQuiz(params: {
  topic: string;
  subject: string;
  grade: string;
  type: QuizType;
  difficulty: Difficulty;
  questionCount: number;
  estimatedTime: number;
}): TeacherQuiz {
  const now = new Date().toISOString();
  return {
    id: `tq-${Date.now()}`,
    title: params.topic.trim(),
    subject: params.subject,
    grade: params.grade,
    type: params.type,
    difficulty: params.difficulty,
    totalQuestions: params.questionCount,
    estimatedTime: params.estimatedTime,
    createdAt: now,
    status: "draft",
    questions: makeQuestions(params.topic.trim(), params.type, params.questionCount),
  };
}
