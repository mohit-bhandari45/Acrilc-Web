import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const SubFooter = () => {
  return (
    <div className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-8 md:px-12 
                   flex justify-center items-center flex-col gap-4 sm:gap-5 md:gap-6 
                   text-center">
      <div className="heading text-2xl sm:text-3xl md:text-4xl font-bold max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl">
        Join the Artisan&apos;s Gallery Community
      </div>
      <div className="button mt-2 sm:mt-3 md:mt-4">
        <Link href={"/auth/signup"}>
          <Button className="text-white rounded-full bg-[#FAA21B] hover:bg-[#fa921b] 
                           font-semibold cursor-pointer
                           text-sm sm:text-base md:text-lg lg:text-xl
                           px-5 sm:px-6 md:px-7 lg:px-8
                           py-4 sm:py-5 md:py-6 lg:py-7">
            Create Your Profile
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SubFooter;