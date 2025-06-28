export const dynamic = 'force-dynamic';

import type { Metadata } from "next";
import { Geist_Mono, Epilogue, Poppins } from "next/font/google";
import "./globals.css";
import ClientToaster from "./toaster";
import ReduxProvider from "./provider";
import ClientUserLoader from "../hooks/ClientUserLoader";
import RouteGuard from "@/hooks/RouteGuard";

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
		"art showcase website"
	],
	openGraph: {
		title: "Acrilc - Empowering Artists Worldwide",
		description:
			"Join Acrilc to showcase your creations, connect with other artists, and monetize your talent in a supportive community.",
		url: "https://acrilc.com",
		siteName: "Acrilc",
		images: [
			{
				url: "https://i.ibb.co/JRkvH0XH/Project-20250516020412.png", // Make sure this exists
				width: 1200,
				height: 630,
				alt: "Acrilc Art Platform Preview"
			}
		],
		locale: "en_US",
		type: "website"
	},
	twitter: {
		card: "summary_large_image",
		title: "Acrilc - Showcase, Sell, and Connect",
		description:
			"A creative hub for artists to share their work, build connections, and earn from their art.",
		images: ["https://i.ibb.co/JRkvH0XH/Project-20250516020412.png"]
	}
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {

	const initialReduxState = {
		userReducer: {
			user: null,
			loading: false
		},
	};

	return (
		<html lang="en">
			<body
				className={`${epilogue.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
			>
				<ReduxProvider initialReduxState={initialReduxState}>
					<ClientToaster />
					<ClientUserLoader />
					<RouteGuard>
						{children}
					</RouteGuard>
				</ReduxProvider>
			</body>
		</html>
	);
}