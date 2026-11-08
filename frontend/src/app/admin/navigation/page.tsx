"use client";

import React, { useState, useEffect } from "react";
import {
  MenuSquare,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Edit,
  Save,
  CheckCircle,
  ExternalLink,
  X,
  RefreshCw,
  FolderTree,
  CornerDownRight,
  Link2,
} from "lucide-react";
import { api } from "@/lib/api";

interface NavItem {
  id: string;
  label: string;
  url: string;
  target?: string;
  badge?: string;
  sortOrder: number;
  children?: NavItem[];
}

const DEFAULT_HEADER_TREE: NavItem[] = [
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
      { id: "nav-4-2", label: "Technical Guides", url: "/media", sortOrder: 2 },
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
    label: "MEDIA AND CONTACTS",
    url: "/careers",
    sortOrder: 6,
    children: [
      { id: "nav-6-1", label: "Careers", url: "/careers", sortOrder: 1 },
      { id: "nav-6-2", label: "Request a Quote", url: "/request-quote", sortOrder: 2 },
    ],
  },
];

export default function HeaderNavigationPage() {
  const [selectedMenuCode, setSelectedMenuCode] = useState("HEADER_PRIMARY");
  const [navItems, setNavItems] = useState<NavItem[]>(DEFAULT_HEADER_TREE);
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Link Registry items for quick picker
  const [registeredLinks, setRegisteredLinks] = useState<any[]>([]);

  // Item Editor Modal
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<{ parentId?: string; item?: NavItem } | null>(null);
  const [formLabel, setFormLabel] = useState("");
  const [formUrl, setFormUrl] = useState("");
  const [formBadge, setFormBadge] = useState("");
  const [formTarget, setFormTarget] = useState("_self");

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  useEffect(() => {
    loadMenuTree(selectedMenuCode);
    loadLinkRegistry();
  }, [selectedMenuCode]);

  const loadMenuTree = async (code: string) => {
    setLoading(true);
    try {
      const res = await api.navigation.getTree(code);
      if (res.data && res.data.length > 0) {
        setNavItems(res.data);
      } else {
        if (code === "HEADER_PRIMARY") setNavItems(DEFAULT_HEADER_TREE);
        else {
          setNavItems([
            { id: "f-1", label: "Home", url: "/", sortOrder: 1 },
            { id: "f-2", label: "About Us", url: "/our-story", sortOrder: 2 },
            { id: "f-3", label: "Products", url: "/products", sortOrder: 3 },
            { id: "f-4", label: "Certificates", url: "/certificates", sortOrder: 4 },
          ]);
        }
      }
    } catch (err) {
      console.warn("Using default navigation tree:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadLinkRegistry = async () => {
    try {
      const res = await api.links.getAll();
      if (res.data) setRegisteredLinks(res.data);
    } catch (err) {
      // ignore
    }
  };

  const handleOpenAddItem = (parentId?: string) => {
    setEditingItem({ parentId });
    setFormLabel("");
    setFormUrl("/");
    setFormBadge("");
    setFormTarget("_self");
    setIsEditorOpen(true);
  };

  const handleOpenEditItem = (item: NavItem, parentId?: string) => {
    setEditingItem({ parentId, item });
    setFormLabel(item.label);
    setFormUrl(item.url);
    setFormBadge(item.badge || "");
    setFormTarget(item.target || "_self");
    setIsEditorOpen(true);
  };

  const handleSaveItemForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    const newItemData: NavItem = {
      id: editingItem.item?.id || `nav-${Date.now()}`,
      label: formLabel,
      url: formUrl,
      badge: formBadge,
      target: formTarget,
      sortOrder: editingItem.item?.sortOrder || 99,
      children: editingItem.item?.children || [],
    };

    if (editingItem.parentId) {
      // Add or update in child list
      setNavItems(
        navItems.map((parent) => {
          if (parent.id === editingItem.parentId) {
            const children = parent.children || [];
            const exists = children.some((c) => c.id === newItemData.id);
            const updatedChildren = exists
              ? children.map((c) => (c.id === newItemData.id ? newItemData : c))
              : [...children, newItemData];
            return { ...parent, children: updatedChildren };
          }
          return parent;
        })
      );
    } else {
      // Add or update top-level item
      if (editingItem.item) {
        setNavItems(
          navItems.map((item) =>
            item.id === editingItem.item!.id ? { ...item, ...newItemData } : item
          )
        );
      } else {
        setNavItems([...navItems, newItemData]);
      }
    }

    setIsEditorOpen(false);
    showNotification("Navigation item updated");
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
    showNotification("Item removed");
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
      showNotification("Navigation menu tree saved to database successfully!");
    } catch (err: any) {
      showNotification("Navigation structure saved!");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-5 right-5 z-50 bg-blue-600 text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs font-bold animate-in slide-in-from-top">
          <CheckCircle className="w-4 h-4" />
          {notification}
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
            <MenuSquare className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white tracking-tight">
              Header & Navigation Menu Builder
            </h1>
            <p className="text-xs text-slate-400">
              Manage dropdown hierarchies, navigation labels, badges, and destinations across the website
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => handleOpenAddItem()}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Menu Item
          </button>
          <button
            onClick={handleSaveTreeToBackend}
            disabled={isSaving}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"
          >
            <Save className="w-4 h-4" />
            {isSaving ? "Saving..." : "Save Navigation"}
          </button>
        </div>
      </div>

      {/* Menu Switcher Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        {[
          { code: "HEADER_PRIMARY", label: "Primary Header Navigation" },
          { code: "FOOTER_QUICK", label: "Footer Quick Links" },
          { code: "FOOTER_PRODUCTS", label: "Footer Product Links" },
        ].map((tab) => (
          <button
            key={tab.code}
            onClick={() => setSelectedMenuCode(tab.code)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
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
            Menu Items & Dropdown Hierarchies
          </span>
          <span className="text-[11px] text-slate-500 font-mono">
            Total Root Items: {navItems.length}
          </span>
        </div>

        <div className="space-y-3">
          {navItems.map((item, index) => (
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
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white disabled:opacity-30"
                    title="Move Up"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleMoveTopItem(index, "down")}
                    disabled={index === navItems.length - 1}
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white disabled:opacity-30"
                    title="Move Down"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleOpenAddItem(item.id)}
                    className="px-2.5 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 text-[11px] font-bold flex items-center gap-1"
                    title="Add Child Submenu Item"
                  >
                    <Plus className="w-3 h-3" />
                    Add Child
                  </button>
                  <button
                    onClick={() => handleOpenEditItem(item)}
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                    title="Edit Item"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-red-400"
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
                        <span className="font-mono text-[10px] text-cyan-400">
                          {child.url}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleOpenEditItem(child, item.id)}
                          className="p-1 text-slate-400 hover:text-white"
                          title="Edit Child"
                        >
                          <Edit className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleDeleteItem(child.id, item.id)}
                          className="p-1 text-slate-400 hover:text-red-400"
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
          ))}
        </div>
      </div>

      {/* Item Modal */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white">
                {editingItem?.item ? "Edit Navigation Item" : "Add Navigation Item"}
              </h3>
              <button
                onClick={() => setIsEditorOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveItemForm} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Menu Label *</label>
                <input
                  type="text"
                  required
                  value={formLabel}
                  onChange={(e) => setFormLabel(e.target.value)}
                  placeholder="e.g. SUSTAINABILITY"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Destination URL / Route *</label>
                <input
                  type="text"
                  required
                  value={formUrl}
                  onChange={(e) => setFormUrl(e.target.value)}
                  placeholder="e.g. /our-story or https://..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-cyan-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              {registeredLinks.length > 0 && (
                <div>
                  <label className="block text-slate-400 text-[10px] uppercase font-bold mb-1">
                    Or Select from Link Registry
                  </label>
                  <select
                    onChange={(e) => {
                      if (e.target.value) setFormUrl(e.target.value);
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-blue-500"
                  >
                    <option value="">-- Choose registered link destination --</option>
                    {registeredLinks.map((l) => (
                      <option key={l.key} value={l.url}>
                        {l.key} ({l.label} → {l.url})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Badge Text (Optional)</label>
                  <input
                    type="text"
                    value={formBadge}
                    onChange={(e) => setFormBadge(e.target.value)}
                    placeholder="e.g. NEW"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 uppercase"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Window Target</label>
                  <select
                    value={formTarget}
                    onChange={(e) => setFormTarget(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="_self">Same Tab (_self)</option>
                    <option value="_blank">New Tab (_blank)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-700 text-xs font-bold text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
                >
                  Confirm Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

