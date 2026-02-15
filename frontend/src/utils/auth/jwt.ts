// src/utils/auth/jwt.ts
export function getTokenPayload(token: string): any | null {
  try {
    const [, payload] = token.split(".");
    if (!payload) return null;
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const json =
      typeof atob !== "undefined"
        ? atob(base64)
        : Buffer.from(base64, "base64").toString("binary");
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function isTokenExpired(token?: string | null): boolean {
  if (!token) return true;

  // Not a JWT (no 3 parts) → don’t treat as expired client-side
  if (token.split(".").length !== 3) return false;

  const payload = getTokenPayload(token);
  if (!payload) return false;
  if (payload.exp == null) return false;

  const expMs = payload.exp > 1e12 ? payload.exp : payload.exp * 1000;
  return Date.now() >= expMs;
}
