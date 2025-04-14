import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeProvider";

const Footer = () => {
  const [bg, setBg] = useState("bg-dark");
  const [text, setText] = useState("text-white");
  const { theme } = useContext(ThemeContext);
  
  const APP_NAME = import.meta.env.VITE_APP_NAME;

  useEffect(() => {
    if (theme === "dark") {
      setBg("bg-dark");
      setText("text-white");
    } else {
      setBg("bg-light");
      setText("text-dark");
    }
  }, [theme]);

  return (
    <footer
      className={`py-3 ${text} ${bg} d-flex justify-content-between align-items-center px-4 px-md-5 w-100 position-absolute bottom-0`}
      style={{ height: "60px", zIndex: 1000 }}
    >
      <span className="text-secondary">
        &copy; {new Date().getFullYear()} {APP_NAME} | All rights reserved.
      </span>

      <div>
        <a href="#" className={`${text} ms-3`}>
          <i className="bi bi-facebook"></i>
        </a>
        <a href="#" className={`${text} ms-3`}>
          <i className="bi bi-twitter"></i>
        </a>
        <a href="#" className={`${text} ms-3`}>
          <i className="bi bi-instagram"></i>
        </a>
        <a href="#" className={`${text} ms-3`}>
          <i className="bi bi-linkedin"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
