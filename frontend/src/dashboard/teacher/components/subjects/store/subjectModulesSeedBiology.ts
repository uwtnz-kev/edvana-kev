// Provides seeded subject modules for biology.
import type { SubjectModuleItem } from "./subjectModulesTypes";

export const subjectModulesSeedBiology: Record<string, SubjectModuleItem[]> = {
  "subject-2-bio": [
    {
      id: "cell-biology",
      title: "Cell Biology",
      description: "Cell structure, transport, and microscope lab preparation.",
      status: "published",
      lessons: 4,
      duration: "2 weeks",
      order: 0,
      attachedFileIds: [],
      submodules: [
        {
          id: "cell-structure",
          title: "Cell Structure",
          description: "Organelles and their functions in plant and animal cells.",
          content: "Overview slides and reference diagrams for membrane, nucleus, mitochondria, and chloroplasts.",
          attachedFileIds: [],
          summary: "Overview slides and reference diagrams for membrane, nucleus, mitochondria, and chloroplasts.",
          order: 0,
        },
        {
          id: "transport-notes",
          title: "Transport Notes",
          description: "Diffusion, osmosis, and active transport.",
          content: "Teacher notes with diagrams and exit ticket prompts for membrane transport.",
          attachedFileIds: [],
          summary: "Teacher notes with diagrams and exit ticket prompts for membrane transport.",
          order: 1,
        },
        {
          id: "lab-activity",
          title: "Lab Activity",
          description: "Microscope setup and observation checklist.",
          content: "Step-by-step lab workflow with group roles, material checklist, and observation prompts.",
          attachedFileIds: [],
          summary: "Step-by-step lab workflow with group roles, material checklist, and observation prompts.",
          order: 2,
        },
      ],
    },
    {
      id: "human-systems",
      title: "Human Systems",
      description: "Guided notes and review tasks for major body systems.",
      status: "published",
      lessons: 3,
      duration: "2 weeks",
      order: 1,
      attachedFileIds: [],
      submodules: [
        {
          id: "circulatory-system",
          title: "Circulatory System",
          description: "Heart structure and blood flow routines.",
          content: "Students trace blood flow and compare oxygenated and deoxygenated pathways.",
          attachedFileIds: [],
          summary: "Students trace blood flow and compare oxygenated and deoxygenated pathways.",
          order: 0,
        },
        {
          id: "respiratory-system",
          title: "Respiratory System",
          description: "Gas exchange and lung function.",
          content: "Content blocks on alveoli, breathing mechanics, and linked review questions.",
          attachedFileIds: [],
          summary: "Content blocks on alveoli, breathing mechanics, and linked review questions.",
          order: 1,
        },
      ],
    },
  ],
};
