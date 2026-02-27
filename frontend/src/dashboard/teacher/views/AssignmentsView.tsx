import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TeacherAssignmentList } from "../components/assignments";
import {
  ClipboardList,
  Clock,
  CheckCircle,
  AlertTriangle,
  Plus,
  Search,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type StatusFilter = "all" | "active" | "grading" | "draft";

export default function AssignmentsView() {
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [query, setQuery] = useState("");
  const [classFilter, setClassFilter] = useState("all");
  const navigate = useNavigate();

  return (
    <div className="p-4 sm:p-6">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#1EA896] rounded-2xl flex items-center justify-center shadow-lg">
              <ClipboardList className="h-7 w-7 text-[#1B1B1B]" />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-white mb-1">Assignments</h1>
              <p className="text-white/70">Create, review submissions, and grade student work</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              className="bg-brand-accent text-white rounded-xl px-5"
              onClick={() => navigate("create")}
              type="button"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create
            </Button>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-4 transition-all duration-300 ease-out hover:bg-white/10 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.01] group">
          <div className="flex flex-col lg:flex-row lg:items-center gap-3">
            <div className="flex items-center gap-2 text-white/80">
              <Filter className="h-4 w-4 text-[#1EA896]" />
              <span className="font-semibold">Filters</span>
            </div>

            <div className="flex-1" />

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <div className="relative sm:w-72 w-full">
                <Search className="h-4 w-4 text-white/60 absolute left-3 top-1/2 -translate-y-1/2" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search title or class..."
                  className="pl-9 bg-white/5 border-white/20 text-white placeholder:text-white/50 rounded-xl transition-colors duration-200 hover:bg-white/10"
                />
              </div>

              <Select value={classFilter} onValueChange={setClassFilter}>
                <SelectTrigger className="bg-white/5 border-white/20 text-white rounded-xl sm:w-44 transition-colors duration-200 hover:bg-white/10">
                  <SelectValue placeholder="All classes" />
                </SelectTrigger>
                <SelectContent className="bg-white/5 backdrop-blur-xl border border-white/10 text-white rounded-xl">
                  <SelectItem value="all" className="text-white hover:bg-white/10 focus:bg-white/10">
                    All classes
                  </SelectItem>
                  <SelectItem value="S3A" className="text-white hover:bg-white/10 focus:bg-white/10">
                    S3A
                  </SelectItem>
                  <SelectItem value="S3B" className="text-white hover:bg-white/10 focus:bg-white/10">
                    S3B
                  </SelectItem>
                  <SelectItem value="S4A" className="text-white hover:bg-white/10 focus:bg-white/10">
                    S4A
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select value={filter} onValueChange={(v) => setFilter(v as StatusFilter)}>
                <SelectTrigger className="bg-white/5 border-white/20 text-white rounded-xl sm:w-44 transition-colors duration-200 hover:bg-white/10">
                  <SelectValue placeholder="All status" />
                </SelectTrigger>
                <SelectContent className="bg-white/5 backdrop-blur-xl border border-white/10 text-white rounded-xl">
                  <SelectItem value="all" className="text-white hover:bg-white/10 focus:bg-white/10">
                    All status
                  </SelectItem>
                  <SelectItem value="active" className="text-white hover:bg-white/10 focus:bg-white/10">
                    Active
                  </SelectItem>
                  <SelectItem value="grading" className="text-white hover:bg-white/10 focus:bg-white/10">
                    Grading
                  </SelectItem>
                  <SelectItem value="draft" className="text-white hover:bg-white/10 focus:bg-white/10">
                    Draft
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 transition-all duration-300 ease-out hover:bg-white/10 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02] group">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#1EA896] to-[#1EA896]/80 rounded-lg flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                <ClipboardList className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">9</p>
                <p className="text-white/60 text-sm">Total</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 transition-all duration-300 ease-out hover:bg-white/10 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02] group">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#FF715B] to-[#FF715B]/80 rounded-lg flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">23</p>
                <p className="text-white/60 text-sm">Pending Grades</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 transition-all duration-300 ease-out hover:bg-white/10 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02] group">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#4C5454] to-[#523F38] rounded-lg flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">6</p>
                <p className="text-white/60 text-sm">Published</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 transition-all duration-300 ease-out hover:bg-white/10 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02] group">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                <AlertTriangle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">2</p>
                <p className="text-white/60 text-sm">Due Soon</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <TeacherAssignmentList filter={filter} query={query} classFilter={classFilter} />
        </div>
      </div>
    </div>
  );
}