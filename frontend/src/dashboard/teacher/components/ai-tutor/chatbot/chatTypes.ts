export type Msg = { id: string; role: "teacher" | "ai"; content: string };

export type Intent =
  | "lesson_plan"
  | "quiz"
  | "rubric"
  | "explanation"
  | "marking"
  | "unknown";
