// hooks/useCurrentUser.ts
import api, { GET_OWN_PROFILE } from "@/apis/api";
import { IUser } from "@/store/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

const useCurrentUser = ({ token }: { token: string | null }) => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    async function getUser() {
      try {
        const response = await api.get(GET_OWN_PROFILE);

        if (response.status === 200) {
          setCurrentUser(response.data.data);
        }
      } catch (error: unknown) {
        const axiosError = error as AxiosError;
        const status = axiosError?.response?.status;

        if (status === 401) {
          console.log(401);
          localStorage.removeItem("token");
          toast.error("Please Login Again to continue making!");
          router.push("/auth/login");
        } else {
          toast.error("Something went wrong. Try Again!");
        }
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    }

    if (token) {
      getUser();
    }
  }, [router, token]);

  return { currentUser, loading };
};

export default useCurrentUser;
