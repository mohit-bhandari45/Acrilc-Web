"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const images: string[] = [
  "/assets/homepageassets/heroimage1.png",
  "/assets/homepageassets/heroimage2.jpg",
  "/assets/homepageassets/heroimage3.jpg",
  "/assets/homepageassets/heroimage4.jpg",
  "/assets/homepageassets/heroimage5.jpg",
  "/assets/homepageassets/heroimage6.jpg",
  "/assets/homepageassets/heroimage7.jpg",
  "/assets/homepageassets/heroimage8.jpg",
];

function FadingHeroImages() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full flex justify-center items-center overflow-hidden">
      {/* Overlay for contrast */}
      <div className="absolute bg-black z-10 w-[90%] h-[80%] sm:w-[90%] lg:w-[85%] opacity-70 rounded-2xl"></div>
      
      {/* Images */}
      {images.map((src, idx) => (
        <div 
          key={idx}
          className={`absolute w-[90%] h-[80%] sm:w-[90%] lg:w-[85%] max-w-screen-xl max-h-[800px] transition-opacity duration-700 rounded-2xl overflow-hidden z-0 ${
            idx === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src}
            fill
            sizes="(max-width: 640px) 95vw, (max-width: 768px) 90vw, (max-width: 1024px) 85vw, 85vw"
            alt={`Hero Image ${idx + 1}`}
            className="object-cover rounded-2xl"
            priority={idx === 0}
            aria-hidden={idx !== index}
          />
        </div>
      ))}
    </div>
  );
}

const HeroSection = () => {
  return (
    <div className="h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] flex justify-center items-center relative">
      {/* Images */}
      <FadingHeroImages />

      {/* Text */}
      <div className="absolute z-30 flex flex-col justify-center items-center gap-3 sm:gap-4 md:gap-5 px-4 sm:px-6 md:px-8 text-center">
        <div className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-3 drop-shadow-md">
          <div className="font-bold">Acrilc:</div>
          <div>Empowering Global Creativity</div>
        </div>

        <div className="text-white text-base sm:text-lg md:text-xl lg:text-2xl drop-shadow-md max-w-md md:max-w-lg lg:max-w-xl">
          Create, Sell and Connect with Art Lovers Worldwide
        </div>
        
        <Link href={"/auth/signup"}>
          <Button
            className="text-white text-sm sm:text-base md:text-lg lg:text-xl px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full bg-[#FAA21B] hover:bg-[#fa921b] font-semibold cursor-pointer mt-2 sm:mt-4"
            aria-label="Discover Art"
          >
            Discover Art
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;