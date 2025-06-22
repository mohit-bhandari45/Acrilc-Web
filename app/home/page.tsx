"use client";

import FeaturedArtists from '@/components/homepagecomps/artists';
import LatestArtworks from '@/components/homepagecomps/artworks';
import Blog from '@/components/homepagecomps/blog';
import Footer from '@/components/homepagecomps/footer';
import FeaturedMarketplace from '@/components/homepagecomps/marketplace';
import Navbar from '@/components/homepagecomps/navbar';
import MainLoader from '@/components/universalcomps/mainloader';
import useCurrentUser from '@/hooks/useCurrentUser';
import React, { useEffect, useState } from 'react'

const HomePage = () => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setToken(token);
    }, []);

    const { currentUser, loading } = useCurrentUser({ token });

    if (loading) {
        return <MainLoader msg="Loading, please wait" />;
    }

    return (
        <div className="min-h-screen">
            <div className="hidden md:block">
                <Navbar user={currentUser} />
            </div>

            <FeaturedArtists />
            <LatestArtworks />
            <FeaturedMarketplace />
            <Blog />
            <Footer />
        </div>
    )
}

export default HomePage;