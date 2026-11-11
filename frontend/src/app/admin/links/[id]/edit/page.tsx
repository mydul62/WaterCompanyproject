"use client";

import React from "react";
import { useParams } from "next/navigation";
import LinkForm from "../../_components/LinkForm";

export default function AdminEditLinkPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id as string | undefined);
  return <LinkForm mode="edit" linkId={id} />;
}

