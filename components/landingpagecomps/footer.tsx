import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="h-[10vh] sm:h-[25vh] flex flex-col justify-center items-center px-4 sm:px-6 md:px-10 gap-4 sm:gap-5 bg-white">
      <div className="flex flex-row sm:flex-row justify-center items-center gap-10 md:gap-12 font-medium text-sm sm:text-base">
        <Link href={"/about"}>
          <div className="hover:text-gray-600 cursor-pointer transition-colors">
            About
          </div>
        </Link>
        <Link href={"/contact"}>
          <div className="hover:text-gray-600 cursor-pointer transition-colors">
            Contact
          </div>
        </Link>
        <Link href={"/privacy"}>
          <div className="hover:text-gray-600 cursor-pointer transition-colors">
            Privacy
          </div>
        </Link>
        <Link href={"/terms"}>
          <div className="hover:text-gray-600 cursor-pointer transition-colors">
            Terms
          </div>
        </Link>
      </div>
      <div className="text-sm sm:text-base text-gray-600">
        © 2025 Acrilc. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
