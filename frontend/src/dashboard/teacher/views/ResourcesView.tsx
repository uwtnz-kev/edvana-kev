import { useMemo, useState } from "react";
import { Package, BookOpen, FileText, Video, Headphones, Globe, Upload } from "lucide-react";
import { TeacherResourceFilter, TeacherResourceList } from "../components/resources";
import { PaginationControls } from "@/dashboard/student/components/shared";

const resourcesData = [
  {
    id: 1,
    title: "Advanced Mathematics Handbook",
    description: "Comprehensive guide covering calculus, algebra, and trigonometry for senior students",
    type: "PDF Book",
    subject: "Mathematics",
    fileSize: "15.2 MB",
    downloadCount: 2847,
    rating: 4.8,
    lastUpdated: "2024-12-15",
    icon: BookOpen,
    color: "from-blue-500 to-blue-600",
  },
  {
    id: 2,
    title: "Physics Laboratory Manual",
    description: "Step by step experiments and procedures for physics laboratory work",
    type: "PDF Guide",
    subject: "Physics",
    fileSize: "23.8 MB",
    downloadCount: 1956,
    rating: 4.9,
    lastUpdated: "2024-12-10",
    icon: FileText,
    color: "from-purple-500 to-purple-600",
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
    color: "from-green-500 to-green-600",
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
    color: "from-orange-500 to-orange-600",
  },
  {
    id: 5,
    title: "Biology Audio Lessons",
    description: "Audio recordings of biology lessons for revision and study",
    type: "Audio Series",
    subject: "Biology",
    fileSize: "456 MB",
    downloadCount: 1789,
    rating: 4.5,
    lastUpdated: "2024-12-12",
    icon: Headphones,
    color: "from-emerald-500 to-emerald-600",
  },
  {
    id: 6,
    title: "History Interactive Timeline",
    description: "Interactive web based timeline of major historical events and Rwanda history",
    type: "Web Resource",
    subject: "History",
    fileSize: "Online",
    downloadCount: 1432,
    rating: 4.4,
    lastUpdated: "2024-12-18",
    icon: Globe,
    color: "from-amber-500 to-amber-600",
  },
];

const subjects = [
  "All Subjects",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "History",
];

const resourceTypes = [
  "All Types",
  "PDF Book",
  "PDF Guide",
  "Video Series",
  "Audio Series",
  "Web Resource",
];

export default function ResourcesView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [selectedType, setSelectedType] = useState("All Types");
  const [sortBy, setSortBy] = useState("popularity");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const processedResources = useMemo(() => {
    const filteredResources = resourcesData.filter((resource) => {
      const matchesSearch =
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSubject =
        selectedSubject === "All Subjects" || resource.subject === selectedSubject;

      const matchesType =
        selectedType === "All Types" || resource.type === selectedType;

      return matchesSearch && matchesSubject && matchesType;
    });

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

  const totalPages = Math.max(1, Math.ceil(processedResources.length / itemsPerPage));

  const paginatedResources = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return processedResources.slice(startIndex, startIndex + itemsPerPage);
  }, [processedResources, currentPage, itemsPerPage]);

  const handleItemsPerPageChange = (n: number) => {
    setItemsPerPage(n);
    setCurrentPage(1);
  };

  const handleDownload = (resource: (typeof resourcesData)[0]) => {
    console.log("download", resource.id);
    alert(`Starting download: ${resource.title}`);
  };

  const handleAssign = (resource: (typeof resourcesData)[0]) => {
    console.log("assign", resource.id);
    alert(`Assigning resource: ${resource.title}`);
  };

  const handleUpload = () => {
    alert("Upload flow coming soon");
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#FF715B] to-[#FF715B]/80 rounded-lg flex items-center justify-center">
              <Package className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Teacher Resources</h1>
              <p className="text-white/70">Upload, assign, and manage learning materials</p>
            </div>
          </div>

          <button
            onClick={handleUpload}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20"
          >
            <Upload className="h-4 w-4" />
            Upload
          </button>
        </div>

        <TeacherResourceFilter
          searchTerm={searchTerm}
          onSearchChange={(v) => {
            setSearchTerm(v);
            setCurrentPage(1);
          }}
          selectedSubject={selectedSubject}
          onSubjectChange={(v) => {
            setSelectedSubject(v);
            setCurrentPage(1);
          }}
          selectedType={selectedType}
          onTypeChange={(v) => {
            setSelectedType(v);
            setCurrentPage(1);
          }}
          sortBy={sortBy}
          onSortChange={(v) => {
            setSortBy(v);
            setCurrentPage(1);
          }}
          resultsCount={processedResources.length}
          totalCount={resourcesData.length}
          subjects={subjects}
          resourceTypes={resourceTypes}
        />

        <TeacherResourceList
          resources={paginatedResources}
          onDownload={handleDownload}
          onAssign={handleAssign}
        />

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
