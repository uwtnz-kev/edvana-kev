import { useMemo, useState } from "react";
import { ClipboardList, SlidersHorizontal} from "lucide-react";
import {
  GlassSelect,
  GlassSelectTrigger,
  GlassSelectValue,
  GlassSelectContent,
  GlassSelectItem,
} from "@/dashboard/schooladmin/components/ui/GlassSelect";
import { getGradesState } from "@/dashboard/teacher/components/grades/gradesStore";
import type { StudentGrade } from "@/dashboard/teacher/components/grades/gradesTypes";
import GradesHeader from "@/dashboard/teacher/components/grades/GradesHeader";
import GradesStatsCards from "@/dashboard/teacher/components/grades/GradesStatsCards";
import AssessmentItemSearchSelect from "@/dashboard/teacher/components/grades/AssessmentItemSearchSelect";
import GradesFilters from "@/dashboard/teacher/components/grades/GradesFilters";
import GradesTable from "@/dashboard/teacher/components/grades/GradesTable";

import { mockStudentUsers } from "../../../shared/mocks/users/students";
import { USER_ROLES } from "@/constants/roles";

export default function GradesView() {
  const [subjectId, setSubjectId] = useState("math");
  const [assessmentType, setAssessmentType] = useState<"all" | "assignment" | "exam" | "quiz">(
    "all"
  );
  const [gradeItemId, setGradeItemId] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [search, setSearch] = useState("");
  const [version,setVersion ] = useState(0);
  
  const state = useMemo(() => getGradesState(), [version]);
  const gradeItems = state.gradeItems;

  const classOptions = useMemo(
    () => [
      { id: "", title: "All" },
      { id: "S1", title: "S1" },
      { id: "S2", title: "S2" },
      { id: "S3", title: "S3" },
    ],
    []
  );

  const students = useMemo(() => {
    return mockStudentUsers
      .filter(u => u.role === USER_ROLES.STUDENT)
      .map(u => ({
        id: u.id,
        firstName: u.firstName,
        lastName: u.lastName,
        grade: u.grade,
        subGrade: u.subGrade,
      }));
  }, []);

  const filteredItems = useMemo(() => {
    return gradeItems.filter(i => {
      if (i.subjectId !== subjectId) return false;
      if (assessmentType === "all") return true;
      return i.type === assessmentType;
    });
  }, [gradeItems, subjectId, assessmentType]);

  const rows: StudentGrade[] = useMemo(() => {
    const q = search.trim().toLowerCase();

    const eligibleStudents = students.filter(s => {
      const nameHit = !q || `${s.firstName} ${s.lastName}`.toLowerCase().includes(q);
      const classHit =
        !classFilter ||
        s.grade === classFilter ||
        `${s.grade ?? ""}${s.subGrade ?? ""}` === classFilter;
      return nameHit && classHit;
    });

    const itemsToShow = gradeItemId ? filteredItems.filter(i => i.id === gradeItemId) : filteredItems;

    return eligibleStudents.flatMap(s => {
      const studentName = `${s.firstName} ${s.lastName}`;

      return itemsToShow.map(item => {
        const id = `${s.id}:${item.id}`;
        const existing = state.studentGrades.find(g => g.id === id);

        return (
          existing ?? {
            id,
            studentId: s.id,
            studentName,
            gradeItemId: item.id,
            score: null,
            updatedAt: "",
          }
        );
      });
    });
  }, [students, search, classFilter, gradeItemId, filteredItems, state.studentGrades]);

  const stats = useMemo(() => {
    if (!rows.length) return { average: 0, completionRate: 0, highest: 0, lowest: 0 };

    const scored = rows.filter(r => r.score !== null) as Array<StudentGrade & { score: number }>;

    const percents = scored
      .map(r => {
        const item = gradeItems.find(i => i.id === r.gradeItemId);
        const max = item?.maxScore ?? 100;
        return Math.round((r.score / max) * 100);
      })
      .filter(n => Number.isFinite(n));

    const avg = percents.length ? percents.reduce((a, b) => a + b, 0) / percents.length : 0;

    return {
      average: avg,
      completionRate: rows.length ? (scored.length / rows.length) * 100 : 0,
      highest: percents.length ? Math.max(...percents) : 0,
      lowest: percents.length ? Math.min(...percents) : 0,
    };
  }, [rows, gradeItems]);

  return (
    <div className="mx-auto w-full max-w-6xl space-y-4 p-6">
      <GradesHeader subjectId={subjectId} onSubjectChange={setSubjectId} />
      <GradesStatsCards {...stats} />

      <div className="group flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-4 hover:bg-white/15 transition-all duration-300 hover:shadow-xl hover:shadow-[#8B6F52]/20">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-[#8B6F52]/75 to-[#6F5238]/75 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <ClipboardList className="h-5 w-5 text-white" />
          </div>
          <span className="text-sm font-medium text-[#3B240F]">Assessment Type</span>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2 text-[#6B4F3A]">
            <SlidersHorizontal className="h-4 w-4" />
            <span className="text-sm font-medium">Filters</span>
          </div>

          <AssessmentItemSearchSelect
            value={classFilter}
            onChange={setClassFilter}
            items={classOptions}
            placeholder="Search..."
            className="sm:w-48 hover:shadow-md hover:shadow-[#8B6F52]/20 transition-all duration-200"
          />

          <GlassSelect value={assessmentType} onValueChange={v => setAssessmentType(v as any)}>
            <GlassSelectTrigger className="w-full sm:w-44 hover:bg-white/20 hover:shadow-md hover:shadow-[#8B6F52]/20 transition-all duration-200">
              <GlassSelectValue placeholder="Select type" />
            </GlassSelectTrigger>
            <GlassSelectContent className="hover:bg-white/20">
              <GlassSelectItem 
                value="all" 
                className="hover:bg-white/20 transition-colors duration-200 cursor-pointer"
              >
                All
              </GlassSelectItem>
              <GlassSelectItem 
                value="exam" 
                className="hover:bg-white/20 transition-colors duration-200 cursor-pointer"
              >
                Exam
              </GlassSelectItem>
              <GlassSelectItem 
                value="assignment" 
                className="hover:bg-white/20 transition-colors duration-200 cursor-pointer"
              >
                Assignment
              </GlassSelectItem>
              <GlassSelectItem 
                value="quiz" 
                className="hover:bg-white/20 transition-colors duration-200 cursor-pointer"
              >
                Quiz
              </GlassSelectItem>
            </GlassSelectContent>
          </GlassSelect>

          <AssessmentItemSearchSelect
            value={gradeItemId}
            onChange={setGradeItemId}
            items={[{ id: "", title: "All" }, ...filteredItems.map(i => ({ id: i.id, title: i.title }))]}
            placeholder="Search..."
            className="sm:w-64 hover:shadow-md hover:shadow-[#8B6F52]/20 transition-all duration-200"
          />
        </div>
      </div>

      <GradesFilters search={search} onSearchChange={setSearch} />
      <GradesTable
        grades={rows}
        gradeItems={gradeItems}
        onGradeSaved={() => setVersion(v => v + 1)}
      />
    </div>
  );
}
