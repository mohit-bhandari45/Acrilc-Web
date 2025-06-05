"use client";

import { Clock, Rocket, Sparkles, Star } from "lucide-react";
import React, { useEffect, useState } from "react";

const ComingSoonPage: React.FC = () => {
//   const [email, setEmail] = useState<string>("");
//   const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
//   const [timeLeft, setTimeLeft] = useState<TimeLeft>({
//     days: 0,
//     hours: 0,
//     minutes: 0,
//     seconds: 0,
//   });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Countdown timer (set to 30 days from now)
//   useEffect(() => {
//     const targetDate = new Date();
//     targetDate.setDate(targetDate.getDate() + 30);

//     const timer = setInterval(() => {
//       const now = new Date().getTime();
//       const distance = targetDate.getTime() - now;

//       const days = Math.floor(distance / (1000 * 60 * 60 * 24));
//       const hours = Math.floor(
//         (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//       );
//       const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//       const seconds = Math.floor((distance % (1000 * 60)) / 1000);

//       setTimeLeft({ days, hours, minutes, seconds });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

  // Mouse tracking for interactive background
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

//   const handleEmailSubmit = () => {
//     if (email) {
//       setIsSubscribed(true);
//       setEmail("");
//     }
//   };

  const FloatingIcon: React.FC<{
    icon: React.ReactNode;
    delay: string;
    duration: string;
  }> = ({ icon, delay, duration }) => (
    <div
      className={`absolute text-white/20 animate-pulse`}
      style={{
        animation: `float ${duration} ease-in-out infinite`,
        animationDelay: delay,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
    >
      {icon}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.1), transparent 40%)`,
          }}
        />

        {/* Floating icons */}
        <FloatingIcon icon={<Sparkles size={24} />} delay="0s" duration="3s" />
        <FloatingIcon icon={<Star size={20} />} delay="1s" duration="4s" />
        <FloatingIcon icon={<Rocket size={28} />} delay="2s" duration="3.5s" />
        <FloatingIcon
          icon={<Sparkles size={16} />}
          delay="0.5s"
          duration="2.5s"
        />
        <FloatingIcon icon={<Star size={32} />} delay="1.5s" duration="4.5s" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Logo/Brand placeholder */}
          <div className="mb-8 animate-pulse">
            <div className="w-20 h-20 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
              <Rocket className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Main heading with gradient text */}
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent animate-pulse">
            Coming Soon
          </h1>

          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            Something incredible is on the way. Get ready for an experience that
            will transform how you think about innovation.
          </p>

          {/* Countdown timer */}
          {/* <div className="grid grid-cols-4 gap-4 md:gap-8 mb-12 max-w-lg mx-auto">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Minutes", value: timeLeft.minutes },
              { label: "Seconds", value: timeLeft.seconds },
            ].map((item, index) => (
              <div
                key={item.label}
                className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-2xl md:text-4xl font-bold text-white mb-1">
                  {item.value.toString().padStart(2, "0")}
                </div>
                <div className="text-sm text-white/60 uppercase tracking-wide">
                  {item.label}
                </div>
              </div>
            ))}
          </div> */}

          {/* Email signup */}
          {/* <div className="max-w-md mx-auto mb-8">
            {!isSubscribed ? (
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-black/50 border-white/30 text-white placeholder:text-gray-400 backdrop-blur-md h-12 focus:border-white/60"
                  />
                </div>
                <Button
                  onClick={handleEmailSubmit}
                  className="bg-white text-black hover:bg-gray-200 px-6 h-12 font-semibold transform hover:scale-105 transition-all duration-200 border border-white/20"
                >
                  <Mail className="w-4 h-4 mr-2 text-black" />
                  Notify Me
                </Button>
              </div>
            ) : (
              <Alert className="bg-white/10 border-white/30 text-white backdrop-blur-md">
                <Mail className="h-4 w-4 text-white" />
                <AlertDescription className="text-gray-200">
                  Perfect! We'll notify you as soon as we launch. Get ready for
                  something amazing!
                </AlertDescription>
              </Alert>
            )}
          </div> */}

          {/* Social proof */}
          <div className="flex items-center justify-center gap-6 text-gray-400">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Launching Soon</span>
            </div>
            <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              <span className="text-sm">Premium Experience</span>
            </div>
            <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm">Innovation First</span>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for floating animation */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default ComingSoonPage;
