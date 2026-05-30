"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import Navbar from "@/components/profilecomps/navbar";
import MainLoader from "@/components/universalcomps/mainloader";
import ArtistProfile from "@/components/profilecomps/profile";
import GallerySection from "@/components/profilecomps/gallery";
import useUserByUsername from "@/hooks/useUserByUsername";
import { IUser } from "@/types/types";
import Link from "next/link";

export default function Profile() {
	const { username } = useParams() as { username: string };
	const { user: currentUser, loading: loadingCurrent } = useAppSelector((state) => state.userReducer);
	const { user: profileUser, loading: loadingProfile } = useUserByUsername({ username });

	const [isSameUser, setIsSameUser] = useState(false);
	useEffect(() => {
		setIsSameUser(
			!!currentUser && profileUser?.username === currentUser.username
		);
	}, [currentUser, profileUser]);


	if (loadingProfile || loadingCurrent) {
		return <MainLoader msg="Loading, please wait" />;
	}

	if (!profileUser) {
		return (
			<div className="relative isolate flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(226,114,91,0.14),_transparent_34%),linear-gradient(180deg,_#fbf7f2_0%,_#f2e7dc_100%)]">
				<div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#E2725B]/12 blur-3xl" />
				<div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-[#D4A373]/15 blur-3xl" />
				<div className="relative z-10 flex flex-col items-center text-center px-4">
					<span className="font-poppins text-3xl font-bold text-[#5e3c2f] mb-8">acrilc</span>
					<h1 className="font-playfair text-7xl font-bold text-[#834C3D] mb-4">404</h1>
					<p className="text-lg text-[#7d6152] mb-6">Sorry, this page does not exist.</p>
					<Link href="/" className="rounded-full border border-[#8f5b42]/10 bg-[linear-gradient(135deg,#834C3D_0%,#a8664f_55%,#d38d67_100%)] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(131,76,61,0.22)] transition hover:-translate-y-0.5">
						Go back home
					</Link>
				</div>
			</div>
		)
	}

	if (isSameUser && !currentUser) {
		return <MainLoader msg="Loading…" />;
	}

	const displayedUser = isSameUser ? (currentUser as IUser) : profileUser;

	return (
		<div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_rgba(226,114,91,0.18)_0%,_transparent_50%),linear-gradient(180deg,_#f5e8dc_0%,_#eedad0_50%,_#e5cfc0_100%)] pb-16">
			{currentUser && <Navbar currentUser={currentUser} show portfolio={false} />}
			<ArtistProfile user={displayedUser} isSame={isSameUser} />
			<GallerySection user={displayedUser} isSame={isSameUser} />
		</div>
	);
}
