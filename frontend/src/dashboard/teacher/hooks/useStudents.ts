import { useEffect, useState } from "react";
import { students } from "@/shared/mocks/users/students";

export function useStudents() {
  const [data, setData] = useState(students);

  useEffect(() => {
    // later replace with API call
    setData(students);
  }, []);

  return { students: data };
}