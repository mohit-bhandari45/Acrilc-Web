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
	{ href: "#", label: "Explore", id: "exploreBtn", linksTo: "/explore" },
	{ href: "#", label: "Blog", linksTo: "/profile" },
	{ href: "#", label: "Collections", linksTo: "/profile" },
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
					"bg-white/95 backdrop-blur-md border-b border-black/10",
					scrolled && "shadow-sm",
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
							className="flex items-center hover:opacity-80 transition-opacity cursor-pointer"
						>
							<div className="h-9 w-9 sm:h-12 sm:w-12 rounded-full overflow-hidden bg-black relative">
								{!currentUser.profilePicture ? (
									<Image
										src="/assets/empty.png"
										alt="Profile Avatar"
										fill
										className="object-cover"
									/>
								) : (
									<Image
										src={currentUser.profilePicture}
										alt="Profile"
										fill
										unoptimized
										className="object-cover"
									/>
								)}
							</div>
						</button>
					</nav>

					{/* Mobile Menu Button */}
					<button
						onClick={toggleProfileMenu}
						className="flex items-center hover:opacity-80 transition-opacity md:hidden cursor-pointer"
					>
						<div className="h-9 w-9 sm:h-12 sm:w-12 rounded-full overflow-hidden bg-black relative">
							{!currentUser.profilePicture ? (
								<Image
									src="/assets/empty.png"
									alt="Profile Avatar"
									fill
									className="object-cover"
								/>
							) : (
								<Image
									src={currentUser.profilePicture}
									alt="Profile"
									fill
									unoptimized
									className="object-cover"
								/>
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
							"fixed right-0 top-0 h-full w-80 bg-white shadow-xl",
							"transform transition-all duration-500 ease-in-out",
							"animate-in slide-in-from-right",
							isProfileMenuOpen ? "translate-x-0" : "translate-x-full"
						)}
					>
						{/* Profile Menu Header */}
						<div className="flex items-center justify-between p-4 border-b border-gray-200">
							<h2 className="text-xl font-semibold text-gray-900">Account</h2>
							<Button
								variant="ghost"
								size="sm"
								onClick={closeProfileMenu}
								className="hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
							>
								<svg
									width="24"
									height="24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M18 6L6 18M6 6l12 12" />
								</svg>
							</Button>
						</div>

						{/* Profile Section */}
						<div className="p-4 border-b border-gray-200">
							<div className="flex items-center gap-3">
								<div className="h-14 w-14 rounded-full overflow-hidden bg-black relative flex-shrink-0">
									{!currentUser.profilePicture ? (
										<Image
											src="/assets/empty.png"
											alt="Profile Avatar"
											fill
											className="object-cover"
										/>
									) : (
										<Image
											src={currentUser.profilePicture}
											alt="Profile"
											fill
											unoptimized
											className="object-cover"
											onError={(e) => {
												const target = e.target as HTMLImageElement;
												target.src = "https://via.placeholder.com/56";
											}}
										/>
									)}
								</div>
								<div className="flex-1 min-w-0">
									<h3 className="font-semibold text-gray-900 truncate">
										{currentUser.fullName || currentUser.username}
									</h3>
									<p className="text-sm text-gray-500 truncate">
										@{currentUser.username}
									</p>
									<p className="text-sm text-gray-500 truncate">
										{currentUser.email}
									</p>
								</div>
							</div>
						</div>

						{/* Menu Items */}
						<nav className="p-4 space-y-1">
							<Link
								href={`/profile/${currentUser.username}`}
								onClick={closeProfileMenu}
								className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200 group"
							>
								<User className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
								<span className="font-medium">Your Profile</span>
							</Link>

							<Link
								href="/settings/general"
								onClick={closeProfileMenu}
								className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200 group"
							>
								<Settings className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
								<span className="font-medium">Settings</span>
							</Link>

							<button
								onClick={handleLogOut}
								className="flex items-center cursor-pointer gap-3 px-3 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 w-full text-left group"
							>
								<LogOut className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
								<span className="font-medium">Logout</span>
							</button>
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
