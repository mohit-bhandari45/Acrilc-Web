"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function FaviconSwitcher() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const currentTheme = theme === "system" ? resolvedTheme : theme;
    const favicon =
      document.querySelector("link[rel='icon']") ||
      document.createElement("link");
    favicon.setAttribute("rel", "icon");
    favicon.setAttribute("type", "image/x-icon");
    favicon.setAttribute(
      "href",
      currentTheme === "dark" ? "/favicon-white.ico" : "/favicon-black.ico"
    );

    if (!favicon.parentNode) {
      document.head.appendChild(favicon);
    }
  }, [theme, resolvedTheme, mounted]);

  return null;
}
