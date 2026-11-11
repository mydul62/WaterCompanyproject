"use client";

import React from "react";
import { useParams } from "next/navigation";
import BlogPostForm from "../../_components/BlogPostForm";

export default function AdminEditBlogPostPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id as string | undefined);
  return <BlogPostForm mode="edit" postId={id} />;
}

