import React, { useContext } from "react";
import Logo from "../assets/Go_Ride.png";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { themeContext } from "../context/ThemeProvider";
import { authContext } from "../context/AuthProvider";

function Header() {
  const { theme, toggleTheme } = useContext(themeContext);
  const { auth, setAuth } = useContext(authContext);

  const navigate = useNavigate();
  const APP_NAME = import.meta.env.VITE_APP_NAME;

  const logoutHandle = () => {
    Swal.fire({
      title: "Are you sure to Log out ?",
      icon: "warning",
      showConfirmButton: true,
      showCancelButton: true,
      allowOutsideClick: false,
    }).then((btn) => {
      if (btn.isConfirmed) {
        Swal.fire({
          title: `Bye ${auth.admin}!`,
          text: "You have been successfully logged out! Redirecting to login page...",
          icon: "success",
          timer: 3000,
          confirmButtonText: "OK",
          allowOutsideClick: false,
        });

        setTimeout(() => {
          navigate("/");

          sessionStorage.removeItem("goride_token");
          setAuth({ islogin: 0, admin: "" });
        }, 2500);
      }
    });
  };

  return (
    <div className="pb-5" style={{ zIndex: 1000 }}>
      <nav className="navbar navbar-expand-lg bg-body-dark navbar-dark fixed-top p-0 px-5">
        <div className="container-fluid p-0">
          <a
            className="navbar-brand text-info d-flex align-items-center gap-2"
            style={{ fontSize: 30, fontWeight: 900, marginRight: 30 }}
            href="/dashboard"
          >
            <img
              src={Logo}
              alt="GoRide"
              width={50}
              style={{ filter: "drop-shadow(0 0 2px #999)" }}
            />
            <span>{APP_NAME}</span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse py-3 mt-1"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Earning
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      This feature is in progress...
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Graph
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      This feature is in progress...
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <div>
              <button
                style={{ filter: "drop-shadow(0 0 1px #fff)" }}
                onClick={toggleTheme}
                className={`text-capitalize btn ${
                  theme === "dark" ? "btn-dark" : "btn-light"
                }`}
              >
                Switch To {theme === "dark" ? "Light" : "Dark"}
              </button>
            </div>
            {auth.islogin === 1 && (
              <button
                className="btn btn-outline-info ms-3"
                onClick={logoutHandle}
                type="button"
              >
                Log out
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
