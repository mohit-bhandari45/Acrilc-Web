"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { NewArtWork, newArtworks } from "./data";
import Link from "next/link";

// interface Artwork {
//   title: string;
//   artist: string;
//   price: string;
//   category: string;
//   desc: string;
//   svg: string;
// }

interface FeaturedArtworksProps {
  className?: string;
}

export default function FeaturedArtworks({ className }: FeaturedArtworksProps) {
  const [selectedFilter, setSelectedFilter] = useState("Newest");
  const [selectedArtwork, setSelectedArtwork] = useState<NewArtWork | null>(null);

  const filters = ["Trending", "Newest", "Curated by AI"];

  // Duplicate artworks for seamless loop
  // const displayedArtworks = [...artworks, ...artworks];
  const displayedArtworks = newArtworks;

  const openModal = (artwork: NewArtWork) => {
    setSelectedArtwork(artwork);
  };

  const closeModal = () => {
    setSelectedArtwork(null);
  };

  return (
    <section
      id="gallery"
      className={cn("py-16 bg-[#F7F7F8]", className)}
    >
      <div className="container mx-auto max-w-6xl px-4">
        <h2
          className="text-center text-3xl md:text-4xl font-['Cormorant_Garamond',serif] font-semibold text-[#2C3E50] mb-2 transition-colors duration-300 hover:text-[#E2725B] cursor-pointer"
        >
          Featured Artworks
        </h2>
        <div className="text-center text-[#666] text-lg mb-9">
          Discover unique pieces from our global community of artisans.
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-2 mb-10">
          {filters.map((filter) => (
            <button
              key={filter}
              className={cn(
                "artwork-filter-btn bg-white border-[1.5px] border-[#ECECEC] text-[#222] font-medium text-base py-2 px-4 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-200",
                selectedFilter === filter
                  ? "bg-[#E2725B] text-white border-[#E2725B] font-semibold shadow-[0_2px_12px_rgba(226,114,91,0.1)]"
                  : "hover:bg-[#F5E6D3] hover:text-[#E2725B] hover:border-[#E2725B]"
              )}
              onClick={() => setSelectedFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        {/* Left scroll hint */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent" />
        {/* Right scroll hint */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent" />

        <div
          id="artworkGalleryScroll"
          className="flex gap-8 overflow-x-auto snap-x snap-mandatory px-[calc((100vw-320px)/2)] pb-4 scrollbar-thin scrollbar-thumb-[#E2725B] scrollbar-track-transparent"
        >
          {displayedArtworks.map((art, idx) => (
            <div
              key={`${art.title}-${idx}`}
              onClick={() => openModal(art)}
              className="snap-start w-[320px] flex-none bg-white rounded-2xl border border-[#ECECEC] shadow-[0_2px_12px_rgba(34,34,34,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(212,165,165,0.15)] hover:border-[#D4A5A5] focus:outline-none focus:ring-2 focus:ring-[#E2725B] cursor-pointer"
            >
              <div className="h-40 rounded-t-2xl bg-[#DEDEDE] flex items-center justify-center overflow-hidden">
                <img
                  src={art.image}
                  alt={art.title}
                  width={320}
                  height={160}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="p-4 flex flex-col h-[calc(100%-160px)]">
                <h3 className="artwork-title font-['Cormorant_Garamond'] font-semibold text-lg text-[#222] mb-1">
                  {art.title}
                </h3>

                <div className="artwork-artist text-[#666] text-sm mb-2">
                  by{' '}
                  <Link
                    href={art.artistLink}
                    target="_blank"
                    className="hover:underline"
                    rel="noopener noreferrer"
                  >
                    {art.artist}
                  </Link>
                </div>

                <div className="mt-auto flex justify-between items-end">
                  <span className="artwork-price font-bold text-lg text-[#222]">
                    ₹ {art.price}
                  </span>
                  <span className="artwork-category text-sm text-[#B0B0B0]">
                    {art.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedArtwork && (
        <div
          className="fixed inset-0 bg-[rgba(34,34,34,0.85)] z-[2000] flex items-center justify-center animate-fadeIn"
          onClick={e => e.target === e.currentTarget && closeModal()}
        >
          <div className="bg-white rounded-xl max-w-[540px] w-[95vw] shadow-lg flex flex-col animate-popIn">
            <div className="h-60 w-full bg-[#E5E5E5] overflow-hidden rounded-t-xl">
              <img
                src={selectedArtwork.image}
                alt={selectedArtwork.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="p-6 flex flex-col">
              <h2 className="font-['Cormorant_Garamond'] text-xl font-bold mb-1">
                {selectedArtwork.title}
              </h2>
              <p className="text-[#444] text-base mb-2">
                by {selectedArtwork.artist}
              </p>

              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-bold">₹ {selectedArtwork.price}</span>
                <span className="text-sm text-[#888]">{selectedArtwork.category}</span>
              </div>

              <p className="text-[#444] text-base mb-6">
                {selectedArtwork.desc}
              </p>

              <div className="flex gap-4 justify-center">
                <Link
                  href={selectedArtwork.link}
                  target="_blank"
                  className="bg-[#2C3E50] text-white border border-[#2C3E50] py-2 px-6 rounded-full hover:bg-[#4A4A4A]"
                >
                  Purchase
                </Link>
                <button
                  onClick={closeModal}
                  className="border border-[#2C3E50] text-[#2C3E50] py-2 px-6 rounded-full hover:bg-[#2C3E50] hover:text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}