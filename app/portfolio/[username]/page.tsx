"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAppSelector } from "@/store/hooks";

import ArtistAbout from "@/components/portfolio/about";
import Gallery from "@/components/portfolio/gallery";
import { ShopSection } from "@/components/portfolio/marketplace";
import ContactSection from "@/components/portfolio/contact";
import Footer from "@/components/portfolio/footer";
import Navbar from "@/components/profilecomps/navbar";
import MainLoader from "@/components/universalcomps/mainloader";
import useUserByUsername from "@/hooks/useUserByUsername";
import { FooterActions } from "@/components/portfolio/footeractionc";

const Portfolio = () => {
	const { username } = useParams() as { username: string };

	// the user whose portfolio we're viewing
	const {
		user: viewedUser,
		loading: loadingViewedUser,
	} = useUserByUsername({ username });

	// the currently logged-in user (or null)
	const {
		user: currentUser,
		loading: loadingCurrentUser,
	} = useAppSelector((state) => state.userReducer);

	// are they looking at their own page?
	const [isSameUser, setIsSameUser] = useState(false);
	useEffect(() => {
		setIsSameUser(
			!!currentUser && viewedUser?.username === currentUser.username
		);
	}, [currentUser, viewedUser]);

	// loading / error states
	if (loadingViewedUser || loadingCurrentUser) {
		return <MainLoader msg="Loading, please wait" />;
	}
	if (!viewedUser) {
		return <div>Please try again by refreshing the page!</div>;
	}

	return (
		<>
			{currentUser && (
				<Navbar currentUser={currentUser} show portfolio />
			)}
			<div className="mt-15">
				<ArtistAbout user={viewedUser} isSame={isSameUser} />
				<Gallery user={viewedUser} />
				<ShopSection user={viewedUser} />
				{!isSameUser && <ContactSection />}
				<FooterActions user={viewedUser} isSame={isSameUser} />
				{currentUser && <Footer />}
			</div>
		</>
	);
};

export default Portfolio;
