import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Validation from "../Validation/ResetPasswordValidation";
import Loader from "../components/Loader";
import Swal from "sweetalert2";
import "../static/css/Login.css";

const ResetPassword = () => {
  const [loading, setLoading] = useState(true);
  const { token } = useParams();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    password: "",
    cpassword: "",
  });

  const [errors, setErrors] = useState({
    password: "",
    cpassword: "",
  });

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

  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  // const backendUrl = `http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_PORT}`;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    const validationErrors = Validation(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      let RESET_API = `${backendUrl}/admin/reset-password/${token}`;

      axios
        .post(RESET_API, {
          password: values.password,
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
          console.log("Error while reset password => ", err);
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
      <div
        className="d-flex flex-column align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <div className="card p-4 shadow" style={{ width: "400px" }}>
          <h4 className="text-center">Set A New Password</h4>

          <form>
            {/* Password Field */}
            <div className="mb-3 mt-2 position-relative">
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

            {/* Confirm Password Field */}
            <div className="mb-3 position-relative">
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
            </div>

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

            <button
              type="button"
              onClick={handleSubmit}
              className="btn btn-primary mt-3 w-100"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
