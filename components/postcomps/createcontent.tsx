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
import { Upload, X, Sparkles } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

interface Props {
	isCreate: boolean;
	data?: IPost;
	type: string | null;
	setType: React.Dispatch<React.SetStateAction<string | null>>;
}

const inputCls = "w-full h-11 rounded-full border border-[#ead7c9] bg-white px-4 text-sm text-[#2e1f14] placeholder:text-[#c0a898] focus:outline-none focus:border-[#c98d68] focus:ring-2 focus:ring-[#e8b08f]/30 shadow-sm";
const textareaCls = "w-full rounded-2xl border border-[#ead7c9] bg-white px-4 py-3 text-sm text-[#2e1f14] placeholder:text-[#c0a898] focus:outline-none focus:border-[#c98d68] focus:ring-2 focus:ring-[#e8b08f]/30 shadow-sm resize-none";
const labelCls = "block text-sm font-semibold text-[#765240] mb-1.5";

export default function CreateContent({ isCreate, data, type, setType }: Props) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const user = useAppSelector((s) => s.userReducer.user)!;

	const fileInputRef = useRef<HTMLInputElement>(null);
	const MAX_IMAGES = 1;

	const [loader, setLoader] = useState(false);
	const [images, setImages] = useState<File[]>([]);
	const [previews, setPreviews] = useState<string[]>([]);
	const [title, setTitle] = useState(data?.title ?? "");
	const [description, setDescription] = useState(data?.story ?? "");
	const [size, setSize] = useState(data?.size ?? "");
	const [forte, setForte] = useState("");
	const [input, setInput] = useState("");
	const [tags, setTags] = useState<string[]>(data?.hashTags ?? []);

	useEffect(() => {
		if (data) setPreviews(data.media.map((m) => m.url));
	}, [data]);

	useEffect(() => {
		if (user?.preferences?.length) setForte(user.preferences[0]);
	}, [user?.preferences]);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (["Enter", ",", "Tab"].includes(e.key)) {
			e.preventDefault();
			const val = input.trim().replace(/,$/, "");
			if (val && !tags.includes(val)) setTags((t) => [...t, val]);
			setInput("");
		}
	};

	const removeTag = (idx: number) => setTags((t) => t.filter((_, i) => i !== idx));

	const triggerFileInput = () => fileInputRef.current?.click();

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return;
		const newImgs = [...images];
		const newPre = [...previews];
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

	const mediaType = (t: string) =>
		t.startsWith("image") ? "image" : t.startsWith("video") ? "video" : t.startsWith("audio") ? "audio" : "gif";

	const handleGenerateClick = async () => {
		if (!title.trim() && !description.trim()) {
			toast.error("Add a title or story first");
			return;
		}
		try {
			const res = await api.post(GET_KEYWORDS_API, { title, story: description });
			if (res.status === 200) {
				const kw = res.data.data
					.map((k: string) => k.trim().replace(/^[.,\s]+|[.,\s]+$/g, ""))
					.filter(Boolean);
				setTags(kw);
				toast.success("Keywords generated!");
			}
		} catch {
			toast.error("Keyword generation failed");
		}
	};

	const handleSubmit = async (e: React.MouseEvent) => {
		e.preventDefault();
		const check = checkContent(isCreate, type!, title, description, size, forte, tags, images);
		if (!check.status) return toast.error(check.msg);

		setLoader(true);
		const formData: IFormData = { title, hashTags: tags.join("") };

		if (type === "post") {
			formData.story = description;
			formData.size = size;
			formData.forte = forte;
		} else {
			formData.description = description;
		}

		if (isCreate) {
			const uploaded = await Promise.all(
				images.map((img) =>
					UploadService.uploadToImgBB(img).then((url) => ({ url, type: mediaType(img.type) }))
				)
			);
			formData.media = uploaded;
		} else {
			formData.media = data!.media;
		}

		try {
			const endpoint = isCreate
				? type === "post" ? CREATE_POST : CREATE_STORYBOARD
				: `${UPDATE_POST}/${data!._id}`;
			const method = isCreate ? api.post : api.patch;
			const res = await method(endpoint, formData);

			if ((isCreate && res.status === 201) || (!isCreate && res.status === 200)) {
				const id = res.data.data._id;
				toast.success(
					isCreate
						? type === "post" ? "Post Created!" : "Storyboard Created!"
						: type === "post" ? "Post Updated!" : "Storyboard Updated!"
				);
				router.push(type === "post" ? `/content/${id}` : `/profile/${user.username}?tab=blog`);
				return;
			}
			throw new Error("Bad status");
		} catch (err) {
			console.error(err);
			toast.error("Something went wrong!");
		} finally {
			setLoader(false);
		}
	};

	const handleCancel = () => {
		router.push(user?.username ? `/profile/${user.username}` : "/home");
	};

	return (
		<div className="max-w-2xl mx-auto px-4 pt-28 pb-16">

			{/* Header */}
			<div className="mb-8 text-center">
				<p className="text-xs tracking-[0.3em] uppercase text-[#9a8578] font-medium mb-2">
					{isCreate ? "Create" : "Edit"}
				</p>
				<h1 className="font-playfair text-3xl font-normal text-[#2e1f14]">
					{isCreate
						? type === "post" ? "New Post" : "New Storyboard"
						: type === "post" ? "Edit Post" : "Edit Storyboard"}
				</h1>
			</div>

			<div className="space-y-4">

				{/* Type selector */}
				{isCreate && (
					<div className="bg-white rounded-[20px] border border-[#e8d5c4]/60 shadow-sm p-5">
						<label className={labelCls}>Content Type</label>
						<div className="flex gap-2 flex-wrap">
							{["post", "storyboard", "marketplace"].map((t) => (
								<button
									key={t}
									type="button"
									onClick={() => {
										if (t === "marketplace") return router.push("/marketplace/add");
										setType(t);
										const p = new URLSearchParams(searchParams);
										p.set("type", t);
										router.replace(`/content/create?${p.toString()}`);
									}}
									className={`px-4 py-2 rounded-full text-sm font-medium border transition-all cursor-pointer capitalize
										${type === t
											? "bg-[#f5e2d8] border-[#834C3D] text-[#834C3D] ring-2 ring-[#834C3D]/20"
											: "bg-white border-[#ead7c9] text-[#5e3c2f] hover:border-[#c98d68]"
										}`}
								>
									{t}
								</button>
							))}
						</div>
					</div>
				)}

				{/* Image upload */}
				<div className="bg-white rounded-[20px] border border-[#e8d5c4]/60 shadow-sm p-5">
					<label className={labelCls}>Artwork Image</label>
					<div className="flex gap-3 flex-wrap">
						{previews.map((src, i) => (
							<div key={i} className="relative h-40 w-40 rounded-xl overflow-hidden border border-[#ead7c9]">
								<Image src={src} alt="" fill className="object-cover" />
								{isCreate && (
									<button
										type="button"
										onClick={() => removeImage(i)}
										className="absolute top-2 right-2 bg-white/90 rounded-full p-1 shadow cursor-pointer hover:bg-white transition"
									>
										<X size={14} className="text-[#834C3D]" />
									</button>
								)}
							</div>
						))}
						{isCreate && images.length < MAX_IMAGES && (
							<div
								onClick={triggerFileInput}
								className="h-40 w-40 border-2 border-dashed border-[#d4a98a] bg-[#fdf5ef] rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-[#834C3D] hover:bg-[#f5e2d8] transition-all group"
							>
								<input
									type="file"
									ref={fileInputRef}
									onChange={handleImageUpload}
									accept="image/*"
									multiple
									className="hidden"
								/>
								<div className="h-10 w-10 rounded-full bg-[#f0d5c4] group-hover:bg-[#e8c4aa] flex items-center justify-center mb-2 transition-colors">
									<Upload size={16} className="text-[#834C3D]" />
								</div>
								<p className="text-xs font-medium text-[#834C3D]">Upload Image</p>
								<p className="text-[11px] text-[#9a8578] mt-0.5">{images.length}/{MAX_IMAGES}</p>
							</div>
						)}
					</div>
				</div>

				{/* Title */}
				<div className="bg-white rounded-[20px] border border-[#e8d5c4]/60 shadow-sm p-5">
					<label className={labelCls}>Title</label>
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="Give your artwork a title"
						className={inputCls}
					/>
					<div className="flex justify-end mt-1.5">
						<span className={`text-xs font-medium ${title.length > 100 ? "text-red-500" : "text-[#9a8578]"}`}>
							{title.length}/100
						</span>
					</div>
				</div>

				{/* Story / Description */}
				<div className="bg-white rounded-[20px] border border-[#e8d5c4]/60 shadow-sm p-5">
					<label className={labelCls}>{type === "post" ? "Story of the Art" : "Description"}</label>
					<textarea
						rows={5}
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder={type === "post" ? "Share the story behind this artwork…" : "Describe your storyboard…"}
						className={textareaCls}
					/>
					<div className="flex justify-between mt-1.5">
						<p className="text-xs text-[#9a8578]">
							{type === "post" ? "What inspired you?" : "What's this about?"}
						</p>
						<span className={`text-xs font-medium ${description.length > (type === "post" ? 1000 : 5000) ? "text-red-500" : "text-[#9a8578]"}`}>
							{description.length}/{type === "post" ? 1000 : 5000}
						</span>
					</div>
					<div className="h-1 w-full rounded-full bg-[#f0ddd0] mt-1.5 overflow-hidden">
						<div
							className={`h-full rounded-full transition-all ${description.length > (type === "post" ? 1000 : 5000) ? "bg-red-400" : "bg-[linear-gradient(90deg,#834C3D,#d38d67)]"}`}
							style={{ width: `${Math.min((description.length / (type === "post" ? 1000 : 5000)) * 100, 100)}%` }}
						/>
					</div>
				</div>

				{/* Size & Forte (post only) */}
				{type === "post" && (
					<div className="bg-white rounded-[20px] border border-[#e8d5c4]/60 shadow-sm p-5 space-y-4">
						<div>
							<label className={labelCls}>Size</label>
							<input
								type="text"
								value={size}
								onChange={(e) => setSize(e.target.value)}
								placeholder="e.g. 24 × 18 in"
								className={inputCls}
							/>
						</div>
						<div>
							<label className={labelCls}>Forte</label>
							<div className="relative">
								<select
									value={forte}
									onChange={(e) => setForte(e.target.value)}
									className="w-full h-11 rounded-full border border-[#ead7c9] bg-white px-4 text-sm text-[#2e1f14] appearance-none focus:outline-none focus:border-[#c98d68] focus:ring-2 focus:ring-[#e8b08f]/30 shadow-sm cursor-pointer"
								>
									{user?.preferences?.map((f, i) => (
										<option key={i} value={f}>{f}</option>
									))}
								</select>
								<svg className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9a8578] pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
									<path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
								</svg>
							</div>
						</div>
					</div>
				)}

				{/* Keywords */}
				<div className="bg-white rounded-[20px] border border-[#e8d5c4]/60 shadow-sm p-5">
					<div className="flex items-center justify-between mb-2">
						<label className={`${labelCls} mb-0`}>Keywords</label>
						<button
							type="button"
							onClick={handleGenerateClick}
							className="inline-flex items-center gap-1.5 rounded-full border border-[#834C3D]/40 bg-[#fff7f2] px-3 py-1 text-xs font-semibold text-[#834C3D] hover:bg-[#f5e2d8] transition cursor-pointer"
						>
							<Sparkles size={12} />
							Auto-generate
						</button>
					</div>
					<div className="min-h-[44px] flex flex-wrap gap-2 px-3 py-2 border border-[#ead7c9] rounded-2xl bg-white focus-within:border-[#c98d68] focus-within:ring-2 focus-within:ring-[#e8b08f]/30 transition">
						{tags.map((t, i) => (
							<span key={i} className="inline-flex items-center gap-1 rounded-full bg-[#f5e2d8] border border-[#834C3D]/25 px-3 py-1 text-xs font-semibold text-[#834C3D]">
								{t}
								<button type="button" onClick={() => removeTag(i)} className="hover:text-[#5e3c2f] cursor-pointer">×</button>
							</span>
						))}
						<input
							value={input}
							onChange={(e) => setInput(e.target.value)}
							onKeyDown={handleKeyDown}
							placeholder={tags.length === 0 ? "Type a keyword and press Enter…" : ""}
							className="flex-1 min-w-[120px] px-1 py-0.5 text-sm text-[#2e1f14] placeholder:text-[#c0a898] focus:outline-none bg-transparent"
						/>
					</div>
					<p className="text-xs text-[#9a8578] mt-1.5">Press Enter or comma to add a tag</p>
				</div>

				{/* Actions */}
				<div className="flex gap-3 pt-1">
					<button
						type="button"
						onClick={handleCancel}
						className="flex-none px-6 h-11 rounded-full border border-[#834C3D]/40 bg-white text-sm font-semibold text-[#834C3D] hover:bg-[#fff7f2] transition cursor-pointer"
					>
						Cancel
					</button>
					<button
						type="button"
						onClick={handleSubmit}
						disabled={loader}
						className="flex-1 h-11 inline-flex items-center justify-center gap-2 cursor-pointer rounded-full border border-[#8f5b42]/10 bg-[linear-gradient(135deg,#834C3D_0%,#a8664f_55%,#d38d67_100%)] text-sm font-semibold text-white shadow-[0_8px_20px_rgba(131,76,61,0.28)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(131,76,61,0.36)] disabled:opacity-70 disabled:cursor-not-allowed"
					>
						{loader ? (
							<>
								<div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
								<span>{isCreate ? "Publishing…" : "Saving…"}</span>
							</>
						) : (
							<span>{isCreate ? "Publish" : "Save Changes"}</span>
						)}
					</button>
				</div>

			</div>
		</div>
	);
}
