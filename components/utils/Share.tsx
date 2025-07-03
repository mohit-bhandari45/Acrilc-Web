"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Share } from "lucide-react";
import { Button } from "../ui/button";
import { IUser } from "@/types/types";
import toast from "react-hot-toast";

const ShareOption = ({ user }: { user: IUser }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full flex items-center justify-start gap-3 py-2 hover:bg-gray-50 transition-colors text-left text-sm">
          <Share size={16} className="text-purple-600" />
          <span>Share</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="mx-4 sm:mx-0 w-[calc(100vw-2rem)] sm:w-full max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">
            Share Your Profile
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Choose how you&apos;d like to share this artist&apos;s profile.
          </DialogDescription>
        </DialogHeader>

        {/* Share via Web Share API if supported */}
        <Button
          onClick={() => {
            console.log("Button clicked!");
            const shareData = {
              title: `${user.fullName}'s Post`,
              text: "Check out this artist post!",
              url: typeof window !== "undefined" ? window.location.href : "",
            };

            if (navigator.share) {
              console.log(typeof navigator.share);
              navigator
                .share(shareData)
                .catch((err) => console.error("Share failed:", err));
            } else {
              toast.error("Sharing is not supported on this device.");
            }
          }}
          className="w-full bg-black hover:bg-black cursor-pointer text-white rounded-lg transition-all duration-200 text-sm sm:text-base"
        >
          Share via Apps
        </Button>

        {/* Copy Link Option */}
        <Button
          variant="outline"
          onClick={() => {
            const profileUrl =
              typeof window !== "undefined" ? window.location.href : "";
            navigator.clipboard.writeText(profileUrl);
            toast.success("Profile link copied!");
          }}
          className="w-full mt-2 cursor-pointer text-sm sm:text-base"
        >
          Copy Link
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ShareOption;
