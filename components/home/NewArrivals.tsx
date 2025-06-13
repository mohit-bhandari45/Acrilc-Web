'use client';

import Image from 'next/image';
import React from 'react';

const arrivals = [
  { src: '/assets/temple1.png', alt: 'Arrival 1' },
  { src: '/assets/temple2.png', alt: 'Arrival 2' },
  { src: '/assets/temple3.png', alt: 'Arrival 3' },
  { src: '/assets/temple4.png', alt: 'Arrival 4' },
];

const NewArrivals = () => {
  return (
    <div className="mt-10 space-y-4">
      <h2 className="text-2xl font-bold">New Arrivals</h2>
      <p className="text-sm text-gray-600">
        Explore a collection of new arrivals that are the perfect blend of modern and classic design.
      </p>

      <button className="bg-terracotta text-white font-medium py-2 px-4 rounded-lg text-sm">
        Explore New Arrivals
      </button>

      {/* Image Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {arrivals.map((item, index) => (
          <div key={index} className="rounded-md overflow-hidden">
            <Image
              src={item.src}
              alt={item.alt}
              width={300}
              height={200}
              className="w-full h-[130px] object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewArrivals;
