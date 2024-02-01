import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EUSL from './EUSL.png';
import LoginIdentifier from './LoginIdentifier';


const Front = () => {

  const [greetingMessage, setGreetingMessage] = useState("Good Morning")
  const [time, setTime] = useState("16:58:32 PM")
  const [currentDate, setCurrentDate] = useState("Thursday, 1st February 2024")

  return (
    <div className=' flex justify-between items-center gap-3 '> 
      <LoginIdentifier />
      <div className='w-full bg-white mr-7 rounded-md h-[560px] flex flex-col gap-4 justify-around items-center'>
        <div className='text-3xl'>{greetingMessage}</div>
        <div className='text-7xl'>{time}</div>
        <div>{currentDate}</div>
        <div></div>
      </div>
    </div>

  );
};

export default Front;
