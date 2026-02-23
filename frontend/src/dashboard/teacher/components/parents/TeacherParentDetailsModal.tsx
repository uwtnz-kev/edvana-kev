import { useEffect } from "react";
import { createPortal } from "react-dom";

type ParentStudent = {
  id: string;
  fullName: string;
  studentCode?: string;
  grade?: string;
  className?: string;
};

type ParentRecord = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address?: string;
  nationalIdOrPassport?: string;
  status: "active" | "inactive";
  students: ParentStudent[];
  createdAtLabel?: string;
  updatedAtLabel?: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  parent: ParentRecord | null;
};

export default function ParentDetailsModal({ open, onClose, parent }: Props) {
  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  if (!open || !parent) return null;

  return createPortal(
    <div className="fixed inset-0 z-[1000]">
      <button
        type="button"
        aria-label="Close modal"
        className="absolute inset-0 h-full w-full bg-black/50"
        onClick={onClose}
      />

      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-3xl max-h-[85vh] overflow-hidden rounded-2xl border border-white/25 bg-white/20 backdrop-blur-xl shadow-[0_24px_80px_rgba(0,0,0,0.40)]">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/20">
            <div className="text-lg font-semibold text-slate-900">
              Parent Details
            </div>

            <button
              type="button"
              onClick={onClose}
              className="h-10 w-10 rounded-xl border border-white/25 bg-white/20 hover:bg-white/30 text-slate-900 transition"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <div className="p-6 overflow-y-auto max-h-[calc(85vh-64px)] space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-sm text-slate-600">Full Name</div>
                <div className="text-2xl font-bold text-slate-900">
                  {parent.fullName}
                </div>
              </div>

              <div>
                <div className="text-sm text-slate-600">Status</div>
                <div className="mt-1 inline-flex items-center rounded-full border border-white/25 bg-white/20 px-3 py-1 text-sm font-semibold text-slate-900">
                  {parent.status === "active" ? "Active" : "Inactive"}
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="text-sm text-slate-600">National ID / Passport</div>
                <div className="text-slate-900 font-semibold break-words">
                  {parent.nationalIdOrPassport ?? "Not provided"}
                </div>
              </div>
            </div>

            <div>
              <div className="text-xl font-bold text-slate-900 mb-4">
                Contact Information
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/25 bg-white/20 p-4">
                  <div className="text-sm text-slate-600">Email</div>
                  <div className="text-slate-900 font-semibold break-words">
                    {parent.email}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/25 bg-white/20 p-4">
                  <div className="text-sm text-slate-600">Phone</div>
                  <div className="text-slate-900 font-semibold break-words">
                    {parent.phone}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/25 bg-white/20 p-4 md:col-span-2">
                  <div className="text-sm text-slate-600">Address</div>
                  <div className="text-slate-900 font-semibold break-words">
                    {parent.address ?? "Not provided"}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="text-xl font-bold text-slate-900 mb-4">
                Linked Students ({parent.students.length})
              </div>

              <div className="space-y-3">
                {parent.students.map((s) => (
                  <div
                    key={s.id}
                    className="rounded-2xl border border-white/25 bg-white/20 p-4 flex items-center justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <div className="font-semibold text-slate-900 truncate">
                        {s.fullName}
                      </div>
                      <div className="text-sm text-slate-600 truncate">
                        {(s.studentCode ?? "No code") +
                          " • " +
                          (s.grade ?? "Grade") +
                          (s.className ? ` - ${s.className}` : "")}
                      </div>
                    </div>

                    {s.grade && (
                      <span className="shrink-0 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-sm font-semibold text-slate-900">
                        {s.grade}
                      </span>
                    )}
                  </div>
                ))}

                {parent.students.length === 0 && (
                  <div className="text-slate-600">No linked students</div>
                )}
              </div>
            </div>

            <div>
              <div className="text-xl font-bold text-slate-900 mb-4">Activity</div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/25 bg-white/20 p-4">
                  <div className="text-sm text-slate-600">Created</div>
                  <div className="text-slate-900 font-semibold">
                    {parent.createdAtLabel ?? "Unknown"}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/25 bg-white/20 p-4">
                  <div className="text-sm text-slate-600">Last Updated</div>
                  <div className="text-slate-900 font-semibold">
                    {parent.updatedAtLabel ?? "Unknown"}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}