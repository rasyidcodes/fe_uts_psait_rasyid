"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Edit() {
  const router = useRouter();
  const { nim, kode_mk } = router.query;

  return <p>aa</p>;
}
