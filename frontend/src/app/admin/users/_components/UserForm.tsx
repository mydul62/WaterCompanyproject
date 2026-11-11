"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Users, Save } from "lucide-react";
import { api } from "@/lib/api";
import {
  AdminFormHeader,
  AdminEditLoadingState,
  AdminEditNotFoundState,
  AdminToast,
  useAdminToast,
} from "@/components/admin/AdminCrudShell";

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: "SUPER_ADMIN" | "ADMIN" | "EDITOR" | "SALES_MANAGER";
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
}

export const DEFAULT_USERS: UserRecord[] = [
  {
    id: "user-1",
    name: "System Super Administrator",
    email: "admin@noorplastic.com",
    role: "SUPER_ADMIN",
    isActive: true,
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
  },
  {
    id: "user-2",
    name: "Tariqul Islam (Plant Ops)",
    email: "tariqul@noorplastic.com",
    role: "ADMIN",
    isActive: true,
    createdAt: new Date().toISOString(),
    lastLogin: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: "user-3",
    name: "Farhana Chowdhury (Content CMS)",
    email: "farhana@noorplastic.com",
    role: "EDITOR",
    isActive: true,
    createdAt: new Date().toISOString(),
    lastLogin: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
  {
    id: "user-4",
    name: "Kazi Mahmud (Commercial Sales)",
    email: "sales@noorplastic.com",
    role: "SALES_MANAGER",
    isActive: true,
    createdAt: new Date().toISOString(),
    lastLogin: new Date(Date.now() - 3600000 * 72).toISOString(),
  },
];

export default function UserForm({
  mode,
  userId,
}: {
  mode: "create" | "edit";
  userId?: string;
}) {
  const router = useRouter();
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formRole, setFormRole] = useState<"SUPER_ADMIN" | "ADMIN" | "EDITOR" | "SALES_MANAGER">("EDITOR");
  const [formIsActive, setFormIsActive] = useState(true);

  const [loading, setLoading] = useState(mode === "edit");
  const [notFound, setNotFound] = useState(false);
  const [saving, setSaving] = useState(false);
  const [storageMode, setStorageMode] = useState<"database" | "fallback">("database");
  const { toast, showToast, clearToast } = useAdminToast();

  useEffect(() => {
    let active = true;
    if (mode === "create") return;

    if (!userId) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    async function load() {
      setLoading(true);
      try {
        const res = await api.users.getAll();
        if (!active) return;
        const list: UserRecord[] = Array.isArray(res?.data) ? res.data : [];
        const found = list.find((u) => u.id === userId) || DEFAULT_USERS.find((u) => u.id === userId);
        if (found) {
          setFormName(found.name);
          setFormEmail(found.email);
          setFormRole(found.role);
          setFormIsActive(found.isActive ?? true);
          setStorageMode(list.some((u) => u.id === userId) ? "database" : "fallback");
        } else {
          setNotFound(true);
        }
      } catch {
        const fallback = DEFAULT_USERS.find((u) => u.id === userId);
        if (fallback && active) {
          setFormName(fallback.name);
          setFormEmail(fallback.email);
          setFormRole(fallback.role);
          setFormIsActive(fallback.isActive);
          setStorageMode("fallback");
        } else if (active) {
          setNotFound(true);
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, [mode, userId]);

  const handleSaveUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim()) {
      showToast("Full name and email address are required.", "error");
      return;
    }
    if (mode === "create" && !formPassword) {
      showToast("Password is required for new users.", "error");
      return;
    }

    setSaving(true);
    const payload: any = {
      name: formName.trim(),
      email: formEmail.trim(),
      role: formRole,
      isActive: formIsActive,
    };
    if (formPassword) payload.password = formPassword;

    try {
      if (mode === "edit" && userId) {
        await api.users.update(userId, payload);
      } else {
        await api.users.create(payload);
      }
      router.push("/admin/users");
      router.refresh();
    } catch (err: any) {
      showToast(err?.message || "Failed to save user account.", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full space-y-6 pb-10">
      <AdminFormHeader
        backHref="/admin/users"
        backLabel="Back to User & Role Access"
        icon={<Users className="w-6 h-6 text-blue-400" />}
        title={
          mode === "edit"
            ? `Edit User${formName ? `: ${formName}` : ""}`
            : "Create New Administrator"
        }
        subtitle="Manage team member credentials, role-based access control permissions & active status."
        storageMode={storageMode}
      />

      {loading ? (
        <AdminEditLoadingState label="Loading user account..." />
      ) : notFound ? (
        <AdminEditNotFoundState
          title="User Account Not Found"
          description="This user account could not be loaded or may have been deleted."
          backHref="/admin/users"
          backLabel="Back to User & Role Access"
        />
      ) : (
        <form
          onSubmit={handleSaveUser}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="e.g. Tariqul Islam"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
                placeholder="tariqul@noorplastic.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                {mode === "edit" ? "Change Password (Leave blank to keep)" : "Password *"}
              </label>
              <input
                type="password"
                required={mode === "create"}
                value={formPassword}
                onChange={(e) => setFormPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Role Permission
              </label>
              <select
                value={formRole}
                onChange={(e) => setFormRole(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              >
                <option value="SUPER_ADMIN">SUPER_ADMIN (Full system privileges)</option>
                <option value="ADMIN">ADMIN (Products, CMS, RFQ)</option>
                <option value="EDITOR">EDITOR (Page Builder &amp; Media)</option>
                <option value="SALES_MANAGER">SALES_MANAGER (Inquiries &amp; Catalog)</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-800">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="userActiveToggle"
                checked={formIsActive}
                onChange={(e) => setFormIsActive(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 bg-slate-950 border-slate-800"
              />
              <label htmlFor="userActiveToggle" className="text-xs text-slate-300 font-bold cursor-pointer">
                User Account Active
              </label>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/admin/users"
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
                <span>{saving ? "Saving..." : mode === "edit" ? "Update User" : "Save User"}</span>
              </button>
            </div>
          </div>
        </form>
      )}

      <AdminToast toast={toast} onClose={clearToast} />
    </div>
  );
}

