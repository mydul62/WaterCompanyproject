"use client";

import React from "react";
import Link from "next/link";
import {
  Plus,
  RefreshCw,
  RotateCcw,
  Search,
  AlertTriangle,
  CheckCircle2,
  X,
  Database,
  HardDrive,
  ArrowLeft,
  Loader2,
} from "lucide-react";

export function linesToArray(text: string): string[] {
  return String(text || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

export function arrayToLines(arr?: string[]): string {
  return Array.isArray(arr) ? arr.join("\n") : "";
}

export interface ToastState {
  message: string;
  type: "success" | "error";
}

export function useAdminToast() {
  const [toast, setToast] = React.useState<ToastState | null>(null);
  const showToast = React.useCallback(
    (message: string, type: "success" | "error" = "success") => {
      setToast({ message, type });
      window.setTimeout(() => {
        setToast((prev) => (prev?.message === message ? null : prev));
      }, 3200);
    },
    []
  );
  return { toast, showToast, clearToast: () => setToast(null) };
}

export function AdminToast({
  toast,
  onClose,
}: {
  toast: ToastState | null;
  onClose: () => void;
}) {
  if (!toast) return null;
  const isErr = toast.type === "error";
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-2xl text-sm font-semibold transition-all ${
        isErr
          ? "bg-red-950/95 border-red-800 text-red-200"
          : "bg-emerald-950/95 border-emerald-800 text-emerald-200"
      }`}
    >
      {isErr ? (
        <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
      ) : (
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
      )}
      <span>{toast.message}</span>
      <button
        type="button"
        onClick={onClose}
        className="ml-2 text-slate-400 hover:text-white cursor-pointer"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

interface AdminPageHeaderProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  addLabel?: string;
  addHref?: string;
  onAdd?: () => void;
  onRefresh?: () => void;
  onReset?: () => void;
  loading?: boolean;
  storageMode?: "database" | "fallback";
}

export function AdminPageHeader({
  icon,
  title,
  subtitle,
  addLabel,
  addHref,
  onAdd,
  onRefresh,
  onReset,
  loading,
  storageMode,
}: AdminPageHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
      <div>
        <div className="flex items-center gap-2.5 flex-wrap">
          {icon}
          <h1 className="text-2xl font-black text-white tracking-tight">{title}</h1>
          {storageMode && (
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                storageMode === "database"
                  ? "bg-emerald-950/70 text-emerald-300 border-emerald-800/70"
                  : "bg-amber-950/70 text-amber-300 border-amber-800/70"
              }`}
            >
              {storageMode === "database" ? (
                <>
                  <Database className="w-3 h-3" /> SQLite Synced
                </>
              ) : (
                <>
                  <HardDrive className="w-3 h-3" /> Offline Preview
                </>
              )}
            </span>
          )}
        </div>
        <p className="text-slate-400 text-xs mt-1">{subtitle}</p>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        {onRefresh && (
          <button
            type="button"
            onClick={onRefresh}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-slate-300 border border-slate-800 transition-colors cursor-pointer disabled:opacity-60"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-cyan-400" : ""}`} />
            <span>Refresh</span>
          </button>
        )}
        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-slate-300 border border-slate-800 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span>Restore Defaults</span>
          </button>
        )}
        {addHref && addLabel ? (
          <Link
            href={addHref}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-lg shadow-cyan-950/50 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>{addLabel}</span>
          </Link>
        ) : (
          onAdd &&
          addLabel && (
            <button
              type="button"
              onClick={onAdd}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-lg shadow-cyan-950/50 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{addLabel}</span>
            </button>
          )
        )}
      </div>
    </div>
  );
}

interface AdminFormHeaderProps {
  backHref: string;
  backLabel: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  storageMode?: "database" | "fallback";
}

export function AdminFormHeader({
  backHref,
  backLabel,
  icon,
  title,
  subtitle,
  storageMode,
}: AdminFormHeaderProps) {
  return (
    <div className="space-y-3 border-b border-slate-800 pb-5">
      <Link
        href={backHref}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>{backLabel}</span>
      </Link>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            {icon}
            <h1 className="text-2xl font-black text-white tracking-tight">{title}</h1>
            {storageMode && (
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                  storageMode === "database"
                    ? "bg-emerald-950/70 text-emerald-300 border-emerald-800/70"
                    : "bg-amber-950/70 text-amber-300 border-amber-800/70"
                }`}
              >
                {storageMode === "database" ? (
                  <>
                    <Database className="w-3 h-3" /> SQLite Synced
                  </>
                ) : (
                  <>
                    <HardDrive className="w-3 h-3" /> Offline Preview
                  </>
                )}
              </span>
            )}
          </div>
          <p className="text-slate-400 text-xs mt-1">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

export function AdminEditLoadingState({ label = "Loading record..." }: { label?: string }) {
  return (
    <div className="w-full py-20 flex flex-col items-center justify-center gap-3 bg-slate-900/50 border border-slate-800 rounded-2xl">
      <Loader2 className="w-6 h-6 text-cyan-400 animate-spin" />
      <p className="text-xs font-semibold text-slate-400">{label}</p>
    </div>
  );
}

export function AdminEditNotFoundState({
  title = "Record Not Found",
  description = "The requested record could not be loaded or may have been deleted.",
  backHref,
  backLabel = "Back to List",
}: {
  title?: string;
  description?: string;
  backHref: string;
  backLabel?: string;
}) {
  return (
    <div className="w-full py-16 px-6 flex flex-col items-center text-center gap-3 bg-slate-900/60 border border-slate-800 rounded-2xl">
      <AlertTriangle className="w-8 h-8 text-amber-400" />
      <h2 className="text-lg font-black text-white">{title}</h2>
      <p className="text-xs text-slate-400 max-w-md">{description}</p>
      <Link
        href={backHref}
        className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>{backLabel}</span>
      </Link>
    </div>
  );
}

export function AdminSearchToolbar({
  search,
  onSearchChange,
  searchPlaceholder,
  categories,
  activeCategory,
  onCategoryChange,
  totalCount,
}: {
  search: string;
  onSearchChange: (val: string) => void;
  searchPlaceholder: string;
  categories?: readonly string[];
  activeCategory?: string;
  onCategoryChange?: (cat: string) => void;
  totalCount: number;
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
      <div className="relative flex-1 max-w-md">
        <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {categories && onCategoryChange && (
          <div className="flex flex-wrap gap-1.5">
            {["ALL", ...categories].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => onCategoryChange(cat)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? "bg-cyan-600 text-white"
                    : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                {cat === "ALL" ? "All" : cat}
              </button>
            ))}
          </div>
        )}
        <span className="text-xs font-bold text-slate-400 px-2.5 py-1 bg-slate-950 rounded-lg border border-slate-800">
          {totalCount} items
        </span>
      </div>
    </div>
  );
}

export function AdminConfirmDeleteModal({
  isOpen,
  title,
  description,
  onCancel,
  onConfirm,
  loading,
}: {
  isOpen: boolean;
  title: string;
  description: string;
  onCancel: () => void;
  onConfirm: () => void;
  loading?: boolean;
}) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-950/70 border border-red-800/70 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">{title}</h3>
            <p className="text-xs text-slate-400 mt-1">{description}</p>
          </div>
        </div>
        <div className="flex justify-end gap-2.5 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={onConfirm}
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-xs font-bold text-white cursor-pointer disabled:opacity-60"
          >
            {loading ? "Deleting..." : "Confirm Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
