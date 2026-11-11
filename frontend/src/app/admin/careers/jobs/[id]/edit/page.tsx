"use client";

import React from "react";
import { useParams } from "next/navigation";
import CareerJobForm from "../../../_components/CareerJobForm";

export default function AdminEditCareerJobPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id as string | undefined);
  return <CareerJobForm mode="edit" jobId={id} />;
}

