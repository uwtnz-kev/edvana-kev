// Renders the header row for the students table.
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function StudentsTableHeader() {
  return (
    <TableHeader>
      <TableRow className="border-white/20 hover:bg-white/5">
        <TableHead className="font-semibold text-white">Name</TableHead>
        <TableHead className="font-semibold text-white">Email</TableHead>
        <TableHead className="font-semibold text-white">Class</TableHead>
        <TableHead className="font-semibold text-white">Status</TableHead>
        <TableHead className="font-semibold text-white">Enrolled</TableHead>
        <TableHead className="text-center font-semibold text-white">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
}
