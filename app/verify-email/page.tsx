"use client";

import api, { VERIFY_EMAIL } from "@/apis/api"; // your Axios instance
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const VerifyEmailPage = () => {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setMessage("Invalid or missing token.");
      setLoading(false);
      return;
    }

    const verify = async () => {
      try {
        console.log(`${VERIFY_EMAIL}?token=${token}`);
        const res = await api.get(`${VERIFY_EMAIL}?token=${token}`);
        toast.success("Email successfully verified!");
        setMessage("✅ Email updated successfully.");
        if(res.status===200){
            window.location.href = "/settings/account";
        }
      } catch (err) {
        console.error(err);
        setMessage("❌ Failed to verify email.");
        toast.error("Verification failed.");
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [searchParams]);

  return (
    <div className="max-w-lg mx-auto mt-20 text-center">
      {loading ? <p>Verifying...</p> : <p>{message}</p>}
    </div>
  );
};

export default VerifyEmailPage;
