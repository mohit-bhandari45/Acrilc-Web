"use client";

import Right from "@/components/authcomps/right";
import Left from "@/components/universalcomps/left";
import MainLoader from "@/components/universalcomps/mainloader";
import { loginLabels } from "@/types/types";
import useProfileRedirect from "../useProfileRedirect";

const Login = () => {
  const { loader, setLoader } = useProfileRedirect();

  if (loader) {
   return <MainLoader msg="Loading, please wait"/>;
  }

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen font-[Helvetica] justify-center items-center">
      <Left />
      <Right labels={loginLabels} method="Login" setLoader={setLoader} />
    </div>
  );
};

export default Login;
