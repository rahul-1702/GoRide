import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ThemeContext } from "../context/ThemeProvider";
import { AuthContext } from "../context/AuthProvider";
import Logo from "../assets/Go_Ride.png";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { auth, setAuth } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const APP_NAME = import.meta.env.VITE_APP_NAME;
  const adminName = Cookies.get("admin") || "User";

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
          title: `Bye ${adminName}!`,
          text: "You have been successfully logged out! Redirecting to login page...",
          icon: "success",
          timer: 3000,
          confirmButtonText: "OK",
          allowOutsideClick: false,
        });

        setTimeout(() => {
          Cookies.remove("islogin");
          Cookies.remove("admin");
          Cookies.remove("goride_token");

          navigate("/");
          window.location.reload();
        }, 2500);
      }
    });
  };

  const validTextPage =
    (Cookies.get("islogin")
      ? location.pathname === "/" && Number(Cookies.get("islogin")) === 0
      : location.pathname === "/") ||
    location.pathname === "/signup" ||
    location.pathname === "/password/forget" ||
    location.pathname.includes("/admin/reset-password");

  return (
    <div className="pb-5" style={{ zIndex: 1000 }}>
      <nav
        className={`navbar navbar-expand-lg ${
          validTextPage
            ? "navbar-dark"
            : theme === "dark"
            ? "navbar-dark"
            : "navbar-light"
        } fixed-top p-0 px-4 px-md-5`}
      >
        <div className="container-fluid p-0">
          <a
            className="navbar-brand text-info d-flex align-items-center gap-2"
            style={{ fontSize: 30, fontWeight: 900, marginRight: 30 }}
            href="/"
          >
            <img
              src={Logo}
              alt="GoRide"
              width={50}
              style={{ filter: "drop-shadow(0 0 2px #999)" }}
            />
            <span style={{ textShadow: "0 0 1px #000" }}>{APP_NAME}</span>
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
                  className={`nav-link dropdown-toggle`}
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
                  className={`nav-link dropdown-toggle`}
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
            <div className="d-flex gap-3 align-items-center">
              <button
                style={{
                  filter: `drop-shadow(0 0 1px ${
                    theme === "dark" ? "#fff" : "#000"
                  })`,
                }}
                onClick={toggleTheme}
                className={`text-capitalize btn ${
                  theme === "dark" ? "btn-dark" : "btn-light"
                }`}
              >
                Switch To {theme === "dark" ? "Light" : "Dark"}
              </button>

              {Number(Cookies.get("islogin")) === 1 && (
                <div className="d-flex align-items-center gap-3">
                  {/* <span
                    className={`me-3 ${
                      theme === "dark" ? "text-white" : "text-dark"
                    }`}
                  >
                    Welcome, {adminName}!
                  </span> */}
                  <button
                    className={`btn ${
                      theme === "dark" ? "btn-outline-info" : "btn-info"
                    }`}
                    onClick={logoutHandle}
                    type="button"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
