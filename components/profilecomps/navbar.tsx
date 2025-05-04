"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppSelector } from '@/store/hooks';

const Navbar: React.FC = () => {
  const user = useAppSelector((state) => state.user.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="text-white border-b border-zinc-800">
      <div className="max-w-8xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left section: Menu button and logo */}
          <div className="flex items-center">
            <button 
              className="rounded-md text-black cursor-pointer focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-black ml-2">acrilc</span>
            </Link>
          </div>

          {/* Center section: Search */}
          <div className="hidden md:block flex-grow max-w-md mx-4">
            <form onSubmit={handleSearch} className="relative">
              <div className="flex items-center bg-[#EDEDED] rounded-md px-3 py-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full bg-transparent border-none outline-none text-sm text-black px-2 py-1"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          </div>

          {/* Right section: Navigation and profile */}
          <div className="flex items-center space-x-8">
            <nav className="hidden md:flex space-x-10">
              <Link href="/" className={`text-sm text-black hover:underline underline-offset-2 transition ease-in-out duration-1000`}>
                Home
              </Link>
              <Link href="/explore" className={`text-sm text-black hover:underline underline-offset-2 transition ease-in-out duration-1000`}>
                Explore
              </Link>
              <Link href="/marketplace" className={`text-sm text-black hover:underline underline-offset-2 transition ease-in-out duration-1000`}>
                Marketplace
              </Link>
              <Link href="/blogs" className={`text-sm text-black hover:underline underline-offset-2 transition ease-in-out duration-1000`}>
                Blogs
              </Link>
            </nav>
            
            <div className="flex items-center space-x-4">
              <Link href="/profile" className="bg-yellow-500 text-white font-medium text-sm rounded-full px-5 py-2">
                Profile
              </Link>
              
              <button className="text-gray-500 hover:text-black">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              
              <button className="text-gray-500 hover:text-black">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>
              
              <Link href="/profile" className="flex items-center">
                <div className="h-8 w-8 rounded-full overflow-hidden bg-[#FAA21B]">
                  <Image
                    src={user!.profilePicture!}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="object-cover"
                    onError={(e) => {
                      // Fallback for missing profile image
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/32';
                    }}
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu - Side sliding drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Side drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50 overflow-y-auto"
            >
              {/* Menu header with close button */}
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h2 className="text-lg font-bold text-black">Menu</h2>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-black hover:text-gray-700"
                  aria-label="Close menu"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Navigation links */}
              <div className="px-2 py-3 space-y-1">
                <Link 
                  href="/" 
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname === '/' 
                      ? 'bg-gray-100 text-black font-semibold' 
                      : 'text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  Home
                </Link>
                <Link 
                  href="/explore" 
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname === '/explore' 
                      ? 'bg-gray-100 text-black font-semibold' 
                      : 'text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  Explore
                </Link>
                <Link 
                  href="/marketplace" 
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname === '/marketplace' 
                      ? 'bg-gray-100 text-black font-semibold' 
                      : 'text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  Marketplace
                </Link>
                <Link 
                  href="/blogs" 
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname === '/blogs' 
                      ? 'bg-gray-100 text-black font-semibold' 
                      : 'text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  Blogs
                </Link>
              </div>
              
              {/* Mobile search */}
              <div className="px-4 py-4 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-600 mb-2">Search</h3>
                <form onSubmit={handleSearch} className="relative">
                  <div className="flex items-center bg-gray-100 rounded-md px-3 py-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search"
                      className="w-full bg-transparent border-none outline-none text-sm text-black px-2 py-1"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </form>
              </div>
              
              {/* Quick actions */}
              <div className="px-4 py-4 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-600 mb-3">Quick Actions</h3>
                <div className="space-y-3">
                  <Link href="/profile" className="flex items-center space-x-3 text-gray-800 hover:text-black">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>Profile</span>
                  </Link>
                  <Link href="/notifications" className="flex items-center space-x-3 text-gray-800 hover:text-black">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <span>Notifications</span>
                  </Link>
                  <Link href="/messages" className="flex items-center space-x-3 text-gray-800 hover:text-black">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>Messages</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;