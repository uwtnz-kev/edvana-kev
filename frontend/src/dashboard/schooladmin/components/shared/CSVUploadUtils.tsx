import Papa from 'papaparse';

// Teacher CSV Template Structure
export const TEACHER_CSV_HEADERS = [
  'First Name',
  'Last Name', 
  'Email',
  'Phone Number',
  'Specialization',
  'Qualification',
  'Experience (years)',
  'Role',
  'Status'
];

// Subject CSV Template Structure  
export const SUBJECT_CSV_HEADERS = [
  'Subject Name',
  'Subject Code',
  'Grade/Class',
  'Teacher Name',
  'Status'
];

// Teacher CSV Template Data
export const generateTeacherCSVTemplate = (): string => {
  const headers = TEACHER_CSV_HEADERS;
  const sampleRows = [
    [
      'John',
      'Doe',
      'john.doe@school.edu.rw',
      '+250 788 123 456',
      'Sciences, Mathematics',
      'Bachelor',
      '5',
      'Teacher',
      'Active'
    ],
    [
      'Jane',
      'Smith',
      'jane.smith@school.edu.rw',
      '+250 788 654 321',
      'Languages, Arts',
      'Masters',
      '8',
      'HOD',
      'Active'
    ]
  ];
  
  return Papa.unparse([headers, ...sampleRows]);
};

// Subject CSV Template Data
export const generateSubjectCSVTemplate = (): string => {
  const headers = SUBJECT_CSV_HEADERS;
  const sampleRows = [
    [
      'Mathematics',
      'MATH101',
      'P1-A, P1-B, P2-A',
      'John Doe',
      'Active'
    ],
    [
      'English Language',
      'ENG101',
      'S1-A, S1-B',
      'Jane Smith',
      'Active'
    ]
  ];
  
  return Papa.unparse([headers, ...sampleRows]);
};

// Download CSV Template Function
export const downloadCSVTemplate = (filename: string, csvContent: string): void => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Parse CSV File Function
export const parseCSVFile = (file: File): Promise<Papa.ParseResult<any>> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        resolve(results);
      },
      error: (error) => {
        reject(error);
      }
    });
  });
};

// Validate Teacher CSV Structure
export const validateTeacherCSV = (data: any[]): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (data.length === 0) {
    errors.push('CSV file is empty');
    return { isValid: false, errors };
  }
  
  const firstRow = data[0];
  const requiredFields = ['First Name', 'Last Name', 'Email', 'Specialization', 'Qualification', 'Experience (years)', 'Role', 'Status'];
  
  // Check required headers
  for (const field of requiredFields) {
    if (!(field in firstRow)) {
      errors.push(`Missing required column: ${field}`);
    }
  }
  
  // Validate data rows
  data.forEach((row, index) => {
    const rowNum = index + 1;
    
    if (!row['First Name']?.trim()) {
      errors.push(`Row ${rowNum}: First Name is required`);
    }
    
    if (!row['Last Name']?.trim()) {
      errors.push(`Row ${rowNum}: Last Name is required`);
    }
    
    if (!row['Email']?.trim()) {
      errors.push(`Row ${rowNum}: Email is required`);
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row['Email'])) {
      errors.push(`Row ${rowNum}: Invalid email format`);
    }
    
    if (!row['Specialization']?.trim()) {
      errors.push(`Row ${rowNum}: Specialization is required`);
    }
    
    if (!row['Qualification']?.trim()) {
      errors.push(`Row ${rowNum}: Qualification is required`);
    }
    
    const experience = parseInt(row['Experience (years)']);
    if (isNaN(experience) || experience < 0 || experience > 50) {
      errors.push(`Row ${rowNum}: Experience must be a number between 0 and 50`);
    }
    
    if (!row['Role']?.trim()) {
      errors.push(`Row ${rowNum}: Role is required`);
    }
    
    if (!row['Status']?.trim()) {
      errors.push(`Row ${rowNum}: Status is required`);
    }
  });
  
  return { isValid: errors.length === 0, errors };
};

// Validate Subject CSV Structure
export const validateSubjectCSV = (data: any[]): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (data.length === 0) {
    errors.push('CSV file is empty');
    return { isValid: false, errors };
  }
  
  const firstRow = data[0];
  const requiredFields = ['Subject Name', 'Grade/Class', 'Status'];
  
  // Check required headers
  for (const field of requiredFields) {
    if (!(field in firstRow)) {
      errors.push(`Missing required column: ${field}`);
    }
  }
  
  // Validate data rows
  data.forEach((row, index) => {
    const rowNum = index + 1;
    
    if (!row['Subject Name']?.trim()) {
      errors.push(`Row ${rowNum}: Subject Name is required`);
    }
    
    if (!row['Grade/Class']?.trim()) {
      errors.push(`Row ${rowNum}: Grade/Class is required`);
    }
    
    if (!row['Status']?.trim()) {
      errors.push(`Row ${rowNum}: Status is required`);
    }
  });
  
  return { isValid: errors.length === 0, errors };
};

// Transform Teacher CSV Data to Form Data
export const transformTeacherCSVData = (csvData: any[]): any[] => {
  return csvData.map(row => ({
    firstName: row['First Name']?.trim() || '',
    lastName: row['Last Name']?.trim() || '',
    email: row['Email']?.trim().toLowerCase() || '',
    phone: row['Phone Number']?.trim() || '',
    specialization: row['Specialization']?.split(',').map((s: string) => s.trim()).filter(Boolean) || [],
    qualification: row['Qualification']?.trim() || '',
    experience: parseInt(row['Experience (years)']) || 0,
    role: row['Role']?.trim() || '',
    status: row['Status']?.trim() || 'Active'
  }));
};

// Transform Subject CSV Data to Form Data  
export const transformSubjectCSVData = (csvData: any[]): any[] => {
  return csvData.map(row => ({
    name: row['Subject Name']?.trim() || '',
    code: row['Subject Code']?.trim() || '',
    classes: row['Grade/Class']?.split(',').map((c: string) => c.trim()).filter(Boolean) || [],
    teacherName: row['Teacher Name']?.trim() || '',
    status: row['Status']?.trim() || 'Active'
  }));
};