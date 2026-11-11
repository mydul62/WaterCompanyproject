"use client";

import React, { Suspense } from "react";
import { useParams, useSearchParams } from "next/navigation";
import NavigationItemForm from "../../_components/NavigationItemForm";
import { AdminEditLoadingState } from "@/components/admin/AdminCrudShell";

function EditNavigationContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id as string | undefined);
  const menuCode = searchParams.get("menu") || "HEADER_PRIMARY";
  const parentId = searchParams.get("parentId") || undefined;

  return (
    <NavigationItemForm
      mode="edit"
      menuCode={menuCode}
      parentId={parentId}
      itemId={id}
    />
  );
}

export default function AdminEditNavigationItemPage() {
  return (
    <Suspense fallback={<AdminEditLoadingState label="Loading navigation item..." />}>
      <EditNavigationContent />
    </Suspense>
  );
}

