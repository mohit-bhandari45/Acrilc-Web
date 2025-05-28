// app/profile/layout.tsx
import Footer from "@/components/profilecomps/footer";

export default function ContentLayout({
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
