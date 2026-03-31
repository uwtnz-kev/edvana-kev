export type RepublishEligibleStudent = {
  id: string;
  fullName: string;
  className?: string;
};

export type RepublishAssignmentPayload =
  | { mode: "class"; closesAt: string }
  | { mode: "students"; studentIds: string[]; closesAt: string };

export type RepublishAudienceSelection =
  | { mode: "class" }
  | { mode: "students"; studentIds: string[] };

export type RepublishAssignmentModalProps = {
  open: boolean;
  assignmentTitle: string;
  assessmentLabel?: string;
  classLabel?: string;
  eligibleStudents: RepublishEligibleStudent[];
  onClose: () => void;
  onConfirm: (payload: RepublishAssignmentPayload) => void;
};
