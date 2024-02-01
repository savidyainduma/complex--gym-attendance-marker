import React from 'react'
import Login from './components/Login'
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Signup from './components/Signup'
import Home from './components/Home'
import Front from './components/FrontPage'
import Logo from './logo.png'
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import AdminLogin from './components/AdminLogin'



function App() {
  return (
    <div className=' h-screen w-full'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Front />}></Route>
          <Route path='/adminlogin' element={<AdminLogin />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/home' element={<Home />}></Route>
        </Routes>
        </BrowserRouter>
    </div>
  )
}




export default App
// <a class="navbar-brand" href="#">Navbar</a>

//ff2d2e