"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import api, { GET_OWN_PROFILE } from "@/apis/api";
import { IUser } from "@/types/types";

export default function useCurrentUser({ token }: { token: string | null }) {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Hydrate from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;  

    const localUser = localStorage.getItem("user");
    if (localUser) {
      try {
        setCurrentUser(JSON.parse(localUser));
      } catch {
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  // Fetch fresh profile when we have a token
  useEffect(() => {
    if (!token) {
      // no token → ensure loading is false and bail
      setLoading(false);
      return;
    }

    setLoading(true);
    api
      .get(GET_OWN_PROFILE)
      .then((response) => {
        if (response.status === 200) {
          setCurrentUser(response.data.data);
          localStorage.setItem("user", JSON.stringify(response.data.data));
        }
      })
      .catch((err: unknown) => {
        const axiosError = err as AxiosError;
        const status = axiosError?.response?.status;
        if (status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          toast.error("Please log in again.");
          router.push("/auth/login");
        } else {
          toast.error("Something went wrong. Try again!");
        }
        setCurrentUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token, router]);

  return { currentUser, loading };
}