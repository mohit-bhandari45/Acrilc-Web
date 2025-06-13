'use client';

import Image from 'next/image';
import React from 'react';

const RelevantPosts = () => {
  return (
    <div className="mt-6 space-y-6">
      <h2 className="text-lg font-semibold">Relevant Posts</h2>

      {/* Post 1 */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <Image
            src="/assets/avatar1.png"
            alt="Lidia Roberts"
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <div>
            <p className="font-medium">Lidia Roberts</p>
            <p className="text-sm text-gray-500">1d</p>
          </div>
        </div>
        <p className="text-sm text-gray-700">
          Just listed a few new pieces on my website, check them out!
        </p>

        {/* Image grid */}
        <div className="grid grid-cols-2 gap-2">
          <Image
            src="/assets/port2.png"
            alt="Artwork 1"
            width={400}
            height={400}
            className="w-full h-[180px] object-cover rounded-lg col-span-2"
          />
          <Image
            src="/assets/port3.png"
            alt="Artwork 2"
            width={200}
            height={200}
            className="w-full h-[120px] object-cover rounded-lg"
          />
          <Image
            src="/assets/port4.png"
            alt="Artwork 3"
            width={200}
            height={200}
            className="w-full h-[120px] object-cover rounded-lg"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-around mt-2 text-sm">
          <span className="bg-cream px-3 py-1 rounded-full">Applauds</span>
          <span className="bg-cream px-3 py-1 rounded-full">Comment</span>
          <span className="bg-cream px-3 py-1 rounded-full">Appreciate</span>
        </div>
      </div>

      {/* Post 2 */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <Image
            src="/assets/avatar8.png"
            alt="Owen Chu"
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <div>
            <p className="font-medium">Owen Chu</p>
            <p className="text-sm text-gray-500">1d</p>
          </div>
        </div>
        <p className="text-sm text-gray-700">Having the best time in Vegas</p>
        <Image
          src="/assets/drink.png"
          alt="Vegas Drink"
          width={400}
          height={600}
          className="w-full h-[200px] object-cover rounded-lg"
        />
        <div className="flex justify-around mt-2 text-sm">
          <span className="bg-cream px-3 py-1 rounded-full">Applauds</span>
          <span className="bg-cream px-3 py-1 rounded-full">Comment</span>
          <span className="bg-cream px-3 py-1 rounded-full">Appreciate</span>
        </div>
      </div>
    </div>
  );
};

export default RelevantPosts;
