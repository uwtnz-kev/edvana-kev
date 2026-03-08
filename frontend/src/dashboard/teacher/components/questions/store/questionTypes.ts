// Defines the shared question builder types used across the store and UI.
export type QuestionBuilderAssessmentType = "quiz" | "assignment" | "exam";

export type QuestionBuilderQuestionType =
  | "multiple_choice"
  | "matching"
  | "identification"
  | "short_answer"
  | "true_false";

export type QuestionBuilderMatchingPair = {
  id: string;
  left: string;
  right: string;
};

export type QuestionBuilderQuestion = {
  id: string;
  itemId: string;
  type: QuestionBuilderAssessmentType;
  questionType: QuestionBuilderQuestionType;
  questionText: string;
  points: number;
  options: string[];
  correctAnswer: string;
  matchingPairs: QuestionBuilderMatchingPair[];
  identificationAnswer: string;
  shortAnswer: string;
  trueFalseAnswer: "true" | "false" | "";
};

export type QuestionsState = {
  byKey: Record<string, QuestionBuilderQuestion[]>;
};
