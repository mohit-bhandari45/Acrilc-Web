// app/auth/layout.tsx
import React, { Suspense } from "react";

export default function CreateContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
}