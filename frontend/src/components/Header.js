import Logo from '../logo.png'
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import ProfilePic from '../profile.jpg'

const Header = ({isHome}) => {
    return (
       
        <div class={`w-full flex justify-between items-center headerFont px-9 py-6 text-white ${isHome?"bg-transparent":"bg-black"}`}>
          <div className='flex items-center gap-2'>
            <img src={Logo} className='w-11'/>
              <h1 className='text-xl'>COMPLEX</h1>
          </div>
          
          <div className={`bodyFont flex justify-between items-center ${isHome?"gap-14":"gap-6"}  mr-2`}>
          <p className='hover:underline underline-offset-8 cursor-pointer'>About</p>
            {isHome?<button className='border-2 px-7 py-[6px] rounded-md hover:bg-[#ff2d2e]'>Log in</button>:
            <div className='flex items-center gap-6 '>
                <p className='text-2xl cursor-pointer'><IoMdNotificationsOutline /></p>
                <div className='flex gap-2 items-center'>
                    <img src={ProfilePic} className='w-10 rounded-full cursor-pointer'/>
                    <p className='text-3xl cursor-pointer'><MdKeyboardArrowDown /></p>
                </div>
            </div>}
          </div>
        
        </div>
    )
  }

  export default Header;