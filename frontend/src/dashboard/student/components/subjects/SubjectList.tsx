import { SubjectCard } from "./SubjectCard";

interface Subject {
  id: number;
  title: string;
  description: string;
  instructor: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  duration: string;
  color: string;
  bgGradient: string;
}

interface SubjectListProps {
  subjects?: Subject[];
  searchQuery?: string;
  filterValue?: string;
  sortField?: string;
  sortDirection?: "asc" | "desc";
  currentPage?: number;
  itemsPerPage?: number;
}

const defaultSubjects: Subject[] = [
  {
    id: 1,
    title: "Advanced Mathematics",
    description: "Comprehensive study of calculus, algebra, and mathematical analysis for Senior 6 students preparing for national examinations.",
    instructor: "Dr. Jean Uwimana",
    progress: 78,
    totalLessons: 24,
    completedLessons: 19,
    duration: "12 weeks",
    color: "text-[#1EA896]",
    bgGradient: "bg-gradient-to-br from-[#1EA896] to-[#1EA896]/80"
  },
  {
    id: 2,
    title: "Physics Laboratory",
    description: "Hands-on experiments and theoretical applications covering mechanics, thermodynamics, and modern physics concepts.",
    instructor: "Prof. Marie Mukamana",
    progress: 65,
    totalLessons: 20,
    completedLessons: 13,
    duration: "10 weeks",
    color: "text-[#FF715B]",
    bgGradient: "bg-gradient-to-br from-[#FF715B] to-[#FF715B]/80"
  },
  {
    id: 3,
    title: "Biology & Life Sciences",
    description: "Study of cellular biology, genetics, ecology, and human anatomy with practical laboratory work and research projects.",
    instructor: "Dr. Paul Nkurunziza",
    progress: 82,
    totalLessons: 28,
    completedLessons: 23,
    duration: "14 weeks",
    color: "text-[#4C5454]",
    bgGradient: "bg-gradient-to-br from-[#4C5454] to-[#523F38]"
  },
  {
    id: 4,
    title: "Chemistry Fundamentals",
    description: "Organic and inorganic chemistry principles with laboratory experiments and chemical reaction analysis.",
    instructor: "Dr. Alice Nyirahabimana",
    progress: 45,
    totalLessons: 22,
    completedLessons: 10,
    duration: "11 weeks",
    color: "text-[#523F38]",
    bgGradient: "bg-gradient-to-br from-[#523F38] to-[#4C5454]"
  },
  {
    id: 5,
    title: "Kinyarwanda Literature",
    description: "Exploration of Rwandan literary works, poetry, and cultural texts with focus on language development and analysis.",
    instructor: "Mwalimu Joseph Habimana",
    progress: 90,
    totalLessons: 16,
    completedLessons: 14,
    duration: "8 weeks",
    color: "text-[#1EA896]",
    bgGradient: "bg-gradient-to-br from-[#1EA896] to-[#1EA896]/80"
  },
  {
    id: 6,
    title: "History & Geography",
    description: "Comprehensive study of Rwandan history, East African geography, and global historical perspectives.",
    instructor: "Prof. Grace Uwizeyimana",
    progress: 55,
    totalLessons: 18,
    completedLessons: 10,
    duration: "9 weeks",
    color: "text-[#FF715B]",
    bgGradient: "bg-gradient-to-br from-[#FF715B] to-[#FF715B]/80"
  }
];

export function SubjectList({ 
  subjects = defaultSubjects,
  searchQuery = "",
  filterValue = "all",
  sortField = "title",
  sortDirection = "asc",
  currentPage = 1,
  itemsPerPage = 6
}: SubjectListProps) {
  // Filter subjects based on search and filters
  const filteredSubjects = subjects.filter((subject) => {
    const matchesSearch = subject.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         subject.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterValue === "all" || 
                         (filterValue === "science" && ["Advanced Mathematics", "Physics Laboratory", "Biology & Life Sciences", "Chemistry Fundamentals"].includes(subject.title)) ||
                         (filterValue === "arts" && ["History & Geography"].includes(subject.title)) ||
                         (filterValue === "languages" && ["Kinyarwanda Literature"].includes(subject.title)) ||
                         (filterValue === "senior-6" && true); // All subjects are senior 6 level
    
    return matchesSearch && matchesFilter;
  });

  // Sort subjects
  const sortedSubjects = [...filteredSubjects].sort((a, b) => {
    let aValue: string | number = "";
    let bValue: string | number = "";
    
    switch (sortField) {
      case "title":
        aValue = a.title;
        bValue = b.title;
        break;
      case "instructor":
        aValue = a.instructor;
        bValue = b.instructor;
        break;
      case "progress":
        aValue = a.progress;
        bValue = b.progress;
        break;
      default:
        aValue = a.title;
        bValue = b.title;
    }
    
    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else {
      return sortDirection === "asc" 
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    }
  });

  // Paginate subjects
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSubjects = sortedSubjects.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {paginatedSubjects.map((subject) => (
        <SubjectCard
          key={subject.id}
          title={subject.title}
          description={subject.description}
          instructor={subject.instructor}
          progress={subject.progress}
          totalLessons={subject.totalLessons}
          completedLessons={subject.completedLessons}
          duration={subject.duration}
          color={subject.color}
          bgGradient={subject.bgGradient}
        />
      ))}
    </div>
  );
}