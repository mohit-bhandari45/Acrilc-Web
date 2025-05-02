import ArtworkCarousel from "@/components/profilecomps/collection";
import Footer from "@/components/profilecomps/footer";
import Navbar from "@/components/profilecomps/navbar";
import ProfilePage from "@/components/profilecomps/profile";
import GallerySection from "@/components/profilecomps/showcase";

const Profile = () => {
  return (
    <div className="font-[Helvetica]">
      <Navbar />
      <ProfilePage />
      <ArtworkCarousel />

      {/* Main Three Sections */}
      <GallerySection/>
      <Footer/>
    </div>
  );
};

export default Profile;
