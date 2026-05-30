"use client";

import { cn } from "@/lib/utils";
import { IUser } from "@/types/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";

interface HeaderHeroProps {
	user: IUser | null;
	className?: string;
}

const Navbar = ({ className, user }: HeaderHeroProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const [isScrolled, setIsScrolled] = useState(false);
	const backgroundImage =
		"https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80";

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
					<button
						onClick={() => scrollToSection("artists")}
						className={cn(
							"nav-link font-medium text-base transition-colors duration-300 ease-out",
							"relative py-2 no-underline",
							isScrolled
								? "text-[#1A1A1A] hover:text-[#E2725B]"
								: "text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.18)] hover:text-[#E2725B]"
						)}
					>
						Artists
					</button>

					<button
						onClick={() => scrollToSection("artworks")}
						className={cn(
							"nav-link font-medium text-base transition-colors duration-300 ease-out",
							"relative py-2 no-underline",
							isScrolled
								? "text-[#1A1A1A] hover:text-[#E2725B]"
								: "text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.18)] hover:text-[#E2725B]"
						)}
					>
						Artworks
					</button>

					<button
						onClick={() => scrollToSection("marketplace")}
						className={cn(
							"nav-link font-medium text-base transition-colors duration-300 ease-out",
							"relative py-2 no-underline",
							isScrolled
								? "text-[#1A1A1A] hover:text-[#E2725B]"
								: "text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.18)] hover:text-[#E2725B]"
						)}
					>
						Marketplace
					</button>

					<button
						onClick={() => scrollToSection("blog")}
						className={cn(
							"nav-link font-medium text-base transition-colors duration-300 ease-out",
							"relative py-2 no-underline",
							isScrolled
								? "text-[#1A1A1A] hover:text-[#E2725B]"
								: "text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.18)] hover:text-[#E2725B]"
						)}
					>
						Blog
					</button>

					{/* Sign In Button */}
					{user ? (
						<div
							onClick={() => {
								if (user.username) {
									router.push(`/profile/${user.username}`)
								} else {
									router.replace(`/auth/username?next=${encodeURIComponent(pathname)}`)
								}
							}}
							className="h-9 w-9 sm:h-11 sm:w-11 rounded-full overflow-hidden relative cursor-pointer bg-[#ead7c9] ring-2 ring-white/70 shadow-[0_2px_8px_rgba(89,59,43,0.2)] transition hover:ring-[#E2725B]/40 hover:shadow-[0_4px_12px_rgba(89,59,43,0.28)]"
						>
							{user.profilePicture ? (
								<Image
									src={user.profilePicture}
									alt="Profile"
									fill
									unoptimized
									className="object-cover"
								/>
							) : (
								<div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#834C3D_0%,#a8664f_55%,#d38d67_100%)]">
									<span className="text-sm font-bold text-white sm:text-base select-none">
										{user.fullName
											.split(" ")
											.map((n) => n[0])
											.slice(0, 2)
											.join("")
											.toUpperCase()}
									</span>
								</div>
							)}
						</div>
					) : (
						<div onClick={() => router.push("/auth/signup")}>
							<button
								className={cn(
									"btn btn-secondary btn-signin px-8 py-4 rounded-[50px] font-medium no-underline",
									"transition-all duration-300 ease-out border-2",
									"hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(226,114,91,0.2)]",
									isScrolled
										? "bg-white text-[#E2725B] border-[#E2725B] hover:bg-[#E2725B] hover:text-white hover:border-[#E2725B]"
										: "bg-white text-[#E2725B] border-[#E2725B] hover:bg-[#E2725B] hover:text-white hover:border-[#E2725B]"
								)}
								onClick={() => {
									console.log("Sign in clicked");
								}}
							>
								Sign Up
							</button>
						</div>
					)}
				</nav>
			</header>

			<section className="hero min-h-screen flex items-center justify-center relative overflow-hidden pt-12 bg-cover bg-center bg-no-repeat transition-[background-image] duration-500 ease-in-out">
				<div
					className="hero-background absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat animate-[zoomEffect_20s_ease-out_forwards] z-0"
					style={{ backgroundImage: `url('${backgroundImage}')` }}
				/>

				<div className="absolute top-0 left-0 right-0 bottom-0 bg-black/40 z-10 pointer-events-none" />

				<div className="hero-content relative z-20 text-center px-8 transition-transform duration-300 ease-out text-white flex flex-col items-center justify-center">
					<h1 className="font-playfair text-4xl md:text-[4rem] font-bold mb-5 leading-tight drop-shadow-lg">
						Empowering Handcrafted Artists
					</h1>
					<p className="text-lg md:text-xl leading-relaxed mb-12 max-w-2xl text-gray-200 drop-shadow-md">
						Discover, connect, and support talented artists from around the
						world on our AI-enabled social-commerce platform
					</p>
					<button className="px-8 py-4 text-lg font-medium border-2 border-white rounded-full transition transform hover:bg-white hover:text-gray-800 hover:scale-105 duration-500 hover:shadow-md">
						Join Our Community
					</button>
				</div>
			</section>
		</div>
	);
};

export default Navbar;
