import FeatCarousel from '@/components/homepagecomps/carousel'
import Footer from '@/components/homepagecomps/footer'
import HeroSection from '@/components/homepagecomps/herosection'
import Navbar from '@/components/homepagecomps/navbar'
import SubFooter from '@/components/homepagecomps/subfooter'
import Title from '@/components/homepagecomps/title'

const Home = () => {
  return (
    <div className='font-[Helvetica]'>
      <Navbar/>
      <HeroSection/>
      <Title title={"Featured Artists"}/>
      <FeatCarousel/>
      <Title title={"Art Movements"}/>
      <SubFooter/>
      <Footer/>
    </div>
  )
}

export default Home