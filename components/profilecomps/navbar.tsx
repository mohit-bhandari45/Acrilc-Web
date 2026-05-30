"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Logo from "../universalcomps/logo";
import { useRouter } from "next/navigation";
import { IUser } from "@/types/types";
import { LogOut, User, Settings } from "lucide-react";
import MainLoader from "../universalcomps/mainloader";
import toast from "react-hot-toast";
import api from "@/apis/api";
import { useAppDispatch } from "@/store/hooks";
import { clearUser } from "@/store/features/userSlice";

interface NavItem {
	href: string;
	label: string;
	id?: string;
	linksTo: string;
}

const navItems: NavItem[] = [
	{ href: "#home", label: "Home", linksTo: "/home" },
	{ href: "#about", label: "About", linksTo: "/about" },
	{ href: "#gallery", label: "Gallery", linksTo: "/profile" },
	{ href: "#shop", label: "Marketplace", linksTo: "/profile" },
	{ href: "#", label: "Blog", linksTo: "/profile" },
];

interface HeaderProps {
	currentUser: IUser;
	className?: string;
	onExploreClick?: () => void;
	show: boolean;
	portfolio: boolean;
}

export default function Header({
	className,
	onExploreClick,
	currentUser,
	show = true,
	portfolio = true,
}: HeaderProps) {
	const router = useRouter();
	const [activeLink, setActiveLink] = useState("#about");
	const [scrolled, setScrolled] = useState(false);
	const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
	const [loader, setLoader] = useState(false);
	const dispatch = useAppDispatch();

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 10);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const handleNavClick = (href: string, id?: string) => {
		if (id === "exploreBtn" && onExploreClick) {
			onExploreClick();
			return;
		}

		if (href.startsWith("#")) {
			setActiveLink(href);
		}
	};

	const handleLogOut = async () => {
		setLoader(true);
		try {
			await api.get(`/auth/logout`);
			dispatch(clearUser());
			localStorage.removeItem("profile-skip");
			localStorage.removeItem("username");
			toast.success("Logged out successfully");
			router.push("/");
		} catch (error) {
			console.log(error);
			toast.error("Something went wrong");
		} finally {
			setLoader(false);
			setIsProfileMenuOpen(false);
		}
	};

	const toggleProfileMenu = () => {
		setIsProfileMenuOpen(!isProfileMenuOpen);
	};

	const closeProfileMenu = () => {
		setIsProfileMenuOpen(false);
	};

	if (loader) {
		return <MainLoader msg={"Logging Out"} />;
	}

	return (
		<>
			<header
				className={cn(
					"fixed top-0 left-0 right-0 z-50 transition-all duration-300",
					"bg-[#fbf7f2]/95 backdrop-blur-md border-b border-[#e8d5c4]/60",
					scrolled && "shadow-[0_2px_12px_rgba(89,59,43,0.08)]",
					className
				)}
			>
				<div className="flex justify-between items-center px-6 md:px-10 py-5">
					{/* Logo */}
					<Logo />

					{/* Navigation */}
					<nav className="hidden md:flex items-center gap-8">
						{show &&
							navItems.map((item) => {
								const isActive = activeLink === item.href;
								const linkClasses = cn(
									"relative text-gray-600 font-normal transition-all duration-300",
									"hover:text-black hover:font-semibold",
									"after:absolute after:bottom-[-5px] after:left-0 after:right-0 after:h-0.5",
									"after:bg-black after:scale-x-0 hover:after:scale-x-100",
									"after:transition-transform after:duration-300",
									isActive && portfolio && "text-black font-semibold"
								);

								return portfolio ? (
									<Link
										key={item.label}
										href={item.href}
										id={item.id}
										onClick={() => handleNavClick(item.href, item.id)}
										className={linkClasses}
									>
										{item.label}
									</Link>
								) : (
									<Link
										key={item.label}
										href={
											item.linksTo === "/profile"
												? `${item.linksTo}/${currentUser.username}${item.label.toLowerCase() !== "collections"
													? `?tab=${item.label.toLowerCase()}`
													: ""
												}`
												: item.linksTo
										}
										id={item.id}
										onClick={() => handleNavClick(item.href, item.id)}
										className={linkClasses}
									>
										{item.label}
									</Link>
								);
							})}

						{/* Profile Picture */}
						<button
							onClick={toggleProfileMenu}
							className="flex items-center cursor-pointer"
						>
							<div className="relative h-9 w-9 sm:h-11 sm:w-11 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-[#ead7c9] shadow-sm transition-all duration-200 hover:ring-[#E2725B]/50">
								{currentUser.profilePicture ? (
									<Image src={currentUser.profilePicture} alt="Profile" fill unoptimized className="object-cover" />
								) : (
									<div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#834C3D_0%,#a8664f_55%,#d38d67_100%)] select-none">
										<span className="text-xs font-bold text-white sm:text-sm">
											{currentUser.fullName?.trim().split(/\s+/).filter(Boolean).slice(0, 2).map(n => n[0].toUpperCase()).join("") || "?"}
										</span>
									</div>
								)}
							</div>
						</button>
					</nav>

					{/* Mobile Menu Button */}
					<button
						onClick={toggleProfileMenu}
						className="flex items-center cursor-pointer md:hidden"
					>
						<div className="relative h-9 w-9 sm:h-11 sm:w-11 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-[#ead7c9] shadow-sm transition-all duration-200 hover:ring-[#E2725B]/50">
							{currentUser.profilePicture ? (
								<Image src={currentUser.profilePicture} alt="Profile" fill unoptimized className="object-cover" />
							) : (
								<div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#834C3D_0%,#a8664f_55%,#d38d67_100%)] select-none">
									<span className="text-xs font-bold text-white sm:text-sm">
										{currentUser.fullName?.trim().split(/\s+/).filter(Boolean).slice(0, 2).map(n => n[0].toUpperCase()).join("") || "?"}
									</span>
								</div>
							)}
						</div>
					</button>
				</div>
			</header>

			{/* Profile Menu Overlay */}
			{isProfileMenuOpen && (
				<div className="fixed inset-0 z-60">
					<div
						className="fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ease-in-out"
						onClick={closeProfileMenu}
					/>
					<div
						className={cn(
							"fixed right-0 top-0 h-full w-80 bg-[#fbf7f2] shadow-xl",
							"transform transition-all duration-500 ease-in-out",
							"animate-in slide-in-from-right",
							isProfileMenuOpen ? "translate-x-0" : "translate-x-full"
						)}
					>
						{/* Header */}
						<div className="flex items-center justify-between px-5 py-4 border-b border-[#e8d5c4]">
							<h2 className="text-lg font-bold text-[#3d2b1f]">Account</h2>
							<button
								onClick={closeProfileMenu}
								className="flex h-8 w-8 items-center justify-center rounded-full text-[#8a7060] hover:bg-[#f0ddd0] hover:text-[#5e3c2f] transition-colors cursor-pointer"
							>
								<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
									<path d="M18 6L6 18M6 6l12 12" />
								</svg>
							</button>
						</div>

						{/* Profile info */}
						<div className="px-5 py-4 border-b border-[#e8d5c4]">
							<div className="flex items-center gap-3">
								<div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-[#ead7c9] shadow-sm">
									{currentUser.profilePicture ? (
										<Image src={currentUser.profilePicture} alt="Profile" fill unoptimized className="object-cover" />
									) : (
										<div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#834C3D_0%,#a8664f_55%,#d38d67_100%)] select-none">
											<span className="text-sm font-bold text-white">
												{currentUser.fullName?.trim().split(/\s+/).filter(Boolean).slice(0, 2).map(n => n[0].toUpperCase()).join("") || "?"}
											</span>
										</div>
									)}
								</div>
								<div className="flex-1 min-w-0">
									<p className="font-bold text-[#2e1f14] truncate">
										{currentUser.fullName || currentUser.username}
									</p>
									<p className="text-sm text-[#834C3D] font-medium truncate">
										@{currentUser.username}
									</p>
									<p className="text-xs text-[#9a8578] truncate mt-0.5">
										{currentUser.email}
									</p>
								</div>
							</div>
						</div>

						{/* Menu Items */}
						<nav className="p-3 space-y-0.5">
							<Link
								href={`/profile/${currentUser.username}`}
								onClick={closeProfileMenu}
								className="flex items-center gap-3 px-3 py-3 text-[#5e3c2f] hover:bg-[#f0ddd0] rounded-xl transition-all duration-200 group"
							>
								<User className="w-4 h-4 text-[#834C3D] group-hover:scale-110 transition-transform duration-200" />
								<span className="font-medium text-sm">Your Profile</span>
							</Link>

							<Link
								href="/settings/general"
								onClick={closeProfileMenu}
								className="flex items-center gap-3 px-3 py-3 text-[#5e3c2f] hover:bg-[#f0ddd0] rounded-xl transition-all duration-200 group"
							>
								<Settings className="w-4 h-4 text-[#834C3D] group-hover:scale-110 transition-transform duration-200" />
								<span className="font-medium text-sm">Settings</span>
							</Link>

							<div className="pt-2 mt-2 border-t border-[#e8d5c4]">
								<button
									onClick={handleLogOut}
									className="flex items-center cursor-pointer gap-3 px-3 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 w-full text-left group"
								>
									<LogOut className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
									<span className="font-medium text-sm">Logout</span>
								</button>
							</div>
						</nav>
					</div>
				</div>
			)}
		</>
	);
}

// Optional: Mobile Navigation Component
interface MobileNavProps {
	isOpen: boolean;
	onClose: () => void;
	activeLink: string;
	onNavClick: (href: string, id?: string) => void;
}

export function MobileNav({
	isOpen,
	onClose,
	activeLink,
	onNavClick,
}: MobileNavProps) {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-40 md:hidden">
			<div
				className="fixed inset-0 bg-black/20 transition-opacity duration-300"
				onClick={onClose}
			/>
			<div
				className={cn(
					"fixed right-0 top-0 h-full w-64 bg-white shadow-xl",
					"transform transition-transform duration-300 ease-in-out",
					isOpen ? "translate-x-0" : "translate-x-full"
				)}
			>
				<div className="flex items-center justify-between p-6 border-b">
					<span className="text-xl font-medium">Menu</span>
					<Button variant="ghost" size="sm" onClick={onClose}>
						<svg
							width="24"
							height="24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
						>
							<path d="M18 6L6 18M6 6l12 12" />
						</svg>
					</Button>
				</div>
				<nav className="p-6 space-y-4">
					{navItems.map((item) => (
						<Link
							key={item.label}
							href={item.href}
							id={item.id}
							onClick={() => {
								onNavClick(item.href, item.id);
								onClose();
							}}
							className={cn(
								"block py-2 text-gray-600 hover:text-black transition-colors",
								activeLink === item.href && "text-black font-semibold"
							)}
						>
							{item.label}
						</Link>
					))}
					<Button asChild className="w-full mt-6">
						<Link href="/signin">Sign in</Link>
					</Button>
				</nav>
			</div>
		</div>
	);
}
