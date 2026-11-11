"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { api } from "@/lib/api";
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
} from "lucide-react";

const SIDEBAR_STORAGE_KEY = "waterweb_admin_sidebar_collapsed";

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
      { name: "Media Library (Imaple)", href: "/admin/media-library", icon: ImageIcon },
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
      { name: "User & Role Access", href: "/admin/users", icon: Users },
      { name: "RFQ & Inquiries", href: "/admin/inquiries", icon: FileText, badge: "Live" },
      { name: "Careers & Jobs", href: "/admin/careers", icon: Briefcase, badge: "HR" },
    ],
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setSidebarCollapsed(localStorage.getItem(SIDEBAR_STORAGE_KEY) === "true");
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => {
      const next = !prev;
      if (typeof window !== "undefined") {
        localStorage.setItem(SIDEBAR_STORAGE_KEY, String(next));
      }
      return next;
    });
  };

  useEffect(() => {
    if (pathname === "/admin/login") return;
    const token = typeof window !== "undefined" ? localStorage.getItem("waterweb_admin_token") : null;
    const hasCookie = typeof document !== "undefined" && document.cookie.includes("xcl_token");
    if (!token && !hasCookie) {
      router.push("/admin/login");
    }
  }, [pathname, router]);

  const handleSignOut = async () => {
    try {
      await api.auth.logout();
    } catch (e) {}
    if (typeof window !== "undefined") {
      localStorage.removeItem("waterweb_admin_token");
      localStorage.removeItem("waterweb_admin_user");
    }
    router.push("/admin/login");
  };

  // If in visual page builder full-screen mode, let it take full viewport
  const isBuilder = pathname.includes("/builder");

  if (isBuilder) {
    return <div className="min-h-screen bg-slate-950 text-slate-100">{children}</div>;
  }

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
          {NAVIGATION_GROUPS.map((group) => (
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
              sidebarCollapsed ? "flex-col gap-2.5 justify-center w-full" : "justify-between"
            }`}
          >
            <div className="flex items-center gap-2.5" title="Super Admin — Kaliakoir, Gazipur">
              <div className="w-8 h-8 rounded-full bg-blue-950 border border-blue-700/50 flex items-center justify-center font-bold text-xs text-cyan-400 shrink-0">
                SA
              </div>
              {!sidebarCollapsed && (
                <div className="leading-tight">
                  <span className="text-sm font-bold text-white block">Super Admin</span>
                  <span className="text-[11px] text-slate-400">Kaliakoir, Gazipur</span>
                </div>
              )}
            </div>
            <button
              onClick={handleSignOut}
              className="text-slate-500 hover:text-red-400 transition-colors p-1.5 rounded-lg hover:bg-slate-800/70 cursor-pointer"
              title="Sign Out"
              aria-label="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
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
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
        >
          {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileSidebarOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 p-4 space-y-4 max-h-[80vh] overflow-y-auto animate-in slide-in-from-top duration-150">
          {NAVIGATION_GROUPS.map((group) => (
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
    </div>
  );
}
