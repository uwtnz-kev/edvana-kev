/**
 * SubjectDetailsView
 * ------------------
 * Renders the teacher dashboard teacher dashboard page content.
 */
import { Navigate, useLocation, useParams } from "react-router-dom";

type SubjectDetailsRouteParams = {
  subjectId?: string;
};

export default function SubjectDetailsView() {
  const location = useLocation();
  const { subjectId = "" } = useParams<SubjectDetailsRouteParams>();

  return (
    <Navigate
      to="/dashboard/teacher/subjects"
      replace
      state={{ ...(location.state as object | null), restoreSubjectId: subjectId }}
    />
  );
}

