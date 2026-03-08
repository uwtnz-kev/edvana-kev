// Provides seeded subject modules for biology.
import type { SubjectModuleItem } from "./subjectModulesTypes";

export const subjectModulesSeedBiology: Record<string, SubjectModuleItem[]> = {
  "subject-2-bio": [
    { id: "cell-biology", title: "Cell Biology", description: "Cell structure, transport, and microscope lab preparation.", status: "published", lessons: 4, duration: "2 weeks", submodules: [{ id: "cell-structure", title: "Cell Structure", description: "Organelles and their functions in plant and animal cells.", summary: "Overview slides and reference diagrams for membrane, nucleus, mitochondria, and chloroplasts." }, { id: "transport-notes", title: "Transport Notes", description: "Diffusion, osmosis, and active transport.", summary: "Teacher notes with diagrams and exit ticket prompts for membrane transport." }, { id: "lab-activity", title: "Lab Activity", description: "Microscope setup and observation checklist.", summary: "Step-by-step lab workflow with group roles, material checklist, and observation prompts." }] },
    { id: "human-systems", title: "Human Systems", description: "Guided notes and review tasks for major body systems.", status: "published", lessons: 3, duration: "2 weeks", submodules: [{ id: "circulatory-system", title: "Circulatory System", description: "Heart structure and blood flow routines.", summary: "Students trace blood flow and compare oxygenated and deoxygenated pathways." }, { id: "respiratory-system", title: "Respiratory System", description: "Gas exchange and lung function.", summary: "Content blocks on alveoli, breathing mechanics, and linked review questions." }] },
  ],
};
