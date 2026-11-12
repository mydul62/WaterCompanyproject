"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import {
  ADMIN_TOKEN_KEY,
  AUTH_EXPIRED_EVENT,
  AuthExpiredReason,
  AuthSessionUser,
  clearAuthSession,
  getStoredToken,
  isIdleExpired,
  touchActivity,
} from "@/lib/auth";
import {
  LayoutDashboard,
  Layers,
  Package,
  Tags,
  Image as ImageIcon,
  MenuSquare,
  PanelBottom,
  Link2,
  Globe,
  Settings,
  Users,
  FileText,
  Briefcase,
  Menu,
  X,
  ExternalLink,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Sliders,
  PanelLeftClose,
  PanelLeftOpen,
  Newspaper,
  BookOpen,
  FolderKanban,
  Award,
  Leaf,
  Tv,
  KeyRound,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

const SIDEBAR_STORAGE_KEY = "waterweb_admin_sidebar_collapsed";
const SESSION_REVERIFY_MS = 5 * 60 * 1000;

function isNavItemActive(pathname: string, href: string) {
  return href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
}

interface NavGroup {
  group: string;
  items: {
    name: string;
    href: string;
    icon: any;
    badge?: string;
    badgeColor?: string;
    roles?: string[];
  }[];
}

const NAVIGATION_GROUPS: NavGroup[] = [
  {
    group: "CMS & Dynamic Content",
    items: [
      { name: "Overview", href: "/admin", icon: LayoutDashboard },
      { name: "Banner Slider", href: "/admin/banner", icon: Sliders, badge: "Hero", badgeColor: "bg-cyan-600/80 text-cyan-100" },
      { name: "Pages & Page Builder", href: "/admin/pages", icon: Layers },
      { name: "Product Catalog", href: "/admin/products", icon: Package },
      { name: "Product Categories", href: "/admin/categories", icon: Tags },
      { name: "Press & Media", href: "/admin/media", icon: Newspaper },
      { name: "TV News Videos", href: "/admin/tv-news", icon: Tv, badge: "YouTube", badgeColor: "bg-red-600/80 text-red-100" },
      { name: "Blog & Insights", href: "/admin/blog", icon: BookOpen },
      { name: "Case Studies", href: "/admin/case-studies", icon: FolderKanban },
      { name: "Certificates", href: "/admin/certificates", icon: Award },
      { name: "Sustainability Page", href: "/admin/sustainability", icon: Leaf, badge: "LEED", badgeColor: "bg-emerald-600/80 text-emerald-100" },
      { name: "Media Library", href: "/admin/media-library", icon: ImageIcon },
    ],
  },
  {
    group: "Structure & Links",
    items: [
      { name: "Navigation Menus", href: "/admin/navigation", icon: MenuSquare },
      { name: "Footer Management", href: "/admin/footer", icon: PanelBottom },
      { name: "Link Registry", href: "/admin/links", icon: Link2, badge: "Universal" },
      { name: "SEO Management", href: "/admin/seo", icon: Globe },
    ],
  },
  {
    group: "System & Operations",
    items: [
      { name: "Website Settings", href: "/admin/settings", icon: Settings },
      { name: "User & Role Access", href: "/admin/users", icon: Users, roles: ["SUPER_ADMIN", "ADMIN"] },
      { name: "RFQ & Inquiries", href: "/admin/inquiries", icon: FileText, badge: "Live" },
      { name: "Careers & Jobs", href: "/admin/careers", icon: Briefcase, badge: "HR" },
    ],
  },
];

function getInitials(name?: string, email?: string) {
  const source = (name || email || "AD").trim();
  const parts = source.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return source.slice(0, 2).toUpperCase();
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/admin";
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login" || pathname === "/admin/login/";

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [authStatus, setAuthStatus] = useState<"checking" | "authenticated" | "unauthenticated">(
    "checking"
  );
  const [currentUser, setCurrentUser] = useState<AuthSessionUser | null>(null);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setSidebarCollapsed(localStorage.getItem(SIDEBAR_STORAGE_KEY) === "true");
  }, []);

  const redirectToLogin = useCallback(
    (reason?: AuthExpiredReason) => {
      clearAuthSession();
      api.invalidateCache();
      setCurrentUser(null);
      setAuthStatus("unauthenticated");

      const query = new URLSearchParams();
      if (reason) query.set("reason", reason);
      if (pathname && pathname.startsWith("/admin") && pathname !== "/admin/login") {
        query.set("next", pathname);
      }
      const qs = query.toString();
      router.replace(`/admin/login${qs ? `?${qs}` : ""}`);
    },
    [pathname, router]
  );

  const verifyServerSession = useCallback(
    async (silent = false) => {
      if (isLoginPage) return;

      if (isIdleExpired()) {
        redirectToLogin("idle");
        return;
      }

      const token = getStoredToken();
      if (!token) {
        redirectToLogin(silent ? "expired" : undefined);
        return;
      }

      if (!silent) {
        setAuthStatus((prev) => (prev === "authenticated" ? "authenticated" : "checking"));
      }

      try {
        const res = await api.auth.me();
        if (res?.data?.email) {
          setCurrentUser(res.data);
          touchActivity(true);
          setAuthStatus("authenticated");
        } else {
          redirectToLogin("expired");
        }
      } catch {
        redirectToLogin("expired");
      }
    },
    [isLoginPage, redirectToLogin]
  );

  useEffect(() => {
    if (isLoginPage) {
      setAuthStatus("unauthenticated");
      return;
    }
    verifyServerSession(false);
  }, [isLoginPage, verifyServerSession]);

  useEffect(() => {
    if (isLoginPage || authStatus !== "authenticated") return;

    const handleActivity = () => touchActivity(false);
    const activityEvents = ["mousedown", "keydown", "touchstart", "scroll"] as const;
    activityEvents.forEach((evt) => window.addEventListener(evt, handleActivity, { passive: true }));

    const idleInterval = window.setInterval(() => {
      if (isIdleExpired()) {
        redirectToLogin("idle");
        return;
      }
      if (!getStoredToken()) {
        redirectToLogin("expired");
      }
    }, 30_000);

    const serverInterval = window.setInterval(() => {
      verifyServerSession(true);
    }, SESSION_REVERIFY_MS);

    const handleFocus = () => verifyServerSession(true);
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        verifyServerSession(true);
      }
    };

    const handleAuthExpiredEvent = (event: Event) => {
      const reason = (event as CustomEvent<{ reason?: AuthExpiredReason }>)?.detail?.reason;
      redirectToLogin(reason || "expired");
    };

    const handleStorageSync = (event: StorageEvent) => {
      if (event.key === ADMIN_TOKEN_KEY && !event.newValue) {
        redirectToLogin("signed-out");
      }
    };

    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener(AUTH_EXPIRED_EVENT, handleAuthExpiredEvent);
    window.addEventListener("storage", handleStorageSync);

    return () => {
      activityEvents.forEach((evt) => window.removeEventListener(evt, handleActivity));
      window.clearInterval(idleInterval);
      window.clearInterval(serverInterval);
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener(AUTH_EXPIRED_EVENT, handleAuthExpiredEvent);
      window.removeEventListener("storage", handleStorageSync);
    };
  }, [authStatus, isLoginPage, redirectToLogin, verifyServerSession]);

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => {
      const next = !prev;
      if (typeof window !== "undefined") {
        localStorage.setItem(SIDEBAR_STORAGE_KEY, String(next));
      }
      return next;
    });
  };

  const handleSignOut = async () => {
    await api.auth.logout();
    setCurrentUser(null);
    setAuthStatus("unauthenticated");
    router.replace("/admin/login?reason=signed-out");
  };

  const openPasswordModal = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordError(null);
    setPasswordSuccess(null);
    setShowPasswordModal(true);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    if (newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirmation do not match.");
      return;
    }

    setPasswordSaving(true);
    try {
      await api.auth.changePassword(currentPassword, newPassword);
      setPasswordSuccess("Password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      window.setTimeout(() => setShowPasswordModal(false), 1200);
    } catch (err: any) {
      setPasswordError(err?.message || "Failed to update password.");
    } finally {
      setPasswordSaving(false);
    }
  };

  const visibleNavigationGroups = useMemo(() => {
    const role = currentUser?.role || "";
    return NAVIGATION_GROUPS.map((group) => ({
      ...group,
      items: group.items.filter((item) => !item.roles || item.roles.includes(role)),
    })).filter((group) => group.items.length > 0);
  }, [currentUser?.role]);

  // Never render the admin sidebar shell on the login route
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Strictly block rendering dashboard sidebar & child pages until server session verification passes
  if (authStatus !== "authenticated") {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-300 flex flex-col items-center justify-center p-6 antialiased">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center shadow-xl">
            <ShieldCheck className="w-6 h-6 text-cyan-400 animate-pulse" />
          </div>
          <p className="text-sm font-bold text-white tracking-tight">
            Verifying Administrator Session
          </p>
          <p className="text-xs text-slate-500 font-mono">
            Checking authentication &amp; role permissions...
          </p>
        </div>
      </div>
    );
  }

  // If in visual page builder full-screen mode, let it take full viewport
  const isBuilder = pathname.includes("/builder");

  if (isBuilder) {
    return <div className="min-h-screen bg-slate-950 text-slate-100">{children}</div>;
  }

  const userDisplayName = currentUser?.name || "Administrator";
  const userDisplayRole = currentUser?.role?.replace(/_/g, " ") || "ADMIN";
  const userInitials = getInitials(currentUser?.name, currentUser?.email);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col lg:flex-row antialiased">
      {/* Desktop Persistent Collapsible Sidebar */}
      <aside
        aria-label="Admin sidebar navigation"
        data-lenis-prevent
        className={`hidden lg:flex flex-col bg-slate-900 border-r border-slate-800 shrink-0 select-none h-screen sticky top-0 overflow-hidden transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? "w-[76px]" : "w-72"
        }`}
      >
        {/* Pinned Admin Header Logo & Fold Toggle */}
        <div
          className={`border-b border-slate-800 bg-slate-900/95 backdrop-blur-sm shrink-0 z-10 transition-all ${
            sidebarCollapsed
              ? "px-2 py-3 flex flex-col items-center gap-2.5"
              : "p-4 flex items-center justify-between gap-2"
          }`}
        >
          <Link
            href="/"
            title="Noor Plastic — Back to Public Website"
            className={`flex items-center ${sidebarCollapsed ? "justify-center" : "gap-3 min-w-0"}`}
          >
            <div className="w-9 h-9 rounded-lg bg-blue-600 text-white font-black text-base flex items-center justify-center shadow-md shadow-blue-600/30 shrink-0">
              <span className="text-cyan-300">N</span>P
            </div>
            {!sidebarCollapsed && (
              <div className="min-w-0">
                <span className="text-base font-black text-white tracking-tight block truncate">NOOR PLASTIC</span>
                <span className="text-[11px] text-cyan-400 font-mono tracking-widest uppercase block truncate">
                  Admin CMS Suite
                </span>
              </div>
            )}
          </Link>

          <button
            type="button"
            onClick={toggleSidebar}
            aria-label={sidebarCollapsed ? "Expand sidebar" : "Fold sidebar"}
            aria-expanded={!sidebarCollapsed}
            title={sidebarCollapsed ? "Expand sidebar" : "Fold sidebar"}
            className="p-1.5 rounded-lg border border-slate-800 bg-slate-950/70 text-slate-400 hover:text-white hover:border-slate-700 hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
          >
            {sidebarCollapsed ? (
              <PanelLeftOpen className="w-4 h-4 text-cyan-400" />
            ) : (
              <PanelLeftClose className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Independent Scrollable Navigation Groups */}
        <nav
          data-lenis-prevent
          className={`flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain admin-scrollbar space-y-5 ${
            sidebarCollapsed ? "p-2" : "p-3.5"
          }`}
        >
          {visibleNavigationGroups.map((group) => (
            <div key={group.group} className="space-y-1">
              {sidebarCollapsed ? (
                <div className="mx-2 my-1.5 border-t border-slate-800/80" />
              ) : (
                <div className="px-3 py-1 text-[11px] font-black uppercase tracking-wider text-slate-500">
                  {group.group}
                </div>
              )}
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = isNavItemActive(pathname, item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    title={item.name}
                    aria-label={item.name}
                    className={`flex items-center rounded-lg text-sm font-semibold transition-all relative ${
                      sidebarCollapsed
                        ? "justify-center px-2 py-2.5"
                        : "justify-between px-3 py-2.5"
                    } ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/25 font-bold"
                        : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                    }`}
                  >
                    <div className={`flex items-center ${sidebarCollapsed ? "justify-center" : "gap-3 min-w-0"}`}>
                      <Icon className={`w-[18px] h-[18px] shrink-0 ${isActive ? "text-white" : "text-slate-400"}`} />
                      {!sidebarCollapsed && <span className="truncate">{item.name}</span>}
                    </div>
                    {sidebarCollapsed && item.badge && (
                      <span
                        aria-hidden="true"
                        className="w-1.5 h-1.5 rounded-full bg-cyan-400 absolute top-1.5 right-1.5"
                      />
                    )}
                    {!sidebarCollapsed && item.badge && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono font-bold shrink-0 ml-2 ${
                          item.badgeColor || "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Pinned User Session & Public Link */}
        <div
          className={`border-t border-slate-800 space-y-2.5 bg-slate-900 shrink-0 z-10 ${
            sidebarCollapsed ? "p-2.5 flex flex-col items-center" : "p-4"
          }`}
        >
          <Link
            href="/"
            target="_blank"
            title="View Public Website"
            aria-label="View Public Website"
            className={`flex items-center rounded-lg bg-slate-950/80 hover:bg-slate-800 border border-slate-800 text-[13px] font-semibold text-slate-300 transition-colors ${
              sidebarCollapsed ? "justify-center p-2.5 w-full" : "justify-between px-3 py-2.5"
            }`}
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-cyan-400 shrink-0" />
              {!sidebarCollapsed && <span>View Public Website</span>}
            </span>
            {!sidebarCollapsed && <ChevronRight className="w-4 h-4 text-slate-500" />}
          </Link>

          <div
            className={`pt-1 flex items-center ${
              sidebarCollapsed ? "flex-col gap-2.5 justify-center w-full" : "justify-between gap-2"
            }`}
          >
            <div
              className="flex items-center gap-2.5 min-w-0"
              title={`${userDisplayName} (${currentUser?.email || ""})`}
            >
              <div className="w-8 h-8 rounded-full bg-blue-950 border border-blue-700/50 flex items-center justify-center font-bold text-xs text-cyan-400 shrink-0">
                {userInitials}
              </div>
              {!sidebarCollapsed && (
                <div className="leading-tight min-w-0">
                  <span className="text-sm font-bold text-white block truncate">{userDisplayName}</span>
                  <span className="text-[11px] text-slate-400 font-mono block truncate">
                    {userDisplayRole}
                  </span>
                </div>
              )}
            </div>
            <div className={`flex items-center ${sidebarCollapsed ? "flex-col gap-1.5" : "gap-1"} shrink-0`}>
              <button
                type="button"
                onClick={openPasswordModal}
                className="text-slate-500 hover:text-cyan-400 transition-colors p-1.5 rounded-lg hover:bg-slate-800/70 cursor-pointer"
                title="Change Password"
                aria-label="Change Password"
              >
                <KeyRound className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleSignOut}
                className="text-slate-500 hover:text-red-400 transition-colors p-1.5 rounded-lg hover:bg-slate-800/70 cursor-pointer"
                title="Sign Out"
                aria-label="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Header Bar */}
      <div className="lg:hidden bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between sticky top-0 z-40">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-blue-600 text-white font-black text-sm flex items-center justify-center">
            NP
          </div>
          <span className="text-sm font-black text-white">NOOR PLASTIC ADMIN</span>
        </Link>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={openPasswordModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800"
            title="Change Password"
            aria-label="Change Password"
          >
            <KeyRound className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleSignOut}
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800"
            title="Sign Out"
            aria-label="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            aria-label="Toggle navigation menu"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileSidebarOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 p-4 space-y-4 max-h-[80vh] overflow-y-auto animate-in slide-in-from-top duration-150">
          {visibleNavigationGroups.map((group) => (
            <div key={group.group} className="space-y-1">
              <div className="text-xs font-black uppercase text-slate-500 tracking-wider px-2">
                {group.group}
              </div>
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = isNavItemActive(pathname, item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileSidebarOpen(false)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-bold ${
                      isActive ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-[18px] h-[18px]" />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {/* Full-Width Main Content Workspace */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:px-7 lg:py-6">
        <div className="w-full">{children}</div>
      </main>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="change-password-title"
        >
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h2 id="change-password-title" className="text-sm font-bold text-white">
                  Update Administrator Password
                </h2>
                <p className="text-[11px] text-slate-400 font-mono">{currentUser?.email}</p>
              </div>
              <button
                type="button"
                onClick={() => setShowPasswordModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {passwordError && (
              <div className="p-3 rounded-xl bg-red-950/60 border border-red-800/80 text-xs text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{passwordError}</span>
              </div>
            )}

            {passwordSuccess && (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/80 text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{passwordSuccess}</span>
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Current Password</label>
                <input
                  type="password"
                  required
                  autoComplete="current-password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  New Password (min. 8 characters)
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter strong new password"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Confirm New Password</label>
                <input
                  type="password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={passwordSaving}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold cursor-pointer"
                >
                  {passwordSaving ? "Updating..." : "Save Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
