"use client";

import api, { GET_PORTFOLIO } from "@/apis/api";
import { FooterActions } from "@/components/portfolio/footeractionc";
import ArtistAbout from "@/components/portfolio/main/about";
import ContactSection from "@/components/portfolio/main/contact";
import Gallery from "@/components/portfolio/main/gallery";
import MainLoader from "@/components/universalcomps/mainloader";
import { IUser } from "@/types/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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
    return <MainLoader />;
  }

  return (
    <>
      <ArtistAbout user={user} isSame={isSame} />
      <Gallery user={user} />
      <ContactSection />
      <FooterActions user={user} isSame={isSame} />
    </>
  );
};

export default CustomPortfolio;
