// Parents workspace filters wrapper for search and class selection.
import ParentFilterBar from "../../components/parents/ParentFilterBar";

type Props = {
  classes: string[];
  onClassChange: (value: string) => void;
  onQueryChange: (value: string) => void;
  query: string;
  selectedClass: string;
};

export function ParentsFilters(props: Props) {
  return <ParentFilterBar {...props} />;
}
