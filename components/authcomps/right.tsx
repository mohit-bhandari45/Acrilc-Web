"use client";

import api, { LOGIN_URL, SIGNUP_URL } from "@/apis/api";
import { ISignupDetails } from "@/types/types";
import { validateForm } from "@/utils/auth";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button } from "../ui/button";
import AuthHead from "../universalcomps/authhead";
import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/features/userSlice";
import { InputComp } from "./inputcomp";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/config/firebase";

interface RightProps {
	labels: string[];
	method: string;
}

const Right = ({ labels, method }: RightProps) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [formUser, setFormUser] = useState<ISignupDetails>({
		name: "",
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState<Partial<ISignupDetails>>({});
	const router = useRouter();
	const [visible, setVisible] = useState<boolean>(false);

	const dispatch = useAppDispatch();
	const searchParams = useSearchParams();
	const nextPath = searchParams.get('next') || '/home';

	const handleGoogleSignIn = async () => {
		const provider = new GoogleAuthProvider();
		try {
			const result = await signInWithPopup(auth, provider);
			const token = await result.user.getIdToken();
			const { data } = await api.post(`/auth/google`, { token: token });
			dispatch(setUser(data.user));
			toast.success("Logged In!");
			router.replace(nextPath);
		} catch (error) {
			console.log(error);
			toast.error("Something went wrong!!");
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const errors = validateForm(method, formUser);
		setErrors(errors);

		const wrong_form = Object.keys(errors).length === 0;
		if (!wrong_form) return;

		setLoading(true);
		try {
			const endpoint = method === "Login" ? LOGIN_URL : SIGNUP_URL;
			const data = method === "Login"
				? { email: formUser.email, password: formUser.password }
				: { fullName: formUser.name, email: formUser.email, password: formUser.password };

			const res = await api.post(endpoint, data);
			dispatch(setUser(res.data.data));
			router.replace(nextPath);
			toast.success(
				method === "Login" ? "Logged In Successfully" : "Account Created"
			);
		} catch (error) {
			const err = error as AxiosError<{ msg: string }>;
			if (err.response) {
				const { status, data } = err.response;
				if (status >= 400 && status < 500) toast.error(data.msg);
			} else {
				toast.error("Something went wrong. Try Again!");
			}
		} finally {
			setLoading(false);
			setFormUser({ name: "", email: "", password: "" });
		}
	};

	async function forgotPasswordHandler() {
		router.push("/auth/forgot");
	}

	return (
		<>
			<div className="relative w-full lg:w-[50%] h-full flex justify-center items-center flex-col p-4 overflow-hidden">
				<form
					onSubmit={handleSubmit}
					className="w-full max-w-md h-full flex flex-col justify-center items-center"
				>
					{/* Header */}
					<AuthHead />

					{/* Inputs */}
					<div className="w-full space-y-6">
						{labels.map((label) => {
							const fieldName = label.toLowerCase() as keyof ISignupDetails;
							return (
								<div key={label} className="relative w-full">
									<InputComp
										label={label}
										height="h-[60%]"
										width="w-full"
										user={formUser}
										setFormUser={setFormUser}
										type={
											fieldName === "password" && !visible ? "password" : "text"
										}
									/>

									{/* Eye Icon Toggle for Password Field */}
									{fieldName === "password" && (
										<div
											className="absolute right-8 top-14 transform -translate-y-1/2 cursor-pointer text-gray-600"
											onClick={() => setVisible(!visible)}
										>
											{visible ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
										</div>
									)}

									{errors[fieldName] && (
										<p className="mt-1 text-sm text-red-600 px-3">
											{errors[fieldName]}
										</p>
									)}
								</div>
							);
						})}
					</div>

					{/* Submit Button */}
					<div className="w-full mt-8">
						<div className="relative group w-full">
							<Button
								type="submit"
								disabled={loading}
								className="w-full text-white h-14 bg-[#834C3D] cursor-pointer hover:bg-[#6e3f32] rounded-full text-lg font-bold relative overflow-hidden"
							>
								{loading ? (
									<div className="flex items-center gap-2">
										<span>
											{method === "Login" ? "Logging in..." : "Signing Up..."}
										</span>
										<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
									</div>
								) : (
									method
								)}
							</Button>

							{/* Artistic Hover Text */}
							<div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
								<div className="bg-[#fff5e6] text-[#834C3D] text-sm px-4 py-1 rounded-full shadow-md font-medium flex items-center gap-2 animate-fade-in-up">
									<span>✨ Create Magic...</span>
									<span role="img" aria-label="palette">
										🎨
									</span>
								</div>
							</div>
						</div>
						{method === "Login" && (
							<div
								onClick={forgotPasswordHandler}
								className="relative right-0 group text-right pr-3 pt-1 hover:underline cursor-pointer text-sm"
							>
								Forget Password?
							</div>
						)}
					</div>

					{/* Auth Toggle */}
					<div className="mt-6 text-center">
						{method === "Login" ? (
							<div>
								Don&apos;t have an account?{" "}
								<Link href="/auth/signup" className="hover:underline">
									Sign up
								</Link>
							</div>
						) : (
							<div>
								Already have an account?{" "}
								<Link href="/auth/login" className="hover:underline">
									Log in
								</Link>
							</div>
						)}
					</div>
				</form>

				<div className='mt-8'>
					<button type="button" onClick={handleGoogleSignIn} className="w-full flex items-center justify-center px-6 py-3 mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
						<svg className="w-6 h-6 mx-2" viewBox="0 0 40 40">
							<path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107" />
							<path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00" />
							<path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50" />
							<path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2" />
						</svg>
						<span className="mx-2">{method === "Login" ? "Sign in" : "Sign up"} with Google</span>
					</button>
				</div>
			</div>
		</>
	);
};

export default Right;
