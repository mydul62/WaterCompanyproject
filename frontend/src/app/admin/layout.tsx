"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  FileText,
  Newspaper,
  Briefcase,
  Sliders,
  Settings,
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
  Bell,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { COMPANY_INFO } from "@/data/companyData";

const NAVIGATION_ITEMS = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Product Catalog", href: "/admin/products", icon: Package, badge: "6 Active" },
  { name: "RFQ & Inquiries", href: "/admin/inquiries", icon: FileText, badge: "4 New", badgeColor: "bg-blue-600" },
  { name: "Press & Media", href: "/admin/media", icon: Newspaper },
  { name: "Career Applications", href: "/admin/careers", icon: Briefcase, badge: "2" },
  { name: "Hero Slider", href: "/admin/slider", icon: Sliders },
  { name: "Website Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col lg:flex-row antialiased">
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:flex flex-col justify-between w-64 bg-slate-900 border-r border-slate-800 shrink-0 select-none">
        <div>
          {/* Admin Header Logo */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-blue-600 text-white font-black text-lg flex items-center justify-center shadow-md shadow-blue-600/30">
                <span className="text-cyan-300">X</span>C
              </div>
              <div>
                <span className="text-sm font-black text-white tracking-tight block">XCLUSIVE CAN</span>
                <span className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase">Admin Suite</span>
              </div>
            </Link>
          </div>

          {/* Navigation Items */}
          <nav className="p-3 space-y-1">
            <div className="px-3 py-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
              Management Portal
            </div>
            {NAVIGATION_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                        item.badgeColor || "bg-slate-800 text-slate-300"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Session & Public Link */}
        <div className="p-4 border-t border-slate-800 space-y-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/80 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
              View Public Website
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          </Link>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-cyan-400">
                AD
              </div>
              <div>
                <span className="text-xs font-bold text-white block">Administrator</span>
                <span className="text-[10px] text-slate-500">Gazipur Plant HQ</span>
              </div>
            </div>
            <button className="text-slate-500 hover:text-red-400 transition-colors" title="Log Out">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Header Bar */}
      <div className="lg:hidden bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-blue-600 text-white font-black text-sm flex items-center justify-center">
            XC
          </div>
          <span className="text-sm font-black text-white">XCLUSIVE ADMIN</span>
        </Link>
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
        >
          {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileSidebarOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 p-4 space-y-2 animate-in slide-in-from-top duration-150">
          {NAVIGATION_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
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
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      )}

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col min-h-screen bg-slate-950 overflow-x-hidden">
        {/* Top Control Bar */}
        <header className="h-14 border-b border-slate-800 bg-slate-900/60 backdrop-blur-md px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500">System:</span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-mono text-[11px] border border-emerald-800/40">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Gazipur Plant Online &bull; 100% Operational
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400" />
            </button>
            <div className="text-xs text-right hidden sm:block">
              <span className="text-slate-300 font-bold block">{COMPANY_INFO.name}</span>
              <span className="text-[10px] text-slate-500 font-mono">ISO 9001 / LEED Platinum</span>
            </div>
          </div>
        </header>

        {/* Child Pages */}
        <main className="p-6 sm:p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}

