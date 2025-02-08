import React from "react";
import Logo from "../assets/Go_Ride.png";

function Header() {
  const APP_NAME = import.meta.env.VITE_APP_NAME;

  return (
    <div className="pb-5">
      <nav className="navbar navbar-expand-lg bg-body-dark navbar-dark fixed-top p-0">
        <div className="container-fluid">
          <a
            className="navbar-brand text-info d-flex align-items-center gap-2"
            style={{ fontSize: 30, fontWeight: 900, marginRight: 30 }}
            href="#"
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
            className="collapse navbar-collapse py-3 bg-dark mt-1"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Profile
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Earning
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Customer
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Active
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      De-active
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      On Hold
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-info" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
