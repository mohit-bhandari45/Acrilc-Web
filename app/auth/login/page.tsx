import Left from '@/components/universalcomps/left'
import Right from '@/components/authcomps/right'
import React from 'react'
import { loginLabels } from '@/utils/auth'

const Login = () => {
  return (
    <div className='flex justify-center items-center w-full h-screen font-[Helvetica]'>
      <Left/>
      <Right labels={loginLabels} method='Login'/>
    </div>
  )
}

export default Login