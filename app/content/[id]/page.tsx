"use client";

import api, { GET_POST } from "@/apis/api";
import { InteractiveBackground } from "@/components/bgs/InteractiveBG";
import PostDescription from "@/components/postcomps/postdescription";
import Navbar from "@/components/profilecomps/navbar";
import MainLoader from "@/components/universalcomps/mainloader";
import { useAppSelector } from "@/store/hooks";
import { IPost } from "@/types/types";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const Post = () => {
	const params = useParams();
	const id = params.id;
	const [post, setPost] = useState<IPost | null>(null);

	const { user: currentUser, loading } = useAppSelector(
		(state) => state.userReducer
	);
	const getData = useCallback(async () => {
		try {
			const response = await api.get(`${GET_POST}/${id}`);
			setPost(response.data.data);
		} catch (error) {
			console.log(error);
		}
	}, [id]);

	useEffect(() => {
		getData();
	}, [getData]);

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
				<PostDescription post={post} user={currentUser} getData={getData} />
			</div>
		</>
	);
};

export default Post;
