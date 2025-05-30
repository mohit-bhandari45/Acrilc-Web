"use client";

import api, { GET_OWN_PROFILE, GET_POST } from "@/apis/api";
import PostDescription from "@/components/postcomps/postdescription";
import Navbar from "@/components/profilecomps/navbar";
import MainLoader from "@/components/universalcomps/mainloader";
import { setUser } from "@/store/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { IPost } from "@/types/types";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Post = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const params = useParams();
  const id = params.id;
  const [post, setPost] = useState<IPost | null>(null);

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

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`${GET_POST}/${id}`);
      setPost(response.data.data);
      } catch (error) {
        if(error){
          router.push(`/profile/${user?.username}`);
        }
      }
    };

    getData();
  }, [id, router, user?.username]);

  if (!user) {
    return <MainLoader />;
  }

  return (
    <div className="font-[Helvetica]">
      <Navbar currentUser={user} show={true} portfolio={false}/>
      <PostDescription post={post} user={user} />
    </div>
  );
};

export default Post;
