"use client";

import FeaturedArtists from '@/components/homepagecomps/artists';
import LatestArtworks from '@/components/homepagecomps/artworks';
import Blog from '@/components/homepagecomps/blog';
import FeaturedMarketplace from '@/components/homepagecomps/marketplace';
import HomePageMobileNavBar from '@/components/homepagecomps/mobilenav';
import Navbar from '@/components/homepagecomps/navbar';
import Footer from '@/components/landingpagecomps/footer';
import MainLoader from '@/components/universalcomps/mainloader';
import { useAppSelector } from '@/store/hooks';
// import { IUser } from '@/types/types';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const HomePage = () => {
    const router = useRouter();
    const { user, loading } = useAppSelector(state => state.userReducer);

    useEffect(() => {
        if (!user && !loading) {
            router.back();
        }
    }, [user, loading, router]);

    if (loading) {
        return <MainLoader msg="Loading, please wait" />;
    }

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen">
            <div className="hidden md:block">
                <Navbar user={user} />
            </div>

            <HomePageMobileNavBar user={user} />
            <FeaturedArtists />
            <LatestArtworks />
            <FeaturedMarketplace />
            <Blog />
            <Footer />
        </div>
    )
}

export default HomePage;