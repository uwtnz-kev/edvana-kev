import Papa from 'papaparse';
import * as XLSX from 'xlsx';

// CSV Template Generation using SheetJS
export const generateTeacherTemplate = (): void => {
  const headers = [
    'firstName',
    'lastName', 
    'email',
    'phone',
    'specialization',
    'qualification',
    'experience',
    'role',
    'status',
    'emergencyContactName',
    'emergencyContactPhone',
    'nationalId',
    'dateOfBirth',
    'salary'
  ];

  const sampleData = [
    {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@school.edu',
      phone: '+250788123456',
      specialization: 'Mathematics',
      qualification: 'Bachelor',
      experience: '5',
      role: 'Teacher',
      status: 'Active',
      emergencyContactName: 'Jane Doe',
      emergencyContactPhone: '+250788654321',
      nationalId: '1198012345678901',
      dateOfBirth: '1985-06-15',
      salary: '250000'
    }
  ];

  const worksheet = XLSX.utils.json_to_sheet([headers, ...sampleData]);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Teachers');
  
  XLSX.writeFile(workbook, 'teachers_template.xlsx');
};

export const generateStudentTemplate = (): void => {
  const headers = [
    'firstName',
    'lastName',
    'email', 
    'phone',
    'class',
    'status',
    'dateOfBirth',
    'enrollmentDate',
    'parentEmail',
    'parentNationalId'
  ];

  const sampleData = [
    {
      firstName: 'Alice',
      lastName: 'Smith',
      email: 'alice.smith@student.edu',
      phone: '+250788111222',
      class: 'P6A',
      status: 'Active',
      dateOfBirth: '2010-03-20',
      enrollmentDate: '2023-01-15',
      parentEmail: 'parent@email.com',
      parentNationalId: '1198012345678902'
    }
  ];

  const worksheet = XLSX.utils.json_to_sheet([headers, ...sampleData]);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');
  
  XLSX.writeFile(workbook, 'students_template.xlsx');
};

export const generateSubjectTemplate = (): void => {
  const headers = [
    'name',
    'code',
    'description',
    'grade',
    'teacher',
    'status',
    'capacity'
  ];

  const sampleData = [
    {
      name: 'Mathematics',
      code: 'MATH101',
      description: 'Basic mathematics for primary level',
      grade: 'P6',
      teacher: 'John Doe',
      status: 'Active',
      capacity: '30'
    }
  ];

  const worksheet = XLSX.utils.json_to_sheet([headers, ...sampleData]);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Subjects');
  
  XLSX.writeFile(workbook, 'subjects_template.xlsx');
};

// CSV Parsing and Validation using PapaParse
export interface ParseResult<T> {
  data: T[];
  errors: string[];
  warnings: string[];
}

export const parseTeacherCSV = (file: File): Promise<ParseResult<any>> => {
  return new Promise((resolve) => {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'specialization', 'qualification', 'experience', 'role'];
    
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim(),
      complete: (results) => {
        const errors: string[] = [];
        const warnings: string[] = [];
        const validData: any[] = [];

        // Check for required headers
        const headers = results.meta.fields || [];
        const missingHeaders = requiredFields.filter(field => !headers.includes(field));
        
        if (missingHeaders.length > 0) {
          errors.push(`Missing required columns: ${missingHeaders.join(', ')}`);
        }

        // Validate each row
        results.data.forEach((row: any, index: number) => {
          const rowErrors: string[] = [];
          
          // Check required fields
          requiredFields.forEach(field => {
            if (!row[field] || row[field].toString().trim() === '') {
              rowErrors.push(`Row ${index + 1}: Missing ${field}`);
            }
          });

          // Validate email format
          if (row.email && !isValidEmail(row.email)) {
            rowErrors.push(`Row ${index + 1}: Invalid email format`);
          }

          // Validate experience is a number
          if (row.experience && isNaN(Number(row.experience))) {
            rowErrors.push(`Row ${index + 1}: Experience must be a number`);
          }

          // Validate phone format (basic)
          if (row.phone && !isValidPhone(row.phone)) {
            warnings.push(`Row ${index + 1}: Phone format may be invalid`);
          }

          if (rowErrors.length === 0) {
            validData.push({
              ...row,
              experience: Number(row.experience),
              salary: row.salary ? Number(row.salary) : undefined,
              status: row.status || 'Active'
            });
          } else {
            errors.push(...rowErrors);
          }
        });

        resolve({
          data: validData,
          errors,
          warnings
        });
      },
      error: (error) => {
        resolve({
          data: [],
          errors: [`Failed to parse CSV: ${error.message}`],
          warnings: []
        });
      }
    });
  });
};

export const parseStudentCSV = (file: File): Promise<ParseResult<any>> => {
  return new Promise((resolve) => {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'class'];
    
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim(),
      complete: (results) => {
        const errors: string[] = [];
        const warnings: string[] = [];
        const validData: any[] = [];

        // Check for required headers
        const headers = results.meta.fields || [];
        const missingHeaders = requiredFields.filter(field => !headers.includes(field));
        
        if (missingHeaders.length > 0) {
          errors.push(`Missing required columns: ${missingHeaders.join(', ')}`);
        }

        // Validate each row
        results.data.forEach((row: any, index: number) => {
          const rowErrors: string[] = [];
          
          // Check required fields
          requiredFields.forEach(field => {
            if (!row[field] || row[field].toString().trim() === '') {
              rowErrors.push(`Row ${index + 1}: Missing ${field}`);
            }
          });

          // Validate email format
          if (row.email && !isValidEmail(row.email)) {
            rowErrors.push(`Row ${index + 1}: Invalid email format`);
          }

          // Validate phone format
          if (row.phone && !isValidPhone(row.phone)) {
            warnings.push(`Row ${index + 1}: Phone format may be invalid`);
          }

          // Validate date of birth
          if (row.dateOfBirth && !isValidDate(row.dateOfBirth)) {
            rowErrors.push(`Row ${index + 1}: Invalid date of birth format`);
          }

          if (rowErrors.length === 0) {
            validData.push({
              ...row,
              status: row.status || 'Active',
              enrollmentDate: row.enrollmentDate || new Date().toISOString().split('T')[0]
            });
          } else {
            errors.push(...rowErrors);
          }
        });

        resolve({
          data: validData,
          errors,
          warnings
        });
      },
      error: (error) => {
        resolve({
          data: [],
          errors: [`Failed to parse CSV: ${error.message}`],
          warnings: []
        });
      }
    });
  });
};

export const parseSubjectCSV = (file: File): Promise<ParseResult<any>> => {
  return new Promise((resolve) => {
    const requiredFields = ['name', 'code', 'grade', 'teacher'];
    
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim(),
      complete: (results) => {
        const errors: string[] = [];
        const warnings: string[] = [];
        const validData: any[] = [];

        // Check for required headers
        const headers = results.meta.fields || [];
        const missingHeaders = requiredFields.filter(field => !headers.includes(field));
        
        if (missingHeaders.length > 0) {
          errors.push(`Missing required columns: ${missingHeaders.join(', ')}`);
        }

        // Validate each row
        results.data.forEach((row: any, index: number) => {
          const rowErrors: string[] = [];
          
          // Check required fields
          requiredFields.forEach(field => {
            if (!row[field] || row[field].toString().trim() === '') {
              rowErrors.push(`Row ${index + 1}: Missing ${field}`);
            }
          });

          // Validate capacity is a number if provided
          if (row.capacity && isNaN(Number(row.capacity))) {
            rowErrors.push(`Row ${index + 1}: Capacity must be a number`);
          }

          if (rowErrors.length === 0) {
            validData.push({
              ...row,
              capacity: row.capacity ? Number(row.capacity) : undefined,
              status: row.status || 'Active'
            });
          } else {
            errors.push(...rowErrors);
          }
        });

        resolve({
          data: validData,
          errors,
          warnings
        });
      },
      error: (error) => {
        resolve({
          data: [],
          errors: [`Failed to parse CSV: ${error.message}`],
          warnings: []
        });
      }
    });
  });
};

// Utility validation functions
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-()]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 9;
};

const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return !isNaN(date.getTime()) && Boolean(dateString.match(/^\d{4}-\d{2}-\d{2}$/));
};

// Excel Export for Bulk Reports
export const exportToExcel = (data: any[], filename: string, sheetName: string): void => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  
  // Style the header row
  const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1');
  for (let col = range.s.c; col <= range.e.c; col++) {
    const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
    if (!worksheet[cellAddress]) continue;
    
    worksheet[cellAddress].s = {
      font: { bold: true },
      fill: { fgColor: { rgb: "E1F5FE" } },
      alignment: { horizontal: "center" }
    };
  }
  
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  XLSX.writeFile(workbook, filename);
};