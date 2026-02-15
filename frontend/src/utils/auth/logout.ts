// src/utils/auth/logout.ts

export const performLogout = (
  logout: () => void,
  navigate: (path: string) => void,
  onBeforeLogout?: () => void // optional callback
) => {
  if (onBeforeLogout) {
    onBeforeLogout();
  }

  setTimeout(() => {
    logout();             // Clear auth state
    navigate("/login");   // Redirect to login
  }, 1500); // 👈 Delay long enough for toast to be seen
};