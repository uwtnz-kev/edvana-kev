import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { OverviewView } from './views/OverviewView';

// Student-specific routing within the dashboard
export function StudentRoutes() {
  return (
    <Routes>
      <Route path="/" element={<OverviewView />} />
      <Route path="/curriculum" element={
        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Curriculum</h2>
          <p className="text-gray-600">Browse your CBC curriculum and lessons</p>
        </div>
      } />
      <Route path="/exams" element={
        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Exams & Assessments</h2>
          <p className="text-gray-600">Take quizzes and view your assessment results</p>
        </div>
      } />
      <Route path="/progress" element={
        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Progress Tracking</h2>
          <p className="text-gray-600">Monitor your learning progress and achievements</p>
        </div>
      } />
      <Route path="/settings" element={
        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Settings</h2>
          <p className="text-gray-600">Manage your account and preferences</p>
        </div>
      } />
      <Route path="*" element={
        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Page Not Found</h2>
          <p className="text-gray-600">The requested page doesn't exist</p>
        </div>
      } />
    </Routes>
  );
}