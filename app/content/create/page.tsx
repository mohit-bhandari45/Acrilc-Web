// app/content/create/Create.tsx
"use client";

import CreateContent from "@/components/postcomps/createcontent";
import Navbar from "@/components/profilecomps/navbar";
import MainLoader from "@/components/universalcomps/mainloader";
// import useCurrentUser from "@/hooks/useCurrentUser";
import { setUser } from "@/store/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Create = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const [type, setType] = useState<string | null>("");
  // const [token, setToken] = useState<string | null>(null);

  // useEffect(() => {
  //   setToken(localStorage.getItem("token"));
  // }, []);

  useEffect(() => {
    setType(searchParams.get("type"));
  }, [searchParams]);

  // const { currentUser, loading } = useCurrentUser({ token });

  const { user: currentUser, loading } = useAppSelector(state => state.userReducer);

  if (!currentUser || loading) {
    return <MainLoader msg="Loading, please wait" />;
  }

  dispatch(setUser(currentUser));

  return (
    <div className="font-[Helvetica]">
      <Navbar currentUser={currentUser} show={true} portfolio={false} />
      <CreateContent type={type} setType={setType} isCreate={true} />
    </div>
  );
};

export default Create;
