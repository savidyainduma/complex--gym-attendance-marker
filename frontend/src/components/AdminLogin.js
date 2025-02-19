import React from "react";
import Logo from "../logo.png";
import LoginPageImage from "../AdminLoginImage.png";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../stylesheets/styles.css";

//import { useNavigate } from "react-router-dom"; // Assuming this is where useNavigate comes from
import { useState } from "react";
import axios from "axios";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    try {
      const response = await axios.post("http://localhost:8081/login", {
        username,
        password,
      });

      // const data = await response.json();
      if (response.status === 200) {
        Toast.fire({
          position: "right",
          icon: "success",
          title: "Login Success",
        });
        navigate("/admin/dashboard"); // Example redirection to dashboard
      } else {
        alert("fucked");
      }
    } catch (error) {
      console.error("Error during login:", error);
      Toast.fire({
        position: "bottom",
        icon: "error",
        title: "Login Unsuccessful!",
      });
    }
  };

  return (
    <div className="text-white flex justify-center gap-40 mx-10 items-center bodyFont fixed w-full top-16">
      <div>
        <div className="border-4 relative top-2">
          <img
            src={LoginPageImage}
            className="w-[450px] relative bottom-3 right-3"
          />
        </div>
      </div>
      <div className="flex flex-col gap-8 justify-center bg-[#212125] px-10 py-3 rounded-3xl h-[550px] w-[480px]">
        <div className="flex items-center gap-2">
          <img src={Logo} className="w-[72px]" />
          <div className="font-medium flex flex-col">
            <h2 className="bodyFont text-[40px]">Admin Login</h2>
          </div>
        </div>
        <form onSubmit={handleLogin}>
          <div className="flex items-start flex-col gap-1">
            <p>Username</p>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-black px-4 py-3 w-full rounded-md outline-none"
            />
          </div>
          <div className="flex items-start flex-col gap-1">
            <p>Password</p>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-black py-3 w-full rounded-md px-4 outline-none"
            />
          </div>
          <div className="flex gap-2 items-center">
            <input type="checkbox" className="accent-black bg-black" />
            <p>Remember me</p>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex items-center justify-center py-3 bg-[#ff2d2e] active:bg-[rgb(255,30,30)] rounded-md"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
