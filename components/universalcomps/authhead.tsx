import React from "react";

const AuthHead = () => {
  return (
    <div className="h-[20%] w-full flex justify-center items-center flex-col px-4">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[rgba(172,82,9,0.7)]">
        Welcome to Acrilc
      </h1>
      <h2 className="text-xl md:text-2xl lg:text-2xl font-bold text-[rgba(172,82,9,0.4)] mt-2">
        where artists grow
      </h2>
    </div>
  );
};

export default AuthHead;
