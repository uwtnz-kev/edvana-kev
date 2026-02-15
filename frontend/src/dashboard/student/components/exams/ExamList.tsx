import { ExamCard } from "./ExamCard";
import { FileText } from "lucide-react";

interface Exam {
  id: number;
  title: string;
  description: string;
  timeLimit: number;
  questionsCount: number;
  status: "upcoming" | "active" | "completed";
  dueDate: string;
  subject: string;
  score?: number;
  color: string;
  bgGradient: string;
}

interface ExamListProps {
  exams?: Exam[];
  filter?: "all" | "upcoming" | "active" | "completed";
  searchQuery?: string;
  filterValue?: string;
  sortField?: string;
  sortDirection?: "asc" | "desc";
  currentPage?: number;
  itemsPerPage?: number;
}

const defaultExams: Exam[] = [
  {
    id: 1,
    title: "Advanced Mathematics Mid-Term",
    description: "Comprehensive examination covering calculus, algebra, and mathematical analysis including differentiation, integration, and complex number theory.",
    timeLimit: 120,
    questionsCount: 50,
    status: "upcoming",
    dueDate: "Feb 15, 2025",
    subject: "Mathematics",
    color: "text-[#1EA896]",
    bgGradient: "bg-gradient-to-br from-[#1EA896] to-[#1EA896]/80"
  },
  {
    id: 2,
    title: "Physics Laboratory Practical",
    description: "Hands-on practical examination testing experimental skills, data analysis, and understanding of physics principles in laboratory settings.",
    timeLimit: 90,
    questionsCount: 25,
    status: "active",
    dueDate: "Feb 12, 2025",
    subject: "Physics",
    color: "text-[#FF715B]",
    bgGradient: "bg-gradient-to-br from-[#FF715B] to-[#FF715B]/80"
  },
  {
    id: 3,
    title: "Biology Cell Structure Quiz",
    description: "Assessment on cellular biology, organelles, cell division processes, and molecular biology fundamentals including DNA and protein synthesis.",
    timeLimit: 60,
    questionsCount: 30,
    status: "completed",
    dueDate: "Feb 8, 2025",
    subject: "Biology",
    score: 87,
    color: "text-[#4C5454]",
    bgGradient: "bg-gradient-to-br from-[#4C5454] to-[#523F38]"
  },
  {
    id: 4,
    title: "Chemistry Organic Compounds",
    description: "Examination focusing on organic chemistry principles, reaction mechanisms, and compound identification with practical applications.",
    timeLimit: 105,
    questionsCount: 40,
    status: "upcoming",
    dueDate: "Feb 20, 2025",
    subject: "Chemistry",
    color: "text-[#523F38]",
    bgGradient: "bg-gradient-to-br from-[#523F38] to-[#4C5454]"
  },
  {
    id: 5,
    title: "Kinyarwanda Literature Analysis",
    description: "Literary analysis examination covering classical and modern Rwandan literature, poetry interpretation, and cultural context understanding.",
    timeLimit: 90,
    questionsCount: 35,
    status: "completed",
    dueDate: "Feb 5, 2025",
    subject: "Kinyarwanda",
    score: 92,
    color: "text-[#1EA896]",
    bgGradient: "bg-gradient-to-br from-[#1EA896] to-[#1EA896]/80"
  },
  {
    id: 6,
    title: "History of Rwanda Final",
    description: "Comprehensive final examination covering pre-colonial, colonial, and post-independence Rwanda with focus on key historical events and figures.",
    timeLimit: 150,
    questionsCount: 60,
    status: "upcoming",
    dueDate: "Feb 25, 2025",
    subject: "History",
    color: "text-[#FF715B]",
    bgGradient: "bg-gradient-to-br from-[#FF715B] to-[#FF715B]/80"
  }
];

export function ExamList({ 
  exams = defaultExams, 
  filter = "all",
  searchQuery = "",
  filterValue = "all",
  sortField = "date",
  sortDirection = "asc",
  currentPage = 1,
  itemsPerPage = 8
}: ExamListProps) {
  // Filter exams based on search and filters
  const filteredExams = exams.filter((exam) => {
    const matchesSearch = exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         exam.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         exam.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterValue === "all" || 
                         exam.status === filterValue ||
                         (filterValue === "past" && exam.status === "completed");
    
    return matchesSearch && matchesFilter;
  });

  // Sort exams
  const sortedExams = [...filteredExams].sort((a, b) => {
    let aValue: string | number | Date = "";
    let bValue: string | number | Date = "";
    
    switch (sortField) {
      case "date":
        aValue = new Date(a.dueDate);
        bValue = new Date(b.dueDate);
        break;
      case "subject":
        aValue = a.subject;
        bValue = b.subject;
        break;
      case "status":
        const statusOrder = { active: 3, upcoming: 2, completed: 1 };
        aValue = statusOrder[a.status];
        bValue = statusOrder[b.status];
        break;
      case "score":
        aValue = a.score || 0;
        bValue = b.score || 0;
        break;
      default:
        aValue = new Date(a.dueDate);
        bValue = new Date(b.dueDate);
    }
    
    if (aValue instanceof Date && bValue instanceof Date) {
      return sortDirection === "asc" 
        ? aValue.getTime() - bValue.getTime()
        : bValue.getTime() - aValue.getTime();
    } else if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else {
      return sortDirection === "asc" 
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    }
  });

  // Paginate exams
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedExams = sortedExams.slice(startIndex, startIndex + itemsPerPage);

  if (paginatedExams.length === 0) {
    return (
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 text-center">
        <FileText className="h-12 w-12 text-white/40 mx-auto mb-4" />
        <h3 className="text-white text-lg font-medium mb-2">No exams found</h3>
        <p className="text-white/60">
          {searchQuery || filterValue !== "all" 
            ? "No exams match your current search or filter criteria." 
            : "You don't have any exams scheduled yet."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {paginatedExams.map((exam) => (
        <ExamCard
          key={exam.id}
          title={exam.title}
          description={exam.description}
          timeLimit={exam.timeLimit}
          questionsCount={exam.questionsCount}
          status={exam.status}
          dueDate={exam.dueDate}
          subject={exam.subject}
          score={exam.score}
          color={exam.color}
          bgGradient={exam.bgGradient}
        />
      ))}
    </div>
  );
}