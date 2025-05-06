"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ISignupDetails } from "@/app/auth/auth";
import axios, { AxiosError } from "axios";
import { LOGIN_URL, SIGNUP_URL } from "@/apis/api";
import toast from "react-hot-toast";
import { emailCheck, passwordCheck } from "../../utils/authtest";
import Link from "next/link";
import AuthHead from "../universalcomps/authhead";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputProps {
  label: string;
  height: string;
  width: string;
  user: ISignupDetails;
  setUser: React.Dispatch<React.SetStateAction<ISignupDetails>>;
  type?: string;
}

const InputComp = ({
  label,
  user,
  width,
  setUser,
  type = "text",
}: InputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name.toLowerCase()]: value,
    }));
  };

  const fieldName = label.toLowerCase() as keyof ISignupDetails;

  return (
    <div
      className={`${width} flex flex-col px-3 justify-center items-start gap-1`}
    >
      <label
        htmlFor={fieldName}
        className="text-[rgba(172,82,9,1)] font-semibold"
      >
        {label}
      </label>
      <Input
        id={fieldName}
        onChange={handleChange}
        name={fieldName}
        value={user[fieldName] || ""}
        placeholder={`Enter Your ${label}`}
        className="rounded-full border-black placeholder:text-gray-600 px-5 h-14 focus-visible:ring-orange-500"
        type={type}
        autoComplete={fieldName === "password" ? "current-password" : fieldName}
      />
    </div>
  );
};

const Right = ({ labels, method }: { labels: string[]; method: string }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<ISignupDetails>({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<ISignupDetails>>({});
  const router = useRouter();
  const [visible, setVisible] = useState<boolean>(false);

  const validateForm = () => {
    const newErrors: Partial<ISignupDetails> = {};

    if (method !== "Login" && !user.name) {
      newErrors.name = "Name is required";
    }

    if (!user.email) {
      newErrors.email = "Email is required";
    } else if (!emailCheck(user.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!user.password) {
      newErrors.password = "Password is required";
    } else if (!passwordCheck(user.password)) {
      newErrors.password =
        "Password must be at least 8 characters with uppercase, lowercase, number, and special character";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const endpoint = method === "Login" ? LOGIN_URL : SIGNUP_URL;
      const data =
        method === "Login"
          ? { email: user.email, password: user.password }
          : { fullName: user.name, email: user.email, password: user.password };

      const res = await axios.post(endpoint, data);

      if (res.status === (method === "Login" ? 200 : 201)) {
        localStorage.setItem("token", res.data.token);
        toast.success(
          method === "Login" ? "Logged In Successfully" : "Account Created"
        );
        router.push(method === "Login" ? "/profile" : "/auth/forte");
      }
    } catch (error) {
      const err = error as AxiosError<{ msg: string }>;
      toast.error(err.response?.data?.msg || "An unexpected error occurred");
    } finally {
      setLoading(false);
      setUser({ name: "", email: "", password: "" });
    }
  };

  return (
    <div className="w-full lg:w-[55%] h-full flex justify-center items-center flex-col p-4">
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
                  user={user}
                  setUser={setUser}
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
          <Button
            type="submit"
            disabled={loading}
            className="w-full h-14 bg-[#834C3D] cursor-pointer hover:bg-[#6e3f32] rounded-full text-lg font-bold"
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
        </div>

        {/* Auth Toggle */}
        <div className="mt-6 text-center">
          {method === "Login" ? (
            <p>
              Don&apos;t have an account?{" "}
              <Link href="/auth/signup" className="hover:underline">
                Sign up
              </Link>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <Link href="/auth/login" className="hover:underline">
                Log in
              </Link>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Right;
