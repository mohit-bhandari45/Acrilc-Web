"use client";

import FeaturedArtists from '@/components/homepagecomps/artists';
import LatestArtworks from '@/components/homepagecomps/artworks';
import Blog from '@/components/homepagecomps/blog';
import Footer from '@/components/homepagecomps/footer';
import FeaturedMarketplace from '@/components/homepagecomps/marketplace';
import HomePageMobileNavBar from '@/components/homepagecomps/mobilenav';
import Navbar from '@/components/homepagecomps/navbar';
import MainLoader from '@/components/universalcomps/mainloader';
import { IUser } from '@/types/types';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const HomePage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<IUser | null>(null);

    const getUser = () => {
        setLoading(true);
        const localUser = (window as any).localStorage.getItem("user");
        if (localUser) {
            setUser(JSON.parse(localUser));
        }
        setLoading(false);
        return user;
    }

    useEffect(() => {
        const user = getUser();
        if (!user && !loading) {
            router.back();
        }
    }, [loading, router]);

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