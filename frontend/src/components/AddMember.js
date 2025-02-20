import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "../utils/SignupValidation";
import { useState } from "react";
import axios from "axios";
import FaceExtraction from "./FaceIdentifier";
import Header from "./Header";
import Swal from "sweetalert2";
import "../stylesheets/styles.css";

function AddMember() {
  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    iconColor: "white",
    customClass: {
      popup: "colored-toast",
    },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  });

  const [isRegistered, setIsRegistered] = useState(false);
  const [values, SetValues] = useState({
    name: "",
    regNo: "",
    email: "",
    phoneNo: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const handleInput = (event) => {
    SetValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    console.log("button clicked..");
    event.preventDefault();

    // Perform validation
    const validationErrors = Validation(values);
    setErrors(validationErrors); // Update errors state

    // Check if there are any validation errors
    if (
      !validationErrors.name &&
      !validationErrors.reg_no &&
      !validationErrors.email
    ) {
      try {
        const res = await axios.post("http://localhost:8081/signup", values);
        if (res.status === 200) {
          console.log("Registration success...");
          setIsRegistered(true);
          Toast.fire({
            icon: "success",
            title: "Registration Success",
          });
        }
      } catch (err) {
        console.log(err);
        Toast.fire({
          icon: "error",
          title: "Registration Unsuccessful",
        });
      }
    } else {
      console.log("Validation errors:", validationErrors);
    }
  };

  const textBoxStyle =
    "w-96 py-3 px-5  bg-black outline-none text-lg placeholder:text-[#a9a9a9]";

  return (
    <div>
      <Header isHome={false} />
      <div className="bodyFont flex justify-center items-center px-32 bg-[#212125]">
        <div className="h-[572px] w-full shadow-lg rounded-lg text-white">
          <form
            action=""
            onSubmit={handleSubmit}
            className="flex flex-col items-start justify-center gap-7 h-full rounded-lg"
          >
            <h2 className="text-5xl font-semibold">Add Member</h2>
            <div>
              <input
                type="text"
                placeholder="Full Name"
                name="name"
                disabled={isRegistered}
                className={textBoxStyle}
                onChange={handleInput}
              />
              {errors.name && <span>{errors.name} </span>}
            </div>
            <div>
              <input
                type="text"
                placeholder="Registration Number"
                name="regNo"
                disabled={isRegistered}
                className={textBoxStyle}
                onChange={handleInput}
              />
              {errors.reg_no && <span>{errors.reg_no} </span>}
            </div>
            <div>
              <input
                type="text"
                placeholder="Contact Number"
                name="phoneNo"
                disabled={isRegistered}
                className={textBoxStyle}
                onChange={handleInput}
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                name="email"
                disabled={isRegistered}
                className={textBoxStyle}
                onChange={handleInput}
              />
              {errors.email && <span>{errors.email} </span>}
            </div>

            <button
              type="submit"
              className={`${
                !isRegistered ? "bg-[#ff2d2e] hover:bg-black" : "bg-neutral-500"
              } text-lg w-96 py-3 rounded-md text-white `}
              onClick={handleSubmit}
              disabled={isRegistered}
            >
              NEXT
            </button>
          </form>
        </div>

        {isRegistered && (
          <FaceExtraction
            regNo={values["regNo"]}
            setIsRegistered={setIsRegistered}
            setForm={SetValues}
          />
        )}
      </div>
    </div>
  );
}

export default AddMember;
