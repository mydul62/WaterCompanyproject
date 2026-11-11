"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MenuSquare, Save } from "lucide-react";
import { api } from "@/lib/api";
import { normalizeRegisteredLink, type RegisteredLinkItem } from "@/lib/linkRegistry";
import {
  AdminFormHeader,
  AdminEditLoadingState,
  AdminEditNotFoundState,
  AdminToast,
  useAdminToast,
} from "@/components/admin/AdminCrudShell";

export interface NavItem {
  id: string;
  label: string;
  url: string;
  target?: string;
  badge?: string;
  sortOrder: number;
  children?: NavItem[];
}

export const MENU_TABS = [
  { code: "HEADER_PRIMARY", label: "Primary Header Navigation" },
  { code: "FOOTER_QUICK", label: "Footer Quick Links" },
  { code: "FOOTER_PRODUCTS", label: "Footer Product Links" },
];

export const DEFAULT_HEADER_TREE: NavItem[] = [
  {
    id: "nav-1",
    label: "ABOUT US",
    url: "/our-story",
    sortOrder: 1,
    children: [
      { id: "nav-1-1", label: "Our Story", url: "/our-story", sortOrder: 1 },
      { id: "nav-1-2", label: "Our Business & Plants", url: "/our-business", sortOrder: 2 },
    ],
  },
  {
    id: "nav-2",
    label: "SUSTAINABILITY",
    url: "/our-business",
    sortOrder: 2,
    children: [
      { id: "nav-2-1", label: "LEED Platinum Complex", url: "/our-business", sortOrder: 1 },
      { id: "nav-2-2", label: "Eco Virgin Resins", url: "/our-business", sortOrder: 2 },
    ],
  },
  {
    id: "nav-3",
    label: "FIND OUR PRODUCT",
    url: "/products",
    sortOrder: 3,
    badge: "CATALOG",
    children: [
      { id: "nav-3-1", label: "Metal Drums & Cans", url: "/products", sortOrder: 1 },
      { id: "nav-3-2", label: "Plastic Bottles & Jars", url: "/products", sortOrder: 2 },
      { id: "nav-3-3", label: "Paint Pails", url: "/products", sortOrder: 3 },
    ],
  },
  {
    id: "nav-4",
    label: "KNOWLEDGE HUB",
    url: "/media",
    sortOrder: 4,
    children: [
      { id: "nav-4-1", label: "Press & News", url: "/media", sortOrder: 1 },
      { id: "nav-4-2", label: "TV News Videos", url: "/tv-news", sortOrder: 2 },
      { id: "nav-4-3", label: "Technical Guides", url: "/media", sortOrder: 3 },
    ],
  },
  {
    id: "nav-5",
    label: "ACHIEVEMENTS",
    url: "/certificates",
    sortOrder: 5,
    children: [
      { id: "nav-5-1", label: "Certificates & Accreditations", url: "/certificates", sortOrder: 1 },
      { id: "nav-5-2", label: "Brands We Work With", url: "/brands-we-work-with", sortOrder: 2 },
    ],
  },
  {
    id: "nav-6",
    label: "TV NEWS",
    url: "/tv-news",
    sortOrder: 6,
  },
  {
    id: "nav-7",
    label: "MEDIA AND CONTACTS",
    url: "/media",
    sortOrder: 7,
    children: [
      { id: "nav-7-1", label: "Press & Media Coverage", url: "/media", sortOrder: 1 },
      { id: "nav-7-2", label: "Careers", url: "/careers", sortOrder: 2 },
      { id: "nav-7-3", label: "Request a Quote", url: "/request-quote", sortOrder: 3 },
    ],
  },
];

export const DEFAULT_FOOTER_TREE: NavItem[] = [
  { id: "f-1", label: "Home", url: "/", sortOrder: 1 },
  { id: "f-2", label: "About Us", url: "/our-story", sortOrder: 2 },
  { id: "f-3", label: "Products", url: "/products", sortOrder: 3 },
  { id: "f-4", label: "Certificates", url: "/certificates", sortOrder: 4 },
];

export function getFallbackMenuTree(code: string): NavItem[] {
  return code === "HEADER_PRIMARY" ? DEFAULT_HEADER_TREE : DEFAULT_FOOTER_TREE;
}

export default function NavigationItemForm({
  mode,
  menuCode,
  parentId,
  itemId,
}: {
  mode: "create" | "edit";
  menuCode: string;
  parentId?: string;
  itemId?: string;
}) {
  const router = useRouter();
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [registeredLinks, setRegisteredLinks] = useState<RegisteredLinkItem[]>([]);
  const [resolvedParentId, setResolvedParentId] = useState<string | undefined>(parentId);
  const [existingItem, setExistingItem] = useState<NavItem | null>(null);

  const [formLabel, setFormLabel] = useState("");
  const [formUrl, setFormUrl] = useState("/");
  const [formBadge, setFormBadge] = useState("");
  const [formTarget, setFormTarget] = useState("_self");

  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [saving, setSaving] = useState(false);
  const [storageMode, setStorageMode] = useState<"database" | "fallback">("database");
  const { toast, showToast, clearToast } = useAdminToast();

  useEffect(() => {
    let active = true;

    async function init() {
      setLoading(true);
      let loadedTree: NavItem[] = getFallbackMenuTree(menuCode);

      try {
        const [treeRes, linksRes] = await Promise.allSettled([
          api.navigation.getTree(menuCode),
          api.links.getAll(),
        ]);

        if (!active) return;

        if (treeRes.status === "fulfilled" && Array.isArray(treeRes.value?.data) && treeRes.value.data.length > 0) {
          loadedTree = treeRes.value.data;
          setStorageMode("database");
        } else {
          setStorageMode("fallback");
        }

        if (linksRes.status === "fulfilled" && Array.isArray(linksRes.value?.data)) {
          setRegisteredLinks(linksRes.value.data);
        }
      } catch {
        if (active) setStorageMode("fallback");
      }

      if (!active) return;
      setNavItems(loadedTree);

      if (mode === "edit") {
        if (!itemId) {
          setNotFound(true);
          setLoading(false);
          return;
        }

        let found: NavItem | undefined;
        let foundParentId = parentId;

        if (parentId) {
          const parentNode = loadedTree.find((n) => n.id === parentId);
          found = parentNode?.children?.find((c) => c.id === itemId);
        }

        if (!found) {
          found = loadedTree.find((n) => n.id === itemId);
        }

        if (!found) {
          for (const top of loadedTree) {
            const match = (top.children || []).find((c) => c.id === itemId);
            if (match) {
              found = match;
              foundParentId = top.id;
              break;
            }
          }
        }

        if (found) {
          setExistingItem(found);
          setResolvedParentId(foundParentId);
          setFormLabel(found.label || "");
          setFormUrl(found.url || "/");
          setFormBadge(found.badge || "");
          setFormTarget(found.target || "_self");
        } else {
          setNotFound(true);
        }
      }

      setLoading(false);
    }

    init();
    return () => {
      active = false;
    };
  }, [mode, menuCode, parentId, itemId]);

  const handleSaveItemForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formLabel.trim() || !formUrl.trim()) {
      showToast("Menu Label and Destination URL are required.", "error");
      return;
    }

    setSaving(true);
    const effectiveParentId = resolvedParentId || parentId;

    const newItemData: NavItem = {
      id: existingItem?.id || `nav-${Date.now()}`,
      label: formLabel.trim(),
      url: formUrl.trim(),
      badge: formBadge.trim(),
      target: formTarget,
      sortOrder: existingItem?.sortOrder || navItems.length + 1,
      children: existingItem?.children || [],
    };

    let updatedTree: NavItem[];

    if (effectiveParentId) {
      updatedTree = navItems.map((parent) => {
        if (parent.id === effectiveParentId) {
          const children = parent.children || [];
          const exists = children.some((c) => c.id === newItemData.id);
          const updatedChildren = exists
            ? children.map((c) => (c.id === newItemData.id ? { ...c, ...newItemData } : c))
            : [...children, { ...newItemData, sortOrder: children.length + 1 }];
          return { ...parent, children: updatedChildren };
        }
        return parent;
      });
    } else if (existingItem) {
      updatedTree = navItems.map((item) =>
        item.id === existingItem.id ? { ...item, ...newItemData } : item
      );
    } else {
      updatedTree = [...navItems, newItemData];
    }

    try {
      await api.navigation.saveTree(menuCode, updatedTree);
      router.push(`/admin/navigation?menu=${encodeURIComponent(menuCode)}`);
      router.refresh();
    } catch (err: any) {
      showToast(err?.message || "Failed to save navigation item.", "error");
    } finally {
      setSaving(false);
    }
  };

  const activeMenuLabel = MENU_TABS.find((t) => t.code === menuCode)?.label || menuCode;
  const backHref = `/admin/navigation?menu=${encodeURIComponent(menuCode)}`;

  return (
    <div className="w-full space-y-6 pb-10">
      <AdminFormHeader
        backHref={backHref}
        backLabel="Back to Navigation Menu Builder"
        icon={<MenuSquare className="w-6 h-6 text-blue-400" />}
        title={
          mode === "edit"
            ? `Edit Navigation Item${formLabel ? `: ${formLabel}` : ""}`
            : parentId
            ? "Add Child Submenu Item"
            : "Add Top-Level Menu Item"
        }
        subtitle={`Target menu: ${activeMenuLabel}. Saving updates the full navigation tree cleanly.`}
        storageMode={storageMode}
      />

      {loading ? (
        <AdminEditLoadingState label="Loading navigation menu tree..." />
      ) : notFound ? (
        <AdminEditNotFoundState
          title="Navigation Item Not Found"
          description="This navigation entry could not be found in the selected menu tree."
          backHref={backHref}
          backLabel="Back to Navigation Builder"
        />
      ) : (
        <form
          onSubmit={handleSaveItemForm}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Menu Label *</label>
              <input
                type="text"
                required
                value={formLabel}
                onChange={(e) => setFormLabel(e.target.value)}
                placeholder="e.g. SUSTAINABILITY"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Destination URL / Route *
              </label>
              <input
                type="text"
                required
                value={formUrl}
                onChange={(e) => setFormUrl(e.target.value)}
                placeholder="e.g. /our-story or https://..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm font-mono text-cyan-400 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {registeredLinks.length > 0 && (
            <div>
              <label className="block text-slate-400 text-[11px] uppercase font-bold mb-1.5">
                Or Select from Link Registry
              </label>
              <select
                defaultValue=""
                onChange={(e) => {
                  if (e.target.value) setFormUrl(e.target.value);
                }}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-blue-500"
              >
                <option value="">-- Choose registered link destination --</option>
                {registeredLinks.map((link, idx) => {
                  const item = normalizeRegisteredLink(link, idx);
                  return (
                    <option key={item.optionKey} value={item.url}>
                      {item.title} ({item.url})
                    </option>
                  );
                })}
              </select>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Badge Text (Optional)
              </label>
              <input
                type="text"
                value={formBadge}
                onChange={(e) => setFormBadge(e.target.value)}
                placeholder="e.g. NEW"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 uppercase"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Window Target
              </label>
              <select
                value={formTarget}
                onChange={(e) => setFormTarget(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              >
                <option value="_self">Same Tab (_self)</option>
                <option value="_blank">New Tab (_blank)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <Link
              href={backHref}
              className="px-4 py-2 rounded-xl border border-slate-700 text-xs font-bold text-slate-300 hover:bg-slate-800"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs cursor-pointer disabled:opacity-60"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? "Saving..." : mode === "edit" ? "Update Menu Item" : "Save Menu Item"}</span>
            </button>
          </div>
        </form>
      )}

      <AdminToast toast={toast} onClose={clearToast} />
    </div>
  );
}

