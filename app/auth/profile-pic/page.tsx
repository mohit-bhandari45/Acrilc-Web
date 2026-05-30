"use client";

import api, { ADD_PROFILE_PIC } from "@/apis/api";
import { Button } from "@/components/ui/button";
import UploadService from "@/service/service";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePicPage() {
	const [preview, setPreview] = useState<string | null>(null);
	const [file, setFile] = useState<File | null>(null);
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files?.[0];
		if (selectedFile) {
			setFile(selectedFile);
			setPreview(URL.createObjectURL(selectedFile));
		}
	};

	const handleSubmit = async () => {
		if (!file) {
			toast.error("Please select a profile picture.");
			return;
		}
		setLoading(true);
		try {
			const url = await UploadService.uploadToImgBB(file);
			const res = await api.post(ADD_PROFILE_PIC, { imageURL: url });
			if (res.status === 200) {
				toast.success("Profile Pic Added");
				router.push("/home");
			} else {
				toast.error("Try Again");
			}
		} catch (err) {
			console.error(err);
			toast.error("Failed to add Profile");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(226,114,91,0.14),_transparent_34%),linear-gradient(180deg,_#fbf7f2_0%,_#f2e7dc_100%)] px-4 py-8">
			<div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#E2725B]/12 blur-3xl" />
			<div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-[#D4A373]/15 blur-3xl" />
			<div className="absolute inset-0 pointer-events-none bg-[linear-gradient(135deg,rgba(255,255,255,0.32)_0%,transparent_45%,rgba(255,255,255,0.18)_100%)]" />

			<div className="relative z-10 w-full max-w-md">
				<div className="mb-5 text-center">
					<span className="font-poppins text-3xl font-bold text-[#5e3c2f]">acrilc</span>
				</div>

				<div className="w-full rounded-[2rem] border border-white/70 bg-white/72 px-6 py-8 shadow-[0_24px_80px_rgba(89,59,43,0.18)] backdrop-blur-2xl sm:px-8">
					<div className="mb-6 flex flex-col items-center text-center">
						<div className="mb-1 inline-flex items-center rounded-full border border-[#ebd9ca] bg-white/75 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8f6c57] shadow-sm">
							Almost there
						</div>
						<h1 className="font-playfair text-2xl font-bold text-[#5e3c2f] md:text-3xl">
							Upload Profile Picture
						</h1>
						<p className="mt-1.5 text-xs leading-5 text-[#7d6152] sm:text-sm">
							This image will appear on your public profile.
						</p>
					</div>

					{/* Avatar preview */}
					<div className="flex justify-center mb-6">
						<div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-[#ead7c9] shadow-[0_8px_24px_rgba(89,59,43,0.14)]">
							{preview ? (
								<Image
									src={preview}
									alt="Profile Preview"
									fill
									className="object-cover"
								/>
							) : (
								<div className="flex h-full w-full items-center justify-center bg-[#faf3ee]">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-12 w-12 text-[#c9a98a]"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={1.5}
											d="M5.121 17.804A13.937 13.937 0 0112 15c2.284 0 4.418.512 6.374 1.419M15 11a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								</div>
							)}
						</div>
					</div>

					{/* Choose file */}
					<div className="flex justify-center mb-2">
						<label
							htmlFor="file-upload"
							className="cursor-pointer rounded-full border border-[#e0c8b8] bg-white/80 px-5 py-2 text-sm font-semibold text-[#834C3D] shadow-sm transition hover:border-[#cfa891] hover:bg-[#fff7f0]"
						>
							{preview ? "Change Photo" : "Choose Photo"}
						</label>
						<input
							id="file-upload"
							type="file"
							accept="image/*"
							onChange={handleFileChange}
							className="hidden"
							aria-label="Upload profile image"
						/>
					</div>

					{/* Actions */}
					<div className="mt-6 flex flex-col items-center gap-3">
						<Button
							onClick={handleSubmit}
							disabled={loading}
							className="h-12 w-full cursor-pointer rounded-full border border-[#8f5b42]/10 bg-[linear-gradient(135deg,#834C3D_0%,#a8664f_55%,#d38d67_100%)] text-base font-semibold text-white shadow-[0_16px_30px_rgba(131,76,61,0.28)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_34px_rgba(131,76,61,0.34)] disabled:cursor-not-allowed disabled:opacity-70"
						>
							{loading ? (
								<div className="flex items-center gap-2">
									<span>Uploading...</span>
									<div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
								</div>
							) : (
								"Upload & Continue"
							)}
						</Button>

						<button
							onClick={() => {
								localStorage.setItem("profile-skip", "true");
								router.push("/home");
							}}
							className="cursor-pointer text-xs font-medium text-[#8a5d46] transition hover:text-[#5e3c2f] hover:underline"
						>
							Skip for now
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
