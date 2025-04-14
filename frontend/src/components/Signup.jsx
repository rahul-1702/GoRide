import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeProvider";
import Validation from "../Validation/SignupValidation";
import axios from "axios";
import Swal from "sweetalert2";
import "../static/css/Login.css";

// components ===============
import Loader from "../components/Loader";
import Header from "./Header";
import Footer from "./Footer";

function Signup() {
  const [bg, setBg] = useState("bg-dark");
  const [text, setText] = useState("text-white");
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
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
  
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (theme === "dark") {
      setBg("bg-dark");
      setText("text-white");
    } else {
      setBg("bg-light");
      setText("text-dark");
    }
  }, [theme]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const showpasswordInputGroup = {
    position: "relative",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "stretch",
    width: "100%",
  };

  const showAlert = (title, text, icon) => {
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: "OK",
      allowOutsideClick: false,
    });
  };

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

  const handleSubmitSignup = () => {
    setLoading(true);
    const validationErrors = Validation(values);
    if (profilePic === null) {
      validationErrors.profilePic = "Profile Picture is required";
    }
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0 && profilePic) {
      const SIGNUP_API = `${backendUrl}/admin/signup`;

      const formData = new FormData();
      formData.append("name", values.name[0]);
      formData.append("email", values.email[0]);
      formData.append("mobile", values.mobile[0]);
      formData.append("password", values.password[0]);
      formData.append("profilePic", profilePic);

      axios
        .post(SIGNUP_API, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
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
          showAlert("Unable to Signup", err.response.data.message, "error");
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
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={`bg-login-ride pt-5 ${bg}`}>
          <Header />
          <div
            className={`d-flex justify-content-center align-items-center vh-50 px-4`}
          >
            <div
              className={`${bg} p-3 rounded w-100`}
              style={{ maxWidth: 1000, zIndex: 9 }}
            >
              <h4 className={`text-center mb-3 ${text}`}>SignUp Here</h4>
              <form action="" className="row m-0 gy-0 gy-sm-2 gx-3 gx-sm-4 gx-md-5">
                <div className="mb-3 col-12 col-sm-6">
                  <label htmlFor="name" className={text}>
                    Name
                  </label>
                  <input
                    onChange={handleInput}
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter Name"
                    className={`form-control mt-1 ${text} ${bg} ${
                      theme === "dark" ? "place-light" : "place-dark"
                    }`}
                  />
                  {errors.name && (
                    <span className="text-danger d-inline-block mt-1">
                      {errors.name}
                    </span>
                  )}
                </div>
                <div className="mb-3 col-12 col-sm-6">
                  <label htmlFor="email" className={text}>
                    Email
                  </label>
                  <input
                    onChange={handleInput}
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter Email"
                    className={`form-control mt-1 ${text} ${bg} ${
                      theme === "dark" ? "place-light" : "place-dark"
                    }`}
                  />
                  {errors.email && (
                    <span className="text-danger d-inline-block mt-1">
                      {errors.email}
                    </span>
                  )}
                </div>
                <div className="mb-3 col-12 col-sm-6">
                  <label htmlFor="mobile" className={text}>
                    Mobile
                  </label>
                  <input
                    onChange={handleInput}
                    type="number"
                    id="mobile"
                    name="mobile"
                    placeholder="Enter Mobile"
                    className={`form-control mt-1 ${text} ${bg} ${
                      theme === "dark" ? "place-light" : "place-dark"
                    }`}
                  />
                  {errors.mobile && (
                    <span className="text-danger d-inline-block mt-1">
                      {errors.mobile}
                    </span>
                  )}
                </div>
                <div className="mb-3 col-12 col-sm-6">
                  <label htmlFor="password" className={text}>
                    Password
                  </label>
                  <div style={showpasswordInputGroup}>
                    <input
                      onChange={handleInput}
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="Enter Password"
                      className={`form-control mt-1 ${text} ${bg} ${
                        theme === "dark" ? "place-light" : "place-dark"
                      }`}
                    />
                    <span
                      style={{ zIndex: 999, cursor: "pointer" }}
                      className="position-absolute end-0 mt-2 pt-1 me-2 pe-1"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <i
                        className={`bi ${text} ${
                          showPassword ? "bi-eye-slash" : "bi-eye"
                        }`}
                      ></i>
                    </span>
                  </div>
                  {errors.password && (
                    <span className="text-danger d-inline-block mt-1">
                      {errors.password}
                    </span>
                  )}
                </div>
                <div className="mb-3 col-12 col-sm-6">
                  <label htmlFor="cpassword" className={text}>
                    Confirm Password
                  </label>
                  <div style={showpasswordInputGroup}>
                    <input
                      onChange={handleInput}
                      type={showCPassword ? "text" : "password"}
                      id="cpassword"
                      name="cpassword"
                      placeholder="Confirm Password"
                      className={`form-control mt-1 ${text} ${bg} ${
                        theme === "dark" ? "place-light" : "place-dark"
                      }`}
                    />
                    <span
                      style={{ zIndex: 999, cursor: "pointer" }}
                      className="position-absolute end-0 mt-2 pt-1 me-2 pe-1"
                      onClick={() => setShowCPassword(!showCPassword)}
                    >
                      <i
                        className={`bi ${text} ${
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
                </div>
                <div className="mb-3 col-12 col-sm-6">
                  <label htmlFor="profilePic" className={text}>
                    Profile Picture
                  </label>
                  <input
                    type="file"
                    id="profilePic"
                    name="profilePic"
                    accept="image/*"
                    onChange={handleFileChange}
                    className={`form-control mt-1 ${text} ${bg} ${
                      theme === "dark" ? "place-light" : "place-dark"
                    }`}
                  />
                  {errors.profilePic && (
                    <span className="text-danger d-inline-block mt-1">
                      {errors.profilePic}
                    </span>
                  )}
                </div>
                <div className="mb-0 mb-sm-2 d-flex flex-sm-row flex-column gap-3 gap-sm-5 pt-2 pt-sm-3">
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
          <Footer />
        </div>
      )}
    </>
  );
}

export default Signup;
