import { AssignmentList } from "../components/assignments";
import { ClipboardList, Calendar, CheckCircle, Clock, AlertTriangle } from "lucide-react";

export default function AssignmentsView() {

  return (
    <div className="p-4 sm:p-6">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Your Assignments</h1>
            <p className="text-white/70">Track and manage your coursework and submissions</p>
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
                <p className="text-2xl font-bold text-white">12</p>
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
                <p className="text-2xl font-bold text-white">4</p>
                <p className="text-white/60 text-sm">Pending</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#4C5454] to-[#523F38] rounded-lg flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">3</p>
                <p className="text-white/60 text-sm">Completed</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">1</p>
                <p className="text-white/60 text-sm">Overdue</p>
              </div>
            </div>
          </div>
        </div>

        {/* Assignment List */}
        <div>
          <AssignmentList filter="all" />
        </div>
      </div>
    </div>
  );
}