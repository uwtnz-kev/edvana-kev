import React, { useState, useRef } from 'react';
import { X, Upload, Download, AlertTriangle, CheckCircle, FileText, Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Parent, MockParentStore, mockStudents } from '@/shared/mocks/schooladmin/mockData';
import { nanoid } from 'nanoid';

interface ImportCSVModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (importedCount: number) => void;
  onClose: () => void;
}

interface CSVParent {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationalIdOrPassport?: string;
  status: 'Active' | 'Archived';
  studentIds: string[];
}

interface ValidationError {
  row: number;
  field: string;
  message: string;
}

export default function ImportCSVModal({
  open,
  onOpenChange,
  onSuccess,
  onClose
}: ImportCSVModalProps) {
  const [dragActive, setDragActive] = useState(false);
  const [csvData, setCsvData] = useState<CSVParent[]>([]);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'upload' | 'preview'>('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const downloadTemplate = () => {
    const csvContent = [
      'firstName,lastName,email,phone,nationalIdOrPassport,status,studentIds',
      'John,Doe,john.doe@email.com,+250788123456,1198712345678901,Active,"std-001,std-002"',
      'Jane,Smith,jane.smith@email.com,+250788234567,,Active,std-003'
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'parents_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    toast({
      title: "Template Downloaded",
      description: "CSV template has been downloaded to your device.",
    });
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phone);
  };

  const validateStudentIds = (studentIds: string[]): boolean => {
    return studentIds.every(id => mockStudents.some(student => student.id === id));
  };

  const parseCSV = (csvText: string): CSVParent[] => {
    const lines = csvText.split('\n').filter(line => line.trim());
    if (lines.length < 2) throw new Error('CSV must contain at least a header and one data row');

    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    const expectedHeaders = ['firstName', 'lastName', 'email', 'phone', 'nationalIdOrPassport', 'status', 'studentIds'];
    
    if (!expectedHeaders.every(header => headers.includes(header))) {
      throw new Error(`CSV must contain headers: ${expectedHeaders.join(', ')}`);
    }

    const data: CSVParent[] = [];
    const errors: ValidationError[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
      const row: any = {};
      
      headers.forEach((header, index) => {
        row[header] = values[index] || '';
      });

      // Parse studentIds
      const studentIdsStr = row.studentIds || '';
      const studentIds = studentIdsStr ? studentIdsStr.split(',').map((id: string) => id.trim()).filter(Boolean) : [];

      const csvParent: CSVParent = {
        firstName: row.firstName,
        lastName: row.lastName,
        email: row.email,
        phone: row.phone,
        nationalIdOrPassport: row.nationalIdOrPassport || undefined,
        status: row.status === 'Archived' ? 'Archived' : 'Active',
        studentIds
      };

      // Validation
      if (!csvParent.firstName || csvParent.firstName.length < 2 || csvParent.firstName.length > 40) {
        errors.push({ row: i, field: 'firstName', message: 'First name must be 2-40 characters' });
      }
      if (!csvParent.lastName || csvParent.lastName.length < 2 || csvParent.lastName.length > 40) {
        errors.push({ row: i, field: 'lastName', message: 'Last name must be 2-40 characters' });
      }
      if (!csvParent.email || !validateEmail(csvParent.email)) {
        errors.push({ row: i, field: 'email', message: 'Valid email address required' });
      }
      if (!csvParent.phone || !validatePhone(csvParent.phone)) {
        errors.push({ row: i, field: 'phone', message: 'Valid international phone number required' });
      }
      if (csvParent.studentIds.length > 0 && !validateStudentIds(csvParent.studentIds)) {
        errors.push({ row: i, field: 'studentIds', message: 'Invalid student IDs provided' });
      }

      data.push(csvParent);
    }

    setValidationErrors(errors);
    return data;
  };

  const handleFileSelect = (file: File) => {
    if (!file.type.includes('csv') && !file.name.endsWith('.csv')) {
      toast({
        title: "Invalid File Type",
        description: "Please select a CSV file.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const csvText = e.target?.result as string;
        const parsedData = parseCSV(csvText);
        setCsvData(parsedData);
        setStep('preview');
      } catch (error) {
        toast({
          title: "CSV Parse Error",
          description: error instanceof Error ? error.message : "Failed to parse CSV file.",
          variant: "destructive",
        });
      } finally {
        setIsProcessing(false);
      }
    };

    reader.onerror = () => {
      toast({
        title: "File Read Error",
        description: "Failed to read the selected file.",
        variant: "destructive",
      });
      setIsProcessing(false);
    };

    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleImport = () => {
    if (validationErrors.length > 0) {
      toast({
        title: "Validation Errors",
        description: "Please fix all validation errors before importing.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      let importedCount = 0;
      
      csvData.forEach(csvParent => {
        const parent: Omit<Parent, 'id' | 'createdAt' | 'updatedAt'> = {
          firstName: csvParent.firstName,
          lastName: csvParent.lastName,
          email: csvParent.email,
          phone: csvParent.phone,
          nationalIdOrPassport: csvParent.nationalIdOrPassport,
          status: csvParent.status,
          studentIds: csvParent.studentIds
        };

        MockParentStore.addParent(parent);
        importedCount++;
      });

      onSuccess(importedCount);
      handleClose();

      toast({
        title: "Import Successful",
        description: `Successfully imported ${importedCount} parent${importedCount > 1 ? 's' : ''}.`,
      });
    } catch (error) {
      toast({
        title: "Import Failed",
        description: "Failed to import parents. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    setCsvData([]);
    setValidationErrors([]);
    setStep('upload');
    setIsProcessing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  const validRowsCount = csvData.length - new Set(validationErrors.map(e => e.row)).size;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-4xl bg-white/15 backdrop-blur-xl border border-white/20 text-white"
        onKeyDown={handleKeyDown}
      >
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-white text-xl font-semibold">
            Import Parents from CSV
          </DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="text-white hover:bg-white/20 rounded-xl"
          >
            <X className="w-4 h-4" />
          </Button>
        </DialogHeader>

        {step === 'upload' ? (
          <div className="space-y-6">
            {/* Download Template */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-blue-400 mt-0.5" />
                <div className="flex-1">
                  <div className="text-white font-medium mb-2">Download CSV Template</div>
                  <div className="text-white/70 text-sm mb-3">
                    Get the properly formatted CSV template with required columns and example data.
                  </div>
                  <Button
                    onClick={downloadTemplate}
                    variant="ghost"
                    size="sm"
                    className="text-blue-400 hover:bg-blue-500/20 rounded-xl"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Template
                  </Button>
                </div>
              </div>
            </div>

            {/* Upload Area */}
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                dragActive 
                  ? 'border-brand-accent bg-brand-accent/10' 
                  : 'border-white/30 hover:border-white/50'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <div className="w-16 h-16 bg-brand-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-brand-accent" />
              </div>
              <div className="text-white font-medium mb-2">
                Drop your CSV file here, or click to browse
              </div>
              <div className="text-white/60 text-sm mb-4">
                Supports CSV files with parent data
              </div>
              <Button
                onClick={() => fileInputRef.current?.click()}
                disabled={isProcessing}
                className="bg-brand-accent hover:backdrop-blur-sm hover:bg-white/20 text-white rounded-xl"
              >
                <Upload className="w-4 h-4 mr-2" />
                {isProcessing ? 'Processing...' : 'Select CSV File'}
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileInputChange}
                className="hidden"
              />
            </div>

            {/* Required Format */}
            <div className="bg-white/5 rounded-xl p-4">
              <div className="text-white font-medium mb-2">Required CSV Format:</div>
              <div className="text-white/70 text-sm space-y-1">
                <div>• <strong>firstName</strong>: 2-40 characters (required)</div>
                <div>• <strong>lastName</strong>: 2-40 characters (required)</div>
                <div>• <strong>email</strong>: Valid email address (required)</div>
                <div>• <strong>phone</strong>: International format (required)</div>
                <div>• <strong>nationalIdOrPassport</strong>: Optional</div>
                <div>• <strong>status</strong>: Active or Archived (defaults to Active)</div>
                <div>• <strong>studentIds</strong>: Comma-separated student IDs (optional)</div>
              </div>
            </div>
          </div>
        ) : (
          /* Preview Step */
          <div className="space-y-6">
            {/* Import Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-blue-400">{csvData.length}</div>
                <div className="text-sm text-white/70">Total Rows</div>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-green-400">{validRowsCount}</div>
                <div className="text-sm text-white/70">Valid Rows</div>
              </div>
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-red-400">
                  {new Set(validationErrors.map(e => e.row)).size}
                </div>
                <div className="text-sm text-white/70">Rows with Errors</div>
              </div>
            </div>

            {/* Validation Errors */}
            {validationErrors.length > 0 && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <div className="text-red-400 font-medium">Validation Errors</div>
                </div>
                <div className="max-h-48 overflow-y-auto space-y-2">
                  {validationErrors.map((error, index) => (
                    <div key={index} className="text-sm text-red-300">
                      <strong>Row {error.row}:</strong> {error.field} - {error.message}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Preview Table */}
            <div className="bg-white/5 rounded-xl p-4">
              <div className="text-white font-medium mb-3">Data Preview (First 5 rows)</div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left p-2 text-white/70">Row</th>
                      <th className="text-left p-2 text-white/70">Name</th>
                      <th className="text-left p-2 text-white/70">Email</th>
                      <th className="text-left p-2 text-white/70">Phone</th>
                      <th className="text-left p-2 text-white/70">Status</th>
                      <th className="text-left p-2 text-white/70">Students</th>
                      <th className="text-left p-2 text-white/70">Validation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {csvData.slice(0, 5).map((parent, index) => {
                      const rowErrors = validationErrors.filter(e => e.row === index + 2);
                      const hasErrors = rowErrors.length > 0;
                      
                      return (
                        <tr key={index} className={`border-b border-white/10 ${hasErrors ? 'bg-red-500/5' : ''}`}>
                          <td className="p-2 text-white">{index + 2}</td>
                          <td className="p-2 text-white">{parent.firstName} {parent.lastName}</td>
                          <td className="p-2 text-white">{parent.email}</td>
                          <td className="p-2 text-white">{parent.phone}</td>
                          <td className="p-2">
                            <Badge
                              variant="secondary"
                              className={parent.status === 'Active' 
                                ? "bg-green-500/20 text-green-400 border border-green-500/40"
                                : "bg-gray-500/20 text-gray-400 border border-gray-500/40"
                              }
                            >
                              {parent.status}
                            </Badge>
                          </td>
                          <td className="p-2 text-white">{parent.studentIds.length} linked</td>
                          <td className="p-2">
                            {hasErrors ? (
                              <Badge className="bg-red-500/20 text-red-400 border border-red-500/40">
                                {rowErrors.length} error{rowErrors.length > 1 ? 's' : ''}
                              </Badge>
                            ) : (
                              <Badge className="bg-green-500/20 text-green-400 border border-green-500/40">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Valid
                              </Badge>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {csvData.length > 5 && (
                <div className="text-white/60 text-sm mt-2">
                  ... and {csvData.length - 5} more rows
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between pt-6 border-t border-white/20">
              <Button
                onClick={() => setStep('upload')}
                variant="ghost"
                className="text-white hover:bg-white/20 rounded-xl"
              >
                Back to Upload
              </Button>
              
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="destructiveOutline"
                  onClick={handleClose}
                  className="rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleImport}
                  disabled={validationErrors.length > 0 || isProcessing}
                  className="bg-brand-accent hover:backdrop-blur-sm hover:bg-white/20 text-white rounded-xl disabled:opacity-50"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {isProcessing ? 'Importing...' : `Import ${validRowsCount} Parent${validRowsCount > 1 ? 's' : ''}`}
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}