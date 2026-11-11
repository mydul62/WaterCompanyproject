"use client";

import React from "react";
import { useParams } from "next/navigation";
import CategoryForm from "../../_components/CategoryForm";

export default function AdminEditCategoryPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id as string | undefined);
  return <CategoryForm mode="edit" categoryId={id} />;
}

