import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TeacherExamsControls } from "../components/exams/TeacherExamsControls";
import { TeacherExamList } from "../components/exams/TeacherExamList";
import { FileText, ClipboardCheck, Clock, Plus } from "lucide-react";
import {
  GlassSelect,
  GlassSelectContent,
  GlassSelectItem,
  GlassSelectTrigger,
  GlassSelectValue,
} from "@/dashboard/schooladmin/components/ui/GlassSelect";

export default function ExamsView() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState("all");
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  useEffect(() => {
    const onExamsChanged = () => setCurrentPage(1);
    window.addEventListener("teacher-exams-changed", onExamsChanged);
    return () => window.removeEventListener("teacher-exams-changed", onExamsChanged);
  }, []);

  const handleSortChange = (field: string, direction: "asc" | "desc") => {
    setSortField(field);
    setSortDirection(direction);
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#1EA896] rounded-2xl flex items-center justify-center shadow-lg">
              <FileText className="h-7 w-7 text-[#1B1B1B]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">Exams</h1>
              <p className="text-white/70">Create, publish, and manage exams</p>
            </div>
          </div>

          <button
            className="h-11 px-6 rounded-xl bg-[#FF715B] text-[#1B1B1B] shadow-md transition-all duration-200 hover:opacity-90 active:scale-[0.98] flex items-center"
            onClick={() => {
              setCurrentPage(1);
              navigate("create");
            }}
            type="button"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create
          </button>
        </div>

        <TeacherExamsControls
          searchQuery={searchQuery}
          onSearchChange={(q) => {
            setSearchQuery(q);
            setCurrentPage(1);
          }}
          filterValue={filterValue}
          onFilterChange={(v) => {
            setFilterValue(v);
            setCurrentPage(1);
          }}
          sortField={sortField}
          sortDirection={sortDirection}
          onSortChange={handleSortChange}
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:-translate-y-1">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#1EA896] to-[#1EA896]/80 rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">6</p>
                <p className="text-white/60 text-sm">Total Exams</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:-translate-y-1">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#FF715B] to-[#FF715B]/80 rounded-lg flex items-center justify-center">
                <ClipboardCheck className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">19</p>
                <p className="text-white/60 text-sm">Submissions</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:-translate-y-1">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#4C5454] to-[#523F38] rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">7</p>
                <p className="text-white/60 text-sm">Pending Grades</p>
              </div>
            </div>
          </div>
        </div>

        <div className="transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_50px_rgba(0,0,0,0.25)]">
          <TeacherExamList
            searchQuery={searchQuery}
            filterValue={filterValue}
            sortField={sortField}
            sortDirection={sortDirection}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
          />
        </div>

        <div className="bg-white/15 backdrop-blur-xl border border-white/25 shadow-xl rounded-2xl p-6 flex items-center justify-between transition-all duration-300 hover:bg-white/20 hover:border-white/35 hover:shadow-2xl hover:-translate-y-1">
          <p className="text-sm text-white">
            Page {currentPage} • Showing {itemsPerPage} per page
          </p>

          <div className="flex items-center gap-2">
            <button
              className="h-10 px-4 rounded-xl bg-white/10 border border-white/20 transition-all duration-200 hover:bg-white/15 hover:border-white/30 active:scale-[0.98] disabled:opacity-50 disabled:hover:bg-white/10 disabled:hover:border-white/20"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              type="button"
            >
              Previous
            </button>

            <button
              className="h-10 px-4 rounded-xl bg-white/10 border border-white/20 text-white transition-all duration-200 hover:bg-white/15 hover:border-white/30 active:scale-[0.98] disabled:opacity-50 disabled:hover:bg-white/10 disabled:hover:border-white/20"
              onClick={() => setCurrentPage((p) => p + 1)}
              type="button"
            >
              Next
            </button>

            <GlassSelect
              value={String(itemsPerPage)}
              onValueChange={(v) => {
                setItemsPerPage(Number(v));
                setCurrentPage(1);
              }}
            >
              <GlassSelectTrigger className="h-10 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/15 transition-colors">
                <GlassSelectValue placeholder="Per page" />
              </GlassSelectTrigger>
              <GlassSelectContent>
                <GlassSelectItem value="6">6 per page</GlassSelectItem>
                <GlassSelectItem value="12">12 per page</GlassSelectItem>
                <GlassSelectItem value="24">24 per page</GlassSelectItem>
              </GlassSelectContent>
            </GlassSelect>
          </div>
        </div>
      </div>
    </div>
  );
}