"use client";

import api, { LOGIN_URL, SIGNUP_URL } from "@/apis/api";
import { auth } from "@/config/firebase";
import { setUser } from "@/store/features/userSlice";
import { useAppDispatch } from "@/store/hooks";
import { ISignupDetails } from "@/types/types";
import { validateForm } from "@/utils/auth";
import { AxiosError } from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button } from "../ui/button";
import AuthHead from "../universalcomps/authhead";
import { InputComp } from "./inputcomp";

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
    const nextPath = searchParams.get("next") || (method === "Login" ? "/home" : "/auth/username");
    const signUpUrl = `/auth/signup?next=${encodeURIComponent(nextPath)}`;
    const signInUrl = `/auth/login?next=${encodeURIComponent(nextPath)}`;

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const token = await result.user.getIdToken();
            const { data } = await api.post(`/auth/google`, { token: token });
            dispatch(setUser(data.data));
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
            const data =
                method === "Login"
                    ? { email: formUser.email.trim(), password: formUser.password.trim() }
                    : {
                        fullName: formUser.name.trim(),
                        email: formUser.email.trim(),
                        password: formUser.password.trim(),
                    };

            const res = await api.post(endpoint, data);
            dispatch(setUser(res.data.data));
            router.replace(nextPath);
            toast.success(method === "Login" ? "Logged In Successfully" : "Account Created");
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
        <div className="relative isolate w-full lg:w-[50%] lg:h-screen flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(226,114,91,0.14),_transparent_34%),linear-gradient(180deg,_#fbf7f2_0%,_#f2e7dc_100%)] px-4 py-3 lg:py-4">
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#E2725B]/12 blur-3xl" />
            <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-[#D4A373]/15 blur-3xl" />
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(135deg,rgba(255,255,255,0.32)_0%,transparent_45%,rgba(255,255,255,0.18)_100%)]" />

            <div className="relative z-10 flex w-full max-w-lg flex-col items-center gap-3">
                <form
                    onSubmit={handleSubmit}
                    className="w-full rounded-[2rem] border border-white/70 bg-white/72 px-5 py-4 shadow-[0_24px_80px_rgba(89,59,43,0.18)] backdrop-blur-2xl sm:px-8 sm:py-5"
                >
                    <AuthHead />
                    <div className="mt-3 w-full space-y-2">
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
                                        type={fieldName === "password" && !visible ? "password" : "text"}
                                    />

                                    {fieldName === "password" && (
                                        <div
                                            className="absolute right-5 top-12 -translate-y-1/2 cursor-pointer rounded-full border border-[#ead8ca] bg-white/90 p-2 text-[#8a5d46] shadow-sm transition hover:border-[#d9b79d] hover:bg-[#fff7f0]"
                                            onClick={() => setVisible(!visible)}
                                        >
                                            {visible ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                        </div>
                                    )}

                                    <p className="h-4 overflow-hidden px-3 pt-0.5 text-xs text-[#c94f3b] truncate">
                                        {errors[fieldName] || ""}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-4 w-full">
                        <div className="group relative w-full">
                            <Button
                                type="submit"
                                disabled={loading}
                                className="h-12 w-full cursor-pointer rounded-full border border-[#8f5b42]/10 bg-[linear-gradient(135deg,#834C3D_0%,#a8664f_55%,#d38d67_100%)] text-base font-semibold text-white shadow-[0_16px_30px_rgba(131,76,61,0.28)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_34px_rgba(131,76,61,0.34)] disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {loading ? (
                                    <div className="flex items-center gap-2">
                                        <span>{method === "Login" ? "Logging in..." : "Signing Up..."}</span>
                                        <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                                    </div>
                                ) : (
                                    method
                                )}
                            </Button>

                            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                                <div className="flex items-center gap-2 rounded-full border border-[#efddcf] bg-[#fff7f1] px-3 py-1 text-xs font-medium text-[#834C3D] shadow-lg animate-fade-in-up">
                                    <span>Ready when you are</span>
                                    <span role="img" aria-label="palette">
                                        🎨
                                    </span>
                                </div>
                            </div>
                        </div>

                        {method === "Login" && (
                            <div
                                onClick={forgotPasswordHandler}
                                className="mt-1 cursor-pointer px-2 pt-1 text-right text-xs font-medium text-[#8a5d46] transition hover:text-[#6f4736] hover:underline"
                            >
                                Forgot password?
                            </div>
                        )}

                        <div className="mt-4 text-center text-xs text-[#7a5a49] sm:text-sm">
                            {method === "Login" ? (
                                <div className="flex flex-wrap items-center justify-center gap-2">
                                    <span>Don&apos;t have an account?</span>
                                    <Button
                                        type="button"
                                        onClick={() => router.push(signUpUrl)}
                                        className="h-auto cursor-pointer rounded-full border border-[#e0c8b8] bg-white/80 px-3 py-1 text-xs font-semibold text-[#834C3D] shadow-sm transition hover:border-[#cfa891] hover:bg-[#fff7f0]"
                                    >
                                        Sign up
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex flex-wrap items-center justify-center gap-2">
                                    <span>Already have an account?</span>
                                    <Button
                                        type="button"
                                        onClick={() => router.push(signInUrl)}
                                        className="h-auto cursor-pointer rounded-full border border-[#e0c8b8] bg-white/80 px-3 py-1 text-xs font-semibold text-[#834C3D] shadow-sm transition hover:border-[#cfa891] hover:bg-[#fff7f0]"
                                    >
                                        Log in
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </form>

                <div className="w-full rounded-[1.5rem] border border-white/70 bg-white/60 px-4 py-2.5 shadow-[0_12px_30px_rgba(89,59,43,0.12)] backdrop-blur-xl sm:px-6">
                    <div className="mb-1.5 text-center text-[10px] font-semibold uppercase tracking-[0.26em] text-[#8c6a57]">
                        Or continue with
                    </div>
                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="flex w-full items-center justify-center gap-2 rounded-full border border-[#ead7c9] bg-white px-4 py-2.5 text-sm font-semibold text-[#4b3428] shadow-[0_10px_24px_rgba(89,59,43,0.08)] transition duration-300 hover:-translate-y-0.5 hover:border-[#d6b59b] hover:bg-[#fff8f3]"
                    >
                        <svg className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 40 40" aria-hidden="true">
                            <circle cx="20" cy="20" r="18" fill="#fff" />
                            <path
                                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                                fill="#FFC107"
                            />
                            <path
                                d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                                fill="#FF3D00"
                            />
                            <path
                                d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                                fill="#4CAF50"
                            />
                            <path
                                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                                fill="#1976D2"
                            />
                        </svg>
                        <span>Continue with Google</span>
                    </button>
                </div>
            </div>
        </div>

    );
};

export default Right;
