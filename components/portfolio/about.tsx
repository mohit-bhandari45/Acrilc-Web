"use client";

import { IUser } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import React from "react";

interface ArtistAboutProps {
	user: IUser;
	isSame: boolean;
}

const ArtistAbout: React.FC<ArtistAboutProps> = ({ user, isSame }) => {
	const initials = user.fullName?.trim().split(/\s+/).filter(Boolean).slice(0, 2).map(n => n[0].toUpperCase()).join("") || "A";

	const scrollToContact = () => {
		document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<section id="about" className="min-h-screen flex items-center bg-white py-24 px-6 lg:px-16">
			<div className="max-w-6xl mx-auto w-full">
				<div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24 items-center">

					{/* Left — Text */}
					<div className="lg:col-span-3 order-2 lg:order-1">
						<p className="text-xs tracking-[0.3em] uppercase text-gray-400 font-medium mb-6">Portfolio</p>

						<h1 className="font-serif text-5xl lg:text-6xl font-normal text-gray-900 leading-tight mb-6">
							{user.fullName}
						</h1>

						{user.location && (
							<div className="flex items-center gap-1.5 text-gray-500 mb-8">
								<MapPin className="h-4 w-4 flex-shrink-0" />
								<span className="text-base">{user.location}</span>
							</div>
						)}

						{/* Forte pills */}
						{user.preferences && user.preferences.length > 0 && (
							<div className="flex flex-wrap gap-2 mb-8">
								{user.preferences.map((tag, i) => (
									<span key={i} className="px-3 py-1 rounded-full border border-gray-200 text-xs font-medium text-gray-600 bg-gray-50">
										{tag}
									</span>
								))}
							</div>
						)}

						{user.bio && (
							<p className="text-gray-600 text-base lg:text-lg leading-relaxed mb-5">
								{user.bio}
							</p>
						)}

						{user.story && (
							<p className="text-gray-500 text-sm lg:text-base leading-relaxed mb-10 border-l-2 border-gray-100 pl-4">
								{user.story}
							</p>
						)}

						<div className="flex flex-wrap gap-3">
							<Link href={`/profile/${user.username}`}>
								<button className="px-7 py-3 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors duration-300 cursor-pointer">
									{isSame ? "← Back to Profile" : "View Profile →"}
								</button>
							</Link>
							{!isSame && (
								<button
									onClick={scrollToContact}
									className="px-7 py-3 border border-gray-300 text-gray-700 text-sm font-medium rounded-full hover:border-black hover:text-black transition-all duration-300 cursor-pointer"
								>
									Get in Touch
								</button>
							)}
						</div>
					</div>

					{/* Right — Photo */}
					<div className="lg:col-span-2 order-1 lg:order-2 flex justify-center lg:justify-end">
						<div className="w-64 h-80 lg:w-72 lg:h-96 rounded-2xl overflow-hidden shadow-2xl shadow-black/10 flex-shrink-0">
							{user.profilePicture ? (
								<Image
									src={user.profilePicture}
									alt={user.fullName}
									width={320}
									height={420}
									className="w-full h-full object-cover"
									priority
								/>
							) : (
								<div className="w-full h-full bg-gray-900 flex items-center justify-center">
									<span className="font-serif text-7xl text-white/20 select-none">{initials}</span>
								</div>
							)}
						</div>
					</div>

				</div>
			</div>
		</section>
	);
};

export default ArtistAbout;
