"use client"

import Left from "@/components/universalcomps/left";
import Right from "@/components/authcomps/right";
import React from "react";
import { signupLabels } from "@/utils/auth";
import { useRouter } from "next/navigation";

const Signup = () => {
  const user = localStorage.getItem("token");
  const router = useRouter();

  if (user) {
    router.push("/profile");
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center w-full h-screen font-[Helvetica]">
        <Left />
        <Right labels={signupLabels} method="Signup Up" />
      </div>
    );
  }
};

export default Signup;
