"use client";

import React from "react";
import { useParams } from "next/navigation";
import BannerSlideForm from "../../_components/BannerSlideForm";

export default function AdminEditBannerPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id as string | undefined);
  return <BannerSlideForm mode="edit" bannerId={id} />;
}

