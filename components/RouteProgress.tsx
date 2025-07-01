"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";

export default function RouteProgress() {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.start();

    const timeout = setTimeout(() => {
      NProgress.done();
    }, 400); // Simulated delay

    return () => {
      clearTimeout(timeout);
      NProgress.done();
    };
  }, [pathname]);

  return null;
}
