import Footer from "@/components/profilecomps/footer";


export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      {children}
      <Footer />
    </div>
  );
}
