/**
 * SupportView
 * -----------
 * Renders the teacher dashboard teacher dashboard page content.
 */
import { useLocation } from "react-router-dom";
import TeacherSupportPage from "../components/support/TeacherSupportPage";

type SupportViewState = {
  subjectId?: string;
  subjectName?: string;
};

export default function SupportView() {
  const location = useLocation();
  const state = (location.state as SupportViewState | null) ?? null;
  const query = new URLSearchParams(location.search);
  const subjectId = state?.subjectId ?? query.get("subjectId") ?? "";
  const subjectName = state?.subjectName ?? query.get("subjectName") ?? "";

  return (
    <div className="p-4 sm:p-6">
      <TeacherSupportPage subjectId={subjectId} subjectName={subjectName} />
    </div>
  );
}

