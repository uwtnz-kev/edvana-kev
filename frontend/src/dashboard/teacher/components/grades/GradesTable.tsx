import { StudentGrade, GradeItem } from "./gradesTypes";
import GradeEditCell from "./GradeEditCell";

interface Props {
  grades: StudentGrade[];
  gradeItems: GradeItem[];
  onGradeSaved: () => void;
}

function getPercent(score: number | null, max: number) {
  if (score === null) return null;
  return Math.round((score / max) * 100);
}

export default function GradesTable({ grades, gradeItems, onGradeSaved }: Props) {
  return (
    <div className="group rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 overflow-hidden hover:bg-white/15 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#8B6F52]/25">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-white">
          <thead className="bg-white/10">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Student</th>
              <th className="px-4 py-3 text-left font-medium">Assessment</th>
              <th className="px-4 py-3 text-left font-medium">Score</th>
              <th className="px-4 py-3 text-left font-medium">Percent</th>
              <th className="px-4 py-3 text-left font-medium">Updated</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((grade) => {
              const item = gradeItems.find((i) => i.id === grade.gradeItemId);
              if (!item) return null;

              const percent = getPercent(grade.score, item.maxScore);

              return (
                <tr
                  key={grade.id}
                  className="border-t border-white/10 hover:bg-white/10 transition-all duration-200 group-hover:bg-white/5"
                >
                  <td className="px-4 py-3">{grade.studentName}</td>
                  <td className="px-4 py-3">{item.title}</td>
                  <td className="px-4 py-3">
                    <GradeEditCell
                      grade={grade}
                      maxScore={item.maxScore}
                      onSaved={onGradeSaved}
                    />
                  </td>
                  <td className="px-4 py-3">
                    {percent !== null ? `${percent}%` : "—"}
                  </td>
                  <td className="px-4 py-3 text-white/60">
                    {grade.updatedAt ? new Date(grade.updatedAt).toLocaleDateString() : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {grades.length === 0 && (
          <div className="p-6 text-center text-white/60">No grades available</div>
        )}
      </div>
    </div>
  );
}
