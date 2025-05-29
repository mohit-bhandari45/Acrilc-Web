"use client";
import React, { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";

const MainLoader = () => {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "." : prev + "."));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center relative overflow-hidden transition-colors duration-500">
      {/* Moving background layers */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-yellow-100 to-orange-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
        
        {/* Moving gradient layer 1 */}
        <div className="absolute inset-0 bg-gradient-to-tl from-orange-200/50 via-yellow-200/30 to-white/40 dark:from-gray-700/50 dark:via-gray-600/30 dark:to-gray-800/40 animate-gradient-move"></div>
        
        {/* Moving gradient layer 2 */}
        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-200/40 via-orange-100/50 to-yellow-50/60 dark:from-gray-600/40 dark:via-gray-700/50 dark:to-gray-800/60 animate-gradient-move-reverse"></div>
      </div>

      {/* Floating orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-96 h-96 bg-gradient-radial from-orange-300/20 to-transparent rounded-full animate-float-slow -top-48 -left-48"></div>
        <div className="absolute w-80 h-80 bg-gradient-radial from-yellow-300/15 to-transparent rounded-full animate-float-medium -bottom-40 -right-40"></div>
        <div className="absolute w-64 h-64 bg-gradient-radial from-orange-200/25 to-transparent rounded-full animate-float-fast top-1/3 -right-32"></div>
        <div className="absolute w-72 h-72 bg-gradient-radial from-yellow-200/20 to-transparent rounded-full animate-float-medium-reverse bottom-1/4 -left-36"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        <HashLoader color="#FAA21B" size={180} speedMultiplier={1.1} />
        <p className="mt-4 text-gray-800 dark:text-gray-200 text-lg font-medium animate-pulse">
          Loading, please wait{dots}
        </p>
      </div>

      <style jsx>{`
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-from), var(--tw-gradient-to));
        }

        @keyframes gradient-move {
          0% { transform: translateX(-20%) translateY(-20%) rotate(0deg); }
          25% { transform: translateX(20%) translateY(-30%) rotate(90deg); }
          50% { transform: translateX(-30%) translateY(20%) rotate(180deg); }
          75% { transform: translateX(30%) translateY(30%) rotate(270deg); }
          100% { transform: translateX(-20%) translateY(-20%) rotate(360deg); }
        }

        @keyframes gradient-move-reverse {
          0% { transform: translateX(20%) translateY(20%) rotate(0deg); }
          25% { transform: translateX(-30%) translateY(30%) rotate(-90deg); }
          50% { transform: translateX(30%) translateY(-20%) rotate(-180deg); }
          75% { transform: translateX(-20%) translateY(-30%) rotate(-270deg); }
          100% { transform: translateX(20%) translateY(20%) rotate(-360deg); }
        }

        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(40px, -30px) scale(1.1); }
          50% { transform: translate(-30px, -50px) scale(0.9); }
          75% { transform: translate(-50px, 30px) scale(1.05); }
        }

        @keyframes float-medium {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-35px, 45px) scale(1.15); }
          66% { transform: translate(50px, -25px) scale(0.85); }
        }

        @keyframes float-fast {
          0%, 100% { transform: translate(0, 0) scale(1); }
          20% { transform: translate(30px, -40px) scale(1.2); }
          40% { transform: translate(-45px, -15px) scale(0.8); }
          60% { transform: translate(25px, 35px) scale(1.1); }
          80% { transform: translate(-20px, -25px) scale(0.9); }
        }

        @keyframes float-medium-reverse {
          0%, 100% { transform: translate(0, 0) scale(1); }
          30% { transform: translate(40px, -35px) scale(0.9); }
          70% { transform: translate(-30px, 40px) scale(1.1); }
        }

        .animate-gradient-move {
          animation: gradient-move 15s ease-in-out infinite;
        }

        .animate-gradient-move-reverse {
          animation: gradient-move-reverse 18s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 12s ease-in-out infinite;
        }

        .animate-float-medium {
          animation: float-medium 8s ease-in-out infinite;
        }

        .animate-float-fast {
          animation: float-fast 6s ease-in-out infinite;
        }

        .animate-float-medium-reverse {
          animation: float-medium-reverse 10s ease-in-out infinite reverse;
        }
      `}</style>
    </div>
  );
};

export default MainLoader;