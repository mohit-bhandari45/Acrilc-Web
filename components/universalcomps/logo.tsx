"use client";

import { Poppins } from '@next/font/google';

const poppins = Poppins({
  weight: ['700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
});

const Logo = () => {
  return (
    <div className="relative left-[-5] text-black font-[Helvetica]">
      <span className={`text-6xl font-bold ${poppins.className}`}>a</span>
      <span className="text-4xl font-bold">c</span>
      <span className="text-4xl font-bold">r</span>
      <span className="text-4xl font-bold">i</span>
      <span className="text-4xl font-bold">l</span>
      <span className="text-4xl font-bold">c</span>
    </div>
  );
};

export default Logo;