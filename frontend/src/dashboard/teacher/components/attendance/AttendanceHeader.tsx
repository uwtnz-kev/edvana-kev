import React from "react";
import { ClipboardCheck, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface Props {
  onExport?: () => void;
  onMark?: () => void;
}

export default function AttendanceHeader(props: Props) {
  const navigate = useNavigate();

  const { onExport, onMark } = props;
  void onExport;
  void onMark;

  return (
    <div className="flex items-center justify-between gap-6">
      {/* LEFT SIDE */}
      <div className="flex items-center gap-5">
        <div
          className="
            h-12 w-12
            rounded-2xl
            flex items-center justify-center
            bg-[#1EA896]
          "
        >
          <ClipboardCheck className="h-6 w-6 text-[#3B240F]" />
        </div>

        <div>
          <h1 className="text-3xl font-semibold text-[#3B240F] leading-tight">
            Attendance
          </h1>
          <p className="mt-1 text-[#6B4F3A] text-base">
            Track daily attendance by class and status.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE — NEW BUTTON */}
      <Button
        onClick={() => navigate("/dashboard/teacher/attendance/create")}
        className="h-10 px-5 rounded-xl bg-white/25 border border-white/35 text-[#3B240F] transition-all duration-200
          hover:bg-[#FF715B]/25 hover:border-[#FF715B]/40 hover:text-[#3B240F]"
      >
        <Plus className="h-4 w-4 mr-2 transition-colors duration-200 group-hover:text-[#3B240F]" />
        Create New Attendance List
      </Button>
    </div>
  );
}