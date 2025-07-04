export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { Geist_Mono, Epilogue, Poppins } from "next/font/google";
import "./globals.css";
import ClientToaster from "./toaster";
import ReduxProvider from "./provider";
import ClientUserLoader from "../hooks/ClientUserLoader";
import RouteGuard from "@/hooks/RouteGuard";
import RouteProgress from "@/components/RouteProgress";
import FaviconSwitcher from "./FaviconSwitcher";
import { ThemeProvider } from "next-themes";
// import RouteProgress from "@/components/RouteProgress";

// Fonts
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const epilogue = Epilogue({
  variable: "--font-epilogue",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Acrilc - Showcase, Sell, and Connect as an Artist",
  description:
    "Acrilc is a dynamic platform for artists to showcase their artwork, connect with creators, and monetize their talents. Join a vibrant community and grow your artistic journey.",
  keywords: [
    "art portfolio",
    "artist community",
    "sell artwork online",
    "digital art gallery",
    "acrylic",
    "Acrilc app",
    "artist hub",
    "art monetization",
    "art platform India",
    "art showcase website",
  ],
  alternates: {
    canonical: "https://acrilc.com",
  },
  openGraph: {
    title: "Acrilc - Empowering Artists Worldwide",
    description:
      "Join Acrilc to showcase your creations, connect with other artists, and monetize your talent in a supportive community.",
    url: "https://acrilc.com",
    siteName: "Acrilc",
    images: [
      {
        url: "https://i.ibb.co/JRkvH0XH/Project-20250516020412.png",
        width: 1200,
        height: 630,
        alt: "Acrilc Art Platform Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Acrilc - Showcase, Sell, and Connect",
    description:
      "A creative hub for artists to share their work, build connections, and earn from their art.",
    images: ["https://i.ibb.co/JRkvH0XH/Project-20250516020412.png"],
  },
  // ✅ JSON-LD Schema
  other: {
    "script:ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Acrilc",
      url: "https://acrilc.com",
      logo: {
        "@type": "ImageObject",
        url: "https://acrilc.com/favicon-dark.ico", // Use your domain, not i.ibb.co
      },
      sameAs: [
        "https://twitter.com/acrilc",
        "https://www.instagram.com/acrilc",
      ],
    }),
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link id="favicon" rel="icon" href="/favicon-black.ico" />
      </head>
      <body
        className={`${epilogue.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ReduxProvider>
            <ClientToaster />
            <ClientUserLoader />
            <RouteProgress />
            <FaviconSwitcher />
            <RouteGuard>{children}</RouteGuard>
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
