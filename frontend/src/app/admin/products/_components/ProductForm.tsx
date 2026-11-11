"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Package, Save, ImageIcon } from "lucide-react";
import { api } from "@/lib/api";
import MediaPickerModal from "@/components/admin/MediaPickerModal";
import {
  AdminFormHeader,
  AdminEditLoadingState,
  AdminEditNotFoundState,
  AdminToast,
  useAdminToast,
} from "@/components/admin/AdminCrudShell";

export interface ProductItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  categoryLabel?: string;
  material: string;
  capacityRange: string;
  applications: string[];
  image: string;
  gallery?: string[];
  description: string;
  isActive: boolean;
  factory: string;
  sku?: string;
  specifications?: Record<string, string>;
  sortOrder?: number;
  metaTitle?: string;
  metaDescription?: string;
}

export const DEFAULT_PRODUCTS: ProductItem[] = [
  {
    id: "prod-1",
    name: "20L Industrial Conical Steel Drum",
    slug: "20l-industrial-conical-steel-drum",
    category: "metal-drum",
    categoryLabel: "Metal Containers & Drums",
    material: "Prime Tinplate (ETP) / Cold Rolled Steel",
    capacityRange: "18L – 25L",
    applications: ["Automotive Lubricants", "Industrial Solvents", "Marine Coatings"],
    image: "/images/catalog/cat-prod-1.png",
    description: "UN-certified heavy-duty conical metal pail with lever-lock sealing ring for international hazmat logistics.",
    isActive: true,
    factory: "Noor Plastic Industries",
    sku: "NP-IND-20L",
    specifications: {
      "Thickness": "0.32 mm - 0.38 mm",
      "Internal Coating": "Epoxy Phenolic Lacquer",
      "Closure": "Lug Cover with Lever Ring",
      "UN Rating": "1A2/Y1.5/100",
    },
  },
  {
    id: "prod-2",
    name: "100ml Pharmaceutical HDPE Bottle",
    slug: "100ml-pharmaceutical-hdpe-bottle",
    category: "plastic-bottle",
    categoryLabel: "Bottles & Jars",
    material: "100% Virgin Food-Grade HDPE",
    capacityRange: "100 ml",
    applications: ["Pharmaceutical", "Medical Solutions", "Healthcare"],
    image: "/images/catalog/cat-prod-2.png",
    description: "GMP cleanroom manufactured medical bottle with tamper-evident tear seal ring.",
    isActive: true,
    factory: "Noor Plastic Industries",
    sku: "NP-MED-100",
    specifications: {
      "Neck Finish": "28 mm Child Resistant",
      "Resin Grade": "FDA Approved Virgin Resin",
      "Weight": "16 grams",
    },
  },
  {
    id: "prod-3",
    name: "4L Decorative Paint Tin Can",
    slug: "4l-decorative-paint-tin-can",
    category: "paint-tin",
    categoryLabel: "Paint & Chemical Cans",
    material: "High-Gauge Electrolytic Tinplate",
    capacityRange: "4 Litres (1 Gallon)",
    applications: ["Architectural Paint", "Wood Stains", "Adhesives"],
    image: "/images/catalog/cat-prod-3.png",
    description: "High-resolution 8-color offset printed gallon can with double friction hermetic lid.",
    isActive: true,
    factory: "Noor Plastic Industries",
    sku: "NP-PNT-4L",
    specifications: {
      "Printing": "UV Gloss + Metallic Sheen",
      "Seaming": "Double Seamed Hermetic Bottom",
      "Handle": "Galvanized Wire with Plastic Grip",
    },
  },
];

export function normalizeProduct(p: any): ProductItem {
  const catName =
    typeof p.category === "object" && p.category !== null
      ? p.category.name
      : typeof p.category === "string"
      ? p.category
      : "General";
  const catSlug =
    typeof p.category === "object" && p.category !== null
      ? p.category.slug
      : typeof p.category === "string"
      ? p.category
      : "general";

  let apps: string[] = [];
  if (Array.isArray(p.applications)) {
    apps = p.applications;
  } else if (typeof p.applications === "string") {
    try {
      const parsed = JSON.parse(p.applications || "[]");
      apps = Array.isArray(parsed) ? parsed : [];
    } catch {
      apps = p.applications
        .split(",")
        .map((s: string) => s.trim())
        .filter(Boolean);
    }
  }

  return {
    ...p,
    image: p.imageUrl || p.image || "/images/catalog/cat-prod-1.png",
    category: catSlug,
    categoryLabel: p.categoryLabel || catName,
    capacityRange: p.capacityRange || "Standard",
    factory: p.factory || "Noor Plastic Industries",
    applications: apps,
    description: p.description || "",
    material: p.material || "",
    isActive: p.isActive ?? true,
  };
}

export default function ProductForm({
  mode,
  productId,
}: {
  mode: "create" | "edit";
  productId?: string;
}) {
  const router = useRouter();
  const [formName, setFormName] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formCategory, setFormCategory] = useState("metal-drum");
  const [formFactory, setFormFactory] = useState("Noor Plastic Industries");
  const [formMaterial, setFormMaterial] = useState("Prime Tinplate (ETP)");
  const [formCapacity, setFormCapacity] = useState("20 Litre");
  const [formDescription, setFormDescription] = useState("");
  const [formImage, setFormImage] = useState("/images/catalog/cat-prod-1.png");
  const [formSku, setFormSku] = useState("");
  const [formApplications, setFormApplications] = useState("Industrial Paints, Solvents");
  const [formIsActive, setFormIsActive] = useState(true);

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
        setFormSku(`NP-${Date.now().toString().slice(-4)}`);
        return;
      }

      if (!productId) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const res = await api.products.getById(productId);
        if (!active) return;
        if (res?.data) {
          const p = normalizeProduct(res.data);
          setFormName(p.name);
          setFormSlug(p.slug);
          setFormCategory(p.category || "metal-drum");
          setFormFactory(p.factory || "Noor Plastic Industries");
          setFormMaterial(p.material || "");
          setFormCapacity(p.capacityRange || "");
          setFormDescription(p.description || "");
          setFormImage(p.image || "/images/catalog/cat-prod-1.png");
          setFormSku(p.sku || "");
          setFormApplications(p.applications ? p.applications.join(", ") : "");
          setFormIsActive(p.isActive ?? true);
          setStorageMode("database");
        } else {
          setNotFound(true);
        }
      } catch {
        const fallback = DEFAULT_PRODUCTS.find((p) => p.id === productId || p.slug === productId);
        if (fallback && active) {
          setFormName(fallback.name);
          setFormSlug(fallback.slug);
          setFormCategory(fallback.category);
          setFormFactory(fallback.factory);
          setFormMaterial(fallback.material);
          setFormCapacity(fallback.capacityRange);
          setFormDescription(fallback.description);
          setFormImage(fallback.image);
          setFormSku(fallback.sku || "");
          setFormApplications(fallback.applications.join(", "));
          setFormIsActive(fallback.isActive);
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
  }, [mode, productId]);

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formSku.trim()) {
      showToast("Product Name and SKU are required.", "error");
      return;
    }

    setSaving(true);
    const appArray = formApplications
      .split(",")
      .map((a) => a.trim())
      .filter(Boolean);

    const productPayload = {
      name: formName.trim(),
      slug:
        formSlug.trim() ||
        formName
          .trim()
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-"),
      category: formCategory,
      categoryLabel: formCategory.replace("-", " ").toUpperCase(),
      factory: formFactory,
      material: formMaterial.trim(),
      capacityRange: formCapacity.trim(),
      description: formDescription.trim(),
      image: formImage.trim() || "/images/catalog/cat-prod-1.png",
      sku: formSku.trim(),
      applications: appArray,
      isActive: formIsActive,
    };

    try {
      if (mode === "edit" && productId) {
        await api.products.update(productId, productPayload);
      } else {
        await api.products.create(productPayload);
      }
      router.push("/admin/products");
      router.refresh();
    } catch (err: any) {
      showToast(err?.message || "Failed to save product.", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full space-y-6 pb-10">
      <AdminFormHeader
        backHref="/admin/products"
        backLabel="Back to Product Catalog"
        icon={<Package className="w-6 h-6 text-blue-400" />}
        title={mode === "edit" ? `Edit Product${formName ? `: ${formName}` : ""}` : "Create New Catalog Product"}
        subtitle="Configure technical specifications, raw materials, sizing ranges & primary assets."
        storageMode={storageMode}
      />

      {loading ? (
        <AdminEditLoadingState label="Loading product specifications..." />
      ) : notFound ? (
        <AdminEditNotFoundState
          title="Product Not Found"
          description="This catalog product could not be loaded or may have been deleted."
          backHref="/admin/products"
          backLabel="Back to Product Catalog"
        />
      ) : (
        <form
          onSubmit={handleSaveProduct}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl text-xs"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-bold mb-1.5">Product Name *</label>
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
                placeholder="e.g. 20L Conical Industrial Drum"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 font-bold"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1.5">SKU / Code *</label>
              <input
                type="text"
                required
                value={formSku}
                onChange={(e) => setFormSku(e.target.value)}
                placeholder="NP-IND-20L"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-cyan-400 font-mono focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-300 font-bold mb-1.5">Category *</label>
              <select
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              >
                <option value="metal-drum">Metal Containers &amp; Drums</option>
                <option value="plastic-bottle">Bottles &amp; Jars</option>
                <option value="paint-tin">Paint &amp; Chemical Cans</option>
                <option value="pail-bucket">Pails &amp; Buckets</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1.5">Manufacturing Plant *</label>
              <select
                value={formFactory}
                onChange={(e) => setFormFactory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              >
                <option value="Noor Plastic Industries">Noor Plastic Industries (Kaliakoir, Gazipur)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1.5">URL Slug</label>
              <input
                type="text"
                value={formSlug}
                onChange={(e) => setFormSlug(e.target.value)}
                placeholder="20l-conical-drum"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm font-mono text-cyan-400 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-bold mb-1.5">Raw Material</label>
              <input
                type="text"
                value={formMaterial}
                onChange={(e) => setFormMaterial(e.target.value)}
                placeholder="Prime Electrolytic Tinplate (ETP)"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1.5">Capacity / Sizing Range</label>
              <input
                type="text"
                value={formCapacity}
                onChange={(e) => setFormCapacity(e.target.value)}
                placeholder="18 Litres – 25 Litres"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-bold mb-1.5">
              Product Image (Primary Asset)
            </label>
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden shrink-0 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={formImage || "/images/catalog/cat-prod-1.png"}
                  alt="Thumbnail"
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
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                Browse Imaple
              </button>
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-bold mb-1.5">
              Industry Applications (Comma-separated)
            </label>
            <input
              type="text"
              value={formApplications}
              onChange={(e) => setFormApplications(e.target.value)}
              placeholder="Automotive Lubricants, Industrial Coatings, Solvents"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-bold mb-1.5">
              Technical Description &amp; Specifications
            </label>
            <textarea
              rows={4}
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              placeholder="Full engineering specifications..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-800">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isActiveToggle"
                checked={formIsActive}
                onChange={(e) => setFormIsActive(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 bg-slate-950 border-slate-800"
              />
              <label htmlFor="isActiveToggle" className="text-slate-300 font-bold cursor-pointer">
                Publish to Public Website Catalog
              </label>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/admin/products"
                className="px-4 py-2 rounded-xl border border-slate-700 text-xs font-bold text-slate-300 hover:bg-slate-800"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? "Saving..." : mode === "edit" ? "Update Product" : "Save & Publish"}</span>
              </button>
            </div>
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

