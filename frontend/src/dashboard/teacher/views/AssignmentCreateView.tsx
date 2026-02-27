  import React, { useMemo, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { format } from "date-fns";
  import { Calendar as CalendarIcon, ArrowLeft, ClipboardList } from "lucide-react";

  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { Textarea } from "@/components/ui/textarea";
  import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
  import { Calendar } from "@/components/ui/calendar";

  export default function AssignmentCreateView() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [points, setPoints] = useState("");
    const [description, setDescription] = useState("");
    const [questions, setQuestions] = useState("");
    const [date, setDate] = useState<Date | undefined>();
    const [attachments, setAttachments] = useState<File[]>([]);

    const canSubmit = useMemo(() => title.trim().length > 0, [title]);

    const onPickFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (!files.length) return;
      setAttachments((prev) => [...prev, ...files]);
      e.target.value = "";
    };

  const handleCreate = () => {
    if (!canSubmit) return;

    const status = "active"; // or draft if you prefer

    const colorMap = {
      active: {
        color: "text-[#1EA896]",
        bgGradient: "bg-gradient-to-br from-[#1EA896] to-[#1EA896]/80",
      },
      grading: {
        color: "text-[#FF715B]",
        bgGradient: "bg-gradient-to-br from-[#FF715B] to-[#FF715B]/80",
      },
      draft: {
        color: "text-[#4C5454]",
        bgGradient: "bg-gradient-to-br from-[#4C5454] to-[#523F38]",
      },
    };

      const newAssignment = {
            id: Date.now().toString(),
            title,
            classNameLabel: "S3A • Subject", // adjust if needed
            dueDate: date ? date.toISOString() : "",
            submissions: 0,
            totalStudents: 0,
            status,
            ...colorMap[status],
          };
          const stored = JSON.parse(localStorage.getItem("teacher.assignments.v1") || "[]");
          localStorage.setItem("teacher.assignments.v1", JSON.stringify([newAssignment, ...stored]));

          window.dispatchEvent(new Event("teacher-assignments-changed"));

          navigate("..");
    };
    return (
      <div className="p-4 sm:p-6">
        <div className="max-w-4xl mx-auto space-y-6">

          {/* Header (NO Create button here anymore) */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#1EA896] rounded-2xl flex items-center justify-center shadow-lg">
                <ClipboardList className="h-7 w-7 text-[#1B1B1B]" />
              </div>
              <div>
                <h1 className="text-4xl font-extrabold text-[#3B2A1A]">
                  Create Assignment
                </h1>
                <p className="text-[#6B5A4A] text-lg">
                  Draft and publish an assignment
                </p>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("..")}
              className="bg-[#D6CBB6] border border-[#8B5E3C]/40 text-[#3B2A1A] hover:bg-[#CBB89D]"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>

          {/* Form */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 space-y-6">

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Title
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Physics Lab Report"
                className="bg-[#D6CBB6] border border-[#8B5E3C]/40 text-[#3B2A1A]"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Description
              </label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write assignment instructions"
                className="min-h-[120px] bg-[#D6CBB6] border border-[#8B5E3C]/40 text-[#3B2A1A]"
              />
            </div>

            {/* Questions */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Questions
              </label>
              <Textarea
                value={questions}
                onChange={(e) => setQuestions(e.target.value)}
                placeholder="Write assignment questions here..."
                className="min-h-[160px] bg-[#D6CBB6] border border-[#8B5E3C]/40 text-[#3B2A1A]"
              />
            </div>
                  {/* Total Points */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Total Points
            </label>

            <div className="w-48">
              <Input
                type="number"
                min="0"
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                placeholder="e.g. 20"
                className="bg-[#D6CBB6] border border-[#8B5E3C]/40 text-[#3B2A1A] placeholder:text-[#6B5A4A]"
              />
            </div>
          </div>

            {/* Attachments */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Attachments
              </label>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="bg-[#D6CBB6] border border-[#8B5E3C]/40 text-[#3B2A1A] hover:bg-[#CBB89D]"
                  onClick={() =>
                    document.getElementById("assignment-attachments-input")?.click()
                  }
                >
                  Upload from computer
                </Button>

                <input
                  id="assignment-attachments-input"
                  type="file"
                  multiple
                  onChange={onPickFiles}
                  className="hidden"
                />

                <div className="flex-1 bg-[#D6CBB6] border border-[#8B5E3C]/40 rounded-xl px-4 py-3 text-[#3B2A1A]">
                  {attachments.length === 0
                    ? "No files selected"
                    : attachments.map((f) => f.name).join(", ")}
                </div>
              </div>
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Due Date
              </label>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-start bg-[#D6CBB6] border border-[#8B5E3C]/40 text-[#3B2A1A]"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>

                <PopoverContent
                  className="bg-[#D6CBB6] border border-[#8B5E3C]/40 rounded-2xl shadow-xl text-[#3B2A1A]"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    weekStartsOn={1}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Bottom Actions (ONLY WORKING CREATE BUTTON) */}
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("..")}
                className="bg-[#D6CBB6] border border-[#8B5E3C]/40 text-[#3B2A1A] hover:bg-[#CBB89D]"
              >
                Cancel
              </Button>

              <Button
                type="button"
                disabled={!canSubmit}
                onClick={handleCreate}
                className="bg-[#FF715B] hover:bg-[#FF715B]/90 text-[#1B1B1B] rounded-xl px-6"
              >
                Create
              </Button>
            </div>

          </div>
        </div>
      </div>
    );
  }