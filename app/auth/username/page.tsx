"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import api, { ADD_USERNAME_URL } from "@/apis/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import useProfileRedirect from "../useProfileRedirect";
import { HashLoader } from "react-spinners";

export default function UsernameChooser() {
  const [loader, setLoader] = useState<boolean>(true);
  useProfileRedirect({ setLoader });

  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!username.trim()) {
      setError("Username cannot be empty.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post(ADD_USERNAME_URL, { username: username });

      if (response.status === 200) {
        router.push("/auth/forte");

        toast.success("UserName Added");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.msg);
    }

    setError("");
    setLoading(false);
  };

  if (loader) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <HashLoader color="#FAA21B" size={200} />
      </div>
    );
  }

  if (!loader) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4 font-[Helvetica]">
        <Card className="w-full max-w-md shadow-lg border border-gray-200 rounded-2xl">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
              Choose your username
            </h2>

            <Input
              type="text"
              value={username}
              onChange={(e) => {
                setError("");
                setUsername(e.target.value);
              }}
              placeholder="Enter your username"
              className={`mb-2 ${error ? "border-red-500" : ""}`}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button
              onClick={handleSubmit}
              className="w-full mt-4 bg-[#FDBA2D] cursor-pointer hover:bg-[#f8a90a] text-white"
            >
              {loading ? (
                <div className="flex justify-center items-center">
                <div className="pr-1">Saving...</div>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              </div>
              ) : (
                "Save Username"
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
}
