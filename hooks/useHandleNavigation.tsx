import { useRouter } from "next/navigation";
// import nProgress from "nprogress";

const useHandleNavigation = () => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    // console.log(path);
    // nProgress.start();
    router.push(path);
  };

  return handleNavigation;
};

export default useHandleNavigation;
