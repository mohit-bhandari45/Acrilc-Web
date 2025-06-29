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

export default function Profile() {
	const { username } = useParams() as { username: string };

	const { user: profileUser, loading: loadingProfile } = useUserByUsername({ username });

	const { user: currentUser, loading: loadingCurrent } = useAppSelector(
		(state) => state.userReducer
	);

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
		return <div>User not found. Please refresh and try again.</div>;
	}

	if (isSameUser && !currentUser) {
		return <MainLoader msg="Loading…" />;
	}

	const displayedUser = isSameUser ? (currentUser as IUser) : profileUser;

	return (
		<div className="font-[Helvetica]">
			{currentUser && <Navbar currentUser={currentUser} show portfolio={false} />}
			<ArtistProfile user={displayedUser} isSame={isSameUser} />
			<GallerySection user={displayedUser} isSame={isSameUser} />
		</div>
	);
}
