// Provides seeded subject modules for mathematics.
import type { SubjectModuleItem } from "./subjectModulesTypes";

export const subjectModulesSeedMath: Record<string, SubjectModuleItem[]> = {
  "subject-2-math": [
    { id: "algebra-foundations", title: "Algebra Foundations", description: "Variables, expressions, and guided problem-solving for foundational fluency.", status: "published", lessons: 4, duration: "2 weeks", submodules: [{ id: "intro", title: "Introduction", description: "Review algebra vocabulary and core notation.", summary: "Students identify variables, constants, and expressions with short warm-up checks." }, { id: "guided-notes", title: "Guided Notes", description: "Teacher-led notes on simplifying expressions.", summary: "A structured note pack covering substitution, order of operations, and worked examples." }, { id: "practice-set", title: "Practice Set", description: "Independent drills with mixed-difficulty items.", summary: "Targeted question bank for classwork, homework, and quick remediation cycles." }] },
    { id: "quadratic-functions", title: "Quadratic Functions", description: "Graphing, roots, and worked examples for class discussion and homework review.", status: "draft", lessons: 5, duration: "3 weeks", submodules: [{ id: "graphing", title: "Graphing", description: "Vertex form, intercepts, and shape analysis.", summary: "A lesson sequence focused on reading and sketching quadratic graphs from multiple forms." }, { id: "factoring-review", title: "Factoring Review", description: "Core factoring patterns before solving quadratics.", summary: "Short review materials to rebuild factoring confidence before assessment practice." }] },
  ],
};
