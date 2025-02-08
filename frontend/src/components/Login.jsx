import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "../Validation/LoginValidation";
import axios from "axios";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const HOST = import.meta.env.VITE_HOST;
  const PORT = import.meta.env.VITE_PORT;

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleLoginInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    setErrors(Validation(values));
    if (errors.email === "" && errors.password === "") {
      const LOGIN_API = `http://${HOST}:${PORT}/admin/login`;

      axios
        .post(LOGIN_API, {
          email: values.email[0],
          password: values.password[0],
        })
        .then((res) => {
          if (res.data.code === 1) {
            navigate("/dashboard");
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          console.log("Error while login => ", err);
        });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-gradient bg-dark vh-100 px-4">
      <div className="bg-white p-3 rounded w-100" style={{ maxWidth: 500 }}>
        <h2 className="text-center mb-3">Login Here</h2>
        <form action="" onSubmit={handleSubmitLogin}>
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleLoginInput}
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
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleLoginInput}
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
            {/* <input
              type="checkbox"
              id="checkk"
              className="form-check-input me-2"
            /> */}
            <label htmlFor="checkk">
              Yes, I agree with the terms and policies
            </label>
          </div>
          <div className="mb-3 d-flex flex-column align-items-center justify-content-center gap-2">
            <button type="submit" className="btn btn-success w-100">
              Log In
            </button>
            <div className="d-flex align-items-center justify-content-center gap-2">
              <span>or</span>
            </div>
            <Link
              to="/signup"
              className="btn btn-primary w-100 text-decoration-none"
            >
              Create Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
