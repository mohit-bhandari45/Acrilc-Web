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
				router.push(`/home`);
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
		<div className="flex justify-center items-center min-h-screen px-4 font-sans bg-orange-50 relative overflow-hidden bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50">
			{/* Ambient lighting blobs */}
			<div className="absolute inset-0 pointer-events-none z-0">
				<div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-orange-200/20 rounded-full blur-[160px] animate-float-slow" />
				<div className="absolute bottom-[-15%] right-[-10%] w-[600px] h-[600px] bg-yellow-100/30 rounded-full blur-[180px] animate-float-medium" />
				<div className="absolute top-[30%] right-[15%] w-[300px] h-[300px] bg-amber-100/25 rounded-full blur-[100px] animate-float-fast" />
			</div>

			{/* Floating particles */}
			<div className="absolute inset-0 pointer-events-none z-0">
				{[...Array(6)].map((_, i) => (
					<div
						key={i}
						className="absolute w-2 h-2 bg-orange-300/40 rounded-full animate-particle-float"
						style={{
							left: `${15 + i * 13}%`,
							top: `${20 + Math.sin(i) * 25}%`,
							animationDelay: `${i * 1.1}s`,
							animationDuration: `${4 + (i % 3)}s`,
						}}
					/>
				))}
			</div>

			{/* Subtle noise overlay */}
			<div className="absolute inset-0 bg-[url('/noise.svg')] opacity-10 z-0 pointer-events-none" />

			{/* Main content */}
			<div className="bg-[#ffffff1e] rounded-3xl shadow-2xl p-8 sm:p-10 max-w-lg w-full text-center z-10 relative">
				<div className="text-3xl font-bold text-gray-800 mb-2">
					Upload Profile Picture
				</div>
				<p className="text-gray-500 mb-6 text-sm sm:text-base">
					This image will appear on your public profile.
				</p>

				<div className="flex justify-center mb-6">
					<div className="w-32 h-32 rounded-full border-4 border-yellow-400 overflow-hidden relative shadow-md">
						{preview ? (
							<Image
								src={preview}
								alt="Profile Preview"
								fill
								className="object-cover"
							/>
						) : (
							<div className="flex items-center justify-center w-full h-full bg-gray-100 text-gray-400 text-sm">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="w-10 h-10"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M5.121 17.804A13.937 13.937 0 0112 15c2.284 0 4.418.512 6.374 1.419M15 11a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</div>
						)}
					</div>
				</div>

				<label
					htmlFor="file-upload"
					className="cursor-pointer inline-block bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-xl font-medium transition duration-200"
				>
					Choose File
				</label>
				<input
					id="file-upload"
					type="file"
					accept="image/*"
					onChange={handleFileChange}
					className="hidden"
					aria-label="Upload profile image"
				/>

				<div className="flex justify-center items-center mt-6 gap-5">
					<button
						onClick={() => {
							localStorage.setItem("profile-skip", "true");
							router.push(`/home`);
						}}
						className="text-gray-600 cursor-pointer hover:text-gray-800 hover:underline text-sm sm:text-base transition"
					>
						Skip
					</button>

					<Button
						onClick={handleSubmit}
						disabled={loading}
						className="px-6 py-2 cursor-pointer text-white font-semibold rounded-xl bg-[#FAA21B] hover:bg-[#fa921b] transition disabled:opacity-70 disabled:cursor-not-allowed"
					>
						{loading ? (
							<div className="flex justify-center items-center">
								<span className="pr-2">Uploading...</span>
								<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
							</div>
						) : (
							"Upload"
						)}
					</Button>
				</div>
			</div>

			<style jsx>{`
        @keyframes float-slow {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(30px, -30px) rotate(120deg);
          }
          66% {
            transform: translate(-20px, 20px) rotate(240deg);
          }
        }

        @keyframes float-medium {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(-40px, -20px) rotate(180deg);
          }
        }

        @keyframes float-fast {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(20px, -25px) scale(1.1);
          }
          50% {
            transform: translate(-15px, -10px) scale(0.9);
          }
          75% {
            transform: translate(-25px, 15px) scale(1.05);
          }
        }

        @keyframes particle-float {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-30px) translateX(20px) scale(1.2);
            opacity: 1;
          }
        }

        .animate-float-slow {
          animation: float-slow 15s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-medium 12s ease-in-out infinite;
        }
        .animate-float-fast {
          animation: float-fast 8s ease-in-out infinite;
        }
        .animate-particle-float {
          animation: particle-float linear infinite;
        }
      		`}</style>
		</div>
	);
}
