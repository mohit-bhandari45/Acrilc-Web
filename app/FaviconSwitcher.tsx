// app/components/FaviconSwitcher.tsx
"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

export default function FaviconSwitcher() {
	const { theme, resolvedTheme } = useTheme();

	useEffect(() => {
		const favicon = document.getElementById("favicon") as HTMLLinkElement;
		if (!favicon) return;

		const currentTheme = theme === "system" ? resolvedTheme : theme;
		favicon.href = currentTheme === "dark" ? "/favicon-light.ico" : "/favicon-dark.ico";
        console.log(currentTheme);
	}, [theme, resolvedTheme]);

	return null;
}
