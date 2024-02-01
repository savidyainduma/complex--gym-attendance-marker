import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EUSL from './EUSL.png';
import LoginIdentifier from './LoginIdentifier';
import HomeImage from '../homeImage.jpg'
import Logo from '../logo.png'


const Front = () => {

  return (
    
    <div>
      <Header />
      <div className='bodyFont flex justify-around items-center text-white mt-10 '>
        <div className='flex flex-col items-start gap-7'>
              <div style={{fontSize:"80px"}} className='text-8xl font-black flex flex-col gap-6 '>
                <div>CONNECT.</div>
                <div>COMMIT.</div>
                <div>CONQUER.</div>
              </div>
              <div className=''>
                <div className='font-regular'>Seamlessly track your campus gym attendance</div>
                <div>Faster community, stay motivated and </div>
                <div>achive fitness goals together</div>
              </div>
              <div><button className='font-semibold text-base bg-[#ff2d2e] px-10 py-2 hover:rounded-bl-3xl hover:rounded-tr-3xl transition-all duration-300'>Let's Goo!</button></div>
          </div>
          <div>
              <div className='border-4'>
                <img src={HomeImage} className='w-[520px] relative bottom-5 right-5'/>
              </div>
          </div>
      </div>
    </div>

  );
};

const Header = () => {
  return (
     
      <div class="w-full flex justify-between items-center headerFont px-9 py-6 text-white">
        <div className='flex items-center gap-2'>
          <img src={Logo} className='w-11'/>
            <h1 className='text-xl'>COMPLEX</h1>
        </div>
        
        <div className='bodyFont flex justify-between items-center gap-14 mr-2'>
          <p className='hover:underline underline-offset-8 cursor-pointer'>About</p>
          <button className='border-2 px-7 py-[6px] rounded-md hover:bg-[#ff2d2e]'>Log in</button>
        </div>
      
      </div>
  )
}

export default Front;
