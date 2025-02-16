import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Validation from "../Validation/SignupValidation";
import Loader from "../components/Loader";
import axios from "axios";
import Swal from "sweetalert2";
import "../static/css/Login.css";

function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    cpassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    cpassword: "",
  });

  const showpasswordInputGroup = {
    position: "relative",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "stretch",
    width: "100%",
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const showAlert = (title, text, icon) => {
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: "OK",
      allowOutsideClick: false,
    });
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const HOST = import.meta.env.VITE_HOST;
  const PORT = import.meta.env.VITE_PORT;

  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

  const handleSubmitSignup = () => {
    setLoading(true);
    const validationErrors = Validation(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const SIGNUP_API = `http://${HOST}:${PORT}/admin/signup`;

      axios
        .post(SIGNUP_API, {
          name: values.name[0],
          email: values.email[0],
          mobile: values.mobile[0],
          password: values.password[0],
        })
        .then((res) => {
          if (res.data.code === 1) {
            Swal.fire({
              title: "Success!",
              text: res.data.message + "! Redirecting to login page...",
              icon: "success",
              confirmButtonText: "OK",
              allowOutsideClick: false,
            }).then(() => {
              navigate("/");
            });
          } else {
            showAlert("Error", res.data.message, "error");
          }
          setTimeout(() => {
            setLoading(false);
          }, 500);
        })
        .catch((err) => {
          console.log("Error while signup => ", err);
          showAlert(
            "Server Error",
            "Something went wrong. Please try again later.",
            "error"
          );
          setTimeout(() => {
            setLoading(false);
          }, 500);
        });
    } else {
      showAlert(
        "Validation Error",
        "Please fix the errors before proceeding.",
        "warning"
      );
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  return (
    <div className="bg-login-ride">
      {loading ? <Loader /> : ""}
      <div className="d-flex justify-content-center align-items-center vh-100 px-4">
        <div className="bg-white p-3 rounded w-100" style={{ maxWidth: 500, zIndex: 9 }}>
          <h4 className="text-center mb-3">SignUp Here</h4>
          <form action="">
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
              <div style={showpasswordInputGroup}>
                <input
                  onChange={handleInput}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter Password"
                  className="form-control mt-1"
                />
                <span
                  style={{ zIndex: 999, cursor: "pointer" }}
                  className="position-absolute end-0 mt-2 pt-1 me-2 pe-1"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i
                    className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                  ></i>
                </span>
              </div>
              {errors.password && (
                <span className="text-danger d-inline-block mt-1">
                  {errors.password}
                </span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="cpassword">Confirm Password</label>
              <div style={showpasswordInputGroup}>
                <input
                  onChange={handleInput}
                  type={showCPassword ? "text" : "password"}
                  id="cpassword"
                  name="cpassword"
                  placeholder="Confirm Password"
                  className="form-control mt-1"
                />
                <span
                  style={{ zIndex: 999, cursor: "pointer" }}
                  className="position-absolute end-0 mt-2 pt-1 me-2 pe-1"
                  onClick={() => setShowCPassword(!showCPassword)}
                >
                  <i
                    className={`bi ${
                      showCPassword ? "bi-eye-slash" : "bi-eye"
                    }`}
                  ></i>
                </span>
              </div>
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
              <button
                type="button"
                onClick={handleSubmitSignup}
                className="btn btn-success w-100"
              >
                Register
              </button>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="btn btn-primary w-100"
              >
                Back To Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
