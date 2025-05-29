"use client";

import api, { ADD_USERNAME_URL } from "@/apis/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import MainLoader from "@/components/universalcomps/mainloader";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import useProfileRedirect from "../useProfileRedirect";
import { UserCircle } from "lucide-react";

export default function UsernameChooser() {
  const { loader, setLoader } = useProfileRedirect();

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
        toast.success("UserName Added");
        setLoader(true);
        localStorage.setItem("username", response.data.data);
        router.push("/auth/forte");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);

      const err = error as AxiosError<{ msg: string }>;

      if (err.response) {
        const { status, data } = err.response;

        if (status === 409) {
          toast.error(data.msg);
        } else {
          toast.error("Something went wrong. Try Again!");
        }
      } else {
        toast.error("Something went wrong. Try Again!");
      }
    } finally {
      setError("");
      setLoading(false);
    }
  };

  if (loader) {
    return <MainLoader />;
  }

  return (
    <div className="flex justify-center font-sans items-center min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-orange-200/30 to-yellow-200/20 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-l from-amber-200/25 to-orange-100/15 rounded-full blur-3xl animate-float-medium"></div>
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-gradient-to-br from-yellow-300/20 to-orange-200/10 rounded-full blur-2xl animate-float-fast"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-orange-400/40 rounded-full animate-particle-float"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + Math.sin(i) * 30}%`,
              animationDelay: `${i * 1.2}s`,
              animationDuration: `${4 + (i % 3)}s`,
            }}
          ></div>
        ))}
      </div>

      <Card className="w-full max-w-md shadow-2xl border border-orange-100/50 rounded-2xl backdrop-blur-sm bg-white/95 relative z-10 transform transition-all duration-300 hover:shadow-3xl hover:scale-[1.02]">
        {/* Card glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-orange-400/20 to-yellow-400/20 rounded-2xl blur opacity-75 animate-pulse"></div>

        <CardContent className="p-8 relative">
          {/* Header with icon */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg transform transition-transform hover:scale-110">
             <UserCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
              Choose your username
            </h2>
            <p className="text-gray-500 text-sm">
              Pick a unique name that represents you
            </p>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <Input
                type="text"
                value={username}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                onChange={(e) => {
                  setError("");
                  setUsername(e.target.value);
                }}
                placeholder="Enter your username"
                className={`mb-2 rounded-xl border-2 transition-all duration-300 py-3 px-4 text-gray-700 placeholder-gray-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 hover:border-orange-300 ${
                  error
                    ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                    : "border-gray-200"
                }`}
              />
              {/* Input decoration */}
              <div className="absolute right-3 top-3 text-gray-400">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </div>
            </div>

            {error && (
              <div className="flex items-center space-x-2 text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-200 animate-shake">
                <svg
                  className="w-4 h-4 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <p>{error}</p>
              </div>
            )}

            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full mt-6 cursor-pointer bg-gradient-to-r from-[#FAA21B] to-[#fa921b] hover:from-[#fa921b] hover:to-[#f8821b] text-white font-semibold py-3 px-6 rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex justify-center items-center space-x-2">
                  <span>Saving</span>
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-white rounded-full animate-bounce"></div>
                    <div className="w-1 h-1 bg-white rounded-full animate-bounce delay-100"></div>
                    <div className="w-1 h-1 bg-white rounded-full animate-bounce delay-200"></div>
                  </div>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <span>Save Username</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}
            </Button>
          </div>

          {/* Bottom decoration */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-400">
              Your username will be visible to other users
            </p>
          </div>
        </CardContent>
      </Card>

      <style jsx>{`
        @keyframes float-slow {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(30px, -30px) rotate(120deg);
          }
          66% {
            transform: translate(-20px, 20px) rotate(240deg);
          }
        }

        @keyframes float-medium {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(-40px, -20px) rotate(180deg);
          }
        }

        @keyframes float-fast {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(20px, -25px) scale(1.1);
          }
          50% {
            transform: translate(-15px, -10px) scale(0.9);
          }
          75% {
            transform: translate(-25px, 15px) scale(1.05);
          }
        }

        @keyframes particle-float {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-30px) translateX(20px) scale(1.2);
            opacity: 1;
          }
        }

        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }

        .animate-float-slow {
          animation: float-slow 15s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-medium 12s ease-in-out infinite;
        }
        .animate-float-fast {
          animation: float-fast 8s ease-in-out infinite;
        }
        .animate-particle-float {
          animation: particle-float linear infinite;
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
}
