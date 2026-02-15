import type { Intent } from "./chatTypes";

export function detectIntent(text: string): Intent {
  const t = text.toLowerCase();
  if (/(lesson|plan|teach|objective|activities)/.test(t)) return "lesson_plan";
  if (/(quiz|mcq|questions|test|assessment)/.test(t)) return "quiz";
  if (/(rubric|criteria|marking scheme|grading rubric)/.test(t)) return "rubric";
  if (/(explain|what is|how does|why|define|difference)/.test(t)) return "explanation";
  if (/(grade|mark|feedback|comment|score)/.test(t)) return "marking";
  return "unknown";
}

export function extractGrade(text: string): string | null {
  const m = text.match(/\b(S[1-6]|P[1-6])\b/i);
  return m ? m[1].toUpperCase() : null;
}

export function extractCount(text: string): number | null {
  const m = text.match(/\b(\d{1,2})\s*(questions|qs|items)\b/i);
  if (m) return Number(m[1]);
  const m2 = text.match(/\b(\d{1,2})\b/);
  return m2 ? Number(m2[1]) : null;
}

export function safeLine(s: string) {
  return s.replace(/\s+/g, " ").trim();
}

export function makeLessonPlan(args: {
  subject: string;
  grade: string;
  objective: string;
  durationMin: number;
}) {
  const { subject, grade, objective, durationMin } = args;
  return `Lesson Plan (${subject} • ${grade} • ${durationMin} min)

Learning objective
${objective}

Materials
- Board or projector
- Exercise sheets
- Markers

Lesson flow
1 Starter (5 min)
- Quick recall question

2 Teach (10 min)
- Explain with 1 worked example

3 Guided practice (10 min)
- 2 questions as a class

4 Independent practice (10 min)
- 4 short questions

5 Exit ticket (5 min)
- 1 question that tests the objective`;
}

export function makeQuiz(args: {
  topic: string;
  grade: string;
  count: number;
  difficulty: "easy" | "medium" | "hard";
}) {
  const { topic, grade, count, difficulty } = args;
  const n = Math.max(5, Math.min(count, 20));
  const qs = Array.from({ length: n }).map(
    (_, i) => `${i + 1}. ${topic} question (${difficulty})`
  );
  return `Quiz Draft (${topic} • ${grade} • ${n} questions • ${difficulty})

Questions
${qs.join("\n")}

Answer key
- Generated after you confirm MCQ or short answer.`;
}

export function makeRubric(args: { assignment: string; total: number }) {
  const { assignment, total } = args;
  return `Rubric Draft (${assignment})

Total: ${total} points

Criteria
1 Accuracy
2 Clarity
3 Evidence
4 Presentation

Feedback starters
- Strength:
- Improvement:
- Next step:`;
}

export function makeExplanation(args: { topic: string; grade: string }) {
  const { topic, grade } = args;
  return `Explanation (${topic} • ${grade})

1 Define key terms
2 Explain rule
3 Show example
4 Common mistake
5 Quick check question`;
}

export function buildTeacherReply(userText: string, lastTeacherText: string) {
  const text = userText.trim();
  const intent = detectIntent(text);
  const grade = extractGrade(text) ?? extractGrade(lastTeacherText) ?? "S3";

  if (intent === "unknown") {
    return `I can help with:
1 Lesson plan
2 Quiz
3 Rubric
4 Explanation
5 Marking feedback

Reply with one + subject + grade.`;
  }

  if (intent === "lesson_plan") {
    const objective = safeLine(
      text.includes("objective:") ? text.split("objective:")[1] : "Students will understand the main concept."
    );
    return makeLessonPlan({ subject: "Subject", grade, objective, durationMin: 40 });
  }

  if (intent === "quiz") {
    const topic = safeLine(text.replace(/\bquiz\b/i, "")) || "Topic";
    const count = extractCount(text) ?? 10;
    const difficulty = /hard/i.test(text) ? "hard" : /easy/i.test(text) ? "easy" : "medium";
    return makeQuiz({ topic, grade, count, difficulty });
  }

  if (intent === "rubric") return makeRubric({ assignment: "Assignment", total: 20 });

  if (intent === "marking") {
    return `Marking help

Share:
- Prompt
- Sample answer
- Total marks

I will produce a marking guide + feedback comments.`;
  }

  return makeExplanation({ topic: safeLine(text), grade });
}
