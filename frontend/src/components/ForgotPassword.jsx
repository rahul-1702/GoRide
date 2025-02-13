import React, { useState } from "react";
import axios from "axios";
import Validation from "../Validation/ResetEmailValidation";

const ForgotPassword = () => {
  const [values, setValues] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({});

  const HOST = import.meta.env.VITE_HOST;
  const PORT = import.meta.env.VITE_PORT;

  const handleEmailInput = (e) => {
    setValues({ [e.target.name]: [e.target.value] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors(Validation(values));
    if (errors.email === "") {
      const FORGOT_API = `http://${HOST}:${PORT}/admin/forget-password`;

      axios
        .post(FORGOT_API, {
          email: values.email[0],
        })
        .then((res) => {
          if (res.data.code === 1) {
            alert(res.data.message);
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          console.log("Error while forgot password => ", err);
        });
    }
  };

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Reset Password</h3>

        <form onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            className="form-control"
            placeholder="Enter your email"
            onChange={handleEmailInput}
          />
          {errors.email && (
            <span className="text-danger d-inline-block mt-1">
              {errors.email}
            </span>
          )}

          <button type="submit" className="btn btn-primary mt-4 w-100">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
