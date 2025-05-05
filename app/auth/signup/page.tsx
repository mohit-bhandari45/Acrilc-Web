"use client";

import Left from "@/components/universalcomps/left";
import Right from "@/components/authcomps/right";
import React, { useEffect, useState } from "react";
import { signupLabels } from "@/utils/auth";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    if (token) {
      router.push("/profile");
    }
  }, [token, router]);

  if (!token) {
    return (
      <div className="flex flex-col lg:flex-row w-full min-h-screen font-[Helvetica] justify-center items-center">
        <Left />
        <Right labels={signupLabels} method="Sign Up" />
      </div>
    );
  }
};

export default Signup;
