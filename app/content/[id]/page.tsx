"use client";

import api, { GET_OWN_PROFILE, GET_POST } from "@/apis/api";
import PostDescription from "@/components/postcomps/postdescription";
import Navbar from "@/components/profilecomps/navbar";
import MainLoader from "@/components/universalcomps/mainloader";
import { setUser } from "@/store/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { IPost } from "@/types/types";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";

// Interactive Background Component
const InteractiveBackground = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [clicks, setClicks] = useState<Array<{ x: number, y: number, id: number }>>([]);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [hoverIntensity, setHoverIntensity] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      // Calculate hover intensity based on movement speed
      const speed = Math.sqrt(Math.pow(e.movementX, 2) + Math.pow(e.movementY, 2));
      setHoverIntensity(Math.min(speed / 10, 1));
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);
    
    const handleClick = (e: MouseEvent) => {
      const newClick = { x: e.clientX, y: e.clientY, id: Date.now() };
      setClicks(prev => [...prev, newClick]);
      
      // Remove click after animation
      setTimeout(() => {
        setClicks(prev => prev.filter(click => click.id !== newClick.id));
      }, 1000);
    };

    const handleScroll = () => setScrollY(window.scrollY);
    
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    // Initial size
    handleResize();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const generateParticles = useCallback(() => {
    return Array.from({ length: 30 }).map((_, i) => {
      const delay = Math.random() * 5;
      const duration = 4 + Math.random() * 3;
      const startX = Math.random() * windowSize.width;
      const startY = Math.random() * windowSize.height;
      
      return (
        <div
          key={i}
          className="absolute rounded-full animate-pulse"
          style={{
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            background: `rgba(255,122,0,${0.2 + Math.random() * 0.3})`,
            left: `${startX}px`,
            top: `${startY}px`,
            animation: `float ${duration}s ${delay}s infinite ease-in-out`,
            transform: `translate(${Math.sin(Date.now() * 0.001 + i) * 20}px, ${Math.cos(Date.now() * 0.001 + i) * 15}px)`,
          }}
        />
      );
    });
  }, [windowSize]);

  return (
    <>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          25% { transform: translateY(-20px) rotate(90deg); opacity: 0.7; }
          50% { transform: translateY(-10px) rotate(180deg); opacity: 1; }
          75% { transform: translateY(-15px) rotate(270deg); opacity: 0.5; }
        }
        
        @keyframes ripple {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(4); opacity: 0; }
        }
        
        @keyframes pulse-glow {
          0%, 100% { filter: brightness(1) blur(20px); }
          50% { filter: brightness(1.3) blur(25px); }
        }
        
        @keyframes wave {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100vw); }
        }
      `}</style>
      
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Dynamic Gradient Background */}
        <div 
          className="absolute inset-0 transition-all duration-700"
          style={{
            background: `
              radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, 
                rgba(255,122,0,${0.08 + hoverIntensity * 0.05}) 0%, 
                rgba(255,149,51,${0.03 + hoverIntensity * 0.02}) 25%, 
                rgba(255,186,102,0.01) 50%, 
                transparent 70%),
              linear-gradient(${mousePos.x / 10}deg, 
                rgba(255,122,0,0.03) 0%, 
                rgba(255,149,51,0.02) 50%, 
                rgba(255,186,102,0.01) 100%)
            `,
          }}
        />
        
        {/* Scroll-responsive wave effect */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `linear-gradient(${45 + scrollY * 0.1}deg, 
              transparent 48%, 
              rgba(255,122,0,0.1) 49%, 
              rgba(255,122,0,0.15) 50%, 
              rgba(255,122,0,0.1) 51%, 
              transparent 52%)`,
            transform: `translateY(${scrollY * -0.5}px)`,
          }}
        />
        
        {/* Interactive Floating Orbs */}
        <div className="absolute inset-0">
          {/* Large reactive orb */}
          <div 
            className="absolute rounded-full transition-all duration-300"
            style={{
              width: `${350 + hoverIntensity * 50}px`,
              height: `${350 + hoverIntensity * 50}px`,
              background: `radial-gradient(circle, 
                rgba(255,122,0,${0.12 + hoverIntensity * 0.08}) 0%, 
                rgba(255,122,0,${0.05 + hoverIntensity * 0.03}) 70%, 
                transparent 100%)`,
              filter: `blur(${20 + hoverIntensity * 10}px)`,
              transform: `translate(${mousePos.x * 0.03 + Math.sin(Date.now() * 0.001) * 10}px, ${mousePos.y * 0.03 + Math.cos(Date.now() * 0.001) * 8}px) ${isMouseDown ? 'scale(1.2)' : 'scale(1)'}`,
              top: '10%',
              left: '20%',
              animation: 'pulse-glow 4s ease-in-out infinite',
            }}
          />
          
          {/* Medium morphing orb */}
          <div 
            className="absolute rounded-full transition-all duration-500"
            style={{
              width: `${200 + Math.sin(Date.now() * 0.002) * 30}px`,
              height: `${200 + Math.cos(Date.now() * 0.002) * 30}px`,
              background: `radial-gradient(ellipse ${100 + hoverIntensity * 20}% ${100 - hoverIntensity * 10}%, 
                rgba(255,122,0,${0.15 + hoverIntensity * 0.1}) 0%, 
                rgba(255,122,0,${0.07 + hoverIntensity * 0.05}) 70%, 
                transparent 100%)`,
              filter: `blur(${15 + hoverIntensity * 8}px)`,
              transform: `translate(${mousePos.x * -0.02 + scrollY * 0.1}px, ${mousePos.y * -0.02 + Math.sin(Date.now() * 0.0015) * 15}px) rotate(${Date.now() * 0.01}deg)`,
              top: '55%',
              right: '15%',
              animationDelay: '1s',
            }}
          />
          
          {/* Small dancing orb */}
          <div 
            className="absolute rounded-full transition-all duration-700"
            style={{
              width: `${120 + Math.sin(Date.now() * 0.003) * 20}px`,
              height: `${120 + Math.cos(Date.now() * 0.003) * 20}px`,
              background: `radial-gradient(circle, 
                rgba(255,122,0,${0.18 + hoverIntensity * 0.12}) 0%, 
                rgba(255,122,0,${0.08 + hoverIntensity * 0.06}) 70%, 
                transparent 100%)`,
              filter: `blur(${12 + hoverIntensity * 6}px) hue-rotate(${Math.sin(Date.now() * 0.001) * 20}deg)`,
              transform: `translate(${mousePos.x * 0.015 + Math.sin(Date.now() * 0.002) * 25}px, ${mousePos.y * 0.015 + Math.cos(Date.now() * 0.0025) * 20}px)`,
              bottom: '25%',
              left: '12%',
              animationDelay: '2s',
            }}
          />
        </div>
        
        {/* Dynamic Particle System */}
        <div className="absolute inset-0 pointer-events-none">
          {generateParticles()}
        </div>
        
        {/* Click Ripple Effects */}
        {clicks.map(click => (
          <div
            key={click.id}
            className="absolute pointer-events-none"
            style={{
              left: click.x - 25,
              top: click.y - 25,
              width: '50px',
              height: '50px',
              border: '2px solid rgba(255,122,0,0.6)',
              borderRadius: '50%',
              animation: 'ripple 1s ease-out forwards',
            }}
          />
        ))}
        
        {/* Interactive Grid */}
        <div 
          className="absolute inset-0 transition-all duration-500"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,122,0,${0.05 + hoverIntensity * 0.03}) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,122,0,${0.05 + hoverIntensity * 0.03}) 1px, transparent 1px)
            `,
            backgroundSize: `${40 + hoverIntensity * 10}px ${40 + hoverIntensity * 10}px`,
            transform: `translate(${mousePos.x * 0.008 + scrollY * 0.02}px, ${mousePos.y * 0.008}px) rotate(${hoverIntensity * 2}deg)`,
            opacity: 0.3 + hoverIntensity * 0.2,
          }}
        />
        
        {/* Mouse Trail Effect */}
        <div
          className="absolute pointer-events-none transition-all duration-200"
          style={{
            width: `${60 + hoverIntensity * 40}px`,
            height: `${60 + hoverIntensity * 40}px`,
            background: `radial-gradient(circle, 
              rgba(255,122,0,${0.15 + hoverIntensity * 0.2}) 0%, 
              rgba(255,122,0,${0.05 + hoverIntensity * 0.1}) 30%,
              transparent 70%)`,
            left: mousePos.x - 30 - hoverIntensity * 20,
            top: mousePos.y - 30 - hoverIntensity * 20,
            filter: `blur(${8 + hoverIntensity * 12}px)`,
            transform: `scale(${isMouseDown ? 1.5 : 1})`,
          }}
        />
        
        {/* Breathing ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 50% 50%, 
              rgba(255,122,0,${0.02 + Math.sin(Date.now() * 0.002) * 0.01}) 0%, 
              transparent 70%)`,
            animation: 'pulse-glow 6s ease-in-out infinite',
            animationDelay: '1s',
          }}
        />
        
        {/* Velocity-based streaks */}
        {hoverIntensity > 0.3 && (
          <div
            className="absolute pointer-events-none"
            style={{
              width: `${hoverIntensity * 200}px`,
              height: '2px',
              background: `linear-gradient(90deg, 
                transparent 0%, 
                rgba(255,122,0,${hoverIntensity * 0.8}) 50%, 
                transparent 100%)`,
              left: mousePos.x - hoverIntensity * 100,
              top: mousePos.y,
              transform: `rotate(${Math.atan2(mousePos.y, mousePos.x) * 180 / Math.PI}deg)`,
              filter: `blur(${hoverIntensity * 3}px)`,
            }}
          />
        )}
      </div>
    </>
  );
};

const Post = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const params = useParams();
  const id = params.id;
  const [post, setPost] = useState<IPost | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await api.get(GET_OWN_PROFILE);

        if (response.status === 200) {
          dispatch(setUser(response.data.data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.status === 401) {
          // Note: localStorage usage preserved as in original code
          localStorage.removeItem("token");
          router.push("/auth/login");
        }
      }
    };

    getUser();
  }, [dispatch, router]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`${GET_POST}/${id}`);
        setPost(response.data.data);
      } catch (error) {
        if(error){
          router.push(`/profile/${user?.username}`);
        }
      }
    };

    getData();
  }, [id, router, user?.username]);

  if (!user) {
    return (
      <>
        <InteractiveBackground />
        <MainLoader msg="Loading, please wait"/>;
      </>
    );
  }

  return (
    <>
      <InteractiveBackground />
      <div className="font-[Helvetica] relative z-10">
        <Navbar currentUser={user} show={true} portfolio={false}/>
        <PostDescription post={post} user={user} />
      </div>
    </>
  );
};

export default Post;