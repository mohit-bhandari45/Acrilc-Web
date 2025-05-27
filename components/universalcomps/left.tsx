'use client'

import React, { useEffect, useState } from 'react'

const images = [
  "https://i.ibb.co/vCYWQwG4/image-from-rawpixel-id-3844930-jpeg-1.jpg",
  "https://i.ibb.co/2Yh1D3Yj/image-from-rawpixel-id-3848169-jpeg-1.jpg",
  "https://i.ibb.co/zMPg37m/image-from-rawpixel-id-3846747-jpeg.jpg",
  "https://i.ibb.co/991Wcvtg/image-from-rawpixel-id-3848242-jpeg.jpg",
  "https://i.ibb.co/996T3pps/image-from-rawpixel-id-3848275-jpeg.jpg",
]

const Left = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-[425px] min-h-[250px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-screen lg:w-[45%] bg-gray-50 lg:rounded-r-4xl overflow-hidden">

      {/* Slideshow background */}
      <div className="absolute top-0 left-0 w-full h-full z-[1]">
        {images.map((url, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
              activeIndex === i ? 'opacity-100 z-10' : 'opacity-0 z-0'
            } animate-zoom-bg`}
            style={{
              backgroundImage: `url('${url}')`,
              backgroundSize: 'cover',          // matches object-cover
              backgroundPosition: 'center',     // matches object-position: center center
              backgroundRepeat: 'no-repeat',
            }}
          />
        ))}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

      {/* Branding text - visible only on mobile */}
      <div className="lg:hidden absolute bottom-4 left-4 text-white z-10">
        <h1 className="text-xl sm:text-2xl font-bold">Acrilc</h1>
        <p className="text-xs sm:text-sm">where artists grow</p>
      </div>
    </div>
  )
}

export default Left
