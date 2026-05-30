export const dynamic = "force-dynamic";

import RouteProgress from "@/components/RouteProgress";
import RouteGuard from "@/hooks/RouteGuard";
import { Epilogue, Geist_Mono, Poppins } from "next/font/google";
import ClientUserLoader from "../hooks/ClientUserLoader";
import FaviconSwitcher from "./FaviconSwitcher";
import "./globals.css";
import ReduxProvider from "./provider";
import ClientToaster from "./toaster";
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
          <ReduxProvider>
            <ClientToaster />
            <ClientUserLoader />
            <RouteProgress />
            <FaviconSwitcher />
            <RouteGuard>{children}</RouteGuard>
          </ReduxProvider>
      </body>
    </html>
  );
}
