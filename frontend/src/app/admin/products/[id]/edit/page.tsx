"use client";

import React from "react";
import { useParams } from "next/navigation";
import ProductForm from "../../_components/ProductForm";

export default function AdminEditProductPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id as string | undefined);
  return <ProductForm mode="edit" productId={id} />;
}

