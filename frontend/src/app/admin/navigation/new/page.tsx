"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import NavigationItemForm from "../_components/NavigationItemForm";
import { AdminEditLoadingState } from "@/components/admin/AdminCrudShell";

function NewNavigationContent() {
  const searchParams = useSearchParams();
  const menuCode = searchParams.get("menu") || "HEADER_PRIMARY";
  const parentId = searchParams.get("parentId") || undefined;

  return <NavigationItemForm mode="create" menuCode={menuCode} parentId={parentId} />;
}

export default function AdminNewNavigationItemPage() {
  return (
    <Suspense fallback={<AdminEditLoadingState label="Preparing navigation form..." />}>
      <NewNavigationContent />
    </Suspense>
  );
}

