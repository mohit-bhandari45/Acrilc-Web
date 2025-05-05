import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Image from "next/image";

interface ICardData {
  imageURL: string;
  name: string;
  bio: string;
}

const cardData: ICardData[] = [
  {
    imageURL: "/assets/homepageassets/cardimage1.png",
    name: "Lucas Harrison",
    bio: "Contemporary painter known for vibrant abstracts",
  },
  {
    imageURL: "/assets/homepageassets/cardimage1.png",
    name: "Sophie Moreau",
    bio: "Sculptor specializing in ceramic figures",
  },
  {
    imageURL: "/assets/homepageassets/cardimage1.png",
    name: "Ethan Taylor",
    bio: "Landscape artist with a focus on light and color",
  },
  {
    imageURL: "/assets/homepageassets/cardimage1.png",
    name: "Ethan Taylor",
    bio: "Landscape artist with a focus on light and color",
  },
  {
    imageURL: "/assets/homepageassets/cardimage1.png",
    name: "Ethan Taylor",
    bio: "Landscape artist with a focus on light and color",
  },
  {
    imageURL: "/assets/homepageassets/cardimage1.png",
    name: "Ethan Taylor",
    bio: "Landscape artist with a focus on light and color",
  },
  {
    imageURL: "/assets/homepageassets/cardimage1.png",
    name: "Ethan Taylor",
    bio: "Landscape artist with a focus on light and color",
  },
  {
    imageURL: "/assets/homepageassets/cardimage1.png",
    name: "Ethan Taylor",
    bio: "Landscape artist with a focus on light and color",
  },
];

const IndividualCards = ({
  image,
  name,
  bio,
}: {
  image: string;
  name: string;
  bio: string;
}) => {
  return (
    <div className="flex flex-col">
      <div className="relative w-full aspect-square overflow-hidden">
        <Image
          src={image}
          alt={`${name}'s artwork`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>
      <div className="name pt-2 font-semibold text-base sm:text-lg">{name}</div>
      <div className="bio text-gray-700 text-sm sm:text-base line-clamp-2">
        {bio}
      </div>
    </div>
  );
};

const FeatCarousel = () => {
  return (
    <div className="w-full py-2">
      <Carousel className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40">
        <CarouselContent className="-ml-2 md:-ml-4">
          {cardData.map((d, idx) => {
            return (
              <CarouselItem 
                key={idx} 
                className="pl-2 md:pl-4 cursor-pointer basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <IndividualCards image={d.imageURL} name={d.name} bio={d.bio} />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default FeatCarousel;