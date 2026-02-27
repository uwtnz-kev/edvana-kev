import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Clock, FileText, Users } from "lucide-react";

export default function AssignmentDetailsView() {
  const { assignmentId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">
          Assignment Details
        </h1>

        <Button
          variant="secondary"
          onClick={() => navigate("/dashboard/teacher/assignments")}
        >
          Back
        </Button>
      </div>

      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-white">
            Assignment ID: {assignmentId}
          </h2>
          <p className="text-white/60 mt-2">
            This is the assignment detail view. You will later replace this
            with real data from your store or API.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-3">
            <Clock className="h-5 w-5 text-[#1EA896]" />
            <div>
              <p className="text-white text-lg font-semibold">120 min</p>
              <p className="text-white/60 text-sm">Time limit</p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-3">
            <FileText className="h-5 w-5 text-[#FF715B]" />
            <div>
              <p className="text-white text-lg font-semibold">5 tasks</p>
              <p className="text-white/60 text-sm">Questions</p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-3">
            <Users className="h-5 w-5 text-purple-400" />
            <div>
              <p className="text-white text-lg font-semibold">28 students</p>
              <p className="text-white/60 text-sm">Assigned</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}