import React from 'react'
import { FaPlus } from "react-icons/fa6";
import AdminDashboardImage from '../AdminDashboardImage.jpg'
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {

    const navigate = useNavigate();

  return (
    <div>
        <img src={AdminDashboardImage} />
        <div className='flex flex-col gap-2  absolute z-50 top-[380px] left-[365px] items-center justify-center bodyFont text-white'>
            <button onClick={()=>{navigate('/admin/addmember')}} className='bg-[#ff2d2e] rounded-full text-xl text-white p-2 hover:bg-[rgb(255,20,20)]'><FaPlus /></button>
            <p>Add Member</p>
        </div>
        <button onClick={()=>{navigate('/admin/addmember')}} className='bg-[#ff2d2e] absolute z-50 top-[620px] left-[270px] rounded-2xl text-lg text-white px-4 py-2 hover:bg-[rgb(255,20,20)]'>View Full Report</button>
    </div>
  )
}

export default AdminDashboard