// Provides seeded subject modules for mathematics.
import type { SubjectModuleItem } from "./subjectModulesTypes";

export const subjectModulesSeedMath: Record<string, SubjectModuleItem[]> = {
  "subject-2-math": [
    {
      id: "algebra-foundations",
      title: "Algebra Foundations",
      description: "Variables, expressions, and guided problem-solving for foundational fluency.",
      status: "published",
      lessons: 4,
      duration: "2 weeks",
      order: 0,
      attachedFileIds: [],
      submodules: [
        {
          id: "intro",
          title: "Introduction",
          description: "Review algebra vocabulary and core notation.",
          content: "Students identify variables, constants, and expressions with short warm-up checks.",
          attachedFileIds: [],
          summary: "Students identify variables, constants, and expressions with short warm-up checks.",
          order: 0,
        },
        {
          id: "guided-notes",
          title: "Guided Notes",
          description: "Teacher-led notes on simplifying expressions.",
          content: "A structured note pack covering substitution, order of operations, and worked examples.",
          attachedFileIds: [],
          summary: "A structured note pack covering substitution, order of operations, and worked examples.",
          order: 1,
        },
        {
          id: "practice-set",
          title: "Practice Set",
          description: "Independent drills with mixed-difficulty items.",
          content: "Targeted question bank for classwork, homework, and quick remediation cycles.",
          attachedFileIds: [],
          summary: "Targeted question bank for classwork, homework, and quick remediation cycles.",
          order: 2,
        },
      ],
    },
    {
      id: "quadratic-functions",
      title: "Quadratic Functions",
      description: "Graphing, roots, and worked examples for class discussion and homework review.",
      status: "draft",
      lessons: 5,
      duration: "3 weeks",
      order: 1,
      attachedFileIds: [],
      submodules: [
        {
          id: "graphing",
          title: "Graphing",
          description: "Vertex form, intercepts, and shape analysis.",
          content: "A lesson sequence focused on reading and sketching quadratic graphs from multiple forms.",
          attachedFileIds: [],
          summary: "A lesson sequence focused on reading and sketching quadratic graphs from multiple forms.",
          order: 0,
        },
        {
          id: "factoring-review",
          title: "Factoring Review",
          description: "Core factoring patterns before solving quadratics.",
          content: "Short review materials to rebuild factoring confidence before assessment practice.",
          attachedFileIds: [],
          summary: "Short review materials to rebuild factoring confidence before assessment practice.",
          order: 1,
        },
      ],
    },
  ],
};
