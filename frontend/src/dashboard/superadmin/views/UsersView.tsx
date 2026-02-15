import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Users, UserPlus } from 'lucide-react';

export function UsersView() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Global User Management</h1>
          <p className="text-gray-600 mt-1">Manage users across all schools and institutions</p>
        </div>
        <Button className="glass-button text-white">
          <UserPlus className="h-4 w-4 mr-2" />
          Create User
        </Button>
      </div>

      <div className="glass-card-elevated p-6">
        <h2 className="text-xl font-semibold mb-4">Global user management coming soon</h2>
        <p className="text-gray-600">
          This section will provide platform-wide user management, role assignments, 
          permissions management, and user analytics across all schools.
        </p>
      </div>
    </div>
  );
}