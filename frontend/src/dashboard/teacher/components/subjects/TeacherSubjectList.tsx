/**
 * TeacherSubjectList
 * ------------------
 * Renders the T ea ch er Su bj ec tL is t UI for the teacher dashboard s ub je ct s feature.
 */
import { TeacherSubjectCard } from "./TeacherSubjectCard";
import type { TeacherSubjectNavData } from "./TeacherSubjectCard";

type TeacherSubjectListProps = {
  subjects: TeacherSubjectNavData[];
};

export function TeacherSubjectList({ subjects }: TeacherSubjectListProps) {
  if (subjects.length === 0) {
    return (
      <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl p-8 text-center">
        <p className="text-white/70 text-lg">No subjects found</p>
        <p className="text-white/50 text-sm mt-2">Try adjusting your search or class filter.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {subjects.map((subject) => (
        <TeacherSubjectCard key={subject.id} subject={subject} />
      ))}
    </div>
  );
}

