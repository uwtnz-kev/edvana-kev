Constants Folder Purpose
========================

This folder contains global constants, enums, and string literals used throughout the application.

Organization:
- roles.ts: User role definitions and permissions
- apiRoutes.ts: API endpoint constants to avoid hardcoded URLs
- curriculum.ts: CBC-specific constants (levels, subjects, competencies)

Best Practices:
1. Use const assertions (as const) for immutable objects
2. Export both the object and derived types when needed
3. Keep constants organized by feature/domain
4. Use SCREAMING_SNAKE_CASE for constant keys
5. Provide clear, descriptive names

Example Usage:
import { USER_ROLES, UserRole } from '../constants/roles';
import { API_ROUTES } from '../constants/apiRoutes';
import { CBC_LEVELS } from '../constants/curriculum';

Benefits:
- Single source of truth for app-wide constants
- Prevents typos in string literals
- Makes refactoring easier
- Improves code maintainability
- Enables better IDE autocomplete