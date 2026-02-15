import { useState, useMemo } from "react";
import { Package, BookOpen, FileText, Video, Headphones, Globe } from "lucide-react";
import { ResourceFilter, ResourceList } from "../components/resources";
import { PaginationControls } from "../components/shared";

// Sample resources data
const resourcesData = [
  {
    id: 1,
    title: "Advanced Mathematics Handbook",
    description: "Comprehensive guide covering calculus, algebra, and trigonometry for S3 students",
    type: "PDF Book",
    subject: "Mathematics",
    fileSize: "15.2 MB",
    downloadCount: 2847,
    rating: 4.8,
    lastUpdated: "2024-12-15",
    icon: BookOpen,
    color: "from-blue-500 to-blue-600"
  },
  {
    id: 2,
    title: "Physics Laboratory Manual",
    description: "Step-by-step experiments and practical procedures for physics laboratory work",
    type: "PDF Guide",
    subject: "Physics", 
    fileSize: "23.8 MB",
    downloadCount: 1956,
    rating: 4.9,
    lastUpdated: "2024-12-10",
    icon: FileText,
    color: "from-purple-500 to-purple-600"
  },
  {
    id: 3,
    title: "Chemistry Video Lectures Series",
    description: "Complete video series covering organic and inorganic chemistry concepts",
    type: "Video Series",
    subject: "Chemistry",
    fileSize: "1.2 GB",
    downloadCount: 3241,
    rating: 4.7,
    lastUpdated: "2024-12-20",
    icon: Video,
    color: "from-green-500 to-green-600"
  },
  {
    id: 4,
    title: "English Literature Study Guide",
    description: "Analysis of key literary works and writing techniques for CBC curriculum",
    type: "PDF Book",
    subject: "English",
    fileSize: "8.7 MB",
    downloadCount: 2103,
    rating: 4.6,
    lastUpdated: "2024-12-08",
    icon: BookOpen,
    color: "from-orange-500 to-orange-600"
  },
  {
    id: 5,
    title: "Biology Audio Lessons",
    description: "Audio recordings of biology lessons perfect for revision and study",
    type: "Audio Series",
    subject: "Biology",
    fileSize: "456 MB",
    downloadCount: 1789,
    rating: 4.5,
    lastUpdated: "2024-12-12",
    icon: Headphones,
    color: "from-emerald-500 to-emerald-600"
  },
  {
    id: 6,
    title: "History Interactive Timeline",
    description: "Interactive web-based timeline of major historical events and Rwanda's history",
    type: "Web Resource",
    subject: "History",
    fileSize: "Online",
    downloadCount: 1432,
    rating: 4.4,
    lastUpdated: "2024-12-18",
    icon: Globe,
    color: "from-amber-500 to-amber-600"
  },
  {
    id: 7,
    title: "French Conversation Practice",
    description: "Audio exercises and dialogues for improving French speaking and listening skills",
    type: "Audio Guide",
    subject: "French",
    fileSize: "287 MB",
    downloadCount: 2156,
    rating: 4.8,
    lastUpdated: "2024-12-14",
    icon: Headphones,
    color: "from-pink-500 to-pink-600"
  },
  {
    id: 8,
    title: "Geography Atlas Rwanda",
    description: "Detailed maps and geographical information about Rwanda and East Africa",
    type: "PDF Atlas",
    subject: "Geography",
    fileSize: "42.3 MB",
    downloadCount: 1654,
    rating: 4.9,
    lastUpdated: "2024-12-16",
    icon: FileText,
    color: "from-teal-500 to-teal-600"
  },
  {
    id: 9,
    title: "Kinyarwanda Cultural Studies",
    description: "Comprehensive guide to Rwandan culture, traditions, and language development",
    type: "PDF Book",
    subject: "Kinyarwanda",
    fileSize: "19.1 MB",
    downloadCount: 2987,
    rating: 4.7,
    lastUpdated: "2024-12-22",
    icon: BookOpen,
    color: "from-red-500 to-red-600"
  },
  {
    id: 10,
    title: "Computer Programming Basics",
    description: "Introduction to programming concepts using Python and JavaScript",
    type: "PDF Guide",
    subject: "Computer Science",
    fileSize: "12.4 MB",
    downloadCount: 3567,
    rating: 4.9,
    lastUpdated: "2024-12-25",
    icon: FileText,
    color: "from-cyan-500 to-cyan-600"
  }
];

const subjects = ["All Subjects", "Mathematics", "Physics", "Chemistry", "Biology", "English", "French", "History", "Geography", "Kinyarwanda", "Computer Science"];
const resourceTypes = ["All Types", "PDF Book", "PDF Guide", "Video Series", "Audio Series", "Web Resource", "PDF Atlas", "Audio Guide"];

export default function ResourcesView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [selectedType, setSelectedType] = useState("All Types");
  const [sortBy, setSortBy] = useState("popularity");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  // Memoized filtered and sorted resources
  const processedResources = useMemo(() => {
    // Filter resources based on search and filters
    const filteredResources = resourcesData.filter(resource => {
      const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           resource.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSubject = selectedSubject === "All Subjects" || resource.subject === selectedSubject;
      const matchesType = selectedType === "All Types" || resource.type === selectedType;
      
      return matchesSearch && matchesSubject && matchesType;
    });

    // Sort resources
    return [...filteredResources].sort((a, b) => {
      switch (sortBy) {
        case "popularity":
          return b.downloadCount - a.downloadCount;
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
  }, [searchTerm, selectedSubject, selectedType, sortBy]);

  // Pagination calculations
  const totalPages = Math.ceil(processedResources.length / itemsPerPage);
  const paginatedResources = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return processedResources.slice(startIndex, startIndex + itemsPerPage);
  }, [processedResources, currentPage, itemsPerPage]);

  // Handle pagination changes
  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const handleDownload = (resource: typeof resourcesData[0]) => {
    // Simulate download - in real app, this would trigger actual download
    console.log(`Downloading: ${resource.title}`);
    alert(`Starting download: ${resource.title}`);
  };



  return (
    <div className="p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#FF715B] to-[#FF715B]/80 rounded-lg flex items-center justify-center">
            <Package className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Student Resources</h1>
            <p className="text-white/70">Access study materials, guides, and educational content</p>
          </div>
        </div>

        {/* Filters and Search */}
        <ResourceFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedSubject={selectedSubject}
          onSubjectChange={setSelectedSubject}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          sortBy={sortBy}
          onSortChange={setSortBy}
          resultsCount={processedResources.length}
          totalCount={resourcesData.length}
          subjects={subjects}
          resourceTypes={resourceTypes}
        />

        {/* Resources List */}
        <ResourceList
          resources={paginatedResources}
          onDownload={handleDownload}
        />

        {/* Pagination Controls */}
        {processedResources.length > 0 && (
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            totalItems={processedResources.length}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        )}
      </div>
    </div>
  );
}