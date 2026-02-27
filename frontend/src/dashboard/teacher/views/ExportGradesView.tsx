import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Upload, Plus, ListChecks } from "lucide-react";
import GradeListBuilderCard from "@/dashboard/teacher/components/grades/export/GradeListBuilderCard";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

type GradeList = { id: string; title: string };

export default function ExportGradesView() {
  const navigate = useNavigate();

  const [gradeLists, setGradeLists] = useState<GradeList[]>([
    { id: "list-1", title: "Term 1 Grades" },
    { id: "list-2", title: "Midterm Grades" },
  ]);

  const [lastImportedFile, setLastImportedFile] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [activeNewListName, setActiveNewListName] = useState("");

  function submitCreate() {
    const title = newListName.trim();
    if (!title) return;

    const id = `list-${Date.now()}`;
    const next = [{ id, title }, ...gradeLists];
    setGradeLists(next);
    setActiveNewListName(title);

    setNewListName("");
    setCreateOpen(false);
  }

  function handleImportGrades(file: File | null) {
    if (!file) return;
    setLastImportedFile(file.name);
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-6">
      <div className="flex items-center justify-between gap-4">
       <div className="flex items-center gap-4">
  <button
    onClick={() => navigate(-1)}
    className="h-11 w-11 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/15 transition"
    type="button"
  >
    <ArrowLeft className="h-5 w-5 text-[#3B240F]" />
  </button>

  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#1EA896]/85 to-[#159A85]/85 flex items-center justify-center">
    <Download className="h-5 w-5 text-white" />
  </div>

  <div>
    <h1 className="text-xl font-semibold text-[#3B240F]">Export Grades</h1>
    <p className="text-sm text-[#6B4F3A]">
      Create grade lists, import grades, and export reports
    </p>
  </div>
</div>

        <div className="hidden sm:flex items-center gap-2 text-[#6B4F3A]">
          <Download className="h-4 w-4" />
          <span className="text-sm font-medium">Export</span>
        </div>
      </div>

      <div className="group rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-4 hover:bg-white/15 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#8B6F52]/25">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-[#8B6F52]/75 to-[#6F5238]/75 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <ListChecks className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#3B240F]">Grade Lists</p>
              <p className="text-xs text-[#6B4F3A]">Pick or create a list to import into</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          
            <Popover open={createOpen} onOpenChange={setCreateOpen}>
              <PopoverTrigger asChild>
                <button
                  className="group h-11 px-4 rounded-2xl bg-white/10 border border-white/20 text-[#3B240F] hover:bg-white/15 transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-md hover:shadow-[#8B6F52]/20 flex items-center gap-2"
                  type="button"
                >
                  <Plus className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                  Create list
                </button>
              </PopoverTrigger>

              <PopoverContent
                align="start"
                side="bottom"
                className="w-[--radix-popover-trigger-width] min-w-[280px] p-3 bg-white/18 backdrop-blur-xl border border-white/25 rounded-2xl"
              >
                <div className="space-y-3">
                  <div className="text-sm font-medium text-[#3B240F]">New grade list</div>

                  <Input
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    placeholder="Enter list name"
                    className="bg-white/10 border-white/20 text-[#3B240F] placeholder:text-[#6B4F3A]"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") submitCreate();
                    }}
                  />

                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setNewListName("");
                        setCreateOpen(false);
                      }}
                      className="group h-9 px-3 rounded-xl bg-white/10 border border-white/20 text-[#3B240F] hover:bg-white/15 transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-md hover:shadow-[#8B6F52]/20 text-sm font-medium"
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={submitCreate}
                      className="group h-9 px-3 rounded-xl bg-gradient-to-br from-[#1EA896]/85 to-[#159A85]/85 text-white hover:opacity-90 transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-lg hover:shadow-[#1EA896]/25 text-sm font-medium"
                    >
                      Create
                    </button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <label className="group h-11 px-4 rounded-2xl bg-gradient-to-br from-[#1EA896]/85 to-[#159A85]/85 text-white hover:opacity-90 transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-lg hover:shadow-[#1EA896]/25 text-sm font-medium flex items-center gap-2 cursor-pointer">
              <Upload className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
              Import grades
              <input
                type="file"
                accept=".csv,.xlsx"
                className="hidden"
                onChange={(e) => handleImportGrades(e.target.files?.[0] ?? null)}
              />
            </label>
          </div>
        </div>

        {lastImportedFile ? (
          <div className="mt-3 rounded-xl bg-white/10 border border-white/15 p-3 text-sm text-[#6B4F3A]">
            Imported file:{" "}
            <span className="font-medium text-[#3B240F]">{lastImportedFile}</span>
          </div>
        ) : null}
      </div>

      {activeNewListName ? <GradeListBuilderCard listName={activeNewListName} /> : null}

      <div className="group rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-6 text-[#6B4F3A] hover:bg-white/15 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#8B6F52]/25">
        Export configuration UI will go here next.
      </div>
    </div>
  );
}
