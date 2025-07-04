"use client";

import useHandleNavigation from "@/hooks/useHandleNavigation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export const heroImages = [
	"https://i.ibb.co/SwkLzLNd/image-from-rawpixel-id-3848165-jpeg.jpg",
	"https://i.ibb.co/m51z94Hk/image-from-rawpixel-id-8961718-original.jpg",
	"https://i.ibb.co/6SCZnCG/image-from-rawpixel-id-3076119-jpeg.jpg",
	"https://i.ibb.co/vCYWQwG4/image-from-rawpixel-id-3844930-jpeg-1.jpg",
	"https://i.ibb.co/n2qqdMR/image-from-rawpixel-id-3049257-jpeg.jpg",
	"https://i.ibb.co/1G838n7r/image-from-rawpixel-id-6033811-original.jpg",
	"https://i.ibb.co/LdJc3CVJ/image-from-rawpixel-id-3848277-jpeg.jpg",
];

interface HeaderHeroProps {
	className?: string;
}

export default function HeaderHero({ className }: HeaderHeroProps) {
	const [isScrolled, setIsScrolled] = useState(false);
	const [backgroundImage, setBackgroundImage] = useState("");
	const handleNavigation = useHandleNavigation();

	// Set random background image on mount
	useEffect(() => {
		const randomIndex = Math.floor(Math.random() * heroImages.length);
		setBackgroundImage(heroImages[randomIndex]);
	}, []);

	// Handle scroll for header
	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<div className={cn("relative", className)} id="navbar">
			{/* Header */}
			<header
				className={cn(
					"header fixed top-0 left-0 right-0 z-[1000] transition-all duration-300",
					"flex justify-between items-center px-8 py-6",
					isScrolled
						? "bg-white shadow-[0_2px_10px_rgba(0,0,0,0.07)]"
						: "bg-transparent"
				)}
			>
				{/* Logo */}
				<Button
					onClick={() => scrollToSection("navbar")}
					className={cn(
						"logo font-bold text-3xl transition-all cursor-pointer duration-300 ease-out no-underline",
						"font-poppins",
						isScrolled
							? "text-[#1A1A1A]"
							: "text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.18)]"
					)}
				>
					acrilc
				</Button>

				{/* Navigation */}
				<nav className="nav-links flex items-center gap-8">
					{["features", "testimonials", "how-it-works", "gallery"].map((id) => (
						<button
							key={id}
							onClick={() => scrollToSection(id)}
							className={cn(
								"nav-link font-medium text-base transition-colors duration-300 ease-out",
								"relative py-2 no-underline",
								isScrolled
									? "text-[#1A1A1A] hover:text-[#E2725B]"
									: "text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.18)] hover:text-[#E2725B]"
							)}
						>
							{id
								.replace("-", " ")
								.replace(/\b\w/g, (l) => l.toUpperCase())}
						</button>
					))}

					{/* Sign Up */}
					<Button
						onClick={() => handleNavigation("/auth/signup")}
						className={cn(
							"px-8 py-6 cursor-pointer rounded-[50px] font-medium no-underline transition-all duration-300 ease-out border-2",
							"hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(226,114,91,0.2)]",
							isScrolled
								? "bg-white text-[#E2725B] border-[#E2725B] hover:bg-[#E2725B] hover:text-white"
								: "bg-white text-[#E2725B] border-[#E2725B] hover:bg-[#E2725B] hover:text-white"
						)}
					>
						Sign Up
					</Button>
				</nav>
			</header>

			{/* Hero Section */}
			<section className="hero min-h-screen flex items-center justify-center relative overflow-hidden pt-20 bg-cover bg-center bg-no-repeat transition-[background-image] duration-500 ease-in-out">
				{/* Background */}
				<div
					className="hero-background absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat animate-[zoomEffect_20s_ease-out_forwards] z-0"
					style={{ backgroundImage: `url('${backgroundImage}')` }}
				/>

				{/* Overlay */}
				<div className="absolute top-0 left-0 right-0 bottom-0 bg-black/40 z-10 pointer-events-none" />

				{/* Content */}
				<div className="hero-content relative z-20 max-w-3xl mx-auto text-center px-8 text-white flex flex-col items-center justify-center">
					<h1 className="font-poppins font-bold text-6xl mb-2">acrilc</h1>
					<p className="font-[Cormorant_Garamond,serif] text-4xl font-bold mb-4 tracking-[0.01em]">
						Empowering Artisans. Inspiring the World.
					</p>
					<p className="text-lg mb-8 text-center">
						Acrilc is the AI-powered platform where handcrafted art finds its
						voice, value, and global audience.
					</p>

					<div className="cta-buttons flex gap-4 justify-center">
						<button
							onClick={() => handleNavigation("/auth/login")}
							className="btn btn-primary px-8 py-4 rounded-[50px] font-medium no-underline transition-all duration-300 ease-out bg-gradient-to-r from-[#E2725B] to-[#D4A373] text-white border-none hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(226,114,91,0.3)]"
						>
							Join as an Artist
						</button>

						<button
							onClick={() => handleNavigation("/coming")}
							className="btn btn-secondary bg-white text-[#E2725B] border-2 border-[#E2725B] px-8 py-4 rounded-[50px] font-medium no-underline transition-all duration-300 ease-out hover:bg-[#E2725B] hover:text-white hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(226,114,91,0.2)]"
						>
							Create Your AI Portfolio
						</button>
					</div>
				</div>
			</section>
		</div>
	);
}
