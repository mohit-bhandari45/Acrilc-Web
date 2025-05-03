import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const SubFooter = () => {
  return (
    <div className="h-[40vh] flex justify-center items-center flex-col gap-5">
      <div className="heading text-4xl font-bold">
        Join the Artisan&apos;s Gallery Community
      </div>
      <div className="button">
        <Link href={"/auth/signup"}>
          {" "}
          <Button className="button text-white text-xl px-8 py-7 rounded-full bg-[#FAA21B] hover:bg-[#fa921b] font-semibold cursor-pointer">
            Create Your Profile
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SubFooter;
