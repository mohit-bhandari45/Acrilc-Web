"use client";

import ArtistAbout from "@/components/portfolio/about";
import ContactSection from "@/components/portfolio/contact";
import Footer from "@/components/portfolio/footer";
import { FooterActions } from "@/components/portfolio/footeractionc";
import Gallery from "@/components/portfolio/gallery";
import { ShopSection } from "@/components/portfolio/marketplace";
import Navbar from "@/components/profilecomps/navbar";
import MainLoader from "@/components/universalcomps/mainloader";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUserByUsername from "@/hooks/useUserByUsername";
import { setUser } from "@/store/features/userSlice";
import { useAppDispatch } from "@/store/hooks";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface IParams {
  username: string;
}

const Portfolio = () => {
  const params: IParams = useParams() as { username: string };
  const username = params.username;
  const [isSame, setIsSame] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  /* Getting the user and updating things */
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const { user, loading: userByUsernameLoading } = useUserByUsername({
    username,
  });
  const { currentUser, loading: currUserLoading } = useCurrentUser({ token });
  dispatch(setUser(currentUser!));

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
    return <MainLoader msg="Loading, please wait"/>;
  }

  if (!token) {
    if (!user) {
      return <div>Please Try again by refresing the page!</div>;
    }

    return (
      <>
        <ArtistAbout user={user} isSame={isSame} />
        <Gallery user={user} />
        <ShopSection user={user}/>
        <ContactSection />
        <FooterActions user={user} isSame={isSame} />
      </>
    );
  } else {
    if (!currentUser || !user) {
      return <div>Please Try again by refresing the page!</div>;
    } else {
      /* Actual Content of the page */
      return (
        <>
          <Navbar currentUser={currentUser} show={true} portfolio={true}/>
          <div className="mt-15">
            <ArtistAbout user={user} isSame={isSame} />
            <Gallery user={user} />
            <ShopSection user={user}/>
            {!isSame && <ContactSection />}
            <FooterActions user={user} isSame={isSame} />
            <Footer />
          </div>
        </>
      );
    }
  }
};

export default Portfolio;
