"use client";

import { FeaturedWorks } from "@/components/portfolio/featured";
import { FooterActions } from "@/components/portfolio/footeractionc";
import { ForteSection } from "@/components/portfolio/fortes";
import Hero from "@/components/portfolio/hero";
import { PartnershipsSection } from "@/components/portfolio/partners";
import PersonalPort from "@/components/portfolio/personalportfolio";
import { StorySection } from "@/components/portfolio/story";
import Footer from "@/components/profilecomps/footer";
import Navbar from "@/components/profilecomps/navbar";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUserByUsername from "@/hooks/useUserByUsername";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";

interface IParams {
  username: string;
}

const Portfolio = () => {
  const params: IParams = useParams() as { username: string };
  const username = params.username;
  const [isSame, setIsSame] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);

  /* Getting the user and updating things */
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const { user, loading: userByUsernameLoading } = useUserByUsername({
    username,
  });
  const { currentUser, loading: currUserLoading } = useCurrentUser({ token });

  useEffect(() => {
    if (
      token &&
      currentUser &&
      user &&
      currentUser.username === user.username
    ) {
      setIsSame(true);
    } else {
      setIsSame(false);
    }
  }, [token, currentUser, user]);


  /* Comps */
  if (currUserLoading || userByUsernameLoading) {
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

  if (!token) {
    if (!user) {
      return <div>Please Try again by refresing the page!</div>;
    }

    return (
      <div className="font-[Helvetica] w-full h-full">
        <div className="flex justify-center items-center font-bold text-5xl w-full py-15">
          Portfolio
        </div>
        <Hero user={user} isSame={isSame} />
        <PersonalPort />
        <ForteSection user={user} />
        <StorySection user={user} />
        <FeaturedWorks />
        <PartnershipsSection partnerships={partnerships} />
        <FooterActions user={user} isSame={isSame} />
      </div>
    );
  } else {
    if (!currentUser || !user) {
      return <div>Please Try again by refresing the page!</div>;
    } else {
      /* Actual Content of the page */
      return (
        <>
          <Navbar />
          <div className="font-[Helvetica] w-full h-full">
            <div className="flex justify-center items-center font-bold text-5xl w-full py-15">
              Portfolio
            </div>
            <Hero user={user} isSame={isSame} />
            <PersonalPort />
            <ForteSection user={user} />
            <StorySection user={user} />
            <FeaturedWorks />
            <PartnershipsSection partnerships={partnerships} />
            <FooterActions user={user} isSame={isSame} />

            <Footer />
          </div>
        </>
      );
    }
  }
};

export default Portfolio;
