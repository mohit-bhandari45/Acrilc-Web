"use client";

import { LOGIN_URL, SIGNUP_URL } from "@/apis/api";
import { ISignupDetails } from "@/types/types";
import { validateForm } from "@/utils/auth";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import AuthHead from "../universalcomps/authhead";

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

interface RightProps {
  labels: string[];
  method: string;
  setLoader: React.Dispatch<SetStateAction<boolean>>;
}

const Right = ({ labels, method, setLoader }: RightProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<ISignupDetails>({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<ISignupDetails>>({});
  const router = useRouter();
  const [visible, setVisible] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm(method, user);
    setErrors(errors);

    const wrong_form = Object.keys(errors).length === 0;
    if (!wrong_form) return;

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
        setLoader(true);

        if (method === "Login") {
          const d = res?.data?.data;
          if (!d) {
            console.error("No data returned from login response");
            return;
          }

          if (!d.username) {
            router.push("/auth/username");
          } else if (!d.preferences || d.preferences.length === 0) {
            router.push("/auth/forte");
          } else {
            const username = d.username;
            router.push(`/profile/${username}`);
          }
        } else {
          router.push("/auth/username");
        }

        toast.success(
          method === "Login" ? "Logged In Successfully" : "Account Created"
        );
      }
    } catch (error) {
      console.log(error);
      const err = error as AxiosError<{ msg: string }>;

      if (err.response) {
        const { status, data } = err.response;

        if (status >= 400 && status < 500) {
          toast.error(data.msg);
        } else {
          toast.error("Something went wrong. Try Again!");
        }
      } else {
        toast.error("Something went wrong. Try Again!");
      }
    } finally {
      setLoading(false);
      setUser({ name: "", email: "", password: "" });
    }
  };

  async function forgotPasswordHandler() {
    console.log("Forgot");
  }

  return (
    <>
      {/* <div className="absolute top-0 right-0 w-40 md:w-52 lg:w-96 z-10">
        <img
          src="https://i.ibb.co/2341zDqZ/image-removebg-preview-20-4.png"
          alt="Top Right Decoration"
          className="object-contain text-black filter invert"
        />
      </div>
      <div className="absolute bottom-0 left-0 w-28 md:w-36 lg:w-40 z-10">
        <img
          src="https://i.ibb.co/2341zDqZ/image-removebg-preview-20-4.png"
          alt="Bottom Left Decoration"
          className="object-contain text-black filter invert"
        />
      </div> */}
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
    </>
  );
};

export default Right;
