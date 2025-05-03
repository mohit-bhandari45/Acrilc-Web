"use client";

import api, { GET_OWN_PROFILE } from "@/apis/api";
import CreatePost from "@/components/postcomps/createpost";
import Footer from "@/components/profilecomps/footer";
import Navbar from "@/components/profilecomps/navbar";
import { setUser } from "@/store/features/userSlice";
import { useAppDispatch } from "@/store/hooks";
import React, { useEffect } from "react";

const Create = () => {
  const dispatch = useAppDispatch();

  // Getting User
  const getUser = async () => {
    const response = await api.get(GET_OWN_PROFILE);

    if (response.status === 200) {
      dispatch(setUser(response.data.data));
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="font-[Helvetica]">
      <Navbar />
      <CreatePost />
      <Footer />
    </div>
  );
};

export default Create;
