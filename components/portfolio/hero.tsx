import React from "react";
import { Avatar } from "../ui/avatar";
import { IUser } from "@/store/types";
import Image from "next/image";
import { Button } from "../ui/button";
import { ChevronDown, MessageSquare } from "lucide-react";

interface HeroSectionProps {
  user: IUser;
  isSame: boolean;
}

const HeroSection = ({ user, isSame }: HeroSectionProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 p-4 w-full max-w-7xl mx-auto md:flex-row md:gap-12 lg:p-8">
      {/* Avatar */}
      <Avatar className="relative h-60 w-[75%] rounded-2xl border-2 border-gray-200 overflow-hidden md:h-64 md:w-96 lg:h-80 lg:w-[520px]">
        <Image
          src={user.profilePicture!}
          alt={user.fullName}
          fill
          className="object-cover"
        />
      </Avatar>

      {/* User Info */}
      <div className="flex flex-col items-center text-center md:items-start md:text-left">
        <h2 className="text-3xl font-extrabold sm:text-4xl md:text-5xl">
          {user.fullName.split(" ")[0]}{" "}
          <span className="text-gray-600 font-extralight">
            {user.fullName.split(" ")[1]}
          </span>
        </h2>
        <p className="text-gray-500 mt-2 text-lg sm:text-xl md:text-2xl">
          {user.username}
        </p>

        {/* Action Buttons */}
        {!isSame && (
          <div className="flex flex-col gap-4 mt-6 sm:flex-row sm:gap-3 md:mt-10">
            <Button className="bg-orange-400 py-6 w-44 text-base sm:w-48 md:w-52 md:text-lg hover:bg-orange-500 text-white flex items-center gap-2">
              Request Services <ChevronDown className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="border-orange-400 py-6 w-44 text-base sm:w-48 md:w-52 md:text-lg text-orange-400 hover:bg-orange-50 flex items-center gap-2"
            >
              Message <MessageSquare className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;