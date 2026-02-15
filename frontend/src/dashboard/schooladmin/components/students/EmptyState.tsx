import React from 'react';
import { Button } from '@/components/ui/button';
import { UserPlus, Users } from 'lucide-react';

interface EmptyStateProps {
  onAddStudent: () => void;
}

export default function EmptyState({ onAddStudent }: EmptyStateProps) {
  return (
    <div className="bg-white/15 backdrop-blur-xl border border-white/25 shadow-xl rounded-2xl p-12 text-center">
      <div className="max-w-md mx-auto">
        <div className="bg-brand-teal/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
          <Users className="w-8 h-8 text-brand-teal" />
        </div>
        
        <h3 className="text-xl font-semibold text-white mb-2">
          No Students Found
        </h3>
        
        <p className="text-white/70 mb-8 leading-relaxed">
          Start building your student database by adding your first student. 
          You can add individual students or import multiple students using CSV files.
        </p>
        
        <Button
          onClick={onAddStudent}
          className="bg-brand-accent hover:bg-brand-accent/90 text-white border-0 rounded-xl px-8 py-3 font-medium transition-all duration-200 hover:backdrop-blur-sm hover:bg-white/20"
        >
          <UserPlus className="w-5 h-5 mr-2" />
          Add Your First Student
        </Button>
      </div>
    </div>
  );
}