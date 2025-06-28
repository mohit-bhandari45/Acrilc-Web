"use client";

import api, { GET_POST } from "@/apis/api";
import { InteractiveBackground } from "@/components/bgs/InteractiveBG";
import MainLoader from "@/components/universalcomps/mainloader";
// import useCurrentUser from "@/hooks/useCurrentUser";
import { IPost } from "@/types/types";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Navbar from "@/components/profilecomps/navbar";
import CreateContent from "@/components/postcomps/createcontent";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUser } from "@/store/features/userSlice";

const Edit = () => {
  /* states */
  const dispatch = useAppDispatch();
  const [post, setPost] = useState<IPost | null>(null);
  // const [token, setToken] = useState<string | null>(null);
  const [type, setType] = useState<string | null>("");
  const searchParams = useSearchParams();
  const params = useParams();
  const id = params.id;

  /* useEffects */
  useEffect(() => {
    setType(searchParams.get("type"));
  }, [searchParams]);

  // useEffect(() => {
  //   setToken(localStorage.getItem("token"));
  // }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`${GET_POST}/${id}`);
        setPost(response.data.data);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    };

    getData();
  }, [id]);

  /* hook */
  const { user: currentUser, loading } = useAppSelector(state => state.userReducer);
  // const { currentUser, loading } = useCurrentUser({ token });

  if (!currentUser || loading || !post) {
    return (
      <div>
        <InteractiveBackground />
        <MainLoader msg="Loading, please wait" />;
      </div>
    );
  }

  dispatch(setUser(currentUser));

  return (
    <div>
      <Navbar currentUser={currentUser} show={true} portfolio={false} />
      <CreateContent
        type={type}
        setType={setType}
        isCreate={false}
        data={post}
      />
    </div>
  );
};

export default Edit;
