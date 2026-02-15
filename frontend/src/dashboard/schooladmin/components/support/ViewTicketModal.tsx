import React from 'react';
import { X, Clock, User, Tag, AlertTriangle, MessageSquare, FileText, Paperclip, CheckCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Ticket } from './TicketsContext';

interface ViewTicketModalProps {
  ticket: Ticket | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ViewTicketModal({ ticket, isOpen, onClose }: ViewTicketModalProps) {
  if (!ticket) return null;

  const getStatusColor = (status: Ticket['status']) => {
    switch (status) {
      case 'Open': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'In Progress': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'Closed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getStatusIcon = (status: Ticket['status']) => {
    switch (status) {
      case 'Open': return <Clock className="w-4 h-4 text-blue-400" />;
      case 'In Progress': return <AlertTriangle className="w-4 h-4 text-orange-400" />;
      case 'Resolved': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'Closed': return <X className="w-4 h-4 text-gray-400" />;
      default: return <Clock className="w-4 h-4 text-blue-400" />;
    }
  };

  const formatDateTime = (isoString: string) => {
    try {
      return new Date(isoString).toLocaleString();
    } catch (error) {
      return isoString;
    }
  };

  const formatFileSize = (bytes: number) => {
    return (bytes / 1024 / 1024).toFixed(1) + ' MB';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900/95 backdrop-blur-xl border-gray-700 text-white max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader className="border-b border-gray-700 pb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-xl font-semibold text-white mb-2">
                {ticket.subject}
              </DialogTitle>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-mono text-gray-400">{ticket.id}</span>
                <Badge variant="outline" className={`text-xs ${getStatusColor(ticket.status)}`}>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(ticket.status)}
                    {ticket.status}
                  </div>
                </Badge>
                <Badge variant="outline" className="text-xs bg-purple-100 text-purple-800 border-purple-200">
                  {ticket.category}
                </Badge>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-gray-800 rounded-lg"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          <div className="space-y-6 p-1">
            {/* Ticket Details */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <div>
                    <div className="text-gray-400">Created</div>
                    <div className="text-white font-medium">{formatDateTime(ticket.createdAt)}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-green-400" />
                  <div>
                    <div className="text-gray-400">Last Updated</div>
                    <div className="text-white font-medium">{formatDateTime(ticket.updatedAt)}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-purple-400" />
                  <div>
                    <div className="text-gray-400">Category</div>
                    <div className="text-white font-medium">{ticket.category}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-4">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-5 h-5 text-blue-400" />
                <h4 className="text-lg font-semibold text-white">Description</h4>
              </div>
              <div className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                {ticket.description}
              </div>
            </div>

            {/* Attachment */}
            {ticket.attachment && (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Paperclip className="w-5 h-5 text-green-400" />
                  <h4 className="text-lg font-semibold text-white">Attachment</h4>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-medium">{ticket.attachment.name}</div>
                    <div className="text-sm text-gray-400">
                      {ticket.attachment.type} • {formatFileSize(ticket.attachment.size)}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Status Timeline */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-4">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-orange-400" />
                <h4 className="text-lg font-semibold text-white">Status History</h4>
              </div>
              
              <div className="space-y-4">
                {ticket.statusHistory.map((history, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                      {getStatusIcon(history.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white">Status changed to {history.status}</span>
                        <Badge variant="outline" className={`text-xs ${getStatusColor(history.status)}`}>
                          {history.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-400 mt-1">
                        {formatDateTime(history.timestamp)}
                      </div>
                      {history.comment && (
                        <div className="text-sm text-gray-300 mt-2 p-2 bg-gray-700/50 rounded">
                          {history.comment}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-4">
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white rounded-xl focus:ring-2 focus:ring-brand-accent focus:ring-offset-2"
              aria-label="Close ticket details"
            >
              <X className="w-4 h-4 mr-2" />
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}