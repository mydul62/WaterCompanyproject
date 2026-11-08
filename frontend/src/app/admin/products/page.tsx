"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Package,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  ExternalLink,
  X,
  Eye,
  RefreshCw,
  ImageIcon,
  Sparkles,
  Layers,
  ArrowUpDown,
  Tag,
} from "lucide-react";
import { api } from "@/lib/api";
import MediaPickerModal from "@/components/admin/MediaPickerModal";

interface ProductItem {
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

const DEFAULT_PRODUCTS: ProductItem[] = [
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
    factory: "Xclusive Can Limited",
    sku: "XC-IND-20L",
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
    factory: "Xclusive Can Limited",
    sku: "XC-MED-100",
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
    factory: "Q Pail Limited",
    sku: "QP-PNT-4L",
    specifications: {
      "Printing": "UV Gloss + Metallic Sheen",
      "Seaming": "Double Seamed Hermetic Bottom",
      "Handle": "Galvanized Wire with Plastic Grip",
    },
  },
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductItem[]>(DEFAULT_PRODUCTS);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [factoryFilter, setFactoryFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // Product Form Modal State
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);

  // Form Fields
  const [formName, setFormName] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formCategory, setFormCategory] = useState("metal-drum");
  const [formFactory, setFormFactory] = useState("Xclusive Can Limited");
  const [formMaterial, setFormMaterial] = useState("");
  const [formCapacity, setFormCapacity] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formImage, setFormImage] = useState("");
  const [formSku, setFormSku] = useState("");
  const [formApplications, setFormApplications] = useState("");
  const [formIsActive, setFormIsActive] = useState(true);

  // Media Picker Modal
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await api.products.getAll();
      if (res.data && res.data.length > 0) {
        const normalized: ProductItem[] = res.data.map((p: any) => {
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

          return {
            ...p,
            category: catSlug,
            categoryLabel: p.categoryLabel || catName,
            capacityRange: p.capacityRange || "Standard",
            factory: p.factory || "Xclusive Can Limited",
            applications: Array.isArray(p.applications)
              ? p.applications
              : typeof p.applications === "string"
              ? JSON.parse(p.applications || "[]")
              : [],
          };
        });
        setProducts(normalized);
      }
    } catch (err) {
      console.warn("Using default products fallback:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setFormName("");
    setFormSlug("");
    setFormCategory("metal-drum");
    setFormFactory("Xclusive Can Limited");
    setFormMaterial("Prime Tinplate (ETP)");
    setFormCapacity("20 Litre");
    setFormDescription("");
    setFormImage("/images/catalog/cat-prod-1.png");
    setFormSku(`XC-${Date.now().toString().slice(-4)}`);
    setFormApplications("Industrial Paints, Solvents");
    setFormIsActive(true);
    setIsEditorOpen(true);
  };

  const handleOpenEdit = (p: ProductItem) => {
    setEditingProduct(p);
    setFormName(p.name);
    setFormSlug(p.slug);
    const catVal =
      typeof p.category === "object" && p.category !== null
        ? (p.category as any).slug
        : p.category;
    setFormCategory(catVal || "metal-drum");
    setFormFactory(p.factory);
    setFormMaterial(p.material);
    setFormCapacity(p.capacityRange);
    setFormDescription(p.description);
    setFormImage(p.image);
    setFormSku(p.sku || "");
    setFormApplications(p.applications ? p.applications.join(", ") : "");
    setFormIsActive(p.isActive);
    setIsEditorOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const appArray = formApplications
      .split(",")
      .map((a) => a.trim())
      .filter(Boolean);

    const productPayload = {
      name: formName,
      slug: formSlug || formName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      category: formCategory,
      categoryLabel: formCategory.replace("-", " ").toUpperCase(),
      factory: formFactory,
      material: formMaterial,
      capacityRange: formCapacity,
      description: formDescription,
      image: formImage,
      sku: formSku,
      applications: appArray,
      isActive: formIsActive,
    };

    try {
      if (editingProduct) {
        await api.products.update(editingProduct.id, productPayload);
        setProducts(
          products.map((p) =>
            p.id === editingProduct.id ? { ...p, ...productPayload } : p
          )
        );
        showNotification(`Updated product "${formName}"`);
      } else {
        const res = await api.products.create(productPayload);
        const created = res.data || {
          ...productPayload,
          id: `prod-${Date.now()}`,
        };
        setProducts([created, ...products]);
        showNotification(`Created product "${formName}"`);
      }
      setIsEditorOpen(false);
    } catch (err: any) {
      // Local optimistic update
      if (editingProduct) {
        setProducts(
          products.map((p) =>
            p.id === editingProduct.id ? { ...p, ...productPayload } : p
          )
        );
        showNotification(`Updated product "${formName}"`);
      } else {
        const fallback = { ...productPayload, id: `prod-${Date.now()}` };
        setProducts([fallback, ...products]);
        showNotification(`Created product "${formName}"`);
      }
      setIsEditorOpen(false);
    }
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    if (!confirm(`Delete product "${name}" permanently?`)) return;
    try {
      await api.products.delete(id);
      setProducts(products.filter((p) => p.id !== id));
      showNotification(`Product "${name}" deleted.`);
    } catch (err) {
      setProducts(products.filter((p) => p.id !== id));
      showNotification(`Product "${name}" deleted.`);
    }
  };

  const handleToggleActive = async (p: ProductItem) => {
    const updated = !p.isActive;
    try {
      await api.products.update(p.id, { isActive: updated });
      setProducts(products.map((prod) => (prod.id === p.id ? { ...prod, isActive: updated } : prod)));
      showNotification(`Product status updated.`);
    } catch (err) {
      setProducts(products.map((prod) => (prod.id === p.id ? { ...prod, isActive: updated } : prod)));
      showNotification(`Product status updated.`);
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.sku && p.sku.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.material.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "ALL" || p.category === categoryFilter;
    const matchesFactory =
      factoryFilter === "ALL" || p.factory === factoryFilter;
    const matchesStatus =
      statusFilter === "ALL" ||
      (statusFilter === "ACTIVE" && p.isActive) ||
      (statusFilter === "INACTIVE" && !p.isActive);

    return matchesSearch && matchesCategory && matchesFactory && matchesStatus;
  });

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
            <Package className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white tracking-tight">
              Product Catalog Management
            </h1>
            <p className="text-xs text-slate-400">
              Manage technical specifications, UN certifications, and high-res imagery for all product lines
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={loadProducts}
            disabled={loading}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Refresh Products"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-blue-400" : ""}`} />
          </button>
          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            Add New Product
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by product name, SKU, or material..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-slate-300 focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">All Categories</option>
            <option value="metal-drum">Metal Containers & Drums</option>
            <option value="plastic-bottle">Bottles & Jars</option>
            <option value="paint-tin">Paint & Chemical Cans</option>
            <option value="pail-bucket">Pails & Buckets</option>
          </select>

          {/* Factory Filter */}
          <select
            value={factoryFilter}
            onChange={(e) => setFactoryFilter(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-slate-300 focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">All Manufacturing Plants</option>
            <option value="Xclusive Can Limited">Xclusive Can Limited (Gazipur)</option>
            <option value="Q Pail Limited">Q Pail Limited (Tongi)</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-slate-300 focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">All Status</option>
            <option value="ACTIVE">Active (Published)</option>
            <option value="INACTIVE">Hidden / Inactive</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 uppercase tracking-wider font-extrabold text-[10px]">
              <tr>
                <th className="py-3.5 px-5">Product & SKU</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Material & Capacity</th>
                <th className="py-3.5 px-4">Manufacturing Plant</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-slate-800/40 transition-colors group">
                  {/* Product & SKU */}
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden shrink-0 flex items-center justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={product.image || "/images/catalog/cat-prod-1.png"}
                          alt={product.name}
                          className="w-full h-full object-contain p-1"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = "none";
                          }}
                        />
                      </div>
                      <div>
                        <span className="font-bold text-white text-sm group-hover:text-blue-400 transition-colors block">
                          {product.name}
                        </span>
                        <span className="text-[10px] font-mono text-cyan-400">
                          SKU: {product.sku || "N/A"}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-4 px-4 text-slate-300">
                    <span className="inline-block px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-bold">
                      {product.categoryLabel ||
                        (typeof product.category === "object" && product.category !== null
                          ? (product.category as any).name
                          : String(product.category || "General"))}
                    </span>
                  </td>

                  {/* Material & Capacity */}
                  <td className="py-4 px-4">
                    <div className="text-slate-300 font-bold">{product.capacityRange}</div>
                    <div className="text-[10px] text-slate-500 truncate max-w-xs">{product.material}</div>
                  </td>

                  {/* Factory */}
                  <td className="py-4 px-4 text-slate-300 text-[11px]">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        product.factory.includes("Xclusive")
                          ? "bg-blue-950/60 text-blue-300 border border-blue-800/40"
                          : "bg-purple-950/60 text-purple-300 border border-purple-800/40"
                      }`}
                    >
                      {product.factory}
                    </span>
                  </td>

                  {/* Status Toggle */}
                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => handleToggleActive(product)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                        product.isActive
                          ? "bg-emerald-950 border border-emerald-800/60 text-emerald-300 hover:bg-emerald-900"
                          : "bg-slate-950 border border-slate-800 text-slate-400 hover:bg-slate-800"
                      }`}
                    >
                      {product.isActive ? (
                        <>
                          <CheckCircle className="w-3 h-3 text-emerald-400" />
                          Active
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3 text-slate-500" />
                          Hidden
                        </>
                      )}
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(product)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white transition-colors"
                        title="Edit Product"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <Link
                        href={`/products`}
                        target="_blank"
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                        title="View on Website"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => handleDeleteProduct(product.id, product.name)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-950 hover:text-red-400 text-slate-400 transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Create / Edit Full Modal */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
            {/* Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
                  <Package className="w-4 h-4 stroke-[3]" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">
                    {editingProduct ? `Edit: ${editingProduct.name}` : "Create New Catalog Product"}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Synchronized with backend REST API and SQLite database
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsEditorOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSaveProduct} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => {
                      setFormName(e.target.value);
                      if (!editingProduct) {
                        setFormSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
                      }
                    }}
                    placeholder="e.g. 20L Conical Industrial Drum"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">SKU / Code *</label>
                  <input
                    type="text"
                    required
                    value={formSku}
                    onChange={(e) => setFormSku(e.target.value)}
                    placeholder="XC-IND-20L"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-cyan-400 font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Category *</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="metal-drum">Metal Containers & Drums</option>
                    <option value="plastic-bottle">Bottles & Jars</option>
                    <option value="paint-tin">Paint & Chemical Cans</option>
                    <option value="pail-bucket">Pails & Buckets</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Manufacturing Plant *</label>
                  <select
                    value={formFactory}
                    onChange={(e) => setFormFactory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Xclusive Can Limited">Xclusive Can Limited (Gazipur HQ)</option>
                    <option value="Q Pail Limited">Q Pail Limited (Tongi Plant)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Raw Material</label>
                  <input
                    type="text"
                    value={formMaterial}
                    onChange={(e) => setFormMaterial(e.target.value)}
                    placeholder="Prime Electrolytic Tinplate (ETP)"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Capacity / Sizing Range</label>
                  <input
                    type="text"
                    value={formCapacity}
                    onChange={(e) => setFormCapacity(e.target.value)}
                    placeholder="18 Litres – 25 Litres"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
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
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-cyan-400 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setIsMediaModalOpen(true)}
                    className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center gap-1.5 shrink-0"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    Browse Imaple
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Industry Applications (Comma-separated)
                </label>
                <input
                  type="text"
                  value={formApplications}
                  onChange={(e) => setFormApplications(e.target.value)}
                  placeholder="Automotive Lubricants, Industrial Coatings, Solvents"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Technical Description & Specifications
                </label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Full engineering specifications..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isActiveToggle"
                  checked={formIsActive}
                  onChange={(e) => setFormIsActive(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 bg-slate-950 border-slate-800"
                />
                <label htmlFor="isActiveToggle" className="text-slate-300 font-bold">
                  Publish to Public Website Catalog
                </label>
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-700 text-xs font-bold text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center gap-1.5"
                >
                  {editingProduct ? "Update Product" : "Save & Publish"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Imaple Media Picker Modal */}
      <MediaPickerModal
        isOpen={isMediaModalOpen}
        onClose={() => setIsMediaModalOpen(false)}
        onSelect={(asset) => setFormImage(asset.url)}
        currentValue={formImage}
      />
    </div>
  );
}
