// Combines seeded quiz records into the existing exported quiz dataset.
import type { TeacherQuiz } from "../QuizTypes";
import { seedQuizBatchA } from "./quizSeedBatchA";
import { seedQuizBatchB } from "./quizSeedBatchB";

export const seedQuizzes2: TeacherQuiz[] = [...seedQuizBatchA, ...seedQuizBatchB];
