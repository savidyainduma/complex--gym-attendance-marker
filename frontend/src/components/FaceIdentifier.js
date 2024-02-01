import {useRef,useEffect, useState} from 'react'
import Webcam from 'react-webcam'
import { FaCircle } from "react-icons/fa";
import HomeImage from '../homeImage.jpg'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function FaceExtraction({regNo}){

  const navigate = useNavigate()
  const webcamRef = useRef(null);
  const [picture, setPicture] = useState([])
  const [intervalId, setIntervalId] = useState(null)

  const handleClick = () => {
    setIntervalId(setInterval(capture, 700)); // Call handleClick every 2 seconds
    
  };

  const capture = () => {
    console.log("capture");
      const imageSrc = webcamRef.current.getScreenshot();
      setPicture(prevState=>[...prevState,imageSrc])
    
  };

  useEffect(()=>{
    if(picture.length===10){
      console.log("captured!!!");
      clearInterval(intervalId)
      setIntervalId(null)
      
      const picture_basd64_array = picture.map(el=>(el.split(";base64,")[1]))
      // picture.forEach((el,index)=>(formData.append(index, new Blob(el),`${index}.jpg`)))
      
      axios.post("http://localhost:5000/register", {name:regNo, images:picture_basd64_array},).then(res=>{
        if(res.status===200){
          alert("registration success")
          navigate('/')
        }
      }).catch(err=>console.error(err))
    }
  })


  return (
    <div className=" bg-opacity-50 backdrop-blur-md rounded-xl drop-shadow-xl flex flex-col justify-center gap-3 items-center py-5 bg-white w-[600px] ">
      <p className='font-bold'>PUT YOUR FACE CLOSE TO THE CAMERA</p>
        <Webcam ref={webcamRef} width={500} height={500} className=' rounded-lg bg-black 'screenshotFormat="image/jpeg" />
        <button onClick={(handleClick)} className='p-1 hover:text-[#00b696] text-opacity-70 border-opacity-80 hover:border-[#00b696] transition-all duration-200 border-4 border-black rounded-full text-3xl text-black'><FaCircle /></button>
    </div>
    )

}

export default FaceExtraction ;