"use client";

import React, { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  MenuSquare,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Edit,
  Save,
  CornerDownRight,
} from "lucide-react";
import { api } from "@/lib/api";
import {
  NavItem,
  MENU_TABS,
} from "./_components/NavigationItemForm";
import {
  AdminEditLoadingState,
  AdminErrorBanner,
  AdminToast,
  useAdminToast,
} from "@/components/admin/AdminCrudShell";
import { AdminFormSkeleton } from "@/components/common/Skeletons";

function HeaderNavigationContent() {
  const searchParams = useSearchParams();
  const initialMenu = searchParams.get("menu") || "HEADER_PRIMARY";
  const [selectedMenuCode, setSelectedMenuCode] = useState(initialMenu);
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { toast, showToast, clearToast } = useAdminToast();

  useEffect(() => {
    loadMenuTree(selectedMenuCode);
  }, [selectedMenuCode]);

  const loadMenuTree = async (code: string) => {
    setLoading(true);
    setLoadError(null);
    try {
      const res = await api.navigation.getTree(code);
      setNavItems(Array.isArray(res.data) ? res.data : []);
    } catch (err: any) {
      setNavItems([]);
      setLoadError(err?.message || "Failed to load navigation menu from PostgreSQL.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = (id: string, parentId?: string) => {
    if (parentId) {
      setNavItems(
        navItems.map((parent) => {
          if (parent.id === parentId) {
            return {
              ...parent,
              children: (parent.children || []).filter((c) => c.id !== id),
            };
          }
          return parent;
        })
      );
    } else {
      setNavItems(navItems.filter((i) => i.id !== id));
    }
    showToast("Item removed (click Save Navigation to persist changes)");
  };

  const handleMoveTopItem = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === navItems.length - 1) return;

    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const reordered = [...navItems];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(targetIndex, 0, moved);

    const reIndexed = reordered.map((item, idx) => ({ ...item, sortOrder: idx + 1 }));
    setNavItems(reIndexed);
  };

  const handleSaveTreeToBackend = async () => {
    setIsSaving(true);
    try {
      await api.navigation.saveTree(selectedMenuCode, navItems);
      showToast("Navigation menu tree saved to PostgreSQL successfully!");
    } catch (err: any) {
      showToast(err?.message || "Failed to save navigation menu tree to PostgreSQL.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <AdminToast toast={toast} onClose={clearToast} />

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
            <MenuSquare className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white tracking-tight">
              Header &amp; Navigation Menu Builder
            </h1>
            <p className="text-xs text-slate-400">
              Manage dropdown hierarchies, navigation labels, badges, and destinations across the website
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href={`/admin/navigation/new?menu=${encodeURIComponent(selectedMenuCode)}`}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Menu Item
          </Link>
          <button
            onClick={handleSaveTreeToBackend}
            disabled={isSaving || loading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02] cursor-pointer disabled:opacity-60"
          >
            <Save className="w-4 h-4" />
            {isSaving ? "Saving..." : "Save Navigation"}
          </button>
        </div>
      </div>

      <AdminErrorBanner error={loadError} onRetry={() => loadMenuTree(selectedMenuCode)} />

      {/* Menu Switcher Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        {MENU_TABS.map((tab) => (
          <button
            key={tab.code}
            onClick={() => setSelectedMenuCode(tab.code)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedMenuCode === tab.code
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
                : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Visual Navigation Tree */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
            Menu Items &amp; Dropdown Hierarchies
          </span>
          <span className="text-[11px] text-slate-500 font-mono">
            Total Root Items: {navItems.length}
          </span>
        </div>

        <div className="space-y-3">
          {loading ? (
            <AdminFormSkeleton />
          ) : navItems.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              No navigation items configured for this menu in PostgreSQL yet.
            </div>
          ) : (
            navItems.map((item, index) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3"
            >
              {/* Parent Item Bar */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-md bg-blue-950 border border-blue-800 text-blue-300 font-mono text-[11px] font-bold flex items-center justify-center">
                    0{index + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{item.label}</span>
                      {item.badge && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-mono text-cyan-400">{item.url}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleMoveTopItem(index, "up")}
                    disabled={index === 0}
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                    title="Move Up"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleMoveTopItem(index, "down")}
                    disabled={index === navItems.length - 1}
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                    title="Move Down"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  <Link
                    href={`/admin/navigation/new?menu=${encodeURIComponent(selectedMenuCode)}&parentId=${encodeURIComponent(item.id)}`}
                    className="px-2.5 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 text-[11px] font-bold flex items-center gap-1"
                    title="Add Child Submenu Item"
                  >
                    <Plus className="w-3 h-3" />
                    Add Child
                  </Link>
                  <Link
                    href={`/admin/navigation/${item.id}/edit?menu=${encodeURIComponent(selectedMenuCode)}`}
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                    title="Edit Item"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-red-400 cursor-pointer"
                    title="Delete Item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Sub-menu Dropdown Items */}
              {item.children && item.children.length > 0 && (
                <div className="pl-6 border-l-2 border-slate-800 space-y-2 mt-2">
                  {item.children.map((child) => (
                    <div
                      key={child.id}
                      className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <CornerDownRight className="w-3.5 h-3.5 text-slate-500" />
                        <span className="font-bold text-slate-200">{child.label}</span>
                        <span className="font-mono text-[10px] text-cyan-400">{child.url}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <Link
                          href={`/admin/navigation/${child.id}/edit?menu=${encodeURIComponent(selectedMenuCode)}&parentId=${encodeURIComponent(item.id)}`}
                          className="p-1 text-slate-400 hover:text-white"
                          title="Edit Child"
                        >
                          <Edit className="w-3 h-3" />
                        </Link>
                        <button
                          onClick={() => handleDeleteItem(child.id, item.id)}
                          className="p-1 text-slate-400 hover:text-red-400 cursor-pointer"
                          title="Delete Child"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default function HeaderNavigationPage() {
  return (
    <Suspense fallback={<AdminEditLoadingState label="Loading navigation builder..." />}>
      <HeaderNavigationContent />
    </Suspense>
  );
}
