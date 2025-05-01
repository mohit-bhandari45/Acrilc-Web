"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ISignupDetails } from "@/types/auth";
import axios, { AxiosError } from "axios";
import { LOGIN_URL, SIGNUP_URL } from "@/apis/api";
import toast from "react-hot-toast";
import { emailCheck, passwordCheck } from "../../utils/authtest";
import Link from "next/link";
import AuthHead from "../universalcomps/authhead";
import { useRouter } from "next/navigation";

interface InputProps {
  label: string;
  height: string;
  width: string;
  user: ISignupDetails;
  setUser: React.Dispatch<React.SetStateAction<ISignupDetails>>;
}

const InputComp = ({ label, user, width, setUser }: InputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => {
      return { ...prevUser, [name]: value };
    });
  };

  return (
    <div
      className={`${width} flex flex-col px-3 justify-center items-start gap-1`}
    >
      <div className="text-[rgba(172,82,9,1)] font-semibold">{label}</div>
      <Input
        onChange={handleChange}
        name={label.toLowerCase()}
        value={user[label.toLowerCase() as keyof ISignupDetails]}
        placeholder={`Enter Your ${label}`}
        className="rounded-full border-black placeholder:text-gray-600 px-5 h-14"
      />
    </div>
  );
};

const Right = ({ labels, method }: { labels: string[]; method: string }) => {
  /* States */
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<ISignupDetails>({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  /* Methods */
  const handleSubmit = async () => {
    console.log(user);

    // checks
    if (!user.email || !user.password || (method !== "Login" && !user.name)) {
      toast.error("All fields are required.");
      return;
    }

    const mailCheck = emailCheck(user.email);
    if (!mailCheck) {
      toast.error("Invalid email");
      setUser((prevUser) => {
        return { ...prevUser, email: "" };
      });
      const passCheck = passwordCheck(user.password);
      if (!passCheck) {
        toast.error(
          "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
        );
        setUser((prevUser) => {
          return { ...prevUser, password: "" };
        });
      }
      return;
    }

    const passCheck = passwordCheck(user.password);
    if (!passCheck) {
      toast.error("Password must be at least 8 characters and include # or $.");
      setUser((prevUser) => {
        return { ...prevUser, password: "" };
      });
      return;
    }

    /* Login vs signup API calls*/
    if (method === "Login") {
      setLoading(true);
      let res;

      try {
        const data = {
          email: user.email,
          password: user.password,
        };
        res = await axios.post(LOGIN_URL, data);

        if (res.status === 200) {
          localStorage.setItem("token", res.data.token);
          router.push("/profile");

          setUser({
            name: "",
            email: "",
            password: "",
          });
          toast.success("Logged In");
        } else {
          toast.error("Server Error. Please try again!");
        }

        setLoading(false);
      } catch (error: unknown) {
        const err = error as AxiosError<{ msg: string }>;
        console.log(err);

        toast.error(err.response?.data?.msg || "Something went wrong.");

        setUser({
          name: "",
          email: "",
          password: "",
        });
        setLoading(false);
      }
    } else {
      setLoading(true);
      let res;

      try {
        const { name, ...rest } = user;
        const data = { fullName: name, ...rest };
        res = await axios.post(SIGNUP_URL, data);

        if (res.status === 201) {
          localStorage.setItem("token", res.data.token);
          router.push("/profile");
          setUser({
            name: "",
            email: "",
            password: "",
          });
          toast.success("Signed Up");
        } else {
          toast.error("Server Error. Please try again!");
        }

        setLoading(false);
      } catch (error: unknown) {
        const err = error as AxiosError<{ msg: string }>;
        console.log(err);

        toast.error(err.response?.data?.msg || "Something went wrong.");

        setUser({
          name: "",
          email: "",
          password: "",
        });
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-[55%] h-full relative flex justify-center items-center flex-col">
      <div className="w-[70%] h-[80%] flex flex-col justify-center items-center">
        {/* Header */}
        <AuthHead />

        {/* Inputs */}
        <div className="inputs w-full h-[60%] flex justify-center items-center flex-col">
          <div className="w-full h-[85%] flex justify-center items-center flex-col gap-4">
            {labels &&
              labels.map((label, idx) => {
                return (
                  <InputComp
                    key={idx}
                    label={label}
                    height="h-[60%]"
                    width="w-[90%]"
                    user={user}
                    setUser={setUser}
                  />
                );
              })}
          </div>
          <div className="w-[90%] h-[15%] px-3 mt-5">
            <Button
              onClick={handleSubmit}
              className="rounded-4xl w-full h-full bg-[#834C3D] cursor-pointer"
            >
              {loading ? (
                <div className="flex justify-center items-center gap-3">
                  <div className="font-bold text-md">
                    {method === "Login" ? "Logging in..." : "Signing Up..."}
                  </div>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <div className="font-bold text-lg">{method}</div>
              )}
            </Button>
          </div>
        </div>

        {/* More */}
        <div className="h-[10%] flex justify-center items-center gap-2">
          {method === "Login" ? (
            <>
              <div>Don&apos;t have an account?</div>
              <Link
                href={"/auth/signup"}
                className="underline underline-offset-2"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <div>Already have an account?</div>
              <Link
                href={"/auth/login"}
                className="underline underline-offset-2"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Right;
