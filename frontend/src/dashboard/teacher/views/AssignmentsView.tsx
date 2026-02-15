import { useState } from "react";
import { TeacherAssignmentList } from "../components/assignments"
import { ClipboardList, Clock, CheckCircle, AlertTriangle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AssignmentsView() {
  const [filter, setFilter] = useState<"all" | "active" | "grading" | "draft">("all");

  return (
    <div className="p-4 sm:p-6">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Assignments</h1>
            <p className="text-white/70">Create, review submissions, and grade student work</p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              className="bg-white/10 border border-white/20 text-white hover:bg-white/20 rounded-xl"
              variant="outline"
              onClick={() => setFilter("all")}
            >
              All
            </Button>
            <Button
              className="bg-white/10 border border-white/20 text-white hover:bg-white/20 rounded-xl"
              variant="outline"
              onClick={() => setFilter("active")}
            >
              Active
            </Button>
            <Button
              className="bg-white/10 border border-white/20 text-white hover:bg-white/20 rounded-xl"
              variant="outline"
              onClick={() => setFilter("grading")}
            >
              Grading
            </Button>

            <Button className="bg-brand-accent text-white rounded-xl px-5">
              <Plus className="h-4 w-4 mr-2" />
              Create
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#1EA896] to-[#1EA896]/80 rounded-lg flex items-center justify-center">
                <ClipboardList className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">9</p>
                <p className="text-white/60 text-sm">Total</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#FF715B] to-[#FF715B]/80 rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">23</p>
                <p className="text-white/60 text-sm">Pending Grades</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#4C5454] to-[#523F38] rounded-lg flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">6</p>
                <p className="text-white/60 text-sm">Published</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">2</p>
                <p className="text-white/60 text-sm">Due Soon</p>
              </div>
            </div>
          </div>
        </div>

        {/* Assignment List */}
        <div>
          <TeacherAssignmentList filter={filter} />
        </div>
      </div>
    </div>
  );
}
