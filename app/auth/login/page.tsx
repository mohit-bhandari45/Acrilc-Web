"use client";

import Left from "@/components/universalcomps/left";
import Right from "@/components/authcomps/right";
import React, { useEffect, useState } from "react";
import { loginLabels } from "@/utils/auth";
import { useRouter } from "next/navigation";

const Login = () => {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [])
  

  useEffect(() => {
    if (token) {
      router.push("/profile");
    }
  }, [token, router]);

  if (!token) {
    return (
      <div className="flex justify-center items-center w-full h-screen font-[Helvetica]">
        <Left />
        <Right labels={loginLabels} method="Login" />
      </div>
    );
  }
};

export default Login;
