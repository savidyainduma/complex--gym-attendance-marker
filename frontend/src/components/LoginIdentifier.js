import axios from "axios";
import { useRef, useState } from "react";
import { FaCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import IdleImage from '../idle.jpg'

function LoginIdentifier(){

    const navigate = useNavigate()
    const webcamRef = useRef(null);
    const [inStudents, setInStudents] = useState([]);

    const studentIn = async(regNo)=> {
        await axios.post(`http://localhost:8081/student_in/${regNo}`).then(res=>console.log(res.data)).catch(err=>console.log(err))
    }
    
    const studentOut = async(regNo)=> {
        await axios.post(`http://localhost:8081/student_out/${regNo}`).then(res=>console.log(res.data)).catch(err=>console.log(err))
    }

    const capture = () => {
        console.log("captured");
        const imageSrc = webcamRef.current.getScreenshot();
            
        const picture_basd64 = imageSrc.split(";base64,")[1]
        // picture.forEach((el,index)=>(formData.append(index, new Blob(el),`${index}.jpg`)))
        
        axios.post("http://localhost:5000/mark", {image:picture_basd64},).then(res=>{
            if(res.status===200){
                console.log(res.data['name']);
                    const regNo = res.data['name']
                    alert(`${res.data['name']} authorized`)
                    
                    if(inStudents.includes(regNo)){
                        studentOut(regNo)
                        setInStudents(inStudents.filter(studentId => studentId!==regNo))
                    }
                    else{
                        studentIn(regNo)
                        setInStudents(prevState=>[...prevState,regNo]);
                    }
            }
        })
      
    };
  
  
    return (
      <div className=" bg-opacity-0 backdrop-blur-md rounded-xl drop-shadow-xl flex flex-col justify-between items-center bg-white w-full ">
          <Webcam ref={webcamRef} width={600} className='rounded-md'screenshotFormat="image/jpeg" />
          <button onClick={capture} className='relative bottom-14 bg-white bg-opacity-50 backdrop-blur-md text-black font-mono  border-opacity-80 transition-all duration-200 px-5 py-3 hover:bg-gray-800 rounded-lg font-bold  text-sm'>MARK ATTENDANCE</button>
      </div>
      )
  
  }
  
  export default LoginIdentifier ;