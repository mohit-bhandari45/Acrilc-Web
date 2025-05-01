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
    <div>
      <Image
        width={280}
        height={280}
        src={image}
        alt="Image1"
      />
      <div className="name pt-2 font-semibold text-lg">{name}</div>
      <div className="bio text-gray-700">
        {bio}
      </div>
    </div>
  );
};

const FeatCarousel = () => {
  return (
    <Carousel className="px-40 h-[50vh] flex justify-center items-center">
      <CarouselContent className="flex h-full">
        {cardData.map((d, idx) => {
          return (
            <CarouselItem key={idx} className="basis-1/4 cursor-pointer">
              <IndividualCards image={d.imageURL} name={d.name} bio={d.bio} />
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
};

export default FeatCarousel;
