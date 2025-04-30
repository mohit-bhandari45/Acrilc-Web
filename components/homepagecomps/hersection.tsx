import Image from 'next/image'
import React from 'react'

const HeroSection = () => {
  return (
    <div className='h-[90vh] flex justify-center items-center relative'>
        <div className='heroimage absolute'>
            <Image width={1200} height={1200} src={"/assets/homepageassets/heroimage.png"} alt='HeroImage'/>
        </div>
    </div>
  )
}

export default HeroSection