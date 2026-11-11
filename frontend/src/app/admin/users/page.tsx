"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  Plus,
  Search,
  Edit,
  Trash2,
  CheckCircle,
  RefreshCw,
} from "lucide-react";
import { api } from "@/lib/api";
import { UserRecord, DEFAULT_USERS } from "./_components/UserForm";
import { AdminTableSkeletonRows } from "@/components/common/Skeletons";

export default function UserRoleManagementPage() {
  const [users, setUsers] = useState<UserRecord[]>(DEFAULT_USERS);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await api.users.getAll();
      if (res.data && res.data.length > 0) {
        setUsers(res.data);
      }
    } catch (err) {
      console.warn("Using default users fallback:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete user "${name}"?`)) return;
    try {
      await api.users.delete(id);
      setUsers(users.filter((u) => u.id !== id));
      showNotification(`User "${name}" deleted.`);
    } catch {
      setUsers(users.filter((u) => u.id !== id));
      showNotification(`User "${name}" deleted.`);
    }
  };

  const handleToggleActive = async (u: UserRecord) => {
    const updated = !u.isActive;
    try {
      await api.users.update(u.id, { isActive: updated });
      setUsers(users.map((user) => (user.id === u.id ? { ...user, isActive: updated } : user)));
      showNotification("User status updated.");
    } catch {
      setUsers(users.map((user) => (user.id === u.id ? { ...user, isActive: updated } : user)));
      showNotification("User status updated.");
    }
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "ALL" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
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
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white tracking-tight">
              User &amp; Role-Based Access Control (RBAC)
            </h1>
            <p className="text-xs text-slate-400">
              Manage platform administrators, content editors, sales representatives, and access credentials
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={loadUsers}
            disabled={loading}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-blue-400" : ""}`} />
          </button>
          <Link
            href="/admin/users/new"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            Add Team Member
          </Link>
        </div>
      </div>

      {/* Search & Role Filter */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          {["ALL", "SUPER_ADMIN", "ADMIN", "EDITOR", "SALES_MANAGER"].map((role) => (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              className={`text-xs font-bold px-3 py-2 rounded-xl transition-all ${
                roleFilter === role
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {role.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 uppercase tracking-wider font-extrabold text-[10px]">
              <tr>
                <th className="py-3.5 px-5">Team Member</th>
                <th className="py-3.5 px-4">Role Permission</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4">Created Date</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {loading ? <AdminTableSkeletonRows rows={5} columns={5} /> : filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-800/40 transition-colors group">
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-cyan-400 shrink-0">
                        {user.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <span className="font-bold text-white text-sm block">{user.name}</span>
                        <span className="text-[11px] font-mono text-slate-400">{user.email}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-mono font-bold ${
                        user.role === "SUPER_ADMIN"
                          ? "bg-red-950/80 text-red-300 border border-red-800/60"
                          : user.role === "ADMIN"
                          ? "bg-purple-950/80 text-purple-300 border border-purple-800/60"
                          : user.role === "EDITOR"
                          ? "bg-blue-950/80 text-blue-300 border border-blue-800/60"
                          : "bg-emerald-950/80 text-emerald-300 border border-emerald-800/60"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => handleToggleActive(user)}
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        user.isActive
                          ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                          : "bg-slate-950 text-slate-500 border border-slate-800"
                      }`}
                    >
                      {user.isActive ? "Active" : "Disabled"}
                    </button>
                  </td>

                  <td className="py-4 px-4 text-slate-400 font-mono text-[11px]">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>

                  <td className="py-4 px-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/users/${user.id}/edit`}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white transition-colors"
                        title="Edit User"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </Link>
                      {user.role !== "SUPER_ADMIN" && (
                        <button
                          onClick={() => handleDeleteUser(user.id, user.name)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-950 hover:text-red-400 text-slate-400 transition-colors"
                          title="Delete User"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
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
