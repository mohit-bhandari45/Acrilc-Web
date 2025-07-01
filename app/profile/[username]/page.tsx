"use client";

import { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import Navbar from "@/components/profilecomps/navbar";
import MainLoader from "@/components/universalcomps/mainloader";
import ArtistProfile from "@/components/profilecomps/profile";
import GallerySection from "@/components/profilecomps/gallery";
import useUserByUsername from "@/hooks/useUserByUsername";
import { IUser } from "@/types/types";

export default function Profile() {
	const { username } = useParams() as { username: string };

	const { user: currentUser, loading: loadingCurrent } = useAppSelector(
		(state) => state.userReducer
	);

	if (loadingCurrent || !currentUser) {
		return <MainLoader msg="Loading, please wait" />;
	}

	const isSameUser = currentUser.username === username;

	const { user: profileUser, loading: loadingProfile } = useUserByUsername({
		username,
		skip: isSameUser,
	});

	if (loadingProfile) {
		return <MainLoader msg="Loading, please wait" />;
	}

	if (!isSameUser && !profileUser) {
		notFound();
	}

	const displayedUser = (isSameUser ? currentUser : profileUser!) as IUser;

	return (
		<div className="font-[Helvetica]">
			{currentUser && <Navbar currentUser={currentUser} show portfolio={false} />}
			<ArtistProfile user={displayedUser} isSame={isSameUser} />
			<GallerySection user={displayedUser} isSame={isSameUser} />
		</div>
	);
}
