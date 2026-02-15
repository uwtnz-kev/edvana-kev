export type StudentStatus = "Active" | "Inactive" | "Transferred" | "Suspended" | "Graduated";

export type Student = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  class: string;
  status: StudentStatus;
  enrollmentDate: string;
  parentEmail?: string;
};

export type StudentsFilters = {
  search: string;
  class: string;
  status: "all" | StudentStatus;
};
