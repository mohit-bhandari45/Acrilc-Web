"use client";

import api, { GET_FEATURED_POSTS } from "@/apis/api";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { IPost, IUser } from "@/types/types";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";

interface GalleryProps {
	user: IUser;
	title?: string;
	subtitle?: string;
	itemsPerPage?: number;
}

const Gallery: React.FC<GalleryProps> = ({
	user,
	title = "Gallery",
	subtitle = "A curated selection of works.",
	itemsPerPage = 6,
}) => {
	const [activeFilter, setActiveFilter] = useState("All");
	const [visibleItems, setVisibleItems] = useState(itemsPerPage);
	const [selectedItem, setSelectedItem] = useState<IPost | null>(null);
	const [posts, setPosts] = useState<IPost[] | null>(null);

	useEffect(() => {
		const getPosts = async () => {
			const res = await api.get(`${GET_FEATURED_POSTS}/${user._id}/featured-posts`);
			if (res.status === 200) setPosts(res.data.data);
		};
		getPosts();
	}, [user._id]);

	const filteredItems = useMemo(() => {
		if (!posts) return null;
		return activeFilter === "All" ? posts : posts.filter(p => p.forte === activeFilter);
	}, [activeFilter, posts]);

	if (!filteredItems || !user) return null;
	if (posts !== null && posts.length === 0) return null;

	const displayed = filteredItems.slice(0, visibleItems);
	const hasMore = visibleItems < filteredItems.length;

	const filters = ["All", ...(user.preferences || [])];

	return (
		<section id="gallery" className="py-24 px-6 lg:px-16 bg-gray-50">
			<div className="max-w-6xl mx-auto">

				{/* Header */}
				<div className="text-center mb-16">
					<p className="text-xs tracking-[0.3em] uppercase text-gray-400 font-medium mb-4">Works</p>
					<h2 className="font-serif text-4xl lg:text-5xl font-normal text-gray-900 mb-5">{title}</h2>
					<p className="text-gray-500 text-base lg:text-lg max-w-xl mx-auto leading-relaxed">{subtitle}</p>
				</div>

				{/* Filters */}
				{filters.length > 1 && (
					<div className="flex flex-wrap justify-center gap-2 mb-14">
						{filters.map(f => (
							<button
								key={f}
								onClick={() => { setActiveFilter(f); setVisibleItems(itemsPerPage); }}
								className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer border
									${activeFilter === f
										? "bg-black text-white border-black"
										: "bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:text-gray-900"
									}`}
							>
								{f}
							</button>
						))}
					</div>
				)}

				{/* Grid */}
				{displayed.length > 0 ? (
					<div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5 mb-12">
						{displayed.map(item => (
							<div
								key={item._id}
								className="break-inside-avoid cursor-pointer group"
								onClick={() => setSelectedItem(item)}
							>
								<div className="relative overflow-hidden rounded-xl bg-gray-100 shadow-sm hover:shadow-xl transition-all duration-400">
									<Image
										src={item.media[0].url}
										alt={item.title}
										width={400}
										height={500}
										className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
										sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
										<div>
											<p className="text-white/70 text-xs font-medium uppercase tracking-wider mb-1">{item.forte}</p>
											<h3 className="text-white font-serif text-lg">{item.title}</h3>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				) : (
					<div className="text-center py-20">
						<p className="text-gray-400 text-base">No works in &quot;{activeFilter}&quot; yet.</p>
					</div>
				)}

				{/* Load More */}
				{hasMore && (
					<div className="text-center">
						<button
							onClick={() => setVisibleItems(v => v + itemsPerPage)}
							className="px-8 py-3 border border-gray-300 text-gray-700 text-sm font-medium rounded-full hover:bg-black hover:text-white hover:border-black transition-all duration-300 cursor-pointer"
						>
							Load More
						</button>
					</div>
				)}
			</div>

			{/* Detail Modal */}
			<Dialog open={!!selectedItem} onOpenChange={open => !open && setSelectedItem(null)}>
				<DialogContent className="sm:max-w-3xl max-h-[90vh] bg-white p-0 overflow-hidden rounded-2xl">
					<DialogHeader className="sr-only">
						<DialogTitle>{selectedItem?.title}</DialogTitle>
					</DialogHeader>
					<div className="flex flex-col sm:flex-row h-full">
						<div className="w-full sm:w-1/2 aspect-square sm:aspect-auto flex-shrink-0 bg-gray-100">
							{selectedItem?.media?.[0]?.url && (
								<Image
									src={selectedItem.media[0].url}
									alt={selectedItem.title}
									width={600}
									height={600}
									className="w-full h-full object-cover"
								/>
							)}
						</div>
						<div className="w-full sm:w-1/2 p-7 flex flex-col justify-center">
							{selectedItem?.forte && (
								<p className="text-xs tracking-[0.2em] uppercase text-gray-400 font-medium mb-3">{selectedItem.forte}</p>
							)}
							<h3 className="font-serif text-2xl text-gray-900 mb-4">{selectedItem?.title}</h3>
							{selectedItem?.story && (
								<p className="text-gray-600 text-sm leading-relaxed">{selectedItem.story}</p>
							)}
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</section>
	);
};

export default Gallery;
