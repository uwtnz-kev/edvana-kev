// Combines seeded assignment records into the existing exported assignment dataset.
import type { TeacherAssignment } from "../AssignmentsTypes";
import { assignmentSeedBatchA } from "./assignmentSeedBatchA";
import { assignmentSeedBatchB } from "./assignmentSeedBatchB";

export const seedAssignments: TeacherAssignment[] = [...assignmentSeedBatchA, ...assignmentSeedBatchB];
