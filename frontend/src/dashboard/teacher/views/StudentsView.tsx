import { useState } from "react";
import {
  StudentsHeader,
  StudentsStats,
  StudentsToolbar,
  StudentsTable,
  EmptyState,
  useStudents,
  type Student,
} from "../components/students";
import { Button } from "@/components/ui/button";

export default function StudentsView() {
  const { students, filters, setFilters } = useStudents();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  const totalPages = Math.max(1, Math.ceil(students.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStudents = students.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleView = (student: Student) => {
    console.log("view", student.id);
  };

  const handleMessage = (student: Student) => {
    console.log("message", student.id);
  };

  const handleItemsPerPageChange = (n: number) => {
    setItemsPerPage(n);
    setCurrentPage(1);
  };

  const isEmpty =
    students.length === 0 &&
    filters.search.trim() === "" &&
    filters.class.trim() === "" &&
    filters.status === "all";

  return (
    <div className="px-4 sm:px-6 md:px-8 py-6">
      <div className="space-y-6">
        <StudentsHeader />

        <StudentsStats studentsCount={students.length} />

        <StudentsToolbar
          filters={filters}
          onFiltersChange={(next) => {
            setFilters(next);
            setCurrentPage(1);
          }}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={handleItemsPerPageChange}
          totalStudents={students.length}
        />

        {isEmpty ? (
          <EmptyState />
        ) : (
          <>
            <StudentsTable
              students={paginatedStudents}
              onView={handleView}
              onMessage={handleMessage}
            />

            {totalPages > 1 && (
              <div className="bg-white/15 backdrop-blur-xl border border-white/25 shadow-xl rounded-2xl p-6 pb-8">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <p className="text-sm text-white">
                    Showing {startIndex + 1} to{" "}
                    {Math.min(startIndex + itemsPerPage, students.length)} of{" "}
                    {students.length} students
                  </p>

                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      variant="ghost"
                      size="sm"
                      className="px-3 py-1 text-sm bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                    >
                      Previous
                    </Button>

                    <span className="text-sm text-white px-3">
                      Page {currentPage} of {totalPages}
                    </span>

                    <Button
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={currentPage === totalPages}
                      variant="ghost"
                      size="sm"
                      className="px-3 py-1 text-sm bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
