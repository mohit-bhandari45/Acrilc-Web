"use client";

import api, { GET_POST } from "@/apis/api";
import MainLoader from "@/components/universalcomps/mainloader";
import { IPost } from "@/types/types";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Navbar from "@/components/profilecomps/navbar";
import CreateContent from "@/components/postcomps/createcontent";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUser } from "@/store/features/userSlice";

const Edit = () => {
	const dispatch = useAppDispatch();
	const [post, setPost] = useState<IPost | null>(null);
	const [type, setType] = useState<string | null>("");
	const searchParams = useSearchParams();
	const params = useParams();
	const id = params.id;

	useEffect(() => {
		setType(searchParams.get("type"));
	}, [searchParams]);

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

	const { user: currentUser, loading } = useAppSelector(state => state.userReducer);

	if (!currentUser || loading || !post) {
		return <MainLoader msg="Loading, please wait" />;
	}

	dispatch(setUser(currentUser));

	return (
		<div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_rgba(226,114,91,0.08)_0%,_transparent_50%),linear-gradient(180deg,_#f5e8dc_0%,_#eedad0_60%,_#e5cfc0_100%)]">
			<Navbar currentUser={currentUser} show={true} portfolio={false} />
			<CreateContent type={type} setType={setType} isCreate={false} data={post} />
		</div>
	);
};

export default Edit;
