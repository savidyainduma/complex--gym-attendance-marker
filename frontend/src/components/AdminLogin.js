import React from 'react'
import Logo from '../logo.png'
import LoginPageImage from '../AdminLoginImage.png'

const AdminLogin = () => {
  return (
    <div className='text-white flex justify-center gap-40 mx-10 items-center bodyFont fixed w-full top-16 '>
        <div>
            <div className='border-4 relative top-2'><img src={LoginPageImage} className='w-[450px] relative bottom-3 right-3'/></div>
        </div>
        <div className='flex flex-col gap-8 justify-center bg-[#212125] px-10 py-3 rounded-3xl h-[550px] w-[480px] '>
                <div className='flex items-center gap-2'>
                    <img src={Logo} className='w-[72px]'/>
                    <div className=' font-medium flex flex-col gap-1'><h2 className='bodyFont text-[40px]'>Admin Login</h2><p className= ' text-[#a9a9a9]'>Doesn't have an account yet? <u className='underline-offset-4'>Sign up</u></p></div>
                </div>
                <div className='flex items-start flex-col gap-1 '>
                    <p>Username</p>
                    <input type='text' className='bg-black py-3 w-full rounded-md'/>
                </div>
                <div className='flex items-start flex-col gap-1 '>
                <p>Password</p>
                    <input type='password' className='bg-black py-3 w-full rounded-md'/>
                </div>
                <div className='flex gap-2 items-center'><input type='checkbox' className='accent-black' /><p>Remember me</p></div>
                <div><button className='w-full flex items-center justify-center py-3 bg-[#ff2d2e] rounded-md'>Login</button></div>
        </div>
    </div>
  )
}

export default AdminLogin