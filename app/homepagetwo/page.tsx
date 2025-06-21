"use client";

import FeaturedArtists from '@/components/homepagetwocomps/artists';
import Navbar from '@/components/homepagetwocomps/navbar';
import MainLoader from '@/components/universalcomps/mainloader';
import useCurrentUser from '@/hooks/useCurrentUser';
import React, { useEffect, useState } from 'react'

const HomePageTwo = () => {
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
        </div>
    )
}

export default HomePageTwo;