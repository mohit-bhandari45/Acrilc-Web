"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { artworks } from "./data";

interface Artwork {
  title: string;
  artist: string;
  price: string;
  category: string;
  desc: string;
  svg: string;
}

interface FeaturedArtworksProps {
  className?: string;
}

export default function FeaturedArtworks({ className }: FeaturedArtworksProps) {
  const [selectedFilter, setSelectedFilter] = useState("Newest");
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  const filters = ["Trending", "Newest", "Curated by AI"];

  // Duplicate artworks for seamless loop
  const displayedArtworks = [...artworks, ...artworks];

  const openModal = (artwork: Artwork) => {
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

      {/* Artwork Gallery */}
      <div
        className="artwork-gallery-scroll flex gap-8 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-thin scrollbar-thumb-[#E2725B] scrollbar-track-transparent w-[95vw] left-0 relative"
        id="artworkGalleryScroll"
      >
        <div className="flex-none w-[calc(50vw-320px)]"></div> {/* Left padding */}
        {displayedArtworks.map((artwork, index) => (
          <div
            key={`${artwork.title}-${index}`}
            className="artwork-card flex-none w-[320px] bg-white rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(34,34,34,0.08)] border-[1.5px] border-[#ECECEC] snap-start transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(212,165,165,0.15)] hover:border-[#D4A5A5] cursor-pointer"
            onClick={() => index < artworks.length && openModal(artwork)}
          >
            <div className="h-40 bg-[#DEDEDE] flex items-center justify-center">
              <div dangerouslySetInnerHTML={{ __html: artwork.svg }} />
            </div>
            <div className="p-4 flex flex-col">
              <div className="artwork-title font-['Cormorant_Garamond',serif] font-semibold text-lg text-[#222] mb-1">
                {artwork.title}
              </div>
              <div className="artwork-artist text-[#666] text-sm mb-2">
                by {artwork.artist}
              </div>
              <div className="artwork-bottom-row flex justify-between items-end mt-auto">
                <div className="artwork-price font-bold text-[#222] text-lg">
                  Rs {artwork.price}
                </div>
                <div className="artwork-category text-[#B0B0B0] text-sm">
                  {artwork.category}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="flex-none w-[calc(50vw-320px)]"></div> {/* Right padding */}
      </div>

      {/* Modal */}
      {selectedArtwork && (
        <div className="artwork-modal-overlay fixed inset-0 bg-[rgba(34,34,34,0.85)] z-[2000] flex items-center justify-center animate-[fadeIn_0.2s]">
          <div className="artwork-modal bg-white rounded-xl max-w-[540px] w-[95vw] shadow-[0_8px_32px_rgba(0,0,0,0.18)] flex flex-col animate-[popIn_0.2s]">
            <div className="artwork-modal-img bg-[#E5E5E5] p-8 pb-4 flex items-center justify-center rounded-t-xl">
              <div dangerouslySetInnerHTML={{ __html: selectedArtwork.svg }} />
            </div>
            <div className="artwork-modal-content p-6 pb-2">
              <div className="artwork-modal-title font-['Cormorant_Garamond',serif] text-xl font-bold mb-1">
                {selectedArtwork.title}
              </div>
              <div className="artwork-modal-artist text-[#444] text-base mb-2">
                by {selectedArtwork.artist}
              </div>
              <div className="artwork-modal-row flex justify-between items-center mb-2">
                <div className="artwork-modal-price font-bold text-lg">
                  Rs {selectedArtwork.price}
                </div>
                <div className="artwork-modal-category text-[#888] text-sm">
                  {selectedArtwork.category}
                </div>
              </div>
              <div className="artwork-modal-desc text-[#444] text-base mb-6">
                {selectedArtwork.desc}
              </div>
              <div className="artwork-modal-buttons flex gap-4 justify-center">
                <button
                  className="artwork-modal-btn artwork-modal-btn-primary bg-[#2C3E50] text-[#FAFAF9] border-[1.5px] border-[#2C3E50] py-2 px-6 rounded-full font-medium transition-all duration-200 hover:bg-[#4A4A4A] hover:border-[#4A4A4A]"
                  onClick={() => console.log("Purchase clicked")}
                >
                  Purchase
                </button>
                <button
                  className="artwork-modal-btn artwork-modal-btn-secondary bg-transparent text-[#2C3E50] border-[1.5px] border-[#2C3E50] py-2 px-6 rounded-full font-medium transition-all duration-200 hover:bg-[#2C3E50] hover:text-[#FAFAF9]"
                  onClick={closeModal}
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