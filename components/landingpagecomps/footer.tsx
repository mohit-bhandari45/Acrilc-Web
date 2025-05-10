import React from "react";

const Footer = () => {
  return (
    <footer className="h-[10vh] sm:h-[25vh] flex flex-col justify-center items-center px-4 sm:px-6 md:px-10 gap-4 sm:gap-5 bg-white">
      <div className="flex flex-row sm:flex-row justify-center items-center gap-10 md:gap-12 font-medium text-sm sm:text-base">
        <div className="hover:text-gray-600 cursor-pointer transition-colors">
          About
        </div>
        <div className="hover:text-gray-600 cursor-pointer transition-colors">
          Contact
        </div>
        <div className="hover:text-gray-600 cursor-pointer transition-colors">
          Privacy
        </div>
        <div className="hover:text-gray-600 cursor-pointer transition-colors">
          Terms
        </div>
      </div>
      <div className="text-sm sm:text-base text-gray-600">
        © 2025 Acrilc. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;