// app/profile/layout.tsx

import Navbar from "@/components/homecomps/navbar";
import Footer from "@/components/profilecomps/footer";

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="">
    <Navbar/>
    {children}
    <Footer/>
  </div>;
}
