import React, { useState, useMemo } from 'react';
import { Users, Search, Filter, Eye, EyeOff, ChevronLeft, ChevronRight, Edit, Trash2, UserCheck } from 'lucide-react';
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

// Mock student data
const generateMockStudents = (levelId?: string, gradeId?: string, subGradeId?: string) => {
  if (!levelId && !gradeId && !subGradeId) return [];
  
  const students = [
    {
      id: '1',
      name: 'Aline Uwimana',
      email: 'aline.uwimana@school.rw',
      phone: '+250788123456',
      class: 'P6-A',
      status: 'Active',
      enrollmentDate: '2023-09-01',
      levelId: 'primary',
      gradeId: 'p6',
      subGradeId: 'p6-a'
    },
    {
      id: '2', 
      name: 'Jean Baptiste Niyonzima',
      email: 'jean.niyonzima@school.rw',
      phone: '+250788234567',
      class: 'S2-B',
      status: 'Active',
      enrollmentDate: '2022-09-01',
      levelId: 'o-level',
      gradeId: 's2',
      subGradeId: 's2-b'
    },
    {
      id: '3',
      name: 'Grace Mukamana',
      email: 'grace.mukamana@school.rw',
      phone: '+250788345678',
      class: 'S5-MCB',
      status: 'Active',
      enrollmentDate: '2021-09-01',
      levelId: 'a-level',
      gradeId: 's5',
      subGradeId: 's5-mcb'
    },
    {
      id: '4',
      name: 'Emmanuel Habimana',
      email: 'emmanuel.habimana@school.rw',
      phone: '+250788456789',
      class: 'P4-C',
      status: 'Inactive',
      enrollmentDate: '2021-09-01',
      levelId: 'primary',
      gradeId: 'p4',
      subGradeId: 'p4-c'
    },
    {
      id: '5',
      name: 'Ange Irakoze',
      email: 'ange.irakoze@school.rw',
      phone: '+250788567890',
      class: 'S1-A',
      status: 'Active',
      enrollmentDate: '2023-09-01',
      levelId: 'o-level',
      gradeId: 's1',
      subGradeId: 's1-a'
    }
  ];

  // Filter based on scope
  return students.filter(student => {
    if (subGradeId) return student.subGradeId === subGradeId;
    if (gradeId) return student.gradeId === gradeId;
    if (levelId) return student.levelId === levelId;
    return false;
  });
};

interface StudentsScope {
  type: 'level' | 'grade' | 'subgrade';
  id?: string;
}

interface StudentsPanelProps {
  scope: StudentsScope;
}

export default function StudentsPanel({ scope }: StudentsPanelProps) {
  // Local state for table controls
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [enrollmentYearFilter, setEnrollmentYearFilter] = useState('all');
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleColumns, setVisibleColumns] = useState({
    email: true,
    phone: true,
    class: true,
    status: true,
    enrollmentDate: true
  });

  // Debounced search
  const debouncedSearch = useDebounce(searchTerm, 300);

  // Get students based on scope
  const allStudents = useMemo(() => {
    return generateMockStudents(
      scope.type === 'level' ? scope.id : undefined,
      scope.type === 'grade' ? scope.id : undefined,
      scope.type === 'subgrade' ? scope.id : undefined
    );
  }, [scope]);

  // Filter and paginate students
  const { filteredStudents, displayedStudents, totalPages } = useMemo(() => {
    let filtered = allStudents.filter(student => {
      // Search filter
      const searchMatch = debouncedSearch === '' || 
        student.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        student.email.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        student.phone.includes(debouncedSearch);

      // Status filter
      const statusMatch = statusFilter === 'all' || student.status.toLowerCase() === statusFilter;

      // Enrollment year filter
      const enrollmentMatch = enrollmentYearFilter === 'all' || 
        student.enrollmentDate.startsWith(enrollmentYearFilter);

      return searchMatch && statusMatch && enrollmentMatch;
    });

    const startIndex = (currentPage - 1) * itemsPerPage;
    const displayed = filtered.slice(startIndex, startIndex + itemsPerPage);
    const pages = Math.ceil(filtered.length / itemsPerPage);

    return { filteredStudents: filtered, displayedStudents: displayed, totalPages: pages };
  }, [allStudents, debouncedSearch, statusFilter, enrollmentYearFilter, currentPage, itemsPerPage]);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, statusFilter, enrollmentYearFilter, itemsPerPage]);

  // Handle actions
  const handleViewStudent = (studentId: string) => {
    console.log('View student:', studentId);
  };

  const handleEditStudent = (studentId: string) => {
    console.log('Edit student:', studentId);
  };

  const handleDeleteStudent = (studentId: string) => {
    console.log('Delete student:', studentId);
  };

  // Get scope display text
  const getScopeText = () => {
    switch (scope.type) {
      case 'level': return 'Level';
      case 'grade': return 'Grade'; 
      case 'subgrade': return 'Sub-grade';
      default: return 'Selection';
    }
  };

  // Show empty state if no scope ID
  if (!scope.id) {
    return (
      <div className="bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl p-8">
        <div className="text-center">
          <Users className="w-16 h-16 text-black/30 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-blue-900 mb-2">No Selection Made</h3>
          <p className="text-black/60">
            Select a {getScopeText().toLowerCase()} from the panels above to view students
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-500/20 rounded-xl">
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-900">Students</h3>
            <p className="text-sm text-black/60">
              {filteredStudents.length} students found
            </p>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="space-y-4 mb-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-900/60 w-4 h-4" />
          <Input
            placeholder="Search by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/20 backdrop-blur-sm border-white/30 text-blue-900 placeholder:text-blue-900/60 rounded-xl focus:ring-brand-teal/50 focus:border-brand-teal"
          />
        </div>

        {/* Filters and Controls */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Status Filter */}
            <GlassSelect value={statusFilter} onValueChange={setStatusFilter}>
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </GlassSelect>

            {/* Enrollment Year Filter */}
            <GlassSelect value={enrollmentYearFilter} onValueChange={setEnrollmentYearFilter}>
              <option value="all">All Years</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </GlassSelect>
          </div>

          <div className="flex items-center gap-3">
            {/* Items Per Page */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-black/60">Show:</span>
              <GlassSelect value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </GlassSelect>
            </div>

            {/* Column Visibility */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-blue-900 hover:bg-white/10">
                  {Object.values(visibleColumns).some(v => v) ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white/20 backdrop-blur-xl border-white/20">
                <DropdownMenuCheckboxItem
                  checked={visibleColumns.email}
                  onCheckedChange={(checked) => 
                    setVisibleColumns(prev => ({ ...prev, email: !!checked }))
                  }
                  className="text-white"
                >
                  Email
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={visibleColumns.phone}
                  onCheckedChange={(checked) => 
                    setVisibleColumns(prev => ({ ...prev, phone: !!checked }))
                  }
                  className="text-white"
                >
                  Phone
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={visibleColumns.class}
                  onCheckedChange={(checked) => 
                    setVisibleColumns(prev => ({ ...prev, class: !!checked }))
                  }
                  className="text-white"
                >
                  Class
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={visibleColumns.status}
                  onCheckedChange={(checked) => 
                    setVisibleColumns(prev => ({ ...prev, status: !!checked }))
                  }
                  className="text-white"
                >
                  Status
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={visibleColumns.enrollmentDate}
                  onCheckedChange={(checked) => 
                    setVisibleColumns(prev => ({ ...prev, enrollmentDate: !!checked }))
                  }
                  className="text-white"
                >
                  Enrollment Date
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Table */}
      {displayedStudents.length === 0 ? (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-black/30 mx-auto mb-3" />
          <p className="text-black/60">
            {debouncedSearch || statusFilter !== 'all' || enrollmentYearFilter !== 'all' 
              ? 'No students match your search criteria' 
              : 'No students found in this selection'}
          </p>
        </div>
      ) : (
        <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-white/20">
                <TableHead className="text-blue-900 font-semibold">Name</TableHead>
                {visibleColumns.email && <TableHead className="text-blue-900 font-semibold">Email</TableHead>}
                {visibleColumns.phone && <TableHead className="text-blue-900 font-semibold">Phone</TableHead>}
                {visibleColumns.class && <TableHead className="text-blue-900 font-semibold">Class</TableHead>}
                {visibleColumns.status && <TableHead className="text-blue-900 font-semibold">Status</TableHead>}
                {visibleColumns.enrollmentDate && <TableHead className="text-blue-900 font-semibold">Enrollment Date</TableHead>}
                <TableHead className="text-blue-900 font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedStudents.map((student) => (
                <TableRow key={student.id} className="border-white/20 hover:bg-white/5">
                  <TableCell className="text-black font-medium">{student.name}</TableCell>
                  {visibleColumns.email && <TableCell className="text-black">{student.email}</TableCell>}
                  {visibleColumns.phone && <TableCell className="text-black">{student.phone}</TableCell>}
                  {visibleColumns.class && (
                    <TableCell>
                      <Badge variant="outline" className="text-brand-accent border-brand-accent/30">
                        {student.class}
                      </Badge>
                    </TableCell>
                  )}
                  {visibleColumns.status && (
                    <TableCell>
                      <Badge 
                        variant={student.status === 'Active' ? 'default' : 'secondary'}
                        className={student.status === 'Active' 
                          ? 'bg-green-500/20 text-green-600 border-green-500/30' 
                          : 'bg-red-500/20 text-red-600 border-red-500/30'
                        }
                      >
                        {student.status}
                      </Badge>
                    </TableCell>
                  )}
                  {visibleColumns.enrollmentDate && (
                    <TableCell className="text-black">
                      {new Date(student.enrollmentDate).toLocaleDateString()}
                    </TableCell>
                  )}
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewStudent(student.id)}
                        className="w-8 h-8 p-0 text-brand-teal hover:text-brand-teal/80 hover:bg-brand-teal/10"
                      >
                        <UserCheck className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditStudent(student.id)}
                        className="w-8 h-8 p-0 text-brand-accent hover:text-brand-accent/80 hover:bg-brand-accent/10"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteStudent(student.id)}
                        className="w-8 h-8 p-0 text-red-600 hover:text-red-500 hover:bg-red-600/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 pb-2">
          <div className="text-sm text-black/60">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredStudents.length)} of {filteredStudents.length} students
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="text-blue-900 hover:bg-white/10 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                    className={currentPage === pageNum 
                      ? "bg-brand-accent text-white hover:bg-brand-accent/80" 
                      : "text-blue-900 hover:bg-white/10"
                    }
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="text-blue-900 hover:bg-white/10 disabled:opacity-50"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}