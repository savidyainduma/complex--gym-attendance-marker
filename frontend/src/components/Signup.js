import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from '../utils/SignupValidation'
import { useState } from 'react'
import axios from 'axios'
import FaceExtraction from './FaceIdentifier'


function Signup() {

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

  return (
    <div className='flex justify-between items-center px-10'>
        <FaceExtraction regNo={values['reg_no']} />
        <div className='h-[550px] w-96 bg-[white] shadow-lg rounded-lg text-black py-3'> 

            <form action='' onSubmit={handleSubmit} className='flex flex-col items-center justify-around h-full rounded-lg' >
            <h2 className='text-3xl font-bold'>SIGN UP</h2>
                <div>
                    <label htmlFor='name'><strong>NAME</strong></label>
                    <br/>
                    <input type='text' placeholder='Enter Name' name='name' className='w-64 py-1 text-black bg-transparent outline-none border-b-2 border-b-spacing-4'
                    onChange={handleInput} />
                    {errors.name && <span>{errors.name} </span>}
                </div>
                <div >
                    <label htmlFor='reg_no'><strong>REGISTRATION NUMBER</strong></label>
                    <br/>
                    <input type='text' placeholder='Enter Registration Number' name='reg_no' className='w-64 py-1 text-black bg-transparent outline-none border-b-2 border-b-spacing-4'
                    onChange={handleInput}  />
                    {errors.reg_no && <span>{errors.reg_no} </span>}
                </div>
                <div>
                    <label htmlFor='email'><strong>EMAIL</strong></label>
                    <br/>
                    <input type='email' placeholder='Enter Email' name='email' className='w-64 py-1 text-black bg-transparent outline-none border-b-2 border-b-spacing-4'
                    onChange={handleInput}  />
                    {errors.email && <span >{errors.email} </span>}
                </div>
                <div>
                    <label htmlFor='password'><strong>PASSWORD</strong></label>
                    <br/>
                    <input type='password' placeholder='Enter Password' name='password' className='w-64 py-1 text-black bg-transparent outline-none border-b-2 border-b-spacing-4'
                    onChange={handleInput} />
                    {errors.password && <span>{errors.password} </span>}
                </div>
                
                <p>You agree to our terms and policies.</p>
                <button type='submit'  className='bg-[#006957] text-lg w-64 py-3 rounded-md text-white hover:bg-black' >Signup</button>
                <p></p>
                <Link to='/' className='bg-[#690012] text-lg w-64 flex justify-center items-center py-3 rounded-md text-white hover:bg-black'>LOGIN</Link>
            </form>
        </div>
    </div>
  )
}

export default Signup