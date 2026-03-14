/**
 * AnnouncementForm
 * ----------------
 * Renders the form UI for the teacher dashboard a nn ou nc em en ts feature.
 */
import { useState } from "react";
import { Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AnnouncementAttachment } from "./AnnouncementAttachment";
import type { AnnouncementAttachment as Attachment } from "@/dashboard/teacher/types/announcementTypes";

type Values = { title: string; body: string; attachment: Attachment | null };
type Props = {
  subjectName: string;
  classLabel: string;
  initialValue?: Values;
  submitLabel: string;
  onCancel: () => void;
  onSubmit: (value: Values) => void;
};

export function AnnouncementForm({
  subjectName,
  classLabel,
  initialValue = { title: "", body: "", attachment: null },
  submitLabel,
  onCancel,
  onSubmit,
}: Props) {
  const [values, setValues] = useState(initialValue);

  return (
    <form
      className="space-y-5 rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl"
      onSubmit={(event) => {
        event.preventDefault();
        if (!values.title.trim() || !values.body.trim()) return;
        onSubmit({ ...values, title: values.title.trim(), body: values.body.trim() });
      }}
    >
      <div className="flex flex-wrap gap-2 text-sm text-white">
        <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1">Subject: {subjectName}</span>
        <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1">Class: {classLabel}</span>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-white">Title</label>
        <Input
          value={values.title}
          onChange={(event) => setValues((current) => ({ ...current, title: event.target.value }))}
          className="rounded-2xl border-white/20 bg-white/20 text-white placeholder:text-white/70"
          placeholder="Announcement title"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-white">Message / Body</label>
        <Textarea
          value={values.body}
          onChange={(event) => setValues((current) => ({ ...current, body: event.target.value }))}
          className="min-h-[180px] rounded-2xl border-white/20 bg-white/20 text-white placeholder:text-white/70"
          placeholder="Write the announcement message"
        />
      </div>

      <AnnouncementAttachment
        value={values.attachment}
        onChange={(attachment) => setValues((current) => ({ ...current, attachment }))}
      />

      <div className="flex flex-wrap gap-3">
        <Button type="submit" className="rounded-2xl border border-white/25 bg-white/20 px-6 py-3 font-semibold text-white ring-1 ring-[#3B240F]/20 transition-colors duration-200 hover:bg-white/30">
          <Paperclip className="mr-2 h-4 w-4" />
          {submitLabel}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} className="rounded-2xl border border-white/20 bg-white/20 text-white hover:bg-white/30">
          Cancel
        </Button>
      </div>
    </form>
  );
}

