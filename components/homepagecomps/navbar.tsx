import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <div className="h-[10vh] flex justify-between items-center px-10 font-semibold border border-b-2">
      {/* Logo Section */}
      <div className="logo flex justify-center items-center">
        <Image
          width={60}
          height={60}
          src="/assets/homepageassets/mainlogo.png"
          alt="MainLogo"
        />
        <Image
          className="relative right-9"
          width={60}
          height={60}
          src="/assets/homepageassets/logorest.png"
          alt="RestLogo"
        />
      </div>

      {/* Navigation Section */}
      <div className="navigations flex justify-center items-center gap-10">
        <div>Explore</div>
        <div>Create</div>
        <div>Sell</div>
        <div>Discover</div>
      </div>
    </div>
  );
};

export default Navbar;
