import React from "react";
import { Card, CardContent } from "../ui/card";
import { IUser } from "@/types/types";
import Image from "next/image";
import { Badge } from "../ui/badge";

const ArtistInfo = ({ user, forte }: { user: IUser; forte: string }) => {
  if (!user.profilePicture) {
    return;
  }

  return (
    <Card className="mb-6 w-full max-w-md border-none shadow-none bg-transparent">
      <CardContent className="p-0">
        <div className="flex items-center space-x-4">
          <div className="relative w-25 h-25">
            <Image
              src={user.profilePicture}
              alt={user.fullName}
              fill
              className="rounded-full border-4 border-white shadow-md object-cover"
            />

            {/* {user.artist.isVerified && (
              <div className="absolute bottom-0 right-0 bg-black text-white text-xs rounded-full px-2 py-0.5 font-bold border-2 border-white">
                <Check size={12} />
              </div>
            )} */}
          </div>
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-lg font-semibold text-gray-900">
                {user.fullName}
              </span>
              <Badge className="text-xs border-black">{forte}</Badge>
            </div>
            {/* <div className="text-xs text-gray-500">
              {user.artist.status}
            </div> */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArtistInfo;
