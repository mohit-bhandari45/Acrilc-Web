"use client";

import { FooterActions } from "@/components/portfolio/footeractionc";
import ArtistAbout from "@/components/portfolio/main/about";
import ContactSection from "@/components/portfolio/main/contact";
import Footer from "@/components/portfolio/main/footer";
import Gallery from "@/components/portfolio/main/gallery";
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
    return <MainLoader />;
  }

  // const partnerships = [
  //   {
  //     id: "1",
  //     name: "Amazon",
  //     logo: "/api/placeholder/150/150",
  //     date: "Jan 1, 2022",
  //     rating: 5,
  //   },
  //   {
  //     id: "2",
  //     name: "Amazon",
  //     logo: "/api/placeholder/150/150",
  //     date: "Jan 1, 2022",
  //     rating: 5,
  //   },
  //   {
  //     id: "3",
  //     name: "Google",
  //     logo: "/api/placeholder/150/150",
  //     date: "Dec 15, 2021",
  //     rating: 4,
  //   },
  //   {
  //     id: "4",
  //     name: "Meta",
  //     logo: "/api/placeholder/150/150",
  //     date: "Nov 30, 2021",
  //     rating: 5,
  //   },
  //   {
  //     id: "5",
  //     name: "Meta",
  //     logo: "/api/placeholder/150/150",
  //     date: "Nov 30, 2021",
  //     rating: 5,
  //   },
  // ];

  if (!token) {
    if (!user) {
      return <div>Please Try again by refresing the page!</div>;
    }

    return (
      <>
        <ArtistAbout user={user} isSame={isSame} />
        <Gallery user={user} />
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
