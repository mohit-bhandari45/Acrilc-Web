"use client";

import { useEffect } from "react";

export default function FaviconSwitcher() {
  useEffect(() => {
    const darkModeMedia = window.matchMedia("(prefers-color-scheme: dark)");

    const updateFavicon = (isDark: boolean) => {
      const favicon = document.querySelector("link[rel='icon']") || document.createElement("link");
      favicon.setAttribute("rel", "icon");
      favicon.setAttribute("type", "image/x-icon");
      favicon.setAttribute("href", isDark ? "/favicon-light.ico" : "/favicon-dark.ico");

      if (!favicon.parentNode) {
        document.head.appendChild(favicon);
      }
    };

    // Set on first load
    updateFavicon(darkModeMedia.matches);

    // Listen to changes
    const listener = (e: MediaQueryListEvent) => updateFavicon(e.matches);
    darkModeMedia.addEventListener("change", listener);

    return () => darkModeMedia.removeEventListener("change", listener);
  }, []);

  return null;
}
