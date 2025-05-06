// hooks/useProfileRedirect.ts
import { SetStateAction, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import api, { GET_OWN_PROFILE } from "@/apis/api";
import toast from "react-hot-toast";
import { IUser } from "@/store/types";

const useProfileRedirect = ({
  setLoader,
}: {
  setLoader: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      if (pathName !== "/auth/signup" && pathName !== "/auth/login") {
        router.push("/auth/login");
      } else {
        setLoader(false);
      }
      return;
    }

    const getUser = async () => {
      try {
        const response = await api.get(GET_OWN_PROFILE);
        const user: IUser = response.data.data;

        // Redirect logic
        if (pathName === "/auth/signup" || pathName === "/auth/login") {
          if (!user.username) {
            router.push("/auth/username");
          } else if (!user.preferences?.length) {
            router.push("/auth/forte");
          } else if (!user.profilePicture) {
            router.push("/auth/profile-pic");
          } else {
            router.push(`/profile`);
          }
        }

        if (pathName === "/auth/username" && user.username) {
          if (user.preferences?.length === 0) {
            router.push(`/auth/forte`);
          } else if (!user.profilePicture) {
            router.push(`/auth/profile-pic`);
          } else {
            router.push(`/${user.username}`);
          }
        } else {
          setLoader(false);
        }

        if (pathName === "/auth/forte" && user.preferences?.length) {
          if (!user.profilePicture) {
            router.push(`/auth/profile-pic`);
          } else {
            router.push(`/${user.username}`);
          }
        } else {
          setLoader(false);
        }

        if (pathName === "/auth/profile-pic" && user.profilePicture) {
          router.push(`/${user.username}`);
        } else {
          setLoader(false);
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error?.status === 401) {
          localStorage.removeItem("token");
          router.push("/auth/login");
        } else {
          toast.error("Something went wrong. Try Again!");
        }
      }
    };

    getUser();
  }, [pathName, router]);
};

export default useProfileRedirect;
