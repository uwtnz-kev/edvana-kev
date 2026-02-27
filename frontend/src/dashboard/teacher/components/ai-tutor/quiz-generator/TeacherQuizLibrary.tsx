import { useMemo, useState } from "react";
import { Clock, Eye, RotateCcw, Trophy, UploadCloud, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import type { TeacherQuiz, QuizStatus } from "./teacherQuizTypes";

export default function TeacherQuizLibrary({
  quizzes,
  onPreview,
  onDuplicate,
  onPublish,
}: {
  quizzes: TeacherQuiz[];
  onPreview: (id: string) => void;
  onDuplicate: (id: string) => void;
  onPublish: (id: string) => void;
}) {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | QuizStatus>("all");
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return quizzes.filter((x) => {
      const matchesSearch =
        q === "" ||
        x.title.toLowerCase().includes(q) ||
        x.subject.toLowerCase().includes(q) ||
        x.grade.toLowerCase().includes(q);

      const matchesStatus = filterStatus === "all" || x.status === filterStatus;

      return matchesSearch && matchesStatus;
    });
  }, [quizzes, search, filterStatus]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-6 transition-all duration-300 ease-out hover:bg-white/10 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.01] group">
      <div className="flex flex-col lg:flex-row lg:items-center gap-3">
        <div className="flex items-center gap-2 text-white/80">
          <Filter className="h-4 w-4 text-[#1EA896]" />
          <span className="font-semibold">Your quiz library</span>
        </div>

        <div className="flex-1" />

        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search title, subject, grade..."
            className="bg-white/5 border-white/20 text-white placeholder:text-white/50 rounded-xl sm:w-72"
          />

          <Select
            value={filterStatus}
            onValueChange={(v) => {
              setFilterStatus(v as any);
              setPage(1);
            }}
          >
            <SelectTrigger className="bg-white/5 border-white/20 text-white rounded-xl sm:w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white/5 backdrop-blur-xl border border-white/10 text-white rounded-xl">
              <SelectItem value="all" className="text-white hover:bg-white/10 focus:bg-white/10">
                All
              </SelectItem>
              <SelectItem value="draft" className="text-white hover:bg-white/10 focus:bg-white/10">
                Drafts
              </SelectItem>
              <SelectItem
                value="published"
                className="text-white hover:bg-white/10 focus:bg-white/10"
              >
                Published
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {paged.length === 0 ? (
        <div className="text-center py-10">
          <Trophy className="h-12 w-12 text-white/30 mx-auto mb-3" />
          <p className="text-white/60">No quizzes found.</p>
        </div>
      ) : (
        <div className="space-y-4 mt-6">
          {paged.map((q) => (
            <div
              key={q.id}
              className="bg-white/5 border border-white/10 rounded-xl p-4 transition-all duration-300 ease-out hover:bg-white/10 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.01]"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
                <div className="min-w-0">
                  <h3 className="text-white font-semibold truncate">{q.title}</h3>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-white/60 mt-2">
                    <span className="bg-white/10 px-2 py-1 rounded-md">{q.subject}</span>
                    <span className="bg-white/10 px-2 py-1 rounded-md">{q.grade}</span>
                    <span className="bg-white/10 px-2 py-1 rounded-md">{q.type}</span>
                    <span className="bg-white/10 px-2 py-1 rounded-md">{q.difficulty}</span>
                    <span className="bg-white/10 px-2 py-1 rounded-md flex items-center gap-1">
                      <Clock className="h-3 w-3" /> ~{q.estimatedTime} min
                    </span>
                    <span className="bg-white/10 px-2 py-1 rounded-md">
                      {q.totalQuestions} questions
                    </span>
                    <span className="text-white/40">
                      {new Date(q.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {q.status === "published" && q.publishedTo?.length ? (
                    <div className="text-xs text-white/60 mt-3">
                      Published to: <span className="text-white/80">{q.publishedTo.join(", ")}</span>
                    </div>
                  ) : null}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => onPreview(q.id)}
                    className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
                  >
                    <Eye className="h-4 w-4" />
                    Preview
                  </button>

                  <button
                    onClick={() => onDuplicate(q.id)}
                    className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Duplicate
                  </button>

                  {q.status === "draft" ? (
                    <button
                      onClick={() => onPublish(q.id)}
                      className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-[#1EA896] to-[#1EA896]/80 text-white rounded-lg hover:shadow-lg transition-all"
                    >
                      <UploadCloud className="h-4 w-4" />
                      Publish
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 bg-green-500/20 text-green-300 px-3 py-2 rounded-lg">
                      <Trophy className="h-4 w-4" />
                      Published
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                page === 1 ? "bg-white/5 text-white/40" : "bg-white/10 hover:bg-white/20 text-white"
              }`}
            >
              Prev
            </button>

            <div className="text-sm text-white/60">
              Page {page} of {totalPages}
            </div>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                page === totalPages
                  ? "bg-white/5 text-white/40"
                  : "bg-white/10 hover:bg-white/20 text-white"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}