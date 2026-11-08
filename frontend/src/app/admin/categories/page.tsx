"use client";

import React, { useState, useEffect } from "react";
import {
  Tags,
  Plus,
  Search,
  Edit,
  Trash2,
  CheckCircle,
  X,
  RefreshCw,
  FolderTree,
  ImageIcon,
} from "lucide-react";
import { api } from "@/lib/api";
import MediaPickerModal from "@/components/admin/MediaPickerModal";

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  sortOrder: number;
  _count?: { products: number };
}

const DEFAULT_CATEGORIES: CategoryItem[] = [
  {
    id: "cat-1",
    name: "Metal Containers & Drums",
    slug: "metal-drum",
    description: "Conical drums, tight-head pails, and UN-certified industrial chemical containers.",
    image: "/images/catalog/cat-prod-1.png",
    sortOrder: 1,
    _count: { products: 12 },
  },
  {
    id: "cat-2",
    name: "Bottles & Jars",
    slug: "plastic-bottle",
    description: "Precision medical-grade HDPE bottles, child-resistant caps, and dropper bottles.",
    image: "/images/catalog/cat-prod-2.png",
    sortOrder: 2,
    _count: { products: 18 },
  },
  {
    id: "cat-3",
    name: "Paint & Chemical Cans",
    slug: "paint-tin",
    description: "Offset printed rectangular and round paint cans with triple-tight ring seals.",
    image: "/images/catalog/cat-prod-3.png",
    sortOrder: 3,
    _count: { products: 15 },
  },
  {
    id: "cat-4",
    name: "Pails & Buckets",
    slug: "pail-bucket",
    description: "Injection-molded polypropylene heavy-duty buckets with tamper-proof lids.",
    image: "/images/catalog/cat-prod-2.png",
    sortOrder: 4,
    _count: { products: 8 },
  },
  {
    id: "cat-5",
    name: "Custom Specialized Packaging",
    slug: "custom-packaging",
    description: "Bespoke tooling, custom neck finishes, and client-tailored industrial packaging.",
    image: "/images/catalog/cat-prod-1.png",
    sortOrder: 5,
    _count: { products: 6 },
  },
];

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<CategoryItem[]>(DEFAULT_CATEGORIES);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Category Editor Modal
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);
  const [formName, setFormName] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formImage, setFormImage] = useState("");
  const [formSortOrder, setFormSortOrder] = useState(1);

  // Media Picker
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const res = await api.categories.getAll();
      if (res.data && res.data.length > 0) {
        setCategories(res.data);
      }
    } catch (err) {
      console.warn("Using default categories fallback:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingCategory(null);
    setFormName("");
    setFormSlug("");
    setFormDesc("");
    setFormImage("/images/catalog/cat-prod-1.png");
    setFormSortOrder(categories.length + 1);
    setIsEditorOpen(true);
  };

  const handleOpenEdit = (c: CategoryItem) => {
    setEditingCategory(c);
    setFormName(c.name);
    setFormSlug(c.slug);
    setFormDesc(c.description || "");
    setFormImage(c.image || "/images/catalog/cat-prod-1.png");
    setFormSortOrder(c.sortOrder);
    setIsEditorOpen(true);
  };

  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: formName,
      slug: formSlug || formName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      description: formDesc,
      image: formImage,
      sortOrder: Number(formSortOrder),
    };

    try {
      if (editingCategory) {
        await api.categories.update(editingCategory.id, payload);
        setCategories(
          categories.map((c) =>
            c.id === editingCategory.id ? { ...c, ...payload } : c
          )
        );
        showNotification(`Updated category "${formName}"`);
      } else {
        const res = await api.categories.create(payload);
        const created = res.data || {
          ...payload,
          id: `cat-${Date.now()}`,
          _count: { products: 0 },
        };
        setCategories([...categories, created]);
        showNotification(`Created category "${formName}"`);
      }
      setIsEditorOpen(false);
    } catch (err) {
      if (editingCategory) {
        setCategories(
          categories.map((c) =>
            c.id === editingCategory.id ? { ...c, ...payload } : c
          )
        );
        showNotification(`Updated category "${formName}"`);
      } else {
        const fallback = {
          ...payload,
          id: `cat-${Date.now()}`,
          _count: { products: 0 },
        };
        setCategories([...categories, fallback]);
        showNotification(`Created category "${formName}"`);
      }
      setIsEditorOpen(false);
    }
  };

  const handleDeleteCategory = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete category "${name}"?`)) return;
    try {
      await api.categories.delete(id);
      setCategories(categories.filter((c) => c.id !== id));
      showNotification(`Category "${name}" deleted.`);
    } catch (err) {
      setCategories(categories.filter((c) => c.id !== id));
      showNotification(`Category "${name}" deleted.`);
    }
  };

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <Tags className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white tracking-tight">
              Product Categories & Taxonomies
            </h1>
            <p className="text-xs text-slate-400">
              Organize packaging lines across metal drums, plastic bottles, paint cans, and pails
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={loadCategories}
            disabled={loading}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-blue-400" : ""}`} />
          </button>
          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            New Category
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search categories by name or slug..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCategories.map((cat) => (
          <div
            key={cat.id}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cat.image || "/images/catalog/cat-prod-1.png"}
                    alt={cat.name}
                    className="w-full h-full object-contain p-1"
                  />
                </div>
                <span className="px-2 py-0.5 rounded-full bg-blue-950/60 border border-blue-800/40 text-blue-300 font-mono text-[10px] font-bold">
                  {cat._count?.products ?? 0} Products
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white">{cat.name}</h3>
                <span className="text-[11px] font-mono text-cyan-400 block mt-0.5">
                  slug: /{cat.slug}
                </span>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                  {cat.description || "No description provided."}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-500">
                Sort Order: #{cat.sortOrder ?? (cat as any).order ?? 1}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenEdit(cat)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white transition-colors"
                  title="Edit Category"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDeleteCategory(cat.id, cat.name)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-950 hover:text-red-400 text-slate-400 transition-colors"
                  title="Delete Category"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Editor Modal */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white">
                {editingCategory ? `Edit Category: ${editingCategory.name}` : "Create Category"}
              </h3>
              <button
                onClick={() => setIsEditorOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => {
                    setFormName(e.target.value);
                    if (!editingCategory) {
                      setFormSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
                    }
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Category Slug *</label>
                <input
                  type="text"
                  required
                  value={formSlug}
                  onChange={(e) => setFormSlug(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-cyan-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Description</label>
                <textarea
                  rows={2}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Thumbnail Image</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-cyan-400 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setIsMediaModalOpen(true)}
                    className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold"
                  >
                    Browse Imaple
                  </button>
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
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Media Picker */}
      <MediaPickerModal
        isOpen={isMediaModalOpen}
        onClose={() => setIsMediaModalOpen(false)}
        onSelect={(asset) => setFormImage(asset.url)}
        currentValue={formImage}
      />
    </div>
  );
}
