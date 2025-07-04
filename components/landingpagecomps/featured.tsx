"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { IPost } from "@/types/types";
import api, { GET_FEATURED_ARTWORKS } from "@/apis/api";
import { useRouter } from "next/navigation";
import { HashLoader } from "react-spinners";

interface FeaturedArtworksProps {
	className?: string;
}

export default function FeaturedArtworks({ className }: FeaturedArtworksProps) {
	const router = useRouter();
	const [selectedFilter, setSelectedFilter] = useState("Newest");
	const filters = ["Trending", "Newest", "Curated by AI"];

	const [artworks, setArtworks] = useState<IPost[] | null>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const pushToArray = (arr: Record<string, IPost[]>) => {
			const array = [];
			for (const key in arr) {
				if (arr.hasOwnProperty(key)) {
					const value = arr[key][0];
					if (!value?.author) continue;
					array.push(value);
				}
			}
			return array;
		};
		const getFeaturedArtworks = async () => {
			setLoading(true);
			try {
				const { data } = await api.get(GET_FEATURED_ARTWORKS);
				const result = pushToArray(data.data);
				setArtworks(result);
			} catch (error) {
				console.log(error);
				setArtworks([])
			} finally {
				setLoading(false);
			}
		};
		getFeaturedArtworks();
	}, []);

	if (loading) {
		return (
			<div className="h-32 w-full flex justify-center items-center">
				<HashLoader size={20} />
			</div>
		)
	}

	return (
		<section
			id="gallery"
			className={cn("py-16 bg-[#F7F7F8]", className)}
		>
			<div className="container mx-auto max-w-6xl px-4">
				<h2
					className="text-center text-3xl md:text-4xl font-['Cormorant_Garamond',serif] font-semibold text-[#2C3E50] mb-2 transition-colors duration-300 hover:text-[#E2725B] cursor-pointer"
				>
					Featured Artworks
				</h2>
				<div className="text-center text-[#666] text-lg mb-9">
					Discover unique pieces from our global community of artisans.
				</div>

				{/* Filters */}
				<div className="flex justify-center gap-2 mb-10">
					{filters.map((filter) => (
						<button
							key={filter}
							className={cn(
								"artwork-filter-btn bg-white border-[1.5px] border-[#ECECEC] text-[#222] font-medium text-base py-2 px-4 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-200",
								selectedFilter === filter
									? "bg-[#E2725B] text-white border-[#E2725B] font-semibold shadow-[0_2px_12px_rgba(226,114,91,0.1)]"
									: "hover:bg-[#F5E6D3] hover:text-[#E2725B] hover:border-[#E2725B]"
							)}
							onClick={() => setSelectedFilter(filter)}
						>
							{filter}
						</button>
					))}
				</div>
			</div>

			<div className="relative">
				<div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent" />
				<div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent" />

				<div
					id="artworkGalleryScroll"
					className="flex gap-8 overflow-x-auto snap-x snap-mandatory px-[calc((100vw-320px)/2)] pb-4 scrollbar-thin scrollbar-thumb-[#E2725B] scrollbar-track-transparent"
				>
					{artworks?.map((art, idx) => (
						<div
							key={`${art.title}-${idx}`}
							className="snap-start w-[380px] flex-none bg-white rounded-2xl border border-[#ECECEC] shadow-[0_2px_12px_rgba(34,34,34,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(212,165,165,0.15)] hover:border-[#D4A5A5] focus:outline-none focus:ring-2 focus:ring-[#E2725B] cursor-pointer"
						>
							<div className="h-52 rounded-t-2xl bg-[#DEDEDE] flex items-center justify-center overflow-hidden">
								<img
									src={art.thumbnail}
									alt={art.title}
									width={320}
									height={160}
									className="h-full w-full object-cover"
									loading="lazy"
								/>
							</div>

							<div className="p-5 flex flex-col">
								<h3 className="font-semibold text-xl text-gray-800 mb-2 group-hover:text-primary transition-colors">
									{art.title}
								</h3>

								<div className="flex justify-between items-center mb-4">
									<span className="text-sm text-gray-500 hover:text-primary transition-colors">
										{art.author.fullName}
									</span>
									<span className="text-xs font-semibold text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
										{art.forte}
									</span>
								</div>

								<p className="mt-4 text-sm text-gray-600 flex-grow">
									{art.story.length > 80
										? `${art.story.slice(0, 80)}…`
										: art.story}
								</p>

								<div className="flex mt-4 justify-evenly items-center gap-4">
									<button onClick={() => router.push(`/content/${art._id}`)} className="w-full py-1 text-md bg-gray-700 text-white border rounded-full">
										View Artwork
									</button>
									<button onClick={() => router.push(`/profile/${art.author.username}`)} className="w-full py-1 text-md text-gray-700 bg-white border rounded-full">
										Contact Artist
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

		</section>
	);
}