// Students workspace filters wrapper for search and class selection.
import StudentsToolbar from "../../components/students/StudentsToolbar";
import type { StudentsFilters as StudentsFiltersType } from "../../components/students";

type Props = {
  classes: string[];
  filters: StudentsFiltersType;
  onClassChange: (value: string) => void;
  onFiltersChange: (next: StudentsFiltersType) => void;
  selectedClass: string;
};

export function StudentsFilters(props: Props) {
  return <StudentsToolbar {...props} />;
}
