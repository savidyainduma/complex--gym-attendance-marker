import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from '../utils/SignupValidation'
import { useState } from 'react'
import axios from 'axios'
import FaceExtraction from './FaceIdentifier'
import Header from './Header'


function AddMember() {

    const [values, SetValues] = useState({
        name:'',
        reg_no:'',
        email:'',
        password:'' 
        
    })
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const handleInput =(event) => {
        SetValues((prev) => ({...prev, [event.target.name]: event.target.value}))
    }

    const handleSubmit =(event) => {
        event.preventDefault();
        setErrors(Validation(values));
        if(errors.name ==="" && errors.email ==="" && errors.password ==="") {
            axios.post('http://localhost:8081/components/signup', values)
            .then(res => {
                if(res.status===200)
                    navigate('/')})
            .catch(err => console.log(err));
        }
    }

    const textBoxStyle = 'w-96 py-3 px-5  bg-black outline-none text-lg placeholder:text-[#a9a9a9]';

  return (
    <div>
        <Header isHome={false} />
        <div className='bodyFont flex justify-center items-center px-32 bg-[#212125]'>
            <div className='h-[572px] w-full shadow-lg rounded-lg text-white'>
                <form action='' onSubmit={handleSubmit} className='flex flex-col items-start justify-center gap-7 h-full rounded-lg' >
                <h2 className='text-5xl font-semibold'>Add Member</h2>
                    <div>
                        <input type='text' placeholder='Full Name' name='name' className={textBoxStyle}
                        onChange={handleInput} />
                        {errors.name && <span>{errors.name} </span>}
                    </div>
                    <div >
                        <input type='text' placeholder='Registration Number' name='reg_no' className={textBoxStyle}
                        onChange={handleInput}  />
                        {errors.reg_no && <span>{errors.reg_no} </span>}
                    </div>
                    <div>
                        <input type='text' placeholder='Contact Number' name='contact_number' className={textBoxStyle}
                        onChange={handleInput} />
                        {errors.password && <span>{errors.password} </span>}
                    </div>
                    <div>
                        <input type='email' placeholder='Email' name='email' className={textBoxStyle}
                        onChange={handleInput}  />
                        {errors.email && <span >{errors.email} </span>}
                    </div>
                    
    
                    <button type='submit'  className='bg-[#ff2d2e] text-lg w-96 py-3 rounded-md text-white hover:bg-black' >ADD</button>
                </form>
            </div>
            
            <FaceExtraction regNo={values['reg_no']} />
        </div>
    </div>
  )
}

export default AddMember