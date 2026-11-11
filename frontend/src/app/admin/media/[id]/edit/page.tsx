"use client";

import React from "react";
import { useParams } from "next/navigation";
import MediaStoryForm from "../../_components/MediaStoryForm";

export default function AdminEditMediaStoryPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id as string | undefined);
  return <MediaStoryForm mode="edit" storyId={id} />;
}

