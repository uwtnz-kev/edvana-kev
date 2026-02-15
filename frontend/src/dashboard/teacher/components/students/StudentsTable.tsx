import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, MessageSquare } from "lucide-react";
import type { Student } from "./types";

interface Props {
  students: Student[];
  onView: (student: Student) => void;
  onMessage: (student: Student) => void;
}

export default function StudentsTable({ students, onView, onMessage }: Props) {
  const statusClass = (status: Student["status"]) => {
    const map: Record<Student["status"], string> = {
      Active: "bg-green-500/20 text-green-700 border-green-500/30",
      Inactive: "bg-yellow-500/20 text-yellow-700 border-yellow-500/30",
      Transferred: "bg-blue-500/20 text-blue-700 border-blue-500/30",
      Suspended: "bg-red-500/20 text-red-700 border-red-500/30",
      Graduated: "bg-purple-500/20 text-purple-700 border-purple-500/30",
    };
    return map[status];
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

  if (students.length === 0) {
    return (
      <div className="bg-white/15 backdrop-blur-xl border border-white/25 shadow-xl rounded-2xl p-8 text-center">
        <p className="text-white/70 text-lg">No students found</p>
        <p className="text-white/50 text-sm mt-2">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="bg-white/15 backdrop-blur-xl border border-white/25 shadow-xl rounded-2xl overflow-hidden">
      <Table>
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

        <TableBody>
          {students.map((s) => (
            <TableRow key={s.id} className="border-white/10 hover:bg-white/5">
              <TableCell className="text-black font-medium">
                {s.firstName} {s.lastName}
              </TableCell>
              <TableCell className="text-black">{s.email}</TableCell>
              <TableCell>
                <Badge className="bg-blue-500/20 text-blue-700 border-blue-500/30 rounded-full px-2 py-1 text-xs font-medium border">
                  {s.class}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={`${statusClass(s.status)} rounded-full px-2 py-1 text-xs font-medium border`}>
                  {s.status}
                </Badge>
              </TableCell>
              <TableCell className="text-black">{formatDate(s.enrollmentDate)}</TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onView(s)}
                    className="h-8 w-8 p-0 text-brand-teal hover:text-brand-teal/80 hover:bg-brand-teal/10 rounded-lg"
                    title="View details"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onMessage(s)}
                    className="h-8 w-8 p-0 text-brand-accent hover:text-brand-accent/80 hover:bg-brand-accent/10 rounded-lg"
                    title="Message"
                  >
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
