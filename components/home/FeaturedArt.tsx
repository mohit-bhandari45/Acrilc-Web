'use client';

import Image from 'next/image';
import React from 'react';

const featuredArts = [
  { id: 1, image: '/assets/art1.png', title: 'Mystic Waves' },
  { id: 2, image: '/assets/art2.png', title: 'Silent Forest' },
  // { id: 3, image: '/assets/art3.png', title: 'Dreamscape' },
  // { id: 4, image: '/assets/art4.png', title: 'Golden Horizon' },
];

const FeaturedArt = () => {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-3">Featured Art</h2>
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
        {featuredArts.map((art) => (
          <div
            key={art.id}
            className="min-w-[250px] flex-shrink-0 rounded-lg overflow-hidden shadow-md bg-white"
          >
            <Image
              src={art.image}
              alt={art.title}
              width={250}
              height={150}
              className="w-full h-[150px] object-cover"
            />
            <div className="px-3 py-2">
              <p className="text-sm font-medium truncate">{art.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedArt;
