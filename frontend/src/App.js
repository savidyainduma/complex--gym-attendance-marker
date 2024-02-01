import React from 'react'
import Login from './components/Login'
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Signup from './components/Signup'
import Home from './components/Home'
import Front from './components/FrontPage'
import Logo from './logo.png'
import { MdKeyboardDoubleArrowUp } from "react-icons/md";



function App() {
  return (
    <div className=' h-screen w-full'>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Front />}></Route>
          <Route path='/front' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/home' element={<Home />}></Route>
        </Routes>
        </BrowserRouter>
    </div>
  )
}

const Header = () => {
  return (
     
      <div class="w-full flex justify-between items-center headerFont px-9 py-6 text-white">
        <div className='flex items-center gap-2'>
          <img src={Logo} className='w-11'/>
            <h1 className='text-xl'>COMPLEX</h1>
        </div>
        
        <div className='bodyFont flex justify-between items-center gap-14 mr-2'>
          <p>About</p>
          <button className='border-2 px-7 py-[6px] rounded-md'>Log in</button>
        </div>
      
      </div>
  )
}


export default App
// <a class="navbar-brand" href="#">Navbar</a>

//ff2d2e