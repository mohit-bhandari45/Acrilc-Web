"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAppSelector } from "@/store/hooks";

import Navbar from "@/components/profilecomps/navbar";
import MainLoader from "@/components/universalcomps/mainloader";
import ArtistProfile from "@/components/profilecomps/profile";
import GallerySection from "@/components/profilecomps/gallery";

import useUserByUsername from "@/hooks/useUserByUsername";

export default function Profile() {
	const { username } = useParams() as { username: string };

	// fetch the profile we're viewing
	const { user: profileUser, loading: loadingProfile } =
		useUserByUsername({ username });

	// get the currently authenticated user from redux
	const { user: currentUser, loading: loadingCurrent } = useAppSelector(
		(state) => state.userReducer
	);

	// determine if it's the same user
	const [isSameUser, setIsSameUser] = useState(false);
	useEffect(() => {
		setIsSameUser(
			!!currentUser && profileUser?.username === currentUser.username
		);
	}, [currentUser, profileUser]);

	// show loader while either is loading
	if (loadingProfile || loadingCurrent) {
		return <MainLoader msg="Loading, please wait" />;
	}

	// handle "no such user" error
	if (!profileUser) {
		return <div>User not found. Please refresh and try again.</div>;
	}

	// pick which user object to display
	const displayedUser = isSameUser ? currentUser! : profileUser;

	return (
		<div className="font-[Helvetica]">
			<Navbar currentUser={currentUser!} show portfolio={false} />
			<ArtistProfile user={displayedUser} isSame={isSameUser} />
			<GallerySection user={displayedUser} isSame={isSameUser} />
		</div>
	);
}
