import React, { useState, useMemo } from 'react';
import { 
  EdvanaBankHeader, 
  EdvanaBankStats, 
  EdvanaBankToolbar, 
  EdvanaBankCard,
  EdvanaBankCardGrid,
  EdvanaBankPreviewModal,
  PublishToSchoolModal,
  EdvanaBankPagination,
  mockBankItems,
  getPaginatedResources,
  edvanaBankData,
  getFilteredItems,
  getPaginatedItems,
  getDataStats
} from '../components/edvana-bank';

export default function EdvanaBankView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [selectedCombination, setSelectedCombination] = useState('all');
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleColumns, setVisibleColumns] = useState(['title', 'type', 'subject', 'grade', 'author', 'uploadDate', 'downloads', 'rating']);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [publishItem, setPublishItem] = useState<any>(null);

  // Filter resources using the new structured data
  const filteredResources = useMemo(() => {
    return getFilteredItems({
      search: searchQuery,
      type: selectedType === 'all' ? undefined : selectedType.toLowerCase(),
      subject: selectedSubject === 'all' ? undefined : selectedSubject,
      grade: selectedGrade === 'all' ? undefined : selectedGrade,
      combination: selectedCombination === 'all' ? undefined : selectedCombination
    });
  }, [searchQuery, selectedType, selectedSubject, selectedGrade, selectedCombination]);

  // Get paginated results
  const paginatedData = useMemo(() => {
    return getPaginatedItems(filteredResources, currentPage, itemsPerPage);
  }, [filteredResources, currentPage, itemsPerPage]);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedType, selectedSubject, selectedGrade, selectedCombination, itemsPerPage]);

  const handlePreview = (id: string) => {
    const item = edvanaBankData.find(item => item.id === id);
    if (item) {
      setSelectedItem({
        ...item,
        combination: item.combinationId,
        publishedDate: item.createdAt,
        downloadCount: item.downloads
      });
      setShowPreviewModal(true);
    }
  };

  const handlePublishToSchool = (id: string) => {
    const item = edvanaBankData.find(item => item.id === id);
    if (item) {
      setPublishItem({
        ...item,
        grade: item.gradeId,
        combination: item.combinationId
      });
      setShowPublishModal(true);
    }
  };

  const handlePublish = (selections: any) => {
    console.log('Publishing item:', publishItem?.id, 'to selections:', selections);
    // Here you would implement the actual publish logic
    setShowPublishModal(false);
    setPublishItem(null);
  };

  const handleClosePublish = () => {
    setShowPublishModal(false);
    setPublishItem(null);
  };

  const handleClosePreview = () => {
    setShowPreviewModal(false);
    setSelectedItem(null);
  };

  return (
    <div className="px-4 sm:px-6 md:px-8 py-6">
      <div className="space-y-6">
        <EdvanaBankHeader />
        <EdvanaBankStats />
        
        <EdvanaBankToolbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          selectedSubject={selectedSubject}
          setSelectedSubject={setSelectedSubject}
          selectedGrade={selectedGrade}
          setSelectedGrade={setSelectedGrade}
          selectedCombination={selectedCombination}
          setSelectedCombination={setSelectedCombination}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          viewMode={viewMode}
          setViewMode={setViewMode}
          totalItems={filteredResources.length}
          visibleColumns={visibleColumns}
          setVisibleColumns={setVisibleColumns}
        />

        {viewMode === 'grid' ? (
          <EdvanaBankCardGrid>
            {paginatedData.items?.map((item) => (
              <EdvanaBankCard
                key={item.id}
                id={item.id}
                title={item.title}
                type={item.type === 'exam' ? 'Exam' : 'Resource'}
                subject={item.subject}
                grade={item.gradeId}
                combination={item.combinationId}
                publishedDate={item.createdAt}
                onPreview={handlePreview}
                onPublishToSchool={handlePublishToSchool}
                isSchoolAdmin={true}
              />
            ))}
          </EdvanaBankCardGrid>
        ) : (
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
            <div className="text-center text-blue-900/70">
              List view coming soon...
            </div>
          </div>
        )}

        {paginatedData.totalPages > 1 && (
          <EdvanaBankPagination
            currentPage={currentPage}
            totalPages={paginatedData.totalPages}
            totalItems={paginatedData.totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        )}

        <EdvanaBankPreviewModal
          isOpen={showPreviewModal}
          onClose={handleClosePreview}
          item={selectedItem}
        />

        <PublishToSchoolModal
          isOpen={showPublishModal}
          onClose={handleClosePublish}
          item={publishItem}
          onPublish={handlePublish}
        />
      </div>
    </div>
  );
}