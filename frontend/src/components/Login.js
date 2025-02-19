import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "../utils/LoginValidation";
import axios from "axios";
import FaceExtraction from "./FaceIdentifier";
import LoginIdentifier from "./LoginIdentifier";

function Login() {
  const [values, SetValues] = useState({
    reg_no: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const handleInput = (event) => {
    SetValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    console.log("submit");
    axios.post("http://localhost:8081/login", values).then((res) => {
      if (res.data === "Success") {
        alert("hello");
        navigate("/home");
      } else {
        alert("No record existed.");
      }
    });
  };

  return (
    <div className="flex justify-between items-center px-10">
      <LoginIdentifier regNo={values["reg_no"]} />
      <div className="h-[500px] w-96 bg-[white] shadow-lg rounded-lg text-black">
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-around h-full rounded-lg"
        >
          <h2 className="text-3xl font-bold">SIGN IN</h2>
          <div>
            <label htmlFor="reg_no">
              <strong>REGISTRATION NUMBER</strong>
            </label>
            <br />
            <input
              type="reg_no"
              placeholder="Enter Registration Number"
              name="reg_no"
              className="w-64 py-1 text-black bg-transparent outline-none border-b-2 border-b-spacing-4"
              onChange={handleInput}
            />
            {errors.reg_no && <span>{errors.reg_no} </span>}
          </div>
          <div>
            <label htmlFor="password">
              <strong>PASSWORD</strong>
            </label>
            <br />
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              className="w-64 py-1 text-black bg-transparent outline-none border-b-2 border-b-spacing-4"
              onChange={handleInput}
            />
            {errors.password && <span>{errors.password} </span>}
          </div>
          <button
            type="submit"
            className="bg-[#006957] text-lg w-64 py-3 rounded-md text-white hover:bg-black"
          >
            LOGIN
          </button>
          <p>You agree to our terms and policies.</p>
          <Link
            to="/signup"
            className="bg-[#690012] text-lg w-64 flex justify-center items-center py-3 rounded-md text-white hover:bg-black"
          >
            CREATE ACCOUNT
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
