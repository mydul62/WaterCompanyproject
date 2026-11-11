"use client";

import React from "react";
import { useParams } from "next/navigation";
import TvNewsForm from "../../_components/TvNewsForm";

export default function AdminEditTvNewsPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id as string | undefined);
  return <TvNewsForm mode="edit" videoRecordId={id} />;
}

