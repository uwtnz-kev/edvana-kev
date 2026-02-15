Types Folder Organization
========================

This folder contains TypeScript type definitions and interfaces for the entire application.

File Structure:
- user.ts: User-related types (AuthUser, profiles for different roles)
- quiz.ts: Assessment and quiz-related types
- api.d.ts: Generic API response types and utility interfaces

Best Practices:

1. **Interface Naming**: Use PascalCase for interfaces (e.g., `AuthUser`, `QuizResult`)

2. **Generic Types**: Create reusable generic types for common patterns:
   ```typescript
   interface ApiResponse<T> {
     data: T;
     success: boolean;
   }
   ```

3. **Extending Interfaces**: Use inheritance for related types:
   ```typescript
   interface UserProfile extends AuthUser {
     phone?: string;
   }
   ```

4. **Union Types**: Use for limited string values:
   ```typescript
   type UserRole = 'student' | 'teacher' | 'admin';
   ```

5. **Optional Properties**: Use `?` for optional fields:
   ```typescript
   interface User {
     id: number;
     name: string;
     email?: string; // optional
   }
   ```

6. **Utility Types**: Leverage TypeScript utilities:
   - `Partial<T>` for optional versions
   - `Pick<T, K>` for selecting properties
   - `Omit<T, K>` for excluding properties

Usage Examples:
```typescript
import { AuthUser, StudentProfile } from '../types/user';
import { Quiz, QuizAttempt } from '../types/quiz';
import { ApiResponse } from '../types/api';
```

Remember to update types when API contracts change and keep them in sync with backend models.