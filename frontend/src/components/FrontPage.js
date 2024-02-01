import React, { useState } from 'react';
import HomeImage from '../homeImage.jpg'
import Header from './Header';


const Front = () => {

  return (
    
    <div>
      <Header isHome={true} />
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



export default Front;
