import { useEffect, useMemo, useState } from "react";
import { Users, Save } from "lucide-react";
import AssessmentItemSearchSelect from "@/dashboard/teacher/components/grades/AssessmentItemSearchSelect";
import {
  GlassSelect,
  GlassSelectTrigger,
  GlassSelectValue,
  GlassSelectContent,
  GlassSelectItem,
} from "@/dashboard/schooladmin/components/ui/GlassSelect";
import { Input } from "@/components/ui/input";
import { mockStudentUsers } from "@/shared/mocks/users/students";
import { USER_ROLES } from "@/constants/roles";

type Props = { listName: string };
type Row = { studentId: string; studentName: string; score: string };

export default function GradeListBuilderCard({ listName }: Props) {
  const gradeOptions = useMemo(
    () => [
      { id: "S1", title: "S1" },
      { id: "S2", title: "S2" },
      { id: "S3", title: "S3" },
    ],
    []
  );

  const subjectOptions = useMemo(
    () => [
      { id: "math", title: "Mathematics" },
      { id: "science", title: "Science" },
      { id: "english", title: "English" },
    ],
    []
  );

  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [semester, setSemester] = useState("");
  const [assessmentType, setAssessmentType] = useState<"" | "quiz" | "assignment" | "exam">("");
  const [maxScore, setMaxScore] = useState("");
  const [rows, setRows] = useState<Row[]>([]);

  const students = useMemo(() => {
    return mockStudentUsers
      .filter(u => u.role === USER_ROLES.STUDENT)
      .filter(u => (grade ? u.grade === grade : true))
      .map(u => ({ id: u.id, name: `${u.firstName} ${u.lastName}` }));
  }, [grade]);

  const ready = Boolean(grade && subject && semester && assessmentType);

  useEffect(() => {
    if (!ready) {
      setRows([]);
      return;
    }
    setRows(students.map(s => ({
      studentId: s.id,
      studentName: s.name,
      score: "",
    })));
  }, [ready, students]);

  function setScore(studentId: string, value: string) {
    setRows(prev =>
      prev.map(r =>
        r.studentId === studentId ? { ...r, score: value } : r
      )
    );
  }

  function saveDraft() {
    const payload = {
      listName,
      grade,
      subject,
      semester,
      assessmentType,
      maxScore: maxScore === "" ? null : Number(maxScore),
      rows: rows.map(r => ({
        studentId: r.studentId,
        score: r.score === "" ? null : Number(r.score),
      })),
    };

    localStorage.setItem(
      `teacher.gradeListDraft.${listName}`,
      JSON.stringify(payload)
    );
  }

  return (
    <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-4 hover:bg-white/15 transition space-y-4">
      
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-[#8B6F52]/75 to-[#6F5238]/75 flex items-center justify-center">
          <Users className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="text-sm font-medium text-[#3B240F]">New grade list</p>
          <p className="text-xs text-[#6B4F3A] truncate max-w-[360px]">
            {listName}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
        <AssessmentItemSearchSelect
          value={grade}
          onChange={setGrade}
          items={gradeOptions}
          placeholder="Select grade"
        />

        <AssessmentItemSearchSelect
          value={subject}
          onChange={setSubject}
          items={subjectOptions}
          placeholder="Select subject"
        />

        <GlassSelect value={semester} onValueChange={setSemester}>
          <GlassSelectTrigger className="w-full">
            <GlassSelectValue placeholder="Select semester" />
          </GlassSelectTrigger>
          <GlassSelectContent>
            <GlassSelectItem value="term1">Term 1</GlassSelectItem>
            <GlassSelectItem value="term2">Term 2</GlassSelectItem>
            <GlassSelectItem value="term3">Term 3</GlassSelectItem>
          </GlassSelectContent>
        </GlassSelect>

        <GlassSelect
          value={assessmentType}
          onValueChange={v => setAssessmentType(v as any)}
        >
          <GlassSelectTrigger className="w-full">
            <GlassSelectValue placeholder="Type" />
          </GlassSelectTrigger>
          <GlassSelectContent>
            <GlassSelectItem value="quiz">Quiz</GlassSelectItem>
            <GlassSelectItem value="assignment">Assignment</GlassSelectItem>
            <GlassSelectItem value="exam">Exam</GlassSelectItem>
          </GlassSelectContent>
        </GlassSelect>

        <Input
          value={maxScore}
          onChange={e => setMaxScore(e.target.value)}
          placeholder="Max score"
          type="number"
          className="bg-white/10 border-white/20 text-[#3B240F] placeholder:text-[#6B4F3A]"
        />
      </div>

      {/* Student Table */}
      {!ready ? (
        <div className="text-sm text-[#6B4F3A]">
          Select grade, subject, semester, and type to load students.
        </div>
      ) : (
        <div className="rounded-2xl bg-white/10 border border-white/15 overflow-hidden">
          <div className="max-h-72 overflow-auto">
            <table className="w-full text-sm">
              <thead className="bg-white/10">
                <tr className="text-[#3B240F]">
                  <th className="px-4 py-3 text-left font-medium">Student</th>
                  <th className="px-4 py-3 text-left font-medium">Score</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(r => (
                  <tr
                    key={r.studentId}
                    className="border-t border-white/10 hover:bg-white/10 transition"
                  >
                    <td className="px-4 py-3 text-[#3B240F]">
                      {r.studentName}
                    </td>
                    <td className="px-4 py-3">
                      <Input
                        value={r.score}
                        onChange={e => setScore(r.studentId, e.target.value)}
                        placeholder="Score"
                        type="number"
                        className="w-28 bg-white/10 border-white/20 text-[#3B240F] placeholder:text-[#6B4F3A]"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {rows.length === 0 && (
              <div className="p-6 text-center text-[#6B4F3A]">
                No students found
              </div>
            )}
          </div>
        </div>
      )}

      {/* Save Button moved below */}
    {ready && (
  <div className="flex justify-end mt-2">
    <button
      type="button"
      onClick={saveDraft}
      className="h-9 px-4 rounded-xl bg-gradient-to-br from-[#1EA896]/85 to-[#159A85]/85 text-white hover:opacity-90 transition text-sm font-medium flex items-center gap-2"
    >
      <Save className="h-4 w-4" />
      Save
    </button>
  </div>
)}
    </div>
  );
}