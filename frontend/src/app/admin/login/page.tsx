"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, AlertCircle, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { api } from "@/lib/api";
import { clearAuthSession, getStoredToken } from "@/lib/auth";

const REASON_MESSAGES: Record<string, string> = {
  expired: "Your administrator session expired. Please sign in again.",
  idle: "Signed out automatically after 30 minutes of inactivity.",
  "signed-out": "You have been signed out.",
  unauthorized: "Authentication is required to access the management portal.",
};

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingExisting, setCheckingExisting] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusNotice, setStatusNotice] = useState<string | null>(null);
  const [redirectTo, setRedirectTo] = useState("/admin");

  useEffect(() => {
    let active = true;

    const params = new URLSearchParams(window.location.search);
    const reason = params.get("reason");
    const nextPath = params.get("next");

    if (reason && REASON_MESSAGES[reason]) {
      setStatusNotice(REASON_MESSAGES[reason]);
    }
    if (nextPath && nextPath.startsWith("/admin") && !nextPath.startsWith("/admin/login")) {
      setRedirectTo(nextPath);
    }

    const token = getStoredToken();
    if (!token) {
      setCheckingExisting(false);
      return;
    }

    api.auth
      .me()
      .then((res) => {
        if (!active) return;
        if (res?.data?.email) {
          const target =
            nextPath && nextPath.startsWith("/admin") && !nextPath.startsWith("/admin/login")
              ? nextPath
              : "/admin";
          router.replace(target);
        } else {
          clearAuthSession();
          setCheckingExisting(false);
        }
      })
      .catch(() => {
        if (!active) return;
        clearAuthSession();
        setCheckingExisting(false);
      });

    return () => {
      active = false;
    };
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setStatusNotice(null);

    try {
      await api.auth.login(email.trim(), password);
      router.replace(redirectTo);
    } catch (err: any) {
      setError(err?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  if (checkingExisting) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-slate-300 antialiased">
        <div className="flex items-center gap-3 text-xs font-mono tracking-wider uppercase">
          <ShieldCheck className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>Checking session...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative antialiased selection:bg-blue-600 selection:text-white">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px]" />
      </div>

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white font-black text-xl flex items-center justify-center shadow-lg shadow-blue-600/40">
              <span className="text-cyan-300">N</span>P
            </div>
            <div className="text-left">
              <span className="text-lg font-black text-white tracking-tight block">
                NOOR PLASTIC
              </span>
              <span className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase block">
                Enterprise CMS Suite
              </span>
            </div>
          </Link>
          <p className="text-xs text-slate-400 pt-1">
            Sign in with your authorized administrator credentials to access the portal
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-base font-bold text-white">Administrator Sign In</h2>
            <p className="text-[11px] text-slate-400">Encrypted token &amp; database-verified session</p>
          </div>

          {statusNotice && !error && (
            <div className="p-3 rounded-xl bg-amber-950/50 border border-amber-800/70 text-xs text-amber-200 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{statusNotice}</span>
            </div>
          )}

          {error && (
            <div className="p-3 rounded-xl bg-red-950/60 border border-red-800/80 text-xs text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs" autoComplete="on">
            <div>
              <label htmlFor="admin-email" className="block text-slate-300 font-bold mb-1">
                Corporate Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="admin-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your admin email"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-medium"
                />
              </div>
            </div>

            <div>
              <label htmlFor="admin-password" className="block text-slate-300 font-bold mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="admin-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.01] cursor-pointer"
            >
              {loading ? (
                "Authenticating..."
              ) : (
                <>
                  Access Management Portal
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer info */}
        <div className="text-center text-[11px] text-slate-500 font-mono">
          <span>Noor Plastic Industries • Kaliakoir, Gazipur</span>
        </div>
      </div>
    </div>
  );
}
