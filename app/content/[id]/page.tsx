"use client";

import api, { GET_POST } from "@/apis/api";
import { InteractiveBackground } from "@/components/bgs/InteractiveBG";
import PostDescription from "@/components/postcomps/postdescription";
import Navbar from "@/components/profilecomps/navbar";
import MainLoader from "@/components/universalcomps/mainloader";
import { useAppSelector } from "@/store/hooks";
// import useCurrentUser from "@/hooks/useCurrentUser";
import { IPost } from "@/types/types";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Post = () => {
	const router = useRouter();
	const params = useParams();
	const id = params.id;
	const [post, setPost] = useState<IPost | null>(null);
	// const [token, setToken] = useState<string | null>(null);

	// useEffect(() => {
	//   setToken(localStorage.getItem("token"));
	// }, []);

	// const { currentUser, loading } = useCurrentUser({ token });

	const { user: currentUser, loading } = useAppSelector(state => state.userReducer);

	useEffect(() => {
		const getData = async () => {
			try {
				const response = await api.get(`${GET_POST}/${id}`);
				setPost(response.data.data);
			} catch (error) {
				if (error) {
					router.push(`/profile/${currentUser?.username}`);
				}
			}
		};

		getData();
	}, [id, router, currentUser?.username]);

	if (!currentUser || loading) {
		return (
			<>
				<InteractiveBackground />
				<MainLoader msg="Loading, please wait" />;
			</>
		);
	}

	return (
		<>
			<InteractiveBackground />
			<div className="font-[Helvetica] relative z-10">
				<Navbar currentUser={currentUser} show={true} portfolio={false} />
				<PostDescription post={post} user={currentUser} />
			</div>
		</>
	);
};

export default Post;
