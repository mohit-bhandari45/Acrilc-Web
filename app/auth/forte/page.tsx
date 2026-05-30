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

	if (userLoading || (user && user?.preferences && user.preferences.length > 0)) {
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

	const handleSaveFortes = async () => {
		if (!user) return;
		setLoading(true);
		try {
			const res = await api.post(FORTE_URL, { preferences: selected });
			if (res.status === 200) {
				const updatedUser = { ...user, preferences: res.data.data };
				dispatch(setUser(updatedUser));
				toast.success("Forte Added");
				router.replace("/auth/profile-pic");
			}
		} catch (error) {
			console.log(error);
			toast.error("Something went wrong. Try Again!");
		} finally {
			setLoading(false);
		}
	};

	const remaining = 4 - selected.length;

	return (
		<div className="relative isolate flex min-h-screen items-start justify-center overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(226,114,91,0.14),_transparent_34%),linear-gradient(180deg,_#fbf7f2_0%,_#f2e7dc_100%)] px-4 py-10">
			<div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#E2725B]/12 blur-3xl" />
			<div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-[#D4A373]/15 blur-3xl" />
			<div className="absolute inset-0 pointer-events-none bg-[linear-gradient(135deg,rgba(255,255,255,0.32)_0%,transparent_45%,rgba(255,255,255,0.18)_100%)]" />

			<div className="relative z-10 w-full max-w-4xl">
				<div className="mb-6 text-center">
					<span className="font-poppins text-3xl font-bold text-[#5e3c2f]">acrilc</span>
				</div>

				<div className="w-full rounded-[2rem] border border-white/70 bg-white/72 px-6 py-8 shadow-[0_24px_80px_rgba(89,59,43,0.18)] backdrop-blur-2xl sm:px-8">
					<div className="mb-7 flex flex-col items-center text-center">
						<div className="mb-1 inline-flex items-center rounded-full border border-[#ebd9ca] bg-white/75 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8f6c57] shadow-sm">
							Tell us about yourself
						</div>
						<h1 className="font-playfair text-2xl font-bold text-[#5e3c2f] md:text-3xl">
							Select Your Fortes
						</h1>
						<p className="mt-1.5 text-xs leading-5 text-[#7d6152] sm:text-sm">
							Choose up to 4 that best represent your creative style.
						</p>
					</div>

					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
						{PREFERENCE_ENUM.map((forte) => {
							const isSelected = selected.includes(forte);
							const isDisabled = selected.length >= 4 && !isSelected;
							return (
								<button
									key={forte}
									onClick={() => toggleSelection(forte)}
									disabled={isDisabled}
									className={cn(
										"rounded-full border px-4 py-2.5 text-sm font-medium text-center transition-all duration-200 cursor-pointer",
										isSelected
											? "bg-[#f5e2d8] border-[#834C3D] text-[#834C3D] shadow-sm ring-2 ring-[#834C3D]/20"
											: "bg-white/80 border-[#ead7c9] text-[#5e3c2f] hover:border-[#c98d68] hover:bg-[#fff7f2]",
										isDisabled && "opacity-40 cursor-not-allowed"
									)}
								>
									{forte}
								</button>
							);
						})}
					</div>

					<p className="mt-5 text-center text-xs text-[#9a8578]">
						{selected.length === 4
							? "Maximum fortes selected."
							: `${remaining} selection${remaining !== 1 ? "s" : ""} remaining`}
					</p>

					<div className="mt-6 flex justify-center">
						<Button
							onClick={handleSaveFortes}
							disabled={selected.length === 0 || loading}
							className="h-12 w-full max-w-xs cursor-pointer rounded-full border border-[#8f5b42]/10 bg-[linear-gradient(135deg,#834C3D_0%,#a8664f_55%,#d38d67_100%)] text-base font-semibold text-white shadow-[0_16px_30px_rgba(131,76,61,0.28)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_34px_rgba(131,76,61,0.34)] disabled:cursor-not-allowed disabled:opacity-70"
						>
							{loading ? (
								<div className="flex items-center gap-2">
									<span>Saving...</span>
									<div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
								</div>
							) : (
								"Continue"
							)}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
