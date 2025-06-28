"use client";

import api from '@/apis/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Left from '@/components/universalcomps/left';
import { useState } from 'react';
import toast from 'react-hot-toast';

const ForgotPage = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            toast.error("All fields are required");
            return;
        }
        setLoading(true);
        try {
            const { data } = await api.post(`/public/password/forgot`, { email });
            toast.success(data?.msg || "Successfully Sent Reset Email");
        } catch (error) {
            console.log(error);
            toast.error("Failed to Send Reset Email");
        } finally {
            setLoading(false);
            setEmail("");
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
                            Forgot Password
                        </h2>
                    </div>

                    {/* Inputs */}
                    <div className="mt-12 w-full space-y-6">
                        <div
                            className={`w-full flex flex-col px-3 justify-center items-start gap-1`}
                        >
                            <label
                                htmlFor="email"
                                className="text-[rgba(172,82,9,1)] font-semibold"
                            >
                                Email
                            </label>
                            <Input
                                id="email"
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                name="email"
                                value={email}
                                placeholder={`Enter Your Eamil`}
                                className="rounded-full border-black placeholder:text-gray-600 px-5 h-14 focus-visible:ring-orange-500"
                            />
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

export default ForgotPage;