import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Image from "next/image";
import { IUser } from "@/types/types";
import { HashLoader } from "react-spinners";

const IndividualCards = ({
  image,
  name,
  bio,
}: {
  image: string;
  name: string;
  bio: string;
}) => {
  console.log(image, name, bio);
  return (
    <div className="flex flex-col">
      <div className="relative w-full aspect-square overflow-hidden rounded-4xl">
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

const FeatCarousel = ({ users }: { users: IUser[] | null }) => {
  if (!users) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <HashLoader color="#FAA21B" size={10} />
      </div>
    );
  }

  return (
    <div className="w-full py-2">
      <Carousel className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40">
        <CarouselContent className="-ml-2 md:-ml-4">
          {users.map((d, idx) => {
            return (
              <CarouselItem
                key={idx}
                className="pl-2 md:pl-4 cursor-pointer basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <IndividualCards
                  image={d.profilePicture as string}
                  name={d.fullName}
                  bio={d.bio as string}
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default FeatCarousel;
