"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Package,
  Plus,
  Search,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  ExternalLink,
  RefreshCw,
} from "lucide-react";
import { api } from "@/lib/api";
import { ProductItem, normalizeProduct } from "./_components/ProductForm";
import {
  AdminErrorBanner,
  AdminToast,
  useAdminToast,
} from "@/components/admin/AdminCrudShell";
import { AdminTableSkeletonRows } from "@/components/common/Skeletons";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [factoryFilter, setFactoryFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const { toast, showToast, clearToast } = useAdminToast();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const res = await api.products.getAllAdmin();
      const rows = Array.isArray(res?.data) ? res.data : [];
      setProducts(rows.map(normalizeProduct));
    } catch (err: any) {
      setProducts([]);
      setLoadError(err?.message || "Unable to load products from PostgreSQL.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    if (!confirm(`Delete product "${name}" permanently?`)) return;
    try {
      await api.products.delete(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      showToast(`Product "${name}" deleted.`);
    } catch (err: any) {
      showToast(err?.message || `Failed to delete "${name}" from PostgreSQL.`, "error");
    }
  };

  const handleToggleActive = async (p: ProductItem) => {
    const updated = !p.isActive;
    try {
      await api.products.update(p.id, { isActive: updated });
      setProducts((prev) =>
        prev.map((prod) => (prod.id === p.id ? { ...prod, isActive: updated } : prod))
      );
      showToast(updated ? "Product activated." : "Product hidden.");
    } catch (err: any) {
      showToast(err?.message || "Failed to update product status in PostgreSQL.", "error");
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.sku && p.sku.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.material.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "ALL" || p.category === categoryFilter;
    const matchesFactory = factoryFilter === "ALL" || p.factory === factoryFilter;
    const matchesStatus =
      statusFilter === "ALL" ||
      (statusFilter === "ACTIVE" && p.isActive) ||
      (statusFilter === "INACTIVE" && !p.isActive);

    return matchesSearch && matchesCategory && matchesFactory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <AdminToast toast={toast} onClose={clearToast} />

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
          <Link
            href="/admin/products/new"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            Add New Product
          </Link>
        </div>
      </div>

      <AdminErrorBanner error={loadError} onRetry={loadProducts} />

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
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-slate-300 focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">All Categories</option>
            <option value="metal-drum">Metal Containers &amp; Drums</option>
            <option value="plastic-bottle">Bottles &amp; Jars</option>
            <option value="paint-tin">Paint &amp; Chemical Cans</option>
            <option value="pail-bucket">Pails &amp; Buckets</option>
          </select>

          <select
            value={factoryFilter}
            onChange={(e) => setFactoryFilter(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-slate-300 focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">All Manufacturing Plants</option>
            <option value="Noor Plastic Industries">Noor Plastic Industries (Kaliakoir, Gazipur)</option>
          </select>

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
                <th className="py-3.5 px-5">Product &amp; SKU</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Material &amp; Capacity</th>
                <th className="py-3.5 px-4">Manufacturing Plant</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {loading ? <AdminTableSkeletonRows rows={6} columns={6} /> : filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-slate-800/40 transition-colors group">
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

                  <td className="py-4 px-4 text-slate-300">
                    <span className="inline-block px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-bold">
                      {product.categoryLabel ||
                        (typeof product.category === "object" && product.category !== null
                          ? (product.category as any).name
                          : String(product.category || "General"))}
                    </span>
                  </td>

                  <td className="py-4 px-4">
                    <div className="text-slate-300 font-bold">{product.capacityRange}</div>
                    <div className="text-[10px] text-slate-500 truncate max-w-xs">{product.material}</div>
                  </td>

                  <td className="py-4 px-4 text-slate-300 text-[11px]">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${product.factory.includes("Noor")
                        ? "bg-blue-950/60 text-blue-300 border border-blue-800/40"
                        : "bg-purple-950/60 text-purple-300 border border-purple-800/40"
                        }`}
                    >
                      {product.factory}
                    </span>
                  </td>

                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => handleToggleActive(product)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer ${product.isActive
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

                  <td className="py-4 px-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white transition-colors"
                        title="Edit Product"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        href="/products"
                        target="_blank"
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                        title="View on Website"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => handleDeleteProduct(product.id, product.name)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-950 hover:text-red-400 text-slate-400 transition-colors cursor-pointer"
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
    </div>
  );
}
