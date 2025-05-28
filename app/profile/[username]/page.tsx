"use client";

import GallerySection from "@/components/profilecomps/gallery";
import Navbar from "@/components/profilecomps/navbar";
import ProfilePage from "@/components/profilecomps/profile";

/* Redux */
import useCurrentUser from "@/hooks/useCurrentUser";
import useUserByUsername from "@/hooks/useUserByUsername";
import { setUser } from "@/store/features/userSlice";
import { useAppDispatch } from "@/store/hooks";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";

interface IParams {
  username: string;
}

const Profile = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [isSame, setIsSame] = useState<boolean>(false);
  const params: IParams = useParams() as { username: string };
  const [token, setToken] = useState<string | null>(null);
  const username = params.username;

  /* Getting the user and updating things */
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      router.push("/auth/login");
    }
    setToken(storedToken);
  }, [router]);

  const { user, loading: userByUsernameLoading } = useUserByUsername({
    username,
  });
  const { currentUser, loading: currUserLoading } = useCurrentUser({ token });
  dispatch(setUser(currentUser!));

  useEffect(() => {
    localStorage.removeItem("username");
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
  if (currUserLoading || userByUsernameLoading || !user || !currentUser) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <HashLoader color="#FAA21B" size={200} />
      </div>
    );
  }

  return (
    <div className="font-[Helvetica]">
      <Navbar currentUser={currentUser}/>
      <ProfilePage
        loader={loader}
        setLoader={setLoader}
        isSame={isSame}
        user={isSame ? currentUser : user}
      />
      {/* <ArtworkCarousel /> */}

      {/* Main Three Sections */}
      <GallerySection user={isSame ? currentUser : user} isSame={isSame}/>
    </div>
  );
};

export default Profile;
