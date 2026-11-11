"use client";

import React from "react";
import { useParams } from "next/navigation";
import CertificateForm from "../../_components/CertificateForm";

export default function AdminEditCertificatePage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id as string | undefined);
  return <CertificateForm mode="edit" certificateId={id} />;
}

