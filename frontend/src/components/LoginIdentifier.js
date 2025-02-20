import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FaCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import IdleImage from "../idle.jpg";
import Swal from "sweetalert2";
import "../stylesheets/styles.css";
import HomeIcon from "@mui/icons-material/Home";

function LoginIdentifier() {
  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    iconColor: "white",
    customClass: {
      popup: "colored-toast",
    },
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
  });

  const navigate = useNavigate();
  const webcamRef = useRef(null);
  const [inStudents, setInStudents] = useState([]);

  useEffect(() => {
    let studentsList = localStorage.getItem("students");
    if (!studentsList) return;

    setInStudents(studentsList.split(","));
  }, []);

  useEffect(() => {
    if (inStudents.length === 0) {
      localStorage.removeItem("students");
    }
    localStorage.setItem("students", inStudents);
  }, [inStudents]);

  const studentIn = async (regNo) => {
    await axios
      .post(`http://localhost:8081/student_in/${regNo}`)
      .then((res) => {
        Toast.fire({
          position: "right",
          icon: "success",
          title: `Hello ${regNo}!`,
        });
        setInStudents((prevState) => [...prevState, regNo]);
      })
      .catch((err) => console.log(err));
  };

  const studentOut = async (regNo) => {
    await axios
      .post(`http://localhost:8081/student_out/${regNo}`)
      .then((res) => {
        Toast.fire({
          position: "right",
          icon: "success",
          title: `Good Bye ${regNo}!`,
        });
        setInStudents(inStudents.filter((studentId) => studentId !== regNo));
      })
      .catch((err) => console.log(err));
  };

  const capture = () => {
    console.log("captured");
    const imageSrc = webcamRef.current.getScreenshot();

    const picture_basd64 = imageSrc.split(";base64,")[1];
    // picture.forEach((el,index)=>(formData.append(index, new Blob(el),`${index}.jpg`)))

    axios
      .post("http://localhost:5000/mark", { image: picture_basd64 })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data["name"]);
          const regNo = res.data["name"];
          if (inStudents.includes(regNo)) {
            studentOut(regNo);
          } else {
            studentIn(regNo);
          }
        }
      });
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-opacity-0 backdrop-blur-md">
      <div>
        <HomeIcon
          onClick={() => navigate("/")}
          style={{
            color: "red",
            marginRight: "90vw",
            fontSize: "45px",
            cursor: "pointer",
          }}
        />
      </div>

      <div className="bg-grey rounded-xl drop-shadow-2xl p-5 flex flex-col justify-center items-center">
        <Webcam
          ref={webcamRef}
          width={600}
          className="rounded-lg border-2 border-gray-300 shadow-lg"
          screenshotFormat="image/jpeg"
          mirrored
        />
        <button
          onClick={capture}
          className="mt-6 bg-[#ff2d2e] text-white font-mono border border-opacity-60 transition-all duration-300 px-6 py-3 hover:bg-gray-800 hover:text-white rounded-lg font-bold text-sm drop-shadow-lg hover:rounded-bl-3xl hover:rounded-tr-3xl"
        >
          MARK ATTENDANCE
        </button>
      </div>
    </div>
  );
}

export default LoginIdentifier;
