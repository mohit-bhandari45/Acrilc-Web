// app/profile/layout.tsx
import Footer from "@/components/profilecomps/footer";
import Navbar from "@/components/profilecomps/navbar";

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
