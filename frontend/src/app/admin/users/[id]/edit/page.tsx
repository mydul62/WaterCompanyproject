"use client";

import React from "react";
import { useParams } from "next/navigation";
import UserForm from "../../_components/UserForm";

export default function AdminEditUserPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id as string | undefined);
  return <UserForm mode="edit" userId={id} />;
}

