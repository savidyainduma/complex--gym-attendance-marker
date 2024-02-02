import React from 'react'
import Login from './components/Login'
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Signup from './components/AddMember'
import Home from './components/Home'
import Front from './components/FrontPage'
import Logo from './logo.png'
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import AdminLogin from './components/AdminLogin'
import AddMember from './components/AddMember'
import AdminDashboard from './components/AdminDashboard'
import LoginIdentifier from './components/LoginIdentifier'



function App() {
  return (
    <div className=' h-screen w-full'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Front />}></Route>
          <Route path='/adminlogin' element={<AdminLogin />}></Route>
          <Route path='/admin/dashboard' element={<AdminDashboard />}></Route>
          <Route path='/admin/addmember' element={<AddMember />}></Route>
          <Route path='/home' element={<LoginIdentifier />}></Route>
        </Routes>
        </BrowserRouter>
    </div>
  )
}




export default App
// <a class="navbar-brand" href="#">Navbar</a>

//ff2d2e