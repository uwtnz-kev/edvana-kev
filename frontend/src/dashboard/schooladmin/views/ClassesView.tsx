import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { GraduationCap, BookOpen, Users, UserCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Import new centralized types and utilities
import {
  Level,
  Grade,
  SubGrade,
  ClassesStore,
  addLevel,
  updateLevel,
  deleteLevel,
  addGrade,
  updateGrade,
  deleteGrade,
  addSubGrade,
  updateSubGrade,
  deleteSubGrade,
  addCombination,
  updateCombination,
  deleteCombination,
  findLevel,
  findGrade,
  findSubGrade,
  validateLevelName,
  validateGradeName,
  validateSubGradeName,
  validateCombinationName,
  getClassesStats,
  getCascadeDeleteInfo,
  canAddCombinations,
  canAddSubGrades,
  getValidationMessage,
  regenerateDerivedClasses,
  classesStore
} from '@/shared/mocks/schooladmin/classes';

import { mockLevels } from '../components/classes';

// Import components
import {
  LevelsPanel,
  GradesPanel,
  SubGradesPanel,
  CombinationsCard
} from '../components/classes';
import ClassNameDemo from '../components/classes/ClassNameDemo';
import StudentsPanel from '../components/classes/StudentsPanel';
import ClassesSummaryView from '../components/classes/ClassesSummaryView';
import {
  LevelModal,
  GradeModal,
  SubGradeModal,
  CombinationModal,
  ConfirmDeleteModal,
  CascadeDeleteModal
} from '../components/classes/modals';
import ClassesToolbar from '../components/classes/ClassesToolbar';

export default function ClassesView() {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Main state
  const [levels, setLevels] = useState<Level[]>(classesStore.levels);
  
  // Selection state (ID-based for cleaner updates)
  const [selectedLevelId, setSelectedLevelId] = useState<string | undefined>();
  const [selectedGradeId, setSelectedGradeId] = useState<string | undefined>();
  const [selectedSubGradeId, setSelectedSubGradeId] = useState<string | undefined>();

  // Derived selections with validation
  const selectedLevel = selectedLevelId ? levels.find(l => l.id === selectedLevelId) : undefined;
  const selectedGrade = selectedLevel && selectedGradeId ? selectedLevel.grades.find(g => g.id === selectedGradeId) : undefined;
  const selectedSubGrade = selectedGrade && selectedSubGradeId ? selectedGrade.subGrades.find(sg => sg.id === selectedSubGradeId) : undefined;

  // Remove debug logging
  // console.log('ClassesView Selection Debug:', { ... });

  // Clear invalid selections when items no longer exist
  useEffect(() => {
    // If selected level doesn't exist, clear all selections
    if (selectedLevelId && !selectedLevel) {
      setSelectedLevelId(undefined);
      setSelectedGradeId(undefined);
      setSelectedSubGradeId(undefined);
      return;
    }

    // If selected grade doesn't exist in current level, clear grade/subgrade selections
    if (selectedGradeId && selectedLevel && !selectedGrade) {
      setSelectedGradeId(undefined);
      setSelectedSubGradeId(undefined);
      return;
    }

    // If selected subgrade doesn't exist in current grade, clear subgrade selection
    if (selectedSubGradeId && selectedGrade && !selectedSubGrade) {
      setSelectedSubGradeId(undefined);
    }
  }, [selectedLevelId, selectedGradeId, selectedSubGradeId, selectedLevel, selectedGrade, selectedSubGrade]);
  
  // Get current level's grades and current grade's sub-grades
  const currentGrades = selectedLevel?.grades || [];
  const currentSubGrades = selectedGrade?.subGrades || [];
  
  // Main tab management
  const [activeTab, setActiveTab] = useState<'setup' | 'summary'>('setup');
  
  // Summary tab toolbar state (only used in Summary tab)
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [visibleColumns, setVisibleColumns] = useState({
    order: true,
    count: true
  });

  // Initialize with mock data on component mount
  useEffect(() => {
    if (classesStore.levels.length === 0) {
      classesStore.levels = mockLevels;
      regenerateDerivedClasses(classesStore);
      setLevels([...mockLevels]);
    }
  }, []);

  // Calculate stats for header cards using helper
  const stats = getClassesStats(classesStore);

  // Modal states
  const [modals, setModals] = useState({
    level: { isOpen: false, mode: 'create' as 'create' | 'edit', data: undefined as Level | undefined },
    grade: { isOpen: false, mode: 'create' as 'create' | 'edit', data: undefined as Grade | undefined },
    subGrade: { isOpen: false, mode: 'create' as 'create' | 'edit', data: undefined as SubGrade | undefined },
    combination: { isOpen: false, mode: 'create' as 'create' | 'edit', data: undefined as Combination | undefined },
    confirmDelete: { 
      isOpen: false, 
      type: 'level' as 'level' | 'grade' | 'subgrade' | 'combination',
      item: undefined as Level | Grade | SubGrade | Combination | undefined,
      title: '',
      description: '',
      itemName: ''
    }
  });

  // Cascade delete state
  const [cascadeDeleteState, setCascadeDeleteState] = useState<{
    open: boolean;
    type: 'level' | 'grade' | 'subgrade' | 'combination' | null;
    item: Level | Grade | SubGrade | Combination | null;
    cascadeInfo?: {
      gradeCount?: number;
      subGradeCount?: number;
      studentCount?: number;
    };
  }>({ open: false, type: null, item: null });

  // Selection handlers
  const handleSelectLevel = (level: Level) => {
    setSelectedLevelId(level.id);
    setSelectedGradeId(undefined);
    setSelectedSubGradeId(undefined);
  };

  const handleSelectGrade = (grade: Grade) => {
    setSelectedGradeId(grade.id);
    setSelectedSubGradeId(undefined);
  };

  const handleSelectSubGrade = (subGrade: SubGrade) => {
    setSelectedSubGradeId(subGrade.id);
  };

  // Modal Management
  const openModal = (type: keyof typeof modals, mode: 'create' | 'edit', data?: any) => {
    setModals(prev => ({
      ...prev,
      [type]: { isOpen: true, mode, data }
    }));
  };

  const closeModal = (type: keyof typeof modals) => {
    setModals(prev => ({
      ...prev,
      [type]: { ...prev[type], isOpen: false, data: undefined }
    }));
  };

  // Level CRUD Operations
  const handleAddLevel = () => {
    openModal('level', 'create');
  };

  const handleEditLevel = (level: Level) => {
    openModal('level', 'edit', level);
  };

  const handleDeleteLevel = (level: Level) => {
    const cascadeInfo = getCascadeDeleteInfo(classesStore, 'level', level.id);
    
    if (cascadeInfo && cascadeInfo.hasChildren) {
      setCascadeDeleteState({
        open: true,
        type: 'level',
        item: level,
        cascadeInfo: {
          gradeCount: cascadeInfo.counts.grades,
          subGradeCount: cascadeInfo.counts.subGrades,
          studentCount: cascadeInfo.counts.students
        }
      });
    } else {
      setModals(prev => ({
        ...prev,
        confirmDelete: {
          isOpen: true,
          type: 'level',
          item: level,
          title: 'Delete Education Level',
          description: `Are you sure you want to delete "${level.name}"? This action cannot be undone.`,
          itemName: level.name
        }
      }));
    }
  };

  const handleLevelSubmit = (formData: { name: string; order?: number }) => {
    if (!validateLevelName(classesStore, formData.name, modals.level.mode === 'edit' ? modals.level.data?.id : undefined)) {
      toast({
        title: "Validation Error",
        description: "An education level with this name already exists.",
        variant: "destructive"
      });
      return;
    }
    
    if (modals.level.mode === 'create') {
      const newLevel = addLevel(classesStore, formData.name, formData.order);
      regenerateDerivedClasses(classesStore);
      setLevels([...classesStore.levels]);
      
      toast({
        title: "Level Added",
        description: `"${formData.name}" education level has been created successfully.`,
      });
    } else if (modals.level.data) {
      updateLevel(classesStore, modals.level.data.id, {
        name: formData.name,
        order: formData.order
      });
      regenerateDerivedClasses(classesStore);
      setLevels([...classesStore.levels]);
      
      toast({
        title: "Level Updated",
        description: `"${formData.name}" education level has been updated successfully.`,
      });
    }
    
    closeModal('level');
  };

  // Grade CRUD Operations
  const handleAddGrade = () => {
    if (!selectedLevel) return;
    openModal('grade', 'create');
  };

  const handleEditGrade = (grade: Grade) => {
    openModal('grade', 'edit', grade);
  };

  const handleDeleteGrade = (grade: Grade) => {
    const cascadeInfo = getCascadeDeleteInfo(classesStore, 'grade', grade.id);
    
    if (cascadeInfo && cascadeInfo.hasChildren) {
      setCascadeDeleteState({
        open: true,
        type: 'grade',
        item: grade,
        cascadeInfo: {
          subGradeCount: cascadeInfo.counts.subGrades,
          studentCount: cascadeInfo.counts.students
        }
      });
    } else {
      setModals(prev => ({
        ...prev,
        confirmDelete: {
          isOpen: true,
          type: 'grade',
          item: grade,
          title: 'Delete Grade',
          description: `Are you sure you want to delete "${grade.name}"? This action cannot be undone.`,
          itemName: grade.name
        }
      }));
    }
  };

  const handleGradeSubmit = (formData: { name: string; order?: number }) => {
    if (!selectedLevel) return;
    
    if (!validateGradeName(selectedLevel, formData.name, modals.grade.mode === 'edit' ? modals.grade.data?.id : undefined)) {
      toast({
        title: "Validation Error",
        description: "A grade with this name already exists in this education level.",
        variant: "destructive"
      });
      return;
    }
    
    if (modals.grade.mode === 'create') {
      addGrade(classesStore, selectedLevel.id, formData.name, formData.order);
      regenerateDerivedClasses(classesStore);
      setLevels([...classesStore.levels]);
      
      toast({
        title: "Grade Added",
        description: `"${formData.name}" grade has been created successfully.`,
      });
    } else if (modals.grade.data) {
      updateGrade(classesStore, modals.grade.data.id, {
        name: formData.name,
        order: formData.order
      });
      regenerateDerivedClasses(classesStore);
      setLevels([...classesStore.levels]);
      
      toast({
        title: "Grade Updated",
        description: `"${formData.name}" grade has been updated successfully.`,
      });
    }
    
    closeModal('grade');
  };

  // SubGrade CRUD Operations
  const handleAddSubGrade = () => {
    if (!selectedGrade) return;
    openModal('subGrade', 'create');
  };

  const handleEditSubGrade = (subGrade: SubGrade) => {
    openModal('subGrade', 'edit', subGrade);
  };

  const handleDeleteSubGrade = (subGrade: SubGrade) => {
    const cascadeInfo = getCascadeDeleteInfo(classesStore, 'subgrade', subGrade.id);
    
    // Sub-grades always have student impact, so show cascade modal
    setCascadeDeleteState({
      open: true,
      type: 'subgrade',
      item: subGrade,
      cascadeInfo: {
        studentCount: cascadeInfo?.counts.students || 0
      }
    });
  };

  const handleSubGradeSubmit = (formData: { name: string; order?: number }) => {
    if (!selectedGrade) return;
    
    if (!validateSubGradeName(selectedGrade, formData.name, modals.subGrade.mode === 'edit' ? modals.subGrade.data?.id : undefined)) {
      toast({
        title: "Validation Error",
        description: "A sub-grade with this name already exists in this grade.",
        variant: "destructive"
      });
      return;
    }
    
    if (modals.subGrade.mode === 'create') {
      addSubGrade(classesStore, selectedGrade.id, formData.name, formData.order);
      regenerateDerivedClasses(classesStore);
      setLevels([...classesStore.levels]);
      
      toast({
        title: "Sub-grade Added",
        description: `"${formData.name}" sub-grade has been created successfully.`,
      });
    } else if (modals.subGrade.data) {
      updateSubGrade(classesStore, modals.subGrade.data.id, {
        name: formData.name,
        order: formData.order
      });
      regenerateDerivedClasses(classesStore);
      setLevels([...classesStore.levels]);
      
      toast({
        title: "Sub-grade Updated",
        description: `"${formData.name}" sub-grade has been updated successfully.`,
      });
    }
    
    closeModal('subGrade');
  };

  // Combination CRUD Operations
  const handleAddCombination = () => {
    if (!selectedGrade) {
      toast({
        title: "Selection Required",
        description: "Please select a grade to add a combination.",
        variant: "destructive"
      });
      return;
    }
    openModal('combination', 'create');
  };

  const handleEditCombination = (combination: Combination) => {
    openModal('combination', 'edit', combination);
  };

  const handleDeleteCombination = (combination: Combination) => {
    setModals(prev => ({
      ...prev,
      confirmDelete: {
        isOpen: true,
        type: 'combination',
        item: combination,
        title: 'Delete Combination',
        description: `Are you sure you want to delete the "${combination.name}" combination? This action cannot be undone.`,
        itemName: combination.name
      }
    }));
  };

  const handleCombinationSubmit = (formData: { name: string; order?: number }) => {
    if (!selectedGrade) {
      toast({
        title: "Error",
        description: "No grade selected.",
        variant: "destructive"
      });
      return;
    }

    const { mode, data: combination } = modals.combination;

    if (mode === 'create') {
      const newCombination = addCombination(classesStore, selectedGrade.id, formData.name, formData.order);
      
      if (newCombination) {
        regenerateDerivedClasses(classesStore);
        setLevels([...classesStore.levels]);
        
        toast({
          title: "Combination Created",
          description: `"${formData.name}" combination has been added successfully.`,
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to create combination.",
          variant: "destructive"
        });
      }
    } else if (mode === 'edit' && combination) {
      const success = updateCombination(classesStore, combination.id, formData.name, formData.order);
      
      if (success) {
        regenerateDerivedClasses(classesStore);
        setLevels([...classesStore.levels]);
        
        toast({
          title: "Combination Updated",
          description: `"${formData.name}" combination has been updated successfully.`,
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to update combination.",
          variant: "destructive"
        });
      }
    }
    
    closeModal('combination');
  };

  // Cascade Delete Confirmation Handler
  const handleCascadeDeleteConfirm = () => {
    const { type, item } = cascadeDeleteState;
    if (!item) return;

    let message = '';

    switch (type) {
      case 'level':
        const level = item as Level;
        deleteLevel(classesStore, level.id);
        message = `"${level.name}" education level and all its contents have been deleted.`;
        
        // Clear selection if deleted item was selected
        if (selectedLevelId === level.id) {
          setSelectedLevelId(undefined);
          setSelectedGradeId(undefined);
          setSelectedSubGradeId(undefined);
        }
        break;
        
      case 'grade':
        const grade = item as Grade;
        deleteGrade(classesStore, grade.id);
        message = `"${grade.name}" grade and all its sub-grades have been deleted.`;
        
        // Clear grade/subgrade selection if deleted
        if (selectedGradeId === grade.id) {
          setSelectedGradeId(undefined);
          setSelectedSubGradeId(undefined);
        }
        break;
        
      case 'subgrade':
        const subGrade = item as SubGrade;
        deleteSubGrade(classesStore, subGrade.id);
        message = `"${subGrade.name}" sub-grade has been deleted.`;
        
        // Clear subgrade selection if deleted
        if (selectedSubGradeId === subGrade.id) {
          setSelectedSubGradeId(undefined);
        }
        break;
    }

    regenerateDerivedClasses(classesStore);
    setLevels([...classesStore.levels]);
    setCascadeDeleteState({ open: false, type: null, item: null });
    
    toast({
      title: "Deleted Successfully",
      description: message,
    });
  };

  // Simple Delete Confirmation Handler
  const handleDeleteConfirm = () => {
    const { type, item } = modals.confirmDelete;
    if (!item) return;

    let message = '';

    switch (type) {
      case 'level':
        const level = item as Level;
        deleteLevel(classesStore, level.id);
        message = `"${level.name}" education level has been deleted.`;
        
        // Clear selection if deleted item was selected
        if (selectedLevelId === level.id) {
          setSelectedLevelId(undefined);
          setSelectedGradeId(undefined);
          setSelectedSubGradeId(undefined);
        }
        break;
        
      case 'grade':
        const grade = item as Grade;
        deleteGrade(classesStore, grade.id);
        message = `"${grade.name}" grade has been deleted.`;
        
        // Clear grade/subgrade selection if deleted
        if (selectedGradeId === grade.id) {
          setSelectedGradeId(undefined);
          setSelectedSubGradeId(undefined);
        }
        break;
        
      case 'subgrade':
        const subGrade = item as SubGrade;
        deleteSubGrade(classesStore, subGrade.id);
        message = `"${subGrade.name}" sub-grade has been deleted.`;
        
        // Clear subgrade selection if deleted
        if (selectedSubGradeId === subGrade.id) {
          setSelectedSubGradeId(undefined);
        }
        break;
        
      case 'combination':
        const combination = item as Combination;
        deleteCombination(classesStore, combination.id);
        message = `"${combination.name}" combination has been deleted.`;
        break;
    }

    regenerateDerivedClasses(classesStore);
    setLevels([...classesStore.levels]);
    closeModal('confirmDelete');
    
    toast({
      title: "Deleted Successfully",
      description: message,
    });
  };

  return (
    <div className="px-4 sm:px-6 md:px-8 py-6">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-blue-900">Classes Management</h1>
          <p className="text-blue-900/70 max-w-3xl">
            Manage your institution's education levels, grades, and sub-grades. Use the Set Up tab to create structure, and the Summary tab to review assigned students.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 text-center space-y-3">
            <div className="w-12 h-12 bg-brand-teal/20 rounded-xl flex items-center justify-center mx-auto">
              <GraduationCap className="w-6 h-6 text-brand-teal" />
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-900">{stats.totalLevels}</div>
              <div className="text-sm text-blue-900/80 font-medium">Education Levels</div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 text-center space-y-3">
            <div className="w-12 h-12 bg-brand-accent/20 rounded-xl flex items-center justify-center mx-auto">
              <BookOpen className="w-6 h-6 text-brand-accent" />
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-900">{stats.totalGrades}</div>
              <div className="text-sm text-blue-900/80 font-medium">Grades</div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 text-center space-y-3">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto">
              <Users className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-900">{stats.totalSubGrades}</div>
              <div className="text-sm text-blue-900/80 font-medium">Sub-grades</div>
            </div>
          </div>
        </div>

        {/* Main Tabs */}
        <div className="space-y-6">
          <div className="flex space-x-1 p-1 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <button
              onClick={() => setActiveTab('setup')}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeTab === 'setup'
                  ? 'bg-white/20 text-white shadow-sm'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              Set Up
            </button>
            <button
              onClick={() => setActiveTab('summary')}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeTab === 'summary'
                  ? 'bg-white/20 text-white shadow-sm'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              Summary
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'setup' && (
            <div className="space-y-6">
              {/* Class Name Logic Demo */}
              <ClassNameDemo selectedGradeId={selectedGradeId} />

              {/* Four-panel Classes Manager */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
                {/* Levels Panel */}
                <LevelsPanel
                  levels={levels}
                  selectedLevel={selectedLevel}
                  onSelectLevel={handleSelectLevel}
                  onAddLevel={handleAddLevel}
                  onEditLevel={handleEditLevel}
                  onDeleteLevel={handleDeleteLevel}
                  itemsPerPage={20}
                  visibleColumns={{ order: true, count: true }}
                />

                {/* Grades Panel */}
                <GradesPanel
                  grades={currentGrades}
                  selectedGrade={selectedGrade}
                  onSelectGrade={handleSelectGrade}
                  onAddGrade={handleAddGrade}
                  onEditGrade={handleEditGrade}
                  onDeleteGrade={handleDeleteGrade}
                  hasSelectedLevel={!!selectedLevel}
                  itemsPerPage={20}
                  visibleColumns={{ order: true, count: true }}
                />

                {/* Subject Combinations Card */}
                <CombinationsCard
                  selectedGrade={selectedGrade}
                  selectedLevel={selectedLevel}
                  hasSelectedGrade={!!selectedGrade}
                  onAddCombination={handleAddCombination}
                  onEditCombination={handleEditCombination}
                  onDeleteCombination={handleDeleteCombination}
                  onUpdate={() => setLevels([...classesStore.levels])}
                />

                {/* Sub-grades Panel */}
                <SubGradesPanel
                  subGrades={currentSubGrades}
                  selectedSubGrade={selectedSubGrade}
                  selectedGrade={selectedGrade}
                  onSelectSubGrade={handleSelectSubGrade}
                  onAddSubGrade={handleAddSubGrade}
                  onEditSubGrade={handleEditSubGrade}
                  onDeleteSubGrade={handleDeleteSubGrade}
                  hasSelectedGrade={!!selectedGrade}
                  itemsPerPage={20}
                  visibleColumns={{ order: true, count: true }}
                />
              </div>
            </div>
          )}

          {activeTab === 'summary' && (
            <ClassesSummaryView
              levels={levels}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              itemsPerPage={itemsPerPage}
              onItemsPerPageChange={setItemsPerPage}
              visibleColumns={visibleColumns}
              onColumnVisibilityChange={(column: string, visible: boolean) => {
                setVisibleColumns(prev => ({ ...prev, [column]: visible }));
              }}
            />
          )}
        </div>
      </div>

      {/* Modals */}
      <LevelModal
        isOpen={modals.level.isOpen}
        onClose={() => closeModal('level')}
        onSubmit={handleLevelSubmit}
        mode={modals.level.mode}
        level={modals.level.data}
        existingLevels={levels}
      />

      <GradeModal
        isOpen={modals.grade.isOpen}
        onClose={() => closeModal('grade')}
        onSubmit={handleGradeSubmit}
        mode={modals.grade.mode}
        grade={modals.grade.data}
        parentLevel={selectedLevel || { id: '', name: '', order: 0, grades: [] }}
      />

      <SubGradeModal
        isOpen={modals.subGrade.isOpen}
        onClose={() => closeModal('subGrade')}
        onSubmit={handleSubGradeSubmit}
        mode={modals.subGrade.mode}
        subGrade={modals.subGrade.data}
        parentGrade={selectedGrade || { id: '', name: '', order: 0, subGrades: [] }}
      />

      <CombinationModal
        isOpen={modals.combination.isOpen}
        onClose={() => closeModal('combination')}
        onSubmit={handleCombinationSubmit}
        mode={modals.combination.mode}
        combination={modals.combination.data}
        parentLevel={selectedLevel}
        parentGrade={selectedGrade}
      />

      <ConfirmDeleteModal
        isOpen={modals.confirmDelete.isOpen}
        onClose={() => closeModal('confirmDelete')}
        onConfirm={handleDeleteConfirm}
        title={modals.confirmDelete.title}
        description={modals.confirmDelete.description}
        itemName={modals.confirmDelete.itemName}
        itemType="level"
      />

      <CascadeDeleteModal
        isOpen={cascadeDeleteState.open}
        onClose={() => setCascadeDeleteState({ open: false, type: null, item: null })}
        onConfirm={handleCascadeDeleteConfirm}
        type={cascadeDeleteState.type}
        item={cascadeDeleteState.item}
        cascadeInfo={cascadeDeleteState.cascadeInfo}
      />
    </div>
  );
}