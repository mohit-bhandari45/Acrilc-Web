"use client";

import api, { GET_FEATURED_POSTS } from "@/apis/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { IPost, IUser } from "@/types/types";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";

interface GalleryProps {
	title?: string;
	subtitle?: string;
	items?: IPost[];
	categories?: string[];
	itemsPerPage?: number;
	user: IUser;
}

const Gallery: React.FC<GalleryProps> = ({
	user,
	title = "Gallery",
	subtitle = "A curated collection of my ceramic works, exploring form, function, and the beauty of handmade objects.",
	itemsPerPage = 6,
}) => {
	const [activeFilter, setActiveFilter] = useState<string>("All");
	const [visibleItems, setVisibleItems] = useState<number>(itemsPerPage);
	const [selectedItem, setSelectedItem] = useState<IPost | null>(null);
	const [posts, setPosts] = useState<IPost[] | null>(null);

	useEffect(() => {
		const getPosts = async () => {
			const res = await api.get(`${GET_FEATURED_POSTS}/${user._id}/featured-posts`);

			if (res.status === 200) {
				setPosts(res.data.data);
			}
		};

		getPosts();
	}, [user._id]);

	const filteredItems = useMemo(() => {
		if (!posts) return null;
		if (activeFilter === "All") {
			return posts;
		}
		return posts!.filter((item) => item.forte === activeFilter);
	}, [activeFilter, posts]);

	if (!filteredItems || !user) return null;

	const displayedItems = filteredItems!.slice(0, visibleItems);

	const handleFilterChange = (category: string) => {
		setActiveFilter(category);
		setVisibleItems(itemsPerPage);
	};

	const handleLoadMore = () => {
		setVisibleItems((prev) => prev + itemsPerPage);
	};

	const hasMoreItems = visibleItems < filteredItems!.length;

	return (
		<section id="gallery" className="min-h-screen py-20 px-6 lg:px-10 bg-white">
			<div className="max-w-6xl mx-auto">
				{/* Header */}
				<div className="text-center mb-16">
					<h2 className="text-3xl lg:text-4xl font-serif font-normal mb-5 text-gray-900">
						{title}
					</h2>
					<p className="text-gray-600 text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
						{subtitle}
					</p>
				</div>

				{/* Filter Tags */}
				<div className="flex flex-wrap justify-center gap-4 mb-16">
					{["All", ...user.preferences!].map((category) => (
						<Badge
							key={category}
							variant={activeFilter === category ? "default" : "outline"}
							className={`
								cursor-pointer px-5 py-2 text-sm font-medium rounded-full transition-all duration-300
								${activeFilter === category
									? "bg-black text-white hover:bg-gray-800"
									: "bg-gray-50 text-gray-600 hover:bg-black hover:text-white border-gray-200"
								}
							`}
							onClick={() => handleFilterChange(category)}
						>
							{category}
						</Badge>
					))}
				</div>

				<Dialog
					open={!!selectedItem}
					onOpenChange={(isOpen) => {
						if (!isOpen) setSelectedItem(null)
					}}
				>
					<DialogContent className="sm:max-w-[70%] max-h-[90vh] bg-white rounded-lg shadow-lg overflow-auto">
						<DialogHeader>
							<DialogTitle></DialogTitle>
						</DialogHeader>
						<div className="flex flex-col sm:flex-row h-full">
							<div className="w-full sm:w-1/2 h-64 sm:h-auto flex-shrink-0">
								{selectedItem?.media?.[0]?.url ? (
									<Image
										src={selectedItem.media[0].url}
										alt={selectedItem.title}
										width={600}
										height={400}
										className="object-cover w-full h-full"
									/>
								) : (
									<div className="flex items-center justify-center bg-gray-100 w-full h-full">
										No image available
									</div>
								)}
							</div>

							<div className="w-full sm:w-1/2 p-4">
								<div className="flex justify-start mb-2">
									<Badge
										variant="outline"
										className="py-1 bg-slate-100 hover:bg-slate-200 rounded-2xl text-md"
									>
										{selectedItem?.forte}
									</Badge>
								</div>

								<h3 className="text-2xl font-serif text-gray-900">
									{selectedItem?.title}
								</h3>
								{selectedItem?.story && (
									<p className="mt-2 text-gray-600 leading-relaxed">
										{selectedItem.story}
									</p>
								)}
							</div>
						</div>
					</DialogContent>
				</Dialog>

				{/* Gallery Grid - Masonry Style */}
				<div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5 mb-12">
					{displayedItems.map((item) => (
						<div
							key={item._id}
							className="break-inside-avoid cursor-pointer group"
							onClick={() => setSelectedItem(item)}
						>
							<div className="bg-gray-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group-hover:transform group-hover:scale-[1.02]">
								<div className="relative overflow-hidden">
									<Image
										src={item.media[0].url}
										alt={item.title}
										width={300}
										height={400}
										className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
										sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
									/>
									<div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
										<div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center p-4">
											<h3 className="font-semibold text-lg mb-1">
												{item.title}
											</h3>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Load More Button */}
				{hasMoreItems && (
					<div className="text-center">
						<Button
							variant="outline"
							onClick={handleLoadMore}
							className="px-8 py-3 border-gray-300 hover:bg-black hover:text-white hover:border-black transition-all duration-300 rounded-full font-medium"
						>
							Load More
						</Button>
					</div>
				)}

				{/* No Items Message */}
				{filteredItems!.length === 0 && (
					<div className="text-center py-16">
						<p className="text-gray-500 text-lg">
							No items found in the &quot;{activeFilter}&quot; category.
						</p>
					</div>
				)}
			</div>
		</section>
	);
};

export default Gallery;
