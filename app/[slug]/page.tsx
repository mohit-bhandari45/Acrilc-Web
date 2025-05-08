"use client";

import api, { GET_PORTFOLIO } from "@/apis/api";
import { FeaturedWorks } from "@/components/portfolio/featured";
import { FooterActions } from "@/components/portfolio/footeractionc";
import { ForteSection } from "@/components/portfolio/fortes";
import HeroSection from "@/components/portfolio/hero";
import { PartnershipsSection } from "@/components/portfolio/partners";
import PersonalPort from "@/components/portfolio/personalportfolio";
import { StorySection } from "@/components/portfolio/story";
import { IUser } from "@/store/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HashLoader } from "react-spinners";

const CustomPortfolio = () => {
  const params = useParams();
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const isSame = false;

  useEffect(() => {
    async function getUser() {
      try {
        const response = await api.get(`${GET_PORTFOLIO}?url=${params.slug}`);

        if (response.status === 200) {
          setUser(response.data.data);
        }
      } catch (error: unknown) {
        console.log(error);
        toast.error("Something went wrong. Try Again!");
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    if (params.slug) {
      getUser();
    }
  }, [params.slug]);

  
  if (loading || !user) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <HashLoader color="#FAA21B" size={200} />
      </div>
    );
  }
  
  const partnerships = [
    {
      id: "1",
      name: "Amazon",
      logo: "/api/placeholder/150/150",
      date: "Jan 1, 2022",
      rating: 5,
    },
    {
      id: "2",
      name: "Amazon",
      logo: "/api/placeholder/150/150",
      date: "Jan 1, 2022",
      rating: 5,
    },
    {
      id: "3",
      name: "Google",
      logo: "/api/placeholder/150/150",
      date: "Dec 15, 2021",
      rating: 4,
    },
    {
      id: "4",
      name: "Meta",
      logo: "/api/placeholder/150/150",
      date: "Nov 30, 2021",
      rating: 5,
    },
    {
      id: "5",
      name: "Meta",
      logo: "/api/placeholder/150/150",
      date: "Nov 30, 2021",
      rating: 5,
    },
  ];

  return (
    <div className="font-[Helvetica] w-full h-full">
      <div className="flex justify-center items-center font-bold text-5xl w-full py-15">
        Portfolio
      </div>
      <HeroSection user={user} isSame={isSame} />
      <PersonalPort />
      <ForteSection user={user} />
      <StorySection user={user} />
      <FeaturedWorks />
      <PartnershipsSection partnerships={partnerships} />
      <FooterActions user={user} isSame={isSame} />
    </div>
  );
};

export default CustomPortfolio;
