"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useTokenCheck = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token && !isLoading) {
      router.push("/auth/login");
    }
  }, [token, router, isLoading]);

  return {token, isLoading}
};

export default useTokenCheck;
