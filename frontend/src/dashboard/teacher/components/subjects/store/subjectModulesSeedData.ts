// Combines seeded subject module data into the initial store snapshot.
import type { SubjectModuleItem } from "./subjectModulesTypes";
import { subjectModulesSeedBiology } from "./subjectModulesSeedBiology";
import { subjectModulesSeedMath } from "./subjectModulesSeedMath";
import { subjectModulesSeedPhysicsA } from "./subjectModulesSeedPhysicsA";
import { subjectModulesSeedPhysicsB } from "./subjectModulesSeedPhysicsB";

export const subjectModulesSeedData: Record<string, SubjectModuleItem[]> = {
  ...subjectModulesSeedMath,
  ...subjectModulesSeedBiology,
  "subject-2-physics": [...subjectModulesSeedPhysicsA, ...subjectModulesSeedPhysicsB],
};
