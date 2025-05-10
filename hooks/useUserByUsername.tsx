import api, { GET_USER_PROFILE } from "@/apis/api";
import { IUser } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useUserByUsername = ({ username }: { username: string }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function getUser() {
      try {
        const response = await api.get(`${GET_USER_PROFILE}/${username}`);

        if (response.status === 200) {
          setUser(response.data.data);
        }
      } catch (error: unknown) {
        console.log(error);
        toast.error("Something went wrong. Try Again!");
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    if (username) {
      getUser();
    }
  }, [router, username]);

  return { user, loading };
};

export default useUserByUsername;
