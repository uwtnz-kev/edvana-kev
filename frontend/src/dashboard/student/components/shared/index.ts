// Shared/Reusable components for student dashboard
// These components are used across multiple views and provide consistent UI patterns

// Core shared components used across multiple views
export { StatCard } from "./StatCard";
export { DashboardCard } from "./DashboardCard";
export { ProgressBar } from "./ProgressBar";
export { PageHeader } from "./PageHeader";
export { StatusBadge } from "./StatusBadge";

// Shared data handling components
export { SearchInput } from "./SearchInput";
export { FilterDropdown } from "./FilterDropdown";
export { SortControls } from "./SortControls";
export { PaginationControls } from "./PaginationControls";
export { DataControls } from "./DataControls";

// Overview components - only exported here as they're used specifically in OverviewView
export { StudentGreeting } from "../overview/StudentGreeting";
export { SummaryCards } from "../overview/SummaryCards";
export { WeeklyProgress } from "../overview/WeeklyProgress";

/*
 * Note: View-specific components are not exported here to maintain clear separation.
 * Import them directly from their specific directories:
 * 
 * - Subject components: import from "../subjects/..."
 * - Exam components: import from "../exams/..."
 * - Assignment components: import from "../assignments/..."
 * - Support components: import from "../support/..."
 * - AI Tutor components: import from "../ai-tutor/..."
 * 
 * This approach keeps the index file focused on truly shared components
 * and makes component dependencies more explicit in each view.
 */