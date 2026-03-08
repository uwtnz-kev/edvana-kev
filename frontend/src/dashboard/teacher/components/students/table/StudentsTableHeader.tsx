// Renders the header row for the students table.
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function StudentsTableHeader() {
  return (
    <TableHeader>
      <TableRow className="border-white/20 hover:bg-white/5">
        <TableHead className="text-blue-900 font-semibold">Name</TableHead>
        <TableHead className="text-blue-900 font-semibold">Email</TableHead>
        <TableHead className="text-blue-900 font-semibold">Class</TableHead>
        <TableHead className="text-blue-900 font-semibold">Status</TableHead>
        <TableHead className="text-blue-900 font-semibold">Enrolled</TableHead>
        <TableHead className="text-blue-900 font-semibold text-center">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
}
