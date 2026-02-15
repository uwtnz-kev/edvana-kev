import React, { useState, useMemo } from "react";
import { 
  QuizCreatorForm, 
  OngoingQuizzes, 
  CompletedQuizzes, 
  QuizFilters, 
  QuizList, 
  QuizStatsCards, 
  CreateQuizHeader, 
  QuizFeatures, 
  QuizTipsCard 
} from "../../components/ai-tutor";

// Use component types - no duplicates
interface Quiz {
  id: string;
  title: string;
  type: "MCQ" | "Open" | "Mixed";
  subject: string;
  difficulty: "Easy" | "Medium" | "Hard";
  totalQuestions: number;
  createdAt: string;
  estimatedTime: number;
  description?: string;
}

interface OngoingQuiz {
  id: string;
  title: string;
  type: "MCQ" | "Open" | "Mixed";
  subject: string;
  difficulty: "Easy" | "Medium" | "Hard";
  totalQuestions: number;
  answeredQuestions: number;
  timeStarted: string;
  estimatedTime: number;
}

interface CompletedQuiz {
  id: string;
  title: string;
  type: "MCQ" | "Open" | "Mixed";
  subject: string;
  difficulty: "Easy" | "Medium" | "Hard";
  totalQuestions: number;
  score: number;
  completedAt: string;
  timeSpent: number;
  passed: boolean;
}

// Mock data for available quizzes
const mockAvailableQuizzes: Quiz[] = [
  {
    id: "quiz-1",
    title: "Rwanda History: Independence Era",
    type: "MCQ",
    subject: "History",
    difficulty: "Medium",
    totalQuestions: 15,
    createdAt: "2025-01-26T10:30:00Z",
    estimatedTime: 20,
    description: "Test your knowledge about Rwanda's path to independence and key historical events."
  },
  {
    id: "quiz-2", 
    title: "Mathematics: Algebraic Expressions",
    type: "Mixed",
    subject: "Mathematics",
    difficulty: "Hard",
    totalQuestions: 12,
    createdAt: "2025-01-25T14:20:00Z",
    estimatedTime: 25,
    description: "Advanced algebra problems covering polynomials, factoring, and equation solving."
  },
  {
    id: "quiz-3",
    title: "English Literature: Poetry Analysis",
    type: "Open",
    subject: "English",
    difficulty: "Medium",
    totalQuestions: 8,
    createdAt: "2025-01-24T09:15:00Z",
    estimatedTime: 30,
    description: "Analyze themes, literary devices, and meanings in classic poetry."
  },
  {
    id: "quiz-4",
    title: "Science: Cell Biology Basics",
    type: "MCQ",
    subject: "Science",
    difficulty: "Easy",
    totalQuestions: 20,
    createdAt: "2025-01-23T16:45:00Z",
    estimatedTime: 15,
    description: "Basic concepts of cell structure, function, and biological processes."
  },
  {
    id: "quiz-5",
    title: "Geography: Rwanda's Natural Features",
    type: "Mixed",
    subject: "Geography",
    difficulty: "Medium",
    totalQuestions: 18,
    createdAt: "2025-01-22T11:00:00Z",
    estimatedTime: 22,
    description: "Learn about Rwanda's mountains, lakes, rivers, and climate patterns."
  }
];

// Mock ongoing quizzes
const mockOngoingQuizzes: OngoingQuiz[] = [
  {
    id: "ongoing-1",
    title: "Mathematics: Geometry Fundamentals",
    type: "MCQ",
    subject: "Mathematics",
    difficulty: "Medium",
    totalQuestions: 20,
    answeredQuestions: 12,
    timeStarted: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 minutes ago
    estimatedTime: 25
  }
];

// Mock completed quizzes
const mockCompletedQuizzes: CompletedQuiz[] = [
  {
    id: "completed-1",
    title: "Kinyarwanda: Grammar Basics",
    type: "Mixed",
    subject: "Kinyarwanda",
    difficulty: "Easy",
    totalQuestions: 15,
    score: 87,
    completedAt: "2025-01-25T16:30:00Z",
    timeSpent: 18,
    passed: true
  },
  {
    id: "completed-2",
    title: "Science: Physics Motion",
    type: "MCQ",
    subject: "Science",
    difficulty: "Hard",
    totalQuestions: 25,
    score: 64,
    completedAt: "2025-01-24T14:45:00Z",
    timeSpent: 35,
    passed: true
  },
  {
    id: "completed-3",
    title: "History: Colonial Period",
    type: "Open",
    subject: "History",
    difficulty: "Medium",
    totalQuestions: 10,
    score: 45,
    completedAt: "2025-01-23T10:20:00Z",
    timeSpent: 28,
    passed: false
  }
];

export default function QuizGeneratorView() {
  const [availableQuizzes, setAvailableQuizzes] = useState<Quiz[]>(mockAvailableQuizzes);
  const [ongoingQuizzes, setOngoingQuizzes] = useState<OngoingQuiz[]>(mockOngoingQuizzes);
  const [completedQuizzes, setCompletedQuizzes] = useState<CompletedQuiz[]>(mockCompletedQuizzes);
  
  // Filter states for QuizFilters component
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All Levels");
  const [selectedType, setSelectedType] = useState("All Types");
  const [sortBy, setSortBy] = useState("Date Created");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter and sort quizzes
  const filteredQuizzes = useMemo(() => {
    let filtered = availableQuizzes.filter(quiz => {
      const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           quiz.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSubject = selectedSubject === "All Subjects" || quiz.subject === selectedSubject;
      const matchesDifficulty = selectedDifficulty === "All Levels" || quiz.difficulty === selectedDifficulty;
      const matchesType = selectedType === "All Types" || quiz.type === selectedType;
      
      return matchesSearch && matchesSubject && matchesDifficulty && matchesType;
    });

    // Sort
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case "Title":
          aValue = a.title;
          bValue = b.title;
          break;
        case "Difficulty":
          const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 };
          aValue = difficultyOrder[a.difficulty];
          bValue = difficultyOrder[b.difficulty];
          break;
        case "Date Created":
        default:
          aValue = new Date(a.createdAt);
          bValue = new Date(b.createdAt);
      }
      
      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [availableQuizzes, searchTerm, selectedSubject, selectedDifficulty, selectedType, sortBy, sortOrder]);

  // Paginate quizzes
  const totalPages = Math.ceil(filteredQuizzes.length / itemsPerPage);
  const paginatedQuizzes = filteredQuizzes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleQuizGenerated = (quiz: Quiz) => {
    setAvailableQuizzes(prev => [quiz, ...prev]);
  };

  const handleStartQuiz = (quiz: Quiz) => {
    const ongoingQuiz: OngoingQuiz = {
      ...quiz,
      answeredQuestions: 0,
      timeStarted: new Date().toISOString()
    };
    setOngoingQuizzes(prev => [ongoingQuiz, ...prev]);
  };

  const handleContinueQuiz = (quiz: OngoingQuiz) => {
    console.log("Continue quiz:", quiz.title);
  };

  const handleViewResults = (quiz: CompletedQuiz) => {
    console.log("View results for:", quiz.title);
  };

  const handleRetakeQuiz = (quiz: CompletedQuiz) => {
    const ongoingQuiz: OngoingQuiz = {
      id: `retake-${quiz.id}-${Date.now()}`,
      title: quiz.title,
      type: quiz.type,
      subject: quiz.subject,
      difficulty: quiz.difficulty,
      totalQuestions: quiz.totalQuestions,
      answeredQuestions: 0,
      timeStarted: new Date().toISOString(),
      estimatedTime: 25 // Default estimated time
    };
    setOngoingQuizzes(prev => [ongoingQuiz, ...prev]);
  };

  const handleCreateQuiz = () => {
    console.log("Open quiz creator");
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Quiz Generator</h1>
            <p className="text-white/70">Create custom practice quizzes on any topic to test your knowledge</p>
          </div>
        </div>

        {/* Quiz Stats */}
        <QuizStatsCards 
          availableQuizzes={availableQuizzes}
          ongoingQuizzes={ongoingQuizzes}
          completedQuizzes={completedQuizzes}
        />

        {/* Create New Quiz Button */}
        <CreateQuizHeader onCreateQuiz={handleCreateQuiz} />

        {/* Ongoing Quizzes Section */}
        <OngoingQuizzes 
          quizzes={ongoingQuizzes} 
          onContinueQuiz={handleContinueQuiz} 
        />

        {/* Completed Quizzes Section */}
        <CompletedQuizzes 
          quizzes={completedQuizzes}
          onViewResults={handleViewResults}
          onRetakeQuiz={handleRetakeQuiz}
        />

        {/* Available Quizzes Section - Integrated Filters & List */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden">
          {/* Section Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <h2 className="text-2xl font-bold text-white">Available Quizzes</h2>
            <span className="text-white/60 text-sm">
              {filteredQuizzes.length} quiz{filteredQuizzes.length !== 1 ? 'es' : ''} available
            </span>
          </div>

          {/* Integrated Filters Toolbar */}
          <div className="p-6 border-b border-white/10 bg-white/5">
            <QuizFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedSubject={selectedSubject}
              onSubjectChange={setSelectedSubject}
              selectedDifficulty={selectedDifficulty}
              onDifficultyChange={setSelectedDifficulty}
              selectedType={selectedType}
              onTypeChange={setSelectedType}
              sortBy={sortBy}
              onSortChange={setSortBy}
              sortOrder={sortOrder}
              onSortOrderChange={setSortOrder}
              itemsPerPage={itemsPerPage}
              onItemsPerPageChange={setItemsPerPage}
            />
          </div>

          {/* Quiz List Content */}
          <div className="p-6">
            <QuizList
              quizzes={paginatedQuizzes}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              onStartQuiz={handleStartQuiz}
            />
          </div>
        </div>

        {/* Quiz Generator Features */}
        <QuizFeatures />

        {/* Usage Tips */}
        <QuizTipsCard />
      </div>
    </div>
  );
}