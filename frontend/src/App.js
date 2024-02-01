import React from 'react'
import Login from './components/Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './components/Signup'
import Home from './components/Home'
import Front from './components/FrontPage'
import { MdKeyboardDoubleArrowUp } from "react-icons/md";




function App() {
  return (
    <div className='backdrop-blur-sm h-screen w-full'>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/front' element={<Front />}></Route>
        </Routes>
        </BrowserRouter>
    </div>
  )
}

const Header = () => {
  return (
    <div className='flex flex-col items-center'>
     
      <div class="w-full flex justify-between items-center headerFont px-8 p-4 text-white text-4xl">
        <h1>WELCOME TO GYMNASIUM</h1>
        
        <div className='flex gap-10 items-center'>
        <p className='text-sm font-mono hover:underline hover:underline-offset-8 cursor-pointer'>HOME</p>
          <p className='text-sm font-mono hover:underline hover:underline-offset-8 cursor-pointer'>LOGIN</p>
              <button className='font-mono text-sm bg-[#813702] hover:bg-black px-7 py-3 rounded-md font-semibold text-ellipsis'>REGISTER</button>
        </div>
      </div>
      
    </div>
  )
}


export default App
// <a class="navbar-brand" href="#">Navbar</a>