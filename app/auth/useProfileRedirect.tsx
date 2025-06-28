"use client";

// hooks/useProfileRedirect.ts
import api, { GET_OWN_PROFILE } from "@/apis/api";
import { IUser } from "@/types/types";
import { AxiosError } from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useProfileRedirect = () => {
	const pathName = usePathname();
	const router = useRouter();
	const [loader, setLoader] = useState<boolean>(true);

	useEffect(() => {
		// const token = localStorage.getItem("token");
		// if (!token) {
		//   if (pathName !== "/auth/signup" && pathName !== "/auth/login") {
		//     router.push("/auth/login");
		//   } else {
		//     setLoader(false);
		//   }
		//   return;
		// }

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
					} else {
						router.push(`/profile/${user.username}`);
					}
				}

				if (pathName === "/auth/username" && user.username) {
					if (user.preferences?.length === 0) {
						router.push(`/auth/forte`);
					} else {
						router.push(`/profile/${user.username}`);
					}
				} else {
					setLoader(false);
				}

				if (pathName === "/auth/forte" && user.preferences?.length) {
					router.push(`/profile/${user.username}`);
				} else {
					setLoader(false);
				}

				if (pathName === "/auth/profile-pic" && user.profilePicture) {
					router.push(`/profile/${user.username}`);
				} else {
					setLoader(false);
				}

				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (error: any) {
				console.log(error);
				const err = error as AxiosError<{ msg: string }>;
				const { status } = err.response!;

				if (status === 401) {
					localStorage.removeItem("token");
					router.push("/auth/login");
				} else {
					toast.error("Something went wrong. Try Again!");
				}
			}
		};

		getUser();
	}, [pathName, router, setLoader]);

	return { loader, setLoader };
};

export default useProfileRedirect;
