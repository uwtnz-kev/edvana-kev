// Static subject workspace metadata used by the subject landing view.
import type { TeacherSubjectNavData } from "../../components/subjects/TeacherSubjectCard";

export type SubjectWorkspaceData = TeacherSubjectNavData & {
  classLabels: string[];
};

export const subjectWorkspaceData: SubjectWorkspaceData[] = [
  { id: "subject-2-math", name: "Mathematics", title: "Advanced Mathematics", description: "Plan lessons, publish quizzes, and grade assignments for senior classes.", classesCount: 3, studentsCount: 96, pendingToGrade: 12, nextLesson: "Quadratic functions", color: "text-[#1EA896]", bgGradient: "bg-gradient-to-br from-[#1EA896] to-[#1EA896]/80", classLabels: ["S3A", "S3B", "S2A"] },
  { id: "subject-2-bio", name: "Biology", title: "Biology Laboratory", description: "Manage lab activities and evaluate scientific reports with rubrics.", classesCount: 2, studentsCount: 52, pendingToGrade: 6, nextLesson: "Cell transport", color: "text-[#FF715B]", bgGradient: "bg-gradient-to-br from-[#FF715B] to-[#FF715B]/80", classLabels: ["S2A", "S2B"] },
  { id: "subject-2-chem", name: "Chemistry", title: "Chemistry Fundamentals", description: "Set practice questions and track progress by unit mastery.", classesCount: 2, studentsCount: 64, pendingToGrade: 8, nextLesson: "Stoichiometry", color: "text-[#4C5454]", bgGradient: "bg-gradient-to-br from-[#4C5454] to-[#523F38]", classLabels: ["S2A", "S2B"] },
  { id: "subject-2-physics", name: "Physics", title: "Physics Concepts", description: "Coordinate class experiments and monitor conceptual understanding.", classesCount: 2, studentsCount: 58, pendingToGrade: 9, nextLesson: "Forces and motion", color: "text-[#523F38]", bgGradient: "bg-gradient-to-br from-[#523F38] to-[#4C5454]", classLabels: ["S3A", "S3B"] },
  { id: "subject-2-english", name: "English", title: "English Language", description: "Assign essays, track reading tasks, and review writing outcomes.", classesCount: 2, studentsCount: 48, pendingToGrade: 5, nextLesson: "Argumentative writing", color: "text-[#1EA896]", bgGradient: "bg-gradient-to-br from-[#1EA896] to-[#1EA896]/80", classLabels: ["S1A", "S1B"] },
  { id: "subject-2-geography", name: "Geography", title: "Geography and Mapping", description: "Prepare map-based tasks and evaluate fieldwork submissions.", classesCount: 1, studentsCount: 32, pendingToGrade: 2, nextLesson: "Climate regions", color: "text-[#FF715B]", bgGradient: "bg-gradient-to-br from-[#FF715B] to-[#FF715B]/80", classLabels: ["S1A"] },
];
