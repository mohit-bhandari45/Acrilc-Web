"use client";

import api, { GET_FEATURED_ARTISTS } from "@/apis/api";
import { IUser } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const getInitials = (name: string) =>
	name
		.trim()
		.split(/\s+/)
		.filter(Boolean)
		.slice(0, 2)
		.map((n) => n[0].toUpperCase())
		.join("") || "?";

const FeaturedArtists = ({ user }: { user: IUser }) => {
	const router = useRouter();
	const [artists, setArtists] = useState<IUser[] | null>(null);
	const [loading, setLoading] = useState(true);

	async function getFeaturedArtists() {
		const { data } = await api.get(GET_FEATURED_ARTISTS);
		const filteredArtists = data.data.filter(
			(artist: IUser) => artist._id !== user._id
		);
		setArtists(filteredArtists);
		setLoading(false);
	};

	useEffect(() => {
		getFeaturedArtists();
	}, [user._id]);

	return (
		<section id="artists" className="py-16 px-8 max-w-7xl mx-auto">
			<h2 className="text-[2.5rem] font-bold text-center mb-12 text-[#3d2b1f]">
				Featured Artists
			</h2>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
				{loading
					? [1, 2, 3, 4, 5, 6].map((_, idx) => (
						<div
							key={idx}
							className="rounded-[20px] border border-[#ead7c9]/60 bg-white shadow-md overflow-hidden animate-pulse"
						>
							<div className="h-52 bg-[#f0ddd0]/60" />
							<div className="p-5">
								<div className="flex items-center gap-3 mb-3">
									<div className="h-10 w-10 rounded-full bg-[#f0ddd0]/80 flex-shrink-0" />
									<div className="h-5 w-1/3 rounded-full bg-[#f0ddd0]/80" />
								</div>
								<div className="h-4 w-1/4 rounded-full bg-[#f0ddd0]/80 mb-2" />
								<div className="h-4 w-2/5 rounded-full bg-[#f0ddd0]/60" />
							</div>
						</div>
					))
					: artists?.slice(0, 9).map((a, idx) => (
						<div
							key={idx}
							onClick={() => router.push(`/profile/${a.username}`)}
							className="group rounded-[20px] border border-[#ead7c9]/60 bg-white cursor-pointer shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(89,59,43,0.16)]"
						>
							{/* Banner */}
							<div className="h-52 overflow-hidden">
								{a.bannerPicture ? (
									<img
										src={a.bannerPicture}
										alt={a.fullName}
										className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
									/>
								) : (
									<div className="relative flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#c9956b_0%,#dba97e_45%,#efc9a8_100%)] overflow-hidden">
										<div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10" />
										<div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-white/10" />
										<span className="relative z-10 font-playfair text-[5rem] font-bold leading-none text-white/25 select-none">
											{a.fullName?.[0]?.toUpperCase() ?? "A"}
										</span>
									</div>
								)}
							</div>

							{/* Card body */}
							<div className="p-5">
								<div className="flex items-center gap-3 mb-3">
									{/* Avatar */}
									<div className="relative h-11 w-11 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-[#ead7c9] shadow-sm">
										{a.profilePicture ? (
											<img
												src={a.profilePicture}
												alt={a.fullName}
												className="h-full w-full object-cover"
											/>
										) : (
											<div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#834C3D_0%,#a8664f_55%,#d38d67_100%)] select-none">
												<span className="text-xs font-bold text-white">
													{getInitials(a.fullName || "")}
												</span>
											</div>
										)}
									</div>

									<h3 className="text-base font-bold text-[#2e1f14] leading-tight">
										{a.fullName}
									</h3>
								</div>

								{a.preferences?.[0] && (
									<span className="inline-flex items-center rounded-full bg-[#f5e6dc] px-2.5 py-0.5 text-xs font-semibold text-[#834C3D] mb-2">
										{a.preferences[0]}
									</span>
								)}

								<p className="flex items-center gap-1 text-sm text-[#8a7060]">
									<svg className="h-3.5 w-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
										<path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
										<circle cx="12" cy="10" r="3" />
									</svg>
									{a.location || "India"}
								</p>
							</div>
						</div>
					))}
			</div>
		</section>
	);
};

export default FeaturedArtists;
