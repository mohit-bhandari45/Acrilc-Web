// app/home/page.tsx
import React from 'react';
import SearchBar from '@/components/home/SearchBar';
import Filters from '@/components/home/Filters';
import Avatars from '@/components/home/Avatars';
import FeaturedArt from '@/components/home/FeaturedArt';
import RelevantPosts from '@/components/home/RelevantPosts';
import NewArrivals from '@/components/home/NewArrivals';
import BottomNav from '@/components/home/BottomNav';
import DrawerMenu from '@/components/ui/DrawerMenu';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Top Bar */}
      <div className="flex justify-between items-center px-4 py-3 bg-gray-100">
        <h1 className="text-xl font-bold">acrilc</h1>
        <DrawerMenu />
      </div>

      <div className="p-4 space-y-6">
        <SearchBar />
        <Filters />
        <Avatars />
        <FeaturedArt />
        <RelevantPosts />
        <NewArrivals />
      </div>

      <BottomNav />
    </div>
  );
}

