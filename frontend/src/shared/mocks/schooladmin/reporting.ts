import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';

// Extend jsPDF type to include autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

// Enhanced interface types for comprehensive reporting
interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  specialization: string[];
  qualification: string;
  experience: number;
  salary?: number;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  nationalId?: string;
  dateOfBirth?: string;
  hireDate?: string;
}

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  class: string;
  status: string;
  enrollmentDate: string;
  dateOfBirth?: string;
  parentEmail?: string;
  parentNationalId?: string;
}

interface Subject {
  id: string;
  name: string;
  code: string;
  description?: string;
  grade: string;
  teacher: string;
  status: string;
  capacity?: number;
}

// Utility function to generate PDF from HTML
const generatePDFFromHTML = async (htmlContent: string, filename: string): Promise<void> => {
  // Create a temporary container for the HTML content
  const container = document.createElement('div');
  container.innerHTML = htmlContent;
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.top = '0';
  container.style.width = '210mm'; // A4 width
  container.style.minHeight = '297mm'; // A4 height
  container.style.padding = '20mm';
  container.style.backgroundColor = '#ffffff';
  container.style.fontFamily = 'Arial, sans-serif';
  
  document.body.appendChild(container);

  try {
    // Convert HTML to canvas
    const canvas = await html2canvas(container, {
      backgroundColor: '#ffffff',
      scale: 2,
      useCORS: true,
      allowTaint: true,
    });

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    const imgData = canvas.toDataURL('image/png');
    let position = 0;

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add additional pages if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Download the PDF
    pdf.save(filename);
  } finally {
    // Clean up
    document.body.removeChild(container);
  }
};

// Generate mock teaching data for teacher reports
const generateTeacherMockData = (teacher: Teacher) => {
  const seed = teacher.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  return {
    totalClasses: (seed % 8) + 3,
    totalStudentstaught: (seed % 150) + 50,
    totalSubjects: teacher.specialization.length,
    nationalExamPassRate: 75 + (seed % 20),
    avgClassPerformance: 70 + (seed % 25),
    currentSubjects: teacher.specialization.slice(0, 3),
    currentClasses: [`P${(seed % 6) + 1}A`, `P${(seed % 6) + 1}B`, `S${(seed % 6) + 1}A`].slice(0, (seed % 3) + 1),
    termAverages: [
      { term: 'Term 3 2024', average: 78 + (seed % 15) },
      { term: 'Term 2 2024', average: 76 + (seed % 18) },
      { term: 'Term 1 2024', average: 74 + (seed % 20) },
    ]
  };
};

// Generate mock academic data for student reports
const generateStudentMockData = (student: Student) => {
  const seed = student.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const currentYear = new Date().getFullYear();
  
  return {
    academicHistory: [
      {
        year: currentYear - 1,
        avgScore: 75 + (seed % 20),
        classRank: (seed % 25) + 1,
        classSize: 35 + (seed % 10)
      },
      {
        year: currentYear - 2,
        avgScore: 72 + (seed % 22),
        classRank: (seed % 28) + 1,
        classSize: 33 + (seed % 12)
      },
      {
        year: currentYear - 3,
        avgScore: 70 + (seed % 25),
        classRank: (seed % 30) + 1,
        classSize: 32 + (seed % 8)
      }
    ],
    currentSubjects: [
      { name: 'Mathematics', score: 80 + (seed % 15), progress: 85 + (seed % 10) },
      { name: 'English', score: 75 + (seed % 20), progress: 80 + (seed % 15) },
      { name: 'Science', score: 78 + (seed % 17), progress: 82 + (seed % 12) },
      { name: 'Social Studies', score: 82 + (seed % 12), progress: 88 + (seed % 8) },
    ],
    attendance: {
      currentTerm: 85 + (seed % 12),
      lastTerm: 80 + (seed % 15)
    },
    recentNotes: [
      { date: new Date(Date.now() - seed * 86400000).toLocaleDateString(), note: 'Excellent performance in mathematics. Shows strong analytical skills.' },
      { date: new Date(Date.now() - (seed + 7) * 86400000).toLocaleDateString(), note: 'Participated actively in science fair. Demonstrated creativity.' },
      { date: new Date(Date.now() - (seed + 14) * 86400000).toLocaleDateString(), note: 'Outstanding leadership skills observed during group activities.' },
    ]
  };
};

// Generate mock subject data for subject reports
const generateSubjectMockData = (subject: Subject) => {
  const seed = subject.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  return {
    totalEnrolled: (seed % 100) + 50,
    avgCompletion: 75 + (seed % 20),
    passRate: 80 + (seed % 15),
    gradeDistribution: {
      A: (seed % 20) + 10,
      B: (seed % 25) + 15,
      C: (seed % 30) + 20,
      D: (seed % 15) + 5,
      F: (seed % 10) + 2
    },
    termTrends: [
      { term: 'Term 3 2024', avgScore: 78 + (seed % 12) },
      { term: 'Term 2 2024', avgScore: 76 + (seed % 15) },
      { term: 'Term 1 2024', avgScore: 74 + (seed % 18) },
    ]
  };
};

// Create progress bar HTML
const createProgressBar = (percentage: number, color: string = '#10B981'): string => {
  return `
    <div style="width: 100%; height: 8px; background-color: #E5E7EB; border-radius: 4px; overflow: hidden; margin: 4px 0;">
      <div style="width: ${percentage}%; height: 100%; background-color: ${color}; transition: width 0.3s ease;"></div>
    </div>
  `;
};

// Enhanced Teacher Report Generator with jsPDF + autoTable
export const downloadTeacherReport = async (teacher: Teacher): Promise<void> => {
  const mockData = generateTeacherMockData(teacher);
  const currentDate = new Date().toLocaleDateString();
  const filename = `teacher-${teacher.id}-report-${new Date().toISOString().split('T')[0]}.pdf`;

  const pdf = new jsPDF();
  
  // Add school logo and header
  pdf.setFontSize(20);
  pdf.setTextColor(30, 64, 175); // brand blue
  pdf.text('Edvana School Management System', 20, 20);
  
  pdf.setFontSize(16);
  pdf.setTextColor(55, 65, 81); // gray-700
  pdf.text('Teacher Performance Report', 20, 35);
  
  // Teacher basic info
  pdf.setFontSize(14);
  pdf.setTextColor(16, 185, 129); // brand teal
  pdf.text(`${teacher.firstName} ${teacher.lastName}`, 20, 50);
  
  pdf.setFontSize(10);
  pdf.setTextColor(107, 114, 128); // gray-500
  pdf.text(`Employee ID: ${teacher.id} | Generated: ${currentDate}`, 20, 60);
  
  // Performance overview table
  const performanceData = [
    ['Metric', 'Value'],
    ['Total Classes', mockData.totalClasses.toString()],
    ['Students Taught', mockData.totalStudentstaught.toString()],
    ['Subjects', mockData.totalSubjects.toString()],
    ['National Exam Pass Rate', `${mockData.nationalExamPassRate}%`],
    ['Average Class Performance', `${mockData.avgClassPerformance}%`],
    ['Experience', `${teacher.experience} years`],
    ['Qualification', teacher.qualification],
    ['Status', teacher.status]
  ];

  pdf.autoTable({
    startY: 75,
    head: [performanceData[0]],
    body: performanceData.slice(1),
    theme: 'grid',
    headStyles: { 
      fillColor: [59, 130, 246], // blue-500
      textColor: [255, 255, 255],
      fontSize: 10,
      fontStyle: 'bold'
    },
    bodyStyles: { fontSize: 9 },
    alternateRowStyles: { fillColor: [249, 250, 251] }, // gray-50
    margin: { left: 20, right: 20 }
  });

  // Term performance table
  const termData = [
    ['Term', 'Average Score'],
    ...mockData.termAverages.map(term => [term.term, `${term.average}%`])
  ];

  pdf.autoTable({
    startY: (pdf as any).lastAutoTable.finalY + 20,
    head: [termData[0]],
    body: termData.slice(1),
    theme: 'grid',
    headStyles: { 
      fillColor: [16, 185, 129], // brand teal
      textColor: [255, 255, 255],
      fontSize: 10,
      fontStyle: 'bold'
    },
    bodyStyles: { fontSize: 9 },
    alternateRowStyles: { fillColor: [240, 253, 250] }, // green-50
    margin: { left: 20, right: 20 }
  });

  // Current workload section
  const currentY = (pdf as any).lastAutoTable.finalY + 20;
  pdf.setFontSize(12);
  pdf.setTextColor(55, 65, 81);
  pdf.text('Current Workload', 20, currentY);
  
  pdf.setFontSize(9);
  pdf.setTextColor(107, 114, 128);
  pdf.text(`Subjects: ${mockData.currentSubjects.join(', ')}`, 20, currentY + 15);
  pdf.text(`Classes: ${mockData.currentClasses.join(', ')}`, 20, currentY + 25);
  
  // Footer
  pdf.setFontSize(8);
  pdf.setTextColor(156, 163, 175);
  pdf.text('This report was generated automatically by Edvana School Management System', 20, pdf.internal.pageSize.height - 20);

  pdf.save(filename);

  const htmlContent = `
    <div style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; color: #1F2937;">
      <!-- Header -->
      <div style="text-align: center; margin-bottom: 30px; padding: 20px; background: linear-gradient(135deg, rgba(255,255,255,0.8), rgba(240,248,255,0.9)); border: 1px solid rgba(59, 130, 246, 0.2); border-radius: 12px;">
        <h1 style="margin: 0; color: #1E40AF; font-size: 28px; font-weight: bold;">Teacher Performance Report</h1>
        <h2 style="margin: 10px 0 5px 0; color: #374151; font-size: 22px;">${teacher.firstName} ${teacher.lastName}</h2>
        <div style="display: inline-block; padding: 6px 12px; background-color: ${teacher.status === 'Active' ? '#10B981' : '#F59E0B'}; color: white; border-radius: 20px; font-size: 14px; margin: 5px;">${teacher.status}</div>
        <div style="display: inline-block; padding: 6px 12px; background-color: #3B82F6; color: white; border-radius: 20px; font-size: 14px; margin: 5px;">${teacher.role}</div>
      </div>

      <!-- Overview Stats -->
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 25px;">
        <div style="text-align: center; padding: 15px; background: rgba(255,255,255,0.8); border: 1px solid rgba(156, 163, 175, 0.3); border-radius: 8px;">
          <div style="font-size: 24px; font-weight: bold; color: #059669;">${mockData.totalClasses}</div>
          <div style="font-size: 14px; color: #6B7280;">Classes Assigned</div>
        </div>
        <div style="text-align: center; padding: 15px; background: rgba(255,255,255,0.8); border: 1px solid rgba(156, 163, 175, 0.3); border-radius: 8px;">
          <div style="font-size: 24px; font-weight: bold; color: #DC2626;">${mockData.totalStudentstaught}</div>
          <div style="font-size: 14px; color: #6B7280;">Students Taught</div>
        </div>
        <div style="text-align: center; padding: 15px; background: rgba(255,255,255,0.8); border: 1px solid rgba(156, 163, 175, 0.3); border-radius: 8px;">
          <div style="font-size: 24px; font-weight: bold; color: #7C3AED;">${mockData.totalSubjects}</div>
          <div style="font-size: 14px; color: #6B7280;">Subjects</div>
        </div>
      </div>

      <!-- Performance Metrics -->
      <div style="margin-bottom: 25px; padding: 20px; background: rgba(255,255,255,0.8); border: 1px solid rgba(156, 163, 175, 0.3); border-radius: 8px;">
        <h3 style="margin: 0 0 15px 0; color: #374151; font-size: 18px;">Performance Metrics</h3>
        <div style="margin-bottom: 15px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
            <span style="font-weight: 500;">National Exam Pass Rate</span>
            <span style="font-weight: bold; color: #059669;">${mockData.nationalExamPassRate}%</span>
          </div>
          ${createProgressBar(mockData.nationalExamPassRate, '#059669')}
        </div>
        <div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
            <span style="font-weight: 500;">Average Class Performance</span>
            <span style="font-weight: bold; color: #DC2626;">${mockData.avgClassPerformance}%</span>
          </div>
          ${createProgressBar(mockData.avgClassPerformance, '#DC2626')}
        </div>
      </div>

      <!-- Current Workload -->
      <div style="margin-bottom: 25px; padding: 20px; background: rgba(255,255,255,0.8); border: 1px solid rgba(156, 163, 175, 0.3); border-radius: 8px;">
        <h3 style="margin: 0 0 15px 0; color: #374151; font-size: 18px;">Current Workload</h3>
        <div style="margin-bottom: 15px;">
          <strong style="color: #6B7280;">Subjects:</strong>
          <div style="margin-top: 8px;">
            ${mockData.currentSubjects.map(subject => `<span style="display: inline-block; padding: 4px 8px; background-color: #EBF8FF; color: #1E40AF; border-radius: 12px; font-size: 12px; margin: 2px;">${subject}</span>`).join('')}
          </div>
        </div>
        <div>
          <strong style="color: #6B7280;">Classes:</strong>
          <div style="margin-top: 8px;">
            ${mockData.currentClasses.map(cls => `<span style="display: inline-block; padding: 4px 8px; background-color: #F0FDF4; color: #059669; border-radius: 12px; font-size: 12px; margin: 2px;">${cls}</span>`).join('')}
          </div>
        </div>
      </div>

      <!-- Recent Terms Summary -->
      <div style="margin-bottom: 25px; padding: 20px; background: rgba(255,255,255,0.8); border: 1px solid rgba(156, 163, 175, 0.3); border-radius: 8px;">
        <h3 style="margin: 0 0 15px 0; color: #374151; font-size: 18px;">Recent Terms Summary</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background-color: #F9FAFB; border-bottom: 1px solid #E5E7EB;">
              <th style="padding: 10px; text-align: left; font-weight: 600; color: #374151;">Term</th>
              <th style="padding: 10px; text-align: right; font-weight: 600; color: #374151;">Average Score</th>
            </tr>
          </thead>
          <tbody>
            ${mockData.termAverages.map(term => `
              <tr style="border-bottom: 1px solid #F3F4F6;">
                <td style="padding: 10px; color: #6B7280;">${term.term}</td>
                <td style="padding: 10px; text-align: right; font-weight: 500; color: #059669;">${term.average}%</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <!-- Teacher Details -->
      <div style="margin-bottom: 25px; padding: 20px; background: rgba(255,255,255,0.8); border: 1px solid rgba(156, 163, 175, 0.3); border-radius: 8px;">
        <h3 style="margin: 0 0 15px 0; color: #374151; font-size: 18px;">Teacher Information</h3>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
          <div><strong style="color: #6B7280;">Email:</strong> ${teacher.email}</div>
          <div><strong style="color: #6B7280;">Phone:</strong> ${teacher.phone}</div>
          <div><strong style="color: #6B7280;">Qualification:</strong> ${teacher.qualification}</div>
          <div><strong style="color: #6B7280;">Experience:</strong> ${teacher.experience} years</div>
        </div>
      </div>

      <!-- Footer -->
      <div style="text-align: center; padding: 15px; background: rgba(243, 244, 246, 0.8); border-radius: 8px; margin-top: 30px;">
        <p style="margin: 0; color: #6B7280; font-size: 14px;">Generated on ${currentDate} | Edvana School Management System</p>
      </div>
    </div>
  `;

  await generatePDFFromHTML(htmlContent, filename);
};

// Enhanced Student Report Generator with jsPDF + autoTable
export const downloadStudentReport = async (student: Student): Promise<void> => {
  const mockData = generateStudentMockData(student);
  const currentDate = new Date().toLocaleDateString();
  const filename = `student-${student.id}-report-${new Date().toISOString().split('T')[0]}.pdf`;

  const pdf = new jsPDF();
  
  // Add school header
  pdf.setFontSize(20);
  pdf.setTextColor(30, 64, 175);
  pdf.text('Edvana School Management System', 20, 20);
  
  pdf.setFontSize(16);
  pdf.setTextColor(55, 65, 81);
  pdf.text('Student Academic Report', 20, 35);
  
  // Student basic info
  pdf.setFontSize(14);
  pdf.setTextColor(16, 185, 129);
  pdf.text(`${student.firstName} ${student.lastName}`, 20, 50);
  
  pdf.setFontSize(10);
  pdf.setTextColor(107, 114, 128);
  pdf.text(`Class: ${student.class} | Student ID: ${student.id} | Generated: ${currentDate}`, 20, 60);
  
  // Contact information table
  const contactData = [
    ['Information', 'Details'],
    ['Email', student.email],
    ['Phone', student.phone],
    ['Parent Email', student.parentEmail || '—'],
    ['Enrollment Date', new Date(student.enrollmentDate).toLocaleDateString()],
    ['Status', student.status]
  ];

  pdf.autoTable({
    startY: 75,
    head: [contactData[0]],
    body: contactData.slice(1),
    theme: 'grid',
    headStyles: { 
      fillColor: [59, 130, 246],
      textColor: [255, 255, 255],
      fontSize: 10,
      fontStyle: 'bold'
    },
    bodyStyles: { fontSize: 9 },
    alternateRowStyles: { fillColor: [249, 250, 251] },
    margin: { left: 20, right: 20 }
  });

  // Academic history table
  const academicData = [
    ['Year', 'Average Score', 'Class Rank', 'Class Size'],
    ...mockData.academicHistory.map(year => [
      year.year.toString(), 
      `${year.avgScore}%`, 
      year.classRank.toString(),
      year.classSize.toString()
    ])
  ];

  pdf.autoTable({
    startY: (pdf as any).lastAutoTable.finalY + 15,
    head: [academicData[0]],
    body: academicData.slice(1),
    theme: 'grid',
    headStyles: { 
      fillColor: [16, 185, 129],
      textColor: [255, 255, 255],
      fontSize: 10,
      fontStyle: 'bold'
    },
    bodyStyles: { fontSize: 9 },
    alternateRowStyles: { fillColor: [240, 253, 250] },
    margin: { left: 20, right: 20 }
  });

  // Current subjects performance
  const subjectsData = [
    ['Subject', 'Score', 'Progress'],
    ...mockData.currentSubjects.map(subject => [
      subject.name,
      `${subject.score}%`,
      `${subject.progress}%`
    ])
  ];

  pdf.autoTable({
    startY: (pdf as any).lastAutoTable.finalY + 15,
    head: [subjectsData[0]],
    body: subjectsData.slice(1),
    theme: 'grid',
    headStyles: { 
      fillColor: [147, 51, 234], // purple-600
      textColor: [255, 255, 255],
      fontSize: 10,
      fontStyle: 'bold'
    },
    bodyStyles: { fontSize: 9 },
    alternateRowStyles: { fillColor: [248, 250, 252] },
    margin: { left: 20, right: 20 }
  });

  // Attendance summary
  const attendanceY = (pdf as any).lastAutoTable.finalY + 20;
  pdf.setFontSize(12);
  pdf.setTextColor(55, 65, 81);
  pdf.text('Attendance Summary', 20, attendanceY);
  
  pdf.setFontSize(10);
  pdf.setTextColor(107, 114, 128);
  pdf.text(`Current Term: ${mockData.attendance.currentTerm}%`, 20, attendanceY + 15);
  pdf.text(`Last Term: ${mockData.attendance.lastTerm}%`, 120, attendanceY + 15);
  
  // Footer
  pdf.setFontSize(8);
  pdf.setTextColor(156, 163, 175);
  pdf.text('This report was generated automatically by Edvana School Management System', 20, pdf.internal.pageSize.height - 20);

  pdf.save(filename);

  const htmlContent = `
    <div style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; color: #1F2937;">
      <!-- Header -->
      <div style="text-align: center; margin-bottom: 30px; padding: 20px; background: linear-gradient(135deg, rgba(255,255,255,0.8), rgba(240, 253, 250, 0.9)); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 12px;">
        <h1 style="margin: 0; color: #059669; font-size: 28px; font-weight: bold;">Student Academic Report</h1>
        <h2 style="margin: 10px 0 5px 0; color: #374151; font-size: 22px;">${student.firstName} ${student.lastName}</h2>
        <div style="display: inline-block; padding: 6px 12px; background-color: #3B82F6; color: white; border-radius: 20px; font-size: 14px; margin: 5px;">${student.class}</div>
        <div style="display: inline-block; padding: 6px 12px; background-color: ${student.status === 'Active' ? '#10B981' : '#F59E0B'}; color: white; border-radius: 20px; font-size: 14px; margin: 5px;">${student.status}</div>
      </div>

      <!-- Contact Information -->
      <div style="margin-bottom: 25px; padding: 20px; background: rgba(255,255,255,0.8); border: 1px solid rgba(156, 163, 175, 0.3); border-radius: 8px;">
        <h3 style="margin: 0 0 15px 0; color: #374151; font-size: 18px;">Contact Information</h3>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
          <div><strong style="color: #6B7280;">Email:</strong> ${student.email}</div>
          <div><strong style="color: #6B7280;">Phone:</strong> ${student.phone}</div>
          <div><strong style="color: #6B7280;">Parent Email:</strong> ${student.parentEmail || '—'}</div>
          <div><strong style="color: #6B7280;">Enrollment Date:</strong> ${new Date(student.enrollmentDate).toLocaleDateString()}</div>
        </div>
      </div>

      <!-- Academic History -->
      <div style="margin-bottom: 25px; padding: 20px; background: rgba(255,255,255,0.8); border: 1px solid rgba(156, 163, 175, 0.3); border-radius: 8px;">
        <h3 style="margin: 0 0 15px 0; color: #374151; font-size: 18px;">Academic History</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background-color: #F9FAFB; border-bottom: 1px solid #E5E7EB;">
              <th style="padding: 10px; text-align: left; font-weight: 600; color: #374151;">Year</th>
              <th style="padding: 10px; text-align: center; font-weight: 600; color: #374151;">Average Score</th>
              <th style="padding: 10px; text-align: center; font-weight: 600; color: #374151;">Class Rank</th>
            </tr>
          </thead>
          <tbody>
            ${mockData.academicHistory.map(year => `
              <tr style="border-bottom: 1px solid #F3F4F6;">
                <td style="padding: 10px; color: #6B7280;">${year.year}</td>
                <td style="padding: 10px; text-align: center; font-weight: 500; color: #059669;">${year.avgScore}%</td>
                <td style="padding: 10px; text-align: center; color: #6B7280;">${year.classRank}/${year.classSize}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <!-- Current Subjects -->
      <div style="margin-bottom: 25px; padding: 20px; background: rgba(255,255,255,0.8); border: 1px solid rgba(156, 163, 175, 0.3); border-radius: 8px;">
        <h3 style="margin: 0 0 15px 0; color: #374151; font-size: 18px;">Current Subjects Performance</h3>
        ${mockData.currentSubjects.map(subject => `
          <div style="margin-bottom: 15px;">
            <div style="display: flex; justify-content: between; margin-bottom: 5px;">
              <span style="font-weight: 500; flex: 1;">${subject.name}</span>
              <span style="font-weight: bold; color: #059669; margin-left: 10px;">${subject.score}% (${subject.progress}% progress)</span>
            </div>
            ${createProgressBar(subject.progress, '#3B82F6')}
          </div>
        `).join('')}
      </div>

      <!-- Attendance -->
      <div style="margin-bottom: 25px; padding: 20px; background: rgba(255,255,255,0.8); border: 1px solid rgba(156, 163, 175, 0.3); border-radius: 8px;">
        <h3 style="margin: 0 0 15px 0; color: #374151; font-size: 18px;">Attendance Record</h3>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
          <div style="text-align: center; padding: 15px; background: rgba(239, 246, 255, 0.8); border-radius: 8px;">
            <div style="font-size: 24px; font-weight: bold; color: #2563EB;">${mockData.attendance.currentTerm}%</div>
            <div style="font-size: 14px; color: #6B7280;">Current Term</div>
          </div>
          <div style="text-align: center; padding: 15px; background: rgba(240, 253, 250, 0.8); border-radius: 8px;">
            <div style="font-size: 24px; font-weight: bold; color: #059669;">${mockData.attendance.lastTerm}%</div>
            <div style="font-size: 14px; color: #6B7280;">Last Term</div>
          </div>
        </div>
      </div>

      <!-- Recent Notes -->
      <div style="margin-bottom: 25px; padding: 20px; background: rgba(255,255,255,0.8); border: 1px solid rgba(156, 163, 175, 0.3); border-radius: 8px;">
        <h3 style="margin: 0 0 15px 0; color: #374151; font-size: 18px;">Recent Notes</h3>
        ${mockData.recentNotes.map(note => `
          <div style="margin-bottom: 10px; padding: 12px; background: rgba(249, 250, 251, 0.8); border-left: 3px solid #3B82F6; border-radius: 4px;">
            <div style="font-size: 12px; color: #6B7280; margin-bottom: 4px;">${note.date}</div>
            <div style="color: #374151; font-size: 14px;">${note.note}</div>
          </div>
        `).join('')}
      </div>

      <!-- Footer -->
      <div style="text-align: center; padding: 15px; background: rgba(243, 244, 246, 0.8); border-radius: 8px; margin-top: 30px;">
        <p style="margin: 0; color: #6B7280; font-size: 14px;">Generated on ${currentDate} | Edvana School Management System</p>
      </div>
    </div>
  `;

  await generatePDFFromHTML(htmlContent, filename);
};

// Enhanced Subject Report Generator with jsPDF + autoTable
export const downloadSubjectReport = async (subject: Subject): Promise<void> => {
  const mockData = generateSubjectMockData(subject);
  const currentDate = new Date().toLocaleDateString();
  const filename = `subject-${subject.id}-report-${new Date().toISOString().split('T')[0]}.pdf`;

  const pdf = new jsPDF();
  
  // Add school header
  pdf.setFontSize(20);
  pdf.setTextColor(30, 64, 175);
  pdf.text('Edvana School Management System', 20, 20);
  
  pdf.setFontSize(16);
  pdf.setTextColor(55, 65, 81);
  pdf.text('Subject Performance Report', 20, 35);
  
  // Subject basic info
  pdf.setFontSize(14);
  pdf.setTextColor(16, 185, 129);
  pdf.text(`${subject.name} (${subject.code})`, 20, 50);
  
  pdf.setFontSize(10);
  pdf.setTextColor(107, 114, 128);
  pdf.text(`Grade: ${subject.grade} | Teacher: ${subject.teacher} | Generated: ${currentDate}`, 20, 60);
  
  // Subject overview table
  const overviewData = [
    ['Metric', 'Value'],
    ['Subject Code', subject.code],
    ['Grade Level', subject.grade],
    ['Assigned Teacher', subject.teacher],
    ['Status', subject.status],
    ['Total Enrolled', mockData.totalEnrolled.toString()],
    ['Average Completion', `${mockData.avgCompletion}%`],
    ['Pass Rate', `${mockData.passRate}%`],
    ['Capacity', subject.capacity?.toString() || 'Not set']
  ];

  pdf.autoTable({
    startY: 75,
    head: [overviewData[0]],
    body: overviewData.slice(1),
    theme: 'grid',
    headStyles: { 
      fillColor: [59, 130, 246],
      textColor: [255, 255, 255],
      fontSize: 10,
      fontStyle: 'bold'
    },
    bodyStyles: { fontSize: 9 },
    alternateRowStyles: { fillColor: [249, 250, 251] },
    margin: { left: 20, right: 20 }
  });

  // Grade distribution table
  const gradeData = [
    ['Grade', 'Number of Students'],
    ...Object.entries(mockData.gradeDistribution).map(([grade, count]) => [
      `Grade ${grade}`,
      count.toString()
    ])
  ];

  pdf.autoTable({
    startY: (pdf as any).lastAutoTable.finalY + 15,
    head: [gradeData[0]],
    body: gradeData.slice(1),
    theme: 'grid',
    headStyles: { 
      fillColor: [16, 185, 129],
      textColor: [255, 255, 255],
      fontSize: 10,
      fontStyle: 'bold'
    },
    bodyStyles: { fontSize: 9 },
    alternateRowStyles: { fillColor: [240, 253, 250] },
    margin: { left: 20, right: 20 }
  });

  // Term trends table
  const trendsData = [
    ['Term', 'Average Score'],
    ...mockData.termTrends.map(term => [term.term, `${term.avgScore}%`])
  ];

  pdf.autoTable({
    startY: (pdf as any).lastAutoTable.finalY + 15,
    head: [trendsData[0]],
    body: trendsData.slice(1),
    theme: 'grid',
    headStyles: { 
      fillColor: [245, 158, 11], // amber-500
      textColor: [255, 255, 255],
      fontSize: 10,
      fontStyle: 'bold'
    },
    bodyStyles: { fontSize: 9 },
    alternateRowStyles: { fillColor: [254, 243, 199] }, // amber-50
    margin: { left: 20, right: 20 }
  });

  // Description if available
  if (subject.description) {
    const descY = (pdf as any).lastAutoTable.finalY + 20;
    pdf.setFontSize(12);
    pdf.setTextColor(55, 65, 81);
    pdf.text('Description', 20, descY);
    
    pdf.setFontSize(9);
    pdf.setTextColor(107, 114, 128);
    const splitDescription = pdf.splitTextToSize(subject.description, 170);
    pdf.text(splitDescription, 20, descY + 15);
  }
  
  // Footer
  pdf.setFontSize(8);
  pdf.setTextColor(156, 163, 175);
  pdf.text('This report was generated automatically by Edvana School Management System', 20, pdf.internal.pageSize.height - 20);

  pdf.save(filename);
};

// Bulk Student Reports (PDF and Excel)
export const downloadBulkStudentReports = async (students: Student[], format: 'pdf' | 'excel'): Promise<void> => {
  const currentDate = new Date().toISOString().split('T')[0];
  const filename = `students-bulk-report-${currentDate}.${format === 'pdf' ? 'pdf' : 'xlsx'}`;

  if (format === 'pdf') {
    // PDF Bulk Report using jsPDF + autoTable
    const pdf = new jsPDF();
    
    // Header
    pdf.setFontSize(20);
    pdf.setTextColor(30, 64, 175);
    pdf.text('Edvana School Management System', 20, 20);
    
    pdf.setFontSize(16);
    pdf.setTextColor(55, 65, 81);
    pdf.text('Students Bulk Report', 20, 35);
    
    pdf.setFontSize(10);
    pdf.setTextColor(107, 114, 128);
    pdf.text(`Generated: ${new Date().toLocaleDateString()} | Total Students: ${students.length}`, 20, 50);

    // Students table
    const tableData = students.map(student => [
      `${student.firstName} ${student.lastName}`,
      student.email,
      student.class,
      student.status,
      new Date(student.enrollmentDate).toLocaleDateString()
    ]);

    pdf.autoTable({
      startY: 65,
      head: [['Name', 'Email', 'Class', 'Status', 'Enrolled']],
      body: tableData,
      theme: 'grid',
      headStyles: { 
        fillColor: [59, 130, 246],
        textColor: [255, 255, 255],
        fontSize: 9,
        fontStyle: 'bold'
      },
      bodyStyles: { fontSize: 8 },
      alternateRowStyles: { fillColor: [249, 250, 251] },
      margin: { left: 20, right: 20 },
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 50 },
        2: { cellWidth: 25 },
        3: { cellWidth: 25 },
        4: { cellWidth: 30 }
      }
    });

    // Footer
    pdf.setFontSize(8);
    pdf.setTextColor(156, 163, 175);
    pdf.text('Edvana School Management System - Bulk Student Report', 20, pdf.internal.pageSize.height - 20);

    pdf.save(filename);
  } else {
    // Excel Bulk Report using SheetJS
    const workbook = XLSX.utils.book_new();
    
    const studentsData = students.map(student => ({
      'Full Name': `${student.firstName} ${student.lastName}`,
      'Email': student.email,
      'Phone': student.phone,
      'Class': student.class,
      'Status': student.status,
      'Enrollment Date': new Date(student.enrollmentDate).toLocaleDateString(),
      'Date of Birth': student.dateOfBirth || '',
      'Parent Email': student.parentEmail || '',
      'Parent National ID': student.parentNationalId || ''
    }));

    const worksheet = XLSX.utils.json_to_sheet(studentsData);
    
    // Set column widths
    worksheet['!cols'] = [
      { wch: 20 }, // Full Name
      { wch: 25 }, // Email
      { wch: 15 }, // Phone
      { wch: 10 }, // Class
      { wch: 12 }, // Status
      { wch: 15 }, // Enrollment Date
      { wch: 15 }, // Date of Birth
      { wch: 25 }, // Parent Email
      { wch: 20 }  // Parent National ID
    ];

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');
    XLSX.writeFile(workbook, filename);
  }
};

// Bulk Teacher Reports (PDF and Excel)
export const downloadBulkTeacherReports = async (teachers: Teacher[], format: 'pdf' | 'excel'): Promise<void> => {
  const currentDate = new Date().toISOString().split('T')[0];
  const filename = `teachers-bulk-report-${currentDate}.${format === 'pdf' ? 'pdf' : 'xlsx'}`;

  if (format === 'pdf') {
    // PDF Bulk Report
    const pdf = new jsPDF();
    
    // Header
    pdf.setFontSize(20);
    pdf.setTextColor(30, 64, 175);
    pdf.text('Edvana School Management System', 20, 20);
    
    pdf.setFontSize(16);
    pdf.setTextColor(55, 65, 81);
    pdf.text('Teachers Bulk Report', 20, 35);
    
    pdf.setFontSize(10);
    pdf.setTextColor(107, 114, 128);
    pdf.text(`Generated: ${new Date().toLocaleDateString()} | Total Teachers: ${teachers.length}`, 20, 50);

    // Teachers table
    const tableData = teachers.map(teacher => [
      `${teacher.firstName} ${teacher.lastName}`,
      teacher.email,
      teacher.role,
      teacher.qualification,
      `${teacher.experience} years`,
      teacher.status
    ]);

    pdf.autoTable({
      startY: 65,
      head: [['Name', 'Email', 'Role', 'Qualification', 'Experience', 'Status']],
      body: tableData,
      theme: 'grid',
      headStyles: { 
        fillColor: [16, 185, 129],
        textColor: [255, 255, 255],
        fontSize: 9,
        fontStyle: 'bold'
      },
      bodyStyles: { fontSize: 8 },
      alternateRowStyles: { fillColor: [240, 253, 250] },
      margin: { left: 20, right: 20 },
      columnStyles: {
        0: { cellWidth: 35 },
        1: { cellWidth: 45 },
        2: { cellWidth: 25 },
        3: { cellWidth: 25 },
        4: { cellWidth: 20 },
        5: { cellWidth: 20 }
      }
    });

    // Footer
    pdf.setFontSize(8);
    pdf.setTextColor(156, 163, 175);
    pdf.text('Edvana School Management System - Bulk Teacher Report', 20, pdf.internal.pageSize.height - 20);

    pdf.save(filename);
  } else {
    // Excel Bulk Report
    const workbook = XLSX.utils.book_new();
    
    const teachersData = teachers.map(teacher => ({
      'Full Name': `${teacher.firstName} ${teacher.lastName}`,
      'Email': teacher.email,
      'Phone': teacher.phone,
      'Role': teacher.role,
      'Qualification': teacher.qualification,
      'Experience (Years)': teacher.experience,
      'Specialization': teacher.specialization.join(', '),
      'Status': teacher.status,
      'National ID': teacher.nationalId || '',
      'Emergency Contact': teacher.emergencyContactName || '',
      'Emergency Phone': teacher.emergencyContactPhone || '',
      'Hire Date': teacher.hireDate || '',
      'Salary': teacher.salary || ''
    }));

    const worksheet = XLSX.utils.json_to_sheet(teachersData);
    
    // Set column widths
    worksheet['!cols'] = [
      { wch: 20 }, // Full Name
      { wch: 25 }, // Email
      { wch: 15 }, // Phone
      { wch: 15 }, // Role
      { wch: 15 }, // Qualification
      { wch: 12 }, // Experience
      { wch: 20 }, // Specialization
      { wch: 12 }, // Status
      { wch: 18 }, // National ID
      { wch: 20 }, // Emergency Contact
      { wch: 15 }, // Emergency Phone
      { wch: 12 }, // Hire Date
      { wch: 12 }  // Salary
    ];

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Teachers');
    XLSX.writeFile(workbook, filename);
  }
};

// Bulk Subject Reports (PDF and Excel)
export const downloadBulkSubjectReports = async (subjects: Subject[], format: 'pdf' | 'excel'): Promise<void> => {
  const currentDate = new Date().toISOString().split('T')[0];
  const filename = `subjects-bulk-report-${currentDate}.${format === 'pdf' ? 'pdf' : 'xlsx'}`;

  if (format === 'pdf') {
    // PDF Bulk Report
    const pdf = new jsPDF();
    
    // Header
    pdf.setFontSize(20);
    pdf.setTextColor(30, 64, 175);
    pdf.text('Edvana School Management System', 20, 20);
    
    pdf.setFontSize(16);
    pdf.setTextColor(55, 65, 81);
    pdf.text('Subjects Bulk Report', 20, 35);
    
    pdf.setFontSize(10);
    pdf.setTextColor(107, 114, 128);
    pdf.text(`Generated: ${new Date().toLocaleDateString()} | Total Subjects: ${subjects.length}`, 20, 50);

    // Subjects table
    const tableData = subjects.map(subject => [
      subject.name,
      subject.code,
      subject.grade,
      subject.teacher,
      subject.status,
      subject.capacity?.toString() || 'N/A'
    ]);

    pdf.autoTable({
      startY: 65,
      head: [['Subject Name', 'Code', 'Grade', 'Teacher', 'Status', 'Capacity']],
      body: tableData,
      theme: 'grid',
      headStyles: { 
        fillColor: [147, 51, 234],
        textColor: [255, 255, 255],
        fontSize: 9,
        fontStyle: 'bold'
      },
      bodyStyles: { fontSize: 8 },
      alternateRowStyles: { fillColor: [248, 250, 252] },
      margin: { left: 20, right: 20 },
      columnStyles: {
        0: { cellWidth: 35 },
        1: { cellWidth: 20 },
        2: { cellWidth: 20 },
        3: { cellWidth: 30 },
        4: { cellWidth: 20 },
        5: { cellWidth: 20 }
      }
    });

    // Footer
    pdf.setFontSize(8);
    pdf.setTextColor(156, 163, 175);
    pdf.text('Edvana School Management System - Bulk Subject Report', 20, pdf.internal.pageSize.height - 20);

    pdf.save(filename);
  } else {
    // Excel Bulk Report
    const workbook = XLSX.utils.book_new();
    
    const subjectsData = subjects.map(subject => {
      const mockData = generateSubjectMockData(subject);
      return {
        'Subject Name': subject.name,
        'Subject Code': subject.code,
        'Grade': subject.grade,
        'Assigned Teacher': subject.teacher,
        'Status': subject.status,
        'Capacity': subject.capacity || '',
        'Description': subject.description || '',
        'Total Enrolled': mockData.totalEnrolled,
        'Average Completion': `${mockData.avgCompletion}%`,
        'Pass Rate': `${mockData.passRate}%`
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(subjectsData);
    
    // Set column widths
    worksheet['!cols'] = [
      { wch: 25 }, // Subject Name
      { wch: 12 }, // Subject Code
      { wch: 10 }, // Grade
      { wch: 20 }, // Assigned Teacher
      { wch: 12 }, // Status
      { wch: 12 }, // Capacity
      { wch: 30 }, // Description
      { wch: 15 }, // Total Enrolled
      { wch: 18 }, // Average Completion
      { wch: 12 }  // Pass Rate
    ];

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Subjects');
    XLSX.writeFile(workbook, filename);
  }
};