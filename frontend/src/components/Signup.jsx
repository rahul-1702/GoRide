import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Validation from "../Validation/SignupValidation";
import axios from "axios";

function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    cpassword: "",
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

  const handleSubmitSignup = (e) => {
    e.preventDefault();
    setErrors(Validation(values));

    if (
      errors.name === "" &&
      errors.email === "" &&
      errors.mobile === "" &&
      errors.password === "" &&
      errors.cpassword === ""
    ) {
      const SIGNUP_API = "http://0.0.0.0:5000/admin/signup";
      axios
        .post(SIGNUP_API, {
          name: values.name[0],
          email: values.email[0],
          mobile: values.mobile[0],
          password: values.password[0],
        })
        .then((res) => {
          if (res.data.code === 1) {
            navigate("/");
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          console.log("Error while signup => ", err);
        });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-gradient bg-dark vh-100 px-4">
      <div className="bg-white p-3 rounded w-100" style={{ maxWidth: 500 }}>
        <h2 className="text-center mb-3">SignUp Here</h2>
        <form action="" onSubmit={handleSubmitSignup}>
          <div className="mb-3">
            <label htmlFor="name">Name</label>
            <input
              onChange={handleInput}
              type="text"
              id="name"
              name="name"
              placeholder="Enter Name"
              className="form-control mt-1"
            />
            {errors.name && (
              <span className="text-danger d-inline-block mt-1">
                {errors.name}
              </span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input
              onChange={handleInput}
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email"
              className="form-control mt-1"
            />
            {errors.email && (
              <span className="text-danger d-inline-block mt-1">
                {errors.email}
              </span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="mobile">Mobile</label>
            <input
              onChange={handleInput}
              type="number"
              id="mobile"
              name="mobile"
              placeholder="Enter Mobile"
              className="form-control mt-1"
            />
            {errors.mobile && (
              <span className="text-danger d-inline-block mt-1">
                {errors.mobile}
              </span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <input
              onChange={handleInput}
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
              className="form-control mt-1"
            />
            {errors.password && (
              <span className="text-danger d-inline-block mt-1">
                {errors.password}
              </span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword">Confirm Password</label>
            <input
              onChange={handleInput}
              type="password"
              id="cpassword"
              name="cpassword"
              placeholder="Confirm Password"
              className="form-control mt-1"
            />
            {errors.cpassword && (
              <span className="text-danger d-inline-block mt-1">
                {errors.cpassword}
              </span>
            )}
            <ul className="mt-2">
              <li className="m-0 text-secondary">
                Enter Minimum 8 Characters.
              </li>
              <li className="m-0 text-secondary">
                Contains at least one uppercase letter.
              </li>
              <li className="m-0 text-secondary">
                Contains at least one lowercase letter.
              </li>
              <li className="m-0 text-secondary">
                Contains at least one digit.
              </li>
              <li className="m-0 text-secondary">
                Contains at least one special character.
              </li>
            </ul>
          </div>
          <div className="mb-3 d-flex flex-column align-items-center justify-content-center gap-2">
            <button type="submit" className="btn btn-success w-100">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
