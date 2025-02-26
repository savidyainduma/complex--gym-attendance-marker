import { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import CaptureIcon from "../capture icon.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../stylesheets/styles.css";

function FaceExtraction({ regNo, setIsRegistered, setForm }) {
  const navigate = useNavigate();
  const webcamRef = useRef(null);
  const [picture, setPicture] = useState([]);
  const [intervalId, setIntervalId] = useState(null);
  const [captureClicked, setCaptureClicked] = useState(false);

  const Toast = Swal.mixin({
    toast: true,
    position: "center",
    iconColor: "white",
    customClass: {
      popup: "colored-toast",
    },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  });

  const handleClick = () => {
    if (captureClicked) return;
    setCaptureClicked(true);
    setIntervalId(setInterval(capture, 700)); // Call handleClick every 2 seconds
  };

  const capture = () => {
    console.log("capture");
    const imageSrc = webcamRef.current.getScreenshot();
    setPicture((prevState) => [...prevState, imageSrc]);
  };

  useEffect(() => {
    if (picture.length === 10) {
      console.log("captured!!!");
      clearInterval(intervalId);
      setIntervalId(null);

      setCaptureClicked(false);
      const picture_basd64_array = picture.map((el) => el.split(";base64,")[1]);
      // picture.forEach((el,index)=>(formData.append(index, new Blob(el),`${index}.jpg`)))

      axios
        .post("http://localhost:5000/register", {
          name: regNo,
          images: picture_basd64_array,
        })
        .then((res) => {
          if (res.status === 200) {
            Toast.fire({
              icon: "success",
              title: "Image Registration Success",
            });

            setIsRegistered(false);
            setForm({
              name: "",
              regNo: "",
              email: "",
              phoneNo: "",
            });
          }
        })
        .catch((err) => {
          Toast.fire({
            icon: "error",
            title: "Image Registration Unsuccessful",
          });
        });
    }
  });

  return (
    <div className=" bg-opacity-50 backdrop-blur-md rounded-xl drop-shadow-xl flex flex-col justify-center  items-center gap-10">
      <Webcam
        ref={webcamRef}
        width={1000}
        className=" rounded-lg bg-black border-2 border-white "
        screenshotFormat="image/jpeg"
        mirrored
      />
      <div className="h-5 rounded-lg w-full border-2 flex justify-center items-center p-[1.5px]">
        <div
          className={`h-full bg-[#ff2d2e] transition-all  rounded-md ease-in ${
            captureClicked ? "w-full duration-[7000ms]" : "w-0 duration-300"
          }`}
        ></div>
      </div>
      <div className="absolute top-[372px] w-32 h-32 flex justify-center items-center bg-transparent">
        <button onClick={handleClick}>
          <img
            src={CaptureIcon}
            className="w-16 hover:w-20 transition-all duration-150"
          />
        </button>
      </div>
    </div>
  );
}

export default FaceExtraction;
