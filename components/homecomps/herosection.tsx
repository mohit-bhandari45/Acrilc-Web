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
      {images.map((src, idx) => (
        <Image
          key={idx}
          src={src}
          width={1200}
          height={1200}
          alt={`HeroImage-${idx}`}
          className={`transition-opacity duration-700 absolute rounded-2xl ${
            idx === index ? "opacity-100" : "opacity-0"
          }`}
          style={{ maxWidth: "100%", maxHeight: "80%" }}
        />
      ))}
    </div>
  );
}

const HeroSection = () => {
  return (
    <div className="h-[90vh] flex justify-center items-center relative">
      <FadingHeroImages />

      {/* Text */}
      <div className="text relative flex flex-col justify-center items-center gap-5">
        <div className="heading text-white text-6xl flex justify-center items-center gap-3">
          <div className="tag font-bold">Acrilc:</div>
          <div className="rest">Empowering Global Creativity</div>
        </div>

        <div className="subheading text-white text-2xl">
          Create, Sell and Connect with Art Lovers Worlwide{" "}
        </div>
        <Link href={"/auth/signup"}>
          {" "}
          <Button className="button text-white text-xl px-8 py-7 rounded-full bg-[#FAA21B] hover:bg-[#fa921b] font-semibold cursor-pointer">
            Discover Art
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
