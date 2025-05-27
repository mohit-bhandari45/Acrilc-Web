import type { Metadata } from "next";
import { Geist_Mono, Epilogue, Poppins } from "next/font/google";
import "./globals.css";
import ClientToaster from "./toaster";
import ReduxProvider from "./provider"; // Import the new component

// Load Geist Mono (optional)
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Load Epilogue
const epilogue = Epilogue({
  variable: "--font-epilogue",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Load Poppins
const poppins = Poppins({              
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "700"],              
});

export const metadata: Metadata = {
  title: "Acrilc",
  description: "Artist Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${epilogue.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
      >
        <ReduxProvider>
          <ClientToaster />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}