import React, { useState, useMemo, useEffect } from 'react';
import { Eye, Clock, CheckCircle, AlertCircle, XCircle, Search, Filter, ChevronDown, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import ViewTicketModal from './ViewTicketModal';
import { useTickets, Ticket } from './TicketsContext';
import { GlassSelect, GlassSelectContent, GlassSelectItem, GlassSelectTrigger, GlassSelectValue } from '../ui/GlassSelect';

export default function TicketsTable() {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [editingStatus, setEditingStatus] = useState<string | null>(null);
  
  const { tickets, updateTicketStatus } = useTickets();
  const { toast } = useToast();

  // Filter and search tickets
  const filteredTickets = useMemo(() => {
    return tickets.filter(ticket => {
      const matchesSearch = ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           ticket.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || ticket.category === categoryFilter;
      
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [tickets, searchQuery, statusFilter, categoryFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTickets = filteredTickets.slice(startIndex, startIndex + itemsPerPage);

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, categoryFilter]);

  const handleStatusChange = async (ticketId: string, newStatus: Ticket['status']) => {
    try {
      updateTicketStatus(ticketId, newStatus, `Status changed to ${newStatus}`);
      setEditingStatus(null);
      toast({
        title: "Status Updated",
        description: `Ticket status changed to ${newStatus}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update ticket status",
        variant: "destructive",
      });
    }
  };

  const getStatusIcon = (status: Ticket['status']) => {
    switch (status) {
      case 'Open': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'In Progress': return <AlertCircle className="w-4 h-4 text-orange-500" />;
      case 'Resolved': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Closed': return <XCircle className="w-4 h-4 text-gray-500" />;
      default: return <Clock className="w-4 h-4 text-blue-500" />;
    }
  };

  const getStatusColor = (status: Ticket['status']) => {
    switch (status) {
      case 'Open': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'In Progress': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'Closed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const formatDate = (isoString: string) => {
    try {
      return new Date(isoString).toLocaleDateString();
    } catch (error) {
      return isoString;
    }
  };

  return (
    <>
      <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-brand-teal/20 rounded-xl flex items-center justify-center">
            <Clock className="w-5 h-5 text-brand-teal" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-900">Support Tickets</h3>
            <p className="text-sm text-blue-900/70">
              {filteredTickets.length} ticket{filteredTickets.length !== 1 ? 's' : ''}
              {tickets.length !== filteredTickets.length && ` (${tickets.length} total)`}
            </p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="space-y-4 mb-6">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-900/50 w-4 h-4" />
              <Input
                placeholder="Search by ticket ID or subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/20 border-white/20 text-blue-900 placeholder:text-blue-900/60 rounded-xl focus:ring-2 focus:ring-brand-accent focus:ring-offset-2"
                aria-label="Search tickets by ID or subject"
              />
            </div>
            
            <div className="flex gap-2">
              <GlassSelect value={statusFilter} onValueChange={setStatusFilter}>
                <GlassSelectTrigger className="w-40 bg-white/20 border-white/20 text-blue-900 focus:ring-2 focus:ring-brand-accent focus:ring-offset-2">
                  <Filter className="w-4 h-4 mr-2" />
                  <GlassSelectValue placeholder="Status" className="text-blue-900" />
                </GlassSelectTrigger>
                <GlassSelectContent className="bg-white/20 border-white/20 backdrop-blur-xl">
                  <GlassSelectItem value="all" className="text-blue-900 hover:bg-white/30">All Status</GlassSelectItem>
                  <GlassSelectItem value="Open" className="text-blue-900 hover:bg-white/30">Open</GlassSelectItem>
                  <GlassSelectItem value="In Progress" className="text-blue-900 hover:bg-white/30">In Progress</GlassSelectItem>
                  <GlassSelectItem value="Resolved" className="text-blue-900 hover:bg-white/30">Resolved</GlassSelectItem>
                  <GlassSelectItem value="Closed" className="text-blue-900 hover:bg-white/30">Closed</GlassSelectItem>
                </GlassSelectContent>
              </GlassSelect>

              <GlassSelect value={categoryFilter} onValueChange={setCategoryFilter}>
                <GlassSelectTrigger className="w-44 bg-white/20 border-white/20 text-blue-900 focus:ring-2 focus:ring-brand-accent focus:ring-offset-2">
                  <GlassSelectValue placeholder="Category" className="text-blue-900" />
                </GlassSelectTrigger>
                <GlassSelectContent className="bg-white/20 border-white/20 backdrop-blur-xl">
                  <GlassSelectItem value="all" className="text-blue-900 hover:bg-white/30">All Categories</GlassSelectItem>
                  <GlassSelectItem value="Technical Issue" className="text-blue-900 hover:bg-white/30">Technical Issue</GlassSelectItem>
                  <GlassSelectItem value="Billing" className="text-blue-900 hover:bg-white/30">Billing</GlassSelectItem>
                  <GlassSelectItem value="Account" className="text-blue-900 hover:bg-white/30">Account</GlassSelectItem>
                  <GlassSelectItem value="Other" className="text-blue-900 hover:bg-white/30">Other</GlassSelectItem>
                </GlassSelectContent>
              </GlassSelect>
            </div>
          </div>

          {/* Items per page */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-blue-900/70">
              <span>Show</span>
              <GlassSelect value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
                <GlassSelectTrigger className="w-20 bg-white/20 border-white/20 text-blue-900 focus:ring-2 focus:ring-brand-accent focus:ring-offset-2">
                  <GlassSelectValue className="text-blue-900" />
                </GlassSelectTrigger>
                <GlassSelectContent className="bg-white/20 border-white/20 backdrop-blur-xl">
                  <GlassSelectItem value="20" className="text-blue-900 hover:bg-white/30">20</GlassSelectItem>
                  <GlassSelectItem value="50" className="text-blue-900 hover:bg-white/30">50</GlassSelectItem>
                  <GlassSelectItem value="100" className="text-blue-900 hover:bg-white/30">100</GlassSelectItem>
                </GlassSelectContent>
              </GlassSelect>
              <span>items</span>
            </div>
            
            {filteredTickets.length > 0 && (
              <div className="text-sm text-blue-900/70">
                Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredTickets.length)} of {filteredTickets.length}
              </div>
            )}
          </div>
        </div>

        {/* Table */}
        {paginatedTickets.length > 0 ? (
          <div className="space-y-2 min-w-full overflow-x-auto">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 p-3 text-sm font-medium text-blue-900/70 border-b border-white/20 min-w-[800px]">
              <div className="col-span-2">Ticket ID</div>
              <div className="col-span-3">Subject</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Created</div>
              <div className="col-span-1">Actions</div>
            </div>

            {/* Table Rows */}
            {paginatedTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="grid grid-cols-12 gap-4 p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-colors min-w-[800px]"
              >
                <div className="col-span-2">
                  <span className="text-xs font-mono text-blue-900">{ticket.id}</span>
                </div>
                
                <div className="col-span-3">
                  <p className="font-medium text-black truncate" title={ticket.subject}>
                    {ticket.subject}
                  </p>
                </div>
                
                <div className="col-span-2">
                  <span className="text-sm text-black/70">{ticket.category}</span>
                </div>
                
                <div className="col-span-2">
                  {editingStatus === ticket.id ? (
                    <GlassSelect 
                      value={ticket.status} 
                      onValueChange={(value) => handleStatusChange(ticket.id, value as Ticket['status'])}
                    >
                      <GlassSelectTrigger className="h-8 text-xs bg-white/20 border-white/20 text-blue-900 focus:ring-2 focus:ring-brand-accent focus:ring-offset-2">
                        <GlassSelectValue className="text-blue-900" />
                      </GlassSelectTrigger>
                      <GlassSelectContent className="bg-white/20 border-white/20 backdrop-blur-xl">
                        <GlassSelectItem value="Open" className="text-blue-900 hover:bg-white/30">Open</GlassSelectItem>
                        <GlassSelectItem value="In Progress" className="text-blue-900 hover:bg-white/30">In Progress</GlassSelectItem>
                        <GlassSelectItem value="Resolved" className="text-blue-900 hover:bg-white/30">Resolved</GlassSelectItem>
                        <GlassSelectItem value="Closed" className="text-blue-900 hover:bg-white/30">Closed</GlassSelectItem>
                      </GlassSelectContent>
                    </GlassSelect>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={`text-xs ${getStatusColor(ticket.status)}`}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(ticket.status)}
                          {ticket.status}
                        </div>
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingStatus(ticket.id)}
                        className="h-6 w-6 p-0 text-blue-900/50 hover:text-blue-900 hover:bg-white/20 rounded focus:ring-2 focus:ring-brand-accent focus:ring-offset-2"
                        aria-label="Edit ticket status"
                      >
                        <Edit3 className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="col-span-2">
                  <span className="text-sm text-black/70">{formatDate(ticket.createdAt)}</span>
                </div>
                
                <div className="col-span-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedTicket(ticket)}
                    className="h-8 w-8 p-0 text-blue-900 hover:text-white hover:bg-white/20 rounded-lg focus:ring-2 focus:ring-brand-accent focus:ring-offset-2"
                    aria-label="View ticket details"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 max-w-md mx-auto">
              <Clock className="w-16 h-16 text-blue-900/30 mx-auto mb-4" />
              <p className="text-blue-900/70 font-medium mb-2">No tickets yet</p>
              <p className="text-sm text-blue-900/50">Submit your first request using the form above</p>
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/20">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="bg-white/20 border-white/20 text-blue-900 hover:bg-white/30 hover:text-white disabled:opacity-50 rounded-xl focus:ring-2 focus:ring-brand-accent focus:ring-offset-2"
                aria-label="Go to previous page"
              >
                Previous
              </Button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                      className={
                        currentPage === pageNum
                          ? "bg-brand-accent text-white rounded-xl focus:ring-2 focus:ring-brand-accent focus:ring-offset-2"
                          : "bg-white/20 border-white/20 text-blue-900 hover:bg-white/30 hover:text-white rounded-xl focus:ring-2 focus:ring-brand-accent focus:ring-offset-2"
                      }
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="bg-white/20 border-white/20 text-blue-900 hover:bg-white/30 hover:text-white disabled:opacity-50 rounded-xl focus:ring-2 focus:ring-brand-accent focus:ring-offset-2"
                aria-label="Go to next page"
              >
                Next
              </Button>
            </div>
            
            <div className="text-sm text-blue-900/70">
              Page {currentPage} of {totalPages}
            </div>
          </div>
        )}

        {/* Bottom padding */}
        <div className="h-4"></div>
      </div>

      <ViewTicketModal
        ticket={selectedTicket}
        isOpen={!!selectedTicket}
        onClose={() => setSelectedTicket(null)}
      />
    </>
  );
}