import Link from "next/link";
import React from "react";

const SubFooter = () => {
  return (
    <div className="h-[40vh] flex justify-center items-center flex-col gap-5">
      <div className="heading text-4xl font-bold">
        Join the Artisan&apos;s Gallery Community
      </div>
      <div className="button">
        <Link href={"/auth/signup"}>
          {" "}
          <button className="bg-[#FAA21B] cursor-pointer px-7 py-3 rounded-4xl text-lg font-semibold text-white">
            Create Your Profile
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SubFooter;
