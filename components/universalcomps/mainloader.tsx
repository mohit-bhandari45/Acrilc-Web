"use client";
import React, { useEffect, useState } from "react";

const MainLoader = ({ msg }: { msg: string }) => {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "." : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative isolate flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(226,114,91,0.14),_transparent_34%),linear-gradient(180deg,_#fbf7f2_0%,_#f2e7dc_100%)]">
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#E2725B]/12 blur-3xl" />
      <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-[#D4A373]/15 blur-3xl" />
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(135deg,rgba(255,255,255,0.32)_0%,transparent_45%,rgba(255,255,255,0.18)_100%)]" />

      <div className="relative z-10 flex flex-col items-center gap-6">
        <span className="font-poppins text-3xl font-bold text-[#5e3c2f]">acrilc</span>

        <div className="relative flex items-center justify-center">
          <div className="h-14 w-14 rounded-full border-4 border-[#ead7c9] border-t-[#834C3D] animate-spin" />
          <div className="absolute h-9 w-9 rounded-full border-2 border-[#E2725B]/20 border-t-[#a8664f]/60 animate-spin [animation-direction:reverse] [animation-duration:800ms]" />
        </div>

        <p className="text-sm font-medium text-[#7d6152]">
          {msg}{dots}
        </p>
      </div>
    </div>
  );
};

export default MainLoader;
