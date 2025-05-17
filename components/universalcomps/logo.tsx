"use client";

import Assets from "@/links/links";
import Image from "next/image";
import { useEffect, useState } from "react";

const Logo = () => {
  const [mode, setMode] = useState<string | null>(null);

  useEffect(() => {
    const mode = localStorage.getItem("mode");
    setMode(mode);
  }, []);

  return (
    <>
      <Image
        width={50}
        height={50}
        src={Assets.getLogoImage()}
        alt="MainLogo"
        className={`md:w-[60px] md:h-[60px] filter ${
          mode === "dark" && "invert"
        }`}
      />

      <div className="relative left-[-5] text-black">
        <span className="text-4xl font-bold">c</span>
        <span className="text-4xl font-bold">r</span>
        <span className="text-4xl font-bold">i</span>
        <span className="text-4xl font-bold">l</span>
        <span className="text-4xl font-bold">c</span>
      </div>
    </>
  );
};

export default Logo;
