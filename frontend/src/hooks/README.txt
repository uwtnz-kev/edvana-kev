Hooks Folder Organization
========================

This folder contains custom React hooks for reusable stateful logic.

Current Hooks:
- useAuth.ts: Authentication state and actions (wrapper for AuthContext)
- useRoleRedirect.ts: Automatic redirection based on user role
- useLocalStorage.ts: Persistent state with localStorage sync

Hook Categories:

1. **State Management Hooks**
   - Manage component state with additional logic
   - Example: useLocalStorage, useSessionStorage

2. **API Hooks**
   - Handle data fetching and mutations
   - Example: useUser, useCourses, useQuizzes

3. **UI Hooks**
   - Manage UI state and interactions
   - Example: useModal, useToast, useTheme

4. **Utility Hooks**
   - Common patterns and utilities
   - Example: useDebounce, useInterval, useMedia

Best Practices:

1. **Naming**: Use "use" prefix for all hooks
2. **Single Responsibility**: Each hook should have one clear purpose
3. **Return Consistent Shape**: Return arrays for state/setter pairs, objects for multiple values
4. **Error Handling**: Include proper error boundaries and fallbacks
5. **TypeScript**: Always type your hooks properly

Example Hook Structure:
```typescript
export function useCustomHook<T>(param: T) {
  const [state, setState] = useState<T>(param);
  
  const someAction = useCallback(() => {
    // Logic here
  }, []);
  
  return { state, someAction };
}
```

Testing Hooks:
- Use @testing-library/react-hooks for testing
- Test all return values and side effects
- Mock external dependencies

Performance:
- Use useMemo and useCallback when appropriate
- Avoid creating new objects/functions on every render
- Consider using refs for values that don't trigger re-renders