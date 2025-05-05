"use client";

import Left from "@/components/universalcomps/left";
import Right from "@/components/authcomps/right";
import React, { useEffect, useState } from "react";
import { loginLabels } from "@/utils/auth";
import { useRouter } from "next/navigation";

const Login = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      router.push("/profile");
    }
  }, [token, router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="flex flex-col lg:flex-row w-full min-h-screen font-[Helvetica] justify-center items-center">
        <Left />
        <Right labels={loginLabels} method="Login" />
      </div>
    );
  }

  return null;
};

export default Login;
