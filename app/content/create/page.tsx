/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import api, { GET_OWN_PROFILE } from "@/apis/api";
import CreateContent from "@/components/postcomps/createcontent";
import { setUser } from "@/store/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";

const Create = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const [type, setType] = useState<string | null>("");
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    setType(searchParams.get("type"));
  }, [searchParams]);

  // Getting User
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await api.get(GET_OWN_PROFILE);

        if (response.status === 200) {
          dispatch(setUser(response.data.data));
        }
      } catch (error: any) {
        if (error.status === 401) {
          localStorage.removeItem("token");
          router.push("/auth/login");
        }
      }
    };

    getUser();
  }, [dispatch, router]);

  if (!user) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <HashLoader color="#FAA21B" size={200} />
      </div>
    );
  }

  return (
    <div className="font-[Helvetica]">
      <CreateContent type={type} setType={setType} isCreate={true}/>
    </div>
  );
};

export default Create;
