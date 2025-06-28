"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import api, {
	CREATE_POST,
	CREATE_STORYBOARD,
	GET_KEYWORDS_API,
	UPDATE_POST,
} from "@/apis/api";
import UploadService from "@/service/service";
import checkContent, { IFormData } from "./utils";
import { IPost } from "@/types/types";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import { Button } from "../ui/button";

interface Props {
	isCreate: boolean;
	data?: IPost;
	type: string | null;
	setType: React.Dispatch<React.SetStateAction<string | null>>;
	setEdit?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateContent({
	isCreate,
	data,
	type,
	setType,
	setEdit,
}: Props) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const user = useAppSelector((s) => s.userReducer.user)!;

	const fileInputRef = useRef<HTMLInputElement>(null);
	const MAX_IMAGES = 1;

	// form state
	const [loader, setLoader] = useState(false);
	const [images, setImages] = useState<File[]>([]);
	const [previews, setPreviews] = useState<string[]>([]);
	const [title, setTitle] = useState(data?.title ?? "");
	const [description, setDescription] = useState(
		data ? (type === "post" ? data.story : data.story) : ""
	);
	const [size, setSize] = useState(data?.size ?? "");
	const [forte, setForte] = useState("");
	const [input, setInput] = useState("");
	const [tags, setTags] = useState<string[]>(data?.hashTags ?? []);

	// initialize previews & forte
	useEffect(() => {
		if (data) {
			setPreviews(data.media.map((m) => m.url));
		}
	}, [data]);

	useEffect(() => {
		if (user.preferences?.length) {
			setForte(user.preferences[0]);
		}
	}, [user.preferences]);

	// tag handlers
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (["Enter", ",", "Tab"].includes(e.key)) {
			e.preventDefault();
			const val = input.trim().replace(/,$/, "");
			if (val && !tags.includes(val)) setTags((t) => [...t, val]);
			setInput("");
		}
	};
	const removeTag = (idx: number) =>
		setTags((t) => t.filter((_, i) => i !== idx));
	const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setInput(e.target.value);

	// image handlers
	const triggerFileInput = () => fileInputRef.current?.click();
	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return;
		const newImgs = [...images], newPre = [...previews];
		Array.from(e.target.files).forEach((file) => {
			if (newImgs.length < MAX_IMAGES) {
				newImgs.push(file);
				newPre.push(URL.createObjectURL(file));
			}
		});
		setImages(newImgs);
		setPreviews(newPre);
	};
	const removeImage = (i: number) => {
		URL.revokeObjectURL(previews[i]);
		setImages((imgs) => imgs.filter((_, idx) => idx !== i));
		setPreviews((p) => p.filter((_, idx) => idx !== i));
	};

	// mediaType util
	const mediaType = (t: string) =>
		t.startsWith("image")
			? "image"
			: t.startsWith("video")
				? "video"
				: t.startsWith("audio")
					? "audio"
					: "gif";

	// keyword generation
	const handleGenerateClick = async () => {
		try {
			const res = await api.post(GET_KEYWORDS_API, { title, story: description });
			if (res.status === 200) {
				const kw = res.data.data
					.map((k: string) => k.trim().replace(/^[.,\s]+|[.,\s]+$/g, ""))
					.filter(Boolean);
				setTags(kw);
			}
		} catch {
			toast.error("Keyword generation failed");
		}
	};

	// submit (create/update) unified
	const handleSubmit = async (e: React.MouseEvent) => {
		e.preventDefault();

		const check = checkContent(isCreate, type!, title, description, size, forte, tags, images);
		if (!check.status) return toast.error(check.msg);

		setLoader(true);
		const formData: IFormData = {
			title,
			hashTags: tags.join(""),
		};

		// story vs description, size & forte
		if (type === "post") {
			formData.story = description;
			formData.size = size;
			formData.forte = forte;
		} else {
			formData.description = description;
		}

		// media
		if (isCreate) {
			const uploaded = await Promise.all(
				images.map((img) =>
					UploadService.uploadToImgBB(img).then((url) => ({
						url,
						type: mediaType(img.type),
					}))
				)
			);
			formData.media = uploaded;
		} else {
			formData.media = data!.media;
		}

		try {
			const endpoint = isCreate
				? type === "post"
					? CREATE_POST
					: CREATE_STORYBOARD
				: `${UPDATE_POST}/${data!._id}`;

			const method = isCreate ? api.post : api.patch;
			const res = await method(endpoint, formData);
			if ((isCreate && res.status === 201) || (!isCreate && res.status === 200)) {
				const id = res.data.data._id;
				toast.success(
					isCreate
						? type === "post"
							? "Post Created!"
							: "Storyboard Created!"
						: type === "post"
							? "Post Updated!"
							: "Storyboard Updated!"
				);
				return router.push(
					isCreate
						? type === "post"
							? `/content/${id}`
							: `/profile/${user.username}?tab=blog`
						: type === "post"
							? `/content/${id}`
							: `/profile/${user.username}?tab=blog`
				);
			}
			throw new Error("Bad status");
		} catch (err) {
			console.error(err);
			toast.error("Something went wrong!");
		} finally {
			setLoader(false);
		}
	};

	// cancel logic
	const handleCancel = () => {
		if (isCreate) {
			router.push(`/profile/${user.username}`);
		} else {
			setEdit?.(false);
		}
	};

	return (
		<div className="max-w-4xl mx-auto p-4 mb-13 mt-30">
			<h1 className="text-4xl font-bold mb-6 text-center">
				{isCreate ? "New Post" : "Edit Post"}
			</h1>

			{/* TYPE SELECT */}
			{isCreate && (
				<div className="mb-6 flex">
					<select
						className="px-1 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
						value={type!}
						onChange={(e) => {
							if (e.target.value === "marketplace") return router.push("/marketplace/add");
							setType(e.target.value);
							const p = new URLSearchParams(searchParams);
							p.set("type", e.target.value);
							router.replace(`/content/create?${p.toString()}`);
						}}
					>
						<option value="post">Post</option>
						<option value="storyboard">Storyboard</option>
						<option value="marketplace">Marketplace</option>
					</select>
				</div>
			)}

			{/* IMAGE UPLOAD */}
			<div className="grid grid-cols-3 gap-3 mb-6">
				{previews.map((src, i) => (
					<div key={i} className="relative h-32 border rounded-md overflow-hidden">
						<Image src={src} alt="" className="w-full h-full object-cover" width={40} height={40} />
						{isCreate && (
							<button
								onClick={() => removeImage(i)}
								className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md"
							>
								<X size={16} />
							</button>
						)}
					</div>
				))}

				{isCreate && images.length < MAX_IMAGES && (
					<div
						onClick={triggerFileInput}
						className="h-32 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
					>
						<input
							type="file"
							ref={fileInputRef}
							onChange={handleImageUpload}
							accept="image/*"
							multiple
							className="hidden"
						/>
						<Upload className="text-gray-400 mb-2" />
						<p className="text-sm text-gray-500">Upload Image</p>
						<p className="text-xs text-gray-400">
							{images.length}/{MAX_IMAGES}
						</p>
					</div>
				)}
			</div>

			{/* TITLE */}
			<div className="mb-6">
				<label className="block text-sm font-medium mb-1">Title</label>
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Enter Your Title"
					className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
				/>
				<div className="text-right text-xs text-gray-500">
					<span className={title.length > 100 ? "text-red-500" : ""}>
						{title.length}
					</span>
					/100
				</div>
			</div>

			{/* DESCRIPTION / STORY */}
			<div className="mb-6">
				<label className="block text-sm font-medium mb-1">
					{type === "post" ? "Story of the Art" : "Description"}
				</label>
				<textarea
					rows={4}
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					placeholder={type === "post" ? "Enter Your Story" : undefined}
					className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
				/>
				<div className="text-right text-xs text-gray-500">
					<span
						className={
							type === "post"
								? description.length > 1000
									? "text-red-500"
									: ""
								: description.length > 5000
									? "text-red-500"
									: ""
						}
					>
						{description.length}
					</span>
					/{type === "post" ? "1000" : "5000"}
				</div>
			</div>

			{/* SIZE & FORTE */}
			{type === "post" && (
				<>
					<div className="mb-6">
						<label className="block text-sm font-medium mb-1">Size (inches, cm, ft)</label>
						<input
							type="text"
							value={size}
							onChange={(e) => setSize(e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
						/>
					</div>
					<div className="mb-6">
						<label className="block text-sm font-medium mb-1">Forte</label>
						<select
							value={forte}
							onChange={(e) => setForte(e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
						>
							{user.preferences?.map((f, i) => (
								<option key={i} value={f}>
									{f}
								</option>
							))}
						</select>
					</div>
				</>
			)}

			{/* KEYWORDS */}
			<div className="mb-8">
				<label className="block text-sm font-medium mb-1">Key Words</label>
				<div className="flex flex-wrap gap-2 px-2 py-1 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500">
					{tags.map((t, i) => (
						<span key={i} className="flex items-center bg-[#FAA21B] text-white px-3 py-1 rounded-lg">
							{t}
							<button onClick={() => removeTag(i)} className="ml-2">
								×
							</button>
						</span>
					))}
					<input
						value={input}
						onChange={handleKeywordChange}
						onKeyDown={handleKeyDown}
						placeholder="Type and press Enter or comma"
						className="flex-grow px-2 py-1 focus:outline-none"
					/>
					<button onClick={handleGenerateClick} className="ml-auto px-3 py-1 bg-[#FAA21B] text-white rounded-md">
						Generate
					</button>
				</div>
			</div>

			{/* ACTIONS */}
			<button
				onClick={handleCancel}
				className="w-full mb-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
			>
				Cancel
			</button>

			<Button
				onClick={handleSubmit}
				disabled={loader}
				variant="outline"
				className="w-full py-3 flex justify-center items-center gap-3 bg-[#FAA21B] text-white rounded-md hover:bg-[#fa921b]"
			>
				{loader
					? isCreate
						? "Publishing..."
						: "Saving..."
					: isCreate
						? "Publish"
						: "Save Changes"}
				{loader && <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />}
			</Button>
		</div>
	);
}

