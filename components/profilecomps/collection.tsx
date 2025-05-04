'use client';

import Image from 'next/image';
import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

interface Artwork {
  id: number;
  image: string;
  title: string;
  description: string;
}

const artworks: Artwork[] = [
  {
    id: 1,
    image: "/assets/homepageassets/heroimage1.png",
    title: 'Untitled 2020',
    description: 'Acrylic on canvas, 48x60”',
  },
  {
    id: 2,
    image: "/assets/homepageassets/heroimage1.png",
    title: 'Untitled 2019',
    description: 'Acrylic on paper, 24x18”',
  },
  {
    id: 3,
    image: "/assets/homepageassets/heroimage1.png",
    title: '',
    description: 'Oil on linen, 36x36”',
  },
];

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1536 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 1536, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
  },
};

const ArtworkCarousel: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={3000}
        keyBoardControl
        showDots={false}
        arrows={true}
        containerClass="carousel-container"
        itemClass="px-4"
      >
        {artworks.map((art) => (
          <div
            key={art.id}
            className="rounded-xl overflow-hidden"
          >
            <Image
              src={art.image}
              alt={art.title || 'Artwork'}
              className="w-full h-52 object-cover rounded-xl"
            />
            <div className="mt-3 px-2 pb-4">
              {art.title && <h3 className="text-sm font-semibold">{art.title}</h3>}
              <p className="text-sm text-gray-600">{art.description}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ArtworkCarousel;
