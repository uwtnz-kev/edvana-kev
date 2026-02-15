import React from 'react';
import { Building, Globe, Calendar, Clock, MapPin, Phone, Mail, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function GeneralSummary() {
  const schoolInfo = {
    name: 'Edvana International School',
    description: 'A leading educational institution committed to excellence in learning and character development.',
    website: 'https://edvana.edu.rw',
    phone: '+250 788 123 456',
    email: 'info@edvana.edu.rw',
    address: 'KG 123 St, Kigali, Rwanda',
    academicYear: '2024-2025',
    timezone: 'Africa/Kigali (CAT)',
    language: 'English',
    established: '2010',
    lastUpdated: '2024-12-15'
  };

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-brand-teal/20 rounded-2xl flex items-center justify-center">
            <Building className="w-8 h-8 text-brand-teal" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-blue-900 mb-2">{schoolInfo.name}</h2>
            <p className="text-blue-900/70 mb-4">{schoolInfo.description}</p>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-brand-accent/20 text-brand-accent border border-brand-accent/40">
                Established {schoolInfo.established}
              </Badge>
              <Badge className="bg-green-500/20 text-green-600 border border-green-500/40">
                Academic Year {schoolInfo.academicYear}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/20 p-4 text-center">
          <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Globe className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-sm text-blue-900/70 mb-1">Primary Language</div>
          <div className="font-semibold text-blue-900">{schoolInfo.language}</div>
        </div>

        <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/20 p-4 text-center">
          <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Clock className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-sm text-blue-900/70 mb-1">Timezone</div>
          <div className="font-semibold text-blue-900 text-sm">CAT</div>
        </div>

        <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/20 p-4 text-center">
          <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Calendar className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-sm text-blue-900/70 mb-1">Academic Year</div>
          <div className="font-semibold text-blue-900">{schoolInfo.academicYear}</div>
        </div>

        <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/20 p-4 text-center">
          <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Building className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-sm text-blue-900/70 mb-1">Established</div>
          <div className="font-semibold text-blue-900">{schoolInfo.established}</div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-brand-accent/20 rounded-lg flex items-center justify-center">
                <Phone className="w-4 h-4 text-brand-accent" />
              </div>
              <div>
                <div className="text-sm text-blue-900/70">Phone</div>
                <div className="text-blue-900 font-medium">{schoolInfo.phone}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-brand-teal/20 rounded-lg flex items-center justify-center">
                <Mail className="w-4 h-4 text-brand-teal" />
              </div>
              <div>
                <div className="text-sm text-blue-900/70">Email</div>
                <div className="text-blue-900 font-medium">{schoolInfo.email}</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center mt-0.5">
                <MapPin className="w-4 h-4 text-purple-400" />
              </div>
              <div>
                <div className="text-sm text-blue-900/70">Address</div>
                <div className="text-blue-900 font-medium">{schoolInfo.address}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                <ExternalLink className="w-4 h-4 text-green-500" />
              </div>
              <div>
                <div className="text-sm text-blue-900/70">Website</div>
                <a 
                  href={schoolInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-accent font-medium hover:underline"
                >
                  {schoolInfo.website}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Last Updated */}
      <div className="text-center text-sm text-blue-900/60">
        Last updated: {new Date(schoolInfo.lastUpdated).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </div>
    </div>
  );
}