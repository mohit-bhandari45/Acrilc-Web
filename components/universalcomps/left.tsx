import Image from 'next/image'
import React from 'react'

const Left = () => {
  return (
    <div className='w-[45%] h-full relative'>
        <Image priority fill src={"/assets/loginsignupassets/image.png"} alt='Left'/>
    </div>
  )
}

export default Left