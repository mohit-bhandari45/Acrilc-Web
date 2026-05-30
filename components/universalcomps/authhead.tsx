import React from "react";

const AuthHead = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center px-4 text-center">
      <div className="mb-1 inline-flex items-center rounded-full border border-[#ebd9ca] bg-white/75 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8f6c57] shadow-sm">
        Secure studio access
      </div>
      <h1 className="font-playfair text-2xl font-bold text-[#5e3c2f] md:text-3xl lg:text-3xl">
        Welcome to Acrilc
      </h1>
      <p className="mt-1.5 max-w-sm text-xs leading-5 text-[#7d6152] sm:text-sm">
        Sign in or create your account to keep your work, portfolio, and profile in one place.
      </p>
    </div>
  );
};

export default AuthHead;
