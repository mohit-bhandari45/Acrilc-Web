"use client";

import Right from "@/components/authcomps/right";
import Left from "@/components/universalcomps/left";
import { loginLabels } from "@/types/types";
import { GridLoader } from "react-spinners";
import useProfileRedirect from "../useProfileRedirect";

const Login = () => {
  const { loader, setLoader } = useProfileRedirect();

  if (loader) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <GridLoader color="#FAA21B" size={50} speedMultiplier={1.1}/>
      </div>
    );
  }

  if (!loader) {
    return (
      <div className="flex flex-col lg:flex-row w-full min-h-screen font-[Helvetica] justify-center items-center">
        <Left />
        <Right labels={loginLabels} method="Login" setLoader={setLoader} />
      </div>
    );
  }

  return null;
};

export default Login;
