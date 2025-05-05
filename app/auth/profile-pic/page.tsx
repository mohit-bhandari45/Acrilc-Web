"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api, { UPDATE_PROFILE_PIC } from "@/apis/api";
import toast from "react-hot-toast";

export default function ProfilePicPage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
      setToken(localStorage.getItem("token"));
    }, []);
  
    useEffect(() => {
      if (token) {
        router.push("/profile");
      }
    }, [token, router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      toast.error("Please select a profile picture.");
      return;
    }
    setLoader(true);

    const formData = new FormData();
    formData.append("profilePic", file);

    try {
      const res = await api.put(UPDATE_PROFILE_PIC, formData);

      if (res.status === 200) {
        toast.success("Profile Pic Added");
        router.push("/profile");
      } else {
        toast.error("Try Again");
      }
    } catch (err) {
      console.error(err);
    }
    setLoader(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9fafb] px-4 font-[Helvetica]">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Upload Profile Picture
        </h1>
        <p className="text-gray-500 mb-6">
          This will be displayed on your profile.
        </p>

        <div className="flex justify-center mb-6">
          <div className="w-32 h-32 rounded-full border-4 border-yellow-400 overflow-hidden">
            {preview ? (
              <img
                src={preview}
                alt="Profile Preview"
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-400">
                No Image
              </div>
            )}
          </div>
        </div>

        <label
          htmlFor="file-upload"
          className="cursor-pointer inline-block bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg font-medium transition"
        >
          Choose File
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <div className="flex justify-center items-center mt-5 gap-5">
          <button
            onClick={() => {
              router.push("/profile");
            }}
            className="text-gray-600 hover:underline text-base cursor-pointer"
          >
            Skip
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 cursor-pointer text-white font-semibold py-2  rounded-lg bg-yellow-600 hover:bg-yellow-700 transition"
          >
            {loader ? "Adding..." : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
}
