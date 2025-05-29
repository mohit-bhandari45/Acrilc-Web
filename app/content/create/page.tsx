// app/content/create/Create.tsx
"use client";

import api, { GET_OWN_PROFILE } from "@/apis/api";
import CreateContent from "@/components/postcomps/createcontent";
import Navbar from "@/components/profilecomps/navbar";
import MainLoader from "@/components/universalcomps/mainloader";
import { setUser } from "@/store/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Create = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const [type, setType] = useState<string | null>("");
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    setType(searchParams.get("type"));
  }, [searchParams]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await api.get(GET_OWN_PROFILE);
        if (response.status === 200) {
          dispatch(setUser(response.data.data));
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    return <MainLoader />;
  }

  return (
    <div className="font-[Helvetica]">
      <Navbar currentUser={user} show={true} portfolio={false}/>
      <CreateContent type={type} setType={setType} isCreate={true} />
    </div>
  );
};

export default Create;