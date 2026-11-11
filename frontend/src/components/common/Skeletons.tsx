import React from "react";

export function SkeletonBox({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-lg bg-slate-200/85 ${className}`}
    />
  );
}

function AdminSkeletonBox({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-lg bg-slate-800/85 ${className}`}
    />
  );
}

export function HeroSliderSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading hero showcase"
      className="relative w-full h-full min-h-[540px] sm:min-h-[600px] lg:min-h-[650px] flex items-center overflow-hidden bg-gradient-to-br from-[#062a68] via-[#0b58d3] to-[#083c94] px-4 sm:px-8 lg:px-14 py-16"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-5">
          <div className="h-7 w-48 rounded-full bg-white/20 animate-pulse" />
          <div className="space-y-3">
            <div className="h-11 sm:h-14 w-11/12 rounded-2xl bg-white/25 animate-pulse" />
            <div className="h-11 sm:h-14 w-3/4 rounded-2xl bg-white/20 animate-pulse" />
          </div>
          <div className="space-y-2 pt-1 max-w-xl">
            <div className="h-4 w-full rounded bg-white/15 animate-pulse" />
            <div className="h-4 w-5/6 rounded bg-white/15 animate-pulse" />
          </div>
          <div className="flex flex-wrap gap-4 pt-3">
            <div className="h-12 w-44 rounded-full bg-white/25 animate-pulse" />
            <div className="h-12 w-40 rounded-full bg-white/15 animate-pulse" />
          </div>
        </div>
        <div className="hidden lg:flex lg:col-span-5 justify-end">
          <div className="w-full max-w-md h-[360px] rounded-[28px] bg-white/15 border border-white/20 backdrop-blur-md p-6 flex flex-col justify-between animate-pulse">
            <div className="h-48 w-full rounded-2xl bg-white/15" />
            <div className="space-y-2.5">
              <div className="h-5 w-2/3 rounded bg-white/20" />
              <div className="h-3.5 w-1/2 rounded bg-white/15" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PressCardsSkeletonItems({ count = 4 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="rounded-3xl bg-white border border-slate-200/80 p-4 shadow-[0_10px_35px_rgba(0,0,0,0.04)] flex flex-col justify-between space-y-4"
        >
          <div className="space-y-3.5">
            <SkeletonBox className="w-full aspect-[4/3] rounded-2xl" />
            <div className="flex items-center justify-between gap-2">
              <SkeletonBox className="h-5 w-24 rounded-full" />
              <SkeletonBox className="h-4 w-16 rounded-full" />
            </div>
            <div className="space-y-2">
              <SkeletonBox className="h-4 w-full" />
              <SkeletonBox className="h-4 w-5/6" />
            </div>
            <div className="space-y-1.5 pt-1">
              <SkeletonBox className="h-3 w-full bg-slate-100" />
              <SkeletonBox className="h-3 w-4/5 bg-slate-100" />
            </div>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <SkeletonBox className="h-8 w-28 rounded-full" />
            <SkeletonBox className="h-8 w-8 rounded-full" />
          </div>
        </div>
      ))}
    </>
  );
}

export function PressCardsSkeletonGrid({ count = 4 }: { count?: number }) {
  return (
    <div
      aria-busy="true"
      aria-label="Loading press stories"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7"
    >
      <PressCardsSkeletonItems count={count} />
    </div>
  );
}

export function BlogFeaturedSkeletonCard() {
  return (
    <div className="rounded-[28px] bg-white border border-slate-200 p-5 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6 shadow-sm">
      <SkeletonBox className="lg:col-span-6 min-h-[260px] rounded-2xl" />
      <div className="lg:col-span-6 flex flex-col justify-center space-y-4">
        <SkeletonBox className="h-6 w-28 rounded-full" />
        <SkeletonBox className="h-8 w-11/12" />
        <SkeletonBox className="h-8 w-3/4" />
        <div className="space-y-2 pt-1">
          <SkeletonBox className="h-4 w-full bg-slate-100" />
          <SkeletonBox className="h-4 w-5/6 bg-slate-100" />
        </div>
        <SkeletonBox className="h-10 w-36 rounded-full mt-2" />
      </div>
    </div>
  );
}

export function BlogCardsSkeletonItems({ count = 6 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="rounded-3xl bg-white border border-slate-200/90 p-4 space-y-4 shadow-sm"
        >
          <SkeletonBox className="w-full aspect-[16/10] rounded-2xl" />
          <div className="flex items-center gap-2">
            <SkeletonBox className="h-5 w-20 rounded-full" />
            <SkeletonBox className="h-4 w-24 rounded-full" />
          </div>
          <div className="space-y-2">
            <SkeletonBox className="h-5 w-full" />
            <SkeletonBox className="h-5 w-4/5" />
          </div>
          <div className="space-y-1.5">
            <SkeletonBox className="h-3.5 w-full bg-slate-100" />
            <SkeletonBox className="h-3.5 w-2/3 bg-slate-100" />
          </div>
        </div>
      ))}
    </>
  );
}

export function BlogPageSkeleton({ cardCount = 6 }: { cardCount?: number }) {
  return (
    <div aria-busy="true" aria-label="Loading articles" className="space-y-10">
      <BlogFeaturedSkeletonCard />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <BlogCardsSkeletonItems count={cardCount} />
      </div>
    </div>
  );
}

export function CaseStudiesSkeletonItems({ count = 6 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="rounded-3xl bg-white border border-slate-200 p-5 space-y-4 shadow-sm"
        >
          <SkeletonBox className="w-full aspect-[16/10] rounded-2xl" />
          <SkeletonBox className="h-5 w-28 rounded-full" />
          <div className="space-y-2">
            <SkeletonBox className="h-5 w-11/12" />
            <SkeletonBox className="h-5 w-3/4" />
          </div>
          <div className="grid grid-cols-2 gap-3 pt-1">
            <SkeletonBox className="h-14 rounded-xl bg-slate-100" />
            <SkeletonBox className="h-14 rounded-xl bg-slate-100" />
          </div>
          <SkeletonBox className="h-9 w-36 rounded-full" />
        </div>
      ))}
    </>
  );
}

export function CaseStudiesSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div
      aria-busy="true"
      aria-label="Loading case studies"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
    >
      <CaseStudiesSkeletonItems count={count} />
    </div>
  );
}

export function CertificatesSkeletonItems({ count = 6 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="rounded-2xl bg-white border border-slate-200 p-5 flex flex-col sm:flex-row gap-5 items-start shadow-sm"
        >
          <SkeletonBox className="w-full sm:w-28 h-36 rounded-xl shrink-0" />
          <div className="flex-1 w-full space-y-3">
            <SkeletonBox className="h-5 w-24 rounded-full" />
            <SkeletonBox className="h-5 w-5/6" />
            <SkeletonBox className="h-4 w-2/3 bg-slate-100" />
            <SkeletonBox className="h-4 w-1/2 bg-slate-100" />
            <SkeletonBox className="h-9 w-32 rounded-full mt-2" />
          </div>
        </div>
      ))}
    </>
  );
}

export function CertificatesSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div
      aria-busy="true"
      aria-label="Loading certificates"
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      <CertificatesSkeletonItems count={count} />
    </div>
  );
}

export function CareersSkeletonItems({ count = 4 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="rounded-2xl bg-white border border-slate-200 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
        >
          <div className="space-y-2.5 flex-1">
            <div className="flex items-center gap-2">
              <SkeletonBox className="h-5 w-24 rounded-full" />
              <SkeletonBox className="h-5 w-20 rounded-full bg-slate-100" />
            </div>
            <SkeletonBox className="h-6 w-2/3 sm:w-1/2" />
            <SkeletonBox className="h-4 w-1/2 sm:w-1/3 bg-slate-100" />
          </div>
          <SkeletonBox className="h-10 w-36 rounded-full shrink-0" />
        </div>
      ))}
    </>
  );
}

export function CareersListSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div aria-busy="true" aria-label="Loading job openings" className="space-y-4">
      <CareersSkeletonItems count={count} />
    </div>
  );
}

export function ProductsCatalogSkeletonItems({ count = 6 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="rounded-2xl bg-white border border-slate-200 p-5 space-y-4 shadow-sm"
        >
          <SkeletonBox className="w-full h-52 rounded-xl" />
          <div className="flex items-center justify-between">
            <SkeletonBox className="h-5 w-24 rounded-full" />
            <SkeletonBox className="h-4 w-16 rounded-full bg-slate-100" />
          </div>
          <SkeletonBox className="h-5 w-5/6" />
          <div className="space-y-1.5">
            <SkeletonBox className="h-3.5 w-full bg-slate-100" />
            <SkeletonBox className="h-3.5 w-3/4 bg-slate-100" />
          </div>
          <div className="pt-2 flex gap-2.5">
            <SkeletonBox className="h-9 flex-1 rounded-full" />
            <SkeletonBox className="h-9 w-24 rounded-full bg-slate-100" />
          </div>
        </div>
      ))}
    </>
  );
}

export function ProductsCatalogSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div
      aria-busy="true"
      aria-label="Loading products"
      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
    >
      <ProductsCatalogSkeletonItems count={count} />
    </div>
  );
}

export function AdminKpiSkeletonGrid({ count = 5 }: { count?: number }) {
  return (
    <div
      aria-busy="true"
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
    >
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-3"
        >
          <div className="flex items-center justify-between">
            <AdminSkeletonBox className="h-3.5 w-24" />
            <AdminSkeletonBox className="h-9 w-9 rounded-xl" />
          </div>
          <AdminSkeletonBox className="h-8 w-16" />
          <AdminSkeletonBox className="h-3 w-32 bg-slate-800/60" />
        </div>
      ))}
    </div>
  );
}

export function AdminCardSkeletonItems({ count = 6 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-4"
        >
          <AdminSkeletonBox className="w-full h-40 rounded-xl" />
          <div className="flex items-center justify-between gap-2">
            <AdminSkeletonBox className="h-5 w-24 rounded-full" />
            <AdminSkeletonBox className="h-5 w-16 rounded-full" />
          </div>
          <AdminSkeletonBox className="h-5 w-4/5" />
          <AdminSkeletonBox className="h-3.5 w-full bg-slate-800/60" />
          <div className="pt-2 border-t border-slate-800 flex items-center justify-end gap-2">
            <AdminSkeletonBox className="h-8 w-20 rounded-lg" />
            <AdminSkeletonBox className="h-8 w-8 rounded-lg" />
          </div>
        </div>
      ))}
    </>
  );
}

export function AdminCardGridSkeleton({
  count = 6,
  columns = 3,
}: {
  count?: number;
  columns?: 2 | 3;
}) {
  const colClass =
    columns === 2
      ? "grid-cols-1 md:grid-cols-2"
      : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3";

  return (
    <div aria-busy="true" className={`grid ${colClass} gap-5`}>
      <AdminCardSkeletonItems count={count} />
    </div>
  );
}

export function AdminTableSkeletonRows({
  rows = 6,
  columns = 5,
}: {
  rows?: number;
  columns?: number;
}) {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <tr key={rowIdx} className="border-b border-slate-800/70">
          {Array.from({ length: columns }).map((_, colIdx) => (
            <td key={colIdx} className="px-4 py-3.5">
              <AdminSkeletonBox
                className={
                  colIdx === 0
                    ? "h-5 w-44"
                    : colIdx === columns - 1
                      ? "h-7 w-24 ml-auto"
                      : "h-4 w-28"
                }
              />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

export function AdminTableSkeleton({
  rows = 6,
  columns = 5,
}: {
  rows?: number;
  columns?: number;
}) {
  return (
    <div
      aria-busy="true"
      className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden"
    >
      <div className="border-b border-slate-800 bg-slate-950/60 px-4 py-3 grid grid-cols-4 gap-4">
        <AdminSkeletonBox className="h-3.5 w-28" />
        <AdminSkeletonBox className="h-3.5 w-24" />
        <AdminSkeletonBox className="h-3.5 w-24" />
        <AdminSkeletonBox className="h-3.5 w-20 ml-auto" />
      </div>
      <table className="w-full text-left border-collapse">
        <tbody>
          <AdminTableSkeletonRows rows={rows} columns={columns} />
        </tbody>
      </table>
    </div>
  );
}

export function AdminMediaSkeletonItems({ count = 12 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="rounded-xl bg-slate-900 border border-slate-800 p-2 space-y-2"
        >
          <AdminSkeletonBox className="w-full aspect-video rounded-lg" />
          <AdminSkeletonBox className="h-3 w-3/4" />
        </div>
      ))}
    </>
  );
}

export function AdminMediaGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div
      aria-busy="true"
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
    >
      <AdminMediaSkeletonItems count={count} />
    </div>
  );
}

export function AdminFormSkeleton() {
  return (
    <div
      aria-busy="true"
      className="rounded-2xl bg-slate-900/70 border border-slate-800 p-6 space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="space-y-2">
            <AdminSkeletonBox className="h-3.5 w-28" />
            <AdminSkeletonBox className="h-10 w-full rounded-xl" />
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <AdminSkeletonBox className="h-3.5 w-32" />
        <AdminSkeletonBox className="h-28 w-full rounded-xl" />
      </div>
      <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-800">
        <AdminSkeletonBox className="h-10 w-24 rounded-xl" />
        <AdminSkeletonBox className="h-10 w-36 rounded-xl" />
      </div>
    </div>
  );
}
