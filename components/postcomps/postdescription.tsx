"use client";

import api, { DELETE_POST } from "@/apis/api";
import { IPost, IUser } from "@/types/types";
import {
	ChevronLeft,
	ChevronRight,
	Edit2,
	Heart,
	MessageCircle,
	MoreVertical,
	Share,
	ThumbsUp,
	Trash2,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { SkeletonPost } from "../utils/Skeleton";

const PostDescription = ({
	post,
	user,
}: {
	post: IPost | null;
	user: IUser;
}) => {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [menuOpen, setMenuOpen] = useState(false);
	const router = useRouter();
	const menuRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setMenuOpen(false);
			}
		};

		if (menuOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [menuOpen]);

	const toggleMenu = () => setMenuOpen(!menuOpen);

	const prevImage = () => {
		if (post) {
			setCurrentImageIndex((prev) =>
				prev === 0 ? post.media.length - 1 : prev - 1
			);
		}
	};

	const nextImage = () => {
		if (post) {
			setCurrentImageIndex((prev) =>
				prev === post.media.length - 1 ? 0 : prev + 1
			);
		}
	};

	const handlerDelete = async () => {
		try {
			const res = await api.delete(`${DELETE_POST}/${post?._id}`);

			if (res.status === 200) {
				router.push(`/profile/${user.username}`);
				toast.success("Post Deleted Successfully");
			}
		} catch (error) {
			console.log(error);
		}
	};

	if (!post) {
		return <SkeletonPost />
	}

	return (
		<div className="mt-20">
			<div className="max-w-7xl mx-auto px-4 py-8">
				{/* Main container with shadow */}
				<div className="bg-white rounded-lg shadow-lg overflow-hidden">
					<div className="flex flex-col lg:flex-row">
						{/* Left side - Image */}
						<div className="lg:w-1/2 relative">
							<div className="relative bg-stone-300">
								{post.media.length > 0 && (
									<div className="relative bg-[]">
										<Image
											src={post.media[currentImageIndex].url}
											alt={post.title}
											width={800}
											height={600}
											className="w-full h-auto object-contain"
											style={{ maxHeight: "600px" }}
										/>
									</div>
								)}

								{post.media.length > 1 && (
									<>
										{/* Navigation arrows */}
										<button
											onClick={prevImage}
											className="absolute left-2 top-1/2 cursor-pointer -translate-y-1/2 bg-white/50 p-2 rounded-full hover:bg-white/70 transition"
										>
											<ChevronLeft size={24} />
										</button>
										<button
											onClick={nextImage}
											className="absolute right-2 top-1/2 cursor-pointer -translate-y-1/2 bg-white/50 p-2 rounded-full hover:bg-white/70 transition"
										>
											<ChevronRight size={24} />
										</button>

										{/* Dots indicator */}
										<div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
											{post.media.map((_, index) => (
												<button
													key={index}
													onClick={() => setCurrentImageIndex(index)}
													className={`w-2 h-2 rounded-full ${index === currentImageIndex
															? "bg-white"
															: "bg-white/50"
														}`}
												/>
											))}
										</div>
									</>
								)}
							</div>
						</div>

						{/* Right side - Content */}
						<div className="lg:w-1/2 p-8 relative">
							{/* Dropdown menu (top right of content area) */}
							{user._id === post.author._id && (
								<div className="absolute top-4 right-4 z-20">
									<button
										onClick={toggleMenu}
										className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
									>
										<MoreVertical size={20} className="text-gray-700" />
									</button>

									{menuOpen && (
										<div
											ref={menuRef}
											className="absolute cursor-pointer transition duration-500 ease-in-out right-0 mt-2 w-32 bg-white rounded-md shadow-lg py-1 text-sm z-30"
										>
											<Button
												className="w-full flex cursor-pointer items-center justify-start gap-2 px-4 py-2 hover:bg-gray-100"
												onClick={() => {
													router.push(`/content/edit/${post._id}?type=post`);
												}}
											>
												<Edit2 size={16} /> Edit
											</Button>
											<Button
												className="w-full flex cursor-pointer items-center justify-start gap-2 px-4 py-2 text-red-600 hover:bg-gray-100"
												onClick={handlerDelete}
											>
												<Trash2 size={16} /> Delete
											</Button>

											{/* Share Function */}
											<Dialog>
												<DialogTrigger asChild>
													<Button className="w-full flex cursor-pointer items-center justify-start gap-2 px-4 py-2 text-blue-500 hover:bg-gray-100">
														<Share size={16} /> Share
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
																text: "Check out this artist Post!",
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
														className="w-full z-60 bg-black hover:bg-black cursor-pointer text-white rounded-lg transition-all duration-200 text-sm sm:text-base"
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
										</div>
									)}
								</div>
							)}

							{/* Content */}
							<div className="space-y-4 pr-12">
								<h1 className="text-3xl font-bold">{post.title}</h1>
								<p className="text-lg text-gray-700">{post.subtitle}</p>
								<p className="text-lg text-gray-700">{post.size}</p>

								<div className="flex flex-wrap items-center gap-2">
									{post.hashTags[0].split(" ").map((tag, index) => (
										<div
											key={index}
											className="break-words bg-[#FAA21B] text-white text-sm px-3 py-1 rounded-lg"
										>
											{tag}
										</div>
									))}
								</div>

								<div className="py-2">
									<h2 className="text-xl font-semibold">Story of the Art</h2>
									<p className="mt-2 text-gray-700">{post.story}</p>
								</div>

								{/* Action buttons */}
								<div className="flex justify-between items-center pt-4 border-t border-gray-200">
									<button className="flex items-center px-4 py-2 hover:bg-gray-100 rounded-md">
										<ThumbsUp className="mr-2" size={20} />
										<span>Applauds</span>
									</button>

									<button className="flex items-center px-4 py-2 hover:bg-gray-100 rounded-md">
										<MessageCircle className="mr-2" size={20} />
										<span>Comment</span>
									</button>

									<button className="flex items-center px-4 py-2 hover:bg-gray-100 rounded-md">
										<Heart className="mr-2" size={20} />
										<span>Appreciate</span>
									</button>
								</div>

								{/* Marketplace button */}
								{user._id === post.author._id && (
									<button className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-medium rounded-md mt-4">
										Move to Marketplace
									</button>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PostDescription;
