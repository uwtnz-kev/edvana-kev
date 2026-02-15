import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Columns, 
  Eye, 
  Edit, 
  Trash2,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Download
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { GlassSelect } from '@/components/ui/glass-select';
import { useDebounce } from '@/hooks/use-debounce';

interface StudentsDataPanelProps {
  scope: {
    type: 'level' | 'grade' | 'subgrade';
    id?: string;
  };
}

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  class: string;
  status: 'Active' | 'Inactive' | 'Suspended';
  enrollmentDate: string;
  enrollmentYear: string;
}

// Mock student data generator
const generateMockStudents = (count: number, classPrefix: string): Student[] => {
  const firstNames = [
    'Aisha', 'Amina', 'Divine', 'Grace', 'Emmanuel', 'Jean', 'Marie', 'Patrick',
    'Fabrice', 'Claudine', 'Pacifique', 'Sandrine', 'Eric', 'Immaculee', 'Richard',
    'Bernadette', 'Christian', 'Sylvie', 'Jean-Baptiste', 'Agnes', 'Innocent',
    'Esperance', 'Felix', 'Vestine', 'Olivier', 'Jeannette', 'Augustin', 'Solange'
  ];
  
  const lastNames = [
    'Uwimana', 'Mukamana', 'Ndayisaba', 'Uwingabire', 'Nzeyimana', 'Mukasine',
    'Habimana', 'Uwimana', 'Mukantagara', 'Bizimana', 'Mukamudenge', 'Niyonsenga',
    'Uwingabire', 'Mukamusoni', 'Ngabonziza', 'Mukarugwiza', 'Nkurunziza'
  ];

  return Array.from({ length: count }, (_, i) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const enrollmentYear = ['2020', '2021', '2022', '2023', '2024'][Math.floor(Math.random() * 5)];
    
    return {
      id: `student-${i + 1}`,
      firstName,
      lastName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@student.edvana.rw`,
      phone: `+250 7${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`,
      class: `${classPrefix}${String.fromCharCode(65 + Math.floor(Math.random() * 3))}`, // A, B, or C
      status: ['Active', 'Active', 'Active', 'Inactive', 'Suspended'][Math.floor(Math.random() * 5)] as any,
      enrollmentDate: `2024-0${Math.floor(Math.random() * 9) + 1}-${Math.floor(Math.random() * 28) + 1}`,
      enrollmentYear
    };
  });
};

export default function StudentsDataPanel({ scope }: StudentsDataPanelProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [yearFilter, setYearFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [visibleColumns, setVisibleColumns] = useState({
    name: true,
    email: true,
    phone: true,
    class: true,
    status: true,
    enrollmentDate: true,
    actions: true
  });

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Generate mock students based on scope
  const mockStudents = useMemo(() => {
    if (!scope.id) return [];
    
    const counts = {
      level: Math.floor(Math.random() * 201) + 100, // 100-300 students
      grade: Math.floor(Math.random() * 101) + 50,  // 50-150 students
      subgrade: Math.floor(Math.random() * 26) + 15 // 15-40 students
    };
    
    const classPrefixes = {
      level: 'P',
      grade: 'S1',
      subgrade: 'S1'
    };
    
    return generateMockStudents(counts[scope.type], classPrefixes[scope.type]);
  }, [scope]);

  // Filter students
  const filteredStudents = useMemo(() => {
    return mockStudents.filter(student => {
      const matchesSearch = debouncedSearchTerm === '' || 
        student.firstName.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        student.lastName.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        student.phone.includes(debouncedSearchTerm);
      
      const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
      const matchesYear = yearFilter === 'all' || student.enrollmentYear === yearFilter;
      
      return matchesSearch && matchesStatus && matchesYear;
    });
  }, [mockStudents, debouncedSearchTerm, statusFilter, yearFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStudents = filteredStudents.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-500/20 text-green-600 border-green-500/30';
      case 'Inactive': return 'bg-gray-500/20 text-gray-600 border-gray-500/30';
      case 'Suspended': return 'bg-red-500/20 text-red-600 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-600 border-gray-500/30';
    }
  };

  if (!scope.id) {
    return (
      <div className="bg-white/20 backdrop-blur-xl border border-white/25 rounded-2xl p-8">
        <div className="text-center">
          <Users className="w-16 h-16 mx-auto mb-4 text-black/30" />
          <h3 className="text-xl font-semibold text-blue-900 mb-2">Select a Class</h3>
          <p className="text-black/70">
            Choose a level, grade, or section to view students
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/20 backdrop-blur-xl border border-white/25 rounded-2xl">
      {/* Header */}
      <div className="p-6 border-b border-white/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-brand-teal/20 rounded-xl">
              <Users className="w-5 h-5 text-brand-teal" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-900">Students</h3>
              <p className="text-sm text-black">
                {filteredStudents.length} students found
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-black/30 text-black hover:bg-white/10"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="p-6 border-b border-white/20">
        <div className="flex items-center justify-between gap-4">
          {/* Left side - Search */}
          <div className="flex-1 max-w-sm">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-900/60" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/30 text-blue-900 placeholder:text-blue-900/60 rounded-xl"
              />
            </div>
          </div>

          {/* Right side - Filters and Controls */}
          <div className="flex items-center gap-2">
            {/* Status Filter */}
            <GlassSelect
              value={statusFilter}
              onValueChange={(value: string) => setStatusFilter(value)}
              placeholder="Status"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Suspended">Suspended</option>
            </GlassSelect>

            {/* Year Filter */}
            <GlassSelect
              value={yearFilter}
              onValueChange={(value: string) => setYearFilter(value)}
              placeholder="Year"
            >
              <option value="all">All Years</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
            </GlassSelect>

            {/* Columns Visibility */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-black/30 text-black hover:bg-white/10 rounded-xl"
                >
                  <Columns className="w-4 h-4 mr-2" />
                  Columns
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white/20 backdrop-blur-xl border-white/30">
                {Object.entries(visibleColumns).map(([key, visible]) => (
                  <DropdownMenuCheckboxItem
                    key={key}
                    checked={visible}
                    onCheckedChange={(checked) => 
                      setVisibleColumns(prev => ({ ...prev, [key]: checked }))
                    }
                    className="text-white hover:bg-white/30 focus:bg-white/30"
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Items per page */}
            <GlassSelect
              value={itemsPerPage.toString()}
              onValueChange={(value: string) => setItemsPerPage(Number(value))}
              placeholder="Per page"
            >
              <option value="5">5 per page</option>
              <option value="10">10 per page</option>
              <option value="25">25 per page</option>
              <option value="50">50 per page</option>
            </GlassSelect>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-white/20 hover:bg-white/5">
              {visibleColumns.name && (
                <TableHead className="text-blue-900 font-semibold">Name</TableHead>
              )}
              {visibleColumns.email && (
                <TableHead className="text-blue-900 font-semibold">Email</TableHead>
              )}
              {visibleColumns.phone && (
                <TableHead className="text-blue-900 font-semibold">Phone</TableHead>
              )}
              {visibleColumns.class && (
                <TableHead className="text-blue-900 font-semibold">Class</TableHead>
              )}
              {visibleColumns.status && (
                <TableHead className="text-blue-900 font-semibold">Status</TableHead>
              )}
              {visibleColumns.enrollmentDate && (
                <TableHead className="text-blue-900 font-semibold">Enrollment</TableHead>
              )}
              {visibleColumns.actions && (
                <TableHead className="text-blue-900 font-semibold text-right">Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedStudents.map((student) => (
              <TableRow key={student.id} className="border-white/20 hover:bg-white/5">
                {visibleColumns.name && (
                  <TableCell className="text-black font-medium">
                    {student.firstName} {student.lastName}
                  </TableCell>
                )}
                {visibleColumns.email && (
                  <TableCell className="text-black">{student.email}</TableCell>
                )}
                {visibleColumns.phone && (
                  <TableCell className="text-black">{student.phone}</TableCell>
                )}
                {visibleColumns.class && (
                  <TableCell>
                    <Badge className="bg-blue-500/20 text-blue-600 border-blue-500/30">
                      {student.class}
                    </Badge>
                  </TableCell>
                )}
                {visibleColumns.status && (
                  <TableCell>
                    <Badge className={getStatusBadgeColor(student.status)}>
                      {student.status}
                    </Badge>
                  </TableCell>
                )}
                {visibleColumns.enrollmentDate && (
                  <TableCell className="text-black">{student.enrollmentDate}</TableCell>
                )}
                {visibleColumns.actions && (
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-brand-teal hover:text-brand-teal/80 hover:bg-brand-teal/10 p-2"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-brand-accent hover:text-brand-accent/80 hover:bg-brand-accent/10 p-2"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-500 hover:bg-red-600/10 p-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="p-6 border-t border-white/20">
        <div className="flex items-center justify-between">
          <p className="text-sm text-black">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredStudents.length)} of {filteredStudents.length} students
          </p>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="border-black/30 text-black hover:bg-white/10 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            
            <span className="text-sm text-black px-3">
              Page {currentPage} of {totalPages}
            </span>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="border-black/30 text-black hover:bg-white/10 disabled:opacity-50"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}