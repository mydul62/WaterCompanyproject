"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
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
} from "lucide-react";
import { PRODUCTS_CATALOG } from "@/data/companyData";

interface AdminProduct {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
  material: string;
  capacityRange: string;
  applications: string[];
  image: string;
  description: string;
  isActive: boolean;
  factory: string;
}

const INITIAL_PRODUCTS: AdminProduct[] = [
  ...PRODUCTS_CATALOG.map((p, i) => ({
    ...p,
    isActive: true,
    factory: i % 2 === 0 ? "Xclusive Can Limited" : "Q Pail Limited",
  })),
  {
    id: "prod-cat-1",
    name: "Pharmaceutical Bottle",
    category: "plastic-bottle",
    categoryLabel: "Bottles & Jars",
    material: "100% Virgin Food-Grade HDPE",
    capacityRange: "100 ml",
    applications: ["Pharmaceutical", "Medical Solutions"],
    image: "/images/catalog/cat-prod-1.png",
    description: "100 ml HDPE Pharmaceuticals Bottle made with food grade virgin material",
    isActive: true,
    factory: "Xclusive Can Limited",
  },
  {
    id: "prod-cat-2",
    name: "Liquid Washing Container",
    category: "pail-bucket",
    categoryLabel: "Pails & Drums",
    material: "High-Density Polyethylene (HDPE)",
    capacityRange: "1000 ml - 2000 ml",
    applications: ["Home Care", "Washing Powder", "Liquid Detergent"],
    image: "/images/catalog/cat-prod-2.png",
    description: "HDPE Washing Powder Container For Home care usage",
    isActive: true,
    factory: "Q Pail Limited",
  },
  {
    id: "prod-cat-3",
    name: "Vitamin Container",
    category: "jar-dropper",
    categoryLabel: "Bottles & Jars",
    material: "Pharmaceutical Virgin HDPE",
    capacityRange: "26 gm",
    applications: ["Radiant Pharma", "Healthcare"],
    image: "/images/catalog/cat-prod-3.png",
    description: "26 gm Container (Menacal-D) with Cap for Pharmaceutical uses. It is used for Radiant Pharma....",
    isActive: true,
    factory: "Xclusive Can Limited",
  },
  {
    id: "prod-cat-7",
    name: "Chemical Bottle (500 ML)",
    category: "plastic-bottle",
    categoryLabel: "Plastic Bottles",
    material: "HDPE Chemical Resistant Resin",
    capacityRange: "500 ml",
    applications: ["Samuda Chemical Industries", "Industrial Reagents"],
    image: "/images/catalog/cat-prod-7.png",
    description: "500 ML Chemical Bottle uses for Samuda Chemical Industries.",
    isActive: true,
    factory: "Xclusive Can Limited",
  },
  {
    id: "prod-cat-8",
    name: "Double Handle Can (4.8L)",
    category: "pail-bucket",
    categoryLabel: "Jerrycans & Drums",
    material: "Industrial Heavy HDPE",
    capacityRange: "4.8 Liter",
    applications: ["Automotive Oil", "Industrial Solvents"],
    image: "/images/catalog/cat-prod-8.png",
    description: "4.8 Ltr Double Handle HDPE jerry Can",
    isActive: true,
    factory: "Q Pail Limited",
  },
  {
    id: "prod-cat-9",
    name: "1 Ltr Chemical Bottle",
    category: "plastic-bottle",
    categoryLabel: "Plastic Bottles",
    material: "Fluorinated HDPE Barrier",
    capacityRange: "1000 ml",
    applications: ["Paints & Thinners", "Chemicals"],
    image: "/images/catalog/cat-prod-9.png",
    description: "1 Ltr Chemical Bottle with child-resistant safety closure",
    isActive: true,
    factory: "Xclusive Can Limited",
  },
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<AdminProduct[]>(INITIAL_PRODUCTS);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterFactory, setFilterFactory] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New product form state
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "plastic-bottle",
    categoryLabel: "Plastic Bottles",
    material: "Virgin HDPE",
    capacityRange: "500 ml",
    factory: "Xclusive Can Limited",
    description: "",
    image: "/cropped/product-card-1.png",
  });

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.material.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());

      const matchCategory =
        filterCategory === "all" || p.category === filterCategory;

      const matchFactory =
        filterFactory === "all" || p.factory === filterFactory;

      return matchSearch && matchCategory && matchFactory;
    });
  }, [products, search, filterCategory, filterFactory]);

  const handleToggleActive = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p))
    );
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to remove this product from catalog?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.description) return;

    const created: AdminProduct = {
      id: `prod-custom-${Date.now()}`,
      name: newProduct.name,
      category: newProduct.category,
      categoryLabel: newProduct.categoryLabel,
      material: newProduct.material,
      capacityRange: newProduct.capacityRange,
      applications: ["Custom Industrial Packaging"],
      image: newProduct.image,
      description: newProduct.description,
      isActive: true,
      factory: newProduct.factory,
    };

    setProducts([created, ...products]);
    setIsAddModalOpen(false);
    setNewProduct({
      name: "",
      category: "plastic-bottle",
      categoryLabel: "Plastic Bottles",
      material: "Virgin HDPE",
      capacityRange: "500 ml",
      factory: "Xclusive Can Limited",
      description: "",
      image: "/cropped/product-card-1.png",
    });
  };

  return (
    <div className="space-y-8 max-w-[1638px] mx-auto">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <Package className="w-6 h-6 text-blue-500" />
            Product Catalog Management
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Configure product specs, certifications, TDS documents, and active visibility across the public storefront.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/products"
            target="_blank"
            className="px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-semibold text-xs flex items-center gap-1.5 transition-colors"
          >
            Live Catalog
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
          </Link>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-blue-600/30 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            Add Product Spec
          </button>
        </div>
      </div>

      {/* Quick Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block font-medium">Total Catalog Items</span>
            <span className="text-2xl font-black text-white font-mono">{products.length}</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-blue-950/80 border border-blue-800/40 text-blue-400 flex items-center justify-center font-bold">
            {products.length}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block font-medium">Active On Storefront</span>
            <span className="text-2xl font-black text-emerald-400 font-mono">
              {products.filter((p) => p.isActive).length}
            </span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-950/80 border border-emerald-800/40 text-emerald-400 flex items-center justify-center font-bold">
            <CheckCircle className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block font-medium">Factories Represented</span>
            <span className="text-2xl font-black text-cyan-400 font-mono">2</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-cyan-950/80 border border-cyan-800/40 text-cyan-400 flex items-center justify-center text-xs font-bold">
            Gazipur &bull; Tongi
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products by name, resin or specs..."
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Category:</span>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="tin-can">Tin Cans</option>
              <option value="plastic-bottle">Plastic Bottles</option>
              <option value="pail-bucket">Pails &amp; Buckets</option>
              <option value="jar-dropper">Jars &amp; Droppers</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Factory:</span>
            <select
              value={filterFactory}
              onChange={(e) => setFilterFactory(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Facilities</option>
              <option value="Xclusive Can Limited">Xclusive Can Limited</option>
              <option value="Q Pail Limited">Q Pail Limited</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider font-extrabold">
              <tr>
                <th className="py-3.5 px-4">Product Details</th>
                <th className="py-3.5 px-4">Material Specification</th>
                <th className="py-3.5 px-4">Capacity Range</th>
                <th className="py-3.5 px-4">Manufacturing Plant</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-11 h-11 rounded-lg bg-slate-950 border border-slate-800 p-1 shrink-0 overflow-hidden flex items-center justify-center">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <div>
                        <span className="font-bold text-white block text-sm">{item.name}</span>
                        <span className="text-[11px] text-slate-400 line-clamp-1">{item.description}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[11px] border border-slate-700/60">
                      {item.material}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-cyan-400">
                    {item.capacityRange}
                  </td>
                  <td className="py-3.5 px-4 text-slate-300">
                    {item.factory}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => handleToggleActive(item.id)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
                        item.isActive
                          ? "bg-emerald-950 text-emerald-400 border border-emerald-800/60 hover:bg-emerald-900"
                          : "bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700"
                      }`}
                    >
                      {item.isActive ? (
                        <>
                          <CheckCircle className="w-3 h-3" />
                          <span>Active</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3" />
                          <span>Hidden</span>
                        </>
                      )}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-500" />
                Add New Container Specification
              </h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 pt-4 text-xs">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="e.g. 500ml HDPE Heavy Chemical Bottle"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Category</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        category: e.target.value,
                        categoryLabel: e.target.options[e.target.selectedIndex].text,
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="plastic-bottle">Plastic Bottles</option>
                    <option value="tin-can">Tin Cans &amp; Aerosols</option>
                    <option value="pail-bucket">Pails &amp; Buckets</option>
                    <option value="jar-dropper">Jars &amp; Droppers</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Manufacturing Plant</label>
                  <select
                    value={newProduct.factory}
                    onChange={(e) => setNewProduct({ ...newProduct, factory: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Xclusive Can Limited">Xclusive Can Limited (Gazipur)</option>
                    <option value="Q Pail Limited">Q Pail Limited (Tongi)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Material Composition</label>
                  <input
                    type="text"
                    value={newProduct.material}
                    onChange={(e) => setNewProduct({ ...newProduct, material: e.target.value })}
                    placeholder="e.g. Food-Grade Virgin HDPE"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Capacity Range</label>
                  <input
                    type="text"
                    value={newProduct.capacityRange}
                    onChange={(e) => setNewProduct({ ...newProduct, capacityRange: e.target.value })}
                    placeholder="e.g. 250ml - 1000ml"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Technical Description</label>
                <textarea
                  rows={3}
                  required
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  placeholder="Provide container specifications, barrier resistance, and cap compatibility..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-md shadow-blue-600/30"
                >
                  Publish to Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

