export const ADMIN_TOKEN_KEY = "waterweb_admin_token";
export const ADMIN_USER_KEY = "waterweb_admin_user";
export const ADMIN_LAST_ACTIVE_KEY = "waterweb_admin_last_active";
export const ADMIN_IDLE_TIMEOUT_MS = 30 * 60 * 1000;
export const AUTH_EXPIRED_EVENT = "waterweb:auth-expired";

export type AuthExpiredReason = "expired" | "idle" | "unauthorized" | "signed-out";

export interface AuthSessionUser {
  id?: string;
  email: string;
  name: string;
  role: string;
  avatar?: string | null;
}

const INVALID_LITERAL_TOKENS = new Set([
  "",
  "null",
  "undefined",
  "demo_jwt_token_super_admin",
]);

function decodeJwtPayload(token: string): Record<string, any> | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3 || !parts[1]) return null;
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
    const json = atob(padded);
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function isPlausibleJwt(token: string | null | undefined): token is string {
  if (!token || typeof token !== "string") return false;
  const trimmed = token.trim();
  if (INVALID_LITERAL_TOKENS.has(trimmed)) return false;

  const payload = decodeJwtPayload(trimmed);
  if (!payload || typeof payload !== "object") return false;

  if (typeof payload.exp === "number" && payload.exp * 1000 <= Date.now()) {
    return false;
  }

  return true;
}

export function clearAuthSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ADMIN_TOKEN_KEY);
  localStorage.removeItem(ADMIN_USER_KEY);
  localStorage.removeItem(ADMIN_LAST_ACTIVE_KEY);
}

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(ADMIN_TOKEN_KEY);
  if (!raw) return null;
  if (!isPlausibleJwt(raw)) {
    clearAuthSession();
    return null;
  }
  return raw;
}

export function getStoredUser(): AuthSessionUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(ADMIN_USER_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

export function touchActivity(force = false) {
  if (typeof window === "undefined") return;
  const now = Date.now();
  if (!force) {
    const prev = Number(localStorage.getItem(ADMIN_LAST_ACTIVE_KEY) || "0");
    if (now - prev < 15_000) return;
  }
  localStorage.setItem(ADMIN_LAST_ACTIVE_KEY, String(now));
}

export function isIdleExpired(now = Date.now()): boolean {
  if (typeof window === "undefined") return false;
  const raw = localStorage.getItem(ADMIN_LAST_ACTIVE_KEY);
  if (!raw) return false;
  const lastActive = Number(raw);
  if (!Number.isFinite(lastActive) || lastActive <= 0) return false;
  return now - lastActive > ADMIN_IDLE_TIMEOUT_MS;
}

export function setAuthSession(token: string, user: AuthSessionUser) {
  if (typeof window === "undefined") return;
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
  localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(user));
  touchActivity(true);
}

export function notifyAuthExpired(reason: AuthExpiredReason = "expired") {
  clearAuthSession();
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(AUTH_EXPIRED_EVENT, { detail: { reason } }));
}

