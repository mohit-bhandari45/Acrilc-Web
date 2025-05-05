"use client";

import api, { GET_OWN_PROFILE, GET_POST } from "@/apis/api";
import PostDescription from "@/components/postcomps/postdescription";
import { setUser } from "@/store/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import IPost from "@/types/post";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";

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
      const response = await api.get(`${GET_POST}/${id}`);

      setPost(response.data.data);
    };

    getData();
  }, [id]);

  if (!user) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <HashLoader color="#FAA21B" size={200} />
      </div>
    );
  }

  return (
    <div className="font-[Helvetica]">
      <PostDescription post={post} />
    </div>
  );
};

export default Post;
