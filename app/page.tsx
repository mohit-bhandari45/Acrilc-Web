import FeatCarousel from '@/components/homecomps/carousel'
import Footer from '@/components/homecomps/footer'
import HeroSection from '@/components/homecomps/herosection'
import Navbar from '@/components/homecomps/navbar'
import SubFooter from '@/components/homecomps/subfooter'
import Title from '@/components/homecomps/title'

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