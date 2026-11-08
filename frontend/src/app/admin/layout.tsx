"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
} from "lucide-react";

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
      { name: "Pages & Page Builder", href: "/admin/pages", icon: Layers, badge: "Elementor", badgeColor: "bg-blue-600/80 text-blue-200" },
      { name: "Product Catalog", href: "/admin/products", icon: Package },
      { name: "Product Categories", href: "/admin/categories", icon: Tags },
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
      { name: "Career Applications", href: "/admin/careers", icon: Briefcase },
    ],
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // If in visual page builder full-screen mode, let it take full viewport
  const isBuilder = pathname.includes("/builder");

  if (isBuilder) {
    return <div className="min-h-screen bg-slate-950 text-slate-100">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col lg:flex-row antialiased">
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:flex flex-col justify-between w-64 bg-slate-900 border-r border-slate-800 shrink-0 select-none h-screen sticky top-0 overflow-y-auto">
        <div>
          {/* Admin Header Logo */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-slate-900 z-10">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-black text-sm flex items-center justify-center shadow-md shadow-blue-600/30">
                <span className="text-cyan-300">X</span>C
              </div>
              <div>
                <span className="text-sm font-black text-white tracking-tight block">XCLUSIVE CAN</span>
                <span className="text-[9px] text-cyan-400 font-mono tracking-widest uppercase">Admin CMS Suite</span>
              </div>
            </Link>
          </div>

          {/* Navigation Groups */}
          <nav className="p-3 space-y-4">
            {NAVIGATION_GROUPS.map((group) => (
              <div key={group.group} className="space-y-1">
                <div className="px-3 py-1 text-[9px] font-black uppercase tracking-wider text-slate-500">
                  {group.group}
                </div>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    item.href === "/admin"
                      ? pathname === "/admin"
                      : pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                        isActive
                          ? "bg-blue-600 text-white shadow-md shadow-blue-600/25 font-bold"
                          : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-slate-400"}`} />
                        <span className="truncate">{item.name}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[9px] px-1.5 py-0.5 rounded-md font-mono font-bold shrink-0 ${
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
        </div>

        {/* User Session & Public Link */}
        <div className="p-4 border-t border-slate-800 space-y-2.5 bg-slate-900 sticky bottom-0 z-10">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between p-2 rounded-lg bg-slate-950/80 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
              View Public Website
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          </Link>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-blue-950 border border-blue-700/50 flex items-center justify-center font-bold text-[11px] text-cyan-400">
                SA
              </div>
              <div className="leading-tight">
                <span className="text-xs font-bold text-white block">Super Admin</span>
                <span className="text-[9px] text-slate-500">Gazipur HQ System</span>
              </div>
            </div>
            <Link
              href="/admin/login"
              className="text-slate-500 hover:text-red-400 transition-colors p-1"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </aside>

      {/* Mobile Header Bar */}
      <div className="lg:hidden bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between sticky top-0 z-40">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-blue-600 text-white font-black text-xs flex items-center justify-center">
            XC
          </div>
          <span className="text-xs font-black text-white">XCLUSIVE ADMIN</span>
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
              <div className="text-[10px] font-black uppercase text-slate-500 tracking-wider px-2">
                {group.group}
              </div>
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileSidebarOpen(false)}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold ${
                      isActive ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
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

      {/* Main Content Workspace */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
