"use client";

import api, { ADD_USERNAME_URL } from "@/apis/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setUser } from "@/store/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import MainLoader from "@/components/universalcomps/mainloader";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function UsernameChooser() {
	const [username, setUsername] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState<boolean>(false);
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { user, loading: userLoading } = useAppSelector(state => state.userReducer);

	useEffect(() => {
		if (!userLoading && user?.username) {
			router.replace("/home");
		}
	}, [userLoading, user, router]);

	if (userLoading) {
		return <MainLoader msg="Loading, please wait" />;
	}

	if (user?.username) {
		return null;
	}

	const handleSubmit = async () => {
		if (!user) return;

		const clean = username.replace(/\s+/g, "");
		if (!clean) {
			setError("Username cannot be empty.");
			return;
		}
		setLoading(true);
		
		try {
			const response = await api.post(ADD_USERNAME_URL, { username: clean });
			const updatedUser = { ...user, username: clean };
			if (response.status === 200) {
				toast.success("UserName Added");
				dispatch(setUser(updatedUser));
				localStorage.setItem("username", response.data.data);
				router.replace("/auth/forte");
			}
		} catch (error) {
			const err = error as AxiosError<{ msg: string }>;
			if (err.response) {
				const { status, data } = err.response;
				if (status === 409) toast.error(data.msg);
			} else {
				toast.error("Something went wrong. Try Again!");
			}	
		} finally {
			setError("");
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

				<div className="w-full rounded-[2rem] border border-white/70 bg-white/72 px-6 py-7 shadow-[0_24px_80px_rgba(89,59,43,0.18)] backdrop-blur-2xl sm:px-8 sm:py-8">
					<div className="mb-5 flex flex-col items-center text-center">
						<div className="mb-1 inline-flex items-center rounded-full border border-[#ebd9ca] bg-white/75 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8f6c57] shadow-sm">
							One last step
						</div>
						<h1 className="font-playfair text-2xl font-bold text-[#5e3c2f] md:text-3xl">
							Choose your username
						</h1>
						<p className="mt-1.5 max-w-xs text-xs leading-5 text-[#7d6152] sm:text-sm">
							Pick a unique name that represents you on Acrilc.
						</p>
					</div>

					<div className="flex flex-col gap-1 px-1 sm:px-2">
						<label className="px-3 text-sm font-semibold tracking-wide text-[#765240]">
							Username
						</label>
						<Input
							type="text"
							value={username}
							onKeyDown={(e) => {
								if (e.key === "Enter") { e.preventDefault(); handleSubmit(); }
							}}
							onChange={(e) => { setError(""); setUsername(e.target.value); }}
							placeholder="Enter your username"
							className="h-12 rounded-full border-[#ead7c9] bg-white/90 px-5 text-[15px] shadow-[0_8px_20px_rgba(89,59,43,0.06)] placeholder:text-[#9a8578] focus-visible:border-[#c98d68] focus-visible:ring-2 focus-visible:ring-[#e8b08f]/30"
						/>
						<p className="h-4 overflow-hidden px-3 pt-0.5 text-xs text-[#c94f3b] truncate">
							{error || ""}
						</p>
					</div>

					<div className="mt-4 px-1 sm:px-2">
						<Button
							onClick={handleSubmit}
							disabled={loading}
							className="h-12 w-full cursor-pointer rounded-full border border-[#8f5b42]/10 bg-[linear-gradient(135deg,#834C3D_0%,#a8664f_55%,#d38d67_100%)] text-base font-semibold text-white shadow-[0_16px_30px_rgba(131,76,61,0.28)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_34px_rgba(131,76,61,0.34)] disabled:cursor-not-allowed disabled:opacity-70"
						>
							{loading ? (
								<div className="flex items-center gap-2">
									<span>Saving...</span>
									<div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
								</div>
							) : (
								"Save Username"
							)}
						</Button>
					</div>

					<p className="mt-4 text-center text-xs text-[#9a8578]">
						Your username will be visible to other users on Acrilc.
					</p>
				</div>
			</div>
		</div>
	);
}
