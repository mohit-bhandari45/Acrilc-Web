import FeatCarousel from '@/components/homepagecomps/carousel'
import Footer from '@/components/homepagecomps/footer'
import HeroSection from '@/components/homepagecomps/hersection'
import Navbar from '@/components/homepagecomps/navbar'
import Title from '@/components/homepagecomps/title'

const Home = () => {
  return (
    <div className='font-[Helvetica]'>
      <Navbar/>
      <HeroSection/>
      <Title title={"Featured Artists"}/>
      <FeatCarousel/>
      <Title title={"Art Movements"}/>
      <Footer/>
    </div>
  )
}

export default Home