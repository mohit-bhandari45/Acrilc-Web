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
  console.log(isSame);
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-15 p-4 rounded-lg w-full">
      {/* Avatar */}
      <Avatar className="relative h-80 w-[520px] rounded-4xl border-2 border-gray-200 overflow-hidden">
        <Image
          src={user.profilePicture!}
          alt={user.fullName}
          fill
          className="object-cover"
        />
      </Avatar>

      {/* User Info */}
      <div className="text-center md:text-left">
        <h2 className="text-5xl font-extrabold">
          {user.fullName.split(" ")[0]}{" "}
          <span className="text-gray-600 font-extralight">{user.fullName.split(" ")[1]}</span>
        </h2>
        {/* <p className="text-gray-500 mb-2">{user.location}</p> */}
        <p className="text-gray-500 mb-4 mt-2 text-2xl">{user.username}</p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 justify-center items-center mt-10">
          <Button className="bg-orange-400 py-8 w-52 text-lg hover:bg-orange-500 cursor-pointer text-white flex items-center gap-2">
            Request Services <ChevronDown className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="border-orange-400 py-8 w-52 text-lg text-orange-400 cursor-pointer hover:bg-orange-50 flex items-center gap-2"
          >
            Message <MessageSquare className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
