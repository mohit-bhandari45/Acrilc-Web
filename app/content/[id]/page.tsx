"use client";

import api, { GET_POST } from "@/apis/api";
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

	const { user: currentUser, loading } = useAppSelector((state) => state.userReducer);

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
		return <MainLoader msg="Loading, please wait" />;
	}

	return (
		<div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_rgba(226,114,91,0.08)_0%,_transparent_50%),linear-gradient(180deg,_#f5e8dc_0%,_#eedad0_60%,_#e5cfc0_100%)]">
			<Navbar currentUser={currentUser} show={true} portfolio={false} />
			<PostDescription post={post} user={currentUser} getData={getData} />
		</div>
	);
};

export default Post;
