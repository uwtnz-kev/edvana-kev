import React, { createContext, useContext, useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

export interface Ticket {
  id: string;
  subject: string;
  category: 'Technical Issue' | 'Billing' | 'Account' | 'Other';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  description: string;
  attachment?: {
    name: string;
    size: number;
    type: string;
  };
  createdAt: string;
  updatedAt: string;
  statusHistory: {
    status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
    timestamp: string;
    comment?: string;
  }[];
}

interface TicketsContextType {
  tickets: Ticket[];
  addTicket: (ticket: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt' | 'statusHistory'>) => string;
  updateTicketStatus: (id: string, status: Ticket['status'], comment?: string) => void;
  getTicket: (id: string) => Ticket | undefined;
}

const TicketsContext = createContext<TicketsContextType | undefined>(undefined);

// Initial mock tickets for demonstration
const initialTickets: Ticket[] = [
  {
    id: 'TCK-DEMO1',
    subject: 'Unable to generate student reports',
    category: 'Technical Issue',
    status: 'In Progress',
    description: 'When clicking the "Generate Report" button, the system shows a loading spinner but never completes the process. This is affecting our ability to prepare for parent-teacher conferences.',
    createdAt: '2024-01-15T08:30:00Z',
    updatedAt: '2024-01-16T10:15:00Z',
    statusHistory: [
      { status: 'Open', timestamp: '2024-01-15T08:30:00Z' },
      { status: 'In Progress', timestamp: '2024-01-16T10:15:00Z', comment: 'Assigned to technical team for investigation' }
    ]
  },
  {
    id: 'TCK-DEMO2',
    subject: 'Billing question about monthly charges',
    category: 'Billing',
    status: 'Resolved',
    description: 'I noticed an unexpected charge on our monthly invoice. Could you please clarify what this represents?',
    createdAt: '2024-01-14T14:20:00Z',
    updatedAt: '2024-01-15T09:45:00Z',
    statusHistory: [
      { status: 'Open', timestamp: '2024-01-14T14:20:00Z' },
      { status: 'In Progress', timestamp: '2024-01-14T16:30:00Z', comment: 'Forwarded to billing department' },
      { status: 'Resolved', timestamp: '2024-01-15T09:45:00Z', comment: 'Charge clarification provided via email' }
    ]
  }
];

export function TicketsProvider({ children }: { children: React.ReactNode }) {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    // Load tickets from localStorage or use initial mock data
    const stored = localStorage.getItem('support-tickets');
    if (stored) {
      try {
        const parsedTickets = JSON.parse(stored);
        setTickets(parsedTickets);
      } catch (error) {
        console.error('Error loading tickets:', error);
        setTickets(initialTickets);
      }
    } else {
      setTickets(initialTickets);
    }
  }, []);

  useEffect(() => {
    // Save tickets to localStorage whenever they change
    localStorage.setItem('support-tickets', JSON.stringify(tickets));
  }, [tickets]);

  const addTicket = (ticketData: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt' | 'statusHistory'>) => {
    const ticketId = `TCK-${nanoid(5).toUpperCase()}`;
    const now = new Date().toISOString();
    
    const newTicket: Ticket = {
      ...ticketData,
      id: ticketId,
      status: 'Open',
      createdAt: now,
      updatedAt: now,
      statusHistory: [
        { status: 'Open', timestamp: now }
      ]
    };

    setTickets(prev => [newTicket, ...prev]);
    return ticketId;
  };

  const updateTicketStatus = (id: string, status: Ticket['status'], comment?: string) => {
    setTickets(prev => prev.map(ticket => {
      if (ticket.id === id) {
        const now = new Date().toISOString();
        return {
          ...ticket,
          status,
          updatedAt: now,
          statusHistory: [
            ...ticket.statusHistory,
            { status, timestamp: now, comment }
          ]
        };
      }
      return ticket;
    }));
  };

  const getTicket = (id: string) => {
    return tickets.find(ticket => ticket.id === id);
  };

  return (
    <TicketsContext.Provider value={{ tickets, addTicket, updateTicketStatus, getTicket }}>
      {children}
    </TicketsContext.Provider>
  );
}

export function useTickets() {
  const context = useContext(TicketsContext);
  if (context === undefined) {
    throw new Error('useTickets must be used within a TicketsProvider');
  }
  return context;
}