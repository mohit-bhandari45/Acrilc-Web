"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

const images = [
  "https://i.ibb.co/vCYWQwG4/image-from-rawpixel-id-3844930-jpeg-1.jpg",
  "https://i.ibb.co/zMPg37m/image-from-rawpixel-id-3846747-jpeg.jpg",
  "https://i.ibb.co/991Wcvtg/image-from-rawpixel-id-3848242-jpeg.jpg",
];

// "https://i.ibb.co/996T3pps/image-from-rawpixel-id-3848275-jpeg.jpg",
// "https://i.ibb.co/2Yh1D3Yj/image-from-rawpixel-id-3848169-jpeg-1.jpg",

const Left = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 7000); // Changed to 7 seconds to match original
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Add the zoom animation keyframes to the document head */}
      <style jsx>{`
        @keyframes zoom-bg {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.08);
          }
        }
        .zoom-bg-animation {
          animation: zoom-bg 10s ease-in-out infinite alternate;
        }
      `}</style>
      
      <div className="relative w-full h-[425px] min-h-[250px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-screen lg:w-[50%] bg-gray-50 overflow-hidden">
        {/* Slideshow background */}
        <div className="absolute top-0 left-0 w-full h-full z-[1]">
          {images.map((url, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out zoom-bg-animation ${
                activeIndex === i ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
              style={{
                backgroundImage: `url('${url}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
          ))}
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

        {/* Logo in top-left corner */}
        <Link
          href="/"
          className="absolute text-white top-10 left-10 z-20 font-bold text-3xl transition-all duration-300 ease-out no-underline font-poppins"
        >
          acrilc
        </Link>

        {/* Centered Image Content */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
          <div className="text-white text-3xl sm:text-4xl font-semibold mb-2">
            Bring Your Art to the World
          </div>
          <div className="text-white text-sm sm:text-lg">
            Where creativity meets opportunity
          </div>
        </div>

        {/* Branding text - visible only on mobile */}
        <div className="lg:hidden absolute bottom-4 left-4 text-white z-10">
          <h1 className="text-xl sm:text-2xl font-bold">Acrilc</h1>
          <p className="text-xs sm:text-sm">where artists grow</p>
        </div>
      </div>
    </>
  );
};

export default Left;