import { useMemo, useState } from "react";
import type { StudentsFilters, Student } from "./types";
import { mockStudents } from "./mock";

export function useStudents() {
  const [allStudents] = useState<Student[]>(mockStudents);

  const [filters, setFilters] = useState<StudentsFilters>({
    search: "",
    class: "",
    status: "all",
  });

  const students = useMemo(() => {
    const q = filters.search.trim().toLowerCase();
    const classQ = filters.class.trim().toLowerCase();

    return allStudents.filter((s) => {
      const matchesSearch =
        q === "" ||
        `${s.firstName} ${s.lastName}`.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q);

      const matchesClass =
        classQ === "" || s.class.toLowerCase().includes(classQ);

      const matchesStatus =
        filters.status === "all" || s.status === filters.status;

      return matchesSearch && matchesClass && matchesStatus;
    });
  }, [allStudents, filters]);

  return {
    students,
    allStudents,
    filters,
    setFilters,
  };
}
