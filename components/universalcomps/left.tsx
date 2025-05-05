import Image from 'next/image'
import React from 'react'

const Left = () => {
  return (
    <div className="relative w-full h-[425px] min-h-[250px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-screen lg:w-[45%] bg-gray-50 lg:rounded-r-4xl overflow-hidden">
      <Image
        priority
        fill
        src="/assets/loginsignupassets/image.png"
        alt="Artistic showcase for Acrilc platform"
        className="object-cover"
        sizes="(max-width: 1023px) 100vw, 45vw"
        quality={90}
        style={{
          objectPosition: 'center center' // ensures image is centered
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

      {/* Branding text - visible only on mobile */}  
      <div className="lg:hidden absolute bottom-4 left-4 text-white">
        <h1 className="text-xl sm:text-2xl font-bold">Acrilc</h1>
        <p className="text-xs sm:text-sm">where artists grow</p>
      </div>
    </div>
  )
}

export default Left