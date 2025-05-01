import Left from '@/components/universalcomps/left'
import Right from '@/components/authcomps/right'
import React from 'react'
import { signupLabels } from '@/utils/auth'

const Signup = () => {
  return (
    <div className='flex justify-center items-center w-full h-screen font-[Helvetica]'>
      <Left/>
      <Right labels={signupLabels} method='Signup Up'/>
    </div>
  )
}

export default Signup