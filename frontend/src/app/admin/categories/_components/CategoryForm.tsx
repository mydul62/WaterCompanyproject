"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Tags, Save } from "lucide-react";
import { api } from "@/lib/api";
import MediaPickerModal from "@/components/admin/MediaPickerModal";
import {
  AdminFormHeader,
  AdminEditLoadingState,
  AdminEditNotFoundState,
  AdminToast,
  useAdminToast,
} from "@/components/admin/AdminCrudShell";

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  sortOrder: number;
  _count?: { products: number };
}

export const DEFAULT_CATEGORIES: CategoryItem[] = [
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

export default function CategoryForm({
  mode,
  categoryId,
}: {
  mode: "create" | "edit";
  categoryId?: string;
}) {
  const router = useRouter();
  const [formName, setFormName] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formImage, setFormImage] = useState("/images/catalog/cat-prod-1.png");
  const [formSortOrder, setFormSortOrder] = useState(1);

  const [loading, setLoading] = useState(mode === "edit");
  const [notFound, setNotFound] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [storageMode, setStorageMode] = useState<"database" | "fallback">("database");
  const { toast, showToast, clearToast } = useAdminToast();

  useEffect(() => {
    let active = true;

    async function init() {
      if (mode === "create") {
        try {
          const res = await api.categories.getAll();
          if (active && Array.isArray(res.data)) {
            setFormSortOrder(res.data.length + 1);
            setStorageMode("database");
          }
        } catch {
          if (active) {
            setFormSortOrder(DEFAULT_CATEGORIES.length + 1);
            setStorageMode("fallback");
          }
        }
        return;
      }

      if (!categoryId) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const res = await api.categories.getById(categoryId);
        if (!active) return;
        const c = res?.data;
        if (c) {
          setFormName(c.name || "");
          setFormSlug(c.slug || "");
          setFormDesc(c.description || "");
          setFormImage(c.image || "/images/catalog/cat-prod-1.png");
          setFormSortOrder(c.sortOrder ?? c.order ?? 1);
          setStorageMode("database");
        } else {
          setNotFound(true);
        }
      } catch {
        const fallback = DEFAULT_CATEGORIES.find((c) => c.id === categoryId || c.slug === categoryId);
        if (fallback && active) {
          setFormName(fallback.name);
          setFormSlug(fallback.slug);
          setFormDesc(fallback.description || "");
          setFormImage(fallback.image || "/images/catalog/cat-prod-1.png");
          setFormSortOrder(fallback.sortOrder ?? 1);
          setStorageMode("fallback");
        } else if (active) {
          setNotFound(true);
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    init();
    return () => {
      active = false;
    };
  }, [mode, categoryId]);

  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      showToast("Category name is required.", "error");
      return;
    }

    setSaving(true);
    const payload = {
      name: formName.trim(),
      slug:
        formSlug.trim() ||
        formName
          .trim()
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-"),
      description: formDesc.trim(),
      image: formImage.trim() || "/images/catalog/cat-prod-1.png",
      sortOrder: Number(formSortOrder) || 1,
    };

    try {
      if (mode === "edit" && categoryId) {
        await api.categories.update(categoryId, payload);
      } else {
        await api.categories.create(payload);
      }
      router.push("/admin/categories");
      router.refresh();
    } catch (err: any) {
      showToast(err?.message || "Failed to save category.", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full space-y-6 pb-10">
      <AdminFormHeader
        backHref="/admin/categories"
        backLabel="Back to Product Categories"
        icon={<Tags className="w-6 h-6 text-blue-400" />}
        title={mode === "edit" ? `Edit Category${formName ? `: ${formName}` : ""}` : "Create Category"}
        subtitle="Organize packaging taxonomies across metal drums, plastic bottles, paint cans, and pails."
        storageMode={storageMode}
      />

      {loading ? (
        <AdminEditLoadingState label="Loading category details..." />
      ) : notFound ? (
        <AdminEditNotFoundState
          title="Category Not Found"
          description="This product category could not be loaded or may have been deleted."
          backHref="/admin/categories"
          backLabel="Back to Categories"
        />
      ) : (
        <form
          onSubmit={handleSaveCategory}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Category Name *
              </label>
              <input
                type="text"
                required
                value={formName}
                onChange={(e) => {
                  setFormName(e.target.value);
                  if (mode === "create") {
                    setFormSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
                  }
                }}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Category Slug *
              </label>
              <input
                type="text"
                required
                value={formSlug}
                onChange={(e) => setFormSlug(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm font-mono text-cyan-400 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Thumbnail Image
              </label>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={formImage || "/images/catalog/cat-prod-1.png"}
                    alt="Category preview"
                    className="w-full h-full object-contain p-1"
                  />
                </div>
                <input
                  type="text"
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-mono text-cyan-400 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setIsMediaModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold cursor-pointer shrink-0"
                >
                  Browse Imaple
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Sort Order
              </label>
              <input
                type="number"
                value={formSortOrder}
                onChange={(e) => setFormSortOrder(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Description
            </label>
            <textarea
              rows={3}
              value={formDesc}
              onChange={(e) => setFormDesc(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <Link
              href="/admin/categories"
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
              <span>{saving ? "Saving..." : mode === "edit" ? "Update Category" : "Save Category"}</span>
            </button>
          </div>
        </form>
      )}

      <MediaPickerModal
        isOpen={isMediaModalOpen}
        onClose={() => setIsMediaModalOpen(false)}
        onSelect={(asset) => setFormImage(asset.url)}
        currentValue={formImage}
      />

      <AdminToast toast={toast} onClose={clearToast} />
    </div>
  );
}

