// Combines seeded exam records into the existing exported exam dataset.
import type { TeacherExam } from "../ExamsTypes";
import { examSeedBatchA } from "./examSeedBatchA";
import { examSeedBatchB } from "./examSeedBatchB";

export const seedExams: TeacherExam[] = [...examSeedBatchA, ...examSeedBatchB];
