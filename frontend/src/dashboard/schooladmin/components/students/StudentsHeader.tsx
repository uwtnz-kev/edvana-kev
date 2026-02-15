import React from 'react';
import { Button } from '@/components/ui/button';
import { UserPlus, Download, FileSpreadsheet } from 'lucide-react';

interface StudentsHeaderProps {
  onAddStudent: () => void;
  onBulkExport?: (format: 'pdf' | 'excel') => void;
}

export default function StudentsHeader({ onAddStudent, onBulkExport }: StudentsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 mb-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Students</h1>
        <p className="text-white/80 mt-1">Manage student enrollment and information</p>
      </div>
      
      <div className="flex items-center space-x-3">
        {onBulkExport && (
          <div className="flex gap-2">
            <Button
              onClick={() => onBulkExport('pdf')}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 font-medium px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Download className="h-4 w-4 mr-2" />
              PDF Report
            </Button>
            <Button
              onClick={() => onBulkExport('excel')}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 font-medium px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Excel Report
            </Button>
          </div>
        )}
        <Button
          onClick={onAddStudent}
          className="bg-brand-accent hover:bg-brand-accent/90 text-white border-0 rounded-xl px-6 py-2.5 font-medium transition-all duration-200 hover:backdrop-blur-sm hover:bg-white/20"
          aria-label="Add new student"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Add Student
        </Button>
      </div>
    </div>
  );
}