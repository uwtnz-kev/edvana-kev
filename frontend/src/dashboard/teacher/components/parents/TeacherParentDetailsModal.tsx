import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Mail, Phone, MapPin, BadgeCheck, Users, Calendar } from "lucide-react";

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

function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "blue" | "green";
}) {
  const cls =
    tone === "blue"
      ? "bg-blue-500/20 text-blue-100 border-blue-500/20"
      : tone === "green"
      ? "bg-emerald-500/20 text-emerald-100 border-emerald-500/20"
      : "bg-white/10 text-white/80 border-white/10";

  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs border ${cls}`}>
      {children}
    </span>
  );
}

function InfoCard({
  label,
  value,
  icon,
  span2,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  span2?: boolean;
}) {
  return (
    <div
      className={[
        "rounded-2xl border border-white/10 bg-white/10 px-5 py-4",
        span2 ? "md:col-span-2" : "",
      ].join(" ")}
    >
      <div className="text-white/60 text-sm">{label}</div>
      <div className="mt-2 flex items-center gap-3 min-w-0">
        <div className="text-white/70">{icon}</div>
        <div className="text-white font-semibold truncate">{value}</div>
      </div>
    </div>
  );
}

export default function ParentDetailsModal({ open, onClose, parent }: Props) {
  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open || !parent) return null;

  const statusLabel = parent.status === "active" ? "Active" : "Inactive";

  return createPortal(
    <div className="fixed inset-0 z-[1000]">
      <button
        type="button"
        aria-label="Close modal"
        className="absolute inset-0 h-full w-full bg-black/65 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl max-h-[85vh] overflow-hidden rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl">
          <div className="flex items-start justify-between px-7 py-6">
            <div className="min-w-0">
              <div className="text-white text-2xl font-semibold truncate">{parent.fullName}</div>
              <div className="text-white/70 text-sm mt-1">Parent Details</div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="h-10 w-10 rounded-xl bg-white/10 hover:bg-white/15 text-white/80 flex items-center justify-center transition"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          <div className="h-px bg-white/10" />

          <div className="px-7 py-5 overflow-y-auto max-h-[calc(85vh-88px)] space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <Badge tone="green">{statusLabel}</Badge>
              {parent.students?.length ? (
                <Badge tone="blue">
                  <Users className="h-4 w-4" />
                  {parent.students.length} students
                </Badge>
              ) : (
                <Badge tone="blue">
                  <Users className="h-4 w-4" />
                  0 students
                </Badge>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoCard
                label="Email"
                value={parent.email}
                icon={<Mail className="h-5 w-5" />}
              />
              <InfoCard
                label="Phone"
                value={parent.phone}
                icon={<Phone className="h-5 w-5" />}
              />
              <InfoCard
                label="Address"
                value={parent.address ?? "Not provided"}
                icon={<MapPin className="h-5 w-5" />}
                span2
              />
              <InfoCard
                label="National ID or Passport"
                value={parent.nationalIdOrPassport ?? "Not provided"}
                icon={<BadgeCheck className="h-5 w-5" />}
                span2
              />
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
              <div className="text-white/80 font-semibold">Linked Students</div>
              <div className="text-white/60 text-sm mt-1">
                {parent.students.length} linked student{parent.students.length === 1 ? "" : "s"}
              </div>

              <div className="mt-4 space-y-3">
                {parent.students.length === 0 ? (
                  <div className="text-white/60">No linked students</div>
                ) : (
                  parent.students.map((s) => {
                    const meta =
                      (s.studentCode ?? "No code") +
                      " • " +
                      (s.grade ?? "Grade") +
                      (s.className ? ` ${s.className}` : "");

                    return (
                      <div
                        key={s.id}
                        className="rounded-2xl border border-white/10 bg-white/10 p-4 flex items-center justify-between gap-4"
                      >
                        <div className="min-w-0">
                          <div className="font-semibold text-white truncate">{s.fullName}</div>
                          <div className="text-sm text-white/60 truncate">{meta}</div>
                        </div>

                        {s.grade ? (
                          <span className="shrink-0 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm font-semibold text-white/80">
                            {s.grade}
                          </span>
                        ) : null}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
              <div className="text-white/80 font-semibold">Activity</div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoCard
                  label="Created"
                  value={parent.createdAtLabel ?? "Unknown"}
                  icon={<Calendar className="h-5 w-5" />}
                />
                <InfoCard
                  label="Last Updated"
                  value={parent.updatedAtLabel ?? "Unknown"}
                  icon={<Calendar className="h-5 w-5" />}
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white/85 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}