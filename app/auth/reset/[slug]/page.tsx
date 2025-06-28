"use client";

import api from '@/apis/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Left from '@/components/universalcomps/left';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ResetPage = () => {
    const params = useParams();
    const router = useRouter();

    const [password, setPassword] = useState({
        newPassword: "",
        confirmPassword: ""
    });

    const [visible, setVisible] = useState({
        newPassword: false,
        confirmPassword: false
    });

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!password.newPassword || !password.confirmPassword) {
            toast.error("All fields are required");
            return;
        }
        if (password.newPassword !== password.confirmPassword) {
            toast.error("Passwords Don't match");
            return;
        }
        setLoading(true);
        try {
            const { data } = await api.post(`/public/password/reset-password/${params.slug}`, { newPassword: password.newPassword });
            toast.success(data?.msg || "Successfully Reset Password, Login");
            router.push("/auth/login")
        } catch (error) {
            console.log(error);
            toast.error("Failed to reset password");
        } finally {
            setLoading(false);
            setPassword({
                newPassword: "", 
                confirmPassword: ""
            });
        }
    }

    return (
        <div className="flex flex-col lg:flex-row w-full min-h-screen font-[Helvetica] justify-center items-center">
            <Left />
            {/* <Right labels={signupLabels} method="Sign Up" /> */}
            <div className="relative w-full lg:w-[50%] h-full flex justify-center items-center flex-col p-4 overflow-hidden">
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-md h-full flex flex-col justify-center items-center"
                >
                    {/* Header */}
                    <div className="h-[20%] w-full flex justify-center items-center flex-col px-4">
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[rgba(172,82,9,0.7)]">
                            Welcome to Acrilc
                        </h1>
                        <h2 className="text-xl md:text-2xl lg:text-2xl font-bold text-[rgba(172,82,9,0.4)] mt-2">
                            Reset you Password
                        </h2>
                    </div>

                    {/* Inputs */}
                    <div className="mt-12 w-full space-y-6">
                        <div className="relative w-full">
                            <div
                                className={`w-full flex flex-col px-3 justify-center items-start gap-1`}
                            >
                                <label
                                    htmlFor="newPassword"
                                    className="text-[rgba(172,82,9,1)] font-semibold"
                                >
                                    New Password
                                </label>
                                <Input
                                    id="newPassword"
                                    type={visible.newPassword ? "text" : "password"}
                                    onChange={(e) => setPassword(p => ({ ...p, newPassword: e.target.value }))}
                                    name="newPassword"
                                    value={password.newPassword}
                                    placeholder={`Enter Your New Password`}
                                    className="rounded-full border-black placeholder:text-gray-600 px-5 h-14 focus-visible:ring-orange-500"
                                />
                                <div
                                    className="absolute right-8 top-14 transform -translate-y-1/2 cursor-pointer text-gray-600"
                                    onClick={() => setVisible(v => ({ ...v, newPassword: !v.newPassword }))}
                                >
                                    {visible.newPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                </div>
                            </div>
                        </div>

                        <div className="relative w-full">
                            <div
                                className={`w-full flex flex-col px-3 justify-center items-start gap-1`}
                            >
                                <label
                                    htmlFor="confirmPassword"
                                    className="text-[rgba(172,82,9,1)] font-semibold"
                                >
                                    Confirm Password
                                </label>
                                <Input
                                    id="confirmPassword"
                                    type={visible.confirmPassword ? "text" : "password"}
                                    onChange={(e) => setPassword(p => ({ ...p, confirmPassword: e.target.value }))}
                                    name="confirmPassword"
                                    value={password.confirmPassword}
                                    placeholder={`Enter Your Password Again`}
                                    className="rounded-full border-black placeholder:text-gray-600 px-5 h-14 focus-visible:ring-orange-500"
                                />
                                <div
                                    className="absolute right-8 top-14 transform -translate-y-1/2 cursor-pointer text-gray-600"
                                    onClick={() => setVisible(v => ({ ...v, confirmPassword: !v.confirmPassword }))}
                                >
                                    {visible.confirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="w-full mt-8">
                        <div className="relative select-none group w-full">
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full text-white h-14 bg-[#834C3D] cursor-pointer hover:bg-[#6e3f32] rounded-full text-lg font-bold relative overflow-hidden"
                            >
                                {loading ? "Hold on..." : "Submit"}
                            </Button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default ResetPage;