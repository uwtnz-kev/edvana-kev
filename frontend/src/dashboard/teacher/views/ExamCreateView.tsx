import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Calendar as CalendarIcon, ArrowLeft, FileText } from "lucide-react";

import { createTeacherExam } from "@/dashboard/teacher/components/exams/examsStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

export default function ExamCreateView() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState("");
  const [timeLimit, setTimeLimit] = useState("60");
  const [totalStudents, setTotalStudents] = useState("0");
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

    const status: "upcoming" | "active" | "completed" = "upcoming";

    const styleMap = {
      upcoming: {
        color: "text-[#FF715B]",
        bgGradient: "bg-gradient-to-br from-[#FF715B] to-[#FF715B]/80",
      },
      active: {
        color: "text-[#1EA896]",
        bgGradient: "bg-gradient-to-br from-[#1EA896] to-[#1EA896]/80",
      },
      completed: {
        color: "text-[#4C5454]",
        bgGradient: "bg-gradient-to-br from-[#4C5454] to-[#523F38]",
      },
    } as const;

    const questionsCount = questions
      ? questions
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean).length
      : 0;

    createTeacherExam({
      title: title.trim(),
      description: description.trim(),
      timeLimit: Math.max(0, Number(timeLimit) || 0),
      questionsCount,
      status,
      dueDate: (date ?? new Date()).toISOString(),
      subject: subject.trim() || "Subject",
      submissions: 0,
      totalStudents: Math.max(0, Number(totalStudents) || 0),
      avgScore: undefined,
      ...styleMap[status],
    });

    navigate("..");
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#1EA896] rounded-2xl flex items-center justify-center shadow-lg">
              <FileText className="h-7 w-7 text-[#1B1B1B]" />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold text-[#3B2A1A]">Create Exam</h1>
              <p className="text-[#6B5A4A] text-lg">Draft and publish an exam</p>
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

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Mid Term Exam"
              className="bg-[#D6CBB6] border border-[#8B5E3C]/40 text-[#3B2A1A] placeholder:text-[#6B5A4A]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Subject</label>
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Mathematics"
              className="bg-[#D6CBB6] border border-[#8B5E3C]/40 text-[#3B2A1A] placeholder:text-[#6B5A4A]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write exam instructions"
              className="min-h-[120px] bg-[#D6CBB6] border border-[#8B5E3C]/40 text-[#3B2A1A] placeholder:text-[#6B5A4A]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Questions</label>
            <Textarea
              value={questions}
              onChange={(e) => setQuestions(e.target.value)}
              placeholder="One question per line"
              className="min-h-[160px] bg-[#D6CBB6] border border-[#8B5E3C]/40 text-[#3B2A1A] placeholder:text-[#6B5A4A]"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Time Limit (minutes)</label>
              <div className="w-48">
                <Input
                  type="number"
                  min="0"
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(e.target.value)}
                  placeholder="60"
                  className="bg-[#D6CBB6] border border-[#8B5E3C]/40 text-[#3B2A1A] placeholder:text-[#6B5A4A]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Total Students</label>
              <div className="w-48">
                <Input
                  type="number"
                  min="0"
                  value={totalStudents}
                  onChange={(e) => setTotalStudents(e.target.value)}
                  placeholder="0"
                  className="bg-[#D6CBB6] border border-[#8B5E3C]/40 text-[#3B2A1A] placeholder:text-[#6B5A4A]"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Attachments</label>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                type="button"
                variant="outline"
                className="bg-[#D6CBB6] border border-[#8B5E3C]/40 text-[#3B2A1A] hover:bg-[#CBB89D] hover:border-[#8B5E3C]/60 transition-colors duration-200"
                onClick={() => document.getElementById("exam-attachments-input")?.click()}
              >
                Upload from computer
              </Button>

              <input
                id="exam-attachments-input"
                type="file"
                multiple
                onChange={onPickFiles}
                className="hidden"
              />

              <div className="flex-1 bg-[#D6CBB6] border border-[#8B5E3C]/40 rounded-xl px-4 py-3 text-[#3B2A1A]">
                {attachments.length === 0 ? (
                  <span className="text-[#6B5A4A]">No files selected</span>
                ) : (
                  <ul className="list-disc pl-5 space-y-1">
                    {attachments.map((f, i) => (
                      <li key={`${f.name}-${i}`} className="text-sm">
                        {f.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Due Date</label>

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
                className="bg-[#d8cbb3] border border-[#8B5E3C]/40 rounded-2xl shadow-xl text-[#3B2A1A]"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  weekStartsOn={1}
                  className="bg-[#D6CBB6] text-[#3B2A1A]"
                  classNames={{
                    months: "w-full",
                    month: "w-full",
                    caption: "flex justify-between items-center px-2 pb-2 text-[#3B2A1A] font-semibold",
                    nav: "flex items-center gap-2",
                    nav_button: "h-8 w-8 rounded-md hover:bg-[#CBB89D] text-[#3B2A1A]",
                    table: "w-full border-collapse",
                    head_row: "grid grid-cols-7",
                    head_cell: "h-9 w-9 flex items-center justify-center text-[#6B5A4A] font-medium",
                    row: "grid grid-cols-7",
                    cell: "h-9 w-9 flex items-center justify-center",
                    day: "h-9 w-9 rounded-md flex items-center justify-center text-[#3B2A1A] hover:bg-[#CBB89D] transition-colors aria-selected:!bg-[#1EA896] aria-selected:!text-[#1B1B1B] aria-selected:hover:!bg-[#1EA896]",
                    day_today: "border border-[#8B5E3C] text-[#3B2A1A]",
                    day_outside: "text-[#9C8C7A]",
                    day_disabled: "text-[#9C8C7A] opacity-40",
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>

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