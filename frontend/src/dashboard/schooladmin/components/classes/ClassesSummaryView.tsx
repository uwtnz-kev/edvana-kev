import React, { useState, useMemo, useEffect } from 'react';
import { Users, BookOpen, GraduationCap, Filter, Search, Eye, EyeOff, ChevronLeft, ChevronRight, Download, Calendar, Layers, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { GlassSelect } from '@/components/ui/glass-select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useDebounce } from '@/hooks/use-debounce';
import { 
  Level, 
  Grade, 
  SubGrade, 
  DerivedClass, 
  classesStore, 
  regenerateDerivedClasses,
  findLevel,
  findGrade,
  findSubGrade
} from '@/shared/mocks/schooladmin/classes';

interface ClassesSummaryViewProps {
  levels: Level[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  itemsPerPage: number;
  onItemsPerPageChange: (value: number) => void;
  visibleColumns: {
    order: boolean;
    count: boolean;
  };
  onColumnVisibilityChange: (column: string, visible: boolean) => void;
}

type ViewType = 'classes' | 'structure';
type GroupByType = 'level' | 'grade' | 'class';

interface ClassInfo extends DerivedClass {
  levelName: string;
  gradeName: string;
  subGradeName?: string;
  combinationName?: string;
  studentCount: number;
  hasSubGrades: boolean;
  hasCombinations: boolean;
}

// Generate mock student counts for derived classes
const generateClassInfo = (derivedClasses: DerivedClass[]): ClassInfo[] => {
  return derivedClasses.map((derivedClass) => {
    const level = findLevel(classesStore, derivedClass.levelId);
    const grade = findGrade(classesStore, derivedClass.gradeId);
    const subGrade = derivedClass.subGradeId ? findSubGrade(classesStore, derivedClass.subGradeId) : undefined;
    const combination = derivedClass.combinationId ? 
      grade?.combinations.find(c => c.id === derivedClass.combinationId) : undefined;
    
    // Generate deterministic student count based on class name
    const nameHash = derivedClass.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const studentCount = (nameHash % 20) + 15; // 15-35 students per class
    
    return {
      ...derivedClass,
      levelName: level?.name || 'Unknown Level',
      gradeName: grade?.name || 'Unknown Grade',
      subGradeName: subGrade?.name,
      combinationName: combination?.name,
      studentCount,
      hasSubGrades: Boolean(subGrade),
      hasCombinations: Boolean(combination)
    };
  });
};

export default function ClassesSummaryView({
  levels,
  searchTerm,
  onSearchChange,
  itemsPerPage,
  onItemsPerPageChange,
  visibleColumns,
  onColumnVisibilityChange
}: ClassesSummaryViewProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewType, setViewType] = useState<ViewType>('classes');
  const [groupBy, setGroupBy] = useState<GroupByType>('level');
  const [selectedLevelFilter, setSelectedLevelFilter] = useState('all');
  const [selectedGradeFilter, setSelectedGradeFilter] = useState('all');
  
  // Debounced search
  const debouncedSearch = useDebounce(searchTerm, 300);

  // Ensure derived classes are up-to-date
  useEffect(() => {
    regenerateDerivedClasses(classesStore);
  }, [levels]);

  // Get all derived classes with enhanced info
  const classInfo = useMemo(() => {
    return generateClassInfo(classesStore.derivedClasses || []);
  }, [levels]);

  // Filter classes based on search and filters
  const filteredClasses = useMemo(() => {
    return classInfo.filter(classItem => {
      const matchesSearch = !debouncedSearch || 
        classItem.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        classItem.fullPath.toLowerCase().includes(debouncedSearch.toLowerCase());
      
      const matchesLevel = selectedLevelFilter === 'all' || classItem.levelId === selectedLevelFilter;
      const matchesGrade = selectedGradeFilter === 'all' || classItem.gradeId === selectedGradeFilter;
      
      return matchesSearch && matchesLevel && matchesGrade;
    });
  }, [classInfo, debouncedSearch, selectedLevelFilter, selectedGradeFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredClasses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedClasses = filteredClasses.slice(startIndex, startIndex + itemsPerPage);

  // Statistics
  const stats = useMemo(() => {
    const totalClasses = classInfo.length;
    const totalStudents = classInfo.reduce((sum, cls) => sum + cls.studentCount, 0);
    const classesWithCombinations = classInfo.filter(cls => cls.hasCombinations).length;
    const classesWithSubGrades = classInfo.filter(cls => cls.hasSubGrades).length;
    
    return {
      totalClasses,
      totalStudents,
      classesWithCombinations,
      classesWithSubGrades,
      avgStudentsPerClass: totalClasses > 0 ? Math.round(totalStudents / totalClasses) : 0
    };
  }, [classInfo]);

  const handlePreviousPage = () => setCurrentPage(prev => Math.max(1, prev - 1));
  const handleNextPage = () => setCurrentPage(prev => Math.min(totalPages, prev + 1));

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Layers className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <div className="text-xl font-bold text-white">{stats.totalClasses}</div>
              <div className="text-xs text-white/70">Total Classes</div>
            </div>
          </div>
        </div>

        <div className="bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
              <Users className="w-4 h-4 text-green-400" />
            </div>
            <div>
              <div className="text-xl font-bold text-white">{stats.totalStudents}</div>
              <div className="text-xs text-white/70">Total Students</div>
            </div>
          </div>
        </div>

        <div className="bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <div className="text-xl font-bold text-white">{stats.classesWithCombinations}</div>
              <div className="text-xs text-white/70">With Combinations</div>
            </div>
          </div>
        </div>

        <div className="bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-orange-400" />
            </div>
            <div>
              <div className="text-xl font-bold text-white">{stats.classesWithSubGrades}</div>
              <div className="text-xs text-white/70">With Sub-grades</div>
            </div>
          </div>
        </div>

        <div className="bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 flex items-center justify-center">
              <Trophy className="w-4 h-4 text-teal-400" />
            </div>
            <div>
              <div className="text-xl font-bold text-white">{stats.avgStudentsPerClass}</div>
              <div className="text-xs text-white/70">Avg per Class</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
        {/* Header with Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">Classes Summary</h2>
            <p className="text-sm text-white/70">
              Showing {displayedClasses.length} of {filteredClasses.length} derived classes
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
              <Input
                placeholder="Search classes..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 w-60 bg-white/20 border-white/20 text-white placeholder:text-white/50 focus:bg-white/30 focus:border-white/40"
              />
            </div>

            {/* Level Filter */}
            <GlassSelect
              value={selectedLevelFilter}
              onValueChange={setSelectedLevelFilter}
            >
              <option value="all">All Levels</option>
              {levels.map(level => (
                <option key={level.id} value={level.id}>{level.name}</option>
              ))}
            </GlassSelect>

            {/* Grade Filter */}
            <GlassSelect
              value={selectedGradeFilter}
              onValueChange={setSelectedGradeFilter}
            >
              <option value="all">All Grades</option>
              {levels.flatMap(level => level.grades).map(grade => (
                <option key={grade.id} value={grade.id}>{grade.name}</option>
              ))}
            </GlassSelect>
          </div>
        </div>

        {/* Classes Table */}
        {displayedClasses.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Layers className="w-8 h-8 text-white/30" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No classes found</h3>
            <p className="text-white/60">
              {filteredClasses.length === 0 && classInfo.length === 0
                ? 'Create education levels, grades, and sub-grades to generate classes'
                : 'Try adjusting your search or filter criteria'
              }
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/20 hover:bg-white/10">
                    <TableHead className="text-white font-medium">Class Name</TableHead>
                    <TableHead className="text-white font-medium">Full Path</TableHead>
                    <TableHead className="text-white font-medium">Level</TableHead>
                    <TableHead className="text-white font-medium">Grade</TableHead>
                    <TableHead className="text-white font-medium">Sub-grade</TableHead>
                    <TableHead className="text-white font-medium">Combination</TableHead>
                    <TableHead className="text-white font-medium text-right">Students</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayedClasses.map((classItem) => (
                    <TableRow
                      key={classItem.id}
                      className="border-white/10 hover:bg-white/5 transition-colors"
                    >
                      <TableCell>
                        <div className="font-mono font-medium text-white">
                          {classItem.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-white/80">
                          {classItem.fullPath}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-500/20 text-blue-200 border-blue-400/30">
                          {classItem.levelName}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-500/20 text-green-200 border-green-400/30">
                          {classItem.gradeName}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {classItem.subGradeName ? (
                          <Badge variant="outline" className="bg-purple-500/20 text-purple-200 border-purple-400/30">
                            {classItem.subGradeName}
                          </Badge>
                        ) : (
                          <span className="text-white/40 text-sm">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {classItem.combinationName ? (
                          <Badge variant="outline" className="bg-orange-500/20 text-orange-200 border-orange-400/30">
                            {classItem.combinationName}
                          </Badge>
                        ) : (
                          <span className="text-white/40 text-sm">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Users className="w-4 h-4 text-white/50" />
                          <span className="font-medium text-white">{classItem.studentCount}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="text-sm text-white/70">
                  Page {currentPage} of {totalPages} ({filteredClasses.length} total classes)
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="text-white hover:bg-white/20 disabled:opacity-50"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="text-white hover:bg-white/20 disabled:opacity-50"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}