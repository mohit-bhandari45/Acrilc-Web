"use client";

import Right from "@/components/authcomps/right";
import Left from "@/components/universalcomps/left";
import MainLoader from "@/components/universalcomps/mainloader";
import { signupLabels } from "@/types/types";
import useProfileRedirect from "../useProfileRedirect";

const Signup = () => {
  const { loader, setLoader } = useProfileRedirect();

  if (loader) {
    return <MainLoader />;
  }

  if (!loader) {
    return (
      <div className="flex flex-col lg:flex-row w-full min-h-screen font-[Helvetica] justify-center items-center">
        <Left />
        <Right labels={signupLabels} method="Sign Up" setLoader={setLoader} />
      </div>
    );
  }
};

export default Signup;
