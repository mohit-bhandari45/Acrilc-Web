"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="font-epilogue border border-b-2">
      <div className="flex justify-between items-center px-4 md:px-10 py-3 h-16 md:h-[10vh]">
        {/* Logo Section */}
        <div className="logo flex justify-center items-center cursor-pointer">
          <Image
            width={50}
            height={50}
            src="/assets/image.png"
            alt="MainLogo"
            className="md:w-[60px] md:h-[60px]"
          />
          <div className="relative left-[-13]">
            <span className="text-4xl font-bold">c</span>
            <span className="text-4xl font-bold">r</span>
            <span className="text-4xl font-bold">i</span>
            <span className="text-4xl font-bold">l</span>
            <span className="text-4xl font-bold">c</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-center items-center gap-10 font-semibold relative">
          <div onClick={()=>{
            router.push("/explore")
          }} className="relative group cursor-pointer">
            Explore
            <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
              Find Out Artists
            </span>
          </div>
          <div className="relative group cursor-pointer">
            Create
            <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
              Create Your Content
            </span>
          </div>
          <div className="relative group cursor-pointer">
            Sell
            <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
              Sell Your Art
            </span>
          </div>
          <div className="relative group cursor-pointer">
            Discover
            <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
              Discover new Art
            </span>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Menu - Slide from right */}
      <div
        className={`fixed top-16 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col py-4 px-6 font-semibold">
          <div className="py-3 cursor-pointer hover:text-gray-600 border-b">
            Explore
          </div>
          <div className="py-3 cursor-pointer hover:text-gray-600 border-b">
            Create
          </div>
          <div className="py-3 cursor-pointer hover:text-gray-600 border-b">
            Sell
          </div>
          <div className="py-3 cursor-pointer hover:text-gray-600">
            Discover
          </div>
        </div>
      </div>

      {/* Overlay when menu is open */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 z-40 md:hidden"
          onClick={toggleMenu}
        ></div>
      )}
    </div>
  );
};

export default Navbar;
