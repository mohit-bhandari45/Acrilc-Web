"use client";

import api, { ADD_Banner_PIC, ADD_PROFILE_PIC } from "@/apis/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import UploadService from "@/service/service";
import { IUser } from "@/types/types";
import {
	Axe, BookOpen, Box, Briefcase, Camera, Coffee,
	Crown, FileText, Gem, Grid3X3, Hammer, LayoutGrid,
	Layers, MapPin, Monitor, Palette, PenTool, Pencil,
	Printer, Scissors, Star, Wine,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
	FaBehance,
	FaFacebook,
	FaInstagram,
	FaLink,
	FaLinkedin,
	FaPinterest,
	FaTwitter,
	FaYoutube,
} from "react-icons/fa";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "../ui/scroll-area";

const FORTE_ICON_MAP: Record<string, React.ReactNode> = {
	"Woolen Craft": <Scissors className="h-4 w-4" />,
	"Poetry": <BookOpen className="h-4 w-4" />,
	"Exclusive": <Crown className="h-4 w-4" />,
	"Paintings": <Palette className="h-4 w-4" />,
	"Sculptures": <Box className="h-4 w-4" />,
	"Wooden Crafts": <Axe className="h-4 w-4" />,
	"Textile Art": <Scissors className="h-4 w-4" />,
	"Ceramics": <Coffee className="h-4 w-4" />,
	"Jewelry Design": <Gem className="h-4 w-4" />,
	"Glass Art": <Wine className="h-4 w-4" />,
	"Metalwork": <Hammer className="h-4 w-4" />,
	"Paper Crafts": <FileText className="h-4 w-4" />,
	"Mixed Media": <Layers className="h-4 w-4" />,
	"Photography": <Camera className="h-4 w-4" />,
	"Digital Art": <Monitor className="h-4 w-4" />,
	"Calligraphy": <PenTool className="h-4 w-4" />,
	"Printmaking": <Printer className="h-4 w-4" />,
	"Mosaic Art": <Grid3X3 className="h-4 w-4" />,
	"Leatherwork": <Briefcase className="h-4 w-4" />,
	"Pottery": <Coffee className="h-4 w-4" />,
	"Fiber Art": <Scissors className="h-4 w-4" />,
	"Illustration": <Pencil className="h-4 w-4" />,
	"Installation Art": <LayoutGrid className="h-4 w-4" />,
};

interface ArtistProfileProps {
	user: IUser;
	isSame: boolean;
}

const ArtistProfile: React.FC<ArtistProfileProps> = ({
	user,
	isSame,
}: ArtistProfileProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const [bpLoader, setBpLoader] = useState(false);
	const [ppLoader, setPpLoader] = useState(false);
	const [followers, setFollowers] = useState(user?.totalFollowers || 0);
	const [followed, setFollowed] = useState(user.isFollowed || false);
	const [open, setOpen] = useState<"follower" | "following" | null>(null);
	const [supporter, setSupporter] = useState<IUser[]>([]);
	const [supporting, setSupporting] = useState<IUser[]>([]);
	const [isImageOpen, setIsImageOpen] = useState(false);

	const handleProfileChange = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const profilePic = event.target.files?.[0];
		setPpLoader(true);

		if (profilePic) {
			try {
				const url = await UploadService.uploadToImgBB(profilePic);

				const response = await api.post(ADD_PROFILE_PIC, { imageURL: url });

				if (response.status === 200) {
					toast.success("Profile Pic Updated!");
					window.location.reload();
				}
			} catch (error) {
				console.log(error);
				toast.error("Something went wrong. Please Try again!");
			} finally {
				window.location.reload();
			}
		}
	};

	const handleBannerChange = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const bannerPic = event.target.files?.[0];
		setBpLoader(true);

		if (bannerPic) {
			try {
				const url = await UploadService.uploadToImgBB(bannerPic);

				const response = await api.post(ADD_Banner_PIC, {
					bannerURL: url,
				});

				if (response.status === 200) {
					toast.success("Banner Pic Updated!");
					window.location.reload();
				}
			} catch (error) {
				console.log(error);
				toast.error("Something went wrong. Please Try again!");
			} finally {
				window.location.reload();
			}
		}
	};

	const getIcon = (platform: string) => {
		switch (platform.toLowerCase()) {
			case "instagram":
				return <FaInstagram />;
			case "twitter":
				return <FaTwitter />;
			case "linkedin":
				return <FaLinkedin />;
			case "facebook":
				return <FaFacebook />;
			case "youtube":
				return <FaYoutube />;
			case "pinterest":
				return <FaPinterest />;
			case "behance":
				return <FaBehance />;
			default:
				return <FaLink />;
		}
	};

	const handleSupport = async () => {
		try {
			const { data } = await api.get(`/api/socials/${user._id}/follow`);
			if (data.msg === "User Unfollowed" && followers > 0) {
				setFollowers((prev) => prev - 1);
				setFollowed(false);
			} else {
				setFollowers((prev) => prev + 1);
				setFollowed(true);
			}
			toast.success(data.msg);
		} catch (error) {
			console.log(error);
			toast.error("Something went wrong!!");
		}
	};

	useEffect(() => {
		let isMounted = true;

		const fetchFollowers = async () => {
			try {
				const { data } = await api.get(`/api/socials/${user._id}/followers`);
				const { data: followingData } = await api.get(
					`/api/socials/${user._id}/following`
				);

				if (!isMounted) return;
				setSupporter(data.data);
				setSupporting(followingData.data);
			} catch (err) {
				console.error(err);
				if (!isMounted) return;
				setSupporter([]);
				setSupporting([]);
			}
		};

		fetchFollowers();

		return () => {
			isMounted = false;
		};
	}, [user._id]);

	const tabDefs = [
		{ value: "follower", label: "Supporters" },
		{ value: "following", label: "Supportings" },
	];

	return (
		<>
			{(bpLoader || ppLoader) && (
				<div className="fixed inset-0 flex flex-col gap-5 justify-center z-[60] items-center bg-[#2e1a10]/80 backdrop-blur-sm p-4">
					<div className="relative flex items-center justify-center">
						<div className="h-14 w-14 rounded-full border-4 border-[#ead7c9] border-t-[#834C3D] animate-spin" />
						<div className="absolute h-9 w-9 rounded-full border-2 border-[#E2725B]/20 border-t-[#a8664f]/60 animate-spin [animation-direction:reverse] [animation-duration:800ms]" />
					</div>
					<p className="text-base font-semibold text-white">
						{bpLoader ? "Updating Banner..." : "Updating Profile Pic..."}
					</p>
				</div>
			)}

			<Dialog
				open={["follower", "following"].includes(open ?? "")}
				onOpenChange={(v) => setOpen(v ? "follower" : null)}
			>
				<DialogContent className="sm:max-w-md bg-[#fbf7f2] border border-[#e8d5c4] p-0 overflow-hidden">
					<DialogHeader className="px-5 pt-5 pb-0">
						<Tabs
							defaultValue={open as "follower" | "following"}
							orientation='vertical'
							className='space-y-0'
						>
							<div className='w-full border-b border-[#e8d5c4]'>
								<TabsList className="bg-transparent h-auto p-0 gap-0">
									{tabDefs.map(({ value, label }) => (
										<TabsTrigger
											key={value}
											value={value}
											onClick={() => setOpen(value as "follower" | "following")}
											className="rounded-none px-5 py-3 text-sm font-semibold text-[#9a8578] bg-transparent border-0 border-b-2 border-transparent shadow-none outline-none ring-0 data-[state=active]:text-[#834C3D] data-[state=active]:border-b-[#834C3D] data-[state=active]:bg-transparent data-[state=active]:shadow-none transition-all"
										>
											<DialogTitle className="text-inherit font-inherit">{label}</DialogTitle>
										</TabsTrigger>
									))}
								</TabsList>
							</div>
							<div className="h-[50vh] px-3 py-3">
								{(["follower", "following"] as const).map((val, index) => {
									const panes = {
										follower: { users: supporter, empty: "No supporters yet" },
										following: { users: supporting, empty: "Not supporting anyone yet" },
									} as const;
									const { users, empty } = panes[val];
									return (
										<TabsContent key={index} className="h-full mt-0" value={val}>
											{users && users.length > 0 ? (
												<ScrollArea className='h-full w-full'>
													<div className="space-y-1 pr-2">
													{users.map((item, index) => (
														<div
															onClick={() => router.push(`/profile/${item.username}`)}
															key={index}
															className="cursor-pointer flex items-center gap-3 hover:bg-[#f0ddd0] px-3 py-2.5 rounded-xl transition-colors"
														>
															<Avatar className="w-10 h-10 flex-shrink-0">
																<AvatarImage src={item?.profilePicture} alt={item?.fullName} className="object-cover" />
																<AvatarFallback className="bg-[linear-gradient(135deg,#834C3D_0%,#a8664f_55%,#d38d67_100%)] text-white text-sm font-semibold">
																	{item?.fullName.trim().split(/\s+/).filter(Boolean).slice(0,2).map(n=>n[0].toUpperCase()).join("")}
																</AvatarFallback>
															</Avatar>
															<div className="min-w-0">
																<p className="text-sm font-semibold text-[#2e1f14] truncate">{item.fullName}</p>
																<p className="text-xs text-[#9a8578] truncate">{item.email}</p>
															</div>
														</div>
													))}
													</div>
												</ScrollArea>
											) : (
												<div className="flex flex-col justify-center items-center h-full gap-3 text-center">
													<div className="h-12 w-12 rounded-full bg-[#f5e2d8] flex items-center justify-center">
														<svg className="h-6 w-6 text-[#834C3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
															<path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
														</svg>
													</div>
													<p className="text-sm font-semibold text-[#3d2b1f]">{empty}</p>
												</div>
											)}
										</TabsContent>
									)
								})}
							</div>
						</Tabs>
					</DialogHeader>
					<div className="flex items-center gap-2">
					</div>
				</DialogContent>
			</Dialog>

			<div className="w-full max-w-6xl mx-auto px-3 sm:px-5 pt-4 sm:pt-6 pb-3 sm:pb-5 mt-20">
				<Card className="relative overflow-hidden shadow-[0_8px_32px_rgba(89,59,43,0.12)] mb-4 sm:mb-8 border border-[#e8d5c4]/60 bg-white">
					{/* Banner Section */}
					<div className="relative h-32 sm:h-40 md:h-48 rounded-t-lg overflow-hidden cursor-pointer z-10">
						{/* Banner Background Image or Gradient */}
						{user?.bannerPicture ? (
							<img src={user.bannerPicture} alt="Banner" className="h-full w-full object-cover" />
						) : (
							<div className="relative flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#c9956b_0%,#dba97e_45%,#efc9a8_100%)] overflow-hidden">
								<div className="absolute -top-8 -right-8 h-40 w-40 rounded-full bg-white/10" />
								<div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-white/10" />
								<span className="font-playfair text-[4rem] sm:text-[6rem] font-bold leading-none text-white/20 select-none">
									{user?.fullName?.[0]?.toUpperCase() ?? "A"}
								</span>
							</div>
						)}

						{/* Black overlay with pencil icon */}
						{isSame && (
							<>
								<div className="absolute inset-0 bg-black/50 border-white border-[0.5px] rounded-t-xl flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity z-20">
									<Camera className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
									<input
										type="file"
										accept="image/*"
										className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-30"
										onChange={(e) => handleBannerChange(e)}
									/>
								</div>
							</>
						)}
					</div>

					{/* Profile Image - Responsive positioning */}
					<div className="absolute top-16 sm:top-20 md:top-24 left-4 sm:left-8 md:left-16 w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 z-40">
						<label className="relative cursor-pointer group w-full h-full">
							{/* Outer border wrapper */}
							<div className="w-full h-full rounded-full border-2 sm:border-4 border-white shadow-lg overflow-hidden relative z-40">
								{/* Avatar and fallback */}
								<Avatar className="w-full h-full">
									<AvatarImage
										onClick={() => setIsImageOpen(true)}
										src={user?.profilePicture}
										alt={user?.fullName}
										className="object-cover"
									/>
									<AvatarFallback className="bg-[linear-gradient(135deg,#834C3D_0%,#a8664f_55%,#d38d67_100%)] text-white text-sm sm:text-lg md:text-2xl font-semibold">
										{user?.fullName
											.split(" ")
											.map((n) => n[0])
											.join("")}
									</AvatarFallback>
								</Avatar>

								{isSame && (
									<>
										{/* Black film over the image only */}
										<div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
											<Camera className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
										</div>
									</>
								)}
							</div>

							{/* Profile Image Upload Input */}
							{isSame && (
								<input
									type="file"
									accept="image/*"
									className="hidden"
									onChange={handleProfileChange}
								/>
							)}
						</label>
					</div>

					{/* Content Section */}
					<div className="pt-12 sm:pt-16 md:pt-20 pb-4 sm:pb-6 md:pb-8">
						<div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-6 md:px-8">
							{/* Profile Info Block */}
							<div className="xl:col-span-2">
								<Card className="h-full bg-white border border-[#e8d5c4]/60 shadow-sm">
									<CardContent className="p-4 sm:p-6 md:p-8">
										<div className="space-y-4 sm:space-y-5">
											{/* Basic Info */}
											<div>
												<h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#2e1f14] mb-1.5">
													{user.fullName}
												</h1>
												{user.location && (
													<div className="flex items-center text-[#8a7060] mb-3">
														<MapPin className="w-3.5 h-3.5 mr-1.5 flex-shrink-0 text-[#834C3D]" />
														<span className="text-sm">{user.location}</span>
													</div>
												)}
												{user.bio && (
													<p className="text-sm text-[#5e3c2f] leading-relaxed">
														{user.bio}
													</p>
												)}
											</div>

											{/* Action Buttons */}
											<div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
												{isSame ? (
													<Link
														className="cursor-pointer flex-1 sm:flex-none"
														href={"/settings/general"}
													>
														<Button className="w-full sm:w-auto cursor-pointer rounded-full border border-[#8f5b42]/10 bg-[linear-gradient(135deg,#834C3D_0%,#a8664f_55%,#d38d67_100%)] px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base font-semibold text-white shadow-[0_8px_20px_rgba(131,76,61,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(131,76,61,0.32)]">
															Edit Profile
														</Button>
													</Link>
												) : (
													<Button
														onClick={handleSupport}
														className="w-full sm:w-auto cursor-pointer rounded-full border border-[#8f5b42]/10 bg-[linear-gradient(135deg,#834C3D_0%,#a8664f_55%,#d38d67_100%)] px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base font-semibold text-white shadow-[0_8px_20px_rgba(131,76,61,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(131,76,61,0.32)]"
													>
														{followed ? "Stop-Supporting" : "Support"}
													</Button>
												)}
												{isSame ? (
													<Dialog>
														<DialogTrigger asChild>
															<Button
																variant="outline"
																className="w-full sm:w-auto cursor-pointer rounded-full border border-[#834C3D] text-[#834C3D] hover:bg-[#fff7f2] px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base font-medium transition-all duration-200 hover:-translate-y-0.5"
															>
																Share Profile
															</Button>
														</DialogTrigger>
														<DialogContent className="mx-4 sm:mx-0 w-[calc(100vw-2rem)] sm:w-full max-w-md">
															<DialogHeader>
																<DialogTitle className="text-lg sm:text-xl">
																	Share Your Profile
																</DialogTitle>
																<DialogDescription className="text-sm sm:text-base">
																	Choose how you&apos;d like to share this
																	artist&apos;s profile.
																</DialogDescription>
															</DialogHeader>

															{/* Share via Web Share API if supported */}
															<Button
																onClick={() => {
																	const shareData = {
																		title: `${user.fullName}'s Profile`,
																		text: "Check out this artist profile!",
																		url:
																			typeof window !== "undefined"
																				? window.location.href
																				: "",
																	};

																	if (navigator.share) {
																		navigator
																			.share(shareData)
																			.catch((err) =>
																				console.error("Share failed:", err)
																			);
																	} else {
																		toast.error(
																			"Sharing is not supported on this device."
																		);
																	}
																}}
																className="w-full cursor-pointer rounded-full bg-[linear-gradient(135deg,#834C3D_0%,#a8664f_55%,#d38d67_100%)] text-white shadow-[0_8px_20px_rgba(131,76,61,0.22)] transition-all duration-200 hover:-translate-y-0.5 text-sm sm:text-base"
															>
																Share via Apps
															</Button>

															{/* Copy Link Option */}
															<Button
																variant="outline"
																onClick={() => {
																	const profileUrl =
																		typeof window !== "undefined"
																			? window.location.href
																			: "";
																	navigator.clipboard.writeText(profileUrl);
																	toast.success("Profile link copied!");
																}}
																className="w-full mt-2 cursor-pointer text-sm sm:text-base"
															>
																Copy Link
															</Button>
														</DialogContent>
													</Dialog>
												) : (
													<Button
														variant="outline"
														className="w-full sm:w-auto cursor-pointer rounded-full border border-[#834C3D] text-[#834C3D] hover:bg-[#fff7f2] px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base font-medium transition-all duration-200 hover:-translate-y-0.5"
													>
														Message
													</Button>
												)}
											</div>

											{/* Story Section */}
											{user.story && (
												<div className="pt-4 border-t border-[#f0ddd0]">
													<h3 className="text-base font-bold text-[#2e1f14] mb-2">
														Story of the Artist
													</h3>
													<p className="text-sm text-[#5e3c2f] leading-relaxed">
														{user.story}
													</p>
												</div>
											)}
										</div>
									</CardContent>
								</Card>
							</div>

							{/* Stats and Social */}
							<div className="space-y-4 sm:space-y-6">
								<Card className="bg-white border border-[#e8d5c4]/60 shadow-sm">
									<CardContent className="p-4 sm:p-6">
										{/* Stats */}
										<div className="flex justify-center gap-6 sm:gap-8 pb-4 mb-4 border-b border-[#f0ddd0]">
											<button onClick={() => setOpen("follower")} className="text-center group cursor-pointer">
												<div className="text-xl font-bold text-[#2e1f14] group-hover:text-[#834C3D] transition-colors">
													{followers}
												</div>
												<div className="text-xs text-[#9a8578] mt-0.5">Supporters</div>
											</button>
											<button onClick={() => setOpen("following")} className="text-center group cursor-pointer">
												<div className="text-xl font-bold text-[#2e1f14] group-hover:text-[#834C3D] transition-colors">
													{user.totalFollowing || 0}
												</div>
												<div className="text-xs text-[#9a8578] mt-0.5">Supporting</div>
											</button>
											<div className="text-center">
												<div className="text-xl font-bold text-[#2e1f14]">
													{user.posts || 0}
												</div>
												<div className="text-xs text-[#9a8578] mt-0.5">Posts</div>
											</div>
										</div>

										{/* Social Links */}
										{user?.socialLinks && (
											<div className="flex justify-center gap-4 pb-4 mb-4 border-b border-[#f0ddd0]">
												{Object.entries(user.socialLinks).map(([platform, url], index) => (
													<a key={index} href={url} className="text-[#9a8578] hover:text-[#834C3D] transition-colors" aria-label={platform} target="_blank" rel="noopener noreferrer">
														{getIcon(platform)}
													</a>
												))}
											</div>
										)}

										{/* Forte */}
										<div className="mb-5">
											<h3 className="text-sm font-bold text-center text-[#2e1f14] mb-3">
												Forte
											</h3>
											<div className="flex flex-wrap justify-center gap-1.5">
												{user.preferences?.map((forte, index) => (
													<span
														key={index}
														className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-full border border-[#834C3D]/25 bg-[#f5e2d8] px-2.5 py-1 text-xs font-semibold text-[#834C3D] transition-all duration-200 hover:border-[#834C3D]/50 hover:bg-[#f0d5c4] hover:shadow-[0_2px_8px_rgba(131,76,61,0.15)] cursor-default select-none"
													>
														<span className="[&>svg]:h-3 [&>svg]:w-3">{FORTE_ICON_MAP[forte] ?? <Star className="h-3 w-3" />}</span>
														{forte}
													</span>
												))}
											</div>
										</div>

										{/* Portfolio Button */}
										<div className="flex flex-col items-center gap-2 mt-4 pt-4 border-t border-[#f0ddd0]">
											{user.preferences && user.preferences.length > 0 && (
												<Link href={`/portfolio/${user?.username}`}>
													<Button className="cursor-pointer rounded-full border border-[#8f5b42]/10 bg-[linear-gradient(135deg,#834C3D_0%,#a8664f_55%,#d38d67_100%)] px-8 py-2 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(131,76,61,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(131,76,61,0.32)]">
														View Portfolio
													</Button>
												</Link>
											)}
											{!user.preferences ||
												(user.preferences.length == 0 && (
													<Button
														onClick={() =>
															router.replace(
																`/auth/forte?next=${encodeURIComponent(
																	pathname
																)}`
															)
														}
														className="w-full sm:w-auto cursor-pointer rounded-full border border-[#8f5b42]/10 bg-[linear-gradient(135deg,#834C3D_0%,#a8664f_55%,#d38d67_100%)] px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base lg:text-lg font-semibold text-white shadow-[0_8px_20px_rgba(131,76,61,0.22)] transition-all duration-200 hover:-translate-y-0.5"
													>
														Edit Forte
													</Button>
												))}
										</div>
									</CardContent>
								</Card>
							</div>
						</div>
					</div>
				</Card>

				{isImageOpen && !isSame && (
					<div
						className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center"
						onClick={() => setIsImageOpen(false)}
					>
						<div
							className="relative p-4 rounded-xl shadow-xl"
							onClick={(e) => e.stopPropagation()}
						>
							<img
								src={user.profilePicture}
								alt={user.fullName}
								className="w-80 h-80 object-cover rounded-full"
							/>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default ArtistProfile;
