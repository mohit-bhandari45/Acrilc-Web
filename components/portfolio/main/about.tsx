"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IUser } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ArtistAboutProps {
  user: IUser;
  isSame: boolean;
}

const ArtistAbout: React.FC<ArtistAboutProps> = ({ user, isSame }) => {
  const handleContactClick = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center py-20 px-10 bg-white"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-20">
          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Artist Name with Star */}
            <div className="relative mb-4">
              <h1 className="text-4xl lg:text-5xl font-normal font-serif mb-0 flex items-center justify-center lg:justify-start gap-2">
                {user.fullName}
                {/* {artist.isVerified && (
                  <Star
                    className="w-7 h-7 text-gray-800 fill-current"
                    title="Acrilc Verified"
                  />
                )} */}
              </h1>
            </div>

            {/* Verified Badge and Location */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8">
              {/* {user.isVerified && (
                <Badge
                  variant="secondary"
                  className="bg-amber-50 text-amber-700 hover:bg-amber-100 px-4 py-1 text-sm font-medium rounded-2xl"
                >
                  Acrilc Verified
                </Badge>
              )} */}
              <p className="text-gray-500 text-lg font-normal">
                {user.location}
              </p>
            </div>

            {/* Bio */}
            <div className="space-y-6 mb-8">{user.bio}</div>
            <div className="space-y-6 mb-8">{user.story}</div>

            {/* Tags */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-10">
              {user.preferences &&
                user.preferences.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-gray-50 text-gray-600 hover:bg-gray-100 px-4 py-2 text-sm rounded-full border-gray-200"
                  >
                    {tag}
                  </Badge>
                ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href={`/profile/${user.username}`}>
                <Button className="bg-black cursor-pointer hover:bg-gray-800 text-white px-6 py-3 rounded-full font-medium transition-colors duration-300">
                  {isSame ? "Back to Profile →" : "View Profile →"}
                </Button>
              </Link>
              {!isSame && (
                <Button
                  variant="outline"
                  onClick={handleContactClick}
                  className="border-gray-300 hover:bg-black hover:text-white px-6 py-3 rounded-full font-medium transition-all duration-300"
                >
                  Contact Me
                </Button>
              )}
            </div>
          </div>

          {/* Artist Photo */}
          <div className="relative">
            <div className="w-80 h-96 lg:w-72 lg:h-96 rounded-3xl overflow-hidden shadow-2xl shadow-black/10">
              {user.profilePicture ? (
                <Image
                  src={user.profilePicture}
                  alt={`${user.fullName} - Artist Photo`}
                  width={300}
                  height={400}
                  className="w-full h-full object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400 text-base font-medium">
                    Artist Photo
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtistAbout;
