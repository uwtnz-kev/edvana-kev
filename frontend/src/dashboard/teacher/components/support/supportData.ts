export type TicketType = "technical" | "content" | "assessment" | "schedule" | "account";

export const cards = [
  { key: "technical", title: "Technical", desc: "Errors, loading issues" },
  { key: "content", title: "Content", desc: "CBC materials request" },
  { key: "assessment", title: "Assessment", desc: "Quizzes, rubrics" },
  { key: "schedule", title: "Schedule", desc: "Timetable changes" },
  { key: "account", title: "Account", desc: "Access issues" },
] as const;

export const typeHints: Record<TicketType, { label: string; hint: string }> = {
  technical: { label: "Technical issue", hint: "Include steps, screenshot, and page URL." },
  content: { label: "Content request", hint: "Include subject, grade, unit, objectives, format." },
  assessment: { label: "Assessment support", hint: "Include class, title, and what you need (rubric, questions, feedback)." },
  schedule: { label: "Schedule change", hint: "Include day, time slot, class, and reason." },
  account: { label: "Account help", hint: "Include your email and what access is missing." },
};

export const faqs = [
  {
    q: "Why can’t my students see a quiz or assignment?",
    a: "Confirm it is published to the correct class and the due date is in the future.",
  },
  {
    q: "My page is blank or something is not loading.",
    a: "Hard refresh (Ctrl+Shift+R). If it persists, submit a Technical ticket with a screenshot.",
  },
  {
    q: "How do I request new CBC aligned content?",
    a: "Use Content request. Include subject, grade, unit, objectives, and format.",
  },
  {
    q: "How do I request a schedule change?",
    a: "Use Schedule change. Include day, time slot, class, and reason. Admin approves.",
  },
];
