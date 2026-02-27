import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import type { Student } from "./types";

interface Props {
  students: Student[];
  onView: (student: Student) => void;
}

export default function StudentsTable({ students, onView }: Props) {
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
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

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
                <Badge
                  className={`${statusClass(
                    s.status
                  )} rounded-full px-2 py-1 text-xs font-medium border`}
                >
                  {s.status}
                </Badge>
              </TableCell>

              <TableCell className="text-black">
                {formatDate(s.enrollmentDate)}
              </TableCell>

              <TableCell className="px-6 py-4 align-middle">
                <div className="flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => onView(s)}
                    className="
                      h-10 w-10
                      flex items-center justify-center
                      rounded-xl
                      bg-white/25
                      hover:bg-white/35
                      border border-white/35
                      text-[#3B240F]
                      shadow-[0_10px_20px_rgba(59,36,15,0.12)]
                      transition-all duration-200
                      hover:-translate-y-0.5
                    "
                    aria-label={`View ${s.firstName} ${s.lastName}`}
                    title="View details"
                  >
                    <Eye size={18} />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}