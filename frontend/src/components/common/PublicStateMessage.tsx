"use client";

import React from "react";
import { AlertTriangle, Inbox, RefreshCw } from "lucide-react";

interface PublicStateMessageProps {
  variant: "error" | "empty";
  title: string;
  description?: string;
  onRetry?: () => void;
  retryLabel?: string;
  tone?: "light" | "dark";
  className?: string;
  action?: React.ReactNode;
}

export function PublicStateMessage({
  variant,
  title,
  description,
  onRetry,
  retryLabel = "Retry",
  tone = "light",
  className = "",
  action,
}: PublicStateMessageProps) {
  const isError = variant === "error";
  const isDark = tone === "dark";

  const containerCls = isDark
    ? isError
      ? "bg-red-950/50 border-red-400/40 text-white"
      : "bg-white/10 border-white/20 text-white"
    : isError
    ? "bg-red-50/90 border-red-200 text-slate-900"
    : "bg-white border-slate-200/90 text-slate-900";

  const iconWrapCls = isDark
    ? isError
      ? "bg-red-500/20 text-red-200 border border-red-400/40"
      : "bg-white/15 text-cyan-200 border border-white/20"
    : isError
    ? "bg-red-100 text-red-600 border border-red-200"
    : "bg-slate-100 text-slate-500 border border-slate-200";

  const descCls = isDark
    ? "text-white/80"
    : isError
    ? "text-red-800/80"
    : "text-slate-500";

  const btnCls = isDark
    ? "bg-white text-[#094E9B] hover:bg-cyan-50"
    : isError
    ? "bg-red-600 hover:bg-red-700 text-white"
    : "bg-[#094E9B] hover:bg-[#073d7c] text-white";

  return (
    <div
      className={`rounded-3xl border p-8 sm:p-10 text-center flex flex-col items-center justify-center gap-3.5 shadow-sm ${containerCls} ${className}`}
      role={isError ? "alert" : undefined}
    >
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${iconWrapCls}`}>
        {isError ? <AlertTriangle className="w-6 h-6" /> : <Inbox className="w-6 h-6" />}
      </div>
      <div className="space-y-1 max-w-md">
        <h3 className="text-lg font-bold tracking-tight">{title}</h3>
        {description && <p className={`text-xs sm:text-sm leading-relaxed ${descCls}`}>{description}</p>}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${btnCls}`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{retryLabel}</span>
          </button>
        )}
        {action}
      </div>
    </div>
  );
}

