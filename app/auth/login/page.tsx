"use client";

import Left from "@/components/universalcomps/left";
import Right from "@/components/authcomps/right";
import React from "react";
import { loginLabels } from "@/utils/auth";
import { useRouter } from "next/navigation";

const Login = () => {
  const user = localStorage.getItem("token");
  const router = useRouter();

  if (user) {
    router.push("/profile");
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center w-full h-screen font-[Helvetica]">
        <Left />
        <Right labels={loginLabels} method="Login" />
      </div>
    );
  }
};

export default Login;
