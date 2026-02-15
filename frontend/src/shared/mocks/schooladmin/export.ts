import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

// Extend jsPDF type to include autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

export interface ExportColumn {
  key: string;
  label: string;
  visible: boolean;
}

export interface TableState {
  filteredData: any[];
  searchQuery: string;
  filters: any;
  visibleColumns: ExportColumn[];
}

// Build filtered data based on current table state
export const buildFilteredData = (
  allData: any[],
  searchQuery: string,
  filters: any,
  visibleColumns: ExportColumn[]
): any[] => {
  let filteredData = [...allData];

  // Apply search query
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filteredData = filteredData.filter(item =>
      Object.values(item).some(value =>
        String(value).toLowerCase().includes(query)
      )
    );
  }

  // Apply status filters if available
  if (filters.status && filters.status.length > 0) {
    filteredData = filteredData.filter(item =>
      filters.status.includes(item.status)
    );
  }

  // Apply class filters for students
  if (filters.class && filters.class.length > 0) {
    filteredData = filteredData.filter(item =>
      filters.class.includes(item.class)
    );
  }

  // Apply subject filters for teachers
  if (filters.subject && filters.subject.length > 0) {
    filteredData = filteredData.filter(item =>
      item.subjectAssignments?.some((assignment: any) =>
        filters.subject.includes(assignment.subject)
      ) || false
    );
  }

  // Apply grade filters for subjects
  if (filters.grade && filters.grade.length > 0) {
    filteredData = filteredData.filter(item =>
      filters.grade.includes(item.grade)
    );
  }

  return filteredData;
};

// Export to PDF using jsPDF + autoTable
export const exportPdf = (
  entity: 'teachers' | 'students' | 'subjects',
  data: any[],
  visibleColumns: ExportColumn[]
): void => {
  const currentDate = new Date().toISOString().split('T')[0];
  const filename = `${entity}-bulk-${currentDate}.pdf`;

  const pdf = new jsPDF();

  // Header
  pdf.setFontSize(20);
  pdf.setTextColor(30, 64, 175); // brand blue
  pdf.text('Edvana School Management System', 20, 20);

  pdf.setFontSize(16);
  pdf.setTextColor(55, 65, 81); // gray-700
  pdf.text(`${entity.charAt(0).toUpperCase() + entity.slice(1)} Export Report`, 20, 35);

  pdf.setFontSize(10);
  pdf.setTextColor(107, 114, 128); // gray-500
  pdf.text(`Generated: ${new Date().toLocaleDateString()} | Total Records: ${data.length}`, 20, 50);

  // Prepare table data based on visible columns and entity type
  const headers = visibleColumns.filter(col => col.visible).map(col => col.label);
  const tableData = data.map(item => {
    return visibleColumns
      .filter(col => col.visible)
      .map(col => {
        switch (col.key) {
          case 'name':
            return `${item.firstName} ${item.lastName}`;
          case 'email':
            return item.email;
          case 'phone':
            return item.phone;
          case 'class':
            return item.class;
          case 'status':
            return item.status;
          case 'enrollmentDate':
            return new Date(item.enrollmentDate).toLocaleDateString();
          case 'role':
            return item.role;
          case 'qualification':
            return item.qualification;
          case 'experience':
            return `${item.experience} years`;
          case 'specialization':
            return item.specialization?.join(', ') || '';
          case 'subject':
            return item.name; // For subjects
          case 'code':
            return item.code;
          case 'grade':
            return item.grade;
          case 'teacher':
            return item.teacher;
          case 'capacity':
            return item.capacity?.toString() || 'N/A';
          default:
            return item[col.key] || '';
        }
      });
  });

  // Color scheme based on entity
  const colorScheme = {
    teachers: { fillColor: [16, 185, 129], alternateColor: [240, 253, 250] }, // teal
    students: { fillColor: [59, 130, 246], alternateColor: [249, 250, 251] }, // blue
    subjects: { fillColor: [147, 51, 234], alternateColor: [248, 250, 252] }  // purple
  };

  pdf.autoTable({
    startY: 65,
    head: [headers],
    body: tableData,
    theme: 'grid',
    headStyles: {
      fillColor: colorScheme[entity].fillColor,
      textColor: [255, 255, 255],
      fontSize: 9,
      fontStyle: 'bold'
    },
    bodyStyles: { fontSize: 8 },
    alternateRowStyles: { fillColor: colorScheme[entity].alternateColor },
    margin: { left: 20, right: 20 }
  });

  // Footer
  pdf.setFontSize(8);
  pdf.setTextColor(156, 163, 175);
  pdf.text(`Edvana School Management System - ${entity.charAt(0).toUpperCase() + entity.slice(1)} Export`, 20, pdf.internal.pageSize.height - 20);

  pdf.save(filename);
};

// Export to Excel using SheetJS
export const exportXlsx = (
  entity: 'teachers' | 'students' | 'subjects',
  data: any[],
  visibleColumns: ExportColumn[]
): void => {
  const currentDate = new Date().toISOString().split('T')[0];
  const filename = `${entity}-bulk-${currentDate}.xlsx`;

  const workbook = XLSX.utils.book_new();

  // Prepare data for Excel based on visible columns
  const excelData = data.map(item => {
    const row: any = {};
    visibleColumns
      .filter(col => col.visible)
      .forEach(col => {
        switch (col.key) {
          case 'name':
            row[col.label] = `${item.firstName} ${item.lastName}`;
            break;
          case 'email':
            row[col.label] = item.email;
            break;
          case 'phone':
            row[col.label] = item.phone;
            break;
          case 'class':
            row[col.label] = item.class;
            break;
          case 'status':
            row[col.label] = item.status;
            break;
          case 'enrollmentDate':
            row[col.label] = new Date(item.enrollmentDate).toLocaleDateString();
            break;
          case 'role':
            row[col.label] = item.role;
            break;
          case 'qualification':
            row[col.label] = item.qualification;
            break;
          case 'experience':
            row[col.label] = item.experience;
            break;
          case 'specialization':
            row[col.label] = item.specialization?.join(', ') || '';
            break;
          case 'subject':
            row[col.label] = item.name; // For subjects
            break;
          case 'code':
            row[col.label] = item.code;
            break;
          case 'grade':
            row[col.label] = item.grade;
            break;
          case 'teacher':
            row[col.label] = item.teacher;
            break;
          case 'capacity':
            row[col.label] = item.capacity || '';
            break;
          default:
            row[col.label] = item[col.key] || '';
        }
      });
    return row;
  });

  const worksheet = XLSX.utils.json_to_sheet(excelData);

  // Set column widths based on content
  const maxWidths: number[] = [];
  visibleColumns.filter(col => col.visible).forEach((col, index) => {
    const headerLength = col.label.length;
    const maxContentLength = Math.max(
      ...excelData.map(row => String(row[col.label] || '').length)
    );
    maxWidths[index] = Math.min(Math.max(headerLength, maxContentLength) + 2, 50);
  });

  worksheet['!cols'] = maxWidths.map(width => ({ wch: width }));

  XLSX.utils.book_append_sheet(workbook, worksheet, entity.charAt(0).toUpperCase() + entity.slice(1));
  XLSX.writeFile(workbook, filename);
};

// Show confirmation for large datasets
export const confirmLargeExport = (recordCount: number): Promise<boolean> => {
  return new Promise((resolve) => {
    if (recordCount > 5000) {
      const confirmed = window.confirm(
        `You are about to export ${recordCount.toLocaleString()} records. This may take some time. Continue?`
      );
      resolve(confirmed);
    } else {
      resolve(true);
    }
  });
};