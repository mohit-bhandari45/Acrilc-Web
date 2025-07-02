"use client";

import api, { FORTE_URL } from "@/apis/api";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PREFERENCE_ENUM } from "./data";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import MainLoader from "@/components/universalcomps/mainloader";
import { setUser } from "@/store/features/userSlice";

export default function FortePage() {
	const [selected, setSelected] = useState<string[]>([]);
	const router = useRouter();
	const [loading, setLoading] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const { user, loading: userLoading } = useAppSelector(state => state.userReducer);

	useEffect(() => {
		if (!userLoading && user?.preferences && user.preferences.length > 0) {
			router.replace("/home");
		}
	}, [userLoading, user, router]);

	if (userLoading || (user && (user?.preferences && user.preferences.length > 0))) {
		return <MainLoader msg="Loading, please wait" />;
	}

	if (user?.preferences && user.preferences.length > 0) {
		return null;
	}

	const toggleSelection = (forte: string) => {
		if (selected.includes(forte)) {
			setSelected((prev) => prev.filter((item) => item !== forte));
		} else if (selected.length < 5) {
			setSelected((prev) => [...prev, forte]);
		}
	};

	const handleUpload = async () => {
		if (!user) {
			return;
		}
		setLoading(true);
		try {
			const res = await api.post(FORTE_URL, { preferences: selected });
			if (res.status === 200) {
				const updatedUser = {
					...user,
					preferences: res.data.data
				};
				dispatch(setUser(updatedUser));
				toast.success("Forte Added");
				router.push("/auth/profile-pic");
			}
		} catch (error) {
			console.log(error)
			toast.error("Something went wrong. Try Again!");
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

			{/* Subtle noise layer */}
			<div className="absolute inset-0 bg-[url('/noise.svg')] opacity-10 z-0 pointer-events-none" />

			{/* Main content card */}
			<div className="max-w-6xl mx-auto px-4 py-12 w-full z-10 font-[Helvetica]">
				{/* Header */}
				<div className="text-center mb-10">
					<h1 className="text-3xl md:text-4xl font-bold text-gray-800">
						Select Your Fortes <span className="text-[#FF7A00]">(max 4)</span>
					</h1>
					<p className="mt-2 text-sm text-gray-500">
						Choose the qualities that best represent you.
					</p>
				</div>

				{/* Forte Selection Grid */}
				<div className="bg-[#fafafa44] p-6 rounded-3xl shadow-md w-full">
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
						{PREFERENCE_ENUM.map((forte) => {
							const isSelected = selected.includes(forte);
							const isDisabled = selected.length >= 4 && !isSelected;
							return (
								<button
									key={forte}
									onClick={() => toggleSelection(forte)}
									className={cn(
										"rounded-lg border cursor-pointer text-sm px-4 py-3 font-medium text-center transition-all duration-200 ease-in-out",
										isSelected
											? "bg-[#FFE9D6] text-[#FF7A00] border-[#FF7A00] shadow-sm ring-2 ring-[#FF7A00]/50"
											: "bg-white text-gray-700 border-gray-300 hover:border-[#FF7A00] hover:shadow-sm",
										isDisabled && "opacity-50 cursor-not-allowed"
									)}
									disabled={isDisabled}
								>
									{forte}
								</button>
							);
						})}
					</div>

					{/* Helper Text */}
					<p className="text-xs text-gray-500 mt-4 text-center">
						{selected.length === 4
							? "You've selected the maximum number of fortes."
							: `${4 - selected.length} selection${4 - selected.length > 1 ? "s" : ""
							} remaining`}
					</p>
				</div>

				{/* Navigation Button */}
				<div className="mt-12 flex justify-center">
					<Button
						className={cn(
							"bg-[#FAA21B] hover:bg-[#fa921b] text-white font-semibold cursor-pointer px-8 py-3 rounded-xl transition shadow-md hover:shadow-lg",
							(selected.length === 0 || loading) &&
							"opacity-50 cursor-not-allowed"
						)}
						disabled={selected.length === 0 || loading}
						onClick={handleUpload}
					>
						{loading ? (
							<div className="flex items-center gap-2">
								<div>Adding...</div>
								<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
							</div>
						) : (
							"Add"
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

        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
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
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
		</div>
	);
}
