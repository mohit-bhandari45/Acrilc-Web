"use client";

import React, { useState } from "react";
import labels from "./data";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ISignupDetails } from "@/types/auth";
import axios from "axios";
import { SIGNUP_URL } from "@/apis/api";

interface InputProps {
  label: string;
  height: string;
  width: string;
  user: ISignupDetails;
  setUser: React.Dispatch<React.SetStateAction<ISignupDetails>>;
}

const InputComp = ({ label, height, width, user, setUser }: InputProps) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => {
      return { ...prevUser, [name]: value };
    });
  };

  return (
    <div
      className={`${width} ${height} flex flex-col px-3 justify-center items-start gap-1`}
    >
      <div className="text-[rgba(172,82,9,1)] font-semibold">{label}</div>
      <Input
        onChange={handleChange}
        name={label.toLowerCase()}
        placeholder="Enter Your Name"
        className="rounded-full h-[60%] border-black placeholder:text-gray-600 px-5"
      />
    </div>
  );
};

const Right = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<ISignupDetails>({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    console.log(user);
    if (user.email === "" || user.name === "" || user.password==="") {
      return;
    }
    
    // api call
    setLoading(true);
    const { name, ...rest } = user;
    const data = { fullName: name, ...rest };
    const res = await axios.post(SIGNUP_URL, data);

    if (res.status === 201) {
      localStorage.setItem("token", res.data.token);
    }else{
      console.log(res.data);
    }

    setUser({
      name: "",
      email: "",
      password: "",
    });
    setLoading(false);
  };

  return (
    <div className="w-[55%] h-full relative flex justify-center items-center flex-col">
      <div className="w-[70%] h-[80%] flex flex-col justify-center items-center">
        <div className="h-[20%] w-full heading flex justify-center items-center flex-col">
          <div className="head text-4xl font-bold text-[rgba(172,82,9,0.7)]">
            Welcome to Acrilc
          </div>
          <div className="head text-2xl font-bold text-[rgba(172,82,9,0.4)]">
            where artist grow
          </div>
        </div>

        {/* Inputs */}
        <div className="inputs w-full h-[60%] flex justify-center items-center flex-col">
          <div className="w-full h-[85%] flex justify-center items-center flex-col gap-2">
            {labels.map((label, idx) => {
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
                  <div className="font-bold text-md">Signing Up...</div>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <div className="font-bold text-lg">Sign Up</div>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Right;
