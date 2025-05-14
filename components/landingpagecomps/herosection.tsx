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
    <div className="heroimage absolute w-full h-full flex justify-center items-center overflow-hidden">
      <div className="absolute bg-black z-10 w-[85%] h-[80%] opacity-70 rounded-2xl"></div>
      <div className="absolute inset-0 z-0" /> {/* Overlay for text readability */}
      {images.map((src, idx) => (
        <Image
          key={idx}
          src={src}
          width={1200}
          height={1200}
          alt={`Hero Image ${idx + 1}`}
          className={`transition-opacity duration-700 absolute rounded-2xl object-cover w-[95%] h-[70%] sm:w-[90%] sm:h-[75%] md:w-[85%] md:h-[78%] lg:w-[85%] lg:h-auto ${
            idx === index ? "opacity-100" : "opacity-0"
          }`}
          style={{ maxWidth: "100%", maxHeight: "80%" }} // Preserve original desktop styling
          priority={idx === 0}
          aria-hidden={idx !== index}
        />
      ))}
    </div>
  );
}

const HeroSection = () => {
  return (
    <div className="h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] flex justify-center items-center relative">
      <FadingHeroImages />

      {/* Text */}
      <div className="text relative flex flex-col justify-center items-center gap-3 sm:gap-4 md:gap-5 z-10 px-4 text-center">
        <div className="heading text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-3 drop-shadow-md">
          <div className="tag font-bold">Acrilc:</div>
          <div className="rest">Empowering Global Creativity</div>
        </div>

        <div className="subheading text-white text-base sm:text-lg md:text-xl lg:text-2xl drop-shadow-md">
          Create, Sell and Connect with Art Lovers Worldwide
        </div>
        <Link href={"/auth/signup"}>
          <Button
            className="button text-white text-sm sm:text-base md:text-lg lg:text-xl px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-6 rounded-full bg-[#FAA21B] hover:bg-[#fa921b] font-semibold cursor-pointer"
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