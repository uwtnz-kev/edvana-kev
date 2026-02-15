import React from 'react';
import { HelpCircle } from 'lucide-react';
import { QuickActions, SupportForm, TicketsTable } from '../components/support/index';
import { TicketsProvider } from '../components/support/TicketsContext';

export default function SupportView() {
  return (
    <TicketsProvider>
      <div className="px-4 sm:px-6 md:px-8 py-6">
        <div className="space-y-6">
          {/* Page Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-blue-900">Support</h1>
            <p className="text-blue-900/70 max-w-3xl">
              Reach out to the Edvana team for help, questions, or feedback.
            </p>
          </div>

          {/* Quick Actions */}
          <QuickActions />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
            {/* Support Form */}
            <div className="order-1 xl:order-1">
              <SupportForm />
            </div>

            {/* All Tickets Table */}
            <div className="order-2 xl:order-2 xl:col-span-1">
              <div className="overflow-x-auto">
                <TicketsTable />
              </div>
            </div>
          </div>
        </div>
      </div>
    </TicketsProvider>
  );
}