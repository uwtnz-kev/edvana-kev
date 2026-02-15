import React from 'react';
import { BookOpen, Users, Layers } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getClassNameExamples, getDerivedClassesForGrade, classesStore } from '@/shared/mocks/schooladmin/classes';

interface ClassNameDemoProps {
  selectedGradeId?: string;
}

export default function ClassNameDemo({ selectedGradeId }: ClassNameDemoProps) {
  if (!selectedGradeId) {
    return (
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <h3 className="font-medium text-white">Class Name Logic</h3>
            <p className="text-sm text-white/70">Dynamic class name formation</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-sm text-white/80">
            Class names are dynamically formed using this flexible formula:
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Badge variant="outline" className="text-xs">
                Grade Only
              </Badge>
              <div className="text-sm text-white/90 font-mono bg-black/20 px-3 py-2 rounded">
                S1
              </div>
            </div>
            
            <div className="space-y-2">
              <Badge variant="outline" className="text-xs">
                Grade + SubGrade
              </Badge>
              <div className="text-sm text-white/90 font-mono bg-black/20 px-3 py-2 rounded">
                S1 A
              </div>
            </div>
            
            <div className="space-y-2">
              <Badge variant="outline" className="text-xs">
                Grade + Combination
              </Badge>
              <div className="text-sm text-white/90 font-mono bg-black/20 px-3 py-2 rounded">
                S5 MCB
              </div>
            </div>
            
            <div className="space-y-2">
              <Badge variant="outline" className="text-xs">
                Grade + Combination + SubGrade
              </Badge>
              <div className="text-sm text-white/90 font-mono bg-black/20 px-3 py-2 rounded">
                S5 MCB A
              </div>
            </div>
          </div>
          
          <div className="text-xs text-white/60 bg-blue-500/10 px-3 py-2 rounded border border-blue-500/20">
            💡 Select a grade to see its actual generated class names
          </div>
        </div>
      </div>
    );
  }

  // Find the selected grade
  const selectedGrade = classesStore.levels
    .flatMap(level => level.grades)
    .find(grade => grade.id === selectedGradeId);

  if (!selectedGrade) return null;

  const derivedClasses = getDerivedClassesForGrade(classesStore, selectedGradeId);
  const examples = getClassNameExamples(selectedGrade) || [];

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
          <Layers className="w-4 h-4 text-green-400" />
        </div>
        <div>
          <h3 className="font-medium text-white">Generated Classes for "{selectedGrade.name}"</h3>
          <p className="text-sm text-white/70">Auto-generated based on structure</p>
        </div>
      </div>

      <div className="space-y-4">
        {derivedClasses.length > 0 ? (
          <>
            <div className="flex items-center gap-2 text-sm text-white/80">
              <Users className="w-4 h-4" />
              {derivedClasses.length} classes generated
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {derivedClasses.map((derivedClass) => (
                <div
                  key={derivedClass.id}
                  className="bg-black/20 border border-white/10 rounded-lg p-3"
                >
                  <div className="font-mono text-sm text-white font-medium mb-1">
                    {derivedClass.name}
                  </div>
                  <div className="text-xs text-white/60">
                    {derivedClass.fullPath}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-8 text-white/60">
            <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">No classes generated yet</p>
            <p className="text-xs mt-1">Add sub-grades or combinations to generate classes</p>
          </div>
        )}

        {examples.length > 0 && (
          <div className="border-t border-white/10 pt-4">
            <div className="text-sm text-white/80 mb-2">Pattern Examples:</div>
            <div className="flex flex-wrap gap-2">
              {examples.map((example, index) => (
                <Badge key={index} variant="secondary" className="font-mono">
                  {example}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}