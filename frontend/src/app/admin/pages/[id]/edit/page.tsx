"use client";

import React from "react";
import { useParams } from "next/navigation";
import PageForm from "../../_components/PageForm";

export default function AdminEditPagePage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id as string | undefined);
  return <PageForm mode="edit" pageId={id} />;
}

