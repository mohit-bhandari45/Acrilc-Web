"use client";

import ArtistInfo from "@/components/marketplacecomps/artistinfo";
import MarketRight from "@/components/marketplacecomps/marketright";
import TabsSection from "@/components/marketplacecomps/tabs";
import Navbar from "@/components/profilecomps/navbar";
import MainLoader from "@/components/universalcomps/mainloader";
import useCurrentUser from "@/hooks/useCurrentUser";
import { IMarketplace } from "@/types/marketplace";
import { AxiosError } from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { handleGetSingleProject } from "../marketutils";

type ApiError = {
  msg: string;
};

const MarketContent = () => {
  const [token, setToken] = useState<string | null>(null);
  const [project, setProject] = useState<IMarketplace | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  const { currentUser, loading } = useCurrentUser({ token });
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [, setMousePosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);
  const magnifierRef = useRef<HTMLDivElement>(null);

  /* Get Marketplace data */
  useEffect(() => {
    handleGetSingleProject(id as string).then((res) => {
      const { data, error } = res;

      if (error) {
        const e = error as unknown as AxiosError<ApiError>;
        toast.error(e.response?.data.msg || "Something went wrong");
      } else {
        setProject(data);
      }
    });
  }, [id]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || !magnifierRef.current || !project) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Store mouse position
    setMousePosition({ x, y });

    const magnifier = magnifierRef.current;
    const magnifierSize = 150;
    const zoomLevel = 2; // 2x zoom

    // Keep magnifier within bounds
    const maxX = rect.width - magnifierSize;
    const maxY = rect.height - magnifierSize;
    
    const magnifierX = Math.max(0, Math.min(x - magnifierSize / 2, maxX));
    const magnifierY = Math.max(0, Math.min(y - magnifierSize / 2, maxY));

    // Position the magnifier
    magnifier.style.left = `${magnifierX}px`;
    magnifier.style.top = `${magnifierY}px`;

    // Calculate the background position for zoom effect
    // The background should show the area under the cursor, magnified
    const backgroundX = -((x * zoomLevel) - (magnifierSize / 2));
    const backgroundY = -((y * zoomLevel) - (magnifierSize / 2));

    magnifier.style.backgroundPosition = `${backgroundX}px ${backgroundY}px`;
    magnifier.style.backgroundSize = `${rect.width * zoomLevel}px ${rect.height * zoomLevel}px`;
  };

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
    setMousePosition({ x: 0, y: 0 });
  };

  if (!currentUser || loading || !project) {
    return <MainLoader />;
  }

  return (
    <>
      <Navbar currentUser={currentUser} show={true} portfolio={false} />
      <main className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 px-4 mt-32 mb-10">
        {/* Left: Artwork Image and Artist Info */}
        <div className="flex-1 flex flex-col items-start">
          {/* Artist Info */}
          <ArtistInfo user={currentUser} forte={project.forte} />

          {/* Artwork Image with Magnifier */}
          <div className="relative w-full max-w-md mb-10 group">
            <div
              ref={imageRef}
              className="relative overflow-hidden rounded-2xl shadow-xl cursor-zoom-in"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
            >
              <Image
                src={project.image}
                alt={project.title}
                width={600}
                height={400}
                className="w-full object-cover transition-transform duration-300 select-none"
                draggable={false}
              />
              
              {/* Magnifier */}
              {isZoomed && (
                <div
                  ref={magnifierRef}
                  className="absolute z-50 border-4 border-white shadow-lg rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{
                    width: "150px",
                    height: "150px",
                    backgroundImage: `url(${project.image})`,
                    backgroundRepeat: "no-repeat",
                    boxShadow: "0 0 20px rgba(0,0,0,0.3)",
                  }}
                />
              )}
            </div>
            
            {/* Optional: Add a small indicator showing zoom is available */}
            <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              🔍 Hover to zoom
            </div>
          </div>

          {/* Tabs */}
          <TabsSection data={project} />
        </div>

        {/* Right: Product Details */}
        <MarketRight data={project} />
      </main>
    </>
  );
};

export default MarketContent;